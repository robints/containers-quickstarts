;!function(require, directRequire){;'use strict';const Setting=require('./bc5fc398d41609901fe7046a373431bf.js'),simulatorActions=require('./ba23d8b47b1f4ea08b9fd49939b9443f.js'),tools=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),{connect}=require('react-redux'),mapStateToProps=(a)=>{const b=a.simulator.setting,c=a.toolbar.deviceInfo,d=a.simulator.orientation&&/^landscape(Left|Right)?$/.test(a.simulator.orientation.value);return Object.assign({},b,{navigationbarHeight:c.navigationbarHeight,screenWidth:d?c.screenHeight:c.screenWidth,screenHeight:d?c.screenWidth:c.screenHeight,appName:a.project.current.runtimeAttr&&a.project.current.runtimeAttr.appName,deviceScale:a.toolbar.deviceScale})},mapDispatchToProps=(a)=>({hideSetting:tools.bindActionCreators(simulatorActions.hideSetting,a)});module.exports=connect(mapStateToProps,mapDispatchToProps)(Setting);
;}(require("lazyload"), require);
