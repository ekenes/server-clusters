import{b as A}from"./vendor.1906794a.js";function d(n,r){return n?r?4:3:r?3:2}function j(n,r,o,l,s){if(A(r)||!r.lengths.length)return null;const u=(s==null?void 0:s.originPosition)==="upperLeft"?-1:1;n.lengths.length&&(n.lengths.length=0),n.coords.length&&(n.coords.length=0);const t=n.coords,e=[],N=o?[Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY]:[Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY],{lengths:i,coords:E}=r,F=d(o,l);let b=0;for(const I of i){const c=G(N,E,b,I,o,l,u);c&&e.push(c),b+=I*F}if(e.sort((I,c)=>{let T=u*I[2]-u*c[2];return T===0&&o&&(T=I[4]-c[4]),T}),e.length){let I=6*e[0][2];t[0]=e[0][0]/I,t[1]=e[0][1]/I,o&&(I=6*e[0][4],t[2]=I!==0?e[0][3]/I:0),(t[0]<N[0]||t[0]>N[1]||t[1]<N[2]||t[1]>N[3]||o&&(t[2]<N[4]||t[2]>N[5]))&&(t.length=0)}if(!t.length){const I=r.lengths[0]?O(E,0,i[0],o,l):null;if(!I)return null;t[0]=I[0],t[1]=I[1],o&&I.length>2&&(t[2]=I[2])}return n}function G(n,r,o,l,s,u,t=1){const e=d(s,u);let N=o,i=o+e,E=0,F=0,b=0,I=0,c=0;for(let _=0,V=l-1;_<V;_++,N+=e,i+=e){const h=r[N],m=r[N+1],f=r[N+2],g=r[i],P=r[i+1],p=r[i+2];let Y=h*P-g*m;I+=Y,E+=(h+g)*Y,F+=(m+P)*Y,s&&(Y=h*p-g*f,b+=(f+p)*Y,c+=Y),h<n[0]&&(n[0]=h),h>n[1]&&(n[1]=h),m<n[2]&&(n[2]=m),m>n[3]&&(n[3]=m),s&&(f<n[4]&&(n[4]=f),f>n[5]&&(n[5]=f))}if(I*t>0&&(I*=-1),c*t>0&&(c*=-1),!I)return null;const T=[E,F,.5*I];return s&&(T[3]=b,T[4]=.5*c),T}function O(n,r,o,l,s){const u=d(l,s);let t=r,e=r+u,N=0,i=0,E=0,F=0;for(let b=0,I=o-1;b<I;b++,t+=u,e+=u){const c=n[t],T=n[t+1],_=n[t+2],V=n[e],h=n[e+1],m=n[e+2],f=l?a(c,T,_,V,h,m):S(c,T,V,h);if(f)if(N+=f,l){const g=v(c,T,_,V,h,m);i+=f*g[0],E+=f*g[1],F+=f*g[2]}else{const g=q(c,T,V,h);i+=f*g[0],E+=f*g[1]}}return N>0?l?[i/N,E/N,F/N]:[i/N,E/N]:o>0?l?[n[r],n[r+1],n[r+2]]:[n[r],n[r+1]]:null}function S(n,r,o,l){const s=o-n,u=l-r;return Math.sqrt(s*s+u*u)}function a(n,r,o,l,s,u){const t=l-n,e=s-r,N=u-o;return Math.sqrt(t*t+e*e+N*N)}function q(n,r,o,l){return[n+.5*(o-n),r+.5*(l-r)]}function v(n,r,o,l,s,u){return[n+.5*(l-n),r+.5*(s-r),o+.5*(u-o)]}export{j as e};
