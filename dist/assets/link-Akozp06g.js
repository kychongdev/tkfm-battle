import{r as S,l as Y,m as Z,n as ee,o as te,p as ae,q}from"./index-RUcekWp_.js";const oe="Error preloading route! ☝️";function re(o){const r=Y(),u=Z({strict:!1,select:e=>e.pathname}),{activeProps:l=()=>({className:"active"}),inactiveProps:g=()=>({}),activeOptions:a,hash:C,search:se,params:le,to:N,state:ce,mask:ie,preload:A,preloadDelay:_,replace:j,startTransition:z,resetScroll:B,children:b,target:c,disabled:n,style:d,className:h,onClick:p,onFocus:f,onMouseEnter:m,onMouseLeave:v,onTouchStart:y,...D}=o,M={...o.to&&{from:u},...o};let T="internal";try{new URL(`${N}`),T="external"}catch{}const s=r.buildLocation(M),R=A??r.options.defaultPreload,I=_??r.options.defaultPreloadDelay??0,P=ee({select:e=>{const t=e.location.pathname.split("/"),E=s.pathname.split("/").every((V,X)=>V===t[X]),G=a!=null&&a.exact?te(e.location.pathname,s.pathname):E,J=a!=null&&a.includeHash?e.location.hash===s.hash:!0,Q=(a==null?void 0:a.includeSearch)??!0?ae(e.location.search,s.search,!(a!=null&&a.exact)):!0;return G&&J&&Q}});if(T==="external")return{...D,type:T,href:N,...b&&{children:b},...c&&{target:c},...n&&{disabled:n},...d&&{style:d},...h&&{className:h},...p&&{onClick:p},...f&&{onFocus:f},...m&&{onMouseEnter:m},...v&&{onMouseLeave:v},...y&&{onTouchStart:y}};const O=e=>{!n&&!ne(e)&&!e.defaultPrevented&&(!c||c==="_self")&&e.button===0&&(e.preventDefault(),r.commitLocation({...s,replace:j,resetScroll:B,startTransition:z}))},w=()=>{S.startTransition(()=>{r.preloadRoute(M).catch(e=>{console.warn(e),console.warn(oe)})})},F=e=>{n||R&&w()},U=F,W=e=>{if(n)return;const t=e.target||{};if(R){if(t.preloadTimeout)return;t.preloadTimeout=setTimeout(()=>{t.preloadTimeout=null,w()},I)}},$=e=>{if(n)return;const t=e.target||{};t.preloadTimeout&&(clearTimeout(t.preloadTimeout),t.preloadTimeout=null)},i=e=>t=>{var x;(x=t.persist)==null||x.call(t),e.filter(Boolean).forEach(E=>{t.defaultPrevented||E(t)})},k=P?q(l,{})??{}:{},L=P?{}:q(g,{}),H=[h,k.className,L.className].filter(Boolean).join(" "),K={...d,...k.style,...L.style};return{...k,...L,...D,href:n?void 0:s.maskedLocation?r.history.createHref(s.maskedLocation.href):r.history.createHref(s.href),onClick:i([p,O]),onFocus:i([f,F]),onMouseEnter:i([m,W]),onMouseLeave:i([v,$]),onTouchStart:i([y,U]),target:c,...Object.keys(K).length&&{style:K},...H&&{className:H},...n&&{role:"link","aria-disabled":!0},...P&&{"data-status":"active","aria-current":"page"}}}const de=S.forwardRef((o,r)=>{const{_asChild:u,...l}=o,{type:g,...a}=re(l),C=typeof l.children=="function"?l.children({isActive:a["data-status"]==="active"}):l.children;return S.createElement(u||"a",{...a,ref:r},C)});function ne(o){return!!(o.metaKey||o.altKey||o.ctrlKey||o.shiftKey)}export{de as L};
