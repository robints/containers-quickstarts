;!function(require, directRequire){;"use strict";const tslib_1=require("tslib"),React=require("react"),toolbarActions=require('./fc137838572a83604db39acff8e909e0.js'),projectActions=require('./cc2c2970ff81ae4a83123e81ee123da2.js'),tools=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),locales=require('./common/locales/index.js'),{connect}=require("react-redux"),mapStateToProps=(a)=>{const b=a.info.projectInfo||{},c=a.project.current||{},d=c.runtimeAttr&&c.runtimeAttr.network||{};return{show:"config"===b.selected,project:c,RequestDomain:d.RequestDomain||[],WsRequestDomain:d.WsRequestDomain||[],UploadDomain:d.UploadDomain||[],DownloadDomain:d.DownloadDomain||[],BizDomain:d.BizDomain||[]}},mapDispatchToProps=(a)=>({toggleClickKey:tools.bindActionCreators(toolbarActions.toggleClickKey,a),setProjectSetting:tools.bindActionCreators(projectActions.setProjectSetting,a)});let ProjectConfig=class extends React.Component{constructor(a){super(a),this.state={lazyLoaded:!!a.show}}componentWillReceiveProps(a){a.show&&this.setState({lazyLoaded:!0})}render(){if(!this.state.lazyLoaded)return null;const a=this.props,b=a.project,c=`tab-content ${a.show?"tab-content-active":""}`;return React.createElement("div",{className:c},React.createElement("section",null,React.createElement("div",{className:"meta-item"},React.createElement("label",{htmlFor:"",className:"meta-label"},"request ",locales.config.VALID_DOMAIN_NAME),React.createElement("div",{className:"meta-value ui-flex-item",style:{userSelect:"initial"}},0===a.RequestDomain.length?React.createElement("div",{className:"ui-flex ui-desc"},React.createElement("p",{className:"ui-flex-item"},locales.config.NOT_SET)):a.RequestDomain.map((a,b)=>React.createElement("div",{className:"ui-flex ui-desc",key:b},React.createElement("p",{className:"ui-flex-item"},a)))))),React.createElement("section",null,React.createElement("div",{className:"meta-item"},React.createElement("label",{htmlFor:"",className:"meta-label"},"socket ",locales.config.VALID_DOMAIN_NAME),React.createElement("div",{className:"meta-value ui-flex-item",style:{userSelect:"initial"}},0===a.WsRequestDomain.length?React.createElement("div",{className:"ui-flex ui-desc"},React.createElement("p",{className:"ui-flex-item"},locales.config.NOT_SET)):a.WsRequestDomain.map((a,b)=>React.createElement("div",{className:"ui-flex ui-desc",key:b},React.createElement("p",{className:"ui-flex-item"},a)))))),React.createElement("section",null,React.createElement("div",{className:"meta-item"},React.createElement("label",{htmlFor:"",className:"meta-label"},"uploadFile ",locales.config.VALID_DOMAIN_NAME),React.createElement("div",{className:"meta-value ui-flex-item",style:{userSelect:"initial"}},0===a.UploadDomain.length?React.createElement("div",{className:"ui-flex ui-desc"},React.createElement("p",{className:"ui-flex-item"},locales.config.NOT_SET)):a.UploadDomain.map((a,b)=>React.createElement("div",{className:"ui-flex ui-desc",key:b},React.createElement("p",{className:"ui-flex-item"},a)))))),React.createElement("section",null,React.createElement("div",{className:"meta-item"},React.createElement("label",{htmlFor:"",className:"meta-label"},"downloadFile ",locales.config.VALID_DOMAIN_NAME),React.createElement("div",{className:"meta-value ui-flex-item",style:{userSelect:"initial"}},0>=a.DownloadDomain.length?React.createElement("div",{className:"ui-flex ui-desc"},React.createElement("p",{className:"ui-flex-item"},locales.config.NOT_SET)):a.DownloadDomain.map((a,b)=>React.createElement("div",{className:"ui-flex ui-desc",key:b},React.createElement("p",{className:"ui-flex-item"},a)))))),React.createElement("section",null,React.createElement("div",{className:"meta-item"},React.createElement("label",{htmlFor:"",className:"meta-label"},"web-view\uFF08",locales.config.BUSINESS_DOMAIN_NAME,"\uFF09"),React.createElement("div",{className:"meta-value ui-flex-item",style:{userSelect:"initial"}},0===a.BizDomain.length?React.createElement("div",{className:"ui-flex ui-desc"},React.createElement("p",{className:"ui-flex-item"},locales.config.NOT_SET)):a.BizDomain.map((a,b)=>React.createElement("div",{className:"ui-flex ui-desc",key:b},React.createElement("p",{className:"ui-flex-item"},a)))))))}};ProjectConfig=tslib_1.__decorate([locales.mixin],ProjectConfig),module.exports=connect(mapStateToProps,mapDispatchToProps)(ProjectConfig);
;}(require("lazyload"), require);
