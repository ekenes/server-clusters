import{X as i,Y as r,Z as j,hK as M,cv as N,r as w,aO as g,b as z,jp as Z,e as $,ia as A,iy as k,iz as U,hX as K,ix as V,iA as W,hY as H,cJ as Y,cK as X,hZ as ee,cL as te,cQ as ie,iB as D,i1 as se,eQ as R,iC as re,ie as oe,iD as ne,cY as ae,cB as pe,fN as T,iF as le,iG as ue,iE as de,is as ce,i4 as ye,gc as he,iI as fe,i3 as me,iJ as ge,iL as ve,cP as Se,i5 as be}from"./vendor.1906794a.js";import{N as xe,v as C,x as we,k as Ie,T as Fe,S as Oe,I as je,F as E,j as $e}from"./ogcFeatureUtils.8d30baa2.js";import"./geojson.d49fa7b8.js";import"./clientSideDefaults.61676515.js";import"./QueryEngineCapabilities.83e56447.js";let f=class extends M{constructor(){super(...arguments),this.featureDefinition=null,this.type="ogc-feature"}load(e){return this.addResolvingPromise(this._loadOGCServices(this.layer,e)),this.when()}getFeatureDefinition(){const{featureDefinition:{collection:e,layerDefinition:t,spatialReference:n,supportedCrs:s},layer:{apiKey:a,capabilities:l,customParameters:p}}=this;return{capabilities:l,collection:e,layerDefinition:t,queryParameters:{apiKey:a,customParameters:p},spatialReference:n,supportedCrs:s}}queryExtent(e,t={}){return null}queryFeatureCount(e,t={}){return null}queryFeatures(e,t={}){return this.queryFeaturesJSON(e,t).then(n=>N.fromJSON(n))}queryFeaturesJSON(e,t={}){const n=this.getFeatureDefinition();return this.load(t).then(()=>xe(n,e,t))}queryObjectIds(e,t={}){return null}supportsSpatialReference(e){return!(!e.isWGS84&&!e.isWebMercator)||!!this.featureDefinition.supportedCrs[e.wkid]}_conformsToType(e,t){var n;const s=new RegExp(`^${t}$`,"i");return(n=e.conformsTo.some(a=>s.test(a)))!=null&&n}_getCapabilities(e,t){var n,s,a,l,p,u,c;const d=w(t)?(n=t.components)==null?void 0:n.parameters:null;return{attachment:null,data:{isVersioned:!1,supportsAttachment:!1,supportsM:!1,supportsZ:e},metadata:{supportsAdvancedFieldProperties:!1},operations:{supportsCalculate:!1,supportsTruncate:!1,supportsValidateSql:!1,supportsAdd:!1,supportsDelete:!1,supportsEditing:!1,supportsChangeTracking:!1,supportsQuery:!1,supportsQueryAttachments:!1,supportsResizeAttachments:!1,supportsSync:!1,supportsUpdate:!1,supportsExceedsLimitStatistics:!1},query:{maxRecordCount:(s=(a=d==null||(l=d.limit)==null||(p=l.schema)==null?void 0:p.maximum)!=null?a:d==null||(u=d.limitFeatures)==null||(c=u.schema)==null?void 0:c.maximum)!=null?s:5e3,maxRecordCountFactor:void 0,standardMaxRecordCount:void 0,supportsCacheHint:!1,supportsCentroid:!1,supportsDisjointSpatialRelationship:!1,supportsDistance:!1,supportsDistinct:!1,supportsExtent:!1,supportsFormatPBF:!1,supportsGeometryProperties:!1,supportsHavingClause:!1,supportsHistoricMoment:!1,supportsMaxRecordCountFactor:!1,supportsOrderBy:!1,supportsPagination:!1,supportsPercentileStatistics:!1,supportsQuantization:!1,supportsQuantizationEditMode:!1,supportsQueryByOthers:!1,supportsQueryGeometry:!1,supportsResultType:!1,supportsStandardizedQueriesOnly:!1,supportsTopFeaturesQuery:!1,supportsStatistics:!1,supportsSqlExpression:!1,tileMaxRecordCount:void 0},queryRelated:{supportsCount:!1,supportsOrderBy:!1,supportsPagination:!1},editing:{supportsDeleteByAnonymous:!1,supportsDeleteByOthers:!1,supportsGeometryUpdate:!1,supportsGlobalId:!1,supportsReturnServiceEditsInSourceSpatialReference:!1,supportsRollbackOnFailure:!1,supportsUpdateByAnonymous:!1,supportsUpdateByOthers:!1,supportsUploadWithItemId:!1,supportsUpdateWithoutM:!1}}}_getExtent(e){var t;const n=(t=e.extent)==null?void 0:t.spatial;if(!n)return null;const s=n.bbox[0],a=s.length===4,l=s[0],p=s[1],u=a?void 0:s[2];return{xmin:l,ymin:p,xmax:a?s[2]:s[3],ymax:a?s[3]:s[4],zmin:u,zmax:a?void 0:s[5],spatialReference:g.WGS84.toJSON()}}_getStorageSpatialReference(e){var t;const n=(t=e.storageCrs)!=null?t:E,s=C(n);return z(s)?g.WGS84:new g({wkid:s})}_getSupportedSpatialReferences(e,t){var n;const s="#/crs",a=(n=e.crs)!=null?n:[E],l=a.includes(s)?a.filter(u=>u!==s).concat(t.crs):a,p=/^http:\/\/www\.opengis.net\/def\/crs\/epsg\/.*\/3785$/i;return l.filter(u=>!p.test(u))}async _loadOGCServices(e,t){const n=w(t)?t.signal:null,{apiKey:s,collectionId:a,customParameters:l,fields:p,geometryType:u,hasZ:c,objectIdField:d,timeInfo:I,url:P}=e,_={fields:p==null?void 0:p.map(h=>h.toJSON()),geometryType:Z.toJSON(u),hasZ:c,objectIdField:d,timeInfo:I==null?void 0:I.toJSON()},m={apiKey:s,customParameters:l,signal:n},v=await we(P,m),[F,O]=await Promise.all([Ie(v,m),Fe(v,m)]);if(!this._conformsToType(F,"http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/geojson"))throw new $("ogc-feature-layer:no-geojson-support","Server does not support geojson");const y=O.collections.find(h=>h.id===a);if(!y)throw new $("ogc-feature-layer:collection-not-found","Server does not contain the named collection");const q=this._conformsToType(F,"http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/oas30")?await Oe(v,m):null,S=await je(y,_,m),G=this._getCapabilities(S.hasZ,q),B=this._getExtent(y),Q=this._getStorageSpatialReference(y).toJSON(),L=this._getSupportedSpatialReferences(y,O),J=new RegExp(`^${$e}`,"i"),b={};for(const h of L){const x=C(h);w(x)&&(b[x]||(b[x]=h.replace(J,"")))}S.extent=B,this.featureDefinition={capabilities:G,collection:y,layerDefinition:S,queryParameters:{},spatialReference:Q,supportedCrs:b}}};i([r()],f.prototype,"featureDefinition",void 0),i([r({constructOnly:!0})],f.prototype,"layer",void 0),i([r()],f.prototype,"type",void 0),f=i([j("esri.layers.graphics.sources.OGCFeatureSource")],f);const De=f,Re=be();let o=class extends A(k(U(K(V(W(H(Y(X(ee(te(ie))))))))))){constructor(e){super(e),this.collectionId=null,this.copyright=null,this.definitionExpression=null,this.description=null,this.displayField=null,this.elevationInfo=null,this.featureReduction=null,this.fields=null,this.fieldsIndex=null,this.fullExtent=null,this.geometryType=null,this.hasZ=void 0,this.labelingInfo=null,this.labelsVisible=!0,this.legendEnabled=!0,this.objectIdField=null,this.operationalLayerType="OGCFeatureLayer",this.popupEnabled=!0,this.popupTemplate=null,this.screenSizePerspectiveEnabled=!0,this.source=new De({layer:this}),this.spatialReference=null,this.title=null,this.type="ogc-feature",this.typeIdField=null,this.types=null,this.url=null}destroy(){var e;(e=this.source)==null||e.destroy()}load(e){return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["OGCFeatureServer"]},e).then(()=>this._fetchService(e))),this.when()}get defaultPopupTemplate(){return this.createPopupTemplate()}get isTable(){return this.loaded&&this.geometryType==null}set renderer(e){D(e,this.fieldsIndex),this._set("renderer",e)}on(e,t){return super.on(e,t)}createPopupTemplate(e){return se(this,e)}createQuery(){return new R}getField(e){return this.fieldsIndex.get(e)}getFieldDomain(e,t){var n;let s,a=!1;const l=t==null||(n=t.feature)==null?void 0:n.attributes,p=this.typeIdField&&(l==null?void 0:l[this.typeIdField]);return p!=null&&this.types&&(a=this.types.some(u=>{var c,d;return u.id==p&&(s=(c=u.domains)==null?void 0:c[e],((d=s)==null?void 0:d.type)==="inherited"&&(s=this._getLayerDomain(e)),!0)})),a||s||(s=this._getLayerDomain(e)),s}queryFeatures(e,t){return this.load().then(()=>this.source.queryFeatures(R.from(e)||this.createQuery(),t)).then(n=>{var s;return n==null||(s=n.features)==null||s.forEach(a=>{a.layer=a.sourceLayer=this}),n})}async _fetchService(e){await this.source.load(e),this.read(this.source.featureDefinition,{origin:"service"}),D(this.renderer,this.fieldsIndex),re(this.timeInfo,this.fieldsIndex)}_getLayerDomain(e){if(!this.fields)return null;for(const t of this.fields)if(t.name===e&&t.domain)return t.domain;return null}};i([r({readOnly:!0,json:{origins:{service:{read:!0}}}})],o.prototype,"capabilities",void 0),i([r({type:String,json:{write:!0}})],o.prototype,"collectionId",void 0),i([r({type:String})],o.prototype,"copyright",void 0),i([r({readOnly:!0})],o.prototype,"defaultPopupTemplate",null),i([r({type:String})],o.prototype,"definitionExpression",void 0),i([r({readOnly:!0,type:String,json:{origins:{service:{name:"collection.description"}}}})],o.prototype,"description",void 0),i([r({type:String})],o.prototype,"displayField",void 0),i([r(oe)],o.prototype,"elevationInfo",void 0),i([r(ne)],o.prototype,"featureReduction",void 0),i([r({type:[ae],json:{origins:{service:{name:"layerDefinition.fields"}}}})],o.prototype,"fields",void 0),i([r(Re.fieldsIndex)],o.prototype,"fieldsIndex",void 0),i([r({readOnly:!0,type:pe,json:{origins:{service:{name:"layerDefinition.extent"}}}})],o.prototype,"fullExtent",void 0),i([r({type:T.apiValues,json:{origins:{service:{name:"layerDefinition.geometryType",read:{reader:T.read}}}}})],o.prototype,"geometryType",void 0),i([r({type:Boolean,json:{origins:{service:{name:"layerDefinition.hasZ"}}}})],o.prototype,"hasZ",void 0),i([r({type:Boolean,readOnly:!0})],o.prototype,"isTable",null),i([r({type:[le],json:{origins:{"web-document":{name:"layerDefinition.drawingInfo.labelingInfo",read:{reader:ue},write:!0}}}})],o.prototype,"labelingInfo",void 0),i([r(de)],o.prototype,"labelsVisible",void 0),i([r(ce)],o.prototype,"legendEnabled",void 0),i([r({type:String,json:{origins:{service:{name:"layerDefinition.objectIdField"}}}})],o.prototype,"objectIdField",void 0),i([r({type:["OGCFeatureLayer"]})],o.prototype,"operationalLayerType",void 0),i([r(ye)],o.prototype,"popupEnabled",void 0),i([r({type:he,json:{name:"popupInfo",write:!0}})],o.prototype,"popupTemplate",void 0),i([r({types:fe,json:{origins:{service:{name:"layerDefinition.drawingInfo.renderer",write:!1},"web-scene":{types:me,name:"layerDefinition.drawingInfo.renderer",write:!0}},name:"layerDefinition.drawingInfo.renderer",write:!0}})],o.prototype,"renderer",null),i([r(ge)],o.prototype,"screenSizePerspectiveEnabled",void 0),i([r({readOnly:!0})],o.prototype,"source",void 0),i([r({readOnly:!0,type:g,json:{origins:{service:{read:!0}}}})],o.prototype,"spatialReference",void 0),i([r({type:String,json:{write:{enabled:!0,ignoreOrigin:!0,isRequired:!0},origins:{service:{name:"collection.title"}}}})],o.prototype,"title",void 0),i([r({readOnly:!0,json:{read:!1}})],o.prototype,"type",void 0),i([r({type:String,readOnly:!0})],o.prototype,"typeIdField",void 0),i([r({type:[ve]})],o.prototype,"types",void 0),i([r(Se)],o.prototype,"url",void 0),o=i([j("esri.layers.OGCFeatureLayer")],o);const qe=o;export{qe as default};
