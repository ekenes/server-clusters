import{bY as p,bZ as f,bF as d,b$ as u,gA as g,bW as P,e as h,b_ as $,c0 as N,c1 as O,gB as x,gC as S,gD as w,bX as B}from"./vendor.1906794a.js";import{c as E,a as j}from"./devEnvironmentUtils.444b8fd1.js";function M(e,t,a,n){return e.name?e.styleName&&e.styleName==="Esri2DPointSymbolsStyle"?W(e,t,n):P(e,t,n).then(o=>F(o,e.name,t,a,n)):Promise.reject(new h("symbolstyleutils:style-symbol-reference-name-missing","Missing name in style symbol reference"))}function F(e,t,a,n,o){const b=e.data,y={portal:a&&a.portal||$.getDefault(),url:u(e.baseUrl),origin:"portal-item"},s=b.items.find(r=>r.name===t);if(!s){const r=`The symbol name '${t}' could not be found`;return Promise.reject(new h("symbolstyleutils:symbol-name-not-found",r,{symbolName:t}))}let m=N(O(s,n),y),i=s.thumbnail&&s.thumbnail.href;const c=s.thumbnail&&s.thumbnail.imageData;E()&&(m=j(m),i=j(i));const U={portal:a.portal,url:u(g(m)),origin:"portal-item"};return p(m,o).then(r=>{const D=n==="cimRef"?f(r.data):r.data,l=d(D,U);if(l&&x(l)){if(i){const v=N(i,y);l.thumbnail=new S({url:v})}else c&&(l.thumbnail=new S({url:`data:image/png;base64,${c}`}));e.styleUrl?l.styleOrigin=new w({portal:a.portal,styleUrl:e.styleUrl,name:t}):e.styleName&&(l.styleOrigin=new w({portal:a.portal,styleName:e.styleName,name:t}))}return l})}function W(e,t,a){const n=B.replace(/\{SymbolName\}/gi,e.name);return p(n,a).then(o=>{const b=f(o.data);return d(b,{portal:t.portal,url:u(g(n)),origin:"portal-item"})})}export{F as fetchSymbolFromStyle,M as resolveWebStyleSymbol};