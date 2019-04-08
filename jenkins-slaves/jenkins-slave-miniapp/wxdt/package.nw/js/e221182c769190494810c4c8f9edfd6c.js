'use strict';var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};!function(require,directRequire){const a=require('path'),b=require('fs'),c=require('lodash'),{REHYDRATE:d}=require('redux-persist/constants'),e=require('./0634ee2ebd3e560d9d4804ecc960160f.js'),f=require('./84858de8a097c9cf84ff2c2e3d86e2a9.js'),g=require('./72653d4b93cdd7443296229431a7aa9a.js'),h=require('./6242f55dbdfe53c2f07b7a51568311f2.js'),i=require('./92320c1386e6db6a6f2556736a9bc280.js'),j=require('./d28a711224425b00101635efe1034c99.js'),k=require('./56c390e04c10e91a4aa2a2c19d9a885d.js'),l=require('./9fdd4ac31a05c27355910f0d74accd4c.js'),m=require('./881e653f19d837f2408386047cb8c38c.js'),n=require('./f7f00c29d59ec60edc211efe68c159c4.js'),{default_weapp_header:o}=require('./5498e660c05c574f739a28bd5d202cfa.js'),p=(a)=>{const b=a?f.getTcb(a)||{}:{};return _extends({envList:[],currentEnv:{},functionData:{},command:{},scfMapInEnv:{},fileMapInEnv:{}},b)},q=(a)=>{a.attr===void 0&&(a.attr={}),a.runtimeAttr===void 0&&(a.runtimeAttr={}),a.condiction===void 0&&(a.condiction={weapp:{current:-1,list:[]},search:{current:-1,list:[]},conversation:{current:-1,list:[]}}),a.condiction.game===void 0&&(a.condiction.game={current:-1,list:[]}),a.condiction.plugin===void 0&&(a.condiction.plugin={current:-1,list:[]}),a.compileType===void 0&&(a.compileType='weapp'),a.setting===void 0&&(a.setting={urlCheck:!0,es6:!0,postcss:!0,minified:!0}),a.scripts===void 0&&(a.scripts={}),a.appid&&(a.tcb=p(a.appid)||{})},r=()=>{let a,b=f.lastSelect;return b=global.isDevWindow?'miniprogram'===global.devType?global.devInfo.projectid:k.MAIN_WINDOW_TYPE.WEB_DEBUGGER:null,f.projectList[b]?(a=f.projectList[b],a&&a.qcloud&&delete a.qcloud,q(a),a.storage={},a.libVersion=j.setVersion(a.libVersion)):b===k.MAIN_WINDOW_TYPE.WEB_DEBUGGER?a=null:global.isDevWindow&&(global.devInfo.isTemp?a=global.devInfo.project:(console.error(global.devInfo),m.notifyCloseWindow(!0))),{current:a,list:f.projectList}};module.exports=function(h=r(),m={}){switch(m.type){case e.PROJECT_SET_PROJECT_CONFIG:return _extends({},h,{current:_extends({},h.current,m.data)});case e.PROJECT_CREATE_PROJECT_SUCCESS:return _extends({},h,{list:_extends({},h.list,{[m.project.projectid]:m.project})});case e.PROJECT_UPDATE_LIST:return _extends({},h,{list:m.list});case e.PROJECT_MERGE_RUMTIME_ATTR:return _extends({},h,{current:_extends({},h.current,{runtimeAttr:_extends({},h.current.runtimeAttr,m.data)})});case e.PROJECT_SET_RUMTIME_ATTR:return _extends({},h,{current:_extends({},h.current,{runtimeAttr:_extends({isExtAppId:m.data.appid!==h.current.appid},m.data)})});case e.PROJECT_UPDATE_ATTR:{const a=m.data,b=_extends({},h.current,{attr:_extends({},h.current.attr,a)});return a.gameApp&&b.compileType!=l.conversation&&b.compileType!=l.search&&(b.compileType=l.game),b.runtimeAttr&&b.runtimeAttr.appid===m.data.appid&&(b.runtimeAttr=_extends({},b.runtimeAttr,m.data)),_extends({},h,{current:b})}case e.PROJECT_OPEN_PROJECT:{const a=h.list[m.projectid];if(!a)return g.error(`project.reducer.js trying open a project with unknown projectid: ${m.projectid}`),h;return a.qcloud&&delete a.qcloud,q(a),a.libVersion=j.setVersion(a.libVersion),_extends({},h,{current:a})}case e.PROJECT_OPEN_TEMP_PROJECT:return _extends({},h,{current:m.project,list:_extends({},h.list,{[m.project.projectid]:m.project})});case e.PROJECT_SET_COMPILE_CONDICTION:{const a=h.current.compileType,b=h.current.condiction[a]||{},c=[].concat(b.list||[]),d=-1==m.data.id?c.length:m.data.id;return c[d]=_extends({},m.data),_extends({},h,{current:_extends({},h.current,{condiction:_extends({},h.current.condiction,{[a]:{current:d,list:c}})})})}case e.PROJECT_SELECT_COMPILE_CONDICTION:{const a=h.current.compileType,b=h.current.condiction[a]||{};return _extends({},h,{current:_extends({},h.current,{condiction:_extends({},h.current.condiction,{[a]:_extends({},b,{current:m.current})})})})}case e.PROJECT_REMOVE_COMPILE_CONDICTION:{const a=m.data.id,b=h.current.compileType,c=h.current.condiction[b]||{},d=[].concat(c.list||[]);return d.splice(a,1),_extends({},h,{current:_extends({},h.current,{condiction:_extends({},h.current.condiction,{[b]:{current:-1,list:d}})})})}case e.PROJECT_CHANGE_APPID:{m.data;return _extends({},h,{current:_extends({},h.current,{appid:m.data.appid,projectid:m.data.projectid,isTourist:m.data.appid===k.TOURIST_APPID,isGameTourist:m.data.appid===k.GAME_TOURIST_APPID,attr:{},tcb:p()}),list:f.projectList})}case e.PROJECT_SET_SETTING:return _extends({},h,{current:_extends({},h.current,{setting:_extends({},h.current.setting,m.data)})});case e.PROJECT_SET_LIBVERSION:return _extends({},h,{current:_extends({},h.current,{libVersion:m.data})});case e.PROJECT_SET_STORAGE:{const c=m.data.openid,d=m.data.cache,e=`storage_${h.current.hash}_${c}`;try{const c=a.join(i.WeappStorage,`${e}.json`);b.writeFileSync(c,JSON.stringify(d),'utf8')}catch(a){return h}return _extends({},h,{current:_extends({},h.current,{storage:{openid:c,cache:d}})})}case e.PROJECT_SET_COMPILE_TYPE:return _extends({},h,{current:_extends({},h.current,{compileType:m.data})});case e.PROJECT_SET_QCLOUD:{const a=h.current.qcloud||{};return _extends({},h,{current:_extends({},h.current,{qcloud:_extends({},a,m.data)})})}case e.PROJECT_SET_PKG_SIZE:{let a=h.current.pkgSize||{};return a=_extends({},a,m.data),_extends({},h,{current:_extends({},h.current,{pkgSize:a})})}case e.PROJECT_SET_PLUGIN_INFO:return _extends({},h,{current:_extends({},h.current,{pluginInfo:m.data||[]})});case e.PROJECT_CLOSE_PROJECT:return _extends({},h,{current:null});case e.PROJECT_REMOVE_PROJECT:{const a={};return h.current&&h.current.id===m.id&&(a.current=null),a.list=_extends({},h.list),delete a.list[m.id],_extends({},h,a)}case e.PROJECT_SET_UPLOAD_INFO:return _extends({},h,{current:_extends({},h.current,{uploadInfo:_extends({},h.current.uploadInfo,m.data)})});case e.PROJECT_SET_SHARE_INFO:return _extends({},h,{current:_extends({},h.current,{shareInfo:_extends({},h.current.shareInfo,m.data)})});case e.PROJECT_SYNC_STORE:{const a=_extends({},h,{syncTime:m.syncTime});return m.data.project&&m.data.project.list&&(a.list=m.data.project.list),a}case e.PROJECT_SET_SCRIPTS:return _extends({},h,{current:_extends({},h.current,{scripts:_extends({},h.current.scripts,m.data)})});case e.PROJECT_SET_TCBFN_ROOT:return _extends({},h,{current:_extends({},h.current,{cloudfunctionRoot:m.data})});case e.PROJECT_SET_TIME_RECORDS:return _extends({},h,{current:_extends({},h.current,{timeRecords:_extends({},h.current.timeRecords,m.data)})});case d:return c.merge(c.cloneDeep(h),m.payload.project);default:{if(h.current){const a=n(h.current.tcb,m);if(h.current.tcb!==a)return f.setTcb(h.current.appid,a),_extends({},h,{current:_extends({},h.current,{tcb:a})})}return h}}}}(require('lazyload'),require);