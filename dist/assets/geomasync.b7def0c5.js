import{hm as s,h2 as g,fS as f,gW as z,gV as P,gY as p,h5 as y,hk as N,cB as b,cr as I,hv as M,h4 as l,hp as Z,ho as O,hq as v,a5 as $,gT as E,bz as F,gi as H,gU as K,cq as J,cc as L,gS as X,c8 as Y}from"./vendor.1906794a.js";import{c as m,d as x,h,l as D,i as Q,j as _,k as S}from"./arcadeUtils.a93e0380.js";import{S as nn,g as tn,A as en,w as rn,x as un,p as on,O as an,d as sn,h as cn,j as fn,k as ln,R as gn,E as hn,l as dn,y as wn,W as q,K as W,F as j,M as k,m as mn,P as G,U as T,G as An,V as pn,b as yn,I as En,q as U,J as V,v as In}from"./geometryEngineAsync.2e99ee56.js";import"./FeatureSetReader.deb82ddc.js";import"./centroid.4d0eaa21.js";function C(t){return H.indexOf("4.")===0?F.fromExtent(t):new F({spatialReference:t.spatialReference,rings:[[[t.xmin,t.ymin],[t.xmin,t.ymax],[t.xmax,t.ymax],[t.xmax,t.ymin],[t.xmin,t.ymin]]]})}function A(t){if(g(t,2,2),!(t[0]instanceof f&&t[1]instanceof f)){if(!(t[0]instanceof f&&t[1]===null)){if(!(t[1]instanceof f&&t[0]===null)){if(t[0]!==null||t[1]!==null)throw new Error("Illegal Argument")}}}}function B(t,r){if(t.type!=="polygon"&&t.type!=="polyline"&&t.type!=="extent")return X(0);let i=1;(t.spatialReference.vcsWkid||t.spatialReference.latestVcsWkid)&&(i=_(t.spatialReference)/Y(t.spatialReference));let o=0;if(t.type==="polyline")for(const n of t.paths)for(let e=1;e<n.length;e++)o+=S(n[e],n[e-1],i);else if(t.type==="polygon")for(const n of t.rings){for(let e=1;e<n.length;e++)o+=S(n[e],n[e-1],i);(n[0][0]!==n[n.length-1][0]||n[0][1]!==n[n.length-1][1]||n[0][2]!==void 0&&n[0][2]!==n[n.length-1][2])&&(o+=S(n[0],n[n.length-1],i))}else t.type==="extent"&&(o+=2*S([t.xmin,t.ymin,0],[t.xmax,t.ymin,0],i),o+=2*S([t.xmin,t.ymin,0],[t.xmin,t.ymax,0],i),o*=2,o+=4*Math.abs(l(t.zmax,0)*i-l(t.zmin,0)*i));const a=new I({hasZ:!1,hasM:!1,spatialReference:t.spatialReference,paths:[[0,0],[0,o]]});return j(a,r)}function $n(t){t.mode==="async"&&(t.functions.disjoint=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){return A(n=s(n)),n[0]===null||n[1]===null||nn(n[0],n[1])})},t.functions.intersects=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){return A(n=s(n)),n[0]!==null&&n[1]!==null&&tn(n[0],n[1])})},t.functions.touches=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){return A(n=s(n)),n[0]!==null&&n[1]!==null&&en(n[0],n[1])})},t.functions.crosses=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){return A(n=s(n)),n[0]!==null&&n[1]!==null&&rn(n[0],n[1])})},t.functions.within=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){return A(n=s(n)),n[0]!==null&&n[1]!==null&&un(n[0],n[1])})},t.functions.contains=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){return A(n=s(n)),n[0]!==null&&n[1]!==null&&on(n[0],n[1])})},t.functions.overlaps=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){return A(n=s(n)),n[0]!==null&&n[1]!==null&&an(n[0],n[1])})},t.functions.equals=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){return g(n,2,2),n[0]===n[1]||(n[0]instanceof f&&n[1]instanceof f?sn(n[0],n[1]):!(!z(n[0])||!z(n[1]))&&n[0].getTime()===n[1].getTime())})},t.functions.relate=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){if(n=s(n),g(n,3,3),n[0]instanceof f&&n[1]instanceof f)return cn(n[0],n[1],P(n[2]));if(n[0]instanceof f&&n[1]===null||n[1]instanceof f&&n[0]===null||n[0]===null&&n[1]===null)return!1;throw new Error("Illegal Argument")})},t.functions.intersection=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){return A(n=s(n)),n[0]===null||n[1]===null?null:fn(n[0],n[1])})},t.functions.union=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){const e=[];if((n=s(n)).length===0)throw new Error("Function called with wrong number of Parameters");if(n.length===1)if(p(n[0])){const u=s(n[0]);for(let c=0;c<u.length;c++)if(u[c]!==null){if(!(u[c]instanceof f))throw new Error("Illegal Argument");e.push(u[c])}}else{if(!y(n[0])){if(n[0]instanceof f)return N(m(n[0]),r.spatialReference);if(n[0]===null)return null;throw new Error("Illegal Argument")}{const u=s(n[0].toArray());for(let c=0;c<u.length;c++)if(u[c]!==null){if(!(u[c]instanceof f))throw new Error("Illegal Argument");e.push(u[c])}}}else for(let u=0;u<n.length;u++)if(n[u]!==null){if(!(n[u]instanceof f))throw new Error("Illegal Argument");e.push(n[u])}return e.length===0?null:ln(e)})},t.functions.difference=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){return A(n=s(n)),n[0]!==null&&n[1]===null?m(n[0]):n[0]===null?null:gn(n[0],n[1])})},t.functions.symmetricdifference=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){return A(n=s(n)),n[0]===null&&n[1]===null?null:n[0]===null?m(n[1]):n[1]===null?m(n[0]):hn(n[0],n[1])})},t.functions.clip=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){if(n=s(n),g(n,2,2),!(n[1]instanceof b)&&n[1]!==null)throw new Error("Illegal Argument");if(n[0]===null)return null;if(!(n[0]instanceof f))throw new Error("Illegal Argument");return n[1]===null?null:dn(n[0],n[1])})},t.functions.cut=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){if(n=s(n),g(n,2,2),!(n[1]instanceof I)&&n[1]!==null)throw new Error("Illegal Argument");if(n[0]===null)return[];if(!(n[0]instanceof f))throw new Error("Illegal Argument");return n[1]===null?[m(n[0])]:wn(n[0],n[1])})},t.functions.area=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){if(g(n,1,2),(n=s(n))[0]===null)return 0;if(M(n[0]))return n[0].sumArea(x(l(n[1],-1)),!1,r.abortSignal).then(e=>{if(r.abortSignal.aborted)throw new Error("Operation has been cancelled.");return e});if(p(n[0])||y(n[0])){const e=Z(n[0],r.spatialReference);return e===null?0:q(e,x(l(n[1],-1)))}if(!(n[0]instanceof f))throw new Error("Illegal Argument");return q(n[0],x(l(n[1],-1)))})},t.functions.areageodetic=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){if(g(n,1,2),(n=s(n))[0]===null)return 0;if(M(n[0]))return n[0].sumArea(x(l(n[1],-1)),!0,r.abortSignal).then(e=>{if(r.abortSignal.aborted)throw new Error("Operation has been cancelled.");return e});if(p(n[0])||y(n[0])){const e=Z(n[0],r.spatialReference);return e===null?0:W(e,x(l(n[1],-1)))}if(!(n[0]instanceof f))throw new Error("Illegal Argument");return W(n[0],x(l(n[1],-1)))})},t.functions.length=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){if(g(n,1,2),(n=s(n))[0]===null)return 0;if(M(n[0]))return n[0].sumLength(h(l(n[1],-1)),!1,r.abortSignal).then(e=>{if(r.abortSignal.aborted)throw new Error("Operation has been cancelled.");return e});if(p(n[0])||y(n[0])){const e=O(n[0],r.spatialReference);return e===null?0:j(e,h(l(n[1],-1)))}if(!(n[0]instanceof f))throw new Error("Illegal Argument");return j(n[0],h(l(n[1],-1)))})},t.functions.length3d=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){if(g(n,1,2),(n=s(n))[0]===null)return 0;if(p(n[0])||y(n[0])){const e=O(n[0],r.spatialReference);return e===null?0:e.hasZ===!0?B(e,h(l(n[1],-1))):j(e,h(l(n[1],-1)))}if(!(n[0]instanceof f))throw new Error("Illegal Argument");return n[0].hasZ===!0?B(n[0],h(l(n[1],-1))):j(n[0],h(l(n[1],-1)))})},t.functions.lengthgeodetic=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){if(g(n,1,2),(n=s(n))[0]===null)return 0;if(M(n[0]))return n[0].sumLength(h(l(n[1],-1)),!0,r.abortSignal).then(e=>{if(r.abortSignal.aborted)throw new Error("Operation has been cancelled.");return e});if(p(n[0])||y(n[0])){const e=O(n[0],r.spatialReference);return e===null?0:k(e,h(l(n[1],-1)))}if(!(n[0]instanceof f))throw new Error("Illegal Argument");return k(n[0],h(l(n[1],-1)))})},t.functions.distance=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){n=s(n),g(n,2,3);let e=n[0];(p(n[0])||y(n[0]))&&(e=v(n[0],r.spatialReference));let u=n[1];if((p(n[1])||y(n[1]))&&(u=v(n[1],r.spatialReference)),!(e instanceof f))throw new Error("Illegal Argument");if(!(u instanceof f))throw new Error("Illegal Argument");return mn(e,u,h(l(n[2],-1)))})},t.functions.distancegeodetic=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){n=s(n),g(n,2,3);const e=n[0],u=n[1];if(!(e instanceof $))throw new Error("Illegal Argument");if(!(u instanceof $))throw new Error("Illegal Argument");const c=new I({paths:[],spatialReference:e.spatialReference});return c.addPath([e,u]),k(c,h(l(n[2],-1)))})},t.functions.densify=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){if(n=s(n),g(n,2,3),n[0]===null)return null;if(!(n[0]instanceof f))throw new Error("Illegal Argument");const e=E(n[1]);if(isNaN(e))throw new Error("Illegal Argument");if(e<=0)throw new Error("Illegal Argument");return n[0]instanceof F||n[0]instanceof I?G(n[0],e,h(l(n[2],-1))):n[0]instanceof b?G(C(n[0]),e,h(l(n[2],-1))):n[0]})},t.functions.densifygeodetic=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){if(n=s(n),g(n,2,3),n[0]===null)return null;if(!(n[0]instanceof f))throw new Error("Illegal Argument");const e=E(n[1]);if(isNaN(e))throw new Error("Illegal Argument");if(e<=0)throw new Error("Illegal Argument");return n[0]instanceof F||n[0]instanceof I?T(n[0],e,h(l(n[2],-1))):n[0]instanceof b?T(C(n[0]),e,h(l(n[2],-1))):n[0]})},t.functions.generalize=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){if(n=s(n),g(n,2,4),n[0]===null)return null;if(!(n[0]instanceof f))throw new Error("Illegal Argument");const e=E(n[1]);if(isNaN(e))throw new Error("Illegal Argument");return An(n[0],e,K(l(n[2],!0)),h(l(n[3],-1)))})},t.functions.buffer=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){if(n=s(n),g(n,2,3),n[0]===null)return null;if(!(n[0]instanceof f))throw new Error("Illegal Argument");const e=E(n[1]);if(isNaN(e))throw new Error("Illegal Argument");return e===0?m(n[0]):pn(n[0],e,h(l(n[2],-1)))})},t.functions.buffergeodetic=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){if(n=s(n),g(n,2,3),n[0]===null)return null;if(!(n[0]instanceof f))throw new Error("Illegal Argument");const e=E(n[1]);if(isNaN(e))throw new Error("Illegal Argument");return e===0?m(n[0]):yn(n[0],e,h(l(n[2],-1)))})},t.functions.offset=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){if(n=s(n),g(n,2,6),n[0]===null)return null;if(!(n[0]instanceof F||n[0]instanceof I))throw new Error("Illegal Argument");const e=E(n[1]);if(isNaN(e))throw new Error("Illegal Argument");const u=E(l(n[4],10));if(isNaN(u))throw new Error("Illegal Argument");const c=E(l(n[5],0));if(isNaN(c))throw new Error("Illegal Argument");return En(n[0],e,h(l(n[2],-1)),P(l(n[3],"round")).toLowerCase(),u,c)})},t.functions.rotate=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){n=s(n),g(n,2,3);let e=n[0];if(e===null)return null;if(!(e instanceof f))throw new Error("Illegal Argument");e instanceof b&&(e=F.fromExtent(e));const u=E(n[1]);if(isNaN(u))throw new Error("Illegal Argument");const c=l(n[2],null);if(c===null)return U(e,u);if(c instanceof $)return U(e,u,c);throw new Error("Illegal Argument")})},t.functions.centroid=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){if(n=s(n),g(n,1,1),n[0]===null)return null;let e=n[0];if((p(n[0])||y(n[0]))&&(e=v(n[0],r.spatialReference)),e===null)return null;if(!(e instanceof f))throw new Error("Illegal Argument");return e instanceof $?N(m(n[0]),r.spatialReference):e instanceof F?e.centroid:e instanceof I?D(e):e instanceof J?Q(e):e instanceof b?e.center:null})},t.functions.multiparttosinglepart=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){n=s(n),g(n,1,1);const e=[];if(n[0]===null)return null;if(!(n[0]instanceof f))throw new Error("Illegal Argument");return n[0]instanceof $?[N(m(n[0]),r.spatialReference)]:n[0]instanceof b?[N(m(n[0]),r.spatialReference)]:V(n[0]).then(u=>{if(u instanceof F){const c=[],w=[];for(let d=0;d<u.rings.length;d++)if(u.isClockwise(u.rings[d])){const R=L({rings:[u.rings[d]],hasZ:u.hasZ===!0,hazM:u.hasM===!0,spatialReference:u.spatialReference.toJSON()});c.push(R)}else w.push({ring:u.rings[d],pt:u.getPoint(d,0)});for(let d=0;d<w.length;d++)for(let R=0;R<c.length;R++)if(c[R].contains(w[d].pt)){c[R].addRing(w[d].ring);break}return c}if(u instanceof I){const c=[];for(let w=0;w<u.paths.length;w++){const d=L({paths:[u.paths[w]],hasZ:u.hasZ===!0,hazM:u.hasM===!0,spatialReference:u.spatialReference.toJSON()});c.push(d)}return c}if(n[0]instanceof J){const c=N(m(n[0]),r.spatialReference);for(let w=0;w<c.points.length;w++)e.push(c.getPoint(w));return e}return null})})},t.functions.issimple=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){if(n=s(n),g(n,1,1),n[0]===null)return!0;if(!(n[0]instanceof f))throw new Error("Illegal Argument");return In(n[0])})},t.functions.simplify=function(r,i){return t.standardFunctionAsync(r,i,function(o,a,n){if(n=s(n),g(n,1,1),n[0]===null)return null;if(!(n[0]instanceof f))throw new Error("Illegal Argument");return V(n[0])})})}export{$n as registerFunctions};