import{s as S,X as s,Y as n,cA as C,Z as f,V as I,gf as G,g9 as N,cB as F,r as g,h as $,cu as B,C as z,f_ as A,e as M,eQ as H,a5 as k,H as q,gg as L}from"./vendor.1906794a.js";import{p as J}from"./AnimatedFlowView2D.4a8dc5cf.js";import{l as W,u as K}from"./LayerView.31466adc.js";import{j as Q}from"./rasterProjectionHelper.cfe5d2ba.js";import{m as X}from"./dataUtils.12e2ccde.js";import{s as T}from"./Container.3129b529.js";import{i as Y}from"./GraphicContainer.33c8eea2.js";import{i as Z}from"./BaseGraphicContainer.d5f8ca0a.js";import{d as ee}from"./pixelUtils.e90a335a.js";import{t as te}from"./BitmapContainer.2584eaf7.js";import{i as ie}from"./Bitmap.7420dc51.js";import{S as se}from"./ExportStrategy.97aeb84b.js";import{d as ae}from"./popupUtils.10e4a4b8.js";import{i as re}from"./RefreshableLayerView.cc10fb38.js";import"./WGLContainer.85960f9a.js";import"./definitions.21e97413.js";import"./VertexArrayObject.fb67875c.js";import"./Texture.e5002286.js";import"./Utils.dc5734bd.js";import"./ShaderCompiler.c7c7b63f.js";import"./config.2a39d8a4.js";import"./GeometryUtils.ea8c8742.js";import"./MaterialKey.301bf49f.js";import"./earcut.f20dd8d8.js";import"./CIMSymbolHelper.96d440ee.js";import"./BidiEngine.aae60613.js";import"./GeometryUtils.d4e26b77.js";import"./projectionSupport.e16039e3.js";import"./json.2d0d6862.js";import"./FeatureContainer.76fc9ec8.js";import"./TileContainer.26dac650.js";import"./visualVariablesUtils.c887ba43.js";import"./visualVariablesUtils.a2feeb91.js";import"./Matcher.a4434050.js";import"./tileUtils.38de3c83.js";import"./TileClipper.37214276.js";import"./cimSymbolUtils.6ee77631.js";import"./quantizationUtils.f38724ee.js";import"./devEnvironmentUtils.444b8fd1.js";import"./schemaUtils.a83c8525.js";import"./MD5.f9440c6b.js";import"./util.aa5f648b.js";import"./ComputedAttributeStorage.1ad4cf86.js";import"./FeatureSetReader.deb82ddc.js";import"./centroid.4d0eaa21.js";import"./vec3f32.9cc42d31.js";const ne=S.getLogger("esri.views.2d.layers.imagery.ImageryGraphicsView2D");let h=class extends I{constructor(){super(...arguments),this.attached=!1,this.container=new T,this.updateRequested=!1,this._graphicsView=null,this._projectFullExtentPromise=null,this._dataParameters={exportParametersVersion:0,extents:[],tileResolution:0,time:"",isOceanStyle:!1,isOceanographic:!1},this.type="Graphics",this._graphics=new G,this._updateGraphics=N(async(e,t)=>{if(!e.stationary)return;const i=e.state,r=new F({xmin:i.extent.xmin,ymin:i.extent.ymin,xmax:i.extent.xmax,ymax:i.extent.ymax,spatialReference:i.spatialReference}),[a,p]=e.state.size,o={};o.timeExtent=this.timeExtent,o.requestAsImageElement=!1,o.signal=t,this._projectFullExtentPromise==null&&(this._projectFullExtentPromise=this._getProjectedFullExtent(r.spatialReference));const m=this.layer.renderer.type==="vector-field"?this.layer.renderer.symbolTileSize:50,c=await this._projectFullExtentPromise,{extent:d,resolution:b,width:j,height:_}=X(r,a,p,m,c),w=await this.layer.fetchImage(d,j,_,o),u=this.layer.renderer;if(u.type==="vector-field"){const v=w.pixelData.pixelBlock,x=u.sizeVariables[0];!g(v)||x.minDataValue&&x.maxDataValue||(x.minDataValue=v.statistics[0].minValue,x.maxDataValue=v.statistics[0].maxValue),this._pixelData={extent:d,pixelBlock:v};const U=d.clone().normalize(),P={exportParametersVersion:this.layer.exportImageServiceParameters.version,extents:U,tileResolution:b,time:JSON.stringify(this.timeExtent||""),isOceanStyle:u.flowRepresentation==="flow-to",isOceanographic:u.style==="ocean-current-kn"||u.style==="ocean-current-m"},V=this._canReuseVectorFieldData(P)?this._dataParameters.extents:[],D=await u.getGraphicsFromPixelData(w.pixelData,this.layer.rasterInfo.dataType==="vector-uv",V);if(V.length){const O=this._graphics.items.filter(R=>g(R.geometry)&&V.some(E=>E.intersects(R.geometry))&&!U.some(E=>E.intersects(R.geometry)));this._graphics.removeMany(O),this._graphics.addMany(D)}else this._graphics.set("items",D);this._graphicsView.update(e),this._dataParameters=P}})}destroy(){this.attached&&(this.detach(),this.attached=!1),this.updateRequested=!1}get updating(){return!this.attached||this.isUpdating()}update(e){this._updateGraphics(e).catch(t=>{$(t)||ne.error(t)})}hitTest(e){return new B({attributes:{},geometry:e.clone(),layer:this.layer})}attach(){this._graphicsView=new Z({view:this.view,graphics:this._graphics,requestUpdateCallback:()=>this.requestUpdate(),container:new Y(this.view.featuresTilingScheme)}),this.attached=!0}detach(){this._graphics.destroy(),this._graphicsView.destroy(),this.container.removeChild(this._graphicsView.container),this._graphicsView=null}install(e){this.container.addChild(this._graphicsView.container),e.addChild(this.container)}uninstall(e){this.container.removeChild(this._graphicsView.container),e.removeChild(this.container)}isUpdating(){return this._graphicsView.updating||this.updateRequested}getPixelData(){return this.updating?null:this._pixelData}redraw(){}requestUpdate(){this.updateRequested||(this.updateRequested=!0,this.view.requestUpdate())}async _getProjectedFullExtent(e){try{return await Q(this.layer.fullExtent,e)}catch{try{const i=(await z(this.layer.url,{query:{option:"footprints",outSR:e.wkid||JSON.stringify(e.toJSON()),f:"json"}})).data.featureCollection.layers[0].layerDefinition.extent;return i?F.fromJSON(i):null}catch{return null}}}_canReuseVectorFieldData(e){const t=this._dataParameters.exportParametersVersion===e.exportParametersVersion,i=this._dataParameters.time===e.time,r=Math.abs(this._dataParameters.tileResolution-e.tileResolution)/e.tileResolution<.01,a=this._dataParameters.extents.some(m=>e.extents.some(c=>m.intersects(c))),p=this._dataParameters.isOceanStyle===e.isOceanStyle,o=this._dataParameters.isOceanographic===e.isOceanographic;return t&&i&&r&&a&&p&&o}};s([n()],h.prototype,"attached",void 0),s([n()],h.prototype,"container",void 0),s([n()],h.prototype,"layer",void 0),s([n()],h.prototype,"timeExtent",void 0),s([n()],h.prototype,"view",void 0),s([n()],h.prototype,"updateRequested",void 0),s([n()],h.prototype,"updating",null),s([C({graphics:"Graphics"})],h.prototype,"type",void 0),h=s([f("esri.views.2d.layers.imagery.ImageryGraphicsView2D")],h);const oe=h,le=S.getLogger("esri.views.2d.layers.imagery.ImageryView2D");let l=class extends I{constructor(){super(...arguments),this.attached=!1,this.container=new T,this.updateRequested=!1,this.type="Imagery",this._bitmapView=null}destroy(){this.attached&&(this.detach(),this.attached=!1),this.updateRequested=!1}get updating(){return!this.attached||this.isUpdating()}update(e){this.strategy.update(e).catch(t=>{$(t)||le.error(t)})}detach(){this.strategy.destroy(),this._bitmapView.removeAllChildren(),this.container.removeAllChildren()}hitTest(e){return new B({attributes:{},geometry:e.clone(),layer:this.layer})}attach(){const e=this.layer.version>=10,t=this.layer.version>=10.1?this.layer.imageMaxHeight:2048,i=this.layer.version>=10.1?this.layer.imageMaxWidth:2048;this._bitmapView=new te,this.strategy=new se({container:this._bitmapView,imageNormalizationSupported:e,imageMaxHeight:t,imageMaxWidth:i,fetchSource:this._fetchImage.bind(this),requestUpdate:()=>this.requestUpdate()}),this.attached=!0}install(e){this.container.addChild(this._bitmapView),e.addChild(this.container)}uninstall(e){this.container.removeChild(this._bitmapView),e.removeChild(this.container)}redraw(){this.strategy.updateExports(e=>{e.source instanceof HTMLImageElement?e.requestRender():this.layer.applyRenderer({pixelBlock:e.source.pixelBlock}).then(t=>{const i=e.source;i.pixelBlock=t.pixelBlock,i.filter=r=>this.layer.applyFilter(r),this.container.requestRender()})})}requestUpdate(){this.updateRequested||(this.updateRequested=!0,this.view.requestUpdate())}isUpdating(){return this.strategy.updating||this.updateRequested}getPixelData(){if(this.updating)return null;const e=this.strategy.bitmaps;if(e.length===1&&e[0].source)return{extent:e[0].source.extent,pixelBlock:e[0].source.originalPixelBlock};if(e.length>1){const t=this.view.extent,i=e.map(a=>a.source).filter(a=>a.extent&&a.extent.intersects(t)).map(a=>({extent:a.extent,pixelBlock:a.originalPixelBlock})),r=ee(i,t);return g(r)?{extent:r.extent,pixelBlock:r.pixelBlock}:null}return null}_fetchImage(e,t,i,r){return(r=r||{}).timeExtent=this.timeExtent,r.requestAsImageElement=!0,this.layer.fetchImage(e,t,i,r).then(a=>a.imageElement?a.imageElement:this.layer.applyRenderer(a.pixelData,{signal:r.signal}).then(p=>{const o=new ie(p.pixelBlock,p.extent.clone(),a.pixelData.pixelBlock);return o.filter=m=>this.layer.applyFilter(m),o}))}};s([n()],l.prototype,"attached",void 0),s([n()],l.prototype,"container",void 0),s([n()],l.prototype,"layer",void 0),s([n()],l.prototype,"strategy",void 0),s([n()],l.prototype,"timeExtent",void 0),s([n()],l.prototype,"view",void 0),s([n()],l.prototype,"updateRequested",void 0),s([n()],l.prototype,"updating",null),s([C({imagery:"Imagery"})],l.prototype,"type",void 0),l=s([f("esri.views.2d.layers.imagery.ImageryView2D")],l);const he=l,pe=e=>{let t=class extends e{constructor(){super(...arguments),this.view=null}async fetchPopupFeatures(i,r){const{layer:a}=this;if(!i)throw new M("imagerylayerview:fetchPopupFeatures","Nothing to fetch without area",{layer:a});const{popupEnabled:p}=a,o=ae(a,r);if(!p||!g(o))throw new M("imagerylayerview:fetchPopupFeatures","Missing required popupTemplate or popupEnabled",{popupEnabled:p,popupTemplate:o});const m=await o.getRequiredFields(),c=new H;c.timeExtent=this.timeExtent,c.geometry=i,c.outFields=m,c.outSpatialReference=i.spatialReference;const d=this.view.resolution,b=this.view.type==="2d"?new k(d,d,this.view.spatialReference):new k(.5*d,.5*d,this.view.spatialReference),{returnTopmostRaster:j,showNoDataRecords:_}=o.layerOptions||{returnTopmostRaster:!0,showNoDataRecords:!1},w={returnDomainValues:!0,returnTopmostRaster:j,pixelSize:b,showNoDataRecords:_,signal:g(r)?r.signal:null};return a.queryVisibleRasters(c,w).then(u=>u)}canResume(){var i;return!!super.canResume()&&((i=this.timeExtent)==null||!i.isEmpty)}};return s([n()],t.prototype,"layer",void 0),s([n()],t.prototype,"suspended",void 0),s([n(A)],t.prototype,"timeExtent",void 0),s([n()],t.prototype,"view",void 0),t=s([f("esri.views.layers.ImageryLayerView")],t),t};let y=class extends pe(re(W(K))){constructor(){super(...arguments),this._exportImageVersion=-1}initialize(){this.handles.add([q(this,["layer.blendMode","layer.effects"],e=>{this.subview&&(this.subview.container.blendMode=e)},!0),q(this,"layer.effect",e=>{this.subview&&(this.subview.container.effect=e)},!0)])}get pixelData(){return this.updating?null:"getPixelData"in this.subview?this.subview.getPixelData():null}get updating(){return!!(!this.subview||"updating"in this.subview&&this.subview.updating)}async hitTest(e,t){return this.subview?"hitTest"in this.subview?[this.subview.hitTest(e)]:[]:null}update(e){var t;(t=this.subview)==null||t.update(e)}attach(){this.layer.increaseRasterJobHandlerUsage(),this._setSubView(),this.handles.add([q(this,"layer.exportImageServiceParameters.version",e=>{this._exportImageVersion!==e&&(this._exportImageVersion=e,this.requestUpdate())}),this.watch("timeExtent",()=>{"timeExtent"in this.subview&&(this.subview.timeExtent=this.timeExtent),this.requestUpdate()}),this.layer.on("redraw",()=>{"redraw"in this.subview?this.subview.redraw():this.subview.redrawOrRefetch()}),L(this.layer,"renderer",()=>this._setSubView())],"imagerylayerview-update")}detach(){this.layer.decreaseRasterJobHandlerUsage(),this.subview.destroy(),this.handles.remove("imagerylayerview-update"),this._exportImageVersion=-1}moveStart(){}viewChange(){}moveEnd(){this.requestUpdate()}async doRefresh(){this.requestUpdate()}isUpdating(){return!this.subview||!this.suspended&&this.subview.updating}_setSubView(){var e,t;let i="Imagery";((e=this.layer.renderer)==null?void 0:e.type)==="vector-field"&&this.layer.format==="lerc"&&(i="Graphics");var r,a;((t=this.layer.renderer)==null?void 0:t.type)==="animated-flow"&&(i="Flow"),this.subview&&this.subview.type===i||((r=this.subview)==null||r.uninstall(this.container),(a=this.subview)==null||a.destroy(),this.subview=i==="Imagery"?new he({layer:this.layer,view:this.view,timeExtent:this.timeExtent}):i==="Graphics"?new oe({layer:this.layer,view:this.view,timeExtent:this.timeExtent}):new J({layer:this.layer,layerView:this}),this.subview.attach(),this.subview.install(this.container),this.subview.container.blendMode=this.layer.blendMode,this.subview.container.effect=this.layer.effect),this.requestUpdate()}};s([n()],y.prototype,"pixelData",null),s([n({readOnly:!0})],y.prototype,"updating",null),s([n()],y.prototype,"subview",void 0),y=s([f("esri.views.2d.layers.ImageryLayerView2D")],y);const st=y;export{st as default};
