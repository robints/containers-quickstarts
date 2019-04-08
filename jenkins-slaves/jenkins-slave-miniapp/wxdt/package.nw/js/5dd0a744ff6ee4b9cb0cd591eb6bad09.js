;!function(require, directRequire){;'use strict';const actionsConfig=require('./0634ee2ebd3e560d9d4804ecc960160f.js'),request=require('./15ba1827c7f6564a45df6bd44da3a977.js'),store=require('./bc78839ccca8df9e5ceeb7fae11b7be2.js'),log=require('./72653d4b93cdd7443296229431a7aa9a.js'),key='JMRBZ-R4HCD-X674O-PXLN4-B7CLH-42BSB',referer='wxdevtools',ipURL='http://apis.map.qq.com/ws/location/v1/ip';let geoInfo;const MIN_POSITIONING_INDICATOR_DURATION=3e3;let positioningTimer,previousIsPositioning=!1;async function geolocation(){const a=store.getState(),b=Object.assign({},a.settings.geo);if(b.enabled)return delete b.enabled,Object.assign({},b);if(geoInfo)return Object.assign({},geoInfo);try{const{body:a}=await request({url:`${ipURL}?key=${key}`,needToken:-1,needAppID:-1,needCheckErrCode:-1});if(0===a.status){const b=a.result.location;return geoInfo={latitude:b.lat,longitude:b.lng,speed:b.hasOwnProperty('speed')?b.speed:-1,accuracy:b.hasOwnProperty('accuracy')?b.accuracy:65,altitude:b.hasOwnProperty('altitude')?b.altitude:0,verticalAccuracy:b.hasOwnProperty('verticalAccuracy')?b.verticalAccuracy:65,horizontalAccuracy:b.hasOwnProperty('horizontalAccuracy')?b.horizontalAccuracy:65},Object.assign({},geoInfo)}log.error(`geolocation qqmap api return ${JSON.stringify(a)}`)}catch(a){log.error(`geolocation catch error ${a}`)}return{latitude:23.129163,longitude:113.264435,speed:-1,accuracy:65,altitude:0,verticalAccuracy:65,horizontalAccuracy:65}}function setPositioning(a){a?(clearTimeout(positioningTimer),store.dispatch({type:actionsConfig.SIMULATOR_SET_NAVIGATION_BAR,data:{showPositioning:!0}}),previousIsPositioning=!0):!0==previousIsPositioning&&(positioningTimer=setTimeout(()=>{store.dispatch({type:actionsConfig.SIMULATOR_SET_NAVIGATION_BAR,data:{showPositioning:!1}}),previousIsPositioning=!1,positioningTimer=!1},MIN_POSITIONING_INDICATOR_DURATION))}async function geolocationWithPositioningIndicator(){setPositioning(!0);try{const a=await geolocation();return setPositioning(!1),a}catch(a){throw setPositioning(!1),a}}module.exports=geolocationWithPositioningIndicator;
;}(require("lazyload"), require);
