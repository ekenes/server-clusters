import{d_ as ir,dX as sr,e7 as lr,X as m,Y as A,Z as cr,ce as ur,a0 as M,A as fr,e8 as G,e9 as pr,ea as yr,eb as W,ec as k,ed as gr,ee as hr,ef as w,eg as mr,eh as C,ei as Ar,a5 as dr,r as Y,ej as Tr,ek as $r,el as z,s as Er,em as x,en as vr,eo as Fr,ep as Mr,eq as U,er as D,es as X,et as wr,dW as xr,b as y,eu as P,ev as H,ew as Pr,ex as Rr,ey as br}from"./vendor.1906794a.js";import{I as J,v as Nr,P as _r,e as Z,a as K}from"./quat.7e55d593.js";import{e as d,a as E,b as jr,c as Br,f as T,o as Q}from"./vec33.fe9621f1.js";import{T as p,i as f}from"./BufferView.57bc1dec.js";function v(r=Cr){return[r[0],r[1],r[2],r[3]]}function ce(r,e,t=v()){return ir(F(t),r),t[3]=e,t}function ue(r,e,t=v()){return J(R,F(r),S(r)),J(rr,F(e),S(e)),Nr(R,rr,R),Lr(t,lr(_r(F(t),R)))}function F(r){return r}function S(r){return sr(r[3])}function Lr(r,e){return r[3]=e,r}const Cr=[0,0,1,0],R=Z(),rr=Z();v();var V;let g=V=class extends ur{constructor(r){super(r),this.origin=M(),this.translation=M(),this.rotation=v(),this.scale=fr(1,1,1),this.geographic=!0}get localMatrix(){const r=d();return G(r,r,this.scale),pr(r,r,S(this.rotation),F(this.rotation)),yr(r,r,this.translation),r}get localMatrixInverse(){return W(d(),this.localMatrix)}applyLocal(r,e){return k(e,r,this.localMatrix)}applyLocalInverse(r,e){return k(e,r,this.localMatrixInverse)}project(r,e){const t=new Float64Array(r.length),o=p.fromTypedArray(t),n=p.fromTypedArray(r);if(this.geographic){const l=gr(hr(e)),c=d();return w(e,this.origin,c,l),mr(c,c,this.localMatrix),E(o,n,c),C(t,l,0,t,e,0,t.length/3),t}const{localMatrix:a,origin:i}=this;Ar(a,jr)?Br(o,n):E(o,n,a);for(let l=0;l<t.length;l+=3)t[l+0]+=i[0],t[l+1]+=i[1],t[l+2]+=i[2];return t}getOriginPoint(r){const[e,t,o]=this.origin;return new dr({x:e,y:t,z:o,spatialReference:r})}equals(r){return Y(r)&&this.geographic===r.geographic&&Tr(this.origin,r.origin)&&$r(this.localMatrix,r.localMatrix)}clone(){const r={origin:z(this.origin),translation:z(this.translation),rotation:v(this.rotation),scale:z(this.scale),geographic:this.geographic};return new V(r)}};m([A({type:[Number],nonNullable:!0,json:{write:!0}})],g.prototype,"origin",void 0),m([A({type:[Number],nonNullable:!0,json:{write:!0}})],g.prototype,"translation",void 0),m([A({type:[Number],nonNullable:!0,json:{write:!0}})],g.prototype,"rotation",void 0),m([A({type:[Number],nonNullable:!0,json:{write:!0}})],g.prototype,"scale",void 0),m([A({type:Boolean,nonNullable:!0,json:{write:!0}})],g.prototype,"geographic",void 0),m([A()],g.prototype,"localMatrix",null),m([A()],g.prototype,"localMatrixInverse",null),g=V=m([cr("esri.geometry.support.MeshTransform")],g);const Yr=g;function b(r,e){var t;return r.isGeographic||r.isWebMercator&&((t=e==null?void 0:e.geographic)==null||t)}const N=Er.getLogger("esri.geometry.support.meshUtils.normalProjection");function zr(r,e,t,o,n){return j(o)?(_(0,f.fromTypedArray(r),p.fromTypedArray(e),p.fromTypedArray(t),o,f.fromTypedArray(n)),n):(N.error("Cannot convert spatial reference to PCPF"),n)}function Sr(r,e,t,o,n){return j(o)?(_(1,f.fromTypedArray(r),p.fromTypedArray(e),p.fromTypedArray(t),o,f.fromTypedArray(n)),n):(N.error("Cannot convert to spatial reference from PCPF"),n)}function Vr(r,e,t){return C(r,e,0,t,x(e),0,r.length/3),t}function qr(r,e,t){return C(r,x(t),0,e,t,0,r.length/3),e}function Ir(r,e,t){if(y(r))return e;const o=p.fromTypedArray(r),n=p.fromTypedArray(e);return E(n,o,t),e}function Or(r,e,t){if(y(r))return e;P(u,t);const o=f.fromTypedArray(r),n=f.fromTypedArray(e);return T(n,o,u),H(u)||Q(n,n),e}function Gr(r,e,t){if(y(r))return e;P(u,t);const o=f.fromTypedArray(r,4*Float32Array.BYTES_PER_ELEMENT),n=f.fromTypedArray(e,4*Float32Array.BYTES_PER_ELEMENT);if(T(n,o,u),H(u)||Q(n,n),r!==e)for(let a=3;a<r.length;a+=4)e[a]=r[a];return e}function Wr(r,e,t,o,n){if(!j(o))return N.error("Cannot convert spatial reference to PCPF"),n;_(0,f.fromTypedArray(r,4*Float32Array.BYTES_PER_ELEMENT),p.fromTypedArray(e),p.fromTypedArray(t),o,f.fromTypedArray(n,4*Float32Array.BYTES_PER_ELEMENT));for(let a=3;a<r.length;a+=4)n[a]=r[a];return n}function kr(r,e,t,o,n){if(!j(o))return N.error("Cannot convert to spatial reference from PCPF"),n;_(1,f.fromTypedArray(r,16),p.fromTypedArray(e),p.fromTypedArray(t),o,f.fromTypedArray(n,16));for(let a=3;a<r.length;a+=4)n[a]=r[a];return n}function _(r,e,t,o,n,a){if(!e)return;const i=t.count,l=x(n);if(er(n))for(let c=0;c<i;c++)o.getVec(c,B),e.getVec(c,h),w(l,B,L,l),U(u,L),r===1&&D(u,u),X(h,h,u),a.setVec(c,h);else for(let c=0;c<i;c++){o.getVec(c,B),e.getVec(c,h),w(l,B,L,l),U(u,L);const $=wr(t.get(c,1));let s=Math.cos($);r===0&&(s=1/s),u[0]*=s,u[1]*=s,u[2]*=s,u[3]*=s,u[4]*=s,u[5]*=s,r===1&&D(u,u),X(h,h,u),xr(h,h),a.setVec(c,h)}return a}function j(r){return er(r)||Ur(r)}function er(r){return r.isWGS84||vr(r)||Fr(r)||Mr(r)}function Ur(r){return r.isWebMercator}const B=M(),h=M(),L=d(),u=K();function tr(r,e,t){return b(e.spatialReference,t)?Jr(r,e,t):Hr(r,e,t)}function Dr(r,e,t){const{position:o,normal:n,tangent:a}=r;if(y(e))return{position:o,normal:n,tangent:a};const i=e.localMatrix;return tr({position:Ir(o,new Float64Array(o.length),i),normal:Y(n)?Or(n,new Float32Array(n.length),i):null,tangent:Y(a)?Gr(a,new Float32Array(a.length),i):null},e.getOriginPoint(t),{geographic:e.geographic})}function fe(r,e,t){if(t!=null&&t.useTransform){var o;const{position:n,normal:a,tangent:i}=r;return{vertexAttributes:{position:n,normal:a,tangent:i},transform:new Yr({origin:[e.x,e.y,(o=e.z)!=null?o:0],geographic:b(e.spatialReference,t)})}}return{vertexAttributes:tr(r,e,t),transform:null}}function Xr(r,e,t){return b(e.spatialReference,t)?nr(r,e,t):q(r,e,t)}function pe(r,e,t,o){if(y(e))return Xr(r,t,o);const n=Dr(r,e,t.spatialReference);return t.equals(e.getOriginPoint(t.spatialReference))?q(n,t,o):b(t.spatialReference,o)?nr(n,t,o):q(n,t,o)}function Hr(r,e,t){const o=new Float64Array(r.position.length),n=r.position,a=e.x,i=e.y,l=e.z||0,{horizontal:c,vertical:$}=I(t?t.unit:null,e.spatialReference);for(let s=0;s<n.length;s+=3)o[s+0]=n[s+0]*c+a,o[s+1]=n[s+1]*c+i,o[s+2]=n[s+2]*$+l;return{position:o,normal:r.normal,tangent:r.tangent}}function Jr(r,e,t){const o=e.spatialReference,n=or(e,t,O),a=new Float64Array(r.position.length),i=Zr(r.position,n,o,a),l=P(ar,n);return{position:i,normal:Kr(i,a,r.normal,l,o),tangent:Qr(i,a,r.tangent,l,o)}}function Zr(r,e,t,o){E(p.fromTypedArray(o),p.fromTypedArray(r),e);const n=new Float64Array(r.length);return qr(o,n,t)}function Kr(r,e,t,o,n){if(y(t))return null;const a=new Float32Array(t.length);return T(f.fromTypedArray(a),f.fromTypedArray(t),o),Sr(a,r,e,n,a),a}function Qr(r,e,t,o,n){if(y(t))return null;const a=new Float32Array(t.length);T(f.fromTypedArray(a,4*Float32Array.BYTES_PER_ELEMENT),f.fromTypedArray(t,4*Float32Array.BYTES_PER_ELEMENT),o);for(let i=3;i<a.length;i+=4)a[i]=t[i];return kr(a,r,e,n,a),a}function q(r,e,t){const o=new Float64Array(r.position.length),n=r.position,a=e.x,i=e.y,l=e.z||0,{horizontal:c,vertical:$}=I(t?t.unit:null,e.spatialReference);for(let s=0;s<n.length;s+=3)o[s+0]=(n[s+0]-a)/c,o[s+1]=(n[s+1]-i)/c,o[s+2]=(n[s+2]-l)/$;return{position:o,normal:r.normal,tangent:r.tangent}}function nr(r,e,t){const o=e.spatialReference;or(e,t,O);const n=W(ne,O),a=new Float64Array(r.position.length),i=re(r.position,o,n,a),l=P(ar,n);return{position:i,normal:ee(r.normal,r.position,a,o,l),tangent:te(r.tangent,r.position,a,o,l)}}function or(r,e,t){w(r.spatialReference,[r.x,r.y,r.z||0],t,x(r.spatialReference));const{horizontal:o,vertical:n}=I(e?e.unit:null,r.spatialReference);return G(t,t,[o,o,n]),t}function re(r,e,t,o){const n=Vr(r,e,o),a=p.fromTypedArray(n),i=new Float64Array(n.length),l=p.fromTypedArray(i);return E(l,a,t),i}function ee(r,e,t,o,n){if(y(r))return null;const a=zr(r,e,t,o,new Float32Array(r.length)),i=f.fromTypedArray(a);return T(i,i,n),a}function te(r,e,t,o,n){if(y(r))return null;const a=Wr(r,e,t,o,new Float32Array(r.length)),i=f.fromTypedArray(a,4*Float32Array.BYTES_PER_ELEMENT);return T(i,i,n),a}function I(r,e){if(y(r))return oe;const t=e.isGeographic?1:Pr(e),o=e.isGeographic?1:Rr(e),n=br(1,r,"meters");return{horizontal:n*t,vertical:n*o}}const O=d(),ne=d(),ar=K(),oe={horizontal:1,vertical:1};export{Wr as B,zr as F,qr as M,Yr as O,kr as R,Dr as _,Sr as a,fe as b,v as c,S as d,ce as e,pe as f,Xr as k,F as l,ue as q,b as r,Vr as v,tr as x};
