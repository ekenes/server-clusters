var E=Object.defineProperty;var x=Object.getOwnPropertySymbols;var R=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable;var P=(i,e,t)=>e in i?E(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,d=(i,e)=>{for(var t in e||(e={}))R.call(e,t)&&P(i,t,e[t]);if(x)for(var t of x(e))G.call(e,t)&&P(i,t,e[t]);return i};import{ag as F,gf as w,ci as W,C as B,cB as k,bi as z,cl as K,r as b,b as N,fE as O,cm as M,aO as U,gi as H,gj as D,cw as J,cN as Q,X as h,Y as p,Z as X}from"./vendor.1906794a.js";import{b as _,g as Y,d as Z}from"./kmlUtils.e04199da.js";import{g as ii}from"./Bitmap.7420dc51.js";import{t as ei}from"./BitmapContainer.2584eaf7.js";import{l as ti,u as si}from"./LayerView.31466adc.js";import{i as V}from"./GraphicContainer.33c8eea2.js";import{i as f}from"./BaseGraphicContainer.d5f8ca0a.js";import"./Container.3129b529.js";import"./Texture.e5002286.js";import"./WGLContainer.85960f9a.js";import"./definitions.21e97413.js";import"./VertexArrayObject.fb67875c.js";import"./Utils.dc5734bd.js";import"./ShaderCompiler.c7c7b63f.js";import"./config.2a39d8a4.js";import"./GeometryUtils.ea8c8742.js";import"./MaterialKey.301bf49f.js";import"./pixelUtils.e90a335a.js";import"./earcut.f20dd8d8.js";import"./CIMSymbolHelper.96d440ee.js";import"./BidiEngine.aae60613.js";import"./GeometryUtils.d4e26b77.js";import"./projectionSupport.e16039e3.js";import"./json.2d0d6862.js";import"./FeatureContainer.76fc9ec8.js";import"./TileContainer.26dac650.js";import"./visualVariablesUtils.c887ba43.js";import"./visualVariablesUtils.a2feeb91.js";import"./Matcher.a4434050.js";import"./tileUtils.38de3c83.js";import"./TileClipper.37214276.js";import"./cimSymbolUtils.6ee77631.js";import"./quantizationUtils.f38724ee.js";import"./devEnvironmentUtils.444b8fd1.js";import"./schemaUtils.a83c8525.js";import"./MD5.f9440c6b.js";import"./util.aa5f648b.js";import"./ComputedAttributeStorage.1ad4cf86.js";import"./FeatureSetReader.deb82ddc.js";import"./centroid.4d0eaa21.js";import"./vec3f32.9cc42d31.js";class L{constructor(){this.allSublayers=new Map,this.allPoints=[],this.allPolylines=[],this.allPolygons=[],this.allMapImages=[]}}let o=class extends ti(si){constructor(){super(...arguments),this._handles=new F,this._bitmapIndex=new Map,this._mapImageContainer=new ei,this._kmlVisualData=new L,this.allVisiblePoints=new w,this.allVisiblePolylines=new w,this.allVisiblePolygons=new w,this.allVisibleMapImages=new W}async hitTest(i,e){var t,s,r;return(await Promise.all([(t=this._pointsView)==null?void 0:t.hitTest(i),(s=this._polylinesView)==null?void 0:s.hitTest(i),(r=this._polygonsView)==null?void 0:r.hitTest(i)])).flat().filter(a=>!!a&&(a.layer=this.layer,a.sourceLayer=this.layer,!0))}update(i){this._polygonsView&&this._polygonsView.processUpdate(i),this._polylinesView&&this._polylinesView.processUpdate(i),this._pointsView&&this._pointsView.processUpdate(i)}attach(){this._handles.add([this.allVisibleMapImages.on("change",i=>{i.added.forEach(e=>this._addMapImage(e)),i.removed.forEach(e=>this._removeMapImage(e))})]),this.container.addChild(this._mapImageContainer),this._polygonsView=new f({view:this.view,graphics:this.allVisiblePolygons,requestUpdateCallback:()=>this.requestUpdate(),container:new V(this.view.featuresTilingScheme)}),this.container.addChild(this._polygonsView.container),this._polylinesView=new f({view:this.view,graphics:this.allVisiblePolylines,requestUpdateCallback:()=>this.requestUpdate(),container:new V(this.view.featuresTilingScheme)}),this.container.addChild(this._polylinesView.container),this._pointsView=new f({view:this.view,graphics:this.allVisiblePoints,requestUpdateCallback:()=>this.requestUpdate(),container:new V(this.view.featuresTilingScheme)}),this.container.addChild(this._pointsView.container),this.watch("layer.visibleSublayers",i=>{for(const[e,t]of this._kmlVisualData.allSublayers)t.visibility=0;for(const e of i){const t=this._kmlVisualData.allSublayers.get(e.id);t&&(t.visibility=1)}this._refreshCollections()}),this._fetchingPromise=this._fetchService().then(()=>{this._fetchingPromise=null,this.notifyChange("updating")})}detach(){this._handles.removeAll(),this._mapImageContainer.removeAllChildren(),this.container.removeAllChildren(),this._bitmapIndex.clear(),this._polygonsView&&(this._polygonsView.destroy(),this._polygonsView=null),this._polylinesView&&(this._polylinesView.destroy(),this._polylinesView=null),this._pointsView&&(this._pointsView.destroy(),this._pointsView=null)}moveStart(){}viewChange(){this._polygonsView.viewChange(),this._polylinesView.viewChange(),this._pointsView.viewChange()}moveEnd(){}isUpdating(){return this._fetchingPromise!=null||this._pointsView.updating||this._polygonsView.updating||this._polylinesView.updating}_addMapImage(i){(this.view.spatialReference.isWGS84||this.view.spatialReference.isWebMercator)&&B(i.href,{responseType:"image"}).then(({data:e})=>{let t=k.fromJSON(i.extent);z(t,this.view.spatialReference)&&(t=K(t,this.view.spatialReference));const s=new ii(e,"standard");s.x=t.xmin,s.y=t.ymax,s.resolution=t.width/e.naturalWidth,s.rotation=i.rotation,this._mapImageContainer.addChild(s),this._bitmapIndex.set(i,s)})}async _getViewDependentUrl(i,e){const{viewFormat:t,viewBoundScale:s,httpQuery:r}=i;if(b(t)){if(N(e))throw new Error("Loading this network link requires a view state.");let a;if(await O(),b(s)&&s!==1){const n=new k(e.extent);n.expand(s),a=n}else a=e.extent;a=M(a,U.WGS84);const m=M(a,U.WebMercator),c=a.xmin,l=a.xmax,T=a.ymin,$=a.ymax,A=e.size[0]*e.pixelRatio,q=e.size[1]*e.pixelRatio,v=Math.max(m.width,m.height),S={"[bboxWest]":c.toString(),"[bboxEast]":l.toString(),"[bboxSouth]":T.toString(),"[bboxNorth]":$.toString(),"[lookatLon]":a.center.x.toString(),"[lookatLat]":a.center.y.toString(),"[lookatRange]":v.toString(),"[lookatTilt]":"0","[lookatHeading]":e.rotation.toString(),"[lookatTerrainLon]":a.center.x.toString(),"[lookatTerrainLat]":a.center.y.toString(),"[lookatTerrainAlt]":"0","[cameraLon]":a.center.x.toString(),"[cameraLat]":a.center.y.toString(),"[cameraAlt]":v.toString(),"[horizFov]":"60","[vertFov]":"60","[horizPixels]":A.toString(),"[vertPixels]":q.toString(),"[terrainEnabled]":"0","[clientVersion]":H,"[kmlVersion]":"2.2","[clientName]":"ArcGIS API for JavaScript","[language]":"en-US"},j=n=>{for(const C in n)for(const I in S)n[C]=n[C].replace(I,S[I])},y=D(t);j(y);let g={};b(r)&&(g=D(r),j(g));const u=J(i.href);return u.query=d(d(d({},u.query),y),g),`${u.path}?${Q(y)}`}return i.href}async _fetchService(){const i=new L;await this._loadVisualData(this.layer.url,i),this._kmlVisualData=i,this._refreshCollections()}_refreshCollections(){this.allVisiblePoints.removeAll(),this.allVisiblePolylines.removeAll(),this.allVisiblePolygons.removeAll(),this.allVisibleMapImages.removeAll(),this.allVisiblePoints.addMany(this._kmlVisualData.allPoints.filter(i=>this._isSublayerVisible(i.sublayerId)).map(({item:i})=>i)),this.allVisiblePolylines.addMany(this._kmlVisualData.allPolylines.filter(i=>this._isSublayerVisible(i.sublayerId)).map(({item:i})=>i)),this.allVisiblePolygons.addMany(this._kmlVisualData.allPolygons.filter(i=>this._isSublayerVisible(i.sublayerId)).map(({item:i})=>i)),this.allVisibleMapImages.addMany(this._kmlVisualData.allMapImages.filter(i=>this._isSublayerVisible(i.sublayerId)).map(({item:i})=>i))}_isSublayerVisible(i){const e=this._kmlVisualData.allSublayers.get(i);return!!e.visibility&&(e.parentFolderId===-1||this._isSublayerVisible(e.parentFolderId))}_loadVisualData(i,e){return this._fetchParsedKML(i).then(async t=>{for(const s of t.sublayers){e.allSublayers.set(s.id,s);const r=s.points?await _(s.points):[],a=s.polylines?await _(s.polylines):[],m=s.polygons?await _(s.polygons):[],c=s.mapImages||[];if(e.allPoints.push(...r.map(l=>({item:l,sublayerId:s.id}))),e.allPolylines.push(...a.map(l=>({item:l,sublayerId:s.id}))),e.allPolygons.push(...m.map(l=>({item:l,sublayerId:s.id}))),e.allMapImages.push(...c.map(l=>({item:l,sublayerId:s.id}))),s.networkLink){const l=await this._getViewDependentUrl(s.networkLink,this.view.state);await this._loadVisualData(l,e)}}})}_fetchParsedKML(i){return Y(i,this.view.spatialReference,this.layer.refreshInterval).then(e=>Z(e.data))}_removeMapImage(i){const e=this._bitmapIndex.get(i);e&&(this._mapImageContainer.removeChild(e),this._bitmapIndex.delete(i))}};h([p()],o.prototype,"_pointsView",void 0),h([p()],o.prototype,"_polylinesView",void 0),h([p()],o.prototype,"_polygonsView",void 0),h([p()],o.prototype,"_fetchingPromise",void 0),h([p()],o.prototype,"updating",void 0),o=h([X("esri.views.2d.layers.KMLLayerView2D")],o);const Ni=o;export{Ni as default};
