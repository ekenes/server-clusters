import{I as V,aj as L,gh as K,s as j,X as n,Y as u,Z as T,eN as Z,g9 as ee,fR as E,cB as te,aL as ie,ft as se,fQ as re,r as d,b as G,bp as ae,a5 as le,cR as oe,h as z,cg as O,c6 as ne,aV as he,f_ as ue,e as I,cu as B,gg as ce,H as U}from"./vendor.1906794a.js";import{p as de}from"./AnimatedFlowView2D.4a8dc5cf.js";import{l as ye,u as pe}from"./LayerView.31466adc.js";import{x as me,j as fe,d as ge}from"./WGLContainer.85960f9a.js";import{r as A,o as $}from"./TileContainer.26dac650.js";import{I as C,n as be}from"./Utils.dc5734bd.js";import{u as we,l as _e}from"./pixelUtils.e90a335a.js";import{g as q,u as W,s as ve,i as Pe}from"./RawBlockCache.ed62ab05.js";import{F as Ve,w as M,j as Te}from"./rasterProjectionHelper.cfe5d2ba.js";import{r as N}from"./util.aa5f648b.js";import{U as Q,_ as H,S as Ie}from"./dataUtils.12e2ccde.js";import{o as J,f as xe}from"./VertexArrayObject.fb67875c.js";import"./Texture.e5002286.js";import{a as Re}from"./Container.3129b529.js";import{d as Se}from"./popupUtils.10e4a4b8.js";import{i as ze}from"./RefreshableLayerView.cc10fb38.js";import"./definitions.21e97413.js";import"./ShaderCompiler.c7c7b63f.js";import"./config.2a39d8a4.js";import"./GeometryUtils.ea8c8742.js";import"./MaterialKey.301bf49f.js";import"./earcut.f20dd8d8.js";class Ce extends A{constructor(e,t,s,r,a,l=null){super(e,t,s,r,a),this.bitmap=new me(l,null,null),this.bitmap.coordScale=[r,a],this.bitmap.once("isReady",()=>this.ready())}destroy(){super.destroy(),this.bitmap.destroy(),this.bitmap=null,this.stage=null}set stencilRef(e){this.bitmap.stencilRef=e}get stencilRef(){return this.bitmap.stencilRef}setTransform(e,t){super.setTransform(e,t),this.bitmap.transforms.dvs=this.transforms.dvs}_createTransforms(){return{dvs:V(),tileMat3:V()}}onAttach(){this.bitmap.stage=this.stage}onDetach(){this.bitmap.stage=null}}class De extends ${constructor(){super(...arguments),this.isCustomTilingScheme=!1}createTile(e){const t=this._getTileBounds(e),[s,r]=this._tileInfoView.tileInfo.size;return new Ce(e,t[0],t[3],s,r)}destroyTile(){}prepareRenderPasses(e){const t=e.registerRenderPass({name:"imagery (tile)",brushes:[fe.raster],target:()=>this.children.map(s=>s.bitmap),drawPhase:C.MAP});return[...super.prepareRenderPasses(e),t]}doRender(e){this.visible&&e.drawPhase===C.MAP&&super.doRender(e)}_getTileBounds(e){const t=this._tileInfoView.getTileBounds(L(),e);if(this.isCustomTilingScheme&&e.world){const{tileInfo:s}=this._tileInfoView,r=K(s.spatialReference);if(r){const{resolution:a}=s.lodAt(e.level),l=r/a%s.size[0],o=l?(s.size[0]-l)*a:0;t[0]-=o*e.world,t[2]-=o*e.world}}return t}}const Ue=[0,0],X=j.getLogger("esri.views.2d.layers.ImageryTileLayerView2D");let y=class extends Z{constructor(){super(...arguments),this._emptyTilePixelBlock=null,this._tileStrategy=null,this._tileInfoView=null,this._fetchQueue=null,this._blockCacheRegistryUrl=null,this._blockCacheRegistryId=null,this._srcResolutions=null,this.previousLOD=null,this._needBlockCacheUpdate=!1,this._globalSymbolizerParams=null,this._symbolizerParams=null,this._abortController=null,this._isCustomTilingScheme=!1,this._globalUpdateRequested=!1,this.container=null,this.layer=null,this.redrawOrRefetch=ee((i,e)=>!this.previousLOD||this.layerView.suspended?Promise.resolve():i?this.doRefresh():this._redrawImage(e))}get useWebGLForProcessing(){var i;return(i=this._get("useWebGLForProcessing"))==null||i}set useWebGLForProcessing(i){this._set("useWebGLForProcessing",i)}get useProgressiveUpdate(){return this._get("useProgressiveUpdate")==null||this._get("useProgressiveUpdate")}set useProgressiveUpdate(i){if(this._tileStrategy&&this.useProgressiveUpdate!==i){this._tileStrategy.destroy(),this.container.removeAllChildren();const e=this._getCacheSize(i);this._tileStrategy=new E({cachePolicy:"purge",acquireTile:t=>this.acquireTile(t),releaseTile:t=>this.releaseTile(t),cacheSize:e,tileInfoView:this._tileInfoView}),this._set("useProgressiveUpdate",i),this.layerView.requestUpdate()}}update(i){this._fetchQueue.pause(),this._fetchQueue.state=i.state,this._tileStrategy.update(i),this._fetchQueue.resume();const{extent:e,resolution:t,scale:s}=i.state,r=this._tileInfoView.getClosestInfoForScale(s);if(this.layer.raster){var a;if(!this.useProgressiveUpdate||this._needBlockCacheUpdate){const l=this._srcResolutions[r.level],o=e.toJSON?e:te.fromJSON(e);q(this._blockCacheRegistryUrl,this._blockCacheRegistryId,o,t,l,this.layer.raster.ioConfig.sampling)}this._needBlockCacheUpdate=!1,((a=this.previousLOD)==null?void 0:a.level)!==r.level&&(this.previousLOD=r,this._symbolizerParams==null||this.layerView.hasTilingEffects||this._updateSymbolizerParams(),this._tileStrategy.updateCacheSize(0))}}moveEnd(){!this.layerView.hasTilingEffects&&this.useProgressiveUpdate||(this._abortController&&this._abortController.abort(),this._abortController=new AbortController,this._fetchQueue.length===0&&this._redrawImage(this._abortController.signal).then(()=>{this._globalUpdateRequested=!1,this.layerView.requestUpdate()}));const i=this._getCacheSize(this.useProgressiveUpdate);this._tileStrategy.updateCacheSize(i),this.layerView.requestUpdate()}get updating(){return this._fetchQueue.length>0||this._globalUpdateRequested||!(!this.updatingHandles||!this.updatingHandles.updating)}attach(){ie().supportsTextureFloat||(this.useWebGLForProcessing=!1),this._initializeTileInfo(),this._tileInfoView=new se(this.layerView.tileInfo,this.layerView.fullExtent);const i=this._computeFetchConcurrency();this._fetchQueue=new re({tileInfoView:this._tileInfoView,concurrency:i,process:(t,s)=>this._fetchTile1(t,s)});const e=this._getCacheSize(this.useProgressiveUpdate);this._tileStrategy=new E({cachePolicy:"purge",acquireTile:t=>this.acquireTile(t),releaseTile:t=>this.releaseTile(t),cacheSize:e,tileInfoView:this._tileInfoView}),this._updateBlockCacheRegistry()}acquireTile(i){const e=this.container.createTile(i);return this._enqueueTileFetch(e),this.layerView.requestUpdate(),this._needBlockCacheUpdate=!0,this._globalUpdateRequested=this.layerView.hasTilingEffects||!this.useProgressiveUpdate,e}releaseTile(i){this._fetchQueue.abort(i.key.id),this.container.removeChild(i),i.once("detach",()=>{i.destroy(),this.layerView.requestUpdate()}),this.layerView.requestUpdate()}uninstall(){this._tileStrategy.destroy(),this._fetchQueue.clear(),this.container.removeAllChildren(),this._fetchQueue=this._tileStrategy=this._tileInfoView=null,this.notifyChange("updating"),W(this._blockCacheRegistryUrl,this._blockCacheRegistryId)}createEmptyTilePixelBlock(i=null){const e=i==null||i.join(",")===this._tileInfoView.tileInfo.size.join(",");if(e&&d(this._emptyTilePixelBlock))return this._emptyTilePixelBlock;i=i||this._tileInfoView.tileInfo.size;const[t,s]=i,r=new we({width:t,height:s,pixels:[new Uint8Array(t*s)],mask:new Uint8Array(t*s),pixelType:"u8"});return e&&(this._emptyTilePixelBlock=r),r}_fetchTile1(i,e){const t=!G(e)&&e.signal,s=this.canUseWebGLForProcessing(),r={allowPartialFill:!0,datumTransformation:this.layerView.datumTransformation,interpolation:s?"nearest":this.layer.interpolation,registryId:this._blockCacheRegistryId,requestRawData:s,signal:ae(t),srcResolution:this._srcResolutions[i.level],timeExtent:this.layerView.timeExtent,tileInfo:this.layerView.tileInfo};return this.fetchTile(i,r)}_getCacheSize(i){return i?40:0}_initializeTileInfo(){const i=this.layerView.view.spatialReference,e=new le({x:this.layerView.fullExtent.xmin,y:this.layerView.fullExtent.ymax,spatialReference:i}),{scales:t,srcResolutions:s,isCustomTilingScheme:r}=Ve(this.layer.rasterInfo,i),a=oe.create({spatialReference:i,size:512,scales:t});(a.origin.x===0||a.origin.x>e.x)&&(a.origin=e),this._isCustomTilingScheme=r,this.layerView.set("tileInfo",a),this._srcResolutions=s!=null?s:[]}_computeFetchConcurrency(){const{blockBoundary:i}=this.layer.rasterInfo.storageInfo,e=i[i.length-1];return(e.maxCol-e.minCol+1)*(e.maxRow-e.minRow+1)>64?2:10}async _enqueueTileFetch(i,e){if(!this._fetchQueue.has(i.key.id)){try{const t=await this._fetchQueue.push(i.key);this.notifyChange("updating");const{bandIds:s}=this.layer;let r=!this.useProgressiveUpdate||this.layerView.hasTilingEffects&&!this._globalSymbolizerParams;if(this._globalUpdateRequested&&!this.layerView.moving&&this._fetchQueue.length===0){r=!1;try{await this._redrawImage(this._abortController&&this._abortController.signal)}catch(o){z(o)&&X.error(o)}this._globalUpdateRequested=!1}!this.canUseWebGLForProcessing()&&this.type!=="rasterVF"||this.layerView.hasTilingEffects||this._symbolizerParams!=null||this._updateSymbolizerParams();const a=this._tileInfoView.getTileCoords(Ue,i.key),l=this._tileInfoView.getTileResolution(i.key);await this.updateTileSource(i,{source:t,symbolizerParams:this._symbolizerParams,globalSymbolizerParams:this._globalSymbolizerParams,suspended:r,bandIds:s,coords:a,resolution:l}),i.once("attach",()=>this.layerView.requestUpdate()),this.container.addChild(i)}catch(t){z(t)||X.error(t)}this.layerView.requestUpdate()}}async _redrawImage(i){if(this.container.children.length===0)return;await this.updatingHandles.addPromise(this.layer.updateRenderer()),this.layerView.hasTilingEffects?await this._updateGlobalSymbolizerParams(i):(this._updateSymbolizerParams(),this._globalSymbolizerParams=null);const e=this.container.children.map(async t=>this.updateTileSymbolizerParameters(t,{local:this._symbolizerParams,global:this._globalSymbolizerParams}));await O(e),this.container.requestRender()}async _updateGlobalSymbolizerParams(i){const e={srcResolution:this._srcResolutions[this.previousLOD.level],registryId:this._blockCacheRegistryId,signal:i},t=await this.layer.fetchPixels(this.layerView.view.extent,this.layerView.view.width,this.layerView.view.height,e);if(!t||!t.pixelBlock)return;const s=this.layer.symbolizer.generateWebGLParameters({pixelBlock:_e(t.pixelBlock,this.layer.bandIds),isGCS:this.layerView.view.spatialReference.isGeographic,resolution:{x:this.previousLOD.resolution,y:this.previousLOD.resolution},bandIds:this.layer.bandIds});!this.canUseWebGLForProcessing()&&s&&s.type==="stretch"&&this.layer.renderer&&this.layer.renderer.type==="raster-stretch"&&(s.factor=s.factor.map(r=>255*r),s.outMin=Math.round(255*s.outMin),s.outMax=Math.round(255*s.outMax)),this._globalSymbolizerParams=s}_updateSymbolizerParams(){this._symbolizerParams=this.layer.symbolizer.generateWebGLParameters({pixelBlock:null,isGCS:this.layerView.view.spatialReference.isGeographic,resolution:{x:this.previousLOD.resolution,y:this.previousLOD.resolution},bandIds:this.layer.bandIds})}_updateBlockCacheRegistry(i=!1){const{url:e,rasterInfo:t,raster:s}=this.layer,{multidimensionalDefinition:r}=this.layer.normalizeRasterFetchOptions({multidimensionalDefinition:this.layer.multidimensionalDefinition,timeExtent:this.layerView.timeExtent}),a=t!=null&&t.multidimensionalInfo?s.getSliceIndex(r):null,l=Pe(e,a);if(l!==this._blockCacheRegistryUrl){if(this._blockCacheRegistryUrl!=null&&W(this._blockCacheRegistryUrl,this._blockCacheRegistryId),this._blockCacheRegistryId=ve(l,this.layer.raster.rasterInfo),i){const o=this._tileInfoView.getClosestInfoForScale(this.layerView.view.scale),c=this._srcResolutions[o.level];q(l,this._blockCacheRegistryId,this.layerView.view.extent,this.layerView.view.resolution,c,this.layer.raster.ioConfig.sampling)}this._blockCacheRegistryUrl=l}}async doRefresh(){await this.updatingHandles.addPromise(this.layer.updateRenderer()),this.layerView.hasTilingEffects||this._updateSymbolizerParams(),this._updateBlockCacheRegistry(!0),this._fetchQueue.reset(),this.notifyChange("updating");const i=[];this._tileStrategy.tiles.forEach(e=>i.push(this._enqueueTileFetch(e))),await O(i)}};n([u()],y.prototype,"_globalUpdateRequested",void 0),n([u()],y.prototype,"container",void 0),n([u()],y.prototype,"layer",void 0),n([u()],y.prototype,"layerView",void 0),n([u()],y.prototype,"type",void 0),n([u()],y.prototype,"useWebGLForProcessing",null),n([u()],y.prototype,"useProgressiveUpdate",null),n([u()],y.prototype,"updating",null),y=n([T("esri.views.2d.layers.imagery.BaseImageryTileSubView2D")],y);let w=class extends y{constructor(){super(...arguments),this.container=null,this.layer=null,this.type="raster"}canUseWebGLForProcessing(){return this.useWebGLForProcessing&&this.layer.symbolizer.canRenderInWebGL&&!(this.layer.interpolation==="majority"&&N(this.layer))}fetchTile(i,e){return this.layer.fetchTile(i.level,i.row,i.col,e)}async updateTileSource(i,e){const{bandIds:t}=this.layer,s=this._getLayerInterpolation(),r=this.canUseWebGLForProcessing(),{source:a,symbolizerParams:l,globalSymbolizerParams:o,suspended:c,coords:g,resolution:p}=e,{bitmap:h}=i;if([h.x,h.y]=g,h.resolution=p,a&&d(a)&&d(a.pixelBlock)){const m={extent:a.extent,pixelBlock:a.pixelBlock};if(h.rawPixelData=m,r)h.source=a.pixelBlock,h.isRendereredSource=!1;else{const f=await this.layer.applyRenderer(m,(o==null?void 0:o.type)==="stretch"?o:null);h.source=f,h.isRendereredSource=!0}h.symbolizerParameters=r?l:null,r?h.transformGrid||(h.transformGrid=a.transformGrid):h.transformGrid=null}else{const m=this.createEmptyTilePixelBlock();h.source=m,h.symbolizerParameters=r?l:null,h.transformGrid=null}h.bandIds=r?t:null,h.width=this._tileInfoView.tileInfo.size[0],h.height=this._tileInfoView.tileInfo.size[1],h.interpolation=s,h.suspended=c,h.invalidateTexture()}async updateTileSymbolizerParameters(i,e){const{local:t,global:s}=e,{bandIds:r}=this.layer,a=this._getLayerInterpolation(),l=this.canUseWebGLForProcessing(),{bitmap:o}=i,{rawPixelData:c}=o;!l&&d(c)?(o.source=await this.layer.applyRenderer(c,(s==null?void 0:s.type)==="stretch"?s:null),o.isRendereredSource=!0):(o.isRendereredSource&&d(c)&&(o.source=c.pixelBlock),o.isRendereredSource=!1),o.symbolizerParameters=l?s||t:null,o.bandIds=l?r:null,o.interpolation=a,o.suspended=!1}install(i){this.container=new De(this._tileInfoView),this.container.isCustomTilingScheme=this._isCustomTilingScheme,i.addChild(this.container)}uninstall(){this.container.removeAllChildren(),this.container.remove(),super.uninstall()}_getLayerInterpolation(){const i=this.layer.renderer.type;if(i==="raster-colormap"||i==="unique-value"||i==="class-breaks")return"nearest";const{interpolation:e}=this.layer,{renderer:t}=this.layer;return t.type==="raster-stretch"&&t.colorRamp!=null?e==="bilinear"||e==="cubic"?"bilinear":"nearest":e}};n([u()],w.prototype,"container",void 0),n([u()],w.prototype,"layer",void 0),n([u()],w.prototype,"type",void 0),w=n([T("esri.views.2d.layers.imagery.ImageryTileView2D")],w);const Fe=w;class ke extends Re{constructor(e=null){super(),this._source=null,this._symbolizerParameters=null,this._vaoInvalidated=!0,this.coordScale=[1,1],this.height=null,this.stencilRef=0,this.rawPixelData=null,this.width=null,this.source=e}destroy(){var e,t;d(this.vaoData)&&((e=this.vaoData.magdir)==null||e.vao.dispose(),(t=this.vaoData.scalar)==null||t.vao.dispose(),this.vaoData=null)}get symbolizerParameters(){return this._symbolizerParameters}set symbolizerParameters(e){JSON.stringify(this._symbolizerParameters)!==JSON.stringify(e)&&(this._symbolizerParameters=e,this.invalidateVAO())}get source(){return this._source}set source(e){this._source=e,this.invalidateVAO()}invalidateVAO(){var e,t;!this._vaoInvalidated&&d(this.vaoData)&&((e=this.vaoData.magdir)==null||e.vao.dispose(),(t=this.vaoData.scalar)==null||t.vao.dispose(),this.vaoData=null,this._vaoInvalidated=!0,this.requestRender())}updateVectorFieldVAO(e){if(this._vaoInvalidated){if(this._vaoInvalidated=!1,d(this.source)&&!d(this.vaoData)){const{style:t}=this.symbolizerParameters;switch(t){case"beaufort_ft":case"beaufort_km":case"beaufort_kn":case"beaufort_m":case"beaufort_mi":case"classified_arrow":case"ocean_current_kn":case"ocean_current_m":case"single_arrow":{const s=Q(this.source,this.symbolizerParameters),r=this._createVectorFieldVAO(e.context,s);this.vaoData={magdir:r}}break;case"simple_scalar":{const s=H(this.source,this.symbolizerParameters),r=this._createVectorFieldVAO(e.context,s);this.vaoData={scalar:r}}break;case"wind_speed":{const s=Q(this.source,this.symbolizerParameters),r=this._createVectorFieldVAO(e.context,s),a=H(this.source,this.symbolizerParameters),l=this._createVectorFieldVAO(e.context,a);this.vaoData={magdir:r,scalar:l}}}}this.ready(),this.requestRender()}}_createTransforms(){return{dvs:V()}}onAttach(){this.invalidateVAO()}onDetach(){this.invalidateVAO()}_createVectorFieldVAO(e,t){const{vertexData:s,indexData:r}=t,a=J.createVertex(e,35044,new Float32Array(s)),l=J.createIndex(e,35044,new Uint32Array(r)),o=be("vector-field",{geometry:[{location:0,name:"a_pos",count:2,type:5126,normalized:!1},{location:1,name:"a_offset",count:2,type:5126,normalized:!1},{location:2,name:"a_vv",count:2,type:5126,normalized:!1}]});return{vao:new xe(e,o.attributes,o.bufferLayouts,{geometry:a},l),elementCount:r.length}}}class Le extends A{constructor(e,t,s,r,a,l=null){super(e,t,s,r,a),this.tileData=new ke(l),this.tileData.coordScale=[r,a],this.tileData.once("isReady",()=>this.ready())}destroy(){super.destroy(),this.tileData.destroy(),this.tileData=null,this.stage=null}set stencilRef(e){this.tileData.stencilRef=e}get stencilRef(){return this.tileData.stencilRef}_createTransforms(){return{dvs:V(),tileMat3:V()}}setTransform(e,t){super.setTransform(e,t);const s=t/(e.resolution*e.pixelRatio),r=this.transforms.tileMat3,[a,l]=this.tileData.offset,o=[this.x+a*t,this.y-l*t],[c,g]=e.toScreenNoRotation([0,0],o),{symbolTileSize:p}=this.tileData.symbolizerParameters,h=Math.round((this.width-this.tileData.offset[0])/p)*p,m=Math.round((this.height-this.tileData.offset[1])/p)*p,f=h/this.rangeX*s,x=m/this.rangeY*s;ne(r,f,0,0,0,x,0,c,g,1),he(this.transforms.dvs,e.displayViewMat3,r),this.tileData.transforms.dvs=this.transforms.dvs}onAttach(){this.tileData.stage=this.stage}onDetach(){this.tileData.stage=null}}class je extends ${constructor(){super(...arguments),this.isCustomTilingScheme=!1,this.symbolTypes=["triangle"]}createTile(e){const t=this._tileInfoView.getTileBounds(L(),e),[s,r]=this._tileInfoView.tileInfo.size;return new Le(e,t[0],t[3],s,r)}destroyTile(){}prepareRenderPasses(e){const t=e.registerRenderPass({name:"imagery (vf tile)",brushes:[ge],target:()=>this.children.map(s=>s.tileData),drawPhase:C.MAP});return[...super.prepareRenderPasses(e),t]}doRender(e){this.visible&&e.drawPhase===C.MAP&&this.symbolTypes.forEach(t=>{e.renderPass=t,super.doRender(e)})}}let _=class extends y{constructor(){super(...arguments),this._handle=null,this.container=null,this.layer=null,this.type="rasterVF"}canUseWebGLForProcessing(){return!1}async fetchTile(i,e){const t=await this.layer.fetchTile(i.level,i.row,i.col,e);return this.layer.rasterInfo.dataType==="vector-magdir"&&t!=null&&t.pixelBlock&&(t.pixelBlock=await this.layer.convertVectorFieldData(t.pixelBlock,e)),t}updateTileSource(i,e){const t=e.symbolizerParams,{tileData:s}=i;s.key=i.key,s.width=this._tileInfoView.tileInfo.size[0],s.height=this._tileInfoView.tileInfo.size[1];const{symbolTileSize:r}=t,{source:a}=e;if(s.offset=this._getTileSymbolOffset(s.key,r),d(a)&&d(a.pixelBlock)){const l={extent:a.extent,pixelBlock:a.pixelBlock};s.rawPixelData=l,s.source=this._sampleVectorFieldData(a.pixelBlock,t,s.offset),s.symbolizerParameters=t}else{const l=[Math.round((this._tileInfoView.tileInfo[0]-s.offset[0])/r),Math.round((this._tileInfoView.tileInfo[1]-s.offset[1])/r)],o=this.createEmptyTilePixelBlock(l);s.source=o,s.symbolizerParameters=t}return s.invalidateVAO(),Promise.resolve(null)}updateTileSymbolizerParameters(i,e){var t;const s=e.local,{symbolTileSize:r}=s,{tileData:a}=i;a.offset=this._getTileSymbolOffset(a.key,r);const l=a.symbolizerParameters.symbolTileSize;return a.symbolizerParameters=s,d((t=a.rawPixelData)==null?void 0:t.pixelBlock)&&l!==r&&(a.source=this._sampleVectorFieldData(a.rawPixelData.pixelBlock,a.symbolizerParameters,a.offset)),Promise.resolve(null)}install(i){this.container=new je(this._tileInfoView),this.container.isCustomTilingScheme=this._isCustomTilingScheme,this._updateSymbolType(this.layer.renderer),this._handle=this.layer.watch("renderer",e=>this._updateSymbolType(e)),i.addChild(this.container)}uninstall(){this.container.removeAllChildren(),this._handle.remove(),this._handle=null,this.container.remove(),super.uninstall()}_getTileSymbolOffset(i,e){const t=i.col*this._tileInfoView.tileInfo.size[0]%e,s=i.row*this._tileInfoView.tileInfo.size[1]%e;return[t>e/2?e-t:-t,s>e/2?e-s:-s]}_sampleVectorFieldData(i,e,t){const{symbolTileSize:s}=e;return Ie(i,"vector-uv",s,t)}_updateSymbolType(i){i.type==="vector-field"&&(this.container.symbolTypes=i.style==="wind-barb"?["scalar","triangle"]:i.style==="simple-scalar"?["scalar"]:["triangle"])}};n([u()],_.prototype,"container",void 0),n([u()],_.prototype,"layer",void 0),n([u()],_.prototype,"type",void 0),_=n([T("esri.views.2d.layers.imagery.VectorFieldTileView2D")],_);const Ee=_,Ge=i=>{let e=class extends i{constructor(){super(...arguments),this._rasterFieldPrefix="Raster.",this.layer=null,this.view=null,this.fullExtent=null,this.tileInfo=null,this.datumTransformation=null}get hasTilingEffects(){return this.layer.renderer&&"dynamicRangeAdjustment"in this.layer.renderer&&this.layer.renderer.dynamicRangeAdjustment}async fetchPopupFeatures(t,s){const{layer:r}=this;if(!t)return Promise.reject(new I("imageryTileLayerView:fetchPopupFeatures","Nothing to fetch without area",{layer:r}));const{popupEnabled:a}=r,l=Se(r,s);if(!a||!d(l))throw new I("imageryTileLayerView:fetchPopupFeatures","Missing required popupTemplate or popupEnabled",{popupEnabled:a,popupTemplate:l});const o=[],{value:c,magdirValue:g}=await r.identify(t,{timeExtent:this.timeExtent});let p="";if(c&&c.length){var h,m;p=r.type==="imagery-tile"&&r.hasStandardTime()&&c[0]!=null?c.map(S=>r.getStandardTimeValue(S)).join(", "):c.join(", ");const f={ObjectId:0},x="Raster.ServicePixelValue";f[x]=this._formatAttributeValue(p,x);const D=(h=r.rasterInfo)==null||(m=h.attributeTable)==null?void 0:m.features;if(D&&D.length>0){const S=D.filter(b=>{const P=b.attributes.value||b.attributes.Value||b.attributes.VALUE;return String(P)===p});if(S.length>0){const b=S[0];if(b){for(const P in b.attributes)if(b.attributes.hasOwnProperty(P)){const k=this._rasterFieldPrefix+P;f[k]=this._formatAttributeValue(b.attributes[P],k)}}}}const F=r.rasterInfo.dataType;F!=="vector-magdir"&&F!=="vector-uv"||(f["Raster.Magnitude"]=g==null?void 0:g[0],f["Raster.Direction"]=g==null?void 0:g[1]);const R=new B(this.fullExtent.clone(),null,f);R.layer=r,R.sourceLayer=R.layer,o.push(R)}return o}updateFullExtent(){const t=this.layer.tileInfo;if(!(t&&t.spatialReference))return Promise.reject(new I("layerview:tiling-information-missing","The layer doesn't provide tiling information",{layer:this.layer}));if(G(this.layer.fullExtent))return Promise.reject(new I("layerview:extent-missing","The layer doesn't provide a full extent.",{layer:this.layer}));const s=M(this.layer.fullExtent,this.view.spatialReference,!1),r=Te(this.layer.fullExtent,this.view.spatialReference,s);return r==null?Promise.reject(new I("layerview:projection-not-supported","The layer extent cannot be projected to the view's spatial reference",{layer:this.layer})):(this._set("fullExtent",r),this.datumTransformation||(this.datumTransformation=M(this.layer.fullExtent,this.view.spatialReference,!0)),Promise.resolve())}_formatAttributeValue(t,s){if(typeof t=="string"){const r=this.layer.popupTemplate&&this.layer.popupTemplate.fieldInfos,a=this._getFieldInfo(r,s),l=a&&a.format;if(l){let o,c;return t.trim().indexOf(",")>-1?(o=",",c=o+" ",this._formatDelimitedString(t,o,c,l)):t.trim().indexOf(" ")>-1?(o=c=" ",this._formatDelimitedString(t,o,c,l)):this._formatNumberFromString(t,l)}}return t}_getFieldInfo(t,s){if(!t||!t.length||!s)return;const r=s.toLowerCase();let a;return t.some(l=>!(!l.fieldName||l.fieldName.toLowerCase()!==r&&l.fieldName.toLowerCase()!==r.replace(/ /g,"_"))&&(a=l,!0)),a}_formatDelimitedString(t,s,r,a){return t&&s&&r&&a?t.trim().split(s).map(l=>this._formatNumberFromString(l,a)).join(r):t}_formatNumberFromString(t,s){if(!t||!s)return t;const r=Number(t);return isNaN(r)?t:s.format(r)}};return n([u()],e.prototype,"layer",void 0),n([u(ue)],e.prototype,"timeExtent",void 0),n([u()],e.prototype,"view",void 0),n([u()],e.prototype,"fullExtent",void 0),n([u()],e.prototype,"tileInfo",void 0),n([u({readOnly:!0})],e.prototype,"hasTilingEffects",null),e=n([T("esri.views.layers.ImageryTileLayerView")],e),e},Y=j.getLogger("esri.views.2d.layers.ImageryTileLayerView2D");let v=class extends Ge(ze(ye(pe))){constructor(){super(...arguments),this._useWebGLForProcessing=!0,this._useProgressiveUpdate=!0,this.subview=null}initialize(){const i=this.updateFullExtent();this.addResolvingPromise(i)}get useWebGLForProcessing(){return this._useWebGLForProcessing}set useWebGLForProcessing(i){this._useWebGLForProcessing=i,this.subview&&"useWebGLForProcessing"in this.subview&&(this.subview.useWebGLForProcessing=i)}get useProgressiveUpdate(){return this._useWebGLForProcessing}set useProgressiveUpdate(i){this._useProgressiveUpdate=i,this.subview&&"useProgressiveUpdate"in this.subview&&(this.subview.useProgressiveUpdate=i)}update(i){this.subview.update(i),this.notifyChange("updating")}isUpdating(){return!this.subview||this.subview.updating}attach(){this.layer.increaseRasterJobHandlerUsage(),this._updateSubview(),this.handles.add([ce(this.layer,["bandIds","renderer","interpolation","multidimensionalDefinition"],(i,e,t)=>{const s=t==="multidimensionalDefinition",r=t==="interpolation"&&(i==="majority"||e==="majority")&&N(this.layer),a=t==="renderer"&&e.type!==i.type;a&&this._updateSubview();const l=s||r||a;this.subview.redrawOrRefetch(l).catch(o=>{z(o)||Y.error(o)}),this.notifyChange("updating")}),U(this,["layer.blendMode"],i=>{this.subview&&(this.subview.container.blendMode=i)},!0),U(this,["layer.effect"],i=>{this.subview&&(this.subview.container.effect=i)},!0),U(this,"timeExtent",()=>{this.subview.redrawOrRefetch(!0).catch(i=>{z(i)||Y.error(i)})})],"attach")}detach(){this.handles.remove("attach"),this.layer.decreaseRasterJobHandlerUsage(),this.subview.uninstall()}moveStart(){this.requestUpdate()}viewChange(){this.requestUpdate()}moveEnd(){this.subview.moveEnd()}async hitTest(i,e){return[new B({attributes:{},geometry:i.clone()})]}doRefresh(){return this.subview.doRefresh()}_updateSubview(){const i=this.layer.renderer.type==="vector-field"?"rasterVF":this.layer.renderer.type==="animated-flow"?"rasterAnimatedFlow":"raster";if(this.subview){if(this.subview.type===i)return;this.subview.uninstall()}const{layer:e}=this;let t;t=i==="rasterVF"?new Ee({layer:e,layerView:this}):i==="rasterAnimatedFlow"?new de({layer:e,layerView:this}):new Fe({layer:e,layerView:this}),"useWebGLForProcessing"in t&&(t.useWebGLForProcessing=this._useWebGLForProcessing),"useProgressiveUpdate"in t&&(t.useProgressiveUpdate=this._useProgressiveUpdate),"previousLOD"in t&&(t.previousLOD=this.subview&&"previousLOD"in this.subview&&this.subview.previousLOD),t.attach(),t.install(this.container),t.container.blendMode=e.blendMode,t.container.effect=e.effect,this.subview=t,this.requestUpdate()}};n([u()],v.prototype,"subview",void 0),n([u()],v.prototype,"useWebGLForProcessing",null),n([u()],v.prototype,"useProgressiveUpdate",null),v=n([T("esri.views.2d.layers.ImageryTileLayerView2D")],v);const ot=v;export{ot as default};