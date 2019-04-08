;!function(require, directRequire){;"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const React=require("react"),cssConfig=require('./3b5f8e2469c474c8d433c1c6926d8999.js');class Toast extends React.Component{constructor(a){super(a),this.state={lazyLoaded:a.show}}componentWillReceiveProps(a){a.show!==this.props.show&&a.show&&this.setState({lazyLoaded:!0})}renderPlainTextToast(){return React.createElement("div",{style:this.props.show?{}:cssConfig.displayNone},React.createElement("div",{className:"weui-mask_transparent",style:this.props.mask?{}:cssConfig.displayNone},React.createElement("span",null,"\xA0")),React.createElement("div",{className:"weui-simple-toast",style:{pointerEvents:"none"}},React.createElement("p",{className:"weui-simple-toast__text",style:{maxWidth:0.8*(this.props.deviceScale*this.props.screenWidth)}},this.props.title)))}render(){if(!this.state.lazyLoaded)return null;if(!this.props.image&&!this.props.icon)return this.renderPlainTextToast();let a=null;if(this.props.image)a=React.createElement("img",{className:"weui-toast__icon",src:this.props.image});else{let b="weui-icon_toast ";b+="loading"===this.props.icon?"weui-loading":"weui-icon-success-no-circle",a=React.createElement("i",{className:b})}return React.createElement("div",{style:this.props.show?{}:cssConfig.displayNone},React.createElement("div",{className:"weui-mask_transparent",style:this.props.mask?{}:cssConfig.displayNone},React.createElement("span",null,"\xA0")),React.createElement("div",{className:"weui-toast",style:{top:"50%",marginTop:-48}},a,React.createElement("p",{className:"weui-toast__content"},this.props.title)))}}module.exports=Toast;
;}(require("lazyload"), require);
