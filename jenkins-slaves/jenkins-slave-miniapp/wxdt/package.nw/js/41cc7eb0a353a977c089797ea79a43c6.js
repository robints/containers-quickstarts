'use strict';!function(require,directRequire){const a=require('react'),b=require('./3c55dff3626a3ee184d599f076158345.js'),{connect:c}=require('react-redux');class d extends a.Component{constructor(a){super(a)}onSelectClick(a,b){b.stopPropagation(),this.props.onSelectClick&&this.props.onSelectClick(a)}onMouseEnter(a,b){this.props.onMouseEnter&&this.props.onMouseEnter(a,b)}onMouseLeave(a,b){this.props.onMouseLeave&&this.props.onMouseLeave(a,b)}render(){return a.createElement(b,{show:this.props.show,id:this.props.id+'-popup',list:this.props.list,left:this.props.left,top:this.props.top,rightArrow:!0,onMouseEnter:this.onMouseEnter.bind(this),onMouseLeave:this.onMouseLeave.bind(this),subDropdowns:this.props.subDropdowns})}}module.exports=d}(require('lazyload'),require);