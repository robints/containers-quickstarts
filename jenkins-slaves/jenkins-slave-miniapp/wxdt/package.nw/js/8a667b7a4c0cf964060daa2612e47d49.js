;!function(require, directRequire){;'use strict';const locales=require('./common/locales/index.js');function getType(a){return Object.prototype.toString.call(a).toLowerCase().split(' ')[1].replace(']','')}class T{constructor(a,b,c){this.type=a,this.required=b||!1;const d=this.valueType=getType(c);if('undefined'!==d){if(c instanceof T){if('array'!==a&&'object'!==a)throw new Error(`value can be instance of ValidateType only when type is object or array`);return void(this.value=c)}if('array'===d){if('array'===a||'object'===a||'function'===a)throw new Error(`${a} could not have optional value`);for(let b=0,d=c.length;b<d;b++){const d=getType(c[b]);if(d!==a)throw new Error(`value[${b}] should be ${a} instead of ${d}`)}return void(this.value=c)}if('regexp'===d){if('regexp'!==a&&'string'!==a)throw new Error(`${a} could not have regexp value`);return void(this.value=c)}if('object'===d){if('object'!==a)throw new Error(`${a} could not have object value`);for(const a in c)if(!(c[a]instanceof T))throw new Error(`value["${a}"] should be instance of ValidateType`);return void(this.value=c)}if(a!==d)throw new Error(`value should be ${a} instead of ${d}`);this.value=c}}static invalidKeys(a,b){const c=[];if(a instanceof T){try{a.check(b)}catch(a){return}if('object'!==a.type||'object'!==a.valueType||'object'!==getType(b))return;const d=a.value instanceof T;for(const e in b){let f=[];if(!d){if(!a.value.hasOwnProperty(e)){c.push(`["${e}"]`);continue}f=T.invalidKeys(a.value[e],b[e])}else f=T.invalidKeys(a.value,b[e]);f&&f.forEach((a)=>{c.push(`["${e}"]${a}`)})}}else for(const d in b){if(!a.hasOwnProperty(d)){c.push(`["${d}"]`);continue}const e=T.invalidKeys(a[d],b[d]);e&&e.forEach((a)=>{c.push(`["${d}"]${a}`)})}return 0<c.length?c:void 0}check(a){const b=getType(a);if(this.required||'undefined'!==b){if(b!==this.type)throw new Error(locales.config.JSON_CONTENT_SHOULD_BE.format(['',this.type]));const c=this.valueType;if('undefined'!==c){if(this.value instanceof T){if('object'===this.type){for(const b in a)try{this.value.check(a[b])}catch(a){throw new Error(`["${b}"]${a.message}`)}return}if('array'===this.type){if(0===a.length&&this.value.required)throw new Error(locales.config.SHOULD_AT_LEAST_ONE_ITEM.format(''));for(let b=0,c=a.length;b<c;b++)try{this.value.check(a[b])}catch(a){throw new Error(`[${b}]${a.message}`)}return}}if('array'===c){let b=!1;for(const c of this.value)if(c===a){b=!0;break}if(!b)throw new Error(locales.config.JSON_CONTENT_SHOULD_BE.format(['',this.value.join(` ${locales.config.OR} `)]));return}if('object'===c){for(const b in this.value){const c=this.value[b];try{c.check(a[b])}catch(a){throw new Error(`["${b}"]${a.message}`)}}return}if('regexp'===c){if('string'===this.type){if(!this.value.test(a))throw new Error(locales.config.SHOULD_MATCH.format(['',this.value.toString()]));return}if('regexp'===this.type&&this.value.toString()!==a.toString())throw new Error(locales.config.SHOULD_EQUAL.format(['',this.value.toString()]));return}if(this.value!==a)throw new Error(locales.config.SHOULD_EQUAL.format(['',this.value.toString()]))}}}}module.exports=T;
;}(require("lazyload"), require);
