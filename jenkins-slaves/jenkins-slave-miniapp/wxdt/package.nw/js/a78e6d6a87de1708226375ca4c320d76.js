'use strict';!function(require,directRequire){const a=require('./015fdda1d1aad2fb64ce9f97d3c60553.js'),b=require('events').EventEmitter;class c extends b{constructor(){super(),this.pool=[],setInterval(this.clearUnusedInstances.bind(this),600000)}clearUnusedInstances(){const a=Date.now(),b=[];this.pool.forEach((c)=>{a-c.ts<300000||c.attached?b.push(c):c.distroy()}),this.pool=b}get(b,c,d={}){let e;for(let a=0,f=this.pool.length;a<f;a++){const d=this.pool[a];if(d.type==b&&d.checkAvailable()){e=d,e.deviceInfo=c;break}}return e||(e=new a(b,c,d),this.pool.push(e),this.setupWebviewRequestListeners(e)),e.assigned=!0,e}getAnyAttached(a){let b;for(let c=0,d=this.pool.length;c<d;c++)if(this.pool[c].type==a&&this.pool[c].attached){b=this.pool[c];break}return b||null}async disableAllAttached(a){const b=this.pool;for(let c=0,d=b.length;c<d;c++){const d=b[c];d.type==a&&d.attached&&(await b[c].disabled())}}get webviews(){const a=this;return{get simulator(){return a.pool.filter((a)=>'simulator'===a.type&&a.attached)},get appservice(){return a.pool.find((a)=>'appservice'===a.type)}}}setupWebviewRequestListeners(a){const b=a._webview.request;b.onBeforeRequest.addListener(this.getRequestEventHandler(a,'onBeforeRequest'),{urls:['<all_urls>']}),b.onBeforeSendHeaders.addListener(this.getRequestEventHandler(a,'onBeforeSendHeaders'),{urls:['<all_urls>']},['requestHeaders']),b.onSendHeaders.addListener(this.getRequestEventHandler(a,'onSendHeaders'),{urls:['<all_urls>']},['requestHeaders']),b.onHeadersReceived.addListener(this.getRequestEventHandler(a,'onHeadersReceived'),{urls:['<all_urls>']},['responseHeaders']),b.onResponseStarted.addListener(this.getRequestEventHandler(a,'onResponseStarted'),{urls:['<all_urls>']},['responseHeaders']),b.onBeforeRedirect.addListener(this.getRequestEventHandler(a,'onBeforeRedirect'),{urls:['<all_urls>']},['responseHeaders']),b.onCompleted.addListener(this.getRequestEventHandler(a,'onCompleted'),{urls:['<all_urls>']},['responseHeaders']),b.onErrorOccurred.addListener(this.getRequestEventHandler(a,'onErrorOccurred'),{urls:['<all_urls>']})}getRequestEventHandler(a,b){const c=a.type,d=a.deviceInfo,e=a.options,f=e.id;return(a)=>{if(this.shouldEmitRequestEvent(b)){const e={eventName:b,id:f,type:c,deviceInfo:d,details:a};this.emit('all',e),this.emit(b,e)}}}shouldEmitRequestEvent(a){return this.listenerCount('all')||this.listenerCount(a)}}const d=new c;module.exports=d}(require('lazyload'),require);