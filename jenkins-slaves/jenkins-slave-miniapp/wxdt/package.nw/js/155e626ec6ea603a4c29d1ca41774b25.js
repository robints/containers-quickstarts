'use strict';!function(require,directRequire){const a=require('react'),b=require('classnames'),c=require('redux'),d=require('./3b5f8e2469c474c8d433c1c6926d8999.js'),e=require('./656cfe3bf10f8747abd0a90c4d3f0c29.js'),f=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),g=require('./c4190a2430506f3602ca550e1e75d620.js'),{connect:h}=require('react-redux');class i extends a.Component{constructor(a){super(a),this.state={webviewID:a.webviewID,url:a.url}}componentWillReceiveProps(a){a.url!=this.props.url&&this.setState({url:a.url}),a.focusAddress!=this.props.focusAddress&&this.focusAddress()}getAutoComplete(a=''){const b=a.trim(),c=/^http:\/\//.test(b),d=/^https:\/\//.test(b),e=[],f=this.props.autocomplete;return f.forEach((a)=>{4<b.length&&(c||d?!/^https?:\/\//.test(a)&&(a=c?`http://${a}`:`https://${a}`):a=a.replace(/^https?:\/\//,'')),0===a.indexOf(b)&&-1===e.indexOf(a)&&e.push(a)}),e}getCurrentUrl(){return this.state.url}loadUrl(a){a=a||this.getCurrentUrl()||'',a=a.trim();this.state.webviewID;'about:blank'===a?this.props.debuggerActions.setActions('reload'):(this.props.debuggerActions.setAutoComplete(a),this.props.debuggerActions.getA8Key({url:a,isSync:!0,from:'urlbar'})),this.props.debuggerActions.setUrlComplete({show:!1})}focusAddress(){this.refs.urlinput.select(),this.refs.urlinput.focus()}onLocationClick(a){a.stopPropagation();const b=a.currentTarget.getBoundingClientRect();this.props.debuggerActions.setUrlComplete({left:b.left,top:b.top+29,width:b.width})}handleKeyUp(a){const b=a.target,c=a.keyCode,d=this.state.webviewID;if(13===c)b.selectionStart=b.value.length,this.loadUrl();else if(40===c||38===c){let a=this.props.autoIndex,d=this.getCurrentUrl();if(38===c)a--,a=0>=a?0:a;else{const b=this.props.urlcompleteList&&this.props.urlcompleteList.length||0;a++,a=a>=b?b-1:a}d=0<=a?this.props.urlcompleteList[a]:d,this.props.debuggerActions.setUrlComplete({current:a}),this.setState({url:d},()=>{setTimeout(()=>{b.selectionStart=b.value.length},17)})}else 8===c&&(b.dataset.changeFrom='backspace')}handleChange(a){const b=a.target,c=b.value,d='backspace'===b.dataset.changeFrom,e=this.getAutoComplete(c),f=this.state.webviewID;if(d)return b.dataset.changeFrom='',this.setState({url:c}),void this.props.debuggerActions.setUrlComplete({list:e,show:!0});const g=e[0]&&!d?e[0]:c;this.props.debuggerActions.setUrlComplete({list:e,show:!0}),this.setState({url:g},()=>{const a=g.indexOf(c)+c.length;a===g.length||(this.refs.urlinput.selectionStart=a,this.refs.urlinput.selectionEnd=g.length)})}handleFocus(){const a=this.getCurrentUrl();this.setState({focus:!0,url:'about:blank'===this.state.url?'':this.state.url}),this.props.debuggerActions.setUrlComplete({list:this.getAutoComplete(a),show:!0})}handleBlur(){this.setState({focus:!1})}refreshClick(a){a.stopPropagation(),this.loadUrl(),this.props.debuggerActions.setActions('reload')}render(){this.state.webviewID;return a.createElement('div',{className:b('ui-location',{"ui-location-focus":this.state.focus}),onClick:this.onLocationClick.bind(this)},a.createElement('div',{className:'ui-location-input-box'},a.createElement('input',{type:'text',className:'ui-location-input',ref:'urlinput',value:this.state.url,onKeyUp:this.handleKeyUp.bind(this),onBlur:this.handleBlur.bind(this),onFocus:this.handleFocus.bind(this),onChange:this.handleChange.bind(this)})),a.createElement('div',{className:'ui-location-icon',onClick:this.refreshClick.bind(this)},a.createElement('a',null,a.createElement('i',{className:'ui-icon-refresh'}))))}}module.exports=h((a)=>{const b=a.webdebugger||{};let c=b.url||'';c&&c!='html/about.html'&&0!=c.indexOf('chrome-extension:')||(c='about:blank');const d=parseInt(b.urlcomplete.current);return{url:c,autoIndex:isNaN(d)?-1:d,urlcompleteList:b.urlcomplete.list,autocomplete:b.autocomplete,focusAddress:b.act.focusAddress,webviewID:b.currentWebviewID}},(a)=>({debuggerActions:f.bindActionCreators(g,a)}))(i)}(require('lazyload'),require);