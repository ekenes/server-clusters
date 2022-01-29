var X=Object.defineProperty,q=Object.defineProperties;var ee=Object.getOwnPropertyDescriptors;var _=Object.getOwnPropertySymbols;var te=Object.prototype.hasOwnProperty,re=Object.prototype.propertyIsEnumerable;var G=(e,t,r)=>t in e?X(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,V=(e,t)=>{for(var r in t||(t={}))te.call(t,r)&&G(e,r,t[r]);if(_)for(var r of _(t))re.call(t,r)&&G(e,r,t[r]);return e},H=(e,t)=>q(e,ee(t));import{cz as O,X as s,Y as i,cA as I,Z as S,ce as R,a_ as se,cb as ie,cu as B,cB as oe,ct as k,cv as z,aO as ne,cr as E,a5 as ae,bp as le,r as L,e as K,cC as P,C as U,cD as F,cE as pe,cw as ue}from"./vendor.1906794a.js";import{a as ce}from"./GPMessage.879bfdd7.js";const de=e=>{if(!Array.isArray(e))return!1;const[t]=e;return typeof t=="number"||typeof t=="string"};class me{constructor(t={}){this._options=t}toQueryParams(t){if(!t)return null;const r=t.toJSON(),n={};return Object.keys(r).forEach(o=>{const a=this._options[o];if(a){const p=typeof a!="boolean"&&a.name?a.name:o,u=typeof a!="boolean"&&a.getter?a.getter(r):r[o];u!=null&&(n[p]=de(u)?u.join(","):typeof u=="object"?JSON.stringify(u):u)}else n[o]=r[o]},this),n}}function Be(e){return new me(e)}const ye=O()({esriCentimeters:"centimeters",esriDecimalDegrees:"decimal-degrees",esriDecimeters:"decimeters",esriFeet:"feet",esriInches:"inches",esriKilometers:"kilometers",esriMeters:"meters",esriMiles:"miles",esriMillimeters:"millimeters",esriNauticalMiles:"nautical-miles",esriPoints:"points",esriYards:"yards"});O()({esriNAUCentimeters:"centimeters",esriNAUDecimalDegrees:"decimal-degrees",esriNAUDecimeters:"decimeters",esriNAUFeet:"feet",esriNAUInches:"inches",esriNAUKilometers:"kilometers",esriNAUMeters:"meters",esriNAUMiles:"miles",esriNAUMillimeters:"millimeters",esriNAUNauticalMiles:"nautical-miles",esriNAUPoints:"points",esriNAUYards:"yards"});O()({esriDOTComplete:"complete",esriDOTCompleteNoEvents:"complete-no-events",esriDOTInstructionsOnly:"instructions-only",esriDOTStandard:"standard",esriDOTSummaryOnly:"summary-only"});O()({esriNAOutputLineNone:"none",esriNAOutputLineStraight:"straight",esriNAOutputLineTrueShape:"true-shape",esriNAOutputLineTrueShapeWithMeasure:"true-shape-with-measure"});O()({esriNAOutputPolygonNone:"none",esriNAOutputPolygonSimplified:"simplified",esriNAOutputPolygonDetailed:"detailed"});const he=O()({esriNFSBAllowBacktrack:"allow-backtrack",esriNFSBAtDeadEndsOnly:"at-dead-ends-only",esriNFSBNoBacktrack:"no-backtrack",esriNFSBAtDeadEndsAndIntersections:"at-dead-ends-and-intersections"});O()({esriNATravelDirectionFromFacility:"from-facility",esriNATravelDirectionToFacility:"to-facility"});O()({esriNATimeOfDayNotUsed:"not-used",esriNATimeOfDayUseAsStartTime:"start",esriNATimeOfDayUseAsEndTime:"end"});const fe=O()({AUTOMOBILE:"automobile",TRUCK:"truck",WALK:"walk",OTHER:"other"});var C;let v=C=class extends R{constructor(e){super(e),this.attributeParameterValues=null,this.description=null,this.distanceAttributeName=null,this.id=null,this.impedanceAttributeName=null,this.name=null,this.restrictionAttributeNames=null,this.simplificationTolerance=null,this.simplificationToleranceUnits=null,this.timeAttributeName=null,this.type=null,this.useHierarchy=null,this.uturnAtJunctions=null}clone(){return new C(se({attributeParameterValues:this.attributeParameterValues,description:this.description,distanceAttributeName:this.distanceAttributeName,id:this.id,impedanceAttributeName:this.impedanceAttributeName,name:this.name,restrictionAttributeNames:this.restrictionAttributeNames,simplificationTolerance:this.simplificationTolerance,simplificationToleranceUnits:this.simplificationToleranceUnits,timeAttributeName:this.timeAttributeName,type:this.type,useHierarchy:this.useHierarchy,uturnAtJunctions:this.uturnAtJunctions}))}};s([i({type:[Object],json:{write:!0}})],v.prototype,"attributeParameterValues",void 0),s([i({type:String,json:{write:!0}})],v.prototype,"description",void 0),s([i({type:String,json:{write:!0}})],v.prototype,"distanceAttributeName",void 0),s([i({type:String,json:{write:!0}})],v.prototype,"id",void 0),s([i({type:String,json:{write:!0}})],v.prototype,"impedanceAttributeName",void 0),s([i({type:String,json:{write:!0}})],v.prototype,"name",void 0),s([i({type:[String],json:{write:!0}})],v.prototype,"restrictionAttributeNames",void 0),s([i({type:Number,json:{write:!0}})],v.prototype,"simplificationTolerance",void 0),s([I(ye)],v.prototype,"simplificationToleranceUnits",void 0),s([i({type:String,json:{write:!0}})],v.prototype,"timeAttributeName",void 0),s([I(fe)],v.prototype,"type",void 0),s([i({type:Boolean,json:{write:!0}})],v.prototype,"useHierarchy",void 0),s([I(he)],v.prototype,"uturnAtJunctions",void 0),v=C=s([S("esri.rest.support.TravelMode")],v);const ve=v;let w=class extends R{constructor(e){super(e),this.currentVersion=null,this.defaultTravelMode=null,this.directionsLanguage=null,this.directionsSupportedLanguages=null,this.directionsTimeAttribute=null,this.hasZ=null,this.impedance=null,this.networkDataset=null,this.supportedTravelModes=null}};s([i()],w.prototype,"currentVersion",void 0),s([i()],w.prototype,"defaultTravelMode",void 0),s([i()],w.prototype,"directionsLanguage",void 0),s([i()],w.prototype,"directionsSupportedLanguages",void 0),s([i()],w.prototype,"directionsTimeAttribute",void 0),s([i()],w.prototype,"hasZ",void 0),s([i()],w.prototype,"impedance",void 0),s([i()],w.prototype,"networkDataset",void 0),s([i({type:[ve]})],w.prototype,"supportedTravelModes",void 0),w=s([S("esri.rest.support.NetworkServiceDescription")],w);const ge=w,Y=new ie({0:"informative",1:"process-definition",2:"process-start",3:"process-stop",50:"warning",100:"error",101:"empty",200:"abort"});let x=class extends ce{constructor(e){super(e),this.type=null}};s([i({type:String,json:{read:Y.read,write:Y.write}})],x.prototype,"type",void 0),x=s([S("esri.rest.support.NAMessage")],x);const Te=x;let D=class extends B{};s([i()],D.prototype,"events",void 0),s([i()],D.prototype,"strings",void 0),D=s([S("esri.rest.support.DirectionsFeature")],D);const W=D;let g=class extends z{constructor(e){super(e),this.extent=null,this.features=null,this.geometryType="polyline",this.routeId=null,this.routeName=null,this.totalDriveTime=null,this.totalLength=null,this.totalTime=null}readFeatures(e,t){var r;if(!e)return[];const n=(r=t.summary.envelope.spatialReference)!=null?r:t.spatialReference,o=n&&ne.fromJSON(n);return e.map(a=>{var p,u;const y=this._decompressGeometry(a.compressedGeometry),A=new E(H(V({},y),{spatialReference:o})),l=(p=(u=a.events)==null?void 0:u.map(b=>{const{arriveTimeUTC:T,ETA:d,point:{x:c,y:h,z:f},strings:N}=b;return new W({geometry:new ae({x:c,y:h,z:f,hasZ:f!==void 0,spatialReference:o}),attributes:{ETA:d,arriveTimeUTC:T},strings:N})}))!=null?p:[];return new W({attributes:a.attributes,events:l,geometry:A,strings:a.strings})})}get mergedGeometry(){if(!this.features)return null;const e=this.features.map(({geometry:r})=>le(r)),t=this.get("extent.spatialReference");return this._mergePolylinesToSinglePath(e,t)}get strings(){return this.features.map(({strings:e})=>e)}_decompressGeometry(e){let t=0,r=0,n=0,o=0;const a=[];let p,u,y,A,l,b,T,d,c=0,h=0,f=0;if(l=e.match(/((\+|\-)[^\+\-\|]+|\|)/g),l||(l=[]),parseInt(l[c],32)===0){c=2;const N=parseInt(l[c],32);c++,b=parseInt(l[c],32),c++,1&N&&(h=l.indexOf("|")+1,T=parseInt(l[h],32),h++),2&N&&(f=l.indexOf("|",h)+1,d=parseInt(l[f],32),f++)}else b=parseInt(l[c],32),c++;for(;c<l.length&&l[c]!=="|";){p=parseInt(l[c],32)+t,c++,t=p,u=parseInt(l[c],32)+r,c++,r=u;const N=[p/b,u/b];h&&(A=parseInt(l[h],32)+n,h++,n=A,N.push(A/T)),f&&(y=parseInt(l[f],32)+o,f++,o=y,N.push(y/d)),a.push(N)}return{paths:[a],hasZ:h>0,hasM:f>0}}_mergePolylinesToSinglePath(e,t){if(e.length===0)return new E({spatialReference:t});const r=[];for(const p of e)for(const u of p.paths)r.push(...u);const n=[];r.forEach((p,u)=>{u!==0&&p[0]===r[u-1][0]&&p[1]===r[u-1][1]||n.push(p)});const{hasM:o,hasZ:a}=e[0];return new E({hasM:o,hasZ:a,paths:[n],spatialReference:t})}};s([i({type:oe,json:{read:{source:"summary.envelope"}}})],g.prototype,"extent",void 0),s([i()],g.prototype,"features",void 0),s([k("features")],g.prototype,"readFeatures",null),s([i()],g.prototype,"geometryType",void 0),s([i({readOnly:!0})],g.prototype,"mergedGeometry",null),s([i()],g.prototype,"routeId",void 0),s([i()],g.prototype,"routeName",void 0),s([i({value:null,readOnly:!0})],g.prototype,"strings",null),s([i({json:{read:{source:"summary.totalDriveTime"}}})],g.prototype,"totalDriveTime",void 0),s([i({json:{read:{source:"summary.totalLength"}}})],g.prototype,"totalLength",void 0),s([i({json:{read:{source:"summary.totalTime"}}})],g.prototype,"totalTime",void 0),g=s([S("esri.rest.support.DirectionsFeatureSet")],g);const Ne=g;let $=class extends R{constructor(e){super(e),this.directions=null,this.route=null,this.routeName=null,this.stops=null}};s([i({type:Ne,json:{write:!0}})],$.prototype,"directions",void 0),s([i({type:B,json:{write:!0}})],$.prototype,"route",void 0),s([i({type:String,json:{write:!0}})],$.prototype,"routeName",void 0),s([i({type:[B],json:{write:!0}})],$.prototype,"stops",void 0),$=s([S("esri.rest.support.RouteResult")],$);const Ae=$;function J(e){return e&&z.fromJSON(e).features.map(t=>t)}let M=class extends R{constructor(e){super(e),this.barriers=null,this.messages=null,this.pointBarriers=null,this.polylineBarriers=null,this.polygonBarriers=null,this.routeResults=null}readPointBarriers(e,t){return J(t.barriers||t.pointBarriers)}readPolylineBarriers(e){return J(e)}readPolygonBarriers(e){return J(e)}};s([i({aliasOf:"pointBarriers"})],M.prototype,"barriers",void 0),s([i({type:[Te]})],M.prototype,"messages",void 0),s([i({type:[B]})],M.prototype,"pointBarriers",void 0),s([k("pointBarriers",["barriers","pointBarriers"])],M.prototype,"readPointBarriers",null),s([i({type:[B]})],M.prototype,"polylineBarriers",void 0),s([k("polylineBarriers")],M.prototype,"readPolylineBarriers",null),s([i({type:[B]})],M.prototype,"polygonBarriers",void 0),s([k("polygonBarriers")],M.prototype,"readPolygonBarriers",null),s([i({type:[Ae]})],M.prototype,"routeResults",void 0),M=s([S("esri.rest.support.RouteResultsContainer")],M);const we=M;function je(e,t,r,n){n[r]=[t.length,t.length+e.length],e.forEach(o=>{t.push(o.geometry)})}function Ue(e,t){for(let r=0;r<t.length;r++){const n=e[t[r]];if(n&&n.length)for(const o of n)o.z=void 0}console.log(`The remote Network Analysis service is powered by a network dataset which is not Z-aware.
Z-coordinates of the input geometry are ignored.`)}function De(e){const t=[],r=[],{directions:n=[],routes:{features:o=[],spatialReference:a=null}={},stops:{features:p=[],spatialReference:u=null}={},barriers:y,polygonBarriers:A,polylineBarriers:l,messages:b}=e.data,T="esri.tasks.RouteTask.NULL_ROUTE_NAME";let d,c,h=!0;const f=o&&a||p&&u||y&&y.spatialReference||A&&A.spatialReference||l&&l.spatialReference;n.forEach(m=>{t.push(d=m.routeName),r[d]={directions:m}}),o.forEach(m=>{t.indexOf(d=m.attributes.Name)===-1&&(t.push(d),r[d]={}),L(m.geometry)&&(m.geometry.spatialReference=f),r[d].route=m}),p.forEach(m=>{c=m.attributes,t.indexOf(d=c.RouteName||T)===-1&&(t.push(d),r[d]={}),d!==T&&(h=!1),L(m.geometry)&&(m.geometry.spatialReference=f),r[d].stops==null&&(r[d].stops=[]),r[d].stops.push(m)}),p.length>0&&h===!0&&(r[t[0]].stops=r[T].stops,delete r[T],t.splice(t.indexOf(T),1));const N=t.map(m=>(r[m].routeName=m===T?null:m,r[m]));return we.fromJSON({routeResults:N,pointBarriers:y,polygonBarriers:A,polylineBarriers:l,messages:b})}function Re(e,t){for(let r=0;r<t.length;r++){const n=e[t[r]];if(n&&n.length){for(const o of n)if(L(o)&&o.hasZ)return!0}}return!1}async function ke(e,t,r){if(!e)throw new K("network-service:missing-url","Url to Network service is missing");const n=P({f:"json",token:t},r),{data:o}=await U(e,n);o.supportedTravelModes||(o.supportedTravelModes=[]);for(let y=0;y<o.supportedTravelModes.length;y++)o.supportedTravelModes[y].id||(o.supportedTravelModes[y].id=o.supportedTravelModes[y].itemId);const a=o.currentVersion>=10.4?be(e,t,r):Me(e,r),{defaultTravelMode:p,supportedTravelModes:u}=await a;return o.defaultTravelMode=p,o.supportedTravelModes=u,ge.fromJSON(o)}async function Me(e,t){var r,n;const o=P({f:"json"},t),{data:a}=await U(e.replace(/\/rest\/.*$/i,"/info"),o);if(!a||!a.owningSystemUrl)return{supportedTravelModes:[],defaultTravelMode:null};const{owningSystemUrl:p}=a,u=F(p)+"/sharing/rest/portals/self",{data:y}=await U(u,o),A=pe("helperServices.routingUtilities.url",y);if(!A)return{supportedTravelModes:[],defaultTravelMode:null};const l=ue(p),b=/\/solve$/i.test(l.path)?"Route":/\/solveclosestfacility$/i.test(l.path)?"ClosestFacility":"ServiceAreas",T=P({f:"json",serviceName:b},t),d=F(A)+"/GetTravelModes/execute",c=await U(d,T),h=[];let f=null;if(c!=null&&(r=c.data)!=null&&(n=r.results)!=null&&n.length){const m=c.data.results;for(const j of m){var N;if(j.paramName==="supportedTravelModes"){if((N=j.value)!=null&&N.features){for(const{attributes:Z}of j.value.features)if(Z){const Q=JSON.parse(Z.TravelMode);h.push(Q)}}}else j.paramName==="defaultTravelMode"&&(f=j.value)}}return{supportedTravelModes:h,defaultTravelMode:f}}async function be(e,t,r){try{const n=P({f:"json",token:t},r),o=F(e)+"/retrieveTravelModes",{data:{supportedTravelModes:a,defaultTravelMode:p}}=await U(o,n);return{supportedTravelModes:a,defaultTravelMode:p}}catch(n){throw new K("network-service:retrieveTravelModes","Could not get to the NAServer's retrieveTravelModes.",{error:n})}}export{Te as a,ke as b,Ne as c,Re as d,De as f,Be as o,Ue as p,je as u};