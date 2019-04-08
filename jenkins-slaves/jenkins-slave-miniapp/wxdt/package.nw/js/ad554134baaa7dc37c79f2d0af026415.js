'use strict';var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};!function(require,directRequire){function a(a,b){if('initsuccess'===b.type){k=!0;const a=m;m=[];for(const b of a)b[0]()}else if('taskresult'===b.type){const a=n[b.id];a?(a.resolve&&a.resolve(b.result),delete n[b.id]):console.warn('unrecognized task result of msg',b)}else if('taskerror'===b.type){console.warn('got task error',b.id);const a=n[b.id];a?(a.reject&&a.reject(b.error),delete n[b.id]):console.warn('unrecognized task error of msg',b)}}function b(){if(l){try{l.removeAllListeners(),l.kill('SIGTERM')}catch(a){console.warn('stopping child process error',a)}l=null,k=void 0,clearTimeout(o),o=void 0;const a=m;m=[];for(const b of a)b[1]()}}function c(){let c=g.join(g.dirname(process.execPath),'node');'darwin'!==process.platform&&(c+='.exe'),l=h.fork(i,['--expose-gc'],{execPath:c,stdio:['pipe','pipe','pipe','ipc'],env:{START_SERVER:'yes'}}),l.stdout.setEncoding('utf8'),l.stdout.on('data',(a)=>{console.log('stdout: '+a)}),l.stderr.on('data',(a)=>{console.log('stderr: '+a)});const d=l,e=(...a)=>{if(l===d)try{b()}catch(a){console.error('stop child process error',a)}};l.on('disconnect',e),l.on('close',e),l.on('exit',(a)=>{e(a)}),l.on('error',(...a)=>{e(...a),console.warn('child process encountered an error',...a)}),l.on('message',(b)=>{'object'==typeof b?a(l,b):console.warn('unrecognized msg from cp',b)})}async function d(){return l&&!l.killed?(clearTimeout(o),o=void 0,Promise.resolve()):new Promise((a,b)=>{if(!l||l.killed)try{c()}catch(a){b(a)}m.push([a,b])})}function e(a=12){const b='=-_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'+Date.now();let c='';for(let d=0;d<a;d++){const a=Math.floor(Math.random()*b.length);c+=b.substring(a,a+1)}return c}function f(a,b){if(!l||l.killed)return!1;n[a.id]=a;try{l.send(a,(c)=>{c&&(delete n[a.id],b&&b(c))})}catch(a){return console.error(a),!1}return!0}const g=require('path'),h=require('child_process'),{fileName:i,dirName:j}=require('./aab36a6b9ac5fdff1d9b42f1bccd6cb7.js');let k,l=null,m=[];const n={};let o;module.exports={start:d,stop:function(a=!1){return!l||l.killed?void 0:a?void b():void(void 0!=o||(o=setTimeout(()=>{b()},5e3)))},runTask:async function(a){return new Promise(async(b,c)=>{if(!a)return console.warn('invalid task param',a),c();await d();const g=a.id||`${e()}`,h={type:'task',id:g,body:a.body,path:a.path,headers:_extends({},a.headers||{}),query:_extends({},a.query||{})},i=f(h,c);return i?void(h.resolve=b,h.reject=c,n[h.id]=h):c('send task failed')})},getCh(){return l},getTasksMap(){return n}}}(require('lazyload'),require);