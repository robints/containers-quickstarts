'use strict';var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};!function(require,directRequire){function a(){console.trace(),i.info(`IDE is going to suicide because the inactive time has exceeded ${u/1e3/60} minutes`),j.quit()}const b=require('request'),c=require('./8f5981105740200e87abfc379e4a36f6.js'),d=require('./8201c9f7be7447a385da48a3a5af0d42.js'),e=require('./b4fb47d5f3cee5536f111697f701f083.js'),f=require('./15da66bcecf19293a1e4cee6d641ac07.js'),g=require('./c016c015550b8c8e4a79e8e85062bd17.js'),h=require('./205e69607c4b60711b15f5ac95b40ce4.js'),i=require('./72653d4b93cdd7443296229431a7aa9a.js'),j=require('./84b183688a46c9e2626d3e6f83365e13.js'),k=require('./d6d995f6e6beb0243444faa9fc9669c5.js'),l=require('./b543ae2da406cea63b3ad8951f17b6c0.js'),m=require('./881e653f19d837f2408386047cb8c38c.js'),n=require('./09060286633d09fb81fefc8ff1294dd7.js'),o=require('./76d9df7b0b3e47fbe17881420a4bef86.js'),p=require('./1d122464fbc304d1d41e99699ef4d8df.js'),q=require('./2a0793d184cc5f699ba18197a7403b19.js'),r='REDIRECT_TO_CURRENT_BROWSING_CONTEXT',s='REDIRECT_TO_MAIN_SVR_WINDOW';let t;const u=600000,v=_extends({},c,d,e,f),w=[g.Name.GET,g.Name.QUIT,g.Name.GET_APP_CACHE_STATUS,g.Name.GET_RUNTIME_INFO].reduce((a,b)=>{return a[b]=!0,a},{}),x=/post/i,y=async(a,b)=>{let c=null;try{c=g.parse(a.method,a.url)}catch(b){return`ide unknown command (parse failed): ${a.url}`}if(!c)return`ide unknown command (empty parse result): ${a.url}`;const d=c.getName();if(v[d]){if(h.getSelfWindowHandle()!==h.getCurrentBrowsingContext()){if(h.getSelfWindowHandle()!==h.getMainWindowHandle())return s;if(d===g.Name.CLOSE&&setTimeout(()=>{h.setCurrentBrowsingContext(h.getMainWindowHandle()),global.online&&l.closeAllDevWindows()}),!w[d])return r}let a={};try{a=JSON.parse(b)}catch(a){}return await v[d](c,a)}return`unknown command (no handler): ${a.url}`},z=(a,b)=>{global.CLI.isTestMode&&!global.isDevWindow&&(t=+new Date);let c;(function(b){const d=[];a.on('data',function(a){d.push(a)}),a.on('end',function(){c=Buffer.concat(d),b()})})(async()=>{try{const d=await y(a,c);if(d===r){const c=h.getCurrentBrowsingContext();let d;l.clientWindows.get(c)?d=l.clientWindows.get(c).cliPort:(await Promise.all([l.onceCliPortUpdate({id:c}),new Promise((b,c)=>setTimeout(()=>c(`open project failed, project window failed to notify cli port within ${p.DEV_WINDOW_OPEN_TIMEOUT}ms, ${a.method}:${a.url}`),p.DEV_WINDOW_OPEN_TIMEOUT))]),d=l.clientWindows.get(c));const e=a.headers.host.replace(/:\d+$/,()=>':'+d),f={Location:`http://${e}${a.url}`};b.writeHead(307,f),b.end()}else if(d===s){const c=m.serverWindowInfo.get(n.CLI_PORT),d=a.headers.host.replace(/:\d+$/,()=>':'+c),e={Location:`http://${d}${a.url}`};b.writeHead(307,e),b.end()}else{const a='object'==typeof d?JSON.stringify(d):d.toString(),c={"Content-Type":'object'==typeof d?'application/json':'text/plain'};b.writeHead(200,c),b.end(a)}}catch(c){if(c&&c.hasOwnProperty&&c.hasOwnProperty('status')&&c.value&&c.value.message){return b.writeHead(200,{"Content-Type":'application/json'}),void b.end(JSON.stringify(c))}let d;try{d='[object Object]'===c.toString()?JSON.stringify(c):c.toString(),i.error(`process driver command (${a.method}:${a.url}) error: ${d}\n stack: ${c.stack}`)}catch(a){}b.writeHead(200,{"Content-Type":'text/plain'}),b.end(JSON.stringify({status:o.JavaScriptError,value:{message:d}}))}})};z.init=()=>{global.CLI.isTestMode&&!global.isDevWindow&&setInterval(()=>{+new Date-t>u&&a()},60000)},module.exports=z}(require('lazyload'),require);