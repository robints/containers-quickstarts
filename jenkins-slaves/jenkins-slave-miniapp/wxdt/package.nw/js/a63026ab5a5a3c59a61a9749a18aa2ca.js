'use strict';!function(require,directRequire){const a=require('path'),b=require('./60e94018e5c42875e658435ea04a006d.js'),c=require('./common/locales/index.js');module.exports=async function(d){if(!d.pluginRoot)throw new Error(c.config.PROJECT_JSON_VALUE_NO_FOUND.format('pluginRoot'));const e=a.posix.join(d.projectpath,d.pluginRoot);return await b(d.projectpath,e)}}(require('lazyload'),require);