var V=Object.defineProperty,j=Object.defineProperties;var q=Object.getOwnPropertyDescriptors;var y=Object.getOwnPropertySymbols;var Q=Object.prototype.hasOwnProperty,S=Object.prototype.propertyIsEnumerable;var d=(e,t,i)=>t in e?V(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,w=(e,t)=>{for(var i in t||(t={}))Q.call(t,i)&&d(e,i,t[i]);if(y)for(var i of y(t))S.call(t,i)&&d(e,i,t[i]);return e},g=(e,t)=>j(e,q(t));import{X as c,Y as _,Z as v,e as u,cg as U,r as C,s as F,ft as x,fQ as P,fR as R,h as m,bl as I}from"./vendor.1906794a.js";import{r as L,o as T,n as b}from"./imageUtils.ac363169.js";import{l as k,u as z}from"./LayerView.31466adc.js";import{i as $}from"./RefreshableLayerView.cc10fb38.js";import{s as E,a as A}from"./drapedUtils.11fab57e.js";import"./BitmapTileContainer.6b4f7dfa.js";import"./Bitmap.7420dc51.js";import"./Container.3129b529.js";import"./Texture.e5002286.js";import"./TileContainer.26dac650.js";import"./Utils.dc5734bd.js";import"./WGLContainer.85960f9a.js";import"./definitions.21e97413.js";import"./VertexArrayObject.fb67875c.js";import"./ShaderCompiler.c7c7b63f.js";import"./config.2a39d8a4.js";import"./GeometryUtils.ea8c8742.js";import"./MaterialKey.301bf49f.js";import"./pixelUtils.e90a335a.js";import"./earcut.f20dd8d8.js";const G=e=>{let t=class extends e{async fetchPopupFeatures(i,a){const{layer:l}=this;if(!i)return Promise.reject(new u("tilelayerview:fetchPopupFeatures","Nothing to fetch without area",{layer:l}));if(l.type!=="tile")return Promise.reject(new u("tilelayerview:fetchPopupFeatures","Layer type should be 'tile'",{type:l.type}));const n=this.get("view.scale"),h=l.allSublayers.toArray().filter(s=>{const r=s.minScale===0||n<=s.minScale,o=s.maxScale===0||n>=s.maxScale;return s.popupTemplate&&s.popupEnabled&&s.visible&&r&&o});return U(h.map(async s=>{const r=s.createQuery(),o=C(a)?a.event:null,f=E({renderer:s.renderer,event:o});return r.geometry=this.createFetchPopupFeaturesQueryGeometry(i,f),r.outFields=await s.popupTemplate.getRequiredFields(),(await s.queryFeatures(r)).features})).then(s=>[].concat(...s.map(r=>r.value).filter(Boolean)))}};return c([_()],t.prototype,"layer",void 0),t=c([v("esri.layers.mixins.TileLayerView")],t),t},B=F.getLogger("esri.views.2d.layers.TileLayerView2D"),D=[0,0];let p=class extends G($(L(k(z)))){constructor(){super(...arguments),this._tileStrategy=null,this._fetchQueue=null,this.layer=null}initialize(){const e=this.layer.tileInfo,t=e&&e.spatialReference;let i;t||(i=new u("layerview:tiling-information-missing","The layer doesn't provide tiling information",{layer:this.layer})),t.equals(this.view.spatialReference)||(i=new u("layerview:spatial-reference-incompatible","The spatial reference of this layer does not meet the requirements of the view",{layer:this.layer})),this.watch("resampling",()=>{this.doRefresh()}),i&&this.addResolvingPromise(Promise.reject(i))}get resampling(){return!("resampling"in this.layer)||this.layer.resampling!==!1}update(e){this._fetchQueue.pause(),this._fetchQueue.state=e.state,this._tileStrategy.update(e),this._fetchQueue.resume(),this.notifyChange("updating")}attach(){const e="tileServers"in this.layer?this.layer.tileServers:null;this._tileInfoView=new x(this.layer.tileInfo,this.layer.fullExtent),this._fetchQueue=new P({tileInfoView:this._tileInfoView,concurrency:e&&10*e.length||10,process:(t,i)=>this.fetchTile(t,i)}),this._tileStrategy=new R({cachePolicy:"keep",resampling:this.resampling,acquireTile:t=>this.acquireTile(t),releaseTile:t=>this.releaseTile(t),tileInfoView:this._tileInfoView}),this.requestUpdate(),this.container.requestRender(),super.attach()}detach(){super.detach(),this._tileStrategy.destroy(),this._fetchQueue.clear(),this.container.removeAllChildren(),this._fetchQueue=this._tileStrategy=this._tileInfoView=null}moveStart(){this.requestUpdate()}viewChange(){this.requestUpdate()}moveEnd(){this.requestUpdate()}createFetchPopupFeaturesQueryGeometry(e,t){return A(e,t,this.view)}async doRefresh(){this.updateRequested||this.suspended||(this._fetchQueue.reset(),this._tileStrategy.tiles.forEach(e=>this._enqueueTileFetch(e)),this.notifyChange("updating"))}isUpdating(){var e;return((e=this._fetchQueue)==null?void 0:e.length)>0}acquireTile(e){const t=this._bitmapView.createTile(e),i=t.bitmap;return[i.x,i.y]=this._tileInfoView.getTileCoords(D,t.key),i.resolution=this._tileInfoView.getTileResolution(t.key),[i.width,i.height]=this._tileInfoView.tileInfo.size,this._enqueueTileFetch(t),this._bitmapView.addChild(t),this.requestUpdate(),t}releaseTile(e){this._fetchQueue.abort(e.key.id),this._bitmapView.removeChild(e),e.once("detach",()=>e.destroy()),this.requestUpdate()}async fetchTile(e,t={}){const i="tilemapCache"in this.layer?this.layer.tilemapCache:null,{signal:a,resamplingLevel:l=0}=t;if(!i)try{return await this._fetchImage(e,a)}catch(s){if(!m(s)&&!this.resampling)return T(this._tileInfoView.tileInfo.size);if(l<3){const r=this._tileInfoView.getTileParentId(e.id);if(r){const o=new I(r),f=await this.fetchTile(o,g(w({},t),{resamplingLevel:l+1}));return b(this._tileInfoView,f,o,e)}}throw s}const n=new I(0,0,0,0);let h;try{if(await i.fetchAvailabilityUpsample(e.level,e.row,e.col,n,{signal:a}),n.level!==e.level&&!this.resampling)return T(this._tileInfoView.tileInfo.size);h=await this._fetchImage(n,a)}catch(s){if(m(s))throw s;h=await this._fetchImage(e,a)}return this.resampling?b(this._tileInfoView,h,n,e):h}async _enqueueTileFetch(e){if(!this._fetchQueue.has(e.key.id)){try{const t=await this._fetchQueue.push(e.key);e.bitmap.source=t,e.bitmap.width=this._tileInfoView.tileInfo.size[0],e.bitmap.height=this._tileInfoView.tileInfo.size[1],e.once("attach",()=>this.requestUpdate())}catch(t){m(t)||B.error(t)}this.requestUpdate()}}async _fetchImage(e,t){return this.layer.fetchTile(e.level,e.row,e.col,{signal:t})}};c([_()],p.prototype,"resampling",null),p=c([v("esri.views.2d.layers.TileLayerView2D")],p);const ue=p;export{ue as default};
