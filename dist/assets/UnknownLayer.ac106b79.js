import{cK as i,cL as l,cQ as y,jE as p,e as u,X as o,Y as t,Z as d}from"./vendor.1906794a.js";let e=class extends i(l(y)){constructor(r){super(r),this.resourceInfo=null,this.type="unknown"}initialize(){this.addResolvingPromise(new Promise((r,s)=>{p(()=>{const n=this.resourceInfo&&(this.resourceInfo.layerType||this.resourceInfo.type);let a="Unknown layer type";n&&(a+=" "+n),s(new u("layer:unknown-layer-type",a,{layerType:n}))})}))}read(r,s){super.read({resourceInfo:r},s)}write(){return null}};o([t({readOnly:!0})],e.prototype,"resourceInfo",void 0),o([t({type:["show","hide"]})],e.prototype,"listMode",void 0),o([t({json:{read:!1},readOnly:!0,value:"unknown"})],e.prototype,"type",void 0),e=o([d("esri.layers.UnknownLayer")],e);const w=e;export{w as default};