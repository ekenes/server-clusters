import{a as s,j as t}from"./WGLContainer.85960f9a.js";import{I as a}from"./Utils.dc5734bd.js";class p extends s{get requiresDedicatedFBO(){return this.children.some(e=>e.blendFunction==="additive")}prepareRenderPasses(e){const r=e.registerRenderPass({name:"bitmap",brushes:[t.bitmap],target:()=>this.children,drawPhase:a.MAP});return[...super.prepareRenderPasses(e),r]}}export{p as t};
