var w=Object.defineProperty;var m=Object.getOwnPropertySymbols;var $=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;var g=(e,t,i)=>t in e?w(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,f=(e,t)=>{for(var i in t||(t={}))$.call(t,i)&&g(e,i,t[i]);if(m)for(var i of m(t))R.call(t,i)&&g(e,i,t[i]);return e};import{s as q,X as s,Y as r,Z as v,hK as P,g9 as T,r as b,cv as D,cB as O,e as I,b as k,bz as Q,cF as G,d as L,fN as S,ix as Z,iy as z,iz as C,hX as B,iA as V,hY as A,hZ as U,cJ as W,cL as M,cQ as Y,aO as F,iB as E,iC as K,b$ as x,i1 as X,eQ as h,ie as H,iD as ee,cY as te,ig as ie,iE as se,iF as re,iG as oe,is as ne,iH as ae,i4 as le,gc as ue,iI as de,i3 as pe,iJ as ce,iK as he,iL as ye,cP as fe,i5 as me}from"./vendor.1906794a.js";import{a as ge}from"./clientSideDefaults.61676515.js";import"./QueryEngineCapabilities.83e56447.js";const j=q.getLogger("esri.layers.graphics.sources.GeoJSONSource");let p=class extends P{constructor(){super(...arguments),this.type="geojson",this.refresh=T(async e=>{await this.load();const{extent:t,timeExtent:i}=await this._connection.invoke("refresh",e);return this.sourceJSON.extent=t,i&&(this.sourceJSON.timeInfo.timeExtent=[i.start,i.end]),{dataChanged:!0,updates:{extent:this.sourceJSON.extent,timeInfo:this.sourceJSON.timeInfo}}})}load(e){const t=b(e)?e.signal:null;return this.addResolvingPromise(this._startWorker(t)),Promise.resolve(this)}destroy(){var e;(e=this._connection)==null||e.close(),this._connection=null}applyEdits(e){return this.load().then(()=>this._applyEdits(e))}openPorts(){return this.load().then(()=>this._connection.openPorts())}queryFeatures(e,t={}){return this.load(t).then(()=>this._connection.invoke("queryFeatures",e?e.toJSON():null,t)).then(i=>D.fromJSON(i))}queryFeaturesJSON(e,t={}){return this.load(t).then(()=>this._connection.invoke("queryFeatures",e?e.toJSON():null,t))}queryFeatureCount(e,t={}){return this.load(t).then(()=>this._connection.invoke("queryFeatureCount",e?e.toJSON():null,t))}queryObjectIds(e,t={}){return this.load(t).then(()=>this._connection.invoke("queryObjectIds",e?e.toJSON():null,t))}queryExtent(e,t={}){return this.load(t).then(()=>this._connection.invoke("queryExtent",e?e.toJSON():null,t)).then(i=>({count:i.count,extent:O.fromJSON(i.extent)}))}querySnapping(e,t={}){return this.load(t).then(()=>this._connection.invoke("querySnapping",e,t))}_applyEdits(e){if(!this._connection)throw new I("geojson-layer-source:edit-failure","Memory source not loaded");const t=this.layer.objectIdField,i=[],n=[],d=[];if(e.addFeatures)for(const a of e.addFeatures)i.push(this._serializeFeature(a));if(e.deleteFeatures)for(const a of e.deleteFeatures)"objectId"in a&&a.objectId!=null?n.push(a.objectId):"attributes"in a&&a.attributes[t]!=null&&n.push(a.attributes[t]);if(e.updateFeatures)for(const a of e.updateFeatures)d.push(this._serializeFeature(a));return this._connection.invoke("applyEdits",{adds:i,updates:d,deletes:n}).then(({extent:a,timeExtent:l,featureEditResults:u})=>(this.sourceJSON.extent=a,l&&(this.sourceJSON.timeInfo.timeExtent=[l.start,l.end]),this._createEditsResult(u)))}_createEditsResult(e){return{addFeatureResults:e.addResults?e.addResults.map(this._createFeatureEditResult,this):[],updateFeatureResults:e.updateResults?e.updateResults.map(this._createFeatureEditResult,this):[],deleteFeatureResults:e.deleteResults?e.deleteResults.map(this._createFeatureEditResult,this):[],addAttachmentResults:[],updateAttachmentResults:[],deleteAttachmentResults:[]}}_createFeatureEditResult(e){const t=e.success===!0?null:e.error||{code:void 0,description:void 0};return{objectId:e.objectId,globalId:e.globalId,error:t?new I("geojson-layer-source:edit-failure",t.description,{code:t.code}):null}}_serializeFeature(e){const{attributes:t}=e,i=this._geometryForSerialization(e);return i?{geometry:i.toJSON(),attributes:t}:{attributes:t}}_geometryForSerialization(e){const{geometry:t}=e;return k(t)?null:t.type==="mesh"||t.type==="extent"?Q.fromExtent(t.extent):t}async _startWorker(e){this._connection=await G("GeoJSONSourceWorker",{strategy:L("feature-layers-workers")?"dedicated":"local",signal:e});const{fields:t,spatialReference:i,hasZ:n,geometryType:d,objectIdField:a,url:l,timeInfo:u,customParameters:_}=this.layer,J=this.layer.originOf("spatialReference")==="defaults",N={url:l,customParameters:_,fields:t&&t.map(y=>y.toJSON()),geometryType:S.toJSON(d),hasZ:n,objectIdField:a,timeInfo:u?u.toJSON():null,spatialReference:J?null:i&&i.toJSON()},c=await this._connection.invoke("load",N,{signal:e});for(const y of c.warnings)j.warn(y.message,{layer:this.layer,warning:y});c.featureErrors.length&&j.warn(`Encountered ${c.featureErrors.length} validation errors while loading features`,c.featureErrors),this.sourceJSON=c.layerDefinition,this.capabilities=ge(this.sourceJSON.hasZ,!0)}};s([r()],p.prototype,"capabilities",void 0),s([r()],p.prototype,"type",void 0),s([r({constructOnly:!0})],p.prototype,"layer",void 0),s([r()],p.prototype,"sourceJSON",void 0),p=s([v("esri.layers.graphics.sources.GeoJSONSource")],p);const ve=p,be=me();let o=class extends Z(z(C(B(V(A(U(W(M(Y))))))))){constructor(e){super(e),this.copyright=null,this.definitionExpression=null,this.displayField=null,this.editingEnabled=!1,this.elevationInfo=null,this.featureReduction=null,this.fields=null,this.fieldsIndex=null,this.fullExtent=null,this.geometryType=null,this.hasZ=void 0,this.labelsVisible=!0,this.labelingInfo=null,this.legendEnabled=!0,this.objectIdField=null,this.operationalLayerType="GeoJSON",this.popupEnabled=!0,this.popupTemplate=null,this.screenSizePerspectiveEnabled=!0,this.source=new ve({layer:this}),this.spatialReference=F.WGS84,this.templates=null,this.title="GeoJSON",this.type="geojson",this.typeIdField=null,this.types=null}destroy(){var e;(e=this.source)==null||e.destroy()}load(e){return this.addResolvingPromise(this.source.load(e).then(()=>{this.read(this.source.sourceJSON,{origin:"service",url:this.parsedUrl}),this.revert(["objectIdField","fields","timeInfo"],"service"),E(this.renderer,this.fieldsIndex),K(this.timeInfo,this.fieldsIndex)})),Promise.resolve(this)}get capabilities(){return this.source?this.source.capabilities:null}get createQueryVersion(){return this.commitProperty("definitionExpression"),this.commitProperty("timeExtent"),this.commitProperty("timeOffset"),this.commitProperty("geometryType"),this.commitProperty("capabilities"),(this._get("createQueryVersion")||0)+1}get defaultPopupTemplate(){return this.createPopupTemplate()}get isTable(){return this.loaded&&this.geometryType==null}get parsedUrl(){return this.url?x(this.url):null}set renderer(e){E(e,this.fieldsIndex),this._set("renderer",e)}set url(e){if(!e)return void this._set("url",e);const t=x(e);this._set("url",t.path),t.query&&(this.customParameters=f(f({},this.customParameters),t.query))}async applyEdits(e,t){const i=await import("./editingSupport.cf9942d0.js");await this.load();const n=await i.applyEdits(this,this.source,e,t);return this.read({extent:this.source.sourceJSON.extent,timeInfo:this.source.sourceJSON.timeInfo},{origin:"service",ignoreDefaults:!0}),n}on(e,t){return super.on(e,t)}createPopupTemplate(e){return X(this,e)}createQuery(){const e=new h,t=this.get("capabilities.data");e.returnGeometry=!0,t&&t.supportsZ&&(e.returnZ=!0),e.outFields=["*"],e.where=this.definitionExpression||"1=1";const{timeOffset:i,timeExtent:n}=this;return e.timeExtent=i!=null&&n!=null?n.offset(-i.value,i.unit):n||null,e}getFieldDomain(e,t){let i,n=!1;const d=t&&t.feature,a=d&&d.attributes,l=this.typeIdField&&a&&a[this.typeIdField];return l!=null&&this.types&&(n=this.types.some(u=>u.id==l&&(i=u.domains&&u.domains[e],i&&i.type==="inherited"&&(i=this._getLayerDomain(e)),!0))),n||i||(i=this._getLayerDomain(e)),i}getField(e){return this.fieldsIndex.get(e)}queryFeatures(e,t){return this.load().then(()=>this.source.queryFeatures(h.from(e)||this.createQuery(),t)).then(i=>{if(i!=null&&i.features)for(const n of i.features)n.layer=n.sourceLayer=this;return i})}queryObjectIds(e,t){return this.load().then(()=>this.source.queryObjectIds(h.from(e)||this.createQuery(),t))}queryFeatureCount(e,t){return this.load().then(()=>this.source.queryFeatureCount(h.from(e)||this.createQuery(),t))}queryExtent(e,t){return this.load().then(()=>this.source.queryExtent(h.from(e)||this.createQuery(),t))}async hasDataChanged(){try{const{dataChanged:e,updates:t}=await this.source.refresh(this.customParameters);return b(t)&&this.read(t,{origin:"service",url:this.parsedUrl,ignoreDefaults:!0}),e}catch{}return!1}_getLayerDomain(e){if(!this.fields)return null;let t=null;return this.fields.some(i=>(i.name===e&&(t=i.domain),!!t)),t}};s([r({readOnly:!0,json:{read:!1,write:!1}})],o.prototype,"capabilities",null),s([r({type:String})],o.prototype,"copyright",void 0),s([r({readOnly:!0})],o.prototype,"createQueryVersion",null),s([r({readOnly:!0})],o.prototype,"defaultPopupTemplate",null),s([r({type:String,json:{name:"layerDefinition.definitionExpression",write:{enabled:!0,allowNull:!0}}})],o.prototype,"definitionExpression",void 0),s([r({type:String})],o.prototype,"displayField",void 0),s([r({type:Boolean})],o.prototype,"editingEnabled",void 0),s([r(H)],o.prototype,"elevationInfo",void 0),s([r(ee)],o.prototype,"featureReduction",void 0),s([r({type:[te],json:{name:"layerDefinition.fields",write:{ignoreOrigin:!0,isRequired:!0},origins:{service:{name:"fields"}}}})],o.prototype,"fields",void 0),s([r(be.fieldsIndex)],o.prototype,"fieldsIndex",void 0),s([r({type:O,json:{name:"extent"}})],o.prototype,"fullExtent",void 0),s([r({type:["point","polygon","polyline","multipoint"],json:{read:{reader:S.read}}})],o.prototype,"geometryType",void 0),s([r({type:Boolean})],o.prototype,"hasZ",void 0),s([r(ie)],o.prototype,"id",void 0),s([r({type:Boolean,readOnly:!0})],o.prototype,"isTable",null),s([r(se)],o.prototype,"labelsVisible",void 0),s([r({type:[re],json:{name:"layerDefinition.drawingInfo.labelingInfo",read:{reader:oe},write:!0}})],o.prototype,"labelingInfo",void 0),s([r(ne)],o.prototype,"legendEnabled",void 0),s([r({type:["show","hide"]})],o.prototype,"listMode",void 0),s([r({type:String,json:{name:"layerDefinition.objectIdField",write:{ignoreOrigin:!0,isRequired:!0},origins:{service:{name:"objectIdField"}}}})],o.prototype,"objectIdField",void 0),s([r(ae)],o.prototype,"opacity",void 0),s([r({type:["GeoJSON"]})],o.prototype,"operationalLayerType",void 0),s([r({readOnly:!0})],o.prototype,"parsedUrl",null),s([r(le)],o.prototype,"popupEnabled",void 0),s([r({type:ue,json:{name:"popupInfo",write:!0}})],o.prototype,"popupTemplate",void 0),s([r({types:de,json:{name:"layerDefinition.drawingInfo.renderer",write:!0,origins:{service:{name:"drawingInfo.renderer"},"web-scene":{types:pe}}}})],o.prototype,"renderer",null),s([r(ce)],o.prototype,"screenSizePerspectiveEnabled",void 0),s([r({readOnly:!0})],o.prototype,"source",void 0),s([r({type:F})],o.prototype,"spatialReference",void 0),s([r({type:[he]})],o.prototype,"templates",void 0),s([r()],o.prototype,"title",void 0),s([r({json:{read:!1},readOnly:!0})],o.prototype,"type",void 0),s([r({type:String,readOnly:!0})],o.prototype,"typeIdField",void 0),s([r({type:[ye]})],o.prototype,"types",void 0),s([r(fe)],o.prototype,"url",null),o=s([v("esri.layers.GeoJSONLayer")],o);const Ee=o;export{Ee as default};
