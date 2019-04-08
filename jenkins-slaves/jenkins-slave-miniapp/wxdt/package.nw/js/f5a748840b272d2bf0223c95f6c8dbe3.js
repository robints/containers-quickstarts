;!function(require, directRequire){;"use strict";const URL=require("url"),fs=require("fs"),path=require("path"),mkdir=require("mkdir-p"),dirConfig=require('./92320c1386e6db6a6f2556736a9bc280.js'),weappConfig=require('./6242f55dbdfe53c2f07b7a51568311f2.js'),C=require('./56c390e04c10e91a4aa2a2c19d9a885d.js'),tools=require('./84b183688a46c9e2626d3e6f83365e13.js'),log=require('./72653d4b93cdd7443296229431a7aa9a.js'),messageCenter=require('./ff946754202ecf377034d29daac7c8d9.js'),idePluginRoot=global.appConfig.isDev?path.join(__dirname,"../../ideplugin"):path.join(__dirname,"./ideplugin"),vendorPluginRoot=dirConfig.WeappPlugin,validate=require('./2ce36a45c4a6878a5cb6a264c3eb2433.js'),manifestCache={};let cache={};async function getFile(a,b){const c=manifestCache[a];if(!c)throw new Error(`cannot found ${a} manifest.json`);cache[a]||(cache[a]={});let d=cache[a][b];if(!d||c.nocache||global.appConfig.isDev){const c=path.join(vendorPluginRoot,a,b);if(!fs.existsSync(c)||global.appConfig.isDev){if(!fs.existsSync(path.join(idePluginRoot,a,b)))throw new Error(`${a} ${b} not found`);d=fs.readFileSync(path.join(idePluginRoot,a,b)),mkdir.sync(path.dirname(c)),fs.writeFileSync(c,d)}else d=fs.readFileSync(c);cache[a][b]=d}return d}function getManifest(a){let b=manifestCache[a];if(!b){const c=path.join(vendorPluginRoot,a,"manifest.json");if(!fs.existsSync(c)){if(!fs.existsSync(path.join(idePluginRoot,a,"manifest.json")))throw new Error(`cannot found ${a} manifest.json`);const d=fs.readFileSync(path.join(idePluginRoot,a,"manifest.json"),"utf8");mkdir.sync(path.dirname(c)),fs.writeFileSync(c,d,"utf8"),b=JSON.parse(d)}else b=JSON.parse(fs.readFileSync(c,"utf8"));validate.check(b),manifestCache[a]=b}return b}function isWhitelistURL(a,b){for(let c=0,d=b.length;c<d;c++){const d=b[c];if("<all_urls>"===d||0===a.indexOf(d))return!0}return!1}function initPlugin(a,b){const c=getManifest(a),d=b.request;d.onBeforeRequest.addListener(function(b){const{url:d,type:e}=b,f=URL.parse(d);if(0===d.indexOf(`http://127.0.0.1:${global.proxyPort}/`))return{};if(weappConfig.weappPluginServiceRegular.test(d))return{};if("image"===e&&c.permission&&c.permission.image&&isWhitelistURL(d,c.permission.image))return{};if("script"===e||"stylesheet"===e||"image"===e)return{redirectUrl:`http://127.0.0.1:${global.proxyPort}/ideplugin/${a}${f.pathname}`};if("xmlhttprequest"===e){let a=!0;if(c.permission&&c.permission.xmlhttprequest)for(let b=0,e=c.permission.xmlhttprequest.length;b<e;b++){const e=c.permission.xmlhttprequest[b];if("<all_urls>"===e||0===d.indexOf(e)){a=!1;break}}if(a)return{cancel:!0}}return{}},{urls:["<all_urls>"]},["blocking"]),d.onBeforeSendHeaders.addListener(function(a){const b=a.url;if(0===b.indexOf(`http://127.0.0.1:${global.proxyPort}/`))return{};const d=a.requestHeaders||[];for(const b of d){const a=b.name.toLowerCase(),d=b.value;"referer"===a?b.value=c.origin||d:"origin"===a&&(b.value=c.origin||d)}return{requestHeaders:a.requestHeaders}},{urls:["<all_urls>"]},["blocking","requestHeaders"]),c.permission&&(b.addEventListener("permissionrequest",function(a){if("download"===a.permission){if(c.permission.download)for(let b=0,d=c.permission.download.length;b<d;b++){const d=c.permission.download[b];if("<all_urls>"===d||0===a.request.url.indexOf(d))return void a.request.allow()}a.request.deny()}}),b.addEventListener("newwindow",function(a){if(c.permission.newwindow)for(let b=0,d=c.permission.newwindow.length;b<d;b++){const d=c.permission.newwindow[b];if(0===a.targetUrl.indexOf(d))return void nw.Shell.openExternal(a.targetUrl)}})),b.addEventListener("dialog",(a)=>{const b=a.messageType||"",c=a.messageText;"prompt"===b&&c===C.GET_MESSAGE_TOKEN&&a.dialog.ok(messageCenter.getToken("PLUGIN"))})}function formatManifestPath(a,b){if(!b.devtools&&b.main&&0===b.main.indexOf("./")){const c=path.relative(path.join(vendorPluginRoot,a),path.join(vendorPluginRoot,a,b.main));b.main=`http://127.0.0.1:${global.proxyPort}/ideplugin/${a}/${c}`}if(!b.toolbar&&b.toolbar_icon&&0===b.toolbar_icon.indexOf("./")){const c=path.relative(path.join(vendorPluginRoot,a),path.join(vendorPluginRoot,a,b.main));b.toolbar_icon=`http://127.0.0.1:${global.proxyPort}/ideplugin/${a}/${c}`}return b}function getInstalledPluginManifest(){const a=fs.readdirSync(vendorPluginRoot);a.forEach((a)=>{try{const b=path.join(vendorPluginRoot,a,"manifest.json");if(fs.existsSync(b)){let c=JSON.parse(fs.readFileSync(b,"utf8"));validate.check(c),c=formatManifestPath(a,c),manifestCache[a]=c}}catch(b){log.error(`initInstalledPlugins get vendorplugin ${a}'s manifest.json error: ${b}`)}});const b=fs.readdirSync(idePluginRoot);return b.forEach((a)=>{try{const b=path.join(idePluginRoot,a,"manifest.json");if(fs.existsSync(b)){let c=JSON.parse(fs.readFileSync(b,"utf8"));validate.check(c);const d=manifestCache[a];if(d&&1!==validate.compareVersion(c.version,d.version)&&!global.appConfig.isDev)return;tools.cpSync(path.join(idePluginRoot,a),path.join(vendorPluginRoot,a),!0),c=formatManifestPath(a,c),manifestCache[a]=c}}catch(b){log.error(`initInstalledPlugins get ideplugin ${a}'s manifest.json error: ${b}`)}}),manifestCache}async function getDevtoolsManifest(){const a={};for(const b in manifestCache){const c=manifestCache[b];c.devtools&&(a[b]=Object.assign({},c,{main:path.join(`../${b}`,c.main)}))}return`
  document.dispatchEvent(new CustomEvent('manifestReady', {
    detail: ${JSON.stringify(a)}
  }))
`}function cleanFileCache(a){a?cache[a]={}:cache={}}module.exports={getInstalledPluginManifest,initPlugin,getFile,getDevtoolsManifest,cleanFileCache};
;}(require("lazyload"), require);
