'use strict';var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};!function(require,directRequire){function a(){return{show:!1,tree:{"/":{isOpen:!0,isDir:!0,path:'/',name:'',children:[]}},currentPath:'',contextMenu:{show:!1,path:''},confirmInfo:{show:!1,type:'error',title:'',content:'',showConfirm:!0,showCancel:!0,confirmText:e.config.CONFIRM,cancelText:e.config.CANCEL,callback:null}}}const b=require('path'),c=require('./0634ee2ebd3e560d9d4804ecc960160f.js'),{REHYDRATE:d}=require('redux-persist/constants'),e=require('./common/locales/index.js'),f=(a,b)=>{const c=b[a];c&&(delete b[a],c.children&&0<c.children.length&&c.children.forEach((a)=>{f(a,b)}))};module.exports=function(e=a(),g){switch(g.type){case c.COS_SET_WND:return _extends({},e,{show:g.data});case c.COS_SET_CURRENT:return _extends({},e,{currentPath:g.data.path});case c.COS_SET_DIR:{const a=e.tree[g.data.path];return a?_extends({},e,{tree:_extends({},e.tree,{[g.data.path]:_extends({},a,{isOpen:g.data.isOpen})})}):e}case c.COS_SET_TREE:{const a=_extends({},e.tree);let c=a[g.data.path];if(!c){const a=/\/$/.test(g.data.path);c={isDir:a,isOpen:!a,name:b.basename(g.data.path),path:g.data.path,children:[]}}else c.children=[];return g.data.children.forEach((b)=>{a[b.path]=b,c.children.push(b.path)}),_extends({},e,{tree:a})}case c.COS_CUT_TREE:{const a=_extends({},e.tree),b=a[g.data.path];if(!b)return e;return f(g.data.path,a),_extends({},e,{tree:a})}case c.COS_SET_CONTEXT_MENU:return _extends({},e,{contextMenu:_extends({},g.data)});case c.COS_SET_CONFIRM:return _extends({},e,{confirmInfo:_extends({},e.confirmInfo,{callback:null},g.data)});case d:return e;default:return e;}}}(require('lazyload'),require);