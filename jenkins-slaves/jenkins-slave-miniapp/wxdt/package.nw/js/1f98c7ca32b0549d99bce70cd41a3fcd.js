;!function(require, directRequire){;"use strict";const React=require("react"),{connect}=require("react-redux"),ToolbarItem=require('./aa9fff323e28f4dcd42f368a90ea14e6.js'),clickKeyConfig=require('./eadce02c750c875a10680bcfedadec88.js'),DeviceScaleDropdown=require('./7c2dbbb98877b7bbfb1d9a8ea6b5c77c.js'),scaleList=[{name:"100%",value:1},{name:"85%",value:0.85},{name:"75%",value:0.75},{name:"50%",value:0.5}],mapStateToProps=(a)=>{const b=a.toolbar.deviceScale;let c=-1;return scaleList.forEach((a,d)=>{a.value===b&&(c=d)}),{show:a.toolbar.clickKey===clickKeyConfig.DEVICESCALE,list:scaleList,currentWording:`${100*b}%`,current:c,width:120,left:109,top:27}},mapDispatchToProps=()=>({});class DeviceScaleToolbarItem extends React.Component{constructor(a){super(a),this.onShowClick=()=>{this.setState({showTs:Date.now()})},this.state={showTs:0}}render(){return React.createElement(ToolbarItem,{show:this.props.show,currentWording:this.props.currentWording,onShowClick:this.onShowClick,dropdown:DeviceScaleDropdown,dropdownType:"devicescale",showTs:this.state.showTs})}}module.exports=connect(mapStateToProps,mapDispatchToProps)(DeviceScaleToolbarItem);
;}(require("lazyload"), require);
