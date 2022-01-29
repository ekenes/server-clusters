var P=Object.defineProperty,F=Object.defineProperties;var $=Object.getOwnPropertyDescriptors;var m=Object.getOwnPropertySymbols;var B=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable;var y=(t,n,e)=>n in t?P(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,O=(t,n)=>{for(var e in n||(n={}))B.call(n,e)&&y(t,e,n[e]);if(m)for(var e of m(n))b.call(n,e)&&y(t,e,n[e]);return t},p=(t,n)=>F(t,$(n));import{b4 as z,s as G,e as L}from"./vendor.1906794a.js";import"./Texture.e5002286.js";const H=new Float32Array(1);new Uint32Array(H.buffer);function At(t){return[255&t,(65280&t)>>>8,(16711680&t)>>>16,(4278190080&t)>>>24]}function St(t,n){return 65535&t|n<<16}function mt(t,n,e,r){return 255&t|(255&n)<<8|(255&e)<<16|r<<24}var s,_,g,h,C,w,M;(function(t){t[t.FILL=0]="FILL",t[t.LINE=1]="LINE",t[t.MARKER=2]="MARKER",t[t.TEXT=3]="TEXT",t[t.LABEL=4]="LABEL"})(s||(s={})),function(t){t[t.SUCCEEDED=0]="SUCCEEDED",t[t.FAILED_OUT_OF_MEMORY=1]="FAILED_OUT_OF_MEMORY"}(_||(_={})),function(t){t[t.NONE=0]="NONE",t[t.MAP=1]="MAP",t[t.LABEL=2]="LABEL",t[t.LABEL_ALPHA=4]="LABEL_ALPHA",t[t.HITTEST=8]="HITTEST",t[t.HIGHLIGHT=16]="HIGHLIGHT",t[t.CLIP=32]="CLIP",t[t.DEBUG=64]="DEBUG",t[t.NUM_DRAW_PHASES=9]="NUM_DRAW_PHASES"}(g||(g={})),function(t){t[t.SIZE=0]="SIZE",t[t.COLOR=1]="COLOR",t[t.OPACITY=2]="OPACITY",t[t.ROTATION=3]="ROTATION"}(h||(h={})),function(t){t[t.NONE=0]="NONE",t[t.OPACITY=1]="OPACITY",t[t.COLOR=2]="COLOR",t[t.ROTATION=4]="ROTATION",t[t.SIZE_MINMAX_VALUE=8]="SIZE_MINMAX_VALUE",t[t.SIZE_SCALE_STOPS=16]="SIZE_SCALE_STOPS",t[t.SIZE_FIELD_STOPS=32]="SIZE_FIELD_STOPS",t[t.SIZE_UNIT_VALUE=64]="SIZE_UNIT_VALUE"}(C||(C={})),function(t){t[t.MINMAX_TARGETS_OUTLINE=128]="MINMAX_TARGETS_OUTLINE",t[t.SCALE_TARGETS_OUTLINE=256]="SCALE_TARGETS_OUTLINE",t[t.FIELD_TARGETS_OUTLINE=512]="FIELD_TARGETS_OUTLINE",t[t.UNIT_TARGETS_OUTLINE=1024]="UNIT_TARGETS_OUTLINE"}(w||(w={})),function(t){t[t.SPRITE=0]="SPRITE",t[t.GLYPH=1]="GLYPH"}(M||(M={}));class N{constructor(){this.color=[0,0,0,0],this.haloColor=[0,0,0,0],this.haloSize=0,this.size=12,this.angle=0,this.offsetX=0,this.offsetY=0,this.hAnchor=0,this.vAnchor=0}acquire(n,e,r,a,i,u,d,c,f){this.color=n,this.haloColor=e,this.haloSize=r,this.size=a,this.angle=i,this.offsetX=u,this.offsetY=d,this.hAnchor=c,this.vAnchor=f}release(){this.color[0]=this.color[1]=this.color[2]=this.color[3]=0,this.haloColor[0]=this.haloColor[1]=this.haloColor[2]=this.haloColor[3]=0,this.haloSize=0,this.size=0,this.angle=0,this.offsetX=0,this.offsetY=0,this.hAnchor=0,this.vAnchor=0}}N.pool=new z(N);const I=G.getLogger("esri.views.2d.engine.webgl.Utils"),o="geometry",x=[{name:o,strideInBytes:36,divisor:0}],X=[{name:o,strideInBytes:32,divisor:0}],Y=[{name:o,strideInBytes:20,divisor:0}],Z=[{name:o,strideInBytes:12,divisor:0}],V=[{name:o,strideInBytes:40,divisor:0}],k=[{name:o,strideInBytes:36,divisor:0}],q=[{name:o,strideInBytes:36,divisor:0}];function l(t){const n={};for(const e of t)n[e.name]=e.strideInBytes;return n}const K=l(x),j=l(X),W=l(Y),J=l(Z),Q=l(V),tt=l(k),nt=l(q);function yt(t,{fill:n}){switch(t){case s.MARKER:return K;case s.FILL:return n==="dot-density"?J:n==="simple"?W:j;case s.LINE:return Q;case s.TEXT:return tt;case s.LABEL:return nt}}const et=[o],rt=[o],st=[o],it=[o],at=[o];function ot(t){switch(t){case s.MARKER:return et;case s.FILL:return rt;case s.LINE:return st;case s.TEXT:return it;case s.LABEL:return at}}function ct(t){switch(t%4){case 0:case 2:return 4;case 1:case 3:return 1}}function Ot(t,n){switch(n%4){case 0:case 2:return new Uint32Array(Math.floor(t*n/4));case 1:case 3:return new Uint8Array(t*n)}}function pt(t,n){switch(n%4){case 0:case 2:return new Uint32Array(t);case 1:case 3:return new Uint8Array(t)}}function _t(t){return t!=null}function gt(t){return typeof t=="number"}function Ct(t){switch(t){case"butt":return 0;case"round":return 1;case"square":return 2;default:return I.error(new L("mapview-invalid-type",`Cap type ${t} is not a valid option. Defaulting to round`)),1}}function wt(t){switch(t){case"miter":return 2;case"bevel":return 0;case"round":return 1;default:return I.error(new L("mapview-invalid-type",`Join type ${t} is not a valid option. Defaulting to round`)),1}}function Mt(t){switch(t){case"opacity":return h.OPACITY;case"color":return h.COLOR;case"rotation":return h.ROTATION;case"size":return h.SIZE;default:return I.error(`Cannot interpret unknown vv: ${t}`),null}}function Nt(t,n,e,r,a,i,u){for(const c in i){const f=i[c].stride,A=ct(f),R=i[c].data,U=e[c].data,v=f*a.vertexCount/A,E=f*t/A,D=f*a.vertexFrom/A;for(let T=0;T<v;++T)U[T+E]=R[T+D]}const d=a.indexCount;for(let c=0;c<d;++c)r[c+n]=u[c+a.indexFrom]-a.vertexFrom+t}const Rt={[o]:35044};function Ut(t,n){const e=[];for(let r=0;r<5;++r){const a=ot(r),i={};for(const u of a)i[u]={data:n(r,u)};e.push({data:t(r),buffers:i})}return e}function ut(t){switch(t){case 5120:case 5121:return 1;case 5122:case 5123:return 2;case 5126:case 5124:case 5125:return 4}}function vt(t){switch(t){case 5121:return 1;case 32819:return 2;case 5126:return 4;default:return void I.error(new L("webgl-utils",`Unable to handle type ${t}`))}}function Et(t){switch(t){case 5121:return Uint8Array;case 32819:return Uint16Array;case 5126:return Float32Array;default:return void I.error(new L("webgl-utils",`Unable to handle type ${t}`))}}function lt(t){const n={};for(const e in t){const r=t[e];let a=0;n[e]=r.map(i=>{const u=p(O({},i),{normalized:i.normalized||!1,divisor:i.divisor||0,offset:a,stride:0});return a+=i.count*ut(i.type),u}),n[e].forEach(i=>i.stride=a)}return n}const ft=t=>{const n=new Map;for(const e in t)for(const r of t[e])n.set(r.name,r.location);return n},ht=t=>{const n={};for(const e in t){const r=t[e];n[e]=r.length?r[0].stride:0}return n},S=new Map,Dt=(t,n)=>{if(!S.has(t)){const e=lt(n),r={strides:ht(e),bufferLayouts:e,attributes:ft(n)};S.set(t,r)}return S.get(t)};function Pt(t){t(s.FILL),t(s.LINE),t(s.MARKER),t(s.TEXT),t(s.LABEL)}const Ft=t=>"path"in t&&It(t.path),$t=t=>"url"in t&&t.url||"imageData"in t&&t.imageData,Bt=t=>"imageData"in t&&t.imageData&&"contentType"in t&&t.contentType?`data:${t.contentType};base64,${t.imageData}`:"url"in t?t.url:null,bt=t=>"url"in t&&t.url&&t.url.includes(".gif")||"contentType"in t&&t.contentType==="image/gif"||"imageData"in t&&t.imageData.includes("data:image/gif"),zt=t=>"url"in t&&t.url&&t.url.includes(".png")||"contentType"in t&&t.contentType==="image/png"||"imageData"in t&&t.imageData.includes("data:image/png"),Gt=t=>t.type&&t.type.toLowerCase().indexOf("3d")!==-1;function Ht(t){switch(t.type){case"line":{const n=t;return n.cim.type==="CIMSolidStroke"&&!n.dashTemplate}case"fill":return t.cim.type==="CIMSolidFill";case"esriSFS":return t.style==="esriSFSSolid"||t.style==="esriSFSNull";case"esriSLS":return t.style==="esriSLSSolid"||t.style==="esriSLSNull";default:return!1}}const xt=t=>t.includes("data:image/svg+xml");function Xt(t){switch("cim"in t?t.cim.type:t.type){case"esriSMS":case"esriPMS":case"CIMPointSymbol":case"CIMVectorMarker":case"CIMPictureMarker":case"CIMCharacterMarker":return!1;default:return!0}}function Yt(t){const n="maxVVSize"in t&&t.maxVVSize,e="width"in t&&t.width||"size"in t&&t.size||0;return n||e}function Zt(t){const n=[];for(let e=0;e<t.length;e++)n.push(t.charCodeAt(e));return n}const It=t=>!!t&&(t=t.trim(),!!(/^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(t)&&/[\dz]$/i.test(t)&&t.length>4));export{pt as $,C as A,s as E,vt as H,g as I,At as M,M as O,gt as P,Et as Q,Ot as R,wt as V,Nt as X,Rt as Z,Ut as _,Bt as a,_t as b,bt as c,xt as d,w as e,Ht as f,Pt as i,ct as j,Ct as k,Gt as l,Xt as m,Dt as n,Ft as o,Yt as p,Mt as q,$t as s,zt as u,St as w,mt as x,Zt as y,yt as z};