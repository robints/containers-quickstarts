'use strict';var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};!function(require,directRequire){function a(){const a=h.getCurrent(),b=a.appid===l.TOURIST_APPID,c=a.setting.urlCheck;let d=!0;return b?d=!1:!c&&(d=!1),d}var b=Math.floor;const c=require('fs'),d=require('path'),e=require('./bc78839ccca8df9e5ceeb7fae11b7be2.js'),f=require('./0634ee2ebd3e560d9d4804ecc960160f.js'),g=require('./233d77ecf0781f44985f684f70e316d0.js'),h=require('./3bfffbe88b3d923921f851c0697974fe.js'),i=require('./f6cbcecf6ed9f533f6a506310d8f07b6.js'),j=require('./dfd9a72b9ff6078018aa4a64eed949a5.js'),k=require('./2dfc6a3df6d6fc51266b293c8420e88b.js'),l=require('./56c390e04c10e91a4aa2a2c19d9a885d.js'),m=require('./5d0f2b7b8c329790946b9b597749ad67.js'),n=require('./common/locales/index.js'),o=l.CONTENTTYPEINFO,p=/^(http|ws)s?:\/\/[\w-.]+(:\d+)?/i;let q=0,r=0,s={},t=1,u={},v=1;const w=(a='')=>{const b={},c=a.split(';');for(let d=0;d<c.length;d++){const a=c[d].trim(),e=a.split('='),f=e[0].trim(),g=e.slice(1).join('=').trim();if(0===d){b.name=f,b.value=g;continue}const h=f.toLowerCase();if('httponly'===h){b.httpOnly=!0;continue}if('secure'===h){b.secure=!0;continue}if('maxage'===h){b.maxAge=g;continue}b[h]=g}return b},x=(a)=>{const b=[];for(const c in a)if('set-cookie'===c.toLowerCase()){const d=a[c],e=Object.prototype.toString.call(d);if('[object String]'===e){b.push(w(d.trim()));continue}if('[object Array]'===e){for(const a of d)b.push(w(a.trim()));continue}}return b},y=(a,b)=>{const c={};for(const d in a){const e=Object.prototype.toString.call(a[d]);c[d]='[object Array]'===e?a[d].join(b):a[d]}return c};module.exports={downloadFile:async function(b,f,e){const j=f.args;if(i.isLocalId(j.url)){const a=i.getFileRealPath(j.url);return a&&c.existsSync(a.fileRealPath)?{errMsg:`${f.api}:ok`,statusCode:200,tempFilePath:j.url}:{errMsg:`${f.api}:ok`,statusCode:404}}const m=e(),q=m.toolbar.network.list[m.toolbar.network.current];if('none'==q)return{errMsg:`${f.api}:fail network is down`};const s=h.getCurrent(),t=h.getCurrentRuntimeConfig();let u=h.isGameApp(s)?1024*(1024*t.setting.GameDownloadFileSizeLimit):1024*(1024*t.setting.DownloadFileSizeLimit);const v=m.simulator.appConfig||{},w=t.setting.MaxDownloadConcurrent;return r>=w?{errMsg:`${f.api}:fail exceed max download connection count ${w}`}:new Promise((b)=>{let e=!1;const q=(a)=>{e||(r--,b(a),e=!0)};try{r++;let b=0,e=200,t=d.extname(j.url.split('?')[0]);const w=i.createTmpfileName(s,t),x=i.getFileRealPath(w),y=x.fileRealPath,z=j.header&&'object'==typeof j.header?j.header:{};z.Referer=`https://servicewechat.com/${h.getProjectAppID()}/devtools/page-frame.html`;const A=m.toolbar&&m.toolbar.deviceInfo&&m.toolbar.deviceInfo.ua||'';z['User-Agent']=A.replace('{{webviewID}}','');let B=!1;const C={method:'get',url:j.url,encoding:null,headers:z,timeout:j.timeout||v.networkTimeout&&v.networkTimeout.downloadFile||6e4,followRedirect(b){if(!a())return!0;const c=b.statusCode;if(300<=c&&400>c&&(302==c||301==c)){const a=b.caseless.get('location'),c=h.getCurrentRuntimeDomains().download;let d=p.exec(a.toLowerCase());d=d&&d[0]||'';for(let a=0;a<c.length;a++){const b=c[a];let e=p.exec(b.toLowerCase());if(e=e&&e[0],e==d)return!0}const e=[];c.forEach((a)=>{e.push([a])}),k.display({command:l.DISPLAY_INFO,type:l.DISPLAY_TYPES.DOMAIN_ERROR,data:{type:'download',url:`302: ${a}`,domains:e}}),B=!0}return!1}};a()?C.agentOptions={secureProtocol:'TLSv1_2_method'}:C.tunnel=!1;const D=g(C),E=[];D.on('response',(a)=>{if(e=a.statusCode,200!=e&&206!=e)B?q({errMsg:`${f.api}:fail url not in domain list`}):q({errMsg:`${f.api}:ok`,statusCode:e});else{const b=parseInt(a.headers['content-length']);if(a.headers['content-type']){const b=a.headers['content-type'].replace(/;.*/g,''),c=o[b.toLowerCase()];if(c)t=`.${c}`;else{const a=b.split('/');a&&a[1]&&!/\-|\+/ig.test(a[1])&&(t=`.${a[1]}`)}}b>u&&(D.abort(),q({errMsg:`${f.api}:fail exceed max file size`}))}}).on('error',function(a){a&&'EPROTO'===a.code?q({errMsg:`${f.api}:fail ${n.config.TLS_VERSION_REQUIRED}`}):a&&('ETIMEDOUT'===a.code||'ESOCKETTIMEDOUT'===a.code)?q({errMsg:`${f.api}:fail timeout`}):q({errMsg:`${f.api}:fail ${a}`})}).on('data',(a)=>{b+=a.length,E.push(a),b>u&&(D.abort(),q({errMsg:`${f.api}:fail exceed max file size`}))}).on('end',()=>{const a=Buffer.concat(E),b=i.initTmpfileName(s,a,t),d=i.getFileRealPath(b),g=d.fileRealPath;c.writeFileSync(g,a),c.unlinkSync(y),q({errMsg:`${f.api}:ok`,tempFilePath:b,statusCode:e})}).pipe(c.createWriteStream(y))}catch(a){q({errMsg:`${f.api}:fail ${a}`})}})},uploadFile:async function(b,d,e){const f=d.args,j=h.getCurrentRuntimeConfig(),k=j.setting.MaxUploadConcurrent,l=e(),m=l.toolbar.network.list[l.toolbar.network.current];if('none'==m)return{errMsg:`${d.api}:fail network is down`};if(q>=k)return{errMsg:`${d.api}:fail exceed max upload connection count ${k}`};const o=f.filePath,p=i.getFileRealPath(o),r=p.fileRealPath;if(!c.existsSync(r))return{errMsg:`${d.api}:fail file not found`};const s=l.simulator.appConfig||{};return new Promise((b)=>{let e=!1;const i=(a)=>{e||(q--,e=!0,b(a))};try{q++;const b={url:f.url,headers:f.header||{},formData:f.formData||{},method:'post',timeout:f.timeout||s.networkTimeout&&s.networkTimeout.uploadFile||6e4};a()?b.agentOptions={secureProtocol:'TLSv1_2_method'}:b.tunnel=!1,b.formData[f.name]=c.createReadStream(r),b.headers.Referer=`https://servicewechat.com/${h.getProjectAppID()}/devtools/page-frame.html`;const e=l.toolbar&&l.toolbar.deviceInfo&&l.toolbar.deviceInfo.ua||'';b.headers['User-Agent']=e.replace('{{webviewID}}','');g(b,(a,b,c)=>{let e={};e=a?b&&b.statusCode?{errMsg:`${d.api}:ok`,statusCode:b.statusCode,data:c}:'EPROTO'===a.code?{errMsg:`${d.api}:fail ${n.config.TLS_VERSION_REQUIRED}`}:'ETIMEDOUT'===a.code||'ESOCKETTIMEDOUT'===a.code?{errMsg:`${d.api}:fail timeout`}:{errMsg:`${d.api}:fail ${a}`}:{errMsg:`${d.api}:ok`,statusCode:b.statusCode,data:c},i(e)})}catch(a){i({errMsg:`${d.api}:fail ${a}`})}})},createUploadTask:async function(d,k,e){const l=e(),o=k.args,p=h.getCurrentRuntimeConfig(),r=j(),u=p.setting.MaxUploadConcurrent,v=l.toolbar.network.list[l.toolbar.network.current];if('none'==v)return{errMsg:`${k.api}:fail network is down`};if(q>=u)return{errMsg:`${k.api}:fail exceed max upload connection count ${u}`};const w=o.filePath;let z=i.getFileRealPath(w);const A=z.fileRealPath;if(!c.existsSync(A))return{errMsg:`${k.api}:fail file not found`};const B=l.simulator.appConfig||{};let C=o.url;try{C=new URL(o.url).href}catch(a){}try{q++;const e={url:C,headers:o.header||{},formData:o.formData||{},method:'post',timeout:o.timeout||B.networkTimeout&&B.networkTimeout.uploadFile||6e4,time:!0};e.headers.Referer=`https://servicewechat.com/${h.getProjectAppID()}/devtools/page-frame.html`;const i=l.toolbar&&l.toolbar.deviceInfo&&l.toolbar.deviceInfo.ua||'';e.headers['User-Agent']=i.replace('{{webviewID}}',''),a()&&(e.agentOptions={secureProtocol:'TLSv1_2_method'});const j=c.createReadStream(A);e.formData[o.name]=j;const p=t++,u=c.statSync(A);let v=0;const w=Date.now(),D=`1.${p}`;d({type:f.SIMULATOR_DEBUG_INFO,data:{method:'Network.requestWillBeSent',params:{requestId:D,documentURL:e.headers.Referer,request:{url:e.url,method:e.method,headers:e.headers},timestamp:w/1e3,type:'XHR'}}});Date.now()-w;j.on('data',function(a){v+=a.length,r.triggerOnEvent({eventName:'onUploadTaskStateChange',data:{uploadTaskId:p,state:'progressUpdate',progress:b(100*(v/u.size)),totalBytesSent:v,totalBytesExpectedToSend:u.size}})});const E=(a)=>{s[p]&&('success'===a.state&&(a.header=y(J||{},','),a.cookies=x(J||{})),r.triggerOnEvent({eventName:'onUploadTaskStateChange',data:_extends({uploadTaskId:p},a)}),q--,delete s[p])},F=g(e);let G=0;const H=[];let I=200,J={};return F.on('response',(a)=>{I=a.statusCode,J={};for(let b=0,c=a.rawHeaders.length;b<c;b+=2)J[a.rawHeaders[b]]||(J[a.rawHeaders[b]]=[]),J[a.rawHeaders[b]].push(a.rawHeaders[b+1]||'');const b=a.request.timings;d({type:f.SIMULATOR_DEBUG_INFO,data:{method:'Network.responseReceived',params:{requestId:D,timestamp:Date.now()/1e3,type:'XHR',response:{url:e.url,status:a.statusCode,statusText:a.statusMessage,headers:y(J,'\n'),connectionId:D,timing:{requestTime:w/1e3,proxyStart:0,proxyEnd:b.socket,dnsStart:b.socket,dnsEnd:b.lookup,connectStart:b.lookup,connectEnd:b.connect,sslStart:-1,sslEnd:-1,workerStart:-1,workerReady:-1,sendStart:b.connect,sendEnd:b.connect,pushStart:0,pushEnd:0,receiveHeadersEnd:b.response},protocol:a.request.uri.protocol.replace(/:$/,'')+'/'+a.httpVersion}}}}),r.triggerOnEvent({eventName:'onUploadTaskStateChange',data:{uploadTaskId:p,state:'headersReceived',header:y(J,','),cookies:x(J)}})}).on('error',(a)=>{z='EPROTO'===a.code?{state:'fail',errMsg:n.config.TLS_VERSION_REQUIRED}:'ETIMEDOUT'===a.code||'ESOCKETTIMEDOUT'===a.code?{state:'fail',errMsg:'timeout'}:{state:'fail',errMsg:`${a}`},E(z),d({type:f.SIMULATOR_DEBUG_INFO,data:{method:'Network.loadingFailed',params:{requestId:D,timestamp:Date.now()/1e3,type:'XHR',errorText:a.toString(),canceled:!1}}})}).on('data',(a)=>{G+=a.length,H.push(a),d({type:f.SIMULATOR_DEBUG_INFO,data:{method:'Network.dataReceived',params:{requestId:D,timestamp:Date.now()/1e3,dataLength:a.length,encodedDataLength:a.length}}})}).on('abort',()=>{setTimeout(()=>{E({state:'fail',errMsg:'abort'})},0),d({type:f.SIMULATOR_DEBUG_INFO,data:{method:'Network.loadingFailed',params:{requestId:D,timestamp:Date.now()/1e3,type:'XHR',errorText:'abort',canceled:!0}}})}).on('end',()=>{const a=Buffer.concat(H);E({state:'success',statusCode:I,data:a.toString()}),d({type:f.SIMULATOR_DEBUG_INFO,data:{method:'Network.loadingFinished',params:{requestId:D,timestamp:Date.now()/1e3,dataLength:a.length,encodedDataLength:a.length}}}),m.set(D,a,'raw')}),s[p]={id:p,request:F},{errMsg:`${k.api}:ok`,uploadTaskId:p}}catch(a){return q--,{errMsg:`${k.api}:fail ${a}'`}}},operateUploadTask:async function(a,b){const c=b.args,d=c.uploadTaskId,e=c.operationType,f=s[d];return f?'abort'==e?(f.request&&f.request.abort(),{errMsg:`${b.api}:ok`}):{errMsg:`${b.api}:fail illegal operationType`}:{errMsg:`${b.api}:fail task not found`}},createDownloadTask:async function(e,q,s){const t=q.args,w=s(),z=w.toolbar.network.list[w.toolbar.network.current],A=j(),B=h.getCurrent();if('none'==z)return{errMsg:`${q.api}:fail network is down`};if(t.url&&!/^https?:\/\//.test(t.url.toLowerCase()))return{errMsg:`${q.api}:fail invalid url`};const C=h.getCurrentRuntimeConfig(),D=C.setting.MaxDownloadConcurrent;if(r>=D)return{errMsg:`${q.api}:fail exceed max download connection count ${D}`};let E=h.isGameApp()?1024*(1024*C.setting.GameDownloadFileSizeLimit):1024*(1024*C.setting.DownloadFileSizeLimit);const F=t.header&&'object'==typeof t.header?t.header:{};F.Referer=`https://servicewechat.com/${h.getProjectAppID()}/devtools/page-frame.html`;const G=w.toolbar&&w.toolbar.deviceInfo&&w.toolbar.deviceInfo.ua||'';F['User-Agent']=G.replace('{{webviewID}}','');try{r++;let j=0;const s=[];let z=200,C=d.extname(t.url.split('?')[0]);const D=i.createTmpfileName(B,C),G=i.getFileRealPath(D),H=G.fileRealPath,I=w.simulator.appConfig||{};let J=!1,K=t.url;try{K=new URL(t.url).href}catch(a){}const L={method:'get',url:K,encoding:null,headers:F,timeout:t.timeout||I.networkTimeout&&I.networkTimeout.downloadFile||6e4,time:!0,followRedirect(b){if(!a())return!0;const c=b.statusCode;if(300<=c&&400>c&&(302==c||301==c)){const a=h.getCurrentRuntimeDomains().download,c=b.caseless.get('location');let d=p.exec(c.toLowerCase());d=d&&d[0]||'';for(let b=0;b<a.length;b++){const c=a[b];let e=p.exec(c.toLowerCase());if(e=e&&e[0],e==d)return!0}const e=[];a.forEach((a)=>{e.push([a])}),k.display({command:l.DISPLAY_INFO,type:l.DISPLAY_TYPES.DOMAIN_ERROR,data:{type:'download',url:`302: ${c}`,domains:e}}),J=!0}return!1}};a()?L.agentOptions={secureProtocol:'TLSv1_2_method'}:L.tunnel=!1;const M=v++,N=`2.${M}`,O=Date.now();let P={};e({type:f.ASSDK_CALLBACK,res:{errMsg:`${q.api}:ok`,downloadTaskId:M},callbackID:q.callbackID}),e({type:f.SIMULATOR_DEBUG_INFO,data:{method:'Network.requestWillBeSent',params:{requestId:N,documentURL:F.Referer,request:{url:L.url,method:L.method,headers:F},timestamp:O/1e3,type:'XHR'}}});const Q=g(L);u[M]={downloadTaskId:M,request:Q};let R=E;const S=(a)=>{u[M]&&(delete u[M],r--,'success'===a.state&&(a.header=y(P||{},','),a.cookies=x(P||{})),A.triggerOnEvent({eventName:'onDownloadTaskStateChange',data:_extends({downloadTaskId:M},a)}))},T=(a,c)=>{A.triggerOnEvent({eventName:'onDownloadTaskStateChange',data:{downloadTaskId:M,state:'progressUpdate',totalBytesWritten:a,totalBytesExpectedToWrite:c,progress:b(100*(a/c))}})};if(i.isLocalId(t.url)){const a=i.getFileRealPath(t.url);if(!(a&&c.existsSync(a.fileRealPath)))S({state:'success',statusCode:404});else if(t.filePath){const a=i.copyFile(B,t.url,t.filePath);a.error?S({state:'fail',statusCode:403,errMsg:`permission denied, open "${t.filePath}"`}):S({state:'success',filePath:t.filePath,statusCode:200})}else S({state:'success',tempFilePath:t.url,statusCode:200});return}Q.on('response',(a)=>{if(z=a.statusCode,200!=z&&206!=z&&404!=z)J?S({state:'fail',errMsg:'url not in domain list'}):S({state:'success',statusCode:z});else{const b=parseInt(a.headers['content-length']);if(b>E?(Q.abort(),S({state:'fail',errMsg:'exceed max file size'})):R=b,a.headers['content-type']){const b=a.headers['content-type'].replace(/;.*/g,''),c=o[b.toLowerCase()];if(c)C=`.${c}`;else{const a=b.split('/');a&&a[1]&&!/\-|\+/ig.test(a[1])&&(C=`.${a[1]}`)}}}P={};for(let b=0,c=a.rawHeaders.length;b<c;b+=2)P[a.rawHeaders[b]]||(P[a.rawHeaders[b]]=[]),P[a.rawHeaders[b]].push(a.rawHeaders[b+1]||'');const b=a.request.timings;e({type:f.SIMULATOR_DEBUG_INFO,data:{method:'Network.responseReceived',params:{requestId:N,timestamp:Date.now()/1e3,type:'XHR',response:{url:L.url,status:a.statusCode,statusText:a.statusMessage,headers:y(P,'\n'),connectionId:N,timing:{requestTime:O/1e3,proxyStart:0,proxyEnd:b.socket,dnsStart:b.socket,dnsEnd:b.lookup,connectStart:b.lookup,connectEnd:b.connect,sslStart:-1,sslEnd:-1,workerStart:-1,workerReady:-1,sendStart:b.connect,sendEnd:b.connect,pushStart:0,pushEnd:0,receiveHeadersEnd:b.response},protocol:a.request.uri.protocol.replace(/:$/,'')+'/'+a.httpVersion}}}}),A.triggerOnEvent({eventName:'onDownloadTaskStateChange',data:{downloadTaskId:M,state:'headersReceived',header:y(P,','),cookies:x(P)}})}).on('error',function(a){a&&'EPROTO'===a.code?S({state:'fail',errMsg:n.config.TLS_VERSION_REQUIRED}):a&&('ETIMEDOUT'===a.code||'ESOCKETTIMEDOUT'===a.code)?S({state:'fail',errMsg:'timeout'}):S({state:'fail',errMsg:`${a}`}),e({type:f.SIMULATOR_DEBUG_INFO,data:{method:'Network.loadingFailed',params:{requestId:N,timestamp:Date.now()/1e3,type:'XHR',errorText:a.toString(),canceled:!1}}})}).on('data',(a)=>{j+=a.length,s.push(a),j>E?(S({state:'fail',errMsg:'exceed max file size'}),Q.abort()):T(j,R),e({type:f.SIMULATOR_DEBUG_INFO,data:{method:'Network.dataReceived',params:{requestId:N,timestamp:Date.now()/1e3,dataLength:a.length,encodedDataLength:a.length}}})}).on('abort',()=>{setTimeout(()=>{S({state:'fail',errMsg:'abort'})},0),e({type:f.SIMULATOR_DEBUG_INFO,data:{method:'Network.loadingFailed',params:{requestId:N,timestamp:Date.now()/1e3,type:'XHR',errorText:'abort',canceled:!0}}})}).on('end',(a)=>{a&&s.push(a);const b=Buffer.concat(s),d=i.initTmpfileName(B,b,C),g=i.getFileRealPath(d),h=g.fileRealPath;if(c.writeFileSync(h,b),c.unlinkSync(H),t.filePath){const a=i.rename(B,d,t.filePath);a.error?(S({state:'fail',errMsg:`permission denied, open "${t.filePath}"`,statusCode:z}),c.unlinkSync(d),c.unlinkSync(H),c.unlinkSync(h)):S({state:'success',filePath:t.filePath,header:y(P,','),cookies:x(P),statusCode:z})}else S({state:'success',tempFilePath:d,statusCode:z});e({type:f.SIMULATOR_DEBUG_INFO,data:{method:'Network.loadingFinished',params:{requestId:N,timestamp:Date.now()/1e3,dataLength:b.length,encodedDataLength:b.length}}}),m.set(N,h,'file')}).pipe(c.createWriteStream(H))}catch(a){return{errMsg:`${q.api}:fail ${a}`}}},operateDownloadTask:async function(a,b){const c=b.args,d=c.downloadTaskId,e=c.operationType,f=u[d];return f?'abort'==e?(f.request&&f.request.abort(),{errMsg:`${b.api}:ok`}):{errMsg:`${b.api}:fail illegal operationType`}:{errMsg:`${b.api}:fail task not found`}},resetNetworkStatus:function(){for(let a in s)try{s[a].request.abort()}catch(a){}for(let a in u)try{u[a].request.abort()}catch(a){}q=0,r=0,s={},u={}}}}(require('lazyload'),require);