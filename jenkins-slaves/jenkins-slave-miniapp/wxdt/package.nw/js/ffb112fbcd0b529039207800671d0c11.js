'use strict';!function(require,directRequire){const a=require('react'),b=require('./3b5f8e2469c474c8d433c1c6926d8999.js'),c=require('./96d3b98316cc3b862ff8c1fb7b774523.js'),d=require('./61d465dffe15c4b10a5f105010cc52c3.js');class e extends a.Component{constructor(a){super(a),this.state={lazyLoaded:!1}}componentWillReceiveProps(a){('addcard'==a.show||'viewcard'==a.show)&&this.setState({lazyLoaded:!0})}hideCardView(a){this.props.hideCardView({callbackID:this.props.callbackID,res:a})}batchAddCard(){const a=this.props,b=a.args,c=b.cardList||[],d=[];for(let a=0;a<c.length;a++){const b=c[a];d.push({card_id:b.card_id,card_ext:b.card_ext,is_succ:1})}this.props.batchAddCard({callbackID:a.callbackID,list:d})}render(){if(!this.state.lazyLoaded)return null;const b=this.props;return a.createElement('div',{className:'webview-card'},a.createElement(c,{width:b.width,height:b.height,cardInfo:b.cardInfo,args:b.args,show:'addcard'==b.show,batchAddCard:this.batchAddCard.bind(this),hideCardView:this.hideCardView.bind(this)}),a.createElement(d,{width:b.width,height:b.height,cardInfo:b.cardInfo,errData:b.errData,show:'viewcard'==b.show,hideCardView:this.hideCardView.bind(this)}))}}module.exports=e}(require('lazyload'),require);