import ArcGISMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
// import { executeQueryJSON } from "@arcgis/core/rest/query";
import request from "@arcgis/core/request";
import Graphic from "@arcgis/core/Graphic";
import Field from "@arcgis/core/layers/support/Field";
import * as sizeRendererCreator from "@arcgis/core/smartMapping/renderers/size";
import * as colorRendererCreator from "@arcgis/core/smartMapping/renderers/color";
import * as predominanceRendererCreator from "@arcgis/core/smartMapping/renderers/predominance";
import { getSchemes } from "@arcgis/core/smartMapping/symbology/size";
import { getSchemeByName } from "@arcgis/core/smartMapping/symbology/color";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import { SimpleFillSymbol, SimpleMarkerSymbol } from "@arcgis/core/symbols";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Slider from "@arcgis/core/widgets/Slider";
import Legend from "@arcgis/core/widgets/Legend";
// import { watch } from "@arcgis/core/core/watchUtils";

(async ()=> {

  // const url = "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/EMU_Top_for_clustering/FeatureServer/0";
  // const url = "https://servicesdev.arcgis.com/VdB0O4Dy5MyNfFTR/ArcGIS/rest/services/EMU_Top_for_clustering/FeatureServer/0/";
  // const url = "https://servicesdev.arcgis.com/f126c8da131543019b05e4bfab6fc6ac/ArcGIS/rest/services/Kansas_Petro_Data/FeatureServer/0";
  const url = "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/NYC_motor_crashes/FeatureServer/0";

  const scaleThreshold = 20000;

  const pointLayer = new FeatureLayer({
    url,
    // portalItem: {
    //   id: "d38d3496c6884e83b75f66d16102e37a"
    // },
    minScale: scaleThreshold,
    renderer: new SimpleRenderer({
      symbol: new SimpleMarkerSymbol({
        color: "#991f17",
        size: 3,
        outline: {
          width: 0
        }
      })
    }),
    featureReduction: {
      type: "cluster",
      clusterMinSize: 16,
      clusterMaxSize: 48,
      labelingInfo: [
        new LabelClass({
          labelExpressionInfo: {
            expression: `
              var value = $feature["cluster_count"];
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
    }
  })

  const map = new ArcGISMap({
    basemap: "gray-vector",
    // {
    //   portalItem: {
    //     id: "9d5cf81cf8ce437584cedc8a2ee4ea4e"
    //   }
    // },
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

  view.ui.add(new Legend({ view }), "top-left");

  const clusteringEnabledElement = document.getElementById("clustering-enabled") as HTMLInputElement;
  const variableSelectElement = document.getElementById("variable-select") as HTMLSelectElement;
  const themeSelectElement = document.getElementById("theme-select") as HTMLSelectElement;

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
      viewZoom > 11 ? 7 :
      viewZoom > 10 ? 6 :
      viewZoom > 7 ? 5 :
      viewZoom > 5 ? 4 :
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
      exceededLimit = data?.exceededTransferLimit && oid !== features[features.length-1].attributes[oidField];  // false
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
      aggregateLayer.labelingInfo = createLabelingInfo(returnClusters as boolean);
      return aggregateLayer;
    }

    const schema = {
      geometryType,
      objectIdField: data.objectIdFieldName,
      spatialReference: SpatialReference.fromJSON(data.spatialReference),
      fields: data.fields.map((fieldJSON: any) => Field.fromJSON(fieldJSON))
    };

    aggregateLayer = new FeatureLayer({
      maxScale: scaleThreshold,
      ...schema,
      source,
      renderer: new SimpleRenderer({
        symbol: returnClusters ? new SimpleMarkerSymbol() : new SimpleFillSymbol()
      }),
      blendMode: "multiply",
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
        }
      ]
      }),
      popupEnabled: true,
      labelingInfo: createLabelingInfo(returnClusters as boolean)
    } as any);

    const renderer = returnClusters ? await createClusterRenderer(aggregateLayer) : await createBinRenderer(aggregateLayer);
    aggregateLayer.renderer = renderer;
    return aggregateLayer;
  }

  async function createBinRenderer(layer: FeatureLayer): Promise<__esri.ClassBreaksRenderer | __esri.UniqueValueRenderer> {
    const field = variableSelectElement.value;

    if(field === "predominance"){
      const renderer = createPredominanceRenderer(layer);
      themeSelectElement.disabled = true;
      return renderer;
    }

    themeSelectElement.disabled = false;
    const theme = themeSelectElement.value as any;

    const colorScheme = getSchemeByName({
      geometryType: "polygon",
      name: "Red 7",  // Pink 6 | Forest Dusk
      theme: "high-to-low"
    })
    const { renderer } = await colorRendererCreator.createContinuousRenderer({
      layer,
      field,  // Count | total_killed
      // normalizationField: "total_killed",
      view,
      theme,
      colorScheme: theme !== "above-and-below" && theme !== "extremes" ? colorScheme : null as any
    });
    return renderer;
  }

  async function createPredominanceRenderer(layer: FeatureLayer): Promise<__esri.UniqueValueRenderer> {
    const { renderer } = await predominanceRendererCreator.createRenderer({
      layer,
      view,
      includeOpacityVariable: true,
      includeSizeVariable: true,
      fields: [{
        name: "pedestrians_killed",
        label: "Pedestrians killed"
      }, {
        name: "cyclists_killed",
        label: "Cyclists killed"
      }, {
        name: "motorists_killed",
        label: "Motorists killed"
      }]
    });
    return renderer;
  }

  function createLabelingInfo(returnClusters: boolean): __esri.LabelClass[] {
    const field = variableSelectElement.value !== "predominance" ? variableSelectElement.value : "total_killed";

    return [
      new LabelClass({
        labelExpressionInfo: {
          expression: `
            var value = $feature["${field}"];
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
          color: [255,255,255, 1],
          haloSize: 0.5,
          haloColor: "#991f17",
          font: {
            family: "Noto Sans",
            size: 9,
            weight: "bold"
          }
        })
      })
    ];
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
    console.log("zoom: ", view.zoom)
    console.log("scale: ", view.scale)
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
  clusteringEnabledElement.addEventListener("calciteSwitchChange", () => {
    updateAggregateLayer(true);
  });

  variableSelectElement.addEventListener("calciteSelectChange", () => {
    updateAggregateLayer(true);
  });

  themeSelectElement.addEventListener("calciteSelectChange", () => {
    updateAggregateLayer(true);
  });

})();