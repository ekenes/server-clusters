var L=Object.defineProperty,E=Object.defineProperties;var O=Object.getOwnPropertyDescriptors;var S=Object.getOwnPropertySymbols;var V=Object.prototype.hasOwnProperty,_=Object.prototype.propertyIsEnumerable;var P=(e,t,i)=>t in e?L(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,v=(e,t)=>{for(var i in t||(t={}))V.call(t,i)&&P(e,i,t[i]);if(S)for(var i of S(t))_.call(t,i)&&P(e,i,t[i]);return e},b=(e,t)=>E(e,O(t));import{X as r,Y as o,Z as l,ce as A,fz as T,cA as m,a_ as d,s as K,cI as D,cJ as k,cK as G,hY as M,cL as U,ia as z,cQ as Y,cY as w,hO as J,r as Q,aP as X,i1 as Z,jt as F,e as p,d9 as H,C as W,i4 as ee,gc as te,ct as re,ie,is as oe,bA as se,i5 as ne}from"./vendor.1906794a.js";import{N as ae}from"./SceneService.8e637312.js";import{c as R,d as le,b as de,a as pe}from"./PointCloudUniqueValueRenderer.8839e0ab.js";import"./resourceUtils.c988c7fd.js";let c=class extends A{constructor(e){super(e),this.field=null,this.type=null}clone(){return console.warn(".clone() is not implemented for "+this.declaredClass),null}};r([o({type:String,json:{write:{enabled:!0,isRequired:!0}}})],c.prototype,"field",void 0),r([o({readOnly:!0,nonNullable:!0,json:{read:!1}})],c.prototype,"type",void 0),c=r([l("esri.layers.pointCloudFilters.PointCloudFilter")],c);const g=c;var I;let u=I=class extends g{constructor(e){super(e),this.requiredClearBits=null,this.requiredSetBits=null,this.type="bitfield"}clone(){return new I({field:this.field,requiredClearBits:d(this.requiredClearBits),requiredSetBits:d(this.requiredSetBits)})}};r([o({type:[T],json:{write:{enabled:!0,overridePolicy(){return{enabled:!0,isRequired:!this.requiredSetBits}}}}})],u.prototype,"requiredClearBits",void 0),r([o({type:[T],json:{write:{enabled:!0,overridePolicy(){return{enabled:!0,isRequired:!this.requiredClearBits}}}}})],u.prototype,"requiredSetBits",void 0),r([m({pointCloudBitfieldFilter:"bitfield"})],u.prototype,"type",void 0),u=I=r([l("esri.layers.pointCloudFilters.PointCloudBitfieldFilter")],u);const ue=u;var $;let f=$=class extends g{constructor(e){super(e),this.includedReturns=[],this.type="return"}clone(){return new $({field:this.field,includedReturns:d(this.includedReturns)})}};r([o({type:[["firstOfMany","last","lastOfMany","single"]],json:{write:{enabled:!0,isRequired:!0}}})],f.prototype,"includedReturns",void 0),r([m({pointCloudReturnFilter:"return"})],f.prototype,"type",void 0),f=$=r([l("esri.layers.pointCloudFilters.PointCloudReturnFilter")],f);const ye=f;var x;let y=x=class extends g{constructor(e){super(e),this.mode="exclude",this.type="value",this.values=[]}clone(){return new x({field:this.field,mode:this.mode,values:d(this.values)})}};r([o({type:["exclude","include"],json:{write:{enabled:!0,isRequired:!0}}})],y.prototype,"mode",void 0),r([m({pointCloudValueFilter:"value"})],y.prototype,"type",void 0),r([o({type:[Number],json:{write:{enabled:!0,isRequired:!0}}})],y.prototype,"values",void 0),y=x=r([l("esri.layers.pointCloudFilters.PointCloudValueFilter")],y);const ce=y,fe={key:"type",base:g,typeMap:{value:ce,bitfield:ue,return:ye}};var C;let h=C=class extends R{constructor(e){super(e),this.type="point-cloud-rgb",this.field=null}clone(){return new C(b(v({},this.cloneProperties()),{field:d(this.field)}))}};r([m({pointCloudRGBRenderer:"point-cloud-rgb"})],h.prototype,"type",void 0),r([o({type:String,json:{write:!0}})],h.prototype,"field",void 0),h=C=r([l("esri.renderers.PointCloudRGBRenderer")],h);const he=h,j={key:"type",base:R,typeMap:{"point-cloud-class-breaks":le,"point-cloud-rgb":he,"point-cloud-stretch":de,"point-cloud-unique-value":pe},errorContext:"renderer"},q=K.getLogger("esri.layers.PointCloudLayer"),B=ne();let s=class extends ae(D(k(G(M(U(z(Y))))))){constructor(...e){super(...e),this.operationalLayerType="PointCloudLayer",this.popupEnabled=!0,this.popupTemplate=null,this.opacity=1,this.filters=[],this.fields=null,this.fieldsIndex=null,this.outFields=null,this.path=null,this.legendEnabled=!0,this.renderer=null,this.type="point-cloud"}normalizeCtorArgs(e,t){return typeof e=="string"?v({url:e},t):e}get defaultPopupTemplate(){return this.attributeStorageInfo?this.createPopupTemplate():null}getFieldDomain(e){const t=this.fieldsIndex.get(e);return t&&t.domain?t.domain:null}readServiceFields(e,t,i){return Array.isArray(e)?e.map(n=>{const a=new w;return n.type==="FieldTypeInteger"&&((n=d(n)).type="esriFieldTypeInteger"),a.read(n,i),a}):Array.isArray(t.attributeStorageInfo)?t.attributeStorageInfo.map(n=>new w({name:n.name,type:n.name==="ELEVATION"?"double":"integer"})):null}set elevationInfo(e){this._set("elevationInfo",e),this._validateElevationInfo()}writeRenderer(e,t,i,n){J("layerDefinition.drawingInfo.renderer",e.write({},n),t)}load(e){const t=Q(e)?e.signal:null,i=this.loadFromPortal({supportedTypes:["Scene Service"]},e).catch(X).then(()=>this._fetchService(t));return this.addResolvingPromise(i),Promise.resolve(this)}createPopupTemplate(e){const t=Z(this,e);return this.formatPopupTemplateReturnsField(t),this.formatPopupTemplateRGBField(t),t}formatPopupTemplateReturnsField(e){const t=this.fieldsIndex.get("RETURNS");if(!t)return;const i=e.fieldInfos.find(a=>a.fieldName===t.name);if(!i)return;const n=new F({name:"pcl-returns-decoded",title:t.alias||t.name,expression:`
        var returnValue = $feature.${t.name};
        return (returnValue % 16) + " / " + Floor(returnValue / 16);
      `});e.expressionInfos=[...e.expressionInfos||[],n],i.fieldName="expression/pcl-returns-decoded"}formatPopupTemplateRGBField(e){const t=this.fieldsIndex.get("RGB");if(!t)return;const i=e.fieldInfos.find(a=>a.fieldName===t.name);if(!i)return;const n=new F({name:"pcl-rgb-decoded",title:t.alias||t.name,expression:`
        var rgb = $feature.${t.name};
        var red = Floor(rgb / 65536, 0);
        var green = Floor((rgb - (red * 65536)) / 256,0);
        var blue = rgb - (red * 65536) - (green * 256);

        return "rgb(" + red + "," + green + "," + blue + ")";
      `});e.expressionInfos=[...e.expressionInfos||[],n],i.fieldName="expression/pcl-rgb-decoded"}async queryCachedStatistics(e,t){if(await this.load(t),!this.attributeStorageInfo)throw new p("scenelayer:no-cached-statistics","Cached statistics are not available for this layer");const i=this.fieldsIndex.get(e);if(!i)throw new p("pointcloudlayer:field-unexisting",`Field '${e}' does not exist on the layer`);for(const n of this.attributeStorageInfo)if(n.name===i.name){const a=H(this.parsedUrl.path,`./statistics/${n.key}`);return W(a,{query:{f:"json",token:this.apiKey},responseType:"json",signal:t?t.signal:null}).then(N=>N.data)}throw new p("pointcloudlayer:no-cached-statistics","Cached statistics for this attribute are not available")}async saveAs(e,t){return this._debouncedSaveOperations(1,b(v({},t),{getTypeKeywords:()=>this._getTypeKeywords(),portalItemLayerType:"point-cloud"}),e)}async save(){const e={getTypeKeywords:()=>this._getTypeKeywords(),portalItemLayerType:"point-cloud"};return this._debouncedSaveOperations(0,e)}validateLayer(e){if(e.layerType&&e.layerType!=="PointCloud")throw new p("pointcloudlayer:layer-type-not-supported","PointCloudLayer does not support this layer type",{layerType:e.layerType});if(isNaN(this.version.major)||isNaN(this.version.minor))throw new p("layer:service-version-not-supported","Service version is not supported.",{serviceVersion:this.version.versionString,supportedVersions:"1.x-2.x"});if(this.version.major>2)throw new p("layer:service-version-too-new","Service version is too new.",{serviceVersion:this.version.versionString,supportedVersions:"1.x-2.x"})}hasCachedStatistics(e){return this.attributeStorageInfo!=null&&this.attributeStorageInfo.some(t=>t.name===e)}_getTypeKeywords(){return["PointCloud"]}_validateElevationInfo(){const e=this.elevationInfo;e&&(e.mode!=="absolute-height"&&q.warn(".elevationInfo=","Point cloud layers only support absolute-height elevation mode"),e.featureExpressionInfo&&e.featureExpressionInfo.expression!=="0"&&q.warn(".elevationInfo=","Point cloud layers do not support featureExpressionInfo"))}};r([o({type:["PointCloudLayer"]})],s.prototype,"operationalLayerType",void 0),r([o(ee)],s.prototype,"popupEnabled",void 0),r([o({type:te,json:{name:"popupInfo",write:!0}})],s.prototype,"popupTemplate",void 0),r([o({readOnly:!0,json:{read:!1}})],s.prototype,"defaultPopupTemplate",null),r([o({readOnly:!0,json:{write:!1,read:!1,origins:{"web-document":{write:!1,read:!1}}}})],s.prototype,"opacity",void 0),r([o({type:["show","hide"]})],s.prototype,"listMode",void 0),r([o({types:[fe],json:{origins:{service:{read:{source:"filters"}}},name:"layerDefinition.filters",write:!0}})],s.prototype,"filters",void 0),r([o({type:[w]})],s.prototype,"fields",void 0),r([o(B.fieldsIndex)],s.prototype,"fieldsIndex",void 0),r([re("service","fields",["fields","attributeStorageInfo"])],s.prototype,"readServiceFields",null),r([o(B.outFields)],s.prototype,"outFields",void 0),r([o({readOnly:!0})],s.prototype,"attributeStorageInfo",void 0),r([o(ie)],s.prototype,"elevationInfo",null),r([o({type:String,json:{origins:{"web-scene":{read:!0,write:!0},"portal-item":{read:!0,write:!0}},read:!1}})],s.prototype,"path",void 0),r([o(oe)],s.prototype,"legendEnabled",void 0),r([o({types:j,json:{origins:{service:{read:{source:"drawingInfo.renderer"}}},name:"layerDefinition.drawingInfo.renderer",write:{target:{"layerDefinition.drawingInfo.renderer":{types:j},"layerDefinition.drawingInfo.transparency":{type:Number}}}}})],s.prototype,"renderer",void 0),r([se("renderer")],s.prototype,"writeRenderer",null),r([o({json:{read:!1},readOnly:!0})],s.prototype,"type",void 0),s=r([l("esri.layers.PointCloudLayer")],s);const Ie=s;export{Ie as default};
