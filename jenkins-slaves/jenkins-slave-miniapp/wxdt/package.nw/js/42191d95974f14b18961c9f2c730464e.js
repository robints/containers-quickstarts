'use strict';var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};!function(require,directRequire){const a=require('fs'),b=require('path'),c=require('./common/locales/index.js'),d=require('./9fdd4ac31a05c27355910f0d74accd4c.js'),e=require('./84b183688a46c9e2626d3e6f83365e13.js'),f={},g=(a)=>Object.prototype.toString.call(a).toLowerCase().slice(8,-1),h=(a='')=>{return a?(a=e.normalizePath(a+'/'),a.replace(/\.\.\//g,'').replace(/^\//,'').replace(/^\.\//,'')):a},i=['svr','client','qcloudRoot','miniprogramRoot','pluginRoot','cloudfunctionRoot','jsserverRoot'];f.configFileExists=(c)=>{if(!c)return{error:new Error('project not valid')};const d={error:null},e=b.join(c.projectpath,'project.config.json');try{const b=a.existsSync(e);d.exists=b}catch(a){d.error=a}return d},f.getConfigFileInfo=(c)=>{if(!c)return{error:new Error('project not valid')};const d={error:null},e=b.join(c.projectpath,'project.config.json');try{let b,j,k;try{j=a.readFileSync(e)}catch(a){b=a;const d=f.configFileExists(c);throw b.type=d.error||d.exists?'readerror':'notexists',a}try{k=JSON.parse(j)}catch(a){throw b=a,a.type='parseerror',a}if('object'!==g(k))throw b=new Error('config is not an object'),b.type='parseerror',b;d.raw=j,k.condiction=k.condition,delete k.condition,d.config=k,'miniprogram'==d.config.compileType&&(d.config.compileType='weapp'),d.config.condiction&&d.config.condiction.miniprogram&&(d.config.condiction.weapp=d.config.condiction.miniprogram,delete d.config.condiction.miniprogram),d.config.setting&&!1===d.config.setting.newFeature||(d.config.setting=_extends({},d.config.setting,{newFeature:!0})),i.forEach((a)=>{'string'==typeof d.config[a]&&(d.config[a]=h(d.config[a]))})}catch(a){d.error=a}return d},f.writeObjectToConfigFile=(c,d)=>{if(!c)return{error:new Error('project not valid')};if('object'!==g(d))return{error:new Error('content is not an object')};const f={error:null},e=b.join(c.projectpath,'project.config.json');try{d=_extends({},d),d.condition=_extends({},d.condiction),delete d.condiction,'weapp'==d.compileType&&(d.compileType='miniprogram'),d.condition&&d.condition.weapp&&(d.condition.miniprogram=d.condition.weapp,delete d.condition.weapp),c.isGameTourist&&(d.isGameTourist=!0),i.forEach((a)=>{'string'==typeof d[a]&&d[a]?d[a]=h(d[a]):delete d[a]});const b=JSON.stringify(d,null,'\t');a.writeFileSync(e,b)}catch(a){a.type='writeerror',f.error=a}return f},f.generateConfigTemplate=()=>({description:c.config.PROJECT_CONFIGURATION_FILE,packOptions:{ignore:[]}}),module.exports=f}(require('lazyload'),require);