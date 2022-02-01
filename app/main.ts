import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
// import { executeQueryJSON } from "@arcgis/core/rest/query";
import request from "@arcgis/core/request";
import Graphic from "@arcgis/core/Graphic";
import Field from "@arcgis/core/layers/support/Field";
import * as sizeRendererCreator from "@arcgis/core/smartMapping/renderers/size";
import * as colorRendererCreator from "@arcgis/core/smartMapping/renderers/color";
import { getSchemes } from "@arcgis/core/smartMapping/symbology/size";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import { SimpleFillSymbol, SimpleMarkerSymbol } from "@arcgis/core/symbols";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Slider from "@arcgis/core/widgets/Slider";
// import { watch } from "@arcgis/core/core/watchUtils";

(async ()=> {

  // const url = "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/EMU_Top_for_clustering/FeatureServer/0";
  const url = "https://servicesdev.arcgis.com/VdB0O4Dy5MyNfFTR/ArcGIS/rest/services/EMU_Top_for_clustering/FeatureServer/0/";

  const pointLayer = new FeatureLayer({
    url,
    minScale: 6737670
  })

  const map = new ArcGISMap({
    basemap: "streets-vector",
    layers: [ pointLayer ]
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

  const clusteringEnabledElement = document.getElementById("clustering-enabled") as HTMLInputElement;

  const slider = new Slider({
    values: [0],
    min: 0,
    max: 200,
    steps: 10,
    container: "slider",
    visibleElements: {
      labels: true,
      rangeLabels: true
    }
  });

  view.ui.add("components", "top-right");

  interface QueryClusterParams {
    pointLayer: FeatureLayer;
    view: MapView;
    returnClusters?: boolean;
    clusterRadius?: number;
    aggregateLayer?: FeatureLayer;
  }

  async function queryAggregates(params: QueryClusterParams): Promise<FeatureLayer>{

    let { pointLayer, view, clusterRadius, returnClusters, aggregateLayer } = params;

    const base = `${pointLayer.url}/${pointLayer.layerId}/query`;

    const viewZoom = Math.floor(view.zoom);
    const lod =
      viewZoom > 4 ? 4 :
      viewZoom > 3 ? 3 :
      viewZoom;

    const geometryType = returnClusters ? "point" : "polygon";

    if(!clusterRadius){
      clusterRadius = 0;
    }

    const clusterParameters = {
      clusterTolerance: Math.round(view.resolution * clusterRadius)
    };

    let features: Array<any> = [];
    let source: Graphic[] = [];
    let data: any = {};
    let exceededLimit: boolean = true;
    let oidField = null;
    let ids = [];

    if(aggregateLayer){
      ids = await aggregateLayer.queryObjectIds();
      console.log(ids);
    }

    for (let oid = 0; exceededLimit; oid) {
      const response = await request(base, {
        responseType: "json",
        query: {
          where: oidField ? `${oidField} > ${oid}` : "1=1",
          outFields: ["*"],
          returnGeometry: true,
          lod: lod,
          returnClusters: returnClusters,
          clusterParameters: returnClusters && clusterRadius > 0 ? JSON.stringify(clusterParameters) : null,
          returnExceededLimitFeatures: true,
          f: "json"
        }
      });
      data = response.data;
      console.log(data);

      features = [ ...features, ...data.features ];
      oidField = data.objectIdFieldName;
      exceededLimit = false//data?.exceededTransferLimit && oid !== features[features.length-1].attributes[oidField];  // false
      oid = features[features.length-1].attributes[oidField];
    }

    source = features.map( (featureJSON: any) => {
      featureJSON.geometry.spatialReference = data.spatialReference;
      return Graphic.fromJSON(featureJSON);
    });

    if(aggregateLayer){
      const ids = await aggregateLayer.queryObjectIds();
      await aggregateLayer.applyEdits({
        deleteFeatures: ids.map(id => {
          return {
            objectId: id
          }
        }),
        addFeatures: [...source]
      });
      const renderer = returnClusters ? await createClusterRenderer(aggregateLayer) : await createBinRenderer(aggregateLayer);
      aggregateLayer.renderer = renderer;
      return aggregateLayer;
    }

    const schema = {
      geometryType,
      objectIdField: data.objectIdFieldName,
      spatialReference: SpatialReference.fromJSON(data.spatialReference),
      fields: data.fields.map((fieldJSON: any) => Field.fromJSON(fieldJSON))
    };

    aggregateLayer = new FeatureLayer({
      ...schema,
      source,
      renderer: new SimpleRenderer({
        symbol: returnClusters ? new SimpleMarkerSymbol() : new SimpleFillSymbol()
      }),
      popupTemplate: new PopupTemplate({
        title: "Geohash: {CellId}",
        content: [{
          type: "text",
          text: "This cluster represents <b>{Count}</b> features."
        }, {
          type: "fields"
        }],
        fieldInfos: [{
          fieldName: "Count",
          format: {
            digitSeparator: true,
            places: 0
          }
        }, {
          fieldName: "cluster_avg_temp",
          label: "Average Temperature",
          format: {
            digitSeparator: true,
            places: 1
          }
        }, {
          fieldName: "cluster_avg_salinity",
          label: "Average Salinity",
          format: {
            digitSeparator: true,
            places: 1
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
          labelPlacement: returnClusters ? "center-center" : "always-horizontal",
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

    const renderer = returnClusters ? await createClusterRenderer(aggregateLayer) : await createBinRenderer(aggregateLayer);
    aggregateLayer.renderer = renderer;
    return aggregateLayer;
  }

  async function createBinRenderer(layer: FeatureLayer): Promise<__esri.ClassBreaksRenderer> {
    const { renderer } = await colorRendererCreator.createContinuousRenderer({
      layer,
      field: "Count",  // Count | cluster_avg_temp | cluster_avg_salinity
      view
    });
    return renderer;
  }

  async function createClusterRenderer(layer: FeatureLayer): Promise<__esri.ClassBreaksRenderer> {
    const { primaryScheme } = await getSchemes({
      basemap: view.map.basemap,
      basemapTheme: "light",
      geometryType: "point",
    });

    const sizeScheme = primaryScheme as __esri.SizeSchemeForPoint;
    sizeScheme.minSize = 16;
    sizeScheme.maxSize = 45;

    const { renderer } = await sizeRendererCreator.createContinuousRenderer({
      layer,
      field: "Count",
      view,
      sizeScheme
    });
    return renderer;
  }

  await view.when();
  await pointLayer.when();

  let aggregateLayer: FeatureLayer | null;
  let zoom: number = 0;

  async function updateAggregateLayer(forceUpdate?: boolean) {
    const lod = Math.round(view.zoom);
    const returnClusters = clusteringEnabledElement.checked;
    const clusterRadius = slider.values[0];

    if(aggregateLayer?.geometryType !== (returnClusters ? "point" : "polygon")){
      view.map.remove(aggregateLayer as FeatureLayer);
      aggregateLayer = null;
    }

    if(zoom !== lod || forceUpdate){
      zoom = lod;
      if(!aggregateLayer){
        aggregateLayer = await queryAggregates({
          pointLayer,
          view,
          returnClusters,
          clusterRadius
        });
        view.map.add(aggregateLayer);
        return;
      }
      await queryAggregates({ pointLayer, view, returnClusters, clusterRadius, aggregateLayer });
    }
  }

  updateAggregateLayer();
  view.watch("scale", () => {
    updateAggregateLayer();
    console.log(view.size)  // width, height
    console.log(view.extent)
    console.log(view.resolution)
  });
  slider.on(["thumb-drag", "thumb-change"] as any, (event:any) => {
    if(event?.state === "stop" || event.type === "thumb-change"){
      console.log("update???");
      updateAggregateLayer(true);
    }
  });
  clusteringEnabledElement.addEventListener("calciteSwitchChange", ()=> {
    updateAggregateLayer(true);
  });

})();