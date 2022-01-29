import{s as o,h as n,X as a,Y as r,Z as p}from"./vendor.1906794a.js";import{t as d}from"./BitmapContainer.2584eaf7.js";import{l as m,u as h}from"./LayerView.31466adc.js";import{S as c}from"./ExportStrategy.97aeb84b.js";import{i as y}from"./RefreshableLayerView.cc10fb38.js";import"./WGLContainer.85960f9a.js";import"./definitions.21e97413.js";import"./VertexArrayObject.fb67875c.js";import"./Texture.e5002286.js";import"./Utils.dc5734bd.js";import"./ShaderCompiler.c7c7b63f.js";import"./config.2a39d8a4.js";import"./GeometryUtils.ea8c8742.js";import"./MaterialKey.301bf49f.js";import"./pixelUtils.e90a335a.js";import"./Container.3129b529.js";import"./earcut.f20dd8d8.js";import"./Bitmap.7420dc51.js";const f=o.getLogger("esri.views.2d.layers.BaseDynamicLayerView2D");let t=class extends y(m(h)){update(i){this.strategy.update(i).catch(e=>{n(e)||f.error(e)}),this.notifyChange("updating")}attach(){this._bitmapContainer=new d,this.container.addChild(this._bitmapContainer),this.strategy=new c({container:this._bitmapContainer,fetchSource:this.fetchBitmapData.bind(this),requestUpdate:this.requestUpdate.bind(this)})}detach(){this.strategy.destroy(),this.strategy=null,this.container.removeChild(this._bitmapContainer),this._bitmapContainer.removeAllChildren()}moveStart(){}viewChange(){}moveEnd(){this.requestUpdate()}fetchBitmapData(i,e,s){return this.layer.fetchImage(i,e,s)}async doRefresh(){this.requestUpdate()}isUpdating(){return this.strategy.updating||this.updateRequested}};a([r()],t.prototype,"strategy",void 0),a([r()],t.prototype,"updating",void 0),t=a([p("esri.views.2d.layers.BaseDynamicLayerView2D")],t);const A=t;export{A as default};
