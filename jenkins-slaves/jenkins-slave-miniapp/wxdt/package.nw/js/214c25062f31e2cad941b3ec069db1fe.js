'use strict';!function(require,directRequire){const a=require('./ff946754202ecf377034d29daac7c8d9.js'),b=require('./72653d4b93cdd7443296229431a7aa9a.js');module.exports=class{constructor(b){this.protocol=b,this.ready=!1,this._callback=[],this._messagerCenter=a,this._onMessage=this.onMessage.bind(this),a.on(b,this._onMessage)}onMessage(a){const c=this._callback;if(0<c.length){try{a=JSON.parse(a)}catch(c){return void b.error(`${this.protocol} onMessage "${a}" catch error ${c}`)}c.forEach((b)=>{b(a)})}}send(b){this.ready&&a.sendMessage(this.protocol,JSON.stringify(b))}transfer(b,c){a.sendMessage(b,JSON.stringify(c))}broadcast(b,c){a.broadcast(b,JSON.stringify(c))}register(a){'function'==typeof a&&this._callback.push(a)}unRegister(a){const b=this._callback.filter((b)=>b!==a);return this._callback=b||[],!0}}}(require('lazyload'),require);