/*
 * jQuery BBQ: Back Button & Query Library - v1.2.1 - 2/17/2010
 * http://benalman.com/projects/jquery-bbq-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,p){var i,m=Array.prototype.slice,r=decodeURIComponent,a=$.param,c,l,v,b=$.bbq=$.bbq||{},q,u,j,e=$.event.special,d="hashchange",A="querystring",D="fragment",y="elemUrlAttr",g="location",k="href",t="src",x=/^.*\?|#.*$/g,w=/^.*\#/,h,C={};function E(F){return typeof F==="string"}function B(G){var F=m.call(arguments,1);return function(){return G.apply(this,F.concat(m.call(arguments)))}}function n(F){return F.replace(/^[^#]*#?(.*)$/,"$1")}function o(F){return F.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/,"$1")}function f(H,M,F,I,G){var O,L,K,N,J;if(I!==i){K=F.match(H?/^([^#]*)\#?(.*)$/:/^([^#?]*)\??([^#]*)(#?.*)/);J=K[3]||"";if(G===2&&E(I)){L=I.replace(H?w:x,"")}else{N=l(K[2]);I=E(I)?l[H?D:A](I):I;L=G===2?I:G===1?$.extend({},I,N):$.extend({},N,I);L=a(L);if(H){L=L.replace(h,r)}}O=K[1]+(H?"#":L||!K[1]?"?":"")+L+J}else{O=M(F!==i?F:p[g][k])}return O}a[A]=B(f,0,o);a[D]=c=B(f,1,n);c.noEscape=function(G){G=G||"";var F=$.map(G.split(""),encodeURIComponent);h=new RegExp(F.join("|"),"g")};c.noEscape(",/");$.deparam=l=function(I,F){var H={},G={"true":!0,"false":!1,"null":null};$.each(I.replace(/\+/g," ").split("&"),function(L,Q){var K=Q.split("="),P=r(K[0]),J,O=H,M=0,R=P.split("]["),N=R.length-1;if(/\[/.test(R[0])&&/\]$/.test(R[N])){R[N]=R[N].replace(/\]$/,"");R=R.shift().split("[").concat(R);N=R.length-1}else{N=0}if(K.length===2){J=r(K[1]);if(F){J=J&&!isNaN(J)?+J:J==="undefined"?i:G[J]!==i?G[J]:J}if(N){for(;M<=N;M++){P=R[M]===""?O.length:R[M];O=O[P]=M<N?O[P]||(R[M+1]&&isNaN(R[M+1])?{}:[]):J}}else{if($.isArray(H[P])){H[P].push(J)}else{if(H[P]!==i){H[P]=[H[P],J]}else{H[P]=J}}}}else{if(P){H[P]=F?i:""}}});return H};function z(H,F,G){if(F===i||typeof F==="boolean"){G=F;F=a[H?D:A]()}else{F=E(F)?F.replace(H?w:x,""):F}return l(F,G)}l[A]=B(z,0);l[D]=v=B(z,1);$[y]||($[y]=function(F){return $.extend(C,F)})({a:k,base:k,iframe:t,img:t,input:t,form:"action",link:k,script:t});j=$[y];function s(I,G,H,F){if(!E(H)&&typeof H!=="object"){F=H;H=G;G=i}return this.each(function(){var L=$(this),J=G||j()[(this.nodeName||"").toLowerCase()]||"",K=J&&L.attr(J)||"";L.attr(J,a[I](K,H,F))})}$.fn[A]=B(s,A);$.fn[D]=B(s,D);b.pushState=q=function(I,F){if(E(I)&&/^#/.test(I)&&F===i){F=2}var H=I!==i,G=c(p[g][k],H?I:{},H?F:2);p[g][k]=G+(/#/.test(G)?"":"#")};b.getState=u=function(F,G){return F===i||typeof F==="boolean"?v(F):v(G)[F]};b.removeState=function(F){var G={};if(F!==i){G=u();$.each($.isArray(F)?F:arguments,function(I,H){delete G[H]})}q(G,2)};e[d]=$.extend(e[d],{add:function(F){var H;function G(J){var I=J[D]=c();J.getState=function(K,L){return K===i||typeof K==="boolean"?l(I,K):l(I,L)[K]};H.apply(this,arguments)}if($.isFunction(F)){H=F;return G}else{H=F.handler;F.handler=G}}})})(jQuery,this);

/*
  Markup.js v1.5.20: http://github.com/adammark/Markup.js
  MIT License
  (c) 2011 - 2014 Adam Mark
*/
var Mark={includes:{},globals:{},delimiter:">",compact:false,_copy:function(d,c){c=c||[];for(var e in d){c[e]=d[e]}return c},_size:function(b){return b instanceof Array?b.length:(b||0)},_iter:function(a,b){this.idx=a;this.size=b;this.length=b;this.sign="#";this.toString=function(){return this.idx+this.sign.length-1}},_pipe:function(h,c){var g,f,b,a;if((g=c.shift())){f=g.split(this.delimiter);b=f.shift().trim();try{a=Mark.pipes[b].apply(null,[h].concat(f));h=this._pipe(a,c)}catch(d){}}return h},_eval:function(e,g,h){var a=this._pipe(e,g),b=a,d=-1,c,f;if(a instanceof Array){a="";c=b.length;while(++d<c){f={iter:new this._iter(d,c)};a+=h?Mark.up(h,b[d],f):b[d]}}else{if(a instanceof Object){a=Mark.up(h,b)}}return a},_test:function(a,e,c,b){var d=Mark.up(e,c,b).split(/\{\{\s*else\s*\}\}/);return(a===false?d[1]:d[0])||""},_bridge:function(h,e){if(e=="."){e="\\."}var f="{{\\s*"+e+"([^/}]+\\w*)?}}|{{/"+e+"\\s*}}",n=new RegExp(f,"g"),p=h.match(n)||[],o,g,m=0,l=0,k=-1,j=0;for(g=0;g<p.length;g++){o=g;k=h.indexOf(p[o],k+1);if(p[o].indexOf("{{/")>-1){l++}else{m++}if(m===l){break}}m=h.indexOf(p[0]);l=m+p[0].length;j=k+p[o].length;return[h.substring(m,j),h.substring(l,k)]}};Mark.up=function(s,b,e){b=b||{};e=e||{};var m=/\{\{(.+?)\}\}/g,l=s.match(m)||[],t,d,g,h=[],r,c,f,k,o,a,n,q=0,p=0;if(e.pipes){this._copy(e.pipes,this.pipes)}if(e.includes){this._copy(e.includes,this.includes)}if(e.globals){this._copy(e.globals,this.globals)}if(e.delimiter){this.delimiter=e.delimiter}if(e.compact!==undefined){this.compact=e.compact}while((t=l[q++])){k=undefined;f="";r=t.indexOf("/}}")>-1;d=t.substr(2,t.length-(r?5:4));d=d.replace(/`(.+?)`/g,function(i,j){return Mark.up("{{"+j+"}}",b)});c=d.trim().indexOf("if ")===0;h=d.split("|");h.shift();d=d.replace(/^\s*if/,"").split("|").shift().trim();g=c?"if":d.split("|")[0];n=b[d];if(c&&!h.length){h=["notempty"]}if(!r&&s.indexOf("{{/"+g)>-1){k=this._bridge(s,g);t=k[0];f=k[1];q+=t.match(m).length-1}if(/^\{\{\s*else\s*\}\}$/.test(t)){continue}else{if((o=this.globals[d])!==undefined){k=this._eval(o,h,f)}else{if((a=this.includes[d])){if(a instanceof Function){a=a()}k=this._pipe(Mark.up(a,b,e),h)}else{if(d.indexOf("#")>-1){e.iter.sign=d;k=this._pipe(e.iter,h)}else{if(d==="."){k=this._pipe(b,h)}else{if(d.indexOf(".")>-1){d=d.split(".");n=Mark.globals[d[0]];if(n){p=1}else{p=0;n=b}while(n&&p<d.length){n=n[d[p++]]}k=this._eval(n,h,f)}else{if(c){k=this._pipe(n,h)}else{if(n instanceof Array){k=this._eval(n,h,f)}else{if(f){k=n?Mark.up(f,n):undefined}else{if(b.hasOwnProperty(d)){k=this._pipe(n,h)}}}}}}}}}}if(k instanceof Array){k=this._eval(k,h,f)}if(c){k=this._test(k,f,b,e)}s=s.replace(t,k===undefined?"???":k)}return this.compact?s.replace(/>\s+</g,"><"):s};Mark.pipes={empty:function(a){return !a||(a+"").trim().length===0?a:false},notempty:function(a){return a&&(a+"").trim().length?a:false},blank:function(b,a){return !!b||b===0?b:a},more:function(d,c){return Mark._size(d)>c?d:false},less:function(d,c){return Mark._size(d)<c?d:false},ormore:function(d,c){return Mark._size(d)>=c?d:false},orless:function(d,c){return Mark._size(d)<=c?d:false},between:function(e,d,f){e=Mark._size(e);return e>=d&&e<=f?e:false},equals:function(d,c){return d==c?d:false},notequals:function(d,c){return d!=c?d:false},like:function(b,a){return new RegExp(a,"i").test(b)?b:false},notlike:function(b,a){return !Mark.pipes.like(b,a)?b:false},upcase:function(a){return String(a).toUpperCase()},downcase:function(a){return String(a).toLowerCase()},capcase:function(a){return a.replace(/(?:^|\s)\S/g,function(b){return b.toUpperCase()})},chop:function(a,b){return a.length>b?a.substr(0,b)+"...":a},tease:function(c,d){var b=c.split(/\s+/);return b.slice(0,d).join(" ")+(b.length>d?"...":"")},trim:function(a){return a.trim()},pack:function(a){return a.trim().replace(/\s{2,}/g," ")},round:function(a){return Math.round(+a)},clean:function(a){return String(a).replace(/<\/?[^>]+>/gi,"")},size:function(a){return a.length},length:function(a){return a.length},reverse:function(a){return[].concat(a).reverse()},join:function(a,b){return a.join(b)},limit:function(b,c,a){return b.slice(+a||0,+c+(+a||0))},split:function(b,a){return b.split(a||",")},choose:function(b,c,a){return !!b?c:(a||"")},toggle:function(c,b,a,d){return a.split(",")[b.match(/\w+/g).indexOf(c+"")]||d},sort:function(a,c){var b=function(e,d){return e[c]>d[c]?1:-1};return[].concat(a).sort(c?b:undefined)},fix:function(a,b){return(+a).toFixed(b)},mod:function(a,b){return(+a)%(+b)},divisible:function(a,b){return a&&(+a%b)===0?a:false},even:function(a){return a&&(+a&1)===0?a:false},odd:function(a){return a&&(+a&1)===1?a:false},number:function(a){return parseFloat(a.replace(/[^\-\d\.]/g,""))},url:function(a){return encodeURI(a)},bool:function(a){return !!a},falsy:function(a){return !a},first:function(a){return a.idx===0},last:function(a){return a.idx===a.size-1},call:function(b,a){return b[a].apply(b,[].slice.call(arguments,2))},set:function(b,a){Mark.globals[a]=b;return""},log:function(a){console.log(a);return a}};if(typeof String.prototype.trim!=="function"){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}}if(typeof module!=="undefined"&&module.exports){module.exports=Mark}else{if(typeof define==="function"&&define.amd){define(function(){return Mark})}};
/** Transparency.js min
 * https://github.com/leonidas/transparency.git
 * */
/*!function t(e,n,r){function i(s,u){if(!n[s]){if(!e[s]){var l="function"==typeof require&&require;if(!u&&l)return l(s,!0);if(o)return o(s,!0);var a=new Error("Cannot find module '"+s+"'");throw a.code="MODULE_NOT_FOUND",a}var h=n[s]={exports:{}};e[s][0].call(h.exports,function(t){var n=e[s][1][t];return i(n?n:t)},h,h.exports,t,e,n,r)}return n[s].exports}for(var o="function"==typeof require&&require,s=0;s<r.length;s++)i(r[s]);return i}({1:[function(t,e){var n,r,i,o,s,u=[].indexOf||function(t){for(var e=0,n=this.length;n>e;e++)if(e in this&&this[e]===t)return e;return-1};s=t("../lib/lodash.js"),o=t("./helpers"),r=t("./context"),i={},i.render=function(t,e,n,u){var l,a;return null==e&&(e=[]),null==n&&(n={}),null==u&&(u={}),l=u.debug&&console?o.consoleLogger:o.nullLogger,l("Transparency.render:",t,e,n,u),t?(s.isArray(e)||(e=[e]),t=(a=o.data(t)).context||(a.context=new r(t,i)),t.render(e,n,u).el):void 0},i.matcher=function(t,e){return t.el.id===e||u.call(t.classNames,e)>=0||t.el.name===e||t.el.getAttribute("data-bind")===e},i.clone=function(t){return n(t).clone()[0]},i.jQueryPlugin=o.chainable(function(t,e,n){var r,o,s,u;for(u=[],o=0,s=this.length;s>o;o++)r=this[o],u.push(i.render(r,t,e,n));return u}),("undefined"!=typeof jQuery&&null!==jQuery||"undefined"!=typeof Zepto&&null!==Zepto)&&(n=jQuery||Zepto,null!=n&&(n.fn.render=i.jQueryPlugin)),("undefined"!=typeof e&&null!==e?e.exports:void 0)&&(e.exports=i),"undefined"!=typeof window&&null!==window&&(window.Transparency=i),("undefined"!=typeof define&&null!==define?define.amd:void 0)&&define(function(){return i})},{"../lib/lodash.js":7,"./context":3,"./helpers":5}],2:[function(t,e){var n,r,i,o,s,u,l,a,h={}.hasOwnProperty,c=function(t,e){function n(){this.constructor=t}for(var r in e)h.call(e,r)&&(t[r]=e[r]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};a=t("../lib/lodash"),l=t("./helpers"),e.exports=r={Attributes:{},createAttribute:function(t,e){var i;return new(i=r.Attributes[e]||n)(t,e)}},n=function(){function t(t,e){this.el=t,this.name=e,this.templateValue=this.el.getAttribute(this.name)||""}return t.prototype.set=function(t){return this.el[this.name]=t,this.el.setAttribute(this.name,t.toString())},t}(),i=function(t){function e(t,e){this.el=t,this.name=e,this.templateValue=this.el.getAttribute(this.name)||!1}var n,i,o,s;for(c(e,t),n=["hidden","async","defer","autofocus","formnovalidate","disabled","autofocus","formnovalidate","multiple","readonly","required","checked","scoped","reversed","selected","loop","muted","autoplay","controls","seamless","default","ismap","novalidate","open","typemustmatch","truespeed"],o=0,s=n.length;s>o;o++)i=n[o],r.Attributes[i]=e;return e.prototype.set=function(t){return this.el[this.name]=t,t?this.el.setAttribute(this.name,this.name):this.el.removeAttribute(this.name)},e}(n),u=function(t){function e(t,e){var n;this.el=t,this.name=e,this.templateValue=function(){var t,e,r,i;for(r=this.el.childNodes,i=[],t=0,e=r.length;e>t;t++)n=r[t],n.nodeType===l.TEXT_NODE&&i.push(n.nodeValue);return i}.call(this).join(""),this.children=a.toArray(this.el.children),(this.textNode=this.el.firstChild)?this.textNode.nodeType!==l.TEXT_NODE&&(this.textNode=this.el.insertBefore(this.el.ownerDocument.createTextNode(""),this.textNode)):this.el.appendChild(this.textNode=this.el.ownerDocument.createTextNode(""))}return c(e,t),r.Attributes.text=e,e.prototype.set=function(t){for(var e,n,r,i,o;e=this.el.firstChild;)this.el.removeChild(e);for(this.textNode.nodeValue=t,this.el.appendChild(this.textNode),i=this.children,o=[],n=0,r=i.length;r>n;n++)e=i[n],o.push(this.el.appendChild(e));return o},e}(n),s=function(t){function e(t){this.el=t,this.templateValue="",this.children=a.toArray(this.el.children)}return c(e,t),r.Attributes.html=e,e.prototype.set=function(t){for(var e,n,r,i,o;e=this.el.firstChild;)this.el.removeChild(e);for(this.el.innerHTML=t+this.templateValue,i=this.children,o=[],n=0,r=i.length;r>n;n++)e=i[n],o.push(this.el.appendChild(e));return o},e}(n),o=function(t){function e(t){e.__super__.constructor.call(this,t,"class")}return c(e,t),r.Attributes["class"]=e,e}(n)},{"../lib/lodash":7,"./helpers":5}],3:[function(t,e){var n,r,i,o,s,u,l;l=t("./helpers"),o=l.before,i=l.after,s=l.chainable,u=l.cloneNode,r=t("./instance"),e.exports=n=function(){function t(t,e){this.el=t,this.Transparency=e,this.template=u(this.el),this.instances=[new r(this.el,this.Transparency)],this.instanceCache=[]}var e,n;return n=s(function(){return this.parent=this.el.parentNode,this.parent?(this.nextSibling=this.el.nextSibling,this.parent.removeChild(this.el)):void 0}),e=s(function(){return this.parent?this.nextSibling?this.parent.insertBefore(this.el,this.nextSibling):this.parent.appendChild(this.el):void 0}),t.prototype.render=o(n)(i(e)(s(function(t,e,n){for(var i,o,s,l,a,h,c;t.length<this.instances.length;)this.instanceCache.push(this.instances.pop().remove());for(;t.length>this.instances.length;)s=this.instanceCache.pop()||new r(u(this.template),this.Transparency),this.instances.push(s.appendTo(this.el));for(c=[],o=a=0,h=t.length;h>a;o=++a)l=t[o],s=this.instances[o],i=[],c.push(s.prepare(l,i).renderValues(l,i).renderDirectives(l,o,e).renderChildren(l,i,e,n));return c}))),t}()},{"./helpers":5,"./instance":6}],4:[function(t,e){var n,r,i,o,s,u,l,a,h,c,p,f={}.hasOwnProperty,d=function(t,e){function n(){this.constructor=t}for(var r in e)f.call(e,r)&&(t[r]=e[r]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};p=t("../lib/lodash.js"),c=t("./helpers"),n=t("./attributeFactory"),e.exports=o={Elements:{input:{}},createElement:function(t){var e,n;return new(e="input"===(n=t.nodeName.toLowerCase())?o.Elements[n][t.type.toLowerCase()]||s:o.Elements[n]||i)(t)}},i=function(){function t(t){this.el=t,this.attributes={},this.childNodes=p.toArray(this.el.childNodes),this.nodeName=this.el.nodeName.toLowerCase(),this.classNames=this.el.className.split(" "),this.originalAttributes={}}return t.prototype.empty=function(){for(var t;t=this.el.firstChild;)this.el.removeChild(t);return this},t.prototype.reset=function(){var t,e,n,r;n=this.attributes,r=[];for(e in n)t=n[e],r.push(t.set(t.templateValue));return r},t.prototype.render=function(t){return this.attr("text",t)},t.prototype.attr=function(t,e){var r,i;return r=(i=this.attributes)[t]||(i[t]=n.createAttribute(this.el,t,e)),null!=e&&r.set(e),r},t.prototype.renderDirectives=function(t,e,n){var r,i,o,s;s=[];for(i in n)f.call(n,i)&&(r=n[i],"function"==typeof r&&(o=r.call(t,{element:this.el,index:e,value:this.attr(i).templateValue}),s.push(null!=o?this.attr(i,o):void 0)));return s},t}(),l=function(t){function e(t){e.__super__.constructor.call(this,t),this.elements=c.getElements(t)}return d(e,t),o.Elements.select=e,e.prototype.render=function(t){var e,n,r,i,o;for(t=t.toString(),i=this.elements,o=[],n=0,r=i.length;r>n;n++)e=i[n],"option"===e.nodeName&&o.push(e.attr("selected",e.el.value===t));return o},e}(i),h=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}var n,r,i,s;for(d(e,t),n=["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],i=0,s=n.length;s>i;i++)r=n[i],o.Elements[r]=e;return e.prototype.attr=function(t,n){return"text"!==t&&"html"!==t?e.__super__.attr.call(this,t,n):void 0},e}(i),s=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return d(e,t),e.prototype.render=function(t){return this.attr("value",t)},e}(h),a=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return d(e,t),o.Elements.textarea=e,e}(s),r=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return d(e,t),o.Elements.input.checkbox=e,e.prototype.render=function(t){return this.attr("checked",Boolean(t))},e}(s),u=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return d(e,t),o.Elements.input.radio=e,e}(r)},{"../lib/lodash.js":7,"./attributeFactory":2,"./helpers":5}],5:[function(t,e,n){var r,i,o,s;r=t("./elementFactory"),n.before=function(t){return function(e){return function(){return t.apply(this,arguments),e.apply(this,arguments)}}},n.after=function(t){return function(e){return function(){return e.apply(this,arguments),t.apply(this,arguments)}}},n.chainable=n.after(function(){return this}),n.onlyWith$=function(t){return"undefined"!=typeof jQuery&&null!==jQuery||"undefined"!=typeof Zepto&&null!==Zepto?function(){return t(arguments)}(jQuery||Zepto):void 0},n.getElements=function(t){var e;return e=[],s(t,e),e},s=function(t,e){var i,o;for(i=t.firstChild,o=[];i;)i.nodeType===n.ELEMENT_NODE&&(e.push(new r.createElement(i)),s(i,e)),o.push(i=i.nextSibling);return o},n.ELEMENT_NODE=1,n.TEXT_NODE=3,o=function(){return"<:nav></:nav>"!==document.createElement("nav").cloneNode(!0).outerHTML},n.cloneNode="undefined"==typeof document||null===document||o()?function(t){return t.cloneNode(!0)}:function(t){var e,r,o,s,u;if(e=Transparency.clone(t),e.nodeType===n.ELEMENT_NODE)for(e.removeAttribute(i),u=e.getElementsByTagName("*"),o=0,s=u.length;s>o;o++)r=u[o],r.removeAttribute(i);return e},i="transparency",n.data=function(t){return t[i]||(t[i]={})},n.nullLogger=function(){},n.consoleLogger=function(){return console.log(arguments)},n.log=n.nullLogger},{"./elementFactory":4}],6:[function(t,e){var n,r,i,o,s={}.hasOwnProperty;o=t("../lib/lodash.js"),r=(i=t("./helpers")).chainable,e.exports=n=function(){function t(t,e){this.Transparency=e,this.queryCache={},this.childNodes=o.toArray(t.childNodes),this.elements=i.getElements(t)}return t.prototype.remove=r(function(){var t,e,n,r,i;for(r=this.childNodes,i=[],e=0,n=r.length;n>e;e++)t=r[e],i.push(t.parentNode.removeChild(t));return i}),t.prototype.appendTo=r(function(t){var e,n,r,i,o;for(i=this.childNodes,o=[],n=0,r=i.length;r>n;n++)e=i[n],o.push(t.appendChild(e));return o}),t.prototype.prepare=r(function(t){var e,n,r,o,s;for(o=this.elements,s=[],n=0,r=o.length;r>n;n++)e=o[n],e.reset(),s.push(i.data(e.el).model=t);return s}),t.prototype.renderValues=r(function(t,e){var n,r,i,u;if(o.isElement(t)&&(n=this.elements[0]))return n.empty().el.appendChild(t);if("object"==typeof t){u=[];for(r in t)s.call(t,r)&&(i=t[r],null!=i&&u.push(o.isString(i)||o.isNumber(i)||o.isBoolean(i)||o.isDate(i)?function(){var t,e,o,s;for(o=this.matchingElements(r),s=[],t=0,e=o.length;e>t;t++)n=o[t],s.push(n.render(i));return s}.call(this):"object"==typeof i?e.push(r):void 0));return u}}),t.prototype.renderDirectives=r(function(t,e,n){var r,i,o,u;u=[];for(o in n)s.call(n,o)&&(r=n[o],"object"==typeof r&&("object"!=typeof t&&(t={value:t}),u.push(function(){var n,s,u,l;for(u=this.matchingElements(o),l=[],n=0,s=u.length;s>n;n++)i=u[n],l.push(i.renderDirectives(t,e,r));return l}.call(this))));return u}),t.prototype.renderChildren=r(function(t,e,n,r){var i,o,s,u,l;for(l=[],s=0,u=e.length;u>s;s++)o=e[s],l.push(function(){var e,s,u,l;for(u=this.matchingElements(o),l=[],e=0,s=u.length;s>e;e++)i=u[e],l.push(this.Transparency.render(i.el,t[o],n[o],r));return l}.call(this));return l}),t.prototype.matchingElements=function(t){var e,n,r;return n=(r=this.queryCache)[t]||(r[t]=function(){var n,r,i,o;for(i=this.elements,o=[],n=0,r=i.length;r>n;n++)e=i[n],this.Transparency.matcher(e,t)&&o.push(e);return o}.call(this)),i.log("Matching elements for '"+t+"':",n),n},t}()},{"../lib/lodash.js":7,"./helpers":5}],7:[function(t,e,n){var r={};r.toString=Object.prototype.toString,r.toArray=function(t){for(var e=new Array(t.length),n=0;n<t.length;n++)e[n]=t[n];return e},r.isString=function(t){return"[object String]"==r.toString.call(t)},r.isNumber=function(t){return"[object Number]"==r.toString.call(t)},r.isArray=Array.isArray||function(t){return"[object Array]"===r.toString.call(t)},r.isDate=function(t){return"[object Date]"===r.toString.call(t)},r.isElement=function(t){return!(!t||1!==t.nodeType)},r.isPlainValue=function(t){var e;return e=typeof t,"object"!==e&&"function"!==e||n.isDate(t)},r.isBoolean=function(t){return t===!0||t===!1},e.exports=r},{}]},{},[1]);
*//*!
 * @copyright &copy; Kartik Visweswaran, Krajee.com, 2014
 * @version 2.5.0
 *
 * A simple yet powerful JQuery star rating plugin that allows rendering
 * fractional star ratings and supports Right to Left (RTL) input.
 * 
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */!function(t){var a=0,e=5,n=.5,r=function(a,e){return"undefined"==typeof a||null===a||void 0===a||a==[]||""===a||e&&""===t.trim(a)},l=function(t,a,e){var n=r(t.data(a))?t.attr(a):t.data(a);return n?n:e[a]},i=function(t){var a=(""+t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);return a?Math.max(0,(a[1]?a[1].length:0)-(a[2]?+a[2]:0)):0},s=function(t,a){return parseFloat(t.toFixed(a))},o=function(a,e){this.$element=t(a),this.init(e)};o.prototype={constructor:o,_parseAttr:function(t,i){var s=this,o=s.$element;if("range"===o.attr("type")||"number"===o.attr("type")){var c=l(o,t,i),p=n;"min"===t?p=a:"max"===t?p=e:"step"===t&&(p=n);var u=r(c)?p:c;return parseFloat(u)}return parseFloat(i[t])},listen:function(){var a=this;a.$rating.on("click",function(t){a.inactive||(w=t.pageX-a.$rating.offset().left,a.setStars(w),a.$element.trigger("change"),a.$element.trigger("rating.change",[a.$element.val(),a.$caption.html()]))}),a.$clear.on("click",function(){a.inactive||a.clear()}),t(a.$element[0].form).on("reset",function(){a.inactive||a.reset()})},initSlider:function(t){var l=this;r(l.$element.val())&&l.$element.val(0),l.initialValue=l.$element.val(),l.min="undefined"!=typeof t.min?t.min:l._parseAttr("min",t),l.max="undefined"!=typeof t.max?t.max:l._parseAttr("max",t),l.step="undefined"!=typeof t.step?t.step:l._parseAttr("step",t),(isNaN(l.min)||r(l.min))&&(l.min=a),(isNaN(l.max)||r(l.max))&&(l.max=e),(isNaN(l.step)||r(l.step)||0==l.step)&&(l.step=n),l.diff=l.max-l.min},init:function(a){var e=this;e.options=a,e.initSlider(a),e.checkDisabled(),$element=e.$element,e.containerClass=a.containerClass,e.glyphicon=a.glyphicon;var n=e.glyphicon?"":"★";e.symbol=r(a.symbol)?n:a.symbol,e.rtl=a.rtl||e.$element.attr("dir"),e.rtl&&e.$element.attr("dir","rtl"),e.showClear=a.showClear,e.showCaption=a.showCaption,e.size=a.size,e.stars=a.stars,e.defaultCaption=a.defaultCaption,e.starCaptions=a.starCaptions,e.starCaptionClasses=a.starCaptionClasses,e.clearButton=a.clearButton,e.clearButtonTitle=a.clearButtonTitle,e.clearButtonBaseClass=r(a.clearButtonBaseClass)?"clear-rating":a.clearButtonBaseClass,e.clearButtonActiveClass=r(a.clearButtonActiveClass)?"clear-rating-active":a.clearButtonActiveClass,e.clearCaption=a.clearCaption,e.clearCaptionClass=a.clearCaptionClass,e.clearValue=a.clearValue,e.$element.removeClass("form-control").addClass("form-control"),e.$clearElement=r(a.clearElement)?null:t(a.clearElement),e.$captionElement=r(a.captionElement)?null:t(a.captionElement),"undefined"==typeof e.$rating&&"undefined"==typeof e.$container&&(e.$rating=t(document.createElement("div")).html('<div class="rating-stars"></div>'),e.$container=t(document.createElement("div")),e.$container.before(e.$rating),e.$container.append(e.$rating),e.$element.before(e.$container).appendTo(e.$rating)),e.$stars=e.$rating.find(".rating-stars"),e.generateRating(),e.$clear=r(e.$clearElement)?e.$container.find("."+e.clearButtonBaseClass):e.$clearElement,e.$caption=r(e.$captionElement)?e.$container.find(".caption"):e.$captionElement,e.setStars(),e.$element.hide(),e.listen(),e.showClear&&e.$clear.attr({"class":e.getClearClass()}),e.$element.removeClass("rating-loading")},checkDisabled:function(){var t=this;t.disabled=l(t.$element,"disabled",t.options),t.readonly=l(t.$element,"readonly",t.options),t.inactive=t.disabled||t.readonly},getClearClass:function(){return this.clearButtonBaseClass+" "+(this.inactive?"":this.clearButtonActiveClass)},generateRating:function(){var t=this,a=t.renderClear(),e=t.renderCaption(),n=t.rtl?"rating-container-rtl":"rating-container",l=t.getStars();n+=t.glyphicon?""==t.symbol?" rating-gly-star":" rating-gly":" rating-uni",t.$rating.attr("class",n),t.$rating.attr("data-content",l),t.$stars.attr("data-content",l);var n=t.rtl?"star-rating-rtl":"star-rating";t.$container.attr("class",n+" rating-"+t.size),t.inactive?t.$container.removeClass("rating-active").addClass("rating-disabled"):t.$container.removeClass("rating-disabled").addClass("rating-active"),"undefined"==typeof t.$caption&&"undefined"==typeof t.$clear&&(t.rtl?t.$container.prepend(e).append(a):t.$container.prepend(a).append(e)),r(t.containerClass)||t.$container.removeClass(t.containerClass).addClass(t.containerClass)},getStars:function(){for(var t=this,a=t.stars,e="",n=1;a>=n;n++)e+=t.symbol;return e},renderClear:function(){var t=this;if(!t.showClear)return"";var a=t.getClearClass();return r(t.$clearElement)?'<div class="'+a+'" title="'+t.clearButtonTitle+'">'+t.clearButton+"</div>":(t.$clearElement.removeClass(a).addClass(a).attr({title:t.clearButtonTitle}),t.$clearElement.html(t.clearButton),"")},renderCaption:function(){var t=this,a=t.$element.val();if(!t.showCaption)return"";var e=t.fetchCaption(a);return r(t.$captionElement)?'<div class="caption">'+e+"</div>":(t.$captionElement.removeClass("caption").addClass("caption").attr({title:t.clearCaption}),t.$captionElement.html(e),"")},fetchCaption:function(t){var a,e,n=this,l=parseFloat(t);if(a="function"==typeof n.starCaptionClasses?r(n.starCaptionClasses(l))?n.clearCaptionClass:n.starCaptionClasses(l):r(n.starCaptionClasses[l])?n.clearCaptionClass:n.starCaptionClasses[l],"function"==typeof n.starCaptions)var e=r(n.starCaptions(l))?n.defaultCaption.replace(/\{rating\}/g,l):n.starCaptions(l);else var e=r(n.starCaptions[l])?n.defaultCaption.replace(/\{rating\}/g,l):n.starCaptions[l];var i=l==n.clearValue?n.clearCaption:e;return'<span class="'+a+'">'+i+"</span>"},getValueFromPosition:function(t){var a,e,n=this,r=i(n.step),l=n.$rating.width();return a=t/l,e=n.rtl?n.min+Math.floor(n.diff*a/n.step)*n.step:n.min+Math.ceil(n.diff*a/n.step)*n.step,e<n.min?e=n.min:e>n.max&&(e=n.max),e=s(parseFloat(e),r),n.rtl&&(e=n.max-e),e},setStars:function(t){var a=this,e=a.min,n=a.max,l=(a.step,arguments.length?a.getValueFromPosition(t):r(a.$element.val())?0:a.$element.val()),i=0,s=(a.$rating.width(),a.fetchCaption(l));i=(l-e)/n*100,a.rtl&&(i=100-i),a.$element.val(l),i+="%",a.$stars.css("width",i),a.$caption.html(s)},clear:function(){var t=this,a='<span class="'+t.clearCaptionClass+'">'+t.clearCaption+"</span>";t.$stars.removeClass("rated"),t.inactive||t.$caption.html(a),t.$element.val(t.clearValue),t.setStars(),t.$element.trigger("rating.clear")},reset:function(){var t=this;t.$element.val(t.initialValue),t.setStars(),t.$element.trigger("rating.reset")},update:function(t){if(arguments.length>0){var a=this;a.$element.val(t),a.setStars()}},refresh:function(a){var e=this;if(arguments.length){e.init(t.extend(e.options,a)),e.showClear?e.$clear.show():e.$clear.hide(),e.showCaption?e.$caption.show():e.$caption.hide()}}},t.fn.rating=function(a){var e=Array.apply(null,arguments);return e.shift(),this.each(function(){var n=t(this),r=n.data("rating"),l="object"==typeof a&&a;r||n.data("rating",r=new o(this,t.extend({},t.fn.rating.defaults,l,t(this).data()))),"string"==typeof a&&r[a].apply(r,e)})},t.fn.rating.defaults={stars:5,glyphicon:!0,symbol:null,disabled:!1,readonly:!1,rtl:!1,size:"md",showClear:!0,showCaption:!0,defaultCaption:"{rating} Stars",starCaptions:{.5:"Half Star",1:"One Star",1.5:"One & Half Star",2:"Two Stars",2.5:"Two & Half Stars",3:"Three Stars",3.5:"Three & Half Stars",4:"Four Stars",4.5:"Four & Half Stars",5:"Five Stars"},starCaptionClasses:{.5:"label label-danger",1:"label label-danger",1.5:"label label-warning",2:"label label-warning",2.5:"label label-info",3:"label label-info",3.5:"label label-primary",4:"label label-primary",4.5:"label label-success",5:"label label-success"},clearButton:'<i class="glyphicon glyphicon-minus-sign"></i>',clearButtonTitle:"Clear",clearButtonBaseClass:"clear-rating",clearButtonActiveClass:"clear-rating-active",clearCaption:"Not Rated",clearCaptionClass:"label label-default",clearValue:0,captionElement:null,clearElement:null,containerClass:null},t("input.rating").addClass("rating-loading"),t(document).ready(function(){var a=t("input.rating"),e=Object.keys(a).length;e>0&&a.rating()})}(jQuery);
/* JVFloat.js v1.0.0 - Generated on: 2014-09-18 */
!function(a){"use strict";a.fn.jvFloat=function(){return this.filter("input:not([type=submit]), textarea, select").each(function(){function b(a){var b=a.attr("placeholder");return"undefined"==typeof b&&(b=a.attr("title")),b}function c(){var a=f.val();if(null==a)a="";else if(f.is("select")){var c=b(f);c==a&&(a="")}i.toggleClass("active",""!==a)}function d(){var b="";do b=("0000"+(Math.random()*Math.pow(36,4)<<0).toString(36)).substr(-4);while(a("#"+b).length);return b}function e(a){var b=d();return a.prop("id",b),b}var f=a(this).wrap("<div class=jvFloat>"),g=f.attr("id");g||(g=e(f));var h=f.attr("required")||"",i="",j=b(f);i=a(this).is("textarea")?a('<label class="placeHolder  textarea '+h+'" for="'+g+'">'+j+"</label>").insertBefore(f):a('<label class="placeHolder '+h+'" for="'+g+'">'+j+"</label>").insertBefore(f),c(),f.bind("keyup blur",c)})}}(window.jQuery||window.Zepto||window.$);



/* ===========================================================
 * jquery-simple-text-rotator.js v1
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * A very simple and light weight jQuery plugin that 
 * allows you to rotate multiple text without changing 
 * the layout
 * https://github.com/peachananr/simple-text-rotator
 *
 * ========================================================== */

!function($){
  
  var defaults = {
		animation: "dissolve",
		separator: ",",
		speed: 2000
	};
	
	$.fx.step.textShadowBlur = function(fx) {
    $(fx.elem).prop('textShadowBlur', fx.now).css({textShadow: '0 0 ' + Math.floor(fx.now) + 'px black'});
  };
	
  $.fn.textrotator = function(options){
    var settings = $.extend({}, defaults, options);
    
    return this.each(function(){
      var el = $(this)
      var array = [];
      $.each(el.text().split(settings.separator), function(key, value) { 
        array.push(value); 
      });
      el.text(array[0]);
      
      // animation option
      var rotate = function() {
        switch (settings.animation) { 
          case 'dissolve':
            el.animate({
              textShadowBlur:20,
              opacity: 0
            }, 500 , function() {
              index = $.inArray(el.text(), array)
              if((index + 1) == array.length) index = -1
              el.text(array[index + 1]).animate({
                textShadowBlur:0,
                opacity: 1
              }, 500 );
            });
          break;
          
          case 'flip':
            if(el.find(".back").length > 0) {
              el.html(el.find(".back").html())
            }
          
            var initial = el.text()
            var index = $.inArray(initial, array)
            if((index + 1) == array.length) index = -1
            
            el.html("");
            $("<span class='front'>" + initial + "</span>").appendTo(el);
            $("<span class='back'>" + array[index + 1] + "</span>").appendTo(el);
            el.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip").show().css({
              "-webkit-transform": " rotateY(-180deg)",
              "-moz-transform": " rotateY(-180deg)",
              "-o-transform": " rotateY(-180deg)",
              "transform": " rotateY(-180deg)"
            })
            
          break;
          
          case 'flipUp':
            if(el.find(".back").length > 0) {
              el.html(el.find(".back").html())
            }
          
            var initial = el.text()
            var index = $.inArray(initial, array)
            if((index + 1) == array.length) index = -1
            
            el.html("");
            $("<span class='front'>" + initial + "</span>").appendTo(el);
            $("<span class='back'>" + array[index + 1] + "</span>").appendTo(el);
            el.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip up").show().css({
              "-webkit-transform": " rotateX(-180deg)",
              "-moz-transform": " rotateX(-180deg)",
              "-o-transform": " rotateX(-180deg)",
              "transform": " rotateX(-180deg)"
            })
            
          break;
          
          case 'flipCube':
            if(el.find(".back").length > 0) {
              el.html(el.find(".back").html())
            }
          
            var initial = el.text()
            var index = $.inArray(initial, array)
            if((index + 1) == array.length) index = -1
            
            el.html("");
            $("<span class='front'>" + initial + "</span>").appendTo(el);
            $("<span class='back'>" + array[index + 1] + "</span>").appendTo(el);
            el.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip cube").show().css({
              "-webkit-transform": " rotateY(180deg)",
              "-moz-transform": " rotateY(180deg)",
              "-o-transform": " rotateY(180deg)",
              "transform": " rotateY(180deg)"
            })
            
          break;
          
          case 'flipCubeUp':
            if(el.find(".back").length > 0) {
              el.html(el.find(".back").html())
            }
          
            var initial = el.text()
            var index = $.inArray(initial, array)
            if((index + 1) == array.length) index = -1
            
            el.html("");
            $("<span class='front'>" + initial + "</span>").appendTo(el);
            $("<span class='back'>" + array[index + 1] + "</span>").appendTo(el);
            el.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip cube up").show().css({
              "-webkit-transform": " rotateX(180deg)",
              "-moz-transform": " rotateX(180deg)",
              "-o-transform": " rotateX(180deg)",
              "transform": " rotateX(180deg)"
            })
            
          break;
          
          case 'spin':
            if(el.find(".rotating").length > 0) {
              el.html(el.find(".rotating").html())
            }
            index = $.inArray(el.text(), array)
            if((index + 1) == array.length) index = -1
            
            el.wrapInner("<span class='rotating spin' />").find(".rotating").hide().text(array[index + 1]).show().css({
              "-webkit-transform": " rotate(0) scale(1)",
              "-moz-transform": "rotate(0) scale(1)",
              "-o-transform": "rotate(0) scale(1)",
              "transform": "rotate(0) scale(1)"
            })
          break;
          
          case 'fade':
            el.fadeOut(settings.speed, function() {
              index = $.inArray(el.text(), array)
              if((index + 1) == array.length) index = -1
              el.text(array[index + 1]).fadeIn(settings.speed);
            });
          break;
        }
      };
      setInterval(rotate, settings.speed);
    });
  }
  
}(window.jQuery);