'use strict';!function(require,directRequire){const a=require('./e9e3fd38aeedddd6db73d1d015ff6952.js');module.exports={remoteDebugInfo:async function(b,c){const d=c.args,e=a.get('wxml_miniprogram');'DEBUGGEE_CALLBACK'==d.command&&d.callbackID?e.callback(d.callbackID,d.data):'DEBUGGEE_EVENT'==d.command&&e.triggerOnEvent('ON_EVENT',d.data)}}}(require('lazyload'),require);