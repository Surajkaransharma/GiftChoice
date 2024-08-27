﻿/*! Copyright (c) 2014 Hidenari Nozaki and contributors | Licensed under the MIT license */ !function(e,t){"use strict";"undefined"!=typeof module&&module.exports?module.exports=t(require("angular")):"function"==typeof define&&define.amd?define(["angular"],t):t(e.angular)}(window,function(e){"use strict";e.module("angucomplete-alt",[]).directive("angucompleteAlt",["$q","$parse","$http","$sce","$timeout","$templateCache","$interpolate",function(e,t,n,r,l,i,a){var s="/angucomplete-alt/index.html";function o(t,i,a,s){var o,c,u,d,p,g=i.find("input"),h=3,f=null,m="autocomplete-required",v=null,S=null,$=!1,x=i[0].querySelector(".angucomplete-dropdown"),w=!1,_=null;function R(e,n){e&&("object"==typeof e?(t.searchStr=I(e),C({originalObject:e})):"string"==typeof e&&e.length>0?t.searchStr=e:console&&console.error&&console.error("Tried to set "+(n?"initial":"")+" value of angucomplete to",e,"which is an invalid value"),O(!0))}function b(e){_=null,t.hideResults(e),document.body.removeEventListener("click",b)}function y(e){return e.which?e.which:e.keyCode}function C(e){"function"==typeof t.selectedObject?t.selectedObject(e,t.selectedObjectData):t.selectedObject=e,e?O(!0):O(!1)}function I(e){return t.titleField.split(",").map(function(t){return D(e,t)}).join(" ")}function D(e,t){var n,r;if(t){n=t.split("."),r=e;for(var l=0;l<n.length;l++)r=r[n[l]]}else r=e;return r}function F(e,n){var l,i,a;if(a=RegExp(n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"i"),e)return e.match&&e.replace||(e=e.toString()),l=(i=e.match(a))?e.replace(a,'<span class="'+t.matchClass+'">'+i[0]+"</span>"):e,r.trustAsHtml(l)}function O(e){t.notEmpty=e,v=t.searchStr,t.fieldRequired&&s&&t.inputName&&s[t.inputName].$setValidity(m,e)}function q(e){if(t.overrideSuggestions&&!(t.selectedObject&&t.selectedObject.originalObject===t.searchStr)){var n;e&&e.preventDefault(),l.cancel(f),k(),C({originalObject:n=t.searchStr}),t.clearSelected&&(t.searchStr=null),L()}}function j(){return i[0].querySelectorAll(".angucomplete-row")[t.currentIndex]}function U(e){x.scrollTop=x.scrollTop+e}function H(){var e=t.results[t.currentIndex];t.matchClass?g.val(I(e.originalObject)):g.val(e.title)}function N(e){return function(n,r,l,i){r||l||i||!n.data||(n=n.data),t.searching=!1,M(D(c(n),t.remoteUrlDataField),e)}}function T(e,n,r,l){t.searching=$,n||r||l||(n=e.status),0!==n&&-1!==n&&(t.remoteUrlErrorCallback?t.remoteUrlErrorCallback(e,n,r,l):console&&console.error&&console.error("http error"))}function k(){S&&S.resolve()}function A(r){var l={},i=t.remoteUrl+encodeURIComponent(r);t.remoteUrlRequestFormatter&&(l={params:t.remoteUrlRequestFormatter(r)},i=t.remoteUrl),t.remoteUrlRequestWithCredentials&&(l.withCredentials=!0),k(),S=e.defer(),l.timeout=S.promise,$=!0,n.get(i,l).then(N(r)).catch(T).finally(function(){$=!1})}function E(n){k(),S=e.defer(),t.remoteApiHandler(n,S.promise).then(N(n)).catch(T)}function L(){t.showDropdown=!1,t.results=[],x&&(x.scrollTop=0)}function B(){t.showDropdown=d,t.currentIndex=t.focusFirst?0:-1,t.results=[]}function V(e){e&&!(e.length<h)&&(t.localData?t.$apply(function(){var n;n=void 0!==t.localSearch()?t.localSearch()(e,t.localData):function e(n){var r,l,i,a,s=t.searchFields.split(","),o=[];for(void 0!==t.parseInput()&&(n=t.parseInput()(n)),r=0;r<t.localData.length;r++){for(i=0,l=!1;i<s.length;i++)a=D(t.localData[r],s[i])||"",l=l||a.toString().toLowerCase().indexOf(n.toString().toLowerCase())>=0;l&&(o[o.length]=t.localData[r])}return o}(e),t.searching=!1,M(n,e)}):t.remoteApiHandler?E(e):A(e))}function M(e,n){var r,l,i,a,s,o;if(e&&e.length>0)for(r=0,t.results=[];r<e.length;r++)t.titleField&&""!==t.titleField&&(a=s=I(e[r])),l="",t.descriptionField&&(l=o=D(e[r],t.descriptionField)),i="",t.imageField&&(i=D(e[r],t.imageField)),t.matchClass&&(s=F(a,n),o=F(l,n)),t.results[t.results.length]={title:s,description:o,image:i,originalObject:e[r]};else t.results=[];t.autoMatch&&1===t.results.length&&function e(n,r,l){if(!l)return!1;for(var i in r)if(r[i].toLowerCase()===l.toLowerCase())return t.selectResult(n),!0;return!1}(t.results[0],{title:a,desc:l||""},t.searchStr)?t.showDropdown=!1:0!==t.results.length||p?t.showDropdown=!0:t.showDropdown=!1}function W(){t.localData?(t.searching=!1,M(t.localData,"")):t.remoteApiHandler?(t.searching=!0,E("")):(t.searching=!0,A(""))}i.on("mousedown",function(e){e.target.id?(_=e.target.id)===t.id+"_dropdown"&&document.body.addEventListener("click",b):_=e.target.className}),t.currentIndex=t.focusFirst?0:null,t.searching=!1,u=t.$watch("initialValue",function(e){e&&(u(),R(e,!0))}),t.$watch("fieldRequired",function(e,n){e!==n&&(e?v&&-1!==t.currentIndex?O(!0):O(!1):s[t.inputName].$setValidity(m,!0))}),t.$on("angucomplete-alt:clearInput",function(e,n){n&&n!==t.id||(t.searchStr=null,C(),O(!1),L())}),t.$on("angucomplete-alt:changeInput",function(e,n,r){n&&n===t.id&&R(r)}),t.onFocusHandler=function(){t.focusIn&&t.focusIn(),0!==h||t.searchStr&&0!==t.searchStr.length||(t.currentIndex=t.focusFirst?0:t.currentIndex,t.showDropdown=!0,W())},t.hideResults=function(){_&&(_===t.id+"_dropdown"||_.indexOf("angucomplete")>=0)?_=null:(o=l(function(){L(),t.$apply(function(){t.searchStr&&t.searchStr.length>0&&g.val(t.searchStr)})},200),k(),t.focusOut&&t.focusOut(),t.overrideSuggestions&&t.searchStr&&t.searchStr.length>0&&-1===t.currentIndex&&q())},t.resetHideResults=function(){o&&l.cancel(o)},t.hoverRow=function(e){t.currentIndex=e},t.selectResult=function(e){t.matchClass&&(e.title=I(e.originalObject),e.description=D(e.originalObject,t.descriptionField)),t.clearSelected?t.searchStr=null:t.searchStr=e.title,C(e),L()},t.inputChangeHandler=function(e){return e.length<h?(k(),L()):0===e.length&&0===h&&W(),t.inputChanged&&(e=t.inputChanged(e)),e},t.fieldRequiredClass&&""!==t.fieldRequiredClass&&(m=t.fieldRequiredClass),t.minlength&&""!==t.minlength&&(h=parseInt(t.minlength,10)),t.pause||(t.pause=500),t.clearSelected||(t.clearSelected=!1),t.overrideSuggestions||(t.overrideSuggestions=!1),t.fieldRequired&&s&&(t.initialValue?O(!0):O(!1)),t.inputType=a.type?a.type:"text",t.textSearching=a.textSearching?a.textSearching:"Searching...",t.textNoResults=a.textNoResults?a.textNoResults:"No results found",d="false"!==t.textSearching,p="false"!==t.textNoResults,t.maxlength=a.maxlength?a.maxlength:524288,g.on("keydown",function e(n){var r,l,i=y(n),a=null,s=null;13===i&&t.results?(t.currentIndex>=0&&t.currentIndex<t.results.length?(n.preventDefault(),t.selectResult(t.results[t.currentIndex])):(q(n),L()),t.$apply()):40===i&&t.results?(n.preventDefault(),t.currentIndex+1<t.results.length&&t.showDropdown&&(t.$apply(function(){t.currentIndex++,H()}),w&&(a=j(),x.getBoundingClientRect().top+parseInt(getComputedStyle(x).maxHeight,10)<a.getBoundingClientRect().bottom))&&U((l=getComputedStyle(r=a),r.offsetHeight+parseInt(l.marginTop,10)+parseInt(l.marginBottom,10)))):38===i&&t.results?(n.preventDefault(),t.currentIndex>=1?(t.$apply(function(){t.currentIndex--,H()}),w&&(s=j().getBoundingClientRect().top-(x.getBoundingClientRect().top+parseInt(getComputedStyle(x).paddingTop,10)))<0&&U(s-1)):0===t.currentIndex&&t.$apply(function(){t.currentIndex=-1,g.val(t.searchStr)})):9===i?t.results&&t.results.length>0&&t.showDropdown?-1===t.currentIndex&&t.overrideSuggestions?q():(-1===t.currentIndex&&(t.currentIndex=0),t.selectResult(t.results[t.currentIndex]),t.$digest()):t.searchStr&&t.searchStr.length>0&&q():27===i&&n.preventDefault()}),g.on("keyup compositionend",function e(n){var r=y(n);if(37!==r&&39!==r){if(38===r||13===r)n.preventDefault();else if(40===r)n.preventDefault(),!t.showDropdown&&t.searchStr&&t.searchStr.length>=h&&(B(),t.searching=!0,V(t.searchStr));else if(27===r)L(),t.$apply(function(){g.val(t.searchStr)});else{if(0===h&&!t.searchStr)return;t.searchStr&&""!==t.searchStr?t.searchStr.length>=h&&(B(),f&&l.cancel(f),t.searching=!0,f=l(function(){V(t.searchStr)},t.pause)):t.showDropdown=!1,v&&v!==t.searchStr&&!t.clearSelected&&t.$apply(function(){C()})}}});var z="remoteUrlResponseFormatter";c=function(e){return t[z]?t[z](e):e},l(function(){var e=getComputedStyle(x);w=e.maxHeight&&"auto"===e.overflowY})}return i.put(s,'<div class="angucomplete-holder" ng-class="{\'angucomplete-dropdown-visible\': showDropdown}">  <input id="{{id}}_value" name="{{inputName}}" tabindex="{{fieldTabindex}}" ng-class="{\'angucomplete-input-not-empty\': notEmpty}" ng-model="searchStr" ng-disabled="disableInput" type="{{inputType}}" placeholder="{{placeholder}}" maxlength="{{maxlength}}" ng-focus="onFocusHandler()" class="{{inputClass}}" ng-focus="resetHideResults()" ng-blur="hideResults($event)" autocapitalize="off" autocorrect="off" autocomplete="off" ng-change="SearchKeyword(searchStr)"  "/>  <div id="{{id}}_dropdown" class="angucomplete-dropdown" ng-show="showDropdown">    <div class="angucomplete-searching" ng-show="searching" ng-bind="textSearching"></div>    <div class="angucomplete-searching" ng-show="!searching && (!results || results.length == 0)" ng-bind="textNoResults"></div>    <div class="angucomplete-row" ng-repeat="result in results" ng-click="selectResult(result)" ng-mouseenter="hoverRow($index)" ng-class="{\'angucomplete-selected-row\': $index == currentIndex}">      <div ng-if="imageField" class="angucomplete-image-holder">        <img ng-if="result.image && result.image != \'\'" ng-src="{{result.image}}" class="angucomplete-image"/>        <div ng-if="!result.image && result.image != \'\'" class="angucomplete-image-default"></div>      </div>      <div class="angucomplete-title" ng-if="matchClass" ng-bind-html="result.title"></div>      <div class="angucomplete-title" ng-if="!matchClass">{{ result.title }}</div>      <div ng-if="matchClass && result.description && result.description != \'\'" class="angucomplete-description" ng-bind-html="result.description"></div>      <div ng-if="!matchClass && result.description && result.description != \'\'" class="angucomplete-description">{{result.description}}</div>    </div>  </div></div>'),{restrict:"EA",require:"^?form",scope:{selectedObject:"=",selectedObjectData:"=",disableInput:"=",initialValue:"=",localData:"=",localSearch:"&",remoteUrlRequestFormatter:"=",remoteUrlRequestWithCredentials:"@",remoteUrlResponseFormatter:"=",remoteUrlErrorCallback:"=",remoteApiHandler:"=",id:"@",type:"@",placeholder:"@",textSearching:"@",textNoResults:"@",remoteUrl:"@",remoteUrlDataField:"@",titleField:"@",descriptionField:"@",imageField:"@",inputClass:"@",pause:"@",searchFields:"@",minlength:"@",matchClass:"@",clearSelected:"@",overrideSuggestions:"@",fieldRequired:"=",fieldRequiredClass:"@",inputChanged:"=",autoMatch:"@",focusOut:"&",focusIn:"&",fieldTabindex:"@",inputName:"@",focusFirst:"@",parseInput:"&"},templateUrl:function(e,t){return t.templateUrl||s},compile:function(e){var t=a.startSymbol(),n=a.endSymbol();if(!("{{"===t&&"}}"===n)){var r=e.html().replace(/\{\{/g,t).replace(/\}\}/g,n);e.html(r)}return o}}}])});