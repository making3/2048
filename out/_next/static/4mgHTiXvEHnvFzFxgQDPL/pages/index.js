(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{109:function(e,t,r){e.exports=r(108)},209:function(e,t,r){__NEXT_REGISTER_PAGE("/",function(){return e.exports=r(237),{page:e.exports.default}})},211:function(e,t,r){e.exports=r(212)},212:function(e,t,r){"use strict";var n=r(19),a=r(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(r(213)),l=a(r(49)),f=a(r(7)),i=a(r(8)),u=a(r(16)),s=a(r(17)),c=a(r(18)),p=a(r(51)),d=a(r(13)),h=r(106),v=n(r(0)),m=(a(r(31)),n(r(48))),E=r(24);var y=function(e){function t(){var e,r,n,a,o,i;(0,f.default)(this,t);for(var c=arguments.length,v=new Array(c),y=0;y<c;y++)v[y]=arguments[y];return r=(0,u.default)(this,(e=(0,s.default)(t)).call.apply(e,[this].concat(v))),(0,d.default)((0,p.default)((0,p.default)(r)),"formatUrls",(n=function(e,t){return{href:e&&"object"===(0,l.default)(e)?(0,h.format)(e):e,as:t&&"object"===(0,l.default)(t)?(0,h.format)(t):t}},a=null,o=null,i=null,function(e,t){if(e===a&&t===o)return i;var r=n(e,t);return a=e,o=t,i=r,r})),(0,d.default)((0,p.default)((0,p.default)(r)),"linkClicked",function(e){var t=e.currentTarget,n=t.nodeName,a=t.target;if("A"!==n||!(a&&"_self"!==a||e.metaKey||e.ctrlKey||e.shiftKey||e.nativeEvent&&2===e.nativeEvent.which)){var o=r.formatUrls(r.props.href,r.props.as),l=o.href,f=o.as;if(function(e){var t=(0,h.parse)(e,!1,!0),r=(0,h.parse)((0,E.getLocationOrigin)(),!1,!0);return!t.host||t.protocol===r.protocol&&t.host===r.host}(l)){var i=window.location.pathname;l=(0,h.resolve)(i,l),f=f?(0,h.resolve)(i,f):l,e.preventDefault();var u=r.props.scroll;null==u&&(u=f.indexOf("#")<0);var s=r.props.replace?"replace":"push";m.default[s](l,f,{shallow:r.props.shallow}).then(function(e){e&&u&&(window.scrollTo(0,0),document.body.focus())}).catch(function(e){r.props.onError&&r.props.onError(e)})}}}),r}return(0,c.default)(t,e),(0,i.default)(t,[{key:"componentDidMount",value:function(){this.prefetch()}},{key:"componentDidUpdate",value:function(e){(0,o.default)(this.props.href)!==(0,o.default)(e.href)&&this.prefetch()}},{key:"prefetch",value:function(){if(this.props.prefetch&&"undefined"!=typeof window){var e=window.location.pathname,t=this.formatUrls(this.props.href,this.props.as).href,r=(0,h.resolve)(e,t);m.default.prefetch(r)}}},{key:"render",value:function(){var e=this,t=this.props.children,r=this.formatUrls(this.props.href,this.props.as),n=r.href,a=r.as;"string"==typeof t&&(t=v.default.createElement("a",null,t));var o=v.Children.only(t),l={onClick:function(t){o.props&&"function"==typeof o.props.onClick&&o.props.onClick(t),t.defaultPrevented||e.linkClicked(t)}};return!this.props.passHref&&("a"!==o.type||"href"in o.props)||(l.href=a||n),l.href&&"undefined"!=typeof __NEXT_DATA__&&__NEXT_DATA__.nextExport&&(l.href=(0,m._rewriteUrlForNextExport)(l.href)),v.default.cloneElement(o,l)}}]),t}(v.Component);t.default=y},213:function(e,t,r){e.exports=r(214)},214:function(e,t,r){var n=r(1),a=n.JSON||(n.JSON={stringify:JSON.stringify});e.exports=function(e){return a.stringify.apply(a,arguments)}},237:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),o=r(25),l=r.n(o),f=r(211),i=r.n(f),u=function(){return a.a.createElement("div",{className:l.a.header},a.a.createElement(i.a,{href:"/",as:"".concat("/2048","/")},a.a.createElement("a",null,"2048")))},s=function(e){var t=e.children;return a.a.createElement("div",null,a.a.createElement(u,null),a.a.createElement("div",null,t))},c=r(77),p=r(109),d=r.n(p);t.default=function(){return a.a.createElement(s,null,a.a.createElement(d.a,null,a.a.createElement("title",null,"2048")),a.a.createElement("div",{className:l.a.title},a.a.createElement("h1",null,"2048")),a.a.createElement("div",{className:l.a.layout},a.a.createElement(c.default,null)))}}},[[209,1,0,2]]]);