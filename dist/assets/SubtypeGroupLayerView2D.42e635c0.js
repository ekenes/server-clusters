var m=Object.defineProperty,b=Object.defineProperties;var d=Object.getOwnPropertyDescriptors;var n=Object.getOwnPropertySymbols;var u=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable;var p=(i,e,s)=>e in i?m(i,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):i[e]=s,l=(i,e)=>{for(var s in e||(e={}))u.call(e,s)&&p(i,s,e[s]);if(n)for(var s of n(e))f.call(e,s)&&p(i,s,e[s]);return i},y=(i,e)=>b(i,d(e));import{X as c,Z as h,H as j,r as w,fZ as v}from"./vendor.1906794a.js";import g from"./FeatureLayerView2D.b2272e26.js";import"./Container.3129b529.js";import"./drapedUtils.11fab57e.js";import"./definitions.21e97413.js";import"./LayerView.31466adc.js";import"./schemaUtils.a83c8525.js";import"./Utils.dc5734bd.js";import"./Texture.e5002286.js";import"./MaterialKey.301bf49f.js";import"./visualVariablesUtils.a2feeb91.js";import"./CIMSymbolHelper.96d440ee.js";import"./BidiEngine.aae60613.js";import"./GeometryUtils.d4e26b77.js";import"./cimSymbolUtils.6ee77631.js";import"./quantizationUtils.f38724ee.js";import"./devEnvironmentUtils.444b8fd1.js";import"./MD5.f9440c6b.js";import"./util.aa5f648b.js";import"./popupUtils.10e4a4b8.js";import"./RefreshableLayerView.cc10fb38.js";function S(i,e){return!i.visible||i.minScale!==0&&e>i.minScale||i.maxScale!==0&&e<i.maxScale}let o=class extends g{initialize(){this.handles.add([j(this.view,"viewpoint",()=>this._update())])}_injectOverrides(i){let e=super._injectOverrides(i);const s=this.view.scale,r=this.layer.sublayers.filter(a=>S(a,s)).map(a=>a.subtypeCode);if(!r.length)return e;e=w(e)?e:new v().toJSON();const t=`NOT ${this.layer.subtypeField} IN (${r.join(",")})`;return e.where=e.where?`(${e.where}) AND (${t})`:t,e}_setLayersForFeature(i){const e=this.layer.fieldsIndex.get(this.layer.subtypeField),s=i.attributes[e.name],r=this.layer.sublayers.find(t=>t.subtypeCode===s);i.layer=r,i.sourceLayer=this.layer}_createSchemaConfig(){const i={subtypeField:this.layer.subtypeField,sublayers:Array.from(this.layer.sublayers).map(t=>({featureReduction:null,geometryType:this.layer.geometryType,labelingInfo:t.labelingInfo,labelsVisible:t.labelsVisible,renderer:t.renderer,subtypeCode:t.subtypeCode,orderBy:null}))},e=this.layer.sublayers.map(t=>t.subtypeCode).join(","),s=this.layer.sublayers.length?`${this.layer.subtypeField} IN (${e})`:"1=2";let r=this.layer.definitionExpression?this.layer.definitionExpression+" AND ":"";return r+=s,y(l(l({},super._createSchemaConfig()),i),{definitionExpression:r})}};o=c([h("esri.views.2d.layers.SubtypeGroupLayerView2D")],o);const q=o;export{q as default};