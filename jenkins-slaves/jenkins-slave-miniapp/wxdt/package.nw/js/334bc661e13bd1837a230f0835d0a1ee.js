;!function(require, directRequire){;'use strict';const checkAppConfig=require('./1dea83a77e99a7c94f6b6f01f5c175b0.js'),checkCustomComponent=require('./6b5520e429c60abf5d2f924c0fa05fd0.js'),checkWxAppCodeJSON=require('./e2bb00408a93b45ef5e6ad32f05e850c.js'),compileCache=require('./2e9637e8a0816a626f7db9a0dee5efe8.js'),topTools=require('./84b183688a46c9e2626d3e6f83365e13.js');async function getWxAppCode(a){await compileCache.init(a);const b=compileCache.CACHE_KEYS.JSON_WXAPPCODE_APPSERVICE;let c=compileCache.get(b);if(c)return c;const d=await checkAppConfig(a),e=await checkCustomComponent.getFileList(a,d),f=[];for(let b=0,c=e.length;b<c;b++){const c=e[b],d=encodeURI(c),g=await checkWxAppCodeJSON(a,c);f.push(`var decodePathName = decodeURI("${d}")`),f.push(`__wxAppCode__[decodePathName + ".json"]=${JSON.stringify(g)}`),f.push(`__wxAppCode__[decodePathName + ".wxml"]=$gwx("./" + decodePathName + ".wxml")`)}return c=topTools.escapeScript(f.join('\n')),compileCache.set(b,c),c}module.exports=getWxAppCode;
;}(require("lazyload"), require);
