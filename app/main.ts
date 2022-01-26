import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
// import { executeQueryJSON } from "@arcgis/core/rest/query";
import request from "@arcgis/core/request";
import Graphic from "@arcgis/core/Graphic";
import Field from "@arcgis/core/layers/support/Field";
import { createContinuousRenderer } from "@arcgis/core/smartMapping/renderers/size";
import { getSchemes } from "@arcgis/core/smartMapping/symbology/size";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import { SimpleMarkerSymbol } from "@arcgis/core/symbols";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Slider from "@arcgis/core/widgets/Slider";
// import { watch } from "@arcgis/core/core/watchUtils";

(async ()=> {

  // const url = "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/EMU_Top_for_clustering/FeatureServer/0";
  const url = "https://servicesdev.arcgis.com/VdB0O4Dy5MyNfFTR/ArcGIS/rest/services/EMU_Top_for_clustering/FeatureServer/0/";

  const layer = new FeatureLayer({
    url,
    minScale: 6737670
  })

  const map = new ArcGISMap({
    basemap: "streets-vector",
    layers: [ layer ]
  });

  const view = new MapView({
    map: map,
    container: "viewDiv",
    center: [58.100345211154774 -23.966207534249218],
    zoom: 2,
    constraints: {
      snapToZoom: false
    }
  });

  const slider = new Slider({
    values: [0],
    min: 0,
    max: 100,
    steps: 0.1,
    container: "slider",
    visibleElements: {
      labels: true,
      rangeLabels: true
    }
  });

  view.ui.add("sliderDiv", "top-right");

  interface QueryClusterParams {
    layer: FeatureLayer;
    view: MapView;
    lod: number;
    clusterRadius: number;
    clusterLayer?: FeatureLayer;
  }

  async function queryClusters(params: QueryClusterParams): Promise<FeatureLayer>{

    const { layer, view, lod, clusterRadius } = params;

    // https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/EMU_Top_for_clustering/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&geohash=&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&lod=2&returnClusters=false&clusterParameters=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=html&token=

    const base = `${layer.url}/${layer.layerId}/query`;

    const returnClusters = true;
    const clusterParameters = {
      clusterTolerance: view.resolution * clusterRadius *10
    };

    console.log("VIEW RESOULTION: ", view.resolution, " (zoom ", view.zoom, ")");

    // const requestUrl = `${layer.url}/${layer.layerId}/query?where=1%3D1&geohash=&outFields=*&returnGeometry=true&lod=${lod}&returnClusters=${returnClusters}&clusterParameters=&f=json`;

    // const { data } = await request(requestUrl);

    let features: Array<any> = [];
    let source: Graphic[] = [];
    let data: any = {};
    let exceededLimit: boolean = true;
    let oidField = null;

    for (let oid = 0; exceededLimit; oid) {
      const response = await request(base, {
        responseType: "json",
        query: {
          where: oidField ? `${oidField} > ${oid}` : "1=1",
          outFields: ["*"],
          returnGeometry: true,
          lod: lod,
          returnClusters: returnClusters,
          clusterParameters: clusterRadius === 0 ? null : JSON.stringify(clusterParameters),
          returnExceededLimitFeatures: true,
          f: "json"
        }
      });
      data = response.data;
      console.log(data);

      features = [ ...features, ...data.features ];
      oidField = data.objectIdFieldName;
      exceededLimit = data?.exceededTransferLimit && oid !== features[features.length-1].attributes[oidField];  // false
      oid = features[features.length-1].attributes[oidField];
    }

    source = features.map( (featureJSON: any) => {
      featureJSON.geometry.spatialReference = data.spatialReference;
      return Graphic.fromJSON(featureJSON);
    });

    if(params.clusterLayer){
      const ids = await params.clusterLayer.queryObjectIds();
      await params.clusterLayer.applyEdits({
        deleteFeatures: ids.map(id => {
          return {
            objectId: id
          }
        }),
        addFeatures: [...source]
      });
      return params.clusterLayer;
    }

    const schema = {
      geometryType: "point",
      objectIdField: data.objectIdFieldName,
      spatialReference: SpatialReference.fromJSON(data.spatialReference),
      fields: data.fields.map((fieldJSON: any) => Field.fromJSON(fieldJSON))
    };

    const clusterLayer = new FeatureLayer({
      ...schema,
      source,
      renderer: new SimpleRenderer({
        symbol: new SimpleMarkerSymbol()
      }),
      popupTemplate: new PopupTemplate({
        content: "This cluster represents <b>{Count}</b> features.",
        fieldInfos: [{
          fieldName: "Count",
          format: {
            digitSeparator: true,
            places: 0
          }
        }]
      }),
      popupEnabled: true,
      labelingInfo: [
        new LabelClass({
          labelExpressionInfo: {
            expression: `
              var value = $feature["Count"];
              var num = Count(Text(Round(value)));
              var label = When(
                num < 4, Text(value, "#"),
                num == 4, Text(value / Pow(10, 3), "#.#k"),
                num <= 6, Text(value / Pow(10, 3), "#k"),
                num == 7, Text(value / Pow(10, 6), "#.#m"),
                num > 7, Text(value / Pow(10, 6), "#m"),
                Text(value, "#,###")
              );
              return label;
            `
          },
          deconflictionStrategy: "none",
          labelPlacement: "center-center",
          symbol: new TextSymbol({
            color: [240,240,240, 1],
            haloSize: 0.75,
            haloColor: [55,56,55, 0.9],
            font: {
              family: "Noto Sans",
              size: 9,
              weight: "bold"
            }
          })
        })
      ]
    } as any);

    const { primaryScheme } = await getSchemes({
      basemap: view.map.basemap,
      basemapTheme: "light",
      geometryType: "point"
    });

    const sizeScheme = primaryScheme as __esri.SizeSchemeForPoint;
    sizeScheme.minSize = 16;
    sizeScheme.maxSize = 45;

    const { renderer } = await createContinuousRenderer({
      layer: clusterLayer,
      field: "Count",
      view,
      sizeScheme
    });

    clusterLayer.renderer = renderer;
    return clusterLayer;
  }

  await view.when();
  await layer.when();

  let clusterLayer: FeatureLayer;
  let zoom: number = 0;
  let queryClustersPromise: Promise<FeatureLayer>;

  async function updateClusterLayer(forceUpdate?: boolean) {
    const lod = Math.round(view.zoom);
    const clusterRadius = slider.values[0];

    if(zoom !== lod || forceUpdate){
      zoom = lod;
      if(!clusterLayer){
        queryClustersPromise = queryClusters({ layer, view, lod, clusterRadius });
        clusterLayer = await queryClustersPromise;
        view.map.add(clusterLayer);
        return;
      }
      await queryClusters({ layer, view, lod, clusterRadius, clusterLayer })
    }
  }

  updateClusterLayer();
  view.watch("center", () => { updateClusterLayer() });
  slider.on(["thumb-drag", "thumb-change"] as any, (event:any) => {
    if(event?.state === "stop" || event.type === "thumb-change"){
      console.log("update???");
      updateClusterLayer(true);
    }
  })

})();