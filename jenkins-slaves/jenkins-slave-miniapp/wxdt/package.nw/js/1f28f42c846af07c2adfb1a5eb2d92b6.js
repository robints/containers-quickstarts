'use strict';!function(require,directRequire){function a(a,b){return'string'==typeof a?a.startsWith(b)?a:b+a:a}function b(b,h={}){const k=b.setting.postcss,{srcFilePath:l,fileBuffer:p,destFilePath:q}=h;let r=m(p);if(void 0===r){const a=new Error(i.config.FILE_NOT_UTF8.format(l));throw a.code=n,a}if(k)try{r=g([f({browsers:j,remove:!1})]).process(r,{from:a(l,'/')}).css}catch(a){const b=new Error(a.message);throw b.code=o,b.parseError=a.parseError,b}const s=d.dirname(q);e.sync(s),c.writeFileSync(q,r)}const c=require('fs'),d=require('path'),e=require('mkdir-p'),f=require('autoprefixer'),g=require('postcss'),h=require('./162bf2ee28b76d3b3d95b685cede4146.js'),i=require('./common/locales/index.js'),j=['iOS >= 8','Chrome >= 37'],k=require('./a63026ab5a5a3c59a61a9749a18aa2ca.js'),l=require('./9fdd4ac31a05c27355910f0d74accd4c.js'),{bufToUTF8:m}=require('./efc820e1b92d6e4063535296d4a24213.js'),{FILE_NOT_UTF8:n,POST_WXSS_ERR:o}=require('./949d8235c744ced2a80121e4dba34c28.js');module.exports=async function(a,c={}){const e=a.compileType,{distPath:f}=c;let g=await h(a),j=g.getAllWXSSFiles(),m=e==l.plugin?a.miniprogramRoot:'';for(let e=0,h=j.length;e<h;e++){const c=j[e],h=g.getFile(c,null);b(a,{fileBuffer:h,srcFilePath:d.join(m,c),destFilePath:d.join(f,m,c)})}if(l.plugin==e){g=await k(a),j=g.getAllWXSSFiles(),m=a.pluginRoot;for(let c=0,e=j.length;c<e;c++){const e=j[c],h=g.getFile(e,null);b(a,{fileBuffer:h,srcFilePath:d.join(m,e),destFilePath:d.join(f,m,e)})}}}}(require('lazyload'),require);