(function(factory){"use strict";if(typeof define==="function"&&define.amd){define(["jquery"],factory)}else if(typeof exports!=="undefined"){module.exports=factory(require("jquery"))}else{factory(jQuery)}})(function($){$.fn.marquee=function(options){return this.each(function(){var o=$.extend({},$.fn.marquee.defaults,options),$this=$(this),$marqueeWrapper,containerWidth,animationCss,verticalDir,elWidth,loopCount=3,playState="animation-play-state",css3AnimationIsSupported=false,_prefixedEvent=function(element,type,callback){var pfx=["webkit","moz","MS","o",""];for(var p=0;p<pfx.length;p++){if(!pfx[p])type=type.toLowerCase();element.addEventListener(pfx[p]+type,callback,false)}},_objToString=function(obj){var tabjson=[];for(var p in obj){if(obj.hasOwnProperty(p)){tabjson.push(p+":"+obj[p])}}tabjson.push();return"{"+tabjson.join(",")+"}"},_startAnimationWithDelay=function(){$this.timer=setTimeout(animate,o.delayBeforeStart)},methods={pause:function(){if(css3AnimationIsSupported&&o.allowCss3Support){$marqueeWrapper.css(playState,"paused")}else{if($.fn.pause){$marqueeWrapper.pause()}}$this.data("runningStatus","paused");$this.trigger("paused")},resume:function(){if(css3AnimationIsSupported&&o.allowCss3Support){$marqueeWrapper.css(playState,"running")}else{if($.fn.resume){$marqueeWrapper.resume()}}$this.data("runningStatus","resumed");$this.trigger("resumed")},toggle:function(){methods[$this.data("runningStatus")==="resumed"?"pause":"resume"]()},destroy:function(){clearTimeout($this.timer);$this.find("*").addBack().off();$this.html($this.find(".js-marquee:first").html())}};if(typeof options==="string"){if($.isFunction(methods[options])){if(!$marqueeWrapper){$marqueeWrapper=$this.find(".js-marquee-wrapper")}if($this.data("css3AnimationIsSupported")===true){css3AnimationIsSupported=true}methods[options]()}return}var dataAttributes={},attr;$.each(o,function(key){attr=$this.attr("data-"+key);if(typeof attr!=="undefined"){switch(attr){case"true":attr=true;break;case"false":attr=false;break}o[key]=attr}});if(o.speed){o.duration=parseInt($this.width(),10)/o.speed*1e3}verticalDir=o.direction==="up"||o.direction==="down";o.gap=o.duplicated?parseInt(o.gap):0;$this.wrapInner('<div class="js-marquee"></div>');var $el=$this.find(".js-marquee").css({"margin-right":o.gap,float:"left"});if(o.duplicated){$el.clone(true).appendTo($this)}$this.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>');$marqueeWrapper=$this.find(".js-marquee-wrapper");if(verticalDir){var containerHeight=$this.height();$marqueeWrapper.removeAttr("style");$this.height(containerHeight);$this.find(".js-marquee").css({float:"none","margin-bottom":o.gap,"margin-right":0});if(o.duplicated){$this.find(".js-marquee:last").css({"margin-bottom":0})}var elHeight=$this.find(".js-marquee:first").height()+o.gap;if(o.startVisible&&!o.duplicated){o._completeDuration=(parseInt(elHeight,10)+parseInt(containerHeight,10))/parseInt(containerHeight,10)*o.duration;o.duration=parseInt(elHeight,10)/parseInt(containerHeight,10)*o.duration}else{o.duration=(parseInt(elHeight,10)+parseInt(containerHeight,10))/parseInt(containerHeight,10)*o.duration}}else{elWidth=$this.find(".js-marquee:first").width()+o.gap;containerWidth=$this.width();if(o.startVisible&&!o.duplicated){o._completeDuration=(parseInt(elWidth,10)+parseInt(containerWidth,10))/parseInt(containerWidth,10)*o.duration;o.duration=parseInt(elWidth,10)/parseInt(containerWidth,10)*o.duration}else{o.duration=(parseInt(elWidth,10)+parseInt(containerWidth,10))/parseInt(containerWidth,10)*o.duration}}if(o.duplicated){o.duration=o.duration/2}if(o.allowCss3Support){var elm=document.body||document.createElement("div"),animationName="marqueeAnimation-"+Math.floor(Math.random()*1e7),domPrefixes="Webkit Moz O ms Khtml".split(" "),animationString="animation",animationCss3Str="",keyframeString="";if(elm.style.animation!==undefined){keyframeString="@keyframes "+animationName+" ";css3AnimationIsSupported=true}if(css3AnimationIsSupported===false){for(var i=0;i<domPrefixes.length;i++){if(elm.style[domPrefixes[i]+"AnimationName"]!==undefined){var prefix="-"+domPrefixes[i].toLowerCase()+"-";animationString=prefix+animationString;playState=prefix+playState;keyframeString="@"+prefix+"keyframes "+animationName+" ";css3AnimationIsSupported=true;break}}}if(css3AnimationIsSupported){animationCss3Str=animationName+" "+o.duration/1e3+"s "+o.delayBeforeStart/1e3+"s infinite "+o.css3easing;$this.data("css3AnimationIsSupported",true)}}var _rePositionVertically=function(){$marqueeWrapper.css("transform","translateY("+(o.direction==="up"?containerHeight+"px":"-"+elHeight+"px")+")")},_rePositionHorizontally=function(){$marqueeWrapper.css("transform","translateX("+(o.direction==="left"?containerWidth+"px":"-"+elWidth+"px")+")")};if(o.duplicated){if(verticalDir){if(o.startVisible){$marqueeWrapper.css("transform","translateY(0)")}else{$marqueeWrapper.css("transform","translateY("+(o.direction==="up"?containerHeight+"px":"-"+(elHeight*2-o.gap)+"px")+")")}}else{if(o.startVisible){$marqueeWrapper.css("transform","translateX(0)")}else{$marqueeWrapper.css("transform","translateX("+(o.direction==="left"?containerWidth+"px":"-"+(elWidth*2-o.gap)+"px")+")")}}if(!o.startVisible){loopCount=1}}else if(o.startVisible){loopCount=2}else{if(verticalDir){_rePositionVertically()}else{_rePositionHorizontally()}}var animate=function(){if(o.duplicated){if(loopCount===1){o._originalDuration=o.duration;if(verticalDir){o.duration=o.direction==="up"?o.duration+containerHeight/(elHeight/o.duration):o.duration*2}else{o.duration=o.direction==="left"?o.duration+containerWidth/(elWidth/o.duration):o.duration*2}if(animationCss3Str){animationCss3Str=animationName+" "+o.duration/1e3+"s "+o.delayBeforeStart/1e3+"s "+o.css3easing}loopCount++}else if(loopCount===2){o.duration=o._originalDuration;if(animationCss3Str){animationName=animationName+"0";keyframeString=$.trim(keyframeString)+"0 ";animationCss3Str=animationName+" "+o.duration/1e3+"s 0s infinite "+o.css3easing}loopCount++}}if(verticalDir){if(o.duplicated){if(loopCount>2){$marqueeWrapper.css("transform","translateY("+(o.direction==="up"?0:"-"+elHeight+"px")+")")}animationCss={transform:"translateY("+(o.direction==="up"?"-"+elHeight+"px":0)+")"}}else if(o.startVisible){if(loopCount===2){if(animationCss3Str){animationCss3Str=animationName+" "+o.duration/1e3+"s "+o.delayBeforeStart/1e3+"s "+o.css3easing}animationCss={transform:"translateY("+(o.direction==="up"?"-"+elHeight+"px":containerHeight+"px")+")"};loopCount++}else if(loopCount===3){o.duration=o._completeDuration;if(animationCss3Str){animationName=animationName+"0";keyframeString=$.trim(keyframeString)+"0 ";animationCss3Str=animationName+" "+o.duration/1e3+"s 0s infinite "+o.css3easing}_rePositionVertically()}}else{_rePositionVertically();animationCss={transform:"translateY("+(o.direction==="up"?"-"+$marqueeWrapper.height()+"px":containerHeight+"px")+")"}}}else{if(o.duplicated){if(loopCount>2){$marqueeWrapper.css("transform","translateX("+(o.direction==="left"?0:"-"+elWidth+"px")+")")}animationCss={transform:"translateX("+(o.direction==="left"?"-"+elWidth+"px":0)+")"}}else if(o.startVisible){if(loopCount===2){if(animationCss3Str){animationCss3Str=animationName+" "+o.duration/1e3+"s "+o.delayBeforeStart/1e3+"s "+o.css3easing}animationCss={transform:"translateX("+(o.direction==="left"?"-"+elWidth+"px":containerWidth+"px")+")"};loopCount++}else if(loopCount===3){o.duration=o._completeDuration;if(animationCss3Str){animationName=animationName+"0";keyframeString=$.trim(keyframeString)+"0 ";animationCss3Str=animationName+" "+o.duration/1e3+"s 0s infinite "+o.css3easing}_rePositionHorizontally()}}else{_rePositionHorizontally();animationCss={transform:"translateX("+(o.direction==="left"?"-"+elWidth+"px":containerWidth+"px")+")"}}}$this.trigger("beforeStarting");if(css3AnimationIsSupported){$marqueeWrapper.css(animationString,animationCss3Str);var keyframeCss=keyframeString+" { 100%  "+_objToString(animationCss)+"}",$styles=$marqueeWrapper.find("style");if($styles.length!==0){$styles.filter(":last").html(keyframeCss)}else{$("head").append("<style>"+keyframeCss+"</style>")}_prefixedEvent($marqueeWrapper[0],"AnimationIteration",function(){$this.trigger("finished")});_prefixedEvent($marqueeWrapper[0],"AnimationEnd",function(){animate();$this.trigger("finished")})}else{$marqueeWrapper.animate(animationCss,o.duration,o.easing,function(){$this.trigger("finished");if(o.pauseOnCycle){_startAnimationWithDelay()}else{animate()}})}$this.data("runningStatus","resumed")};$this.on("pause",methods.pause);$this.on("resume",methods.resume);if(o.pauseOnHover){$this.on("mouseenter",methods.pause);$this.on("mouseleave",methods.resume)}if(css3AnimationIsSupported&&o.allowCss3Support){animate()}else{_startAnimationWithDelay()}})};$.fn.marquee.defaults={allowCss3Support:true,css3easing:"linear",easing:"linear",delayBeforeStart:1e3,direction:"left",duplicated:false,duration:5e3,speed:0,gap:20,pauseOnCycle:false,pauseOnHover:false,startVisible:false}});
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.AirDatepicker=t():e.AirDatepicker=t()}(this,(function(){return function(){"use strict";var e={d:function(t,i){for(var s in i)e.o(i,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:i[s]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t={};e.d(t,{default:function(){return B}});var i={days:"days",months:"months",years:"years",day:"day",month:"month",year:"year",eventChangeViewDate:"changeViewDate",eventChangeCurrentView:"changeCurrentView",eventChangeFocusDate:"changeFocusDate",eventChangeSelectedDate:"changeSelectedDate",eventChangeTime:"changeTime",eventChangeLastSelectedDate:"changeLastSelectedDate",actionSelectDate:"selectDate",actionUnselectDate:"unselectDate",cssClassWeekend:"-weekend-"},s={classes:"",inline:!1,locale:{days:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],daysShort:["Вос","Пон","Вто","Сре","Чет","Пят","Суб"],daysMin:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],months:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],monthsShort:["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],today:"Сегодня",clear:"Очистить",dateFormat:"dd.MM.yyyy",timeFormat:"HH:mm",firstDay:1},startDate:new Date,firstDay:"",weekends:[6,0],dateFormat:"",altField:"",altFieldDateFormat:"T",toggleSelected:!0,keyboardNav:!0,selectedDates:!1,container:"",isMobile:!1,visible:!1,position:"bottom left",offset:12,view:i.days,minView:i.days,showOtherMonths:!0,selectOtherMonths:!0,moveToOtherMonthsOnSelect:!0,showOtherYears:!0,selectOtherYears:!0,moveToOtherYearsOnSelect:!0,minDate:"",maxDate:"",disableNavWhenOutOfRange:!0,multipleDates:!1,multipleDatesSeparator:", ",range:!1,dynamicRange:!0,buttons:!1,monthsField:"monthsShort",showEvent:"focus",autoClose:!1,prevHtml:'<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>',nextHtml:'<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>',navTitles:{days:"MMMM, <i>yyyy</i>",months:"yyyy",years:"yyyy1 - yyyy2"},timepicker:!1,onlyTimepicker:!1,dateTimeSeparator:" ",timeFormat:"",minHours:0,maxHours:24,minMinutes:0,maxMinutes:59,hoursStep:1,minutesStep:1,onSelect:!1,onChangeViewDate:!1,onChangeView:!1,onRenderCell:!1,onShow:!1,onHide:!1,onClickDayName:!1};function a(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document;return"string"==typeof e?t.querySelector(e):e}function n(){let{tagName:e="div",className:t="",innerHtml:i="",id:s="",attrs:a={}}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=document.createElement(e);return t&&n.classList.add(...t.split(" ")),s&&(n.id=s),i&&(n.innerHTML=i),a&&r(n,a),n}function r(e,t){for(let[i,s]of Object.entries(t))void 0!==s&&e.setAttribute(i,s);return e}function h(e){return new Date(e.getFullYear(),e.getMonth()+1,0).getDate()}function o(e){let t=e.getHours(),{hours:i,dayPeriod:s}=l(t);return{year:e.getFullYear(),month:e.getMonth(),fullMonth:e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1,date:e.getDate(),fullDate:e.getDate()<10?"0"+e.getDate():e.getDate(),day:e.getDay(),hours:t,fullHours:d(t),hours12:i,dayPeriod:s,fullHours12:d(i),minutes:e.getMinutes(),fullMinutes:e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes()}}function l(e){return{dayPeriod:e>11?"pm":"am",hours:e%12==0?12:e%12}}function d(e){return e<10?"0"+e:e}function c(e){let t=10*Math.floor(e.getFullYear()/10);return[t,t+9]}function u(){let e=[];for(var t=arguments.length,i=new Array(t),s=0;s<t;s++)i[s]=arguments[s];return i.forEach((t=>{if("object"==typeof t)for(let i in t)t[i]&&e.push(i);else t&&e.push(t)})),e.join(" ")}function p(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i.days;if(!e||!t)return!1;let a=o(e),n=o(t);return{[i.days]:a.date===n.date&&a.month===n.month&&a.year===n.year,[i.months]:a.month===n.month&&a.year===n.year,[i.years]:a.year===n.year}[s]}function m(e,t,i){let s=g(e,!1).getTime(),a=g(t,!1).getTime();return i?s>=a:s>a}function v(e,t){return!m(e,t,!0)}function g(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=new Date(e.getTime());return"boolean"!=typeof t||t||function(e){e.setHours(0,0,0,0)}(i),i}function D(e,t,i){e.length?e.forEach((e=>{e.addEventListener(t,i)})):e.addEventListener(t,i)}function y(e,t){return!(!e||e===document||e instanceof DocumentFragment)&&(e.matches(t)?e:y(e.parentNode,t))}function f(e,t,i){return e>i?i:e<t?t:e}function w(e){for(var t=arguments.length,i=new Array(t>1?t-1:0),s=1;s<t;s++)i[s-1]=arguments[s];return i.filter((e=>e)).forEach((t=>{for(let[i,s]of Object.entries(t))if(void 0!==s&&"[object Object]"===s.toString()){let t=void 0!==e[i]?e[i].toString():void 0,a=s.toString(),n=Array.isArray(s)?[]:{};e[i]=e[i]?t!==a?n:e[i]:n,w(e[i],s)}else e[i]=s})),e}function b(e){let t=e;return e instanceof Date||(t=new Date(e)),isNaN(t.getTime())&&(console.log(`Unable to convert value "${e}" to Date object`),t=!1),t}function k(e){let t="\\s|\\.|-|/|\\\\|,|\\$|\\!|\\?|:|;";return new RegExp("(^|>|"+t+")("+e+")($|<|"+t+")","g")}function $(e,t,i){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var s=i.call(e,"string");if("object"!=typeof s)return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}class C{constructor(){let{type:e,date:t,dp:i,opts:s,body:a}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};$(this,"focus",(()=>{this.$cell.classList.add("-focus-"),this.focused=!0})),$(this,"removeFocus",(()=>{this.$cell.classList.remove("-focus-"),this.focused=!1})),$(this,"select",(()=>{this.$cell.classList.add("-selected-"),this.selected=!0})),$(this,"removeSelect",(()=>{this.$cell.classList.remove("-selected-","-range-from-","-range-to-"),this.selected=!1})),$(this,"onChangeSelectedDate",(()=>{this.isDisabled||(this._handleSelectedStatus(),this.opts.range&&this._handleRangeStatus())})),$(this,"onChangeFocusDate",(e=>{if(!e)return void(this.focused&&this.removeFocus());let t=p(e,this.date,this.type);t?this.focus():!t&&this.focused&&this.removeFocus(),this.opts.range&&this._handleRangeStatus()})),$(this,"render",(()=>(this.$cell.innerHTML=this._getHtml(),this.$cell.adpCell=this,this.$cell))),this.type=e,this.singleType=this.type.slice(0,-1),this.date=t,this.dp=i,this.opts=s,this.body=a,this.customData=!1,this.init()}init(){let{range:e,onRenderCell:t}=this.opts;t&&(this.customData=t({date:this.date,cellType:this.singleType,datepicker:this.dp})),this._createElement(),this._bindDatepickerEvents(),this._handleInitialFocusStatus(),this.dp.hasSelectedDates&&(this._handleSelectedStatus(),e&&this._handleRangeStatus())}_bindDatepickerEvents(){this.dp.on(i.eventChangeSelectedDate,this.onChangeSelectedDate),this.dp.on(i.eventChangeFocusDate,this.onChangeFocusDate)}unbindDatepickerEvents(){this.dp.off(i.eventChangeSelectedDate,this.onChangeSelectedDate),this.dp.off(i.eventChangeFocusDate,this.onChangeFocusDate)}_createElement(){var e;let{year:t,month:i,date:s}=o(this.date),a=(null===(e=this.customData)||void 0===e?void 0:e.attrs)||{};this.$cell=n({className:this._getClassName(),attrs:{"data-year":t,"data-month":i,"data-date":s,...a}})}_getClassName(){var e,t;let s=new Date,{selectOtherMonths:a,selectOtherYears:n}=this.opts,{minDate:r,maxDate:h}=this.dp,{day:l}=o(this.date),d=this._isOutOfMinMaxRange(),c=null===(e=this.customData)||void 0===e?void 0:e.disabled,m=u("air-datepicker-cell",`-${this.singleType}-`,{"-current-":p(s,this.date,this.type),"-min-date-":r&&p(r,this.date,this.type),"-max-date-":h&&p(h,this.date,this.type)}),v="";switch(this.type){case i.days:v=u({"-weekend-":this.dp.isWeekend(l),"-other-month-":this.isOtherMonth,"-disabled-":this.isOtherMonth&&!a||d||c});break;case i.months:v=u({"-disabled-":d||c});break;case i.years:v=u({"-other-decade-":this.isOtherDecade,"-disabled-":d||this.isOtherDecade&&!n||c})}return u(m,v,null===(t=this.customData)||void 0===t?void 0:t.classes)}_getHtml(){var e;let{year:t,month:s,date:a}=o(this.date),{showOtherMonths:n,showOtherYears:r}=this.opts;if(null!==(e=this.customData)&&void 0!==e&&e.html)return this.customData.html;switch(this.type){case i.days:return!n&&this.isOtherMonth?"":a;case i.months:return this.dp.locale[this.opts.monthsField][s];case i.years:return!r&&this.isOtherDecade?"":t}}_isOutOfMinMaxRange(){let{minDate:e,maxDate:t}=this.dp,{type:s,date:a}=this,{month:n,year:r,date:h}=o(a),l=s===i.days,d=s===i.years,c=!!e&&new Date(r,d?e.getMonth():n,l?h:e.getDate()),u=!!t&&new Date(r,d?t.getMonth():n,l?h:t.getDate());return e&&t?v(c,e)||m(u,t):e?v(c,e):t?m(u,t):void 0}destroy(){this.unbindDatepickerEvents()}_handleRangeStatus(){let{rangeDateFrom:e,rangeDateTo:t}=this.dp,i=u({"-in-range-":e&&t&&(s=this.date,a=e,n=t,m(s,a)&&v(s,n)),"-range-from-":e&&p(this.date,e,this.type),"-range-to-":t&&p(this.date,t,this.type)});var s,a,n;this.$cell.classList.remove("-range-from-","-range-to-","-in-range-"),i&&this.$cell.classList.add(...i.split(" "))}_handleSelectedStatus(){let e=this.dp._checkIfDateIsSelected(this.date,this.type);e?this.select():!e&&this.selected&&this.removeSelect()}_handleInitialFocusStatus(){p(this.dp.focusDate,this.date,this.type)&&this.focus()}get isDisabled(){return this.$cell.matches(".-disabled-")}get isOtherMonth(){return this.dp.isOtherMonth(this.date)}get isOtherDecade(){return this.dp.isOtherDecade(this.date)}}function _(e,t,i){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var s=i.call(e,"string");if("object"!=typeof s)return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}let M={[i.days]:`<div class="air-datepicker-body--day-names"></div><div class="air-datepicker-body--cells -${i.days}-"></div>`,[i.months]:`<div class="air-datepicker-body--cells -${i.months}-"></div>`,[i.years]:`<div class="air-datepicker-body--cells -${i.years}-"></div>`};const S=".air-datepicker-cell";class T{constructor(e){let{dp:t,type:s,opts:a}=e;_(this,"handleClick",(e=>{let t=e.target.closest(S).adpCell;if(t.isDisabled)return;if(!this.dp.isMinViewReached)return void this.dp.down();let i=this.dp._checkIfDateIsSelected(t.date,t.type);i?this.dp._handleAlreadySelectedDates(i,t.date):this.dp.selectDate(t.date)})),_(this,"handleDayNameClick",(e=>{let t=e.target.getAttribute("data-day-index");this.opts.onClickDayName({dayIndex:Number(t),datepicker:this.dp})})),_(this,"onChangeCurrentView",(e=>{e!==this.type?this.hide():(this.show(),this.render())})),_(this,"onMouseOverCell",(e=>{let t=y(e.target,S);this.dp.setFocusDate(!!t&&t.adpCell.date)})),_(this,"onMouseOutCell",(()=>{this.dp.setFocusDate(!1)})),_(this,"onClickBody",(e=>{let{onClickDayName:t}=this.opts,i=e.target;i.closest(S)&&this.handleClick(e),t&&i.closest(".air-datepicker-body--day-name")&&this.handleDayNameClick(e)})),_(this,"onMouseDown",(e=>{this.pressed=!0;let t=y(e.target,S),i=t&&t.adpCell;p(i.date,this.dp.rangeDateFrom)&&(this.rangeFromFocused=!0),p(i.date,this.dp.rangeDateTo)&&(this.rangeToFocused=!0)})),_(this,"onMouseMove",(e=>{if(!this.pressed||!this.dp.isMinViewReached)return;e.preventDefault();let t=y(e.target,S),i=t&&t.adpCell,{selectedDates:s,rangeDateTo:a,rangeDateFrom:n}=this.dp;if(!i||i.isDisabled)return;let{date:r}=i;if(2===s.length){if(this.rangeFromFocused&&!m(r,a)){let{hours:e,minutes:t}=o(n);r.setHours(e),r.setMinutes(t),this.dp.rangeDateFrom=r,this.dp.replaceDate(n,r)}if(this.rangeToFocused&&!v(r,n)){let{hours:e,minutes:t}=o(a);r.setHours(e),r.setMinutes(t),this.dp.rangeDateTo=r,this.dp.replaceDate(a,r)}}})),_(this,"onMouseUp",(()=>{this.pressed=!1,this.rangeFromFocused=!1,this.rangeToFocused=!1})),_(this,"onChangeViewDate",((e,t)=>{if(!this.isVisible)return;let s=c(e),a=c(t);switch(this.dp.currentView){case i.days:if(p(e,t,i.months))return;break;case i.months:if(p(e,t,i.years))return;break;case i.years:if(s[0]===a[0]&&s[1]===a[1])return}this.render()})),_(this,"render",(()=>{this.destroyCells(),this._generateCells(),this.cells.forEach((e=>{this.$cells.appendChild(e.render())}))})),this.dp=t,this.type=s,this.opts=a,this.cells=[],this.$el="",this.pressed=!1,this.isVisible=!0,this.init()}init(){this._buildBaseHtml(),this.type===i.days&&this.renderDayNames(),this.render(),this._bindEvents(),this._bindDatepickerEvents()}_bindEvents(){let{range:e,dynamicRange:t}=this.opts;D(this.$el,"mouseover",this.onMouseOverCell),D(this.$el,"mouseout",this.onMouseOutCell),D(this.$el,"click",this.onClickBody),e&&t&&(D(this.$el,"mousedown",this.onMouseDown),D(this.$el,"mousemove",this.onMouseMove),D(window.document,"mouseup",this.onMouseUp))}_bindDatepickerEvents(){this.dp.on(i.eventChangeViewDate,this.onChangeViewDate),this.dp.on(i.eventChangeCurrentView,this.onChangeCurrentView)}_buildBaseHtml(){this.$el=n({className:`air-datepicker-body -${this.type}-`,innerHtml:M[this.type]}),this.$names=a(".air-datepicker-body--day-names",this.$el),this.$cells=a(".air-datepicker-body--cells",this.$el)}_getDayNamesHtml(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.dp.locale.firstDay,t="",s=this.dp.isWeekend,{onClickDayName:a}=this.opts,n=e,r=0;for(;r<7;){let e=n%7;t+=`<div class="${u("air-datepicker-body--day-name",{[i.cssClassWeekend]:s(e),"-clickable-":!!a})}" data-day-index='${e}'>${this.dp.locale.daysMin[e]}</div>`,r++,n++}return t}renderDayNames(){this.$names.innerHTML=this._getDayNamesHtml()}_generateCell(e){let{type:t,dp:i,opts:s}=this;return new C({type:t,dp:i,opts:s,date:e,body:this})}_generateCells(){T.getDatesFunction(this.type)(this.dp,(e=>{this.cells.push(this._generateCell(e))}))}show(){this.isVisible=!0,this.$el.classList.remove("-hidden-")}hide(){this.isVisible=!1,this.$el.classList.add("-hidden-")}destroyCells(){this.cells.forEach((e=>e.destroy())),this.cells=[],this.$cells.innerHTML=""}destroy(){this.destroyCells(),this.dp.off(i.eventChangeViewDate,this.onChangeViewDate),this.dp.off(i.eventChangeCurrentView,this.onChangeCurrentView)}static getDaysDates(e,t){let{viewDate:i,locale:{firstDay:s}}=e,a=h(i),{year:n,month:r}=o(i),l=new Date(n,r,1),d=new Date(n,r,a),c=l.getDay()-s,u=6-d.getDay()+s;c=c<0?c+7:c,u=u>6?u-7:u;let p=function(e,t){let{year:i,month:s,date:a}=o(e);return new Date(i,s,a-t)}(l,c),m=a+c+u,v=p.getDate(),{year:g,month:D}=o(p),y=0;const f=[];for(;y<m;){let e=new Date(g,D,v+y);t&&t(e),f.push(e),y++}return f}static getMonthsDates(e,t){let{year:i}=e.parsedViewDate,s=0,a=[];for(;s<12;){const e=new Date(i,s);a.push(e),t&&t(e),s++}return a}static getYearsDates(e,t){let i=c(e.viewDate),s=i[0]-1,a=i[1]+1,n=s,r=[];for(;n<=a;){const e=new Date(n,0);r.push(e),t&&t(e),n++}return r}static getDatesFunction(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i.days;return{[i.days]:T.getDaysDates,[i.months]:T.getMonthsDates,[i.years]:T.getYearsDates}[e]}}function F(e,t,i){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var s=i.call(e,"string");if("object"!=typeof s)return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}class V{constructor(e){let{dp:t,opts:i}=e;F(this,"onClickNav",(e=>{let t=y(e.target,".air-datepicker-nav--action");if(!t)return;let i=t.dataset.action;this.dp[i]()})),F(this,"onChangeViewDate",(()=>{this.render(),this._resetNavStatus(),this.handleNavStatus()})),F(this,"onChangeCurrentView",(()=>{this.render(),this._resetNavStatus(),this.handleNavStatus()})),F(this,"onClickNavTitle",(()=>{this.dp.isFinalView||this.dp.up()})),F(this,"update",(()=>{let{prevHtml:e,nextHtml:t}=this.opts;this.$prev.innerHTML=e,this.$next.innerHTML=t,this._resetNavStatus(),this.render(),this.handleNavStatus()})),F(this,"renderDelay",(()=>{setTimeout(this.render)})),F(this,"render",(()=>{this.$title.innerHTML=this._getTitle(),function(e,t){for(let i in t)t[i]?e.classList.add(i):e.classList.remove(i)}(this.$title,{"-disabled-":this.dp.isFinalView})})),this.dp=t,this.opts=i,this.init()}init(){this._createElement(),this._buildBaseHtml(),this._defineDOM(),this.render(),this.handleNavStatus(),this._bindEvents(),this._bindDatepickerEvents()}_defineDOM(){this.$title=a(".air-datepicker-nav--title",this.$el),this.$prev=a('[data-action="prev"]',this.$el),this.$next=a('[data-action="next"]',this.$el)}_bindEvents(){this.$el.addEventListener("click",this.onClickNav),this.$title.addEventListener("click",this.onClickNavTitle)}_bindDatepickerEvents(){this.dp.on(i.eventChangeViewDate,this.onChangeViewDate),this.dp.on(i.eventChangeCurrentView,this.onChangeCurrentView),this.isNavIsFunction&&(this.dp.on(i.eventChangeSelectedDate,this.renderDelay),this.dp.opts.timepicker&&this.dp.on(i.eventChangeTime,this.render))}destroy(){this.dp.off(i.eventChangeViewDate,this.onChangeViewDate),this.dp.off(i.eventChangeCurrentView,this.onChangeCurrentView),this.isNavIsFunction&&(this.dp.off(i.eventChangeSelectedDate,this.renderDelay),this.dp.opts.timepicker&&this.dp.off(i.eventChangeTime,this.render))}_createElement(){this.$el=n({tagName:"nav",className:"air-datepicker-nav"})}_getTitle(){let{dp:e,opts:t}=this,i=t.navTitles[e.currentView];return"function"==typeof i?i(e):e.formatDate(e.viewDate,i)}handleNavStatus(){let{disableNavWhenOutOfRange:e}=this.opts,{minDate:t,maxDate:s}=this.dp;if(!t&&!s||!e)return;let{year:a,month:n}=this.dp.parsedViewDate,r=!!t&&o(t),h=!!s&&o(s);switch(this.dp.currentView){case i.days:t&&r.month>=n&&r.year>=a&&this._disableNav("prev"),s&&h.month<=n&&h.year<=a&&this._disableNav("next");break;case i.months:t&&r.year>=a&&this._disableNav("prev"),s&&h.year<=a&&this._disableNav("next");break;case i.years:{let e=c(this.dp.viewDate);t&&r.year>=e[0]&&this._disableNav("prev"),s&&h.year<=e[1]&&this._disableNav("next");break}}}_disableNav(e){a('[data-action="'+e+'"]',this.$el).classList.add("-disabled-")}_resetNavStatus(){!function(e){for(var t=arguments.length,i=new Array(t>1?t-1:0),s=1;s<t;s++)i[s-1]=arguments[s];e.length?e.forEach((e=>{e.classList.remove(...i)})):e.classList.remove(...i)}(this.$el.querySelectorAll(".air-datepicker-nav--action"),"-disabled-")}_buildBaseHtml(){let{prevHtml:e,nextHtml:t}=this.opts;this.$el.innerHTML=`<div class="air-datepicker-nav--action" data-action="prev">${e}</div><div class="air-datepicker-nav--title"></div><div class="air-datepicker-nav--action" data-action="next">${t}</div>`}get isNavIsFunction(){let{navTitles:e}=this.opts;return Object.keys(e).find((t=>"function"==typeof e[t]))}}var x={today:{content:e=>e.locale.today,onClick:e=>e.setViewDate(new Date)},clear:{content:e=>e.locale.clear,onClick:e=>e.clear()}};class H{constructor(e){let{dp:t,opts:i}=e;this.dp=t,this.opts=i,this.init()}init(){this.createElement(),this.render()}createElement(){this.$el=n({className:"air-datepicker-buttons"})}destroy(){this.$el.parentNode.removeChild(this.$el)}clearHtml(){return this.$el.innerHTML="",this}generateButtons(){let{buttons:e}=this.opts;Array.isArray(e)||(e=[e]),e.forEach((e=>{let t=e;"string"==typeof e&&x[e]&&(t=x[e]);let i=this.createButton(t);t.onClick&&this.attachEventToButton(i,t.onClick),this.$el.appendChild(i)}))}attachEventToButton(e,t){e.addEventListener("click",(()=>{t(this.dp)}))}createButton(e){let{content:t,className:i,tagName:s="button",attrs:a={}}=e;return n({tagName:s,innerHtml:`<span tabindex='-1'>${"function"==typeof t?t(this.dp):t}</span>`,className:u("air-datepicker-button",i),attrs:a})}render(){this.generateButtons()}}function E(e,t,i){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var s=i.call(e,"string");if("object"!=typeof s)return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}class L{constructor(){let{opts:e,dp:t}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};E(this,"toggleTimepickerIsActive",(e=>{this.dp.timepickerIsActive=e})),E(this,"onChangeSelectedDate",(e=>{let{date:t,updateTime:i=!1}=e;t&&(this.setMinMaxTime(t),this.setCurrentTime(!!i&&t),this.addTimeToDate(t))})),E(this,"onChangeLastSelectedDate",(e=>{e&&(this.setTime(e),this.render())})),E(this,"onChangeInputRange",(e=>{let t=e.target;this[t.getAttribute("name")]=t.value,this.updateText(),this.dp.trigger(i.eventChangeTime,{hours:this.hours,minutes:this.minutes})})),E(this,"onMouseEnterLeave",(e=>{let t=e.target.getAttribute("name"),i=this.$minutesText;"hours"===t&&(i=this.$hoursText),i.classList.toggle("-focus-")})),E(this,"onFocus",(()=>{this.toggleTimepickerIsActive(!0)})),E(this,"onBlur",(()=>{this.toggleTimepickerIsActive(!1)})),this.opts=e,this.dp=t;let{timeFormat:s}=this.dp.locale;s&&(s.match(k("h"))||s.match(k("hh")))&&(this.ampm=!0),this.init()}init(){this.setTime(this.dp.lastSelectedDate||this.dp.viewDate),this.createElement(),this.buildHtml(),this.defineDOM(),this.render(),this.bindDatepickerEvents(),this.bindDOMEvents()}bindDatepickerEvents(){this.dp.on(i.eventChangeSelectedDate,this.onChangeSelectedDate),this.dp.on(i.eventChangeLastSelectedDate,this.onChangeLastSelectedDate)}bindDOMEvents(){let e="input";navigator.userAgent.match(/trident/gi)&&(e="change"),D(this.$ranges,e,this.onChangeInputRange),D(this.$ranges,"mouseenter",this.onMouseEnterLeave),D(this.$ranges,"mouseleave",this.onMouseEnterLeave),D(this.$ranges,"focus",this.onFocus),D(this.$ranges,"mousedown",this.onFocus),D(this.$ranges,"blur",this.onBlur)}createElement(){this.$el=n({className:u("air-datepicker-time",{"-am-pm-":this.dp.ampm})})}destroy(){this.dp.off(i.eventChangeSelectedDate,this.onChangeSelectedDate),this.dp.off(i.eventChangeLastSelectedDate,this.onChangeLastSelectedDate),this.$el.parentNode.removeChild(this.$el)}buildHtml(){let{ampm:e,hours:t,displayHours:i,minutes:s,minHours:a,minMinutes:n,maxHours:r,maxMinutes:h,dayPeriod:o,opts:{hoursStep:l,minutesStep:c}}=this;this.$el.innerHTML=`<div class="air-datepicker-time--current">   <span class="air-datepicker-time--current-hours">${d(i)}</span>   <span class="air-datepicker-time--current-colon">:</span>   <span class="air-datepicker-time--current-minutes">${d(s)}</span>   `+(e?`<span class='air-datepicker-time--current-ampm'>${o}</span>`:"")+'</div><div class="air-datepicker-time--sliders">   <div class="air-datepicker-time--row">'+`      <input type="range" name="hours" value="${t}" min="${a}" max="${r}" step="${l}"/>   </div>   <div class="air-datepicker-time--row">`+`      <input type="range" name="minutes" value="${s}" min="${n}" max="${h}" step="${c}"/>   </div></div>`}defineDOM(){let e=e=>a(e,this.$el);this.$ranges=this.$el.querySelectorAll('[type="range"]'),this.$hours=e('[name="hours"]'),this.$minutes=e('[name="minutes"]'),this.$hoursText=e(".air-datepicker-time--current-hours"),this.$minutesText=e(".air-datepicker-time--current-minutes"),this.$ampm=e(".air-datepicker-time--current-ampm")}setTime(e){this.setMinMaxTime(e),this.setCurrentTime(e)}addTimeToDate(e){e&&(e.setHours(this.hours),e.setMinutes(this.minutes))}setMinMaxTime(e){if(this.setMinMaxTimeFromOptions(),e){let{minDate:t,maxDate:i}=this.dp;t&&p(e,t)&&this.setMinTimeFromMinDate(t),i&&p(e,i)&&this.setMaxTimeFromMaxDate(i)}}setCurrentTime(e){let{hours:t,minutes:i}=e?o(e):this;this.hours=f(t,this.minHours,this.maxHours),this.minutes=f(i,this.minMinutes,this.maxMinutes)}setMinMaxTimeFromOptions(){let{minHours:e,minMinutes:t,maxHours:i,maxMinutes:s}=this.opts;this.minHours=f(e,0,23),this.minMinutes=f(t,0,59),this.maxHours=f(i,0,23),this.maxMinutes=f(s,0,59)}setMinTimeFromMinDate(e){let{lastSelectedDate:t}=this.dp;this.minHours=e.getHours(),t&&t.getHours()>e.getHours()?this.minMinutes=this.opts.minMinutes:this.minMinutes=e.getMinutes()}setMaxTimeFromMaxDate(e){let{lastSelectedDate:t}=this.dp;this.maxHours=e.getHours(),t&&t.getHours()<e.getHours()?this.maxMinutes=this.opts.maxMinutes:this.maxMinutes=e.getMinutes()}updateSliders(){r(this.$hours,{min:this.minHours,max:this.maxHours}).value=this.hours,r(this.$minutes,{min:this.minMinutes,max:this.maxMinutes}).value=this.minutes}updateText(){this.$hoursText.innerHTML=d(this.displayHours),this.$minutesText.innerHTML=d(this.minutes),this.ampm&&(this.$ampm.innerHTML=this.dayPeriod)}set hours(e){this._hours=e;let{hours:t,dayPeriod:i}=l(e);this.displayHours=this.ampm?t:e,this.dayPeriod=i}get hours(){return this._hours}render(){this.updateSliders(),this.updateText()}}function O(e,t,i){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var s=i.call(e,"string");if("object"!=typeof s)return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}class A{constructor(e){let{dp:t,opts:i}=e;O(this,"pressedKeys",new Set),O(this,"hotKeys",new Map([[[["Control","ArrowRight"],["Control","ArrowUp"]],e=>e.month++],[[["Control","ArrowLeft"],["Control","ArrowDown"]],e=>e.month--],[[["Shift","ArrowRight"],["Shift","ArrowUp"]],e=>e.year++],[[["Shift","ArrowLeft"],["Shift","ArrowDown"]],e=>e.year--],[[["Alt","ArrowRight"],["Alt","ArrowUp"]],e=>e.year+=10],[[["Alt","ArrowLeft"],["Alt","ArrowDown"]],e=>e.year-=10],[["Control","Shift","ArrowUp"],(e,t)=>t.up()]])),O(this,"handleHotKey",(e=>{let t=this.hotKeys.get(e),i=o(this.getInitialFocusDate());t(i,this.dp);let{year:s,month:a,date:n}=i,r=h(new Date(s,a));r<n&&(n=r);let l=this.dp.getClampedDate(new Date(s,a,n));this.dp.setFocusDate(l,{viewDateTransition:!0})})),O(this,"isHotKeyPressed",(()=>{let e=!1,t=this.pressedKeys.size,i=e=>this.pressedKeys.has(e);for(let[s]of this.hotKeys){if(e)break;if(Array.isArray(s[0]))s.forEach((a=>{e||t!==a.length||(e=a.every(i)&&s)}));else{if(t!==s.length)continue;e=s.every(i)&&s}}return e})),O(this,"isArrow",(e=>e>=37&&e<=40)),O(this,"onKeyDown",(e=>{let{key:t,which:i}=e,{dp:s,dp:{focusDate:a},opts:n}=this;this.registerKey(t);let r=this.isHotKeyPressed();if(r)return e.preventDefault(),void this.handleHotKey(r);if(this.isArrow(i))return e.preventDefault(),void this.focusNextCell(t);if("Enter"===t){if(s.currentView!==n.minView)return void s.down();if(a){let e=s._checkIfDateIsSelected(a);return void(e?s._handleAlreadySelectedDates(e,a):s.selectDate(a))}}"Escape"===t&&this.dp.hide()})),O(this,"onKeyUp",(e=>{this.removeKey(e.key)})),this.dp=t,this.opts=i,this.init()}init(){this.bindKeyboardEvents()}bindKeyboardEvents(){let{$el:e}=this.dp;e.addEventListener("keydown",this.onKeyDown),e.addEventListener("keyup",this.onKeyUp)}destroy(){let{$el:e}=this.dp;e.removeEventListener("keydown",this.onKeyDown),e.removeEventListener("keyup",this.onKeyUp),this.hotKeys=null,this.pressedKeys=null}getInitialFocusDate(){let{focusDate:e,currentView:t,selectedDates:s,parsedViewDate:{year:a,month:n}}=this.dp,r=e||s[s.length-1];if(!r)switch(t){case i.days:r=new Date(a,n,(new Date).getDate());break;case i.months:r=new Date(a,n,1);break;case i.years:r=new Date(a,0,1)}return r}focusNextCell(e){let t=this.getInitialFocusDate(),{currentView:s}=this.dp,{days:a,months:n,years:r}=i,h=o(t),l=h.year,d=h.month,c=h.date;switch(e){case"ArrowLeft":s===a&&(c-=1),s===n&&(d-=1),s===r&&(l-=1);break;case"ArrowUp":s===a&&(c-=7),s===n&&(d-=3),s===r&&(l-=4);break;case"ArrowRight":s===a&&(c+=1),s===n&&(d+=1),s===r&&(l+=1);break;case"ArrowDown":s===a&&(c+=7),s===n&&(d+=3),s===r&&(l+=4)}let u=this.dp.getClampedDate(new Date(l,d,c));this.dp.setFocusDate(u,{viewDateTransition:!0})}registerKey(e){this.pressedKeys.add(e)}removeKey(e){this.pressedKeys.delete(e)}}let N={on(e,t){this.__events||(this.__events={}),this.__events[e]?this.__events[e].push(t):this.__events[e]=[t]},off(e,t){this.__events&&this.__events[e]&&(this.__events[e]=this.__events[e].filter((e=>e!==t)))},removeAllEvents(){this.__events={}},trigger(e){for(var t=arguments.length,i=new Array(t>1?t-1:0),s=1;s<t;s++)i[s-1]=arguments[s];this.__events&&this.__events[e]&&this.__events[e].forEach((e=>{e(...i)}))}};function I(e,t,i){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var s=i.call(e,"string");if("object"!=typeof s)return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}let P="",j="",R=!1;class B{static buildGlobalContainer(e){R=!0,P=n({className:e,id:e}),a("body").appendChild(P)}constructor(e,t){var r=this;if(I(this,"viewIndexes",[i.days,i.months,i.years]),I(this,"next",(()=>{let{year:e,month:t}=this.parsedViewDate;switch(this.currentView){case i.days:this.setViewDate(new Date(e,t+1,1));break;case i.months:this.setViewDate(new Date(e+1,t,1));break;case i.years:this.setViewDate(new Date(e+10,0,1))}})),I(this,"prev",(()=>{let{year:e,month:t}=this.parsedViewDate;switch(this.currentView){case i.days:this.setViewDate(new Date(e,t-1,1));break;case i.months:this.setViewDate(new Date(e-1,t,1));break;case i.years:this.setViewDate(new Date(e-10,0,1))}})),I(this,"_finishHide",(()=>{this.hideAnimation=!1,this._destroyComponents(),this.$container.removeChild(this.$datepicker)})),I(this,"setPosition",(function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if("function"==typeof(e=e||r.opts.position))return void(r.customHide=e({$datepicker:r.$datepicker,$target:r.$el,$pointer:r.$pointer,isViewChange:t,done:r._finishHide}));let i,s,{isMobile:a}=r.opts,n=r.$el.getBoundingClientRect(),h=r.$el.getBoundingClientRect(),o=r.$datepicker.offsetParent,l=r.$el.offsetParent,d=r.$datepicker.getBoundingClientRect(),c=e.split(" "),u=window.scrollY,p=window.scrollX,m=r.opts.offset,v=c[0],g=c[1];if(a)r.$datepicker.style.cssText="left: 50%; top: 50%";else{if(o===l&&o!==document.body&&(h={top:r.$el.offsetTop,left:r.$el.offsetLeft,width:n.width,height:r.$el.offsetHeight},u=0,p=0),o!==l&&o!==document.body){let e=o.getBoundingClientRect();h={top:n.top-e.top,left:n.left-e.left,width:n.width,height:n.height},u=0,p=0}switch(v){case"top":i=h.top-d.height-m;break;case"right":s=h.left+h.width+m;break;case"bottom":i=h.top+h.height+m;break;case"left":s=h.left-d.width-m}switch(g){case"top":i=h.top;break;case"right":s=h.left+h.width-d.width;break;case"bottom":i=h.top+h.height-d.height;break;case"left":s=h.left;break;case"center":/left|right/.test(v)?i=h.top+h.height/2-d.height/2:s=h.left+h.width/2-d.width/2}r.$datepicker.style.cssText=`left: ${s+p}px; top: ${i+u}px`}})),I(this,"_setInputValue",(()=>{let{opts:e,$altField:t,locale:{dateFormat:i}}=this,{altFieldDateFormat:s,altField:a}=e;a&&t&&(t.value=this._getInputValue(s)),this.$el.value=this._getInputValue(i)})),I(this,"_getInputValue",(e=>{let{selectedDates:t,opts:i}=this,{multipleDates:s,multipleDatesSeparator:a}=i;if(!t.length)return"";let n="function"==typeof e,r=n?e(s?t:t[0]):t.map((t=>this.formatDate(t,e)));return r=n?r:r.join(a),r})),I(this,"_checkIfDateIsSelected",(function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i.days,s=!1;return r.selectedDates.some((i=>{let a=p(e,i,t);return s=a&&i,a})),s})),I(this,"_scheduleCallAfterTransition",(e=>{this._cancelScheduledCall(),e&&e(!1),this._onTransitionEnd=()=>{e&&e(!0)},this.$datepicker.addEventListener("transitionend",this._onTransitionEnd,{once:!0})})),I(this,"_cancelScheduledCall",(()=>{this.$datepicker.removeEventListener("transitionend",this._onTransitionEnd)})),I(this,"setViewDate",(e=>{if(!((e=b(e))instanceof Date))return;if(p(e,this.viewDate))return;let t=this.viewDate;this.viewDate=e;let{onChangeViewDate:s}=this.opts;if(s){let{month:e,year:t}=this.parsedViewDate;s({month:e,year:t,decade:this.curDecade})}this.trigger(i.eventChangeViewDate,e,t)})),I(this,"setFocusDate",(function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};(!e||(e=b(e))instanceof Date)&&(r.focusDate=e,r.opts.range&&e&&r._handleRangeOnFocus(),r.trigger(i.eventChangeFocusDate,e,t))})),I(this,"setCurrentView",(e=>{if(this.viewIndexes.includes(e)){if(this.currentView=e,this.elIsInput&&this.visible&&this.setPosition(void 0,!0),this.trigger(i.eventChangeCurrentView,e),!this.views[e]){let t=this.views[e]=new T({dp:this,opts:this.opts,type:e});this.shouldUpdateDOM&&this.$content.appendChild(t.$el)}this.opts.onChangeView&&this.opts.onChangeView(e)}})),I(this,"_updateLastSelectedDate",(e=>{this.lastSelectedDate=e,this.trigger(i.eventChangeLastSelectedDate,e)})),I(this,"destroy",(()=>{let{showEvent:e,isMobile:t}=this.opts,i=this.$datepicker.parentNode;i&&i.removeChild(this.$datepicker),this.$el.removeEventListener(e,this._onFocus),this.$el.removeEventListener("blur",this._onBlur),window.removeEventListener("resize",this._onResize),t&&this._removeMobileAttributes(),this.keyboardNav&&this.keyboardNav.destroy(),this.views=null,this.nav=null,this.$datepicker=null,this.opts=null,this.$customContainer=null,this.viewDate=null,this.focusDate=null,this.selectedDates=null,this.rangeDateFrom=null,this.rangeDateTo=null})),I(this,"update",(function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=w({},r.opts);w(r.opts,e);let{timepicker:s,buttons:a,range:n,selectedDates:h,isMobile:o}=r.opts,l=r.visible||r.treatAsInline;r._createMinMaxDates(),r._limitViewDateByMaxMinDates(),r._handleLocale(),!t.selectedDates&&h&&r.selectDate(h),e.view&&r.setCurrentView(e.view),r._setInputValue(),t.range&&!n?(r.rangeDateTo=!1,r.rangeDateFrom=!1):!t.range&&n&&r.selectedDates.length&&(r.rangeDateFrom=r.selectedDates[0],r.rangeDateTo=r.selectedDates[1]),t.timepicker&&!s?(l&&r.timepicker.destroy(),r.timepicker=!1,r.$timepicker.parentNode.removeChild(r.$timepicker)):!t.timepicker&&s&&r._addTimepicker(),!t.buttons&&a?r._addButtons():t.buttons&&!a?(r.buttons.destroy(),r.$buttons.parentNode.removeChild(r.$buttons)):l&&t.buttons&&a&&r.buttons.clearHtml().render(),!t.isMobile&&o?(r.treatAsInline||j||r._createMobileOverlay(),r._addMobileAttributes(),r.visible&&r._showMobileOverlay()):t.isMobile&&!o&&(r._removeMobileAttributes(),r.visible&&(j.classList.remove("-active-"),"function"!=typeof r.opts.position&&r.setPosition())),l&&(r.nav.update(),r.views[r.currentView].render(),r.currentView===i.days&&r.views[r.currentView].renderDayNames())})),I(this,"isOtherMonth",(e=>{let{month:t}=o(e);return t!==this.parsedViewDate.month})),I(this,"isOtherYear",(e=>{let{year:t}=o(e);return t!==this.parsedViewDate.year})),I(this,"isOtherDecade",(e=>{let{year:t}=o(e),[i,s]=c(this.viewDate);return t<i||t>s})),I(this,"_onChangeSelectedDate",(e=>{let{silent:t}=e;setTimeout((()=>{this._setInputValue(),this.opts.onSelect&&!t&&this._triggerOnSelect()}))})),I(this,"_onChangeFocusedDate",(function(e){let{viewDateTransition:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!e)return;let i=!1;t&&(i=r.isOtherMonth(e)||r.isOtherYear(e)||r.isOtherDecade(e)),i&&r.setViewDate(e),r.opts.onFocus&&r.opts.onFocus({datepicker:r,date:e})})),I(this,"_onChangeTime",(e=>{let{hours:t,minutes:i}=e,s=new Date,{lastSelectedDate:a,opts:{onSelect:n}}=this,r=a;a||(r=s);let h=this.getCell(r,this.currentViewSingular),o=h&&h.adpCell;o&&o.isDisabled||(r.setHours(t),r.setMinutes(i),a?(this._setInputValue(),n&&this._triggerOnSelect()):this.selectDate(r))})),I(this,"_onFocus",(e=>{this.visible||this.show()})),I(this,"_onBlur",(e=>{this.inFocus||!this.visible||this.opts.isMobile||this.hide()})),I(this,"_onMouseDown",(e=>{this.inFocus=!0})),I(this,"_onMouseUp",(e=>{this.inFocus=!1,this.$el.focus()})),I(this,"_onResize",(()=>{this.visible&&"function"!=typeof this.opts.position&&this.setPosition()})),I(this,"_onClickOverlay",(()=>{this.visible&&this.hide()})),I(this,"getViewDates",(function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i.days;return T.getDatesFunction(e)(r)})),I(this,"isWeekend",(e=>this.opts.weekends.includes(e))),I(this,"getClampedDate",(e=>{let{minDate:t,maxDate:i}=this,s=e;return i&&m(e,i)?s=i:t&&v(e,t)&&(s=t),s})),this.$el=a(e),!this.$el)return;this.$datepicker=n({className:"air-datepicker"}),this.opts=w({},s,t),this.$customContainer=!!this.opts.container&&a(this.opts.container),this.$altField=a(this.opts.altField||!1);let{view:h,startDate:l}=this.opts;l||(this.opts.startDate=new Date),"INPUT"===this.$el.nodeName&&(this.elIsInput=!0),this.inited=!1,this.visible=!1,this.viewDate=b(this.opts.startDate),this.focusDate=!1,this.initialReadonly=this.$el.getAttribute("readonly"),this.customHide=!1,this.currentView=h,this.selectedDates=[],this.views={},this.keys=[],this.rangeDateFrom="",this.rangeDateTo="",this.timepickerIsActive=!1,this.treatAsInline=this.opts.inline||!this.elIsInput,this.init()}init(){let{opts:e,treatAsInline:t,opts:{inline:i,isMobile:s,selectedDates:n,keyboardNav:r,onlyTimepicker:h}}=this,o=a("body");(!R||R&&P&&!o.contains(P))&&!i&&this.elIsInput&&!this.$customContainer&&B.buildGlobalContainer(B.defaultGlobalContainerId),!s||j||t||this._createMobileOverlay(),this._handleLocale(),this._bindSubEvents(),this._createMinMaxDates(),this._limitViewDateByMaxMinDates(),this.elIsInput&&(i||this._bindEvents(),r&&!h&&(this.keyboardNav=new A({dp:this,opts:e}))),n&&this.selectDate(n,{silent:!0}),this.opts.visible&&!t&&this.show(),s&&!t&&this.$el.setAttribute("readonly",!0),t&&this._createComponents()}_createMobileOverlay(){j=n({className:"air-datepicker-overlay"}),P.appendChild(j)}_createComponents(){let{opts:e,treatAsInline:t,opts:{inline:i,buttons:s,timepicker:a,position:n,classes:r,onlyTimepicker:h,isMobile:o}}=this;this._buildBaseHtml(),this.elIsInput&&(i||this._setPositionClasses(n)),!i&&this.elIsInput||this.$datepicker.classList.add("-inline-"),r&&this.$datepicker.classList.add(...r.split(" ")),h&&this.$datepicker.classList.add("-only-timepicker-"),o&&!t&&this._addMobileAttributes(),this.views[this.currentView]=new T({dp:this,type:this.currentView,opts:e}),this.nav=new V({dp:this,opts:e}),a&&this._addTimepicker(),s&&this._addButtons(),this.$content.appendChild(this.views[this.currentView].$el),this.$nav.appendChild(this.nav.$el)}_destroyComponents(){for(let e in this.views)this.views[e].destroy();this.views={},this.nav.destroy(),this.timepicker&&this.timepicker.destroy()}_addMobileAttributes(){j.addEventListener("click",this._onClickOverlay),this.$datepicker.classList.add("-is-mobile-"),this.$el.setAttribute("readonly",!0)}_removeMobileAttributes(){j.removeEventListener("click",this._onClickOverlay),this.$datepicker.classList.remove("-is-mobile-"),this.initialReadonly||""===this.initialReadonly||this.$el.removeAttribute("readonly")}_createMinMaxDates(){let{minDate:e,maxDate:t}=this.opts;this.minDate=!!e&&b(e),this.maxDate=!!t&&b(t)}_addTimepicker(){this.$timepicker=n({className:"air-datepicker--time"}),this.$datepicker.appendChild(this.$timepicker),this.timepicker=new L({dp:this,opts:this.opts}),this.$timepicker.appendChild(this.timepicker.$el)}_addButtons(){this.$buttons=n({className:"air-datepicker--buttons"}),this.$datepicker.appendChild(this.$buttons),this.buttons=new H({dp:this,opts:this.opts}),this.$buttons.appendChild(this.buttons.$el)}_bindSubEvents(){this.on(i.eventChangeSelectedDate,this._onChangeSelectedDate),this.on(i.eventChangeFocusDate,this._onChangeFocusedDate),this.on(i.eventChangeTime,this._onChangeTime)}_buildBaseHtml(){let{inline:e}=this.opts;var t,i;this.elIsInput?e?(t=this.$datepicker,(i=this.$el).parentNode.insertBefore(t,i.nextSibling)):this.$container.appendChild(this.$datepicker):this.$el.appendChild(this.$datepicker),this.$datepicker.innerHTML='<i class="air-datepicker--pointer"></i><div class="air-datepicker--navigation"></div><div class="air-datepicker--content"></div>',this.$content=a(".air-datepicker--content",this.$datepicker),this.$pointer=a(".air-datepicker--pointer",this.$datepicker),this.$nav=a(".air-datepicker--navigation",this.$datepicker)}_handleLocale(){let{locale:e,dateFormat:t,firstDay:i,timepicker:s,onlyTimepicker:a,timeFormat:n,dateTimeSeparator:r}=this.opts;var h;this.locale=(h=e,JSON.parse(JSON.stringify(h))),t&&(this.locale.dateFormat=t),void 0!==n&&""!==n&&(this.locale.timeFormat=n);let{timeFormat:o}=this.locale;if(""!==i&&(this.locale.firstDay=i),s&&"function"!=typeof t){let e=o?r:"";this.locale.dateFormat=[this.locale.dateFormat,o||""].join(e)}a&&"function"!=typeof t&&(this.locale.dateFormat=this.locale.timeFormat)}_setPositionClasses(e){if("function"==typeof e)return void this.$datepicker.classList.add("-custom-position-");let t=(e=e.split(" "))[0],i=`air-datepicker -${t}-${e[1]}- -from-${t}-`;this.$datepicker.classList.add(...i.split(" "))}_bindEvents(){this.$el.addEventListener(this.opts.showEvent,this._onFocus),this.$el.addEventListener("blur",this._onBlur),this.$datepicker.addEventListener("mousedown",this._onMouseDown),this.$datepicker.addEventListener("mouseup",this._onMouseUp),window.addEventListener("resize",this._onResize)}_limitViewDateByMaxMinDates(){let{viewDate:e,minDate:t,maxDate:i}=this;i&&m(e,i)&&this.setViewDate(i),t&&v(e,t)&&this.setViewDate(t)}formatDate(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.viewDate,t=arguments.length>1?arguments[1]:void 0;if(e=b(e),!(e instanceof Date))return;let i=t,s=this.locale,a=o(e),n=a.dayPeriod,r=c(e),h=B.replacer,l={T:e.getTime(),m:a.minutes,mm:a.fullMinutes,h:a.hours12,hh:a.fullHours12,H:a.hours,HH:a.fullHours,aa:n,AA:n.toUpperCase(),E:s.daysShort[a.day],EEEE:s.days[a.day],d:a.date,dd:a.fullDate,M:a.month+1,MM:a.fullMonth,MMM:s.monthsShort[a.month],MMMM:s.months[a.month],yy:a.year.toString().slice(-2),yyyy:a.year,yyyy1:r[0],yyyy2:r[1]};for(let[e,t]of Object.entries(l))i=h(i,k(e),t);return i}down(e){this._handleUpDownActions(e,"down")}up(e){this._handleUpDownActions(e,"up")}selectDate(e){let t,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{currentView:a,parsedViewDate:n,selectedDates:r}=this,{updateTime:h}=s,{moveToOtherMonthsOnSelect:o,moveToOtherYearsOnSelect:l,multipleDates:d,range:c,autoClose:u,onBeforeSelect:p}=this.opts,v=r.length;if(Array.isArray(e))return e.forEach((e=>{this.selectDate(e,s)})),new Promise((e=>{setTimeout(e)}));if((e=b(e))instanceof Date){if(p&&!p({date:e,datepicker:this}))return Promise.resolve();if(a===i.days&&e.getMonth()!==n.month&&o&&(t=new Date(e.getFullYear(),e.getMonth(),1)),a===i.years&&e.getFullYear()!==n.year&&l&&(t=new Date(e.getFullYear(),0,1)),t&&this.setViewDate(t),d&&!c){if(v===d)return;this._checkIfDateIsSelected(e)||r.push(e)}else if(c)switch(v){case 1:r.push(e),this.rangeDateTo||(this.rangeDateTo=e),m(this.rangeDateFrom,this.rangeDateTo)&&(this.rangeDateTo=this.rangeDateFrom,this.rangeDateFrom=e),this.selectedDates=[this.rangeDateFrom,this.rangeDateTo];break;case 2:this.selectedDates=[e],this.rangeDateFrom=e,this.rangeDateTo="";break;default:this.selectedDates=[e],this.rangeDateFrom=e}else this.selectedDates=[e];return this.trigger(i.eventChangeSelectedDate,{action:i.actionSelectDate,silent:null==s?void 0:s.silent,date:e,updateTime:h}),this._updateLastSelectedDate(e),u&&!this.timepickerIsActive&&this.visible&&(d||c?c&&1===v&&this.hide():this.hide()),new Promise((e=>{setTimeout(e)}))}}unselectDate(e){let t=this.selectedDates,s=this;if((e=b(e))instanceof Date)return t.some(((a,n)=>{if(p(a,e))return t.splice(n,1),s.selectedDates.length?s._updateLastSelectedDate(s.selectedDates[s.selectedDates.length-1]):(s.rangeDateFrom="",s.rangeDateTo="",s._updateLastSelectedDate(!1)),this.trigger(i.eventChangeSelectedDate,{action:i.actionUnselectDate,date:e}),!0}))}replaceDate(e,t){let s=this.selectedDates.find((t=>p(t,e,this.currentView))),a=this.selectedDates.indexOf(s);a<0||p(this.selectedDates[a],t,this.currentView)||(this.selectedDates[a]=t,this.trigger(i.eventChangeSelectedDate,{action:i.actionSelectDate,date:t,updateTime:!0}),this._updateLastSelectedDate(t))}clear(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.selectedDates=[],this.rangeDateFrom=!1,this.rangeDateTo=!1,this.lastSelectedDate=!1,this.trigger(i.eventChangeSelectedDate,{action:i.actionUnselectDate,silent:e.silent}),new Promise((e=>{setTimeout(e)}))}show(){let{onShow:e,isMobile:t}=this.opts;this._cancelScheduledCall(),this.visible||this.hideAnimation||this._createComponents(),this.setPosition(this.opts.position),this.$datepicker.classList.add("-active-"),this.visible=!0,e&&this._scheduleCallAfterTransition(e),t&&this._showMobileOverlay()}hide(){let{onHide:e,isMobile:t}=this.opts,i=this._hasTransition();this.visible=!1,this.hideAnimation=!0,this.$datepicker.classList.remove("-active-"),this.customHide&&this.customHide(),this.elIsInput&&this.$el.blur(),this._scheduleCallAfterTransition((t=>{!this.customHide&&(t&&i||!t&&!i)&&this._finishHide(),e&&e(t)})),t&&j.classList.remove("-active-")}_triggerOnSelect(){let e=[],t=[],{selectedDates:i,locale:s,opts:{onSelect:a,multipleDates:n,range:r}}=this,h=n||r,o="function"==typeof s.dateFormat;i.length&&(e=i.map(g),t=o?n?s.dateFormat(e):e.map((e=>s.dateFormat(e))):e.map((e=>this.formatDate(e,s.dateFormat)))),a({date:h?e:e[0],formattedDate:h?t:t[0],datepicker:this})}_handleAlreadySelectedDates(e,t){const{range:i,toggleSelected:s}=this.opts;let a="function"==typeof s?s({datepicker:this,date:t}):s;i&&(a||2!==this.selectedDates.length&&this.selectDate(t)),a?this.unselectDate(t):this._updateLastSelectedDate(e)}_handleUpDownActions(e,t){if(!((e=b(e||this.focusDate||this.viewDate))instanceof Date))return;let i="up"===t?this.viewIndex+1:this.viewIndex-1;i>2&&(i=2),i<0&&(i=0),this.setViewDate(new Date(e.getFullYear(),e.getMonth(),1)),this.setCurrentView(this.viewIndexes[i])}_handleRangeOnFocus(){1===this.selectedDates.length&&(m(this.selectedDates[0],this.focusDate)?(this.rangeDateTo=this.selectedDates[0],this.rangeDateFrom=this.focusDate):(this.rangeDateTo=this.focusDate,this.rangeDateFrom=this.selectedDates[0]))}getCell(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i.day;if(!((e=b(e))instanceof Date))return;let{year:s,month:a,date:n}=o(e),r=`[data-year="${s}"]`,h=`[data-month="${a}"]`,l={[i.day]:`${r}${h}[data-date="${n}"]`,[i.month]:`${r}${h}`,[i.year]:`${r}`};return this.views[this.currentView].$el.querySelector(l[t])}_showMobileOverlay(){j.classList.add("-active-")}_hasTransition(){return window.getComputedStyle(this.$datepicker).getPropertyValue("transition-duration").split(", ").reduce(((e,t)=>parseFloat(t)+e),0)>0}get shouldUpdateDOM(){return this.visible||this.treatAsInline}get parsedViewDate(){return o(this.viewDate)}get currentViewSingular(){return this.currentView.slice(0,-1)}get curDecade(){return c(this.viewDate)}get viewIndex(){return this.viewIndexes.indexOf(this.currentView)}get isFinalView(){return this.currentView===i.years}get hasSelectedDates(){return this.selectedDates.length>0}get isMinViewReached(){return this.currentView===this.opts.minView||this.currentView===i.days}get $container(){return this.$customContainer||P}static replacer(e,t,i){return e.replace(t,(function(e,t,s,a){return t+i+a}))}}var K;return I(B,"defaults",s),I(B,"version","3.4.0"),I(B,"defaultGlobalContainerId","air-datepicker-global-container"),K=B.prototype,Object.assign(K,N),t.default}()}));
/**
 * Skipped minification because the original files appears to be already minified.
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!(function (t, n) {
	"object" == typeof exports && "undefined" != typeof module
		? (module.exports = n())
		: "function" == typeof define && define.amd
		? define(n)
		: ((t = t || self).barba = n());
})(this, function () {
	function t(t, n) {
		for (var r = 0; r < n.length; r++) {
			var e = n[r];
			(e.enumerable = e.enumerable || !1),
				(e.configurable = !0),
				"value" in e && (e.writable = !0),
				Object.defineProperty(t, e.key, e);
		}
	}
	function n(n, r, e) {
		return r && t(n.prototype, r), e && t(n, e), n;
	}
	function r() {
		return (r =
			Object.assign ||
			function (t) {
				for (var n = 1; n < arguments.length; n++) {
					var r = arguments[n];
					for (var e in r)
						Object.prototype.hasOwnProperty.call(r, e) &&
							(t[e] = r[e]);
				}
				return t;
			}).apply(this, arguments);
	}
	function e(t, n) {
		(t.prototype = Object.create(n.prototype)),
			(t.prototype.constructor = t),
			(t.__proto__ = n);
	}
	function i(t) {
		return (i = Object.setPrototypeOf
			? Object.getPrototypeOf
			: function (t) {
					return t.__proto__ || Object.getPrototypeOf(t);
			  })(t);
	}
	function o(t, n) {
		return (o =
			Object.setPrototypeOf ||
			function (t, n) {
				return (t.__proto__ = n), t;
			})(t, n);
	}
	function u(t, n, r) {
		return (u = (function () {
			if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
			if (Reflect.construct.sham) return !1;
			if ("function" == typeof Proxy) return !0;
			try {
				return (
					Date.prototype.toString.call(
						Reflect.construct(Date, [], function () {})
					),
					!0
				);
			} catch (t) {
				return !1;
			}
		})()
			? Reflect.construct
			: function (t, n, r) {
					var e = [null];
					e.push.apply(e, n);
					var i = new (Function.bind.apply(t, e))();
					return r && o(i, r.prototype), i;
			  }).apply(null, arguments);
	}
	function f(t) {
		var n = "function" == typeof Map ? new Map() : void 0;
		return (f = function (t) {
			if (
				null === t ||
				-1 === Function.toString.call(t).indexOf("[native code]")
			)
				return t;
			if ("function" != typeof t)
				throw new TypeError(
					"Super expression must either be null or a function"
				);
			if (void 0 !== n) {
				if (n.has(t)) return n.get(t);
				n.set(t, r);
			}
			function r() {
				return u(t, arguments, i(this).constructor);
			}
			return (
				(r.prototype = Object.create(t.prototype, {
					constructor: {
						value: r,
						enumerable: !1,
						writable: !0,
						configurable: !0,
					},
				})),
				o(r, t)
			);
		})(t);
	}
	function s(t, n) {
		try {
			var r = t();
		} catch (t) {
			return n(t);
		}
		return r && r.then ? r.then(void 0, n) : r;
	}
	"undefined" != typeof Symbol &&
		(Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))),
		"undefined" != typeof Symbol &&
			(Symbol.asyncIterator ||
				(Symbol.asyncIterator = Symbol("Symbol.asyncIterator")));
	var c,
		a = "2.9.7",
		h = function () {};
	!(function (t) {
		(t[(t.off = 0)] = "off"),
			(t[(t.error = 1)] = "error"),
			(t[(t.warning = 2)] = "warning"),
			(t[(t.info = 3)] = "info"),
			(t[(t.debug = 4)] = "debug");
	})(c || (c = {}));
	var v = c.off,
		l = (function () {
			function t(t) {
				this.t = t;
			}
			(t.getLevel = function () {
				return v;
			}),
				(t.setLevel = function (t) {
					return (v = c[t]);
				});
			var n = t.prototype;
			return (
				(n.error = function () {
					for (
						var t = arguments.length, n = new Array(t), r = 0;
						r < t;
						r++
					)
						n[r] = arguments[r];
					this.i(console.error, c.error, n);
				}),
				(n.warn = function () {
					for (
						var t = arguments.length, n = new Array(t), r = 0;
						r < t;
						r++
					)
						n[r] = arguments[r];
					this.i(console.warn, c.warning, n);
				}),
				(n.info = function () {
					for (
						var t = arguments.length, n = new Array(t), r = 0;
						r < t;
						r++
					)
						n[r] = arguments[r];
					this.i(console.info, c.info, n);
				}),
				(n.debug = function () {
					for (
						var t = arguments.length, n = new Array(t), r = 0;
						r < t;
						r++
					)
						n[r] = arguments[r];
					this.i(console.log, c.debug, n);
				}),
				(n.i = function (n, r, e) {
					r <= t.getLevel() &&
						n.apply(console, ["[" + this.t + "] "].concat(e));
				}),
				t
			);
		})(),
		d = O,
		m = E,
		p = g,
		w = x,
		b = T,
		y = "/",
		P = new RegExp(
			[
				"(\\\\.)",
				"(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?",
			].join("|"),
			"g"
		);
	function g(t, n) {
		for (
			var r,
				e = [],
				i = 0,
				o = 0,
				u = "",
				f = (n && n.delimiter) || y,
				s = (n && n.whitelist) || void 0,
				c = !1;
			null !== (r = P.exec(t));

		) {
			var a = r[0],
				h = r[1],
				v = r.index;
			if (((u += t.slice(o, v)), (o = v + a.length), h))
				(u += h[1]), (c = !0);
			else {
				var l = "",
					d = r[2],
					m = r[3],
					p = r[4],
					w = r[5];
				if (!c && u.length) {
					var b = u.length - 1,
						g = u[b];
					(!s || s.indexOf(g) > -1) && ((l = g), (u = u.slice(0, b)));
				}
				u && (e.push(u), (u = ""), (c = !1));
				var E = m || p,
					x = l || f;
				e.push({
					name: d || i++,
					prefix: l,
					delimiter: x,
					optional: "?" === w || "*" === w,
					repeat: "+" === w || "*" === w,
					pattern: E ? A(E) : "[^" + k(x === f ? x : x + f) + "]+?",
				});
			}
		}
		return (u || o < t.length) && e.push(u + t.substr(o)), e;
	}
	function E(t, n) {
		return function (r, e) {
			var i = t.exec(r);
			if (!i) return !1;
			for (
				var o = i[0],
					u = i.index,
					f = {},
					s = (e && e.decode) || decodeURIComponent,
					c = 1;
				c < i.length;
				c++
			)
				if (void 0 !== i[c]) {
					var a = n[c - 1];
					f[a.name] = a.repeat
						? i[c].split(a.delimiter).map(function (t) {
								return s(t, a);
						  })
						: s(i[c], a);
				}
			return { path: o, index: u, params: f };
		};
	}
	function x(t, n) {
		for (var r = new Array(t.length), e = 0; e < t.length; e++)
			"object" == typeof t[e] &&
				(r[e] = new RegExp("^(?:" + t[e].pattern + ")$", R(n)));
		return function (n, e) {
			for (
				var i = "",
					o = (e && e.encode) || encodeURIComponent,
					u = !e || !1 !== e.validate,
					f = 0;
				f < t.length;
				f++
			) {
				var s = t[f];
				if ("string" != typeof s) {
					var c,
						a = n ? n[s.name] : void 0;
					if (Array.isArray(a)) {
						if (!s.repeat)
							throw new TypeError(
								'Expected "' +
									s.name +
									'" to not repeat, but got array'
							);
						if (0 === a.length) {
							if (s.optional) continue;
							throw new TypeError(
								'Expected "' + s.name + '" to not be empty'
							);
						}
						for (var h = 0; h < a.length; h++) {
							if (((c = o(a[h], s)), u && !r[f].test(c)))
								throw new TypeError(
									'Expected all "' +
										s.name +
										'" to match "' +
										s.pattern +
										'"'
								);
							i += (0 === h ? s.prefix : s.delimiter) + c;
						}
					} else if (
						"string" != typeof a &&
						"number" != typeof a &&
						"boolean" != typeof a
					) {
						if (!s.optional)
							throw new TypeError(
								'Expected "' +
									s.name +
									'" to be ' +
									(s.repeat ? "an array" : "a string")
							);
					} else {
						if (((c = o(String(a), s)), u && !r[f].test(c)))
							throw new TypeError(
								'Expected "' +
									s.name +
									'" to match "' +
									s.pattern +
									'", but got "' +
									c +
									'"'
							);
						i += s.prefix + c;
					}
				} else i += s;
			}
			return i;
		};
	}
	function k(t) {
		return t.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
	}
	function A(t) {
		return t.replace(/([=!:$/()])/g, "\\$1");
	}
	function R(t) {
		return t && t.sensitive ? "" : "i";
	}
	function T(t, n, r) {
		for (
			var e = (r = r || {}).strict,
				i = !1 !== r.start,
				o = !1 !== r.end,
				u = r.delimiter || y,
				f = []
					.concat(r.endsWith || [])
					.map(k)
					.concat("$")
					.join("|"),
				s = i ? "^" : "",
				c = 0;
			c < t.length;
			c++
		) {
			var a = t[c];
			if ("string" == typeof a) s += k(a);
			else {
				var h = a.repeat
					? "(?:" +
					  a.pattern +
					  ")(?:" +
					  k(a.delimiter) +
					  "(?:" +
					  a.pattern +
					  "))*"
					: a.pattern;
				n && n.push(a),
					(s += a.optional
						? a.prefix
							? "(?:" + k(a.prefix) + "(" + h + "))?"
							: "(" + h + ")?"
						: k(a.prefix) + "(" + h + ")");
			}
		}
		if (o)
			e || (s += "(?:" + k(u) + ")?"),
				(s += "$" === f ? "$" : "(?=" + f + ")");
		else {
			var v = t[t.length - 1],
				l = "string" == typeof v ? v[v.length - 1] === u : void 0 === v;
			e || (s += "(?:" + k(u) + "(?=" + f + "))?"),
				l || (s += "(?=" + k(u) + "|" + f + ")");
		}
		return new RegExp(s, R(r));
	}
	function O(t, n, r) {
		return t instanceof RegExp
			? (function (t, n) {
					if (!n) return t;
					var r = t.source.match(/\((?!\?)/g);
					if (r)
						for (var e = 0; e < r.length; e++)
							n.push({
								name: e,
								prefix: null,
								delimiter: null,
								optional: !1,
								repeat: !1,
								pattern: null,
							});
					return t;
			  })(t, n)
			: Array.isArray(t)
			? (function (t, n, r) {
					for (var e = [], i = 0; i < t.length; i++)
						e.push(O(t[i], n, r).source);
					return new RegExp("(?:" + e.join("|") + ")", R(r));
			  })(t, n, r)
			: (function (t, n, r) {
					return T(g(t, r), n, r);
			  })(t, n, r);
	}
	(d.match = function (t, n) {
		var r = [];
		return E(O(t, r, n), r);
	}),
		(d.regexpToFunction = m),
		(d.parse = p),
		(d.compile = function (t, n) {
			return x(g(t, n), n);
		}),
		(d.tokensToFunction = w),
		(d.tokensToRegExp = b);
	var S = {
			container: "container",
			history: "history",
			namespace: "namespace",
			prefix: "data-barba",
			prevent: "prevent",
			wrapper: "wrapper",
		},
		j = new ((function () {
			function t() {
				(this.o = S), (this.u = new DOMParser());
			}
			var n = t.prototype;
			return (
				(n.toString = function (t) {
					return t.outerHTML;
				}),
				(n.toDocument = function (t) {
					return this.u.parseFromString(t, "text/html");
				}),
				(n.toElement = function (t) {
					var n = document.createElement("div");
					return (n.innerHTML = t), n;
				}),
				(n.getHtml = function (t) {
					return (
						void 0 === t && (t = document),
						this.toString(t.documentElement)
					);
				}),
				(n.getWrapper = function (t) {
					return (
						void 0 === t && (t = document),
						t.querySelector(
							"[" + this.o.prefix + '="' + this.o.wrapper + '"]'
						)
					);
				}),
				(n.getContainer = function (t) {
					return (
						void 0 === t && (t = document),
						t.querySelector(
							"[" + this.o.prefix + '="' + this.o.container + '"]'
						)
					);
				}),
				(n.removeContainer = function (t) {
					document.body.contains(t) && t.parentNode.removeChild(t);
				}),
				(n.addContainer = function (t, n) {
					var r = this.getContainer();
					r ? this.s(t, r) : n.appendChild(t);
				}),
				(n.getNamespace = function (t) {
					void 0 === t && (t = document);
					var n = t.querySelector(
						"[" + this.o.prefix + "-" + this.o.namespace + "]"
					);
					return n
						? n.getAttribute(this.o.prefix + "-" + this.o.namespace)
						: null;
				}),
				(n.getHref = function (t) {
					if (t.tagName && "a" === t.tagName.toLowerCase()) {
						if ("string" == typeof t.href) return t.href;
						var n =
							t.getAttribute("href") ||
							t.getAttribute("xlink:href");
						if (n) return this.resolveUrl(n.baseVal || n);
					}
					return null;
				}),
				(n.resolveUrl = function () {
					for (
						var t = arguments.length, n = new Array(t), r = 0;
						r < t;
						r++
					)
						n[r] = arguments[r];
					var e = n.length;
					if (0 === e)
						throw new Error(
							"resolveUrl requires at least one argument; got none."
						);
					var i = document.createElement("base");
					if (((i.href = arguments[0]), 1 === e)) return i.href;
					var o = document.getElementsByTagName("head")[0];
					o.insertBefore(i, o.firstChild);
					for (
						var u, f = document.createElement("a"), s = 1;
						s < e;
						s++
					)
						(f.href = arguments[s]), (i.href = u = f.href);
					return o.removeChild(i), u;
				}),
				(n.s = function (t, n) {
					n.parentNode.insertBefore(t, n.nextSibling);
				}),
				t
			);
		})())(),
		M = new ((function () {
			function t() {
				(this.h = []), (this.v = -1);
			}
			var e = t.prototype;
			return (
				(e.init = function (t, n) {
					this.l = "barba";
					var r = {
						ns: n,
						scroll: { x: window.scrollX, y: window.scrollY },
						url: t,
					};
					this.h.push(r), (this.v = 0);
					var e = {
						from: this.l,
						index: 0,
						states: [].concat(this.h),
					};
					window.history && window.history.replaceState(e, "", t);
				}),
				(e.change = function (t, n, r) {
					if (r && r.state) {
						var e = r.state,
							i = e.index;
						(n = this.m(this.v - i)),
							this.replace(e.states),
							(this.v = i);
					} else this.add(t, n);
					return n;
				}),
				(e.add = function (t, n) {
					var r = this.size,
						e = this.p(n),
						i = {
							ns: "tmp",
							scroll: { x: window.scrollX, y: window.scrollY },
							url: t,
						};
					this.h.push(i), (this.v = r);
					var o = {
						from: this.l,
						index: r,
						states: [].concat(this.h),
					};
					switch (e) {
						case "push":
							window.history &&
								window.history.pushState(o, "", t);
							break;
						case "replace":
							window.history &&
								window.history.replaceState(o, "", t);
					}
				}),
				(e.update = function (t, n) {
					var e = n || this.v,
						i = r({}, this.get(e), {}, t);
					this.set(e, i);
				}),
				(e.remove = function (t) {
					t ? this.h.splice(t, 1) : this.h.pop(), this.v--;
				}),
				(e.clear = function () {
					(this.h = []), (this.v = -1);
				}),
				(e.replace = function (t) {
					this.h = t;
				}),
				(e.get = function (t) {
					return this.h[t];
				}),
				(e.set = function (t, n) {
					return (this.h[t] = n);
				}),
				(e.p = function (t) {
					var n = "push",
						r = t,
						e = S.prefix + "-" + S.history;
					return (
						r.hasAttribute &&
							r.hasAttribute(e) &&
							(n = r.getAttribute(e)),
						n
					);
				}),
				(e.m = function (t) {
					return Math.abs(t) > 1
						? t > 0
							? "forward"
							: "back"
						: 0 === t
						? "popstate"
						: t > 0
						? "back"
						: "forward";
				}),
				n(t, [
					{
						key: "current",
						get: function () {
							return this.h[this.v];
						},
					},
					{
						key: "state",
						get: function () {
							return this.h[this.h.length - 1];
						},
					},
					{
						key: "previous",
						get: function () {
							return this.v < 1 ? null : this.h[this.v - 1];
						},
					},
					{
						key: "size",
						get: function () {
							return this.h.length;
						},
					},
				]),
				t
			);
		})())(),
		L = function (t, n) {
			try {
				var r = (function () {
					if (!n.next.html)
						return Promise.resolve(t).then(function (t) {
							var r = n.next;
							if (t) {
								var e = j.toElement(t);
								(r.namespace = j.getNamespace(e)),
									(r.container = j.getContainer(e)),
									(r.html = t),
									M.update({ ns: r.namespace });
								var i = j.toDocument(t);
								document.title = i.title;
							}
						});
				})();
				return Promise.resolve(
					r && r.then ? r.then(function () {}) : void 0
				);
			} catch (t) {
				return Promise.reject(t);
			}
		},
		$ = d,
		_ = {
			__proto__: null,
			update: L,
			nextTick: function () {
				return new Promise(function (t) {
					window.requestAnimationFrame(t);
				});
			},
			pathToRegexp: $,
		},
		q = function () {
			return window.location.origin;
		},
		B = function (t) {
			return void 0 === t && (t = window.location.href), U(t).port;
		},
		U = function (t) {
			var n,
				r = t.match(/:\d+/);
			if (null === r)
				/^http/.test(t) && (n = 80), /^https/.test(t) && (n = 443);
			else {
				var e = r[0].substring(1);
				n = parseInt(e, 10);
			}
			var i,
				o = t.replace(q(), ""),
				u = {},
				f = o.indexOf("#");
			f >= 0 && ((i = o.slice(f + 1)), (o = o.slice(0, f)));
			var s = o.indexOf("?");
			return (
				s >= 0 && ((u = D(o.slice(s + 1))), (o = o.slice(0, s))),
				{ hash: i, path: o, port: n, query: u }
			);
		},
		D = function (t) {
			return t.split("&").reduce(function (t, n) {
				var r = n.split("=");
				return (t[r[0]] = r[1]), t;
			}, {});
		},
		F = function (t) {
			return (
				void 0 === t && (t = window.location.href),
				t.replace(/(\/#.*|\/|#.*)$/, "")
			);
		},
		H = {
			__proto__: null,
			getHref: function () {
				return window.location.href;
			},
			getOrigin: q,
			getPort: B,
			getPath: function (t) {
				return void 0 === t && (t = window.location.href), U(t).path;
			},
			parse: U,
			parseQuery: D,
			clean: F,
		};
	function I(t, n, r) {
		return (
			void 0 === n && (n = 2e3),
			new Promise(function (e, i) {
				var o = new XMLHttpRequest();
				(o.onreadystatechange = function () {
					if (o.readyState === XMLHttpRequest.DONE)
						if (200 === o.status) e(o.responseText);
						else if (o.status) {
							var n = {
								status: o.status,
								statusText: o.statusText,
							};
							r(t, n), i(n);
						}
				}),
					(o.ontimeout = function () {
						var e = new Error("Timeout error [" + n + "]");
						r(t, e), i(e);
					}),
					(o.onerror = function () {
						var n = new Error("Fetch error");
						r(t, n), i(n);
					}),
					o.open("GET", t),
					(o.timeout = n),
					o.setRequestHeader(
						"Accept",
						"text/html,application/xhtml+xml,application/xml"
					),
					o.setRequestHeader("x-barba", "yes"),
					o.send();
			})
		);
	}
	var C = function (t) {
		return (
			!!t &&
			("object" == typeof t || "function" == typeof t) &&
			"function" == typeof t.then
		);
	};
	function N(t, n) {
		return (
			void 0 === n && (n = {}),
			function () {
				for (
					var r = arguments.length, e = new Array(r), i = 0;
					i < r;
					i++
				)
					e[i] = arguments[i];
				var o = !1,
					u = new Promise(function (r, i) {
						n.async = function () {
							return (
								(o = !0),
								function (t, n) {
									t ? i(t) : r(n);
								}
							);
						};
						var u = t.apply(n, e);
						o || (C(u) ? u.then(r, i) : r(u));
					});
				return u;
			}
		);
	}
	var X = new ((function (t) {
			function n() {
				var n;
				return (
					((n = t.call(this) || this).logger = new l("@barba/core")),
					(n.all = [
						"ready",
						"page",
						"reset",
						"currentAdded",
						"currentRemoved",
						"nextAdded",
						"nextRemoved",
						"beforeOnce",
						"once",
						"afterOnce",
						"before",
						"beforeLeave",
						"leave",
						"afterLeave",
						"beforeEnter",
						"enter",
						"afterEnter",
						"after",
					]),
					(n.registered = new Map()),
					n.init(),
					n
				);
			}
			e(n, t);
			var r = n.prototype;
			return (
				(r.init = function () {
					var t = this;
					this.registered.clear(),
						this.all.forEach(function (n) {
							t[n] ||
								(t[n] = function (r, e) {
									t.registered.has(n) ||
										t.registered.set(n, new Set()),
										t.registered
											.get(n)
											.add({ ctx: e || {}, fn: r });
								});
						});
				}),
				(r.do = function (t) {
					for (
						var n = this,
							r = arguments.length,
							e = new Array(r > 1 ? r - 1 : 0),
							i = 1;
						i < r;
						i++
					)
						e[i - 1] = arguments[i];
					if (this.registered.has(t)) {
						var o = Promise.resolve();
						return (
							this.registered.get(t).forEach(function (t) {
								o = o.then(function () {
									return N(t.fn, t.ctx).apply(void 0, e);
								});
							}),
							o.catch(function (r) {
								n.logger.debug("Hook error [" + t + "]"),
									n.logger.error(r);
							})
						);
					}
					return Promise.resolve();
				}),
				(r.clear = function () {
					var t = this;
					this.all.forEach(function (n) {
						delete t[n];
					}),
						this.init();
				}),
				(r.help = function () {
					this.logger.info("Available hooks: " + this.all.join(","));
					var t = [];
					this.registered.forEach(function (n, r) {
						return t.push(r);
					}),
						this.logger.info("Registered hooks: " + t.join(","));
				}),
				n
			);
		})(h))(),
		z = (function () {
			function t(t) {
				if (((this.P = []), "boolean" == typeof t)) this.g = t;
				else {
					var n = Array.isArray(t) ? t : [t];
					this.P = n.map(function (t) {
						return $(t);
					});
				}
			}
			return (
				(t.prototype.checkHref = function (t) {
					if ("boolean" == typeof this.g) return this.g;
					var n = U(t).path;
					return this.P.some(function (t) {
						return null !== t.exec(n);
					});
				}),
				t
			);
		})(),
		G = (function (t) {
			function n(n) {
				var r;
				return ((r = t.call(this, n) || this).k = new Map()), r;
			}
			e(n, t);
			var i = n.prototype;
			return (
				(i.set = function (t, n, r) {
					return (
						this.k.set(t, { action: r, request: n }),
						{ action: r, request: n }
					);
				}),
				(i.get = function (t) {
					return this.k.get(t);
				}),
				(i.getRequest = function (t) {
					return this.k.get(t).request;
				}),
				(i.getAction = function (t) {
					return this.k.get(t).action;
				}),
				(i.has = function (t) {
					return !this.checkHref(t) && this.k.has(t);
				}),
				(i.delete = function (t) {
					return this.k.delete(t);
				}),
				(i.update = function (t, n) {
					var e = r({}, this.k.get(t), {}, n);
					return this.k.set(t, e), e;
				}),
				n
			);
		})(z),
		Q = function () {
			return !window.history.pushState;
		},
		W = function (t) {
			return !t.el || !t.href;
		},
		J = function (t) {
			var n = t.event;
			return (
				n.which > 1 || n.metaKey || n.ctrlKey || n.shiftKey || n.altKey
			);
		},
		K = function (t) {
			var n = t.el;
			return n.hasAttribute("target") && "_blank" === n.target;
		},
		V = function (t) {
			var n = t.el;
			return (
				(void 0 !== n.protocol &&
					window.location.protocol !== n.protocol) ||
				(void 0 !== n.hostname &&
					window.location.hostname !== n.hostname)
			);
		},
		Y = function (t) {
			var n = t.el;
			return void 0 !== n.port && B() !== B(n.href);
		},
		Z = function (t) {
			var n = t.el;
			return (
				n.getAttribute && "string" == typeof n.getAttribute("download")
			);
		},
		tt = function (t) {
			return t.el.hasAttribute(S.prefix + "-" + S.prevent);
		},
		nt = function (t) {
			return Boolean(
				t.el.closest("[" + S.prefix + "-" + S.prevent + '="all"]')
			);
		},
		rt = function (t) {
			var n = t.href;
			return F(n) === F() && B(n) === B();
		},
		et = (function (t) {
			function n(n) {
				var r;
				return (
					((r = t.call(this, n) || this).suite = []),
					(r.tests = new Map()),
					r.init(),
					r
				);
			}
			e(n, t);
			var r = n.prototype;
			return (
				(r.init = function () {
					this.add("pushState", Q),
						this.add("exists", W),
						this.add("newTab", J),
						this.add("blank", K),
						this.add("corsDomain", V),
						this.add("corsPort", Y),
						this.add("download", Z),
						this.add("preventSelf", tt),
						this.add("preventAll", nt),
						this.add("sameUrl", rt, !1);
				}),
				(r.add = function (t, n, r) {
					void 0 === r && (r = !0),
						this.tests.set(t, n),
						r && this.suite.push(t);
				}),
				(r.run = function (t, n, r, e) {
					return this.tests.get(t)({ el: n, event: r, href: e });
				}),
				(r.checkLink = function (t, n, r) {
					var e = this;
					return this.suite.some(function (i) {
						return e.run(i, t, n, r);
					});
				}),
				n
			);
		})(z),
		it = (function (t) {
			function n(r, e) {
				var i;
				void 0 === e && (e = "Barba error");
				for (
					var o = arguments.length,
						u = new Array(o > 2 ? o - 2 : 0),
						f = 2;
					f < o;
					f++
				)
					u[f - 2] = arguments[f];
				return (
					((i = t.call.apply(t, [this].concat(u)) || this).error = r),
					(i.label = e),
					Error.captureStackTrace &&
						Error.captureStackTrace(
							(function (t) {
								if (void 0 === t)
									throw new ReferenceError(
										"this hasn't been initialised - super() hasn't been called"
									);
								return t;
							})(i),
							n
						),
					(i.name = "BarbaError"),
					i
				);
			}
			return e(n, t), n;
		})(f(Error)),
		ot = (function () {
			function t(t) {
				void 0 === t && (t = []),
					(this.logger = new l("@barba/core")),
					(this.all = []),
					(this.page = []),
					(this.once = []),
					(this.A = [
						{ name: "namespace", type: "strings" },
						{ name: "custom", type: "function" },
					]),
					t && (this.all = this.all.concat(t)),
					this.update();
			}
			var n = t.prototype;
			return (
				(n.add = function (t, n) {
					switch (t) {
						case "rule":
							this.A.splice(n.position || 0, 0, n.value);
							break;
						case "transition":
						default:
							this.all.push(n);
					}
					this.update();
				}),
				(n.resolve = function (t, n) {
					var r = this;
					void 0 === n && (n = {});
					var e = n.once ? this.once : this.page;
					e = e.filter(
						n.self
							? function (t) {
									return t.name && "self" === t.name;
							  }
							: function (t) {
									return !t.name || "self" !== t.name;
							  }
					);
					var i = new Map(),
						o = e.find(function (e) {
							var o = !0,
								u = {};
							return (
								!(!n.self || "self" !== e.name) ||
								(r.A.reverse().forEach(function (n) {
									o &&
										((o = r.R(e, n, t, u)),
										e.from &&
											e.to &&
											(o =
												r.R(e, n, t, u, "from") &&
												r.R(e, n, t, u, "to")),
										e.from &&
											!e.to &&
											(o = r.R(e, n, t, u, "from")),
										!e.from &&
											e.to &&
											(o = r.R(e, n, t, u, "to")));
								}),
								i.set(e, u),
								o)
							);
						}),
						u = i.get(o),
						f = [];
					if (
						(f.push(n.once ? "once" : "page"),
						n.self && f.push("self"),
						u)
					) {
						var s,
							c = [o];
						Object.keys(u).length > 0 && c.push(u),
							(s = this.logger).info.apply(
								s,
								[
									"Transition found [" + f.join(",") + "]",
								].concat(c)
							);
					} else
						this.logger.info(
							"No transition found [" + f.join(",") + "]"
						);
					return o;
				}),
				(n.update = function () {
					var t = this;
					(this.all = this.all
						.map(function (n) {
							return t.T(n);
						})
						.sort(function (t, n) {
							return t.priority - n.priority;
						})
						.reverse()
						.map(function (t) {
							return delete t.priority, t;
						})),
						(this.page = this.all.filter(function (t) {
							return void 0 !== t.leave || void 0 !== t.enter;
						})),
						(this.once = this.all.filter(function (t) {
							return void 0 !== t.once;
						}));
				}),
				(n.R = function (t, n, r, e, i) {
					var o = !0,
						u = !1,
						f = t,
						s = n.name,
						c = s,
						a = s,
						h = s,
						v = i ? f[i] : f,
						l = "to" === i ? r.next : r.current;
					if (i ? v && v[s] : v[s]) {
						switch (n.type) {
							case "strings":
							default:
								var d = Array.isArray(v[c]) ? v[c] : [v[c]];
								l[c] && -1 !== d.indexOf(l[c]) && (u = !0),
									-1 === d.indexOf(l[c]) && (o = !1);
								break;
							case "object":
								var m = Array.isArray(v[a]) ? v[a] : [v[a]];
								l[a]
									? (l[a].name &&
											-1 !== m.indexOf(l[a].name) &&
											(u = !0),
									  -1 === m.indexOf(l[a].name) && (o = !1))
									: (o = !1);
								break;
							case "function":
								v[h](r) ? (u = !0) : (o = !1);
						}
						u &&
							(i
								? ((e[i] = e[i] || {}), (e[i][s] = f[i][s]))
								: (e[s] = f[s]));
					}
					return o;
				}),
				(n.O = function (t, n, r) {
					var e = 0;
					return (
						(t[n] || (t.from && t.from[n]) || (t.to && t.to[n])) &&
							((e += Math.pow(10, r)),
							t.from && t.from[n] && (e += 1),
							t.to && t.to[n] && (e += 2)),
						e
					);
				}),
				(n.T = function (t) {
					var n = this;
					t.priority = 0;
					var r = 0;
					return (
						this.A.forEach(function (e, i) {
							r += n.O(t, e.name, i + 1);
						}),
						(t.priority = r),
						t
					);
				}),
				t
			);
		})(),
		ut = (function () {
			function t(t) {
				void 0 === t && (t = []),
					(this.logger = new l("@barba/core")),
					(this.S = !1),
					(this.store = new ot(t));
			}
			var r = t.prototype;
			return (
				(r.get = function (t, n) {
					return this.store.resolve(t, n);
				}),
				(r.doOnce = function (t) {
					var n = t.data,
						r = t.transition;
					try {
						var e = function () {
								i.S = !1;
							},
							i = this,
							o = r || {};
						i.S = !0;
						var u = s(
							function () {
								return Promise.resolve(
									i.j("beforeOnce", n, o)
								).then(function () {
									return Promise.resolve(i.once(n, o)).then(
										function () {
											return Promise.resolve(
												i.j("afterOnce", n, o)
											).then(function () {});
										}
									);
								});
							},
							function (t) {
								(i.S = !1),
									i.logger.debug(
										"Transition error [before/after/once]"
									),
									i.logger.error(t);
							}
						);
						return Promise.resolve(u && u.then ? u.then(e) : e());
					} catch (t) {
						return Promise.reject(t);
					}
				}),
				(r.doPage = function (t) {
					var n = t.data,
						r = t.transition,
						e = t.page,
						i = t.wrapper;
					try {
						var o = function (t) {
								if (u) return t;
								f.S = !1;
							},
							u = !1,
							f = this,
							c = r || {},
							a = !0 === c.sync || !1;
						f.S = !0;
						var h = s(
							function () {
								function t() {
									return Promise.resolve(
										f.j("before", n, c)
									).then(function () {
										var t = !1;
										function r(r) {
											return t
												? r
												: Promise.resolve(
														f.remove(n)
												  ).then(function () {
														return Promise.resolve(
															f.j("after", n, c)
														).then(function () {});
												  });
										}
										var o = (function () {
											if (a)
												return s(
													function () {
														return Promise.resolve(
															f.add(n, i)
														).then(function () {
															return Promise.resolve(
																f.j(
																	"beforeLeave",
																	n,
																	c
																)
															).then(function () {
																return Promise.resolve(
																	f.j(
																		"beforeEnter",
																		n,
																		c
																	)
																).then(
																	function () {
																		return Promise.resolve(
																			Promise.all(
																				[
																					f.leave(
																						n,
																						c
																					),
																					f.enter(
																						n,
																						c
																					),
																				]
																			)
																		).then(
																			function () {
																				return Promise.resolve(
																					f.j(
																						"afterLeave",
																						n,
																						c
																					)
																				).then(
																					function () {
																						return Promise.resolve(
																							f.j(
																								"afterEnter",
																								n,
																								c
																							)
																						).then(
																							function () {}
																						);
																					}
																				);
																			}
																		);
																	}
																);
															});
														});
													},
													function (t) {
														if (f.M(t))
															throw new it(
																t,
																"Transition error [sync]"
															);
													}
												);
											var r = function (r) {
													return t
														? r
														: s(
																function () {
																	var t =
																		(function () {
																			if (
																				!1 !==
																				o
																			)
																				return Promise.resolve(
																					f.add(
																						n,
																						i
																					)
																				).then(
																					function () {
																						return Promise.resolve(
																							f.j(
																								"beforeEnter",
																								n,
																								c
																							)
																						).then(
																							function () {
																								return Promise.resolve(
																									f.enter(
																										n,
																										c,
																										o
																									)
																								).then(
																									function () {
																										return Promise.resolve(
																											f.j(
																												"afterEnter",
																												n,
																												c
																											)
																										).then(
																											function () {}
																										);
																									}
																								);
																							}
																						);
																					}
																				);
																		})();
																	if (
																		t &&
																		t.then
																	)
																		return t.then(
																			function () {}
																		);
																},
																function (t) {
																	if (f.M(t))
																		throw new it(
																			t,
																			"Transition error [before/after/enter]"
																		);
																}
														  );
												},
												o = !1,
												u = s(
													function () {
														return Promise.resolve(
															f.j(
																"beforeLeave",
																n,
																c
															)
														).then(function () {
															return Promise.resolve(
																Promise.all([
																	f.leave(
																		n,
																		c
																	),
																	L(e, n),
																]).then(
																	function (
																		t
																	) {
																		return t[0];
																	}
																)
															).then(function (
																t
															) {
																return (
																	(o = t),
																	Promise.resolve(
																		f.j(
																			"afterLeave",
																			n,
																			c
																		)
																	).then(
																		function () {}
																	)
																);
															});
														});
													},
													function (t) {
														if (f.M(t))
															throw new it(
																t,
																"Transition error [before/after/leave]"
															);
													}
												);
											return u && u.then
												? u.then(r)
												: r(u);
										})();
										return o && o.then ? o.then(r) : r(o);
									});
								}
								var r = (function () {
									if (a)
										return Promise.resolve(L(e, n)).then(
											function () {}
										);
								})();
								return r && r.then ? r.then(t) : t();
							},
							function (t) {
								if (
									((f.S = !1),
									t.name && "BarbaError" === t.name)
								)
									throw (
										(f.logger.debug(t.label),
										f.logger.error(t.error),
										t)
									);
								throw (
									(f.logger.debug("Transition error [page]"),
									f.logger.error(t),
									t)
								);
							}
						);
						return Promise.resolve(h && h.then ? h.then(o) : o(h));
					} catch (t) {
						return Promise.reject(t);
					}
				}),
				(r.once = function (t, n) {
					try {
						return Promise.resolve(X.do("once", t, n)).then(
							function () {
								return n.once
									? N(n.once, n)(t)
									: Promise.resolve();
							}
						);
					} catch (t) {
						return Promise.reject(t);
					}
				}),
				(r.leave = function (t, n) {
					try {
						return Promise.resolve(X.do("leave", t, n)).then(
							function () {
								return n.leave
									? N(n.leave, n)(t)
									: Promise.resolve();
							}
						);
					} catch (t) {
						return Promise.reject(t);
					}
				}),
				(r.enter = function (t, n, r) {
					try {
						return Promise.resolve(X.do("enter", t, n)).then(
							function () {
								return n.enter
									? N(n.enter, n)(t, r)
									: Promise.resolve();
							}
						);
					} catch (t) {
						return Promise.reject(t);
					}
				}),
				(r.add = function (t, n) {
					try {
						return (
							j.addContainer(t.next.container, n),
							X.do("nextAdded", t),
							Promise.resolve()
						);
					} catch (t) {
						return Promise.reject(t);
					}
				}),
				(r.remove = function (t) {
					try {
						return (
							j.removeContainer(t.current.container),
							X.do("currentRemoved", t),
							Promise.resolve()
						);
					} catch (t) {
						return Promise.reject(t);
					}
				}),
				(r.M = function (t) {
					return t.message
						? !/Timeout error|Fetch error/.test(t.message)
						: !t.status;
				}),
				(r.j = function (t, n, r) {
					try {
						return Promise.resolve(X.do(t, n, r)).then(function () {
							return r[t] ? N(r[t], r)(n) : Promise.resolve();
						});
					} catch (t) {
						return Promise.reject(t);
					}
				}),
				n(t, [
					{
						key: "isRunning",
						get: function () {
							return this.S;
						},
						set: function (t) {
							this.S = t;
						},
					},
					{
						key: "hasOnce",
						get: function () {
							return this.store.once.length > 0;
						},
					},
					{
						key: "hasSelf",
						get: function () {
							return this.store.all.some(function (t) {
								return "self" === t.name;
							});
						},
					},
					{
						key: "shouldWait",
						get: function () {
							return this.store.all.some(function (t) {
								return (t.to && !t.to.route) || t.sync;
							});
						},
					},
				]),
				t
			);
		})(),
		ft = (function () {
			function t(t) {
				var n = this;
				(this.names = [
					"beforeLeave",
					"afterLeave",
					"beforeEnter",
					"afterEnter",
				]),
					(this.byNamespace = new Map()),
					0 !== t.length &&
						(t.forEach(function (t) {
							n.byNamespace.set(t.namespace, t);
						}),
						this.names.forEach(function (t) {
							X[t](n.L(t));
						}));
			}
			return (
				(t.prototype.L = function (t) {
					var n = this;
					return function (r) {
						var e = t.match(/enter/i) ? r.next : r.current,
							i = n.byNamespace.get(e.namespace);
						return i && i[t] ? N(i[t], i)(r) : Promise.resolve();
					};
				}),
				t
			);
		})();
	Element.prototype.matches ||
		(Element.prototype.matches =
			Element.prototype.msMatchesSelector ||
			Element.prototype.webkitMatchesSelector),
		Element.prototype.closest ||
			(Element.prototype.closest = function (t) {
				var n = this;
				do {
					if (n.matches(t)) return n;
					n = n.parentElement || n.parentNode;
				} while (null !== n && 1 === n.nodeType);
				return null;
			});
	var st = {
		container: null,
		html: "",
		namespace: "",
		url: { hash: "", href: "", path: "", port: null, query: {} },
	};
	return new ((function () {
		function t() {
			(this.version = a),
				(this.schemaPage = st),
				(this.Logger = l),
				(this.logger = new l("@barba/core")),
				(this.plugins = []),
				(this.hooks = X),
				(this.dom = j),
				(this.helpers = _),
				(this.history = M),
				(this.request = I),
				(this.url = H);
		}
		var e = t.prototype;
		return (
			(e.use = function (t, n) {
				var r = this.plugins;
				r.indexOf(t) > -1
					? this.logger.warn(
							"Plugin [" + t.name + "] already installed."
					  )
					: "function" == typeof t.install
					? (t.install(this, n), r.push(t))
					: this.logger.warn(
							"Plugin [" + t.name + '] has no "install" method.'
					  );
			}),
			(e.init = function (t) {
				var n = void 0 === t ? {} : t,
					e = n.transitions,
					i = void 0 === e ? [] : e,
					o = n.views,
					u = void 0 === o ? [] : o,
					f = n.schema,
					s = void 0 === f ? S : f,
					c = n.requestError,
					a = n.timeout,
					h = void 0 === a ? 2e3 : a,
					v = n.cacheIgnore,
					d = void 0 !== v && v,
					m = n.prefetchIgnore,
					p = void 0 !== m && m,
					w = n.preventRunning,
					b = void 0 !== w && w,
					y = n.prevent,
					P = void 0 === y ? null : y,
					g = n.debug,
					E = n.logLevel;
				if (
					(l.setLevel(
						!0 === (void 0 !== g && g)
							? "debug"
							: void 0 === E
							? "off"
							: E
					),
					this.logger.info(this.version),
					Object.keys(s).forEach(function (t) {
						S[t] && (S[t] = s[t]);
					}),
					(this.$ = c),
					(this.timeout = h),
					(this.cacheIgnore = d),
					(this.prefetchIgnore = p),
					(this.preventRunning = b),
					(this._ = this.dom.getWrapper()),
					!this._)
				)
					throw new Error("[@barba/core] No Barba wrapper found");
				this._.setAttribute("aria-live", "polite"), this.q();
				var x = this.data.current;
				if (!x.container)
					throw new Error("[@barba/core] No Barba container found");
				if (
					((this.cache = new G(d)),
					(this.prevent = new et(p)),
					(this.transitions = new ut(i)),
					(this.views = new ft(u)),
					null !== P)
				) {
					if ("function" != typeof P)
						throw new Error(
							"[@barba/core] Prevent should be a function"
						);
					this.prevent.add("preventCustom", P);
				}
				this.history.init(x.url.href, x.namespace),
					(this.B = this.B.bind(this)),
					(this.U = this.U.bind(this)),
					(this.D = this.D.bind(this)),
					this.F(),
					this.plugins.forEach(function (t) {
						return t.init();
					});
				var k = this.data;
				(k.trigger = "barba"),
					(k.next = k.current),
					(k.current = r({}, this.schemaPage)),
					this.hooks.do("ready", k),
					this.once(k),
					this.q();
			}),
			(e.destroy = function () {
				this.q(),
					this.H(),
					this.history.clear(),
					this.hooks.clear(),
					(this.plugins = []);
			}),
			(e.force = function (t) {
				window.location.assign(t);
			}),
			(e.go = function (t, n, r) {
				var e;
				if ((void 0 === n && (n = "barba"), this.transitions.isRunning))
					this.force(t);
				else if (
					!(e =
						"popstate" === n
							? this.history.current &&
							  this.url.getPath(this.history.current.url) ===
									this.url.getPath(t)
							: this.prevent.run("sameUrl", null, null, t)) ||
					this.transitions.hasSelf
				)
					return (
						(n = this.history.change(t, n, r)),
						r && (r.stopPropagation(), r.preventDefault()),
						this.page(t, n, e)
					);
			}),
			(e.once = function (t) {
				try {
					var n = this;
					return Promise.resolve(n.hooks.do("beforeEnter", t)).then(
						function () {
							function r() {
								return Promise.resolve(
									n.hooks.do("afterEnter", t)
								).then(function () {});
							}
							var e = (function () {
								if (n.transitions.hasOnce) {
									var r = n.transitions.get(t, { once: !0 });
									return Promise.resolve(
										n.transitions.doOnce({
											transition: r,
											data: t,
										})
									).then(function () {});
								}
							})();
							return e && e.then ? e.then(r) : r();
						}
					);
				} catch (t) {
					return Promise.reject(t);
				}
			}),
			(e.page = function (t, n, e) {
				try {
					var i = function () {
							var t = o.data;
							return Promise.resolve(o.hooks.do("page", t)).then(
								function () {
									var n = s(
										function () {
											var n = o.transitions.get(t, {
												once: !1,
												self: e,
											});
											return Promise.resolve(
												o.transitions.doPage({
													data: t,
													page: u,
													transition: n,
													wrapper: o._,
												})
											).then(function () {
												o.q();
											});
										},
										function () {
											0 === l.getLevel() &&
												o.force(t.current.url.href);
										}
									);
									if (n && n.then)
										return n.then(function () {});
								}
							);
						},
						o = this;
					(o.data.next.url = r({ href: t }, o.url.parse(t))),
						(o.data.trigger = n);
					var u = o.cache.has(t)
							? o.cache.update(t, { action: "click" }).request
							: o.cache.set(
									t,
									o.request(
										t,
										o.timeout,
										o.onRequestError.bind(o, n)
									),
									"click"
							  ).request,
						f = (function () {
							if (o.transitions.shouldWait)
								return Promise.resolve(L(u, o.data)).then(
									function () {}
								);
						})();
					return Promise.resolve(f && f.then ? f.then(i) : i());
				} catch (t) {
					return Promise.reject(t);
				}
			}),
			(e.onRequestError = function (t) {
				this.transitions.isRunning = !1;
				for (
					var n = arguments.length,
						r = new Array(n > 1 ? n - 1 : 0),
						e = 1;
					e < n;
					e++
				)
					r[e - 1] = arguments[e];
				var i = r[0],
					o = r[1],
					u = this.cache.getAction(i);
				return (
					this.cache.delete(i),
					!(
						(this.$ && !1 === this.$(t, u, i, o)) ||
						("click" === u && this.force(i), 1)
					)
				);
			}),
			(e.prefetch = function (t) {
				var n = this;
				this.cache.has(t) ||
					this.cache.set(
						t,
						this.request(
							t,
							this.timeout,
							this.onRequestError.bind(this, "barba")
						).catch(function (t) {
							n.logger.error(t);
						}),
						"prefetch"
					);
			}),
			(e.F = function () {
				!0 !== this.prefetchIgnore &&
					(document.addEventListener("mouseover", this.B),
					document.addEventListener("touchstart", this.B)),
					document.addEventListener("click", this.U),
					window.addEventListener("popstate", this.D);
			}),
			(e.H = function () {
				!0 !== this.prefetchIgnore &&
					(document.removeEventListener("mouseover", this.B),
					document.removeEventListener("touchstart", this.B)),
					document.removeEventListener("click", this.U),
					window.removeEventListener("popstate", this.D);
			}),
			(e.B = function (t) {
				var n = this,
					r = this.I(t);
				if (r) {
					var e = this.dom.getHref(r);
					this.prevent.checkHref(e) ||
						this.cache.has(e) ||
						this.cache.set(
							e,
							this.request(
								e,
								this.timeout,
								this.onRequestError.bind(this, r)
							).catch(function (t) {
								n.logger.error(t);
							}),
							"enter"
						);
				}
			}),
			(e.U = function (t) {
				var n = this.I(t);
				if (n)
					return this.transitions.isRunning && this.preventRunning
						? (t.preventDefault(), void t.stopPropagation())
						: void this.go(this.dom.getHref(n), n, t);
			}),
			(e.D = function (t) {
				this.go(this.url.getHref(), "popstate", t);
			}),
			(e.I = function (t) {
				for (var n = t.target; n && !this.dom.getHref(n); )
					n = n.parentNode;
				if (n && !this.prevent.checkLink(n, t, this.dom.getHref(n)))
					return n;
			}),
			(e.q = function () {
				var t = this.url.getHref(),
					n = {
						container: this.dom.getContainer(),
						html: this.dom.getHtml(),
						namespace: this.dom.getNamespace(),
						url: r({ href: t }, this.url.parse(t)),
					};
				(this.C = {
					current: n,
					next: r({}, this.schemaPage),
					trigger: void 0,
				}),
					this.hooks.do("reset", this.data);
			}),
			n(t, [
				{
					key: "data",
					get: function () {
						return this.C;
					},
				},
				{
					key: "wrapper",
					get: function () {
						return this._;
					},
				},
			]),
			t
		);
	})())();
});
//# sourceMappingURL=barba.umd.js.map

/* locomotive-scroll v4.1.3 | MIT License | https://github.com/locomotivemtl/locomotive-scroll */
(function (global, factory) {
	typeof exports === "object" && typeof module !== "undefined"
		? (module.exports = factory())
		: typeof define === "function" && define.amd
		? define(factory)
		: ((global =
				typeof globalThis !== "undefined"
					? globalThis
					: global || self),
		  (global.LocomotiveScroll = factory()));
})(this, function () {
	"use strict";

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}

	function _createClass(Constructor, protoProps, staticProps) {
		if (protoProps) _defineProperties(Constructor.prototype, protoProps);
		if (staticProps) _defineProperties(Constructor, staticProps);
		return Constructor;
	}

	function _defineProperty(obj, key, value) {
		if (key in obj) {
			Object.defineProperty(obj, key, {
				value: value,
				enumerable: true,
				configurable: true,
				writable: true,
			});
		} else {
			obj[key] = value;
		}

		return obj;
	}

	function ownKeys(object, enumerableOnly) {
		var keys = Object.keys(object);

		if (Object.getOwnPropertySymbols) {
			var symbols = Object.getOwnPropertySymbols(object);
			if (enumerableOnly)
				symbols = symbols.filter(function (sym) {
					return Object.getOwnPropertyDescriptor(
						object,
						sym
					).enumerable;
				});
			keys.push.apply(keys, symbols);
		}

		return keys;
	}

	function _objectSpread2(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i] != null ? arguments[i] : {};

			if (i % 2) {
				ownKeys(Object(source), true).forEach(function (key) {
					_defineProperty(target, key, source[key]);
				});
			} else if (Object.getOwnPropertyDescriptors) {
				Object.defineProperties(
					target,
					Object.getOwnPropertyDescriptors(source)
				);
			} else {
				ownKeys(Object(source)).forEach(function (key) {
					Object.defineProperty(
						target,
						key,
						Object.getOwnPropertyDescriptor(source, key)
					);
				});
			}
		}

		return target;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError(
				"Super expression must either be null or a function"
			);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				writable: true,
				configurable: true,
			},
		});
		if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
		_getPrototypeOf = Object.setPrototypeOf
			? Object.getPrototypeOf
			: function _getPrototypeOf(o) {
					return o.__proto__ || Object.getPrototypeOf(o);
			  };
		return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
		_setPrototypeOf =
			Object.setPrototypeOf ||
			function _setPrototypeOf(o, p) {
				o.__proto__ = p;
				return o;
			};

		return _setPrototypeOf(o, p);
	}

	function _isNativeReflectConstruct() {
		if (typeof Reflect === "undefined" || !Reflect.construct) return false;
		if (Reflect.construct.sham) return false;
		if (typeof Proxy === "function") return true;

		try {
			Date.prototype.toString.call(
				Reflect.construct(Date, [], function () {})
			);
			return true;
		} catch (e) {
			return false;
		}
	}

	function _assertThisInitialized(self) {
		if (self === void 0) {
			throw new ReferenceError(
				"this hasn't been initialised - super() hasn't been called"
			);
		}

		return self;
	}

	function _possibleConstructorReturn(self, call) {
		if (call && (typeof call === "object" || typeof call === "function")) {
			return call;
		}

		return _assertThisInitialized(self);
	}

	function _createSuper(Derived) {
		var hasNativeReflectConstruct = _isNativeReflectConstruct();

		return function _createSuperInternal() {
			var Super = _getPrototypeOf(Derived),
				result;

			if (hasNativeReflectConstruct) {
				var NewTarget = _getPrototypeOf(this).constructor;

				result = Reflect.construct(Super, arguments, NewTarget);
			} else {
				result = Super.apply(this, arguments);
			}

			return _possibleConstructorReturn(this, result);
		};
	}

	function _superPropBase(object, property) {
		while (!Object.prototype.hasOwnProperty.call(object, property)) {
			object = _getPrototypeOf(object);
			if (object === null) break;
		}

		return object;
	}

	function _get(target, property, receiver) {
		if (typeof Reflect !== "undefined" && Reflect.get) {
			_get = Reflect.get;
		} else {
			_get = function _get(target, property, receiver) {
				var base = _superPropBase(target, property);

				if (!base) return;
				var desc = Object.getOwnPropertyDescriptor(base, property);

				if (desc.get) {
					return desc.get.call(receiver);
				}

				return desc.value;
			};
		}

		return _get(target, property, receiver || target);
	}

	function _slicedToArray(arr, i) {
		return (
			_arrayWithHoles(arr) ||
			_iterableToArrayLimit(arr, i) ||
			_unsupportedIterableToArray(arr, i) ||
			_nonIterableRest()
		);
	}

	function _toConsumableArray(arr) {
		return (
			_arrayWithoutHoles(arr) ||
			_iterableToArray(arr) ||
			_unsupportedIterableToArray(arr) ||
			_nonIterableSpread()
		);
	}

	function _arrayWithoutHoles(arr) {
		if (Array.isArray(arr)) return _arrayLikeToArray(arr);
	}

	function _arrayWithHoles(arr) {
		if (Array.isArray(arr)) return arr;
	}

	function _iterableToArray(iter) {
		if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
			return Array.from(iter);
	}

	function _iterableToArrayLimit(arr, i) {
		if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
			return;
		var _arr = [];
		var _n = true;
		var _d = false;
		var _e = undefined;

		try {
			for (
				var _i = arr[Symbol.iterator](), _s;
				!(_n = (_s = _i.next()).done);
				_n = true
			) {
				_arr.push(_s.value);

				if (i && _arr.length === i) break;
			}
		} catch (err) {
			_d = true;
			_e = err;
		} finally {
			try {
				if (!_n && _i["return"] != null) _i["return"]();
			} finally {
				if (_d) throw _e;
			}
		}

		return _arr;
	}

	function _unsupportedIterableToArray(o, minLen) {
		if (!o) return;
		if (typeof o === "string") return _arrayLikeToArray(o, minLen);
		var n = Object.prototype.toString.call(o).slice(8, -1);
		if (n === "Object" && o.constructor) n = o.constructor.name;
		if (n === "Map" || n === "Set") return Array.from(o);
		if (
			n === "Arguments" ||
			/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
		)
			return _arrayLikeToArray(o, minLen);
	}

	function _arrayLikeToArray(arr, len) {
		if (len == null || len > arr.length) len = arr.length;

		for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

		return arr2;
	}

	function _nonIterableSpread() {
		throw new TypeError(
			"Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
		);
	}

	function _nonIterableRest() {
		throw new TypeError(
			"Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
		);
	}

	var defaults = {
		el: document,
		name: "scroll",
		offset: [0, 0],
		repeat: false,
		smooth: false,
		initPosition: {
			x: 0,
			y: 0,
		},
		direction: "vertical",
		gestureDirection: "vertical",
		reloadOnContextChange: false,
		lerp: 0.1,
		class: "is-inview",
		scrollbarContainer: false,
		scrollbarClass: "c-scrollbar",
		scrollingClass: "has-scroll-scrolling",
		draggingClass: "has-scroll-dragging",
		smoothClass: "has-scroll-smooth",
		initClass: "has-scroll-init",
		getSpeed: false,
		getDirection: false,
		scrollFromAnywhere: false,
		multiplier: 1,
		firefoxMultiplier: 50,
		touchMultiplier: 2,
		resetNativeScroll: true,
		tablet: {
			smooth: false,
			direction: "vertical",
			gestureDirection: "vertical",
			breakpoint: 1024,
		},
		smartphone: {
			smooth: false,
			direction: "vertical",
			gestureDirection: "vertical",
		},
	};

	var _default = /*#__PURE__*/ (function () {
		function _default() {
			var options =
				arguments.length > 0 && arguments[0] !== undefined
					? arguments[0]
					: {};

			_classCallCheck(this, _default);

			Object.assign(this, defaults, options);
			this.smartphone = defaults.smartphone;
			if (options.smartphone)
				Object.assign(this.smartphone, options.smartphone);
			this.tablet = defaults.tablet;
			if (options.tablet) Object.assign(this.tablet, options.tablet);
			this.namespace = "locomotive";
			this.html = document.documentElement;
			this.windowHeight = window.innerHeight;
			this.windowWidth = window.innerWidth;
			this.windowMiddle = {
				x: this.windowWidth / 2,
				y: this.windowHeight / 2,
			};
			this.els = {};
			this.currentElements = {};
			this.listeners = {};
			this.hasScrollTicking = false;
			this.hasCallEventSet = false;
			this.checkScroll = this.checkScroll.bind(this);
			this.checkResize = this.checkResize.bind(this);
			this.checkEvent = this.checkEvent.bind(this);
			this.instance = {
				scroll: {
					x: 0,
					y: 0,
				},
				limit: {
					x: this.html.offsetWidth,
					y: this.html.offsetHeight,
				},
				currentElements: this.currentElements,
			};

			if (this.isMobile) {
				if (this.isTablet) {
					this.context = "tablet";
				} else {
					this.context = "smartphone";
				}
			} else {
				this.context = "desktop";
			}

			if (this.isMobile) this.direction = this[this.context].direction;

			if (this.direction === "horizontal") {
				this.directionAxis = "x";
			} else {
				this.directionAxis = "y";
			}

			if (this.getDirection) {
				this.instance.direction = null;
			}

			if (this.getDirection) {
				this.instance.speed = 0;
			}

			this.html.classList.add(this.initClass);
			window.addEventListener("resize", this.checkResize, false);
		}

		_createClass(_default, [
			{
				key: "init",
				value: function init() {
					this.initEvents();
				},
			},
			{
				key: "checkScroll",
				value: function checkScroll() {
					this.dispatchScroll();
				},
			},
			{
				key: "checkResize",
				value: function checkResize() {
					var _this = this;

					if (!this.resizeTick) {
						this.resizeTick = true;
						requestAnimationFrame(function () {
							_this.resize();

							_this.resizeTick = false;
						});
					}
				},
			},
			{
				key: "resize",
				value: function resize() {},
			},
			{
				key: "checkContext",
				value: function checkContext() {
					if (!this.reloadOnContextChange) return;
					this.isMobile =
						/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
							navigator.userAgent
						) ||
						(navigator.platform === "MacIntel" &&
							navigator.maxTouchPoints > 1) ||
						this.windowWidth < this.tablet.breakpoint;
					this.isTablet =
						this.isMobile &&
						this.windowWidth >= this.tablet.breakpoint;
					var oldContext = this.context;

					if (this.isMobile) {
						if (this.isTablet) {
							this.context = "tablet";
						} else {
							this.context = "smartphone";
						}
					} else {
						this.context = "desktop";
					}

					if (oldContext != this.context) {
						var oldSmooth =
							oldContext == "desktop"
								? this.smooth
								: this[oldContext].smooth;
						var newSmooth =
							this.context == "desktop"
								? this.smooth
								: this[this.context].smooth;
						if (oldSmooth != newSmooth) window.location.reload();
					}
				},
			},
			{
				key: "initEvents",
				value: function initEvents() {
					var _this2 = this;

					this.scrollToEls = this.el.querySelectorAll(
						"[data-".concat(this.name, "-to]")
					);
					this.setScrollTo = this.setScrollTo.bind(this);
					this.scrollToEls.forEach(function (el) {
						el.addEventListener("click", _this2.setScrollTo, false);
					});
				},
			},
			{
				key: "setScrollTo",
				value: function setScrollTo(event) {
					event.preventDefault();
					this.scrollTo(
						event.currentTarget.getAttribute(
							"data-".concat(this.name, "-href")
						) || event.currentTarget.getAttribute("href"),
						{
							offset: event.currentTarget.getAttribute(
								"data-".concat(this.name, "-offset")
							),
						}
					);
				},
			},
			{
				key: "addElements",
				value: function addElements() {},
			},
			{
				key: "detectElements",
				value: function detectElements(hasCallEventSet) {
					var _this3 = this;

					var scrollTop = this.instance.scroll.y;
					var scrollBottom = scrollTop + this.windowHeight;
					var scrollLeft = this.instance.scroll.x;
					var scrollRight = scrollLeft + this.windowWidth;
					Object.entries(this.els).forEach(function (_ref) {
						var _ref2 = _slicedToArray(_ref, 2),
							i = _ref2[0],
							el = _ref2[1];

						if (el && (!el.inView || hasCallEventSet)) {
							if (_this3.direction === "horizontal") {
								if (
									scrollRight >= el.left &&
									scrollLeft < el.right
								) {
									_this3.setInView(el, i);
								}
							} else {
								if (
									scrollBottom >= el.top &&
									scrollTop < el.bottom
								) {
									_this3.setInView(el, i);
								}
							}
						}

						if (el && el.inView) {
							if (_this3.direction === "horizontal") {
								var width = el.right - el.left;
								el.progress =
									(_this3.instance.scroll.x -
										(el.left - _this3.windowWidth)) /
									(width + _this3.windowWidth);

								if (
									scrollRight < el.left ||
									scrollLeft > el.right
								) {
									_this3.setOutOfView(el, i);
								}
							} else {
								var height = el.bottom - el.top;
								el.progress =
									(_this3.instance.scroll.y -
										(el.top - _this3.windowHeight)) /
									(height + _this3.windowHeight);

								if (
									scrollBottom < el.top ||
									scrollTop > el.bottom
								) {
									_this3.setOutOfView(el, i);
								}
							}
						}
					}); // this.els = this.els.filter((current, i) => {
					//     return current !== null;
					// });

					this.hasScrollTicking = false;
				},
			},
			{
				key: "setInView",
				value: function setInView(current, i) {
					this.els[i].inView = true;
					current.el.classList.add(current["class"]);
					this.currentElements[i] = current;

					if (current.call && this.hasCallEventSet) {
						this.dispatchCall(current, "enter");

						if (!current.repeat) {
							this.els[i].call = false;
						}
					} // if (!current.repeat && !current.speed && !current.sticky) {
					//     if (!current.call || current.call && this.hasCallEventSet) {
					//        this.els[i] = null
					//     }
					// }
				},
			},
			{
				key: "setOutOfView",
				value: function setOutOfView(current, i) {
					var _this4 = this;

					// if (current.repeat || current.speed !== undefined) {
					this.els[i].inView = false; // }

					Object.keys(this.currentElements).forEach(function (el) {
						el === i && delete _this4.currentElements[el];
					});

					if (current.call && this.hasCallEventSet) {
						this.dispatchCall(current, "exit");
					}

					if (current.repeat) {
						current.el.classList.remove(current["class"]);
					}
				},
			},
			{
				key: "dispatchCall",
				value: function dispatchCall(current, way) {
					this.callWay = way;
					this.callValue = current.call
						.split(",")
						.map(function (item) {
							return item.trim();
						});
					this.callObj = current;
					if (this.callValue.length == 1)
						this.callValue = this.callValue[0];
					var callEvent = new Event(this.namespace + "call");
					this.el.dispatchEvent(callEvent);
				},
			},
			{
				key: "dispatchScroll",
				value: function dispatchScroll() {
					var scrollEvent = new Event(this.namespace + "scroll");
					this.el.dispatchEvent(scrollEvent);
				},
			},
			{
				key: "setEvents",
				value: function setEvents(event, func) {
					if (!this.listeners[event]) {
						this.listeners[event] = [];
					}

					var list = this.listeners[event];
					list.push(func);

					if (list.length === 1) {
						this.el.addEventListener(
							this.namespace + event,
							this.checkEvent,
							false
						);
					}

					if (event === "call") {
						this.hasCallEventSet = true;
						this.detectElements(true);
					}
				},
			},
			{
				key: "unsetEvents",
				value: function unsetEvents(event, func) {
					if (!this.listeners[event]) return;
					var list = this.listeners[event];
					var index = list.indexOf(func);
					if (index < 0) return;
					list.splice(index, 1);

					if (list.index === 0) {
						this.el.removeEventListener(
							this.namespace + event,
							this.checkEvent,
							false
						);
					}
				},
			},
			{
				key: "checkEvent",
				value: function checkEvent(event) {
					var _this5 = this;

					var name = event.type.replace(this.namespace, "");
					var list = this.listeners[name];
					if (!list || list.length === 0) return;
					list.forEach(function (func) {
						switch (name) {
							case "scroll":
								return func(_this5.instance);

							case "call":
								return func(
									_this5.callValue,
									_this5.callWay,
									_this5.callObj
								);

							default:
								return func();
						}
					});
				},
			},
			{
				key: "startScroll",
				value: function startScroll() {},
			},
			{
				key: "stopScroll",
				value: function stopScroll() {},
			},
			{
				key: "setScroll",
				value: function setScroll(x, y) {
					this.instance.scroll = {
						x: 0,
						y: 0,
					};
				},
			},
			{
				key: "destroy",
				value: function destroy() {
					var _this6 = this;

					window.removeEventListener(
						"resize",
						this.checkResize,
						false
					);
					Object.keys(this.listeners).forEach(function (event) {
						_this6.el.removeEventListener(
							_this6.namespace + event,
							_this6.checkEvent,
							false
						);
					});
					this.listeners = {};
					this.scrollToEls.forEach(function (el) {
						el.removeEventListener(
							"click",
							_this6.setScrollTo,
							false
						);
					});
					this.html.classList.remove(this.initClass);
				},
			},
		]);

		return _default;
	})();

	var commonjsGlobal =
		typeof globalThis !== "undefined"
			? globalThis
			: typeof window !== "undefined"
			? window
			: typeof global !== "undefined"
			? global
			: typeof self !== "undefined"
			? self
			: {};

	function createCommonjsModule(fn, module) {
		return (
			(module = { exports: {} }),
			fn(module, module.exports),
			module.exports
		);
	}

	var smoothscroll = createCommonjsModule(function (module, exports) {
		/* smoothscroll v0.4.4 - 2019 - Dustan Kasten, Jeremias Menichelli - MIT License */
		(function () {
			// polyfill
			function polyfill() {
				// aliases
				var w = window;
				var d = document;

				// return if scroll behavior is supported and polyfill is not forced
				if (
					"scrollBehavior" in d.documentElement.style &&
					w.__forceSmoothScrollPolyfill__ !== true
				) {
					return;
				}

				// globals
				var Element = w.HTMLElement || w.Element;
				var SCROLL_TIME = 468;

				// object gathering original scroll methods
				var original = {
					scroll: w.scroll || w.scrollTo,
					scrollBy: w.scrollBy,
					elementScroll: Element.prototype.scroll || scrollElement,
					scrollIntoView: Element.prototype.scrollIntoView,
				};

				// define timing method
				var now =
					w.performance && w.performance.now
						? w.performance.now.bind(w.performance)
						: Date.now;

				/**
				 * indicates if a the current browser is made by Microsoft
				 * @method isMicrosoftBrowser
				 * @param {String} userAgent
				 * @returns {Boolean}
				 */
				function isMicrosoftBrowser(userAgent) {
					var userAgentPatterns = ["MSIE ", "Trident/", "Edge/"];

					return new RegExp(userAgentPatterns.join("|")).test(
						userAgent
					);
				}

				/*
				 * IE has rounding bug rounding down clientHeight and clientWidth and
				 * rounding up scrollHeight and scrollWidth causing false positives
				 * on hasScrollableSpace
				 */
				var ROUNDING_TOLERANCE = isMicrosoftBrowser(
					w.navigator.userAgent
				)
					? 1
					: 0;

				/**
				 * changes scroll position inside an element
				 * @method scrollElement
				 * @param {Number} x
				 * @param {Number} y
				 * @returns {undefined}
				 */
				function scrollElement(x, y) {
					this.scrollLeft = x;
					this.scrollTop = y;
				}

				/**
				 * returns result of applying ease math function to a number
				 * @method ease
				 * @param {Number} k
				 * @returns {Number}
				 */
				function ease(k) {
					return 0.5 * (1 - Math.cos(Math.PI * k));
				}

				/**
				 * indicates if a smooth behavior should be applied
				 * @method shouldBailOut
				 * @param {Number|Object} firstArg
				 * @returns {Boolean}
				 */
				function shouldBailOut(firstArg) {
					if (
						firstArg === null ||
						typeof firstArg !== "object" ||
						firstArg.behavior === undefined ||
						firstArg.behavior === "auto" ||
						firstArg.behavior === "instant"
					) {
						// first argument is not an object/null
						// or behavior is auto, instant or undefined
						return true;
					}

					if (
						typeof firstArg === "object" &&
						firstArg.behavior === "smooth"
					) {
						// first argument is an object and behavior is smooth
						return false;
					}

					// throw error when behavior is not supported
					throw new TypeError(
						"behavior member of ScrollOptions " +
							firstArg.behavior +
							" is not a valid value for enumeration ScrollBehavior."
					);
				}

				/**
				 * indicates if an element has scrollable space in the provided axis
				 * @method hasScrollableSpace
				 * @param {Node} el
				 * @param {String} axis
				 * @returns {Boolean}
				 */
				function hasScrollableSpace(el, axis) {
					if (axis === "Y") {
						return (
							el.clientHeight + ROUNDING_TOLERANCE <
							el.scrollHeight
						);
					}

					if (axis === "X") {
						return (
							el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth
						);
					}
				}

				/**
				 * indicates if an element has a scrollable overflow property in the axis
				 * @method canOverflow
				 * @param {Node} el
				 * @param {String} axis
				 * @returns {Boolean}
				 */
				function canOverflow(el, axis) {
					var overflowValue = w.getComputedStyle(el, null)[
						"overflow" + axis
					];

					return (
						overflowValue === "auto" || overflowValue === "scroll"
					);
				}

				/**
				 * indicates if an element can be scrolled in either axis
				 * @method isScrollable
				 * @param {Node} el
				 * @param {String} axis
				 * @returns {Boolean}
				 */
				function isScrollable(el) {
					var isScrollableY =
						hasScrollableSpace(el, "Y") && canOverflow(el, "Y");
					var isScrollableX =
						hasScrollableSpace(el, "X") && canOverflow(el, "X");

					return isScrollableY || isScrollableX;
				}

				/**
				 * finds scrollable parent of an element
				 * @method findScrollableParent
				 * @param {Node} el
				 * @returns {Node} el
				 */
				function findScrollableParent(el) {
					while (el !== d.body && isScrollable(el) === false) {
						el = el.parentNode || el.host;
					}

					return el;
				}

				/**
				 * self invoked function that, given a context, steps through scrolling
				 * @method step
				 * @param {Object} context
				 * @returns {undefined}
				 */
				function step(context) {
					var time = now();
					var value;
					var currentX;
					var currentY;
					var elapsed = (time - context.startTime) / SCROLL_TIME;

					// avoid elapsed times higher than one
					elapsed = elapsed > 1 ? 1 : elapsed;

					// apply easing to elapsed time
					value = ease(elapsed);

					currentX =
						context.startX + (context.x - context.startX) * value;
					currentY =
						context.startY + (context.y - context.startY) * value;

					context.method.call(context.scrollable, currentX, currentY);

					// scroll more if we have not reached our destination
					if (currentX !== context.x || currentY !== context.y) {
						w.requestAnimationFrame(step.bind(w, context));
					}
				}

				/**
				 * scrolls window or element with a smooth behavior
				 * @method smoothScroll
				 * @param {Object|Node} el
				 * @param {Number} x
				 * @param {Number} y
				 * @returns {undefined}
				 */
				function smoothScroll(el, x, y) {
					var scrollable;
					var startX;
					var startY;
					var method;
					var startTime = now();

					// define scroll context
					if (el === d.body) {
						scrollable = w;
						startX = w.scrollX || w.pageXOffset;
						startY = w.scrollY || w.pageYOffset;
						method = original.scroll;
					} else {
						scrollable = el;
						startX = el.scrollLeft;
						startY = el.scrollTop;
						method = scrollElement;
					}

					// scroll looping over a frame
					step({
						scrollable: scrollable,
						method: method,
						startTime: startTime,
						startX: startX,
						startY: startY,
						x: x,
						y: y,
					});
				}

				// ORIGINAL METHODS OVERRIDES
				// w.scroll and w.scrollTo
				w.scroll = w.scrollTo = function () {
					// avoid action when no arguments are passed
					if (arguments[0] === undefined) {
						return;
					}

					// avoid smooth behavior if not required
					if (shouldBailOut(arguments[0]) === true) {
						original.scroll.call(
							w,
							arguments[0].left !== undefined
								? arguments[0].left
								: typeof arguments[0] !== "object"
								? arguments[0]
								: w.scrollX || w.pageXOffset,
							// use top prop, second argument if present or fallback to scrollY
							arguments[0].top !== undefined
								? arguments[0].top
								: arguments[1] !== undefined
								? arguments[1]
								: w.scrollY || w.pageYOffset
						);

						return;
					}

					// LET THE SMOOTHNESS BEGIN!
					smoothScroll.call(
						w,
						d.body,
						arguments[0].left !== undefined
							? ~~arguments[0].left
							: w.scrollX || w.pageXOffset,
						arguments[0].top !== undefined
							? ~~arguments[0].top
							: w.scrollY || w.pageYOffset
					);
				};

				// w.scrollBy
				w.scrollBy = function () {
					// avoid action when no arguments are passed
					if (arguments[0] === undefined) {
						return;
					}

					// avoid smooth behavior if not required
					if (shouldBailOut(arguments[0])) {
						original.scrollBy.call(
							w,
							arguments[0].left !== undefined
								? arguments[0].left
								: typeof arguments[0] !== "object"
								? arguments[0]
								: 0,
							arguments[0].top !== undefined
								? arguments[0].top
								: arguments[1] !== undefined
								? arguments[1]
								: 0
						);

						return;
					}

					// LET THE SMOOTHNESS BEGIN!
					smoothScroll.call(
						w,
						d.body,
						~~arguments[0].left + (w.scrollX || w.pageXOffset),
						~~arguments[0].top + (w.scrollY || w.pageYOffset)
					);
				};

				// Element.prototype.scroll and Element.prototype.scrollTo
				Element.prototype.scroll = Element.prototype.scrollTo =
					function () {
						// avoid action when no arguments are passed
						if (arguments[0] === undefined) {
							return;
						}

						// avoid smooth behavior if not required
						if (shouldBailOut(arguments[0]) === true) {
							// if one number is passed, throw error to match Firefox implementation
							if (
								typeof arguments[0] === "number" &&
								arguments[1] === undefined
							) {
								throw new SyntaxError(
									"Value could not be converted"
								);
							}

							original.elementScroll.call(
								this,
								// use left prop, first number argument or fallback to scrollLeft
								arguments[0].left !== undefined
									? ~~arguments[0].left
									: typeof arguments[0] !== "object"
									? ~~arguments[0]
									: this.scrollLeft,
								// use top prop, second argument or fallback to scrollTop
								arguments[0].top !== undefined
									? ~~arguments[0].top
									: arguments[1] !== undefined
									? ~~arguments[1]
									: this.scrollTop
							);

							return;
						}

						var left = arguments[0].left;
						var top = arguments[0].top;

						// LET THE SMOOTHNESS BEGIN!
						smoothScroll.call(
							this,
							this,
							typeof left === "undefined"
								? this.scrollLeft
								: ~~left,
							typeof top === "undefined" ? this.scrollTop : ~~top
						);
					};

				// Element.prototype.scrollBy
				Element.prototype.scrollBy = function () {
					// avoid action when no arguments are passed
					if (arguments[0] === undefined) {
						return;
					}

					// avoid smooth behavior if not required
					if (shouldBailOut(arguments[0]) === true) {
						original.elementScroll.call(
							this,
							arguments[0].left !== undefined
								? ~~arguments[0].left + this.scrollLeft
								: ~~arguments[0] + this.scrollLeft,
							arguments[0].top !== undefined
								? ~~arguments[0].top + this.scrollTop
								: ~~arguments[1] + this.scrollTop
						);

						return;
					}

					this.scroll({
						left: ~~arguments[0].left + this.scrollLeft,
						top: ~~arguments[0].top + this.scrollTop,
						behavior: arguments[0].behavior,
					});
				};

				// Element.prototype.scrollIntoView
				Element.prototype.scrollIntoView = function () {
					// avoid smooth behavior if not required
					if (shouldBailOut(arguments[0]) === true) {
						original.scrollIntoView.call(
							this,
							arguments[0] === undefined ? true : arguments[0]
						);

						return;
					}

					// LET THE SMOOTHNESS BEGIN!
					var scrollableParent = findScrollableParent(this);
					var parentRects = scrollableParent.getBoundingClientRect();
					var clientRects = this.getBoundingClientRect();

					if (scrollableParent !== d.body) {
						// reveal element inside parent
						smoothScroll.call(
							this,
							scrollableParent,
							scrollableParent.scrollLeft +
								clientRects.left -
								parentRects.left,
							scrollableParent.scrollTop +
								clientRects.top -
								parentRects.top
						);

						// reveal parent in viewport unless is fixed
						if (
							w.getComputedStyle(scrollableParent).position !==
							"fixed"
						) {
							w.scrollBy({
								left: parentRects.left,
								top: parentRects.top,
								behavior: "smooth",
							});
						}
					} else {
						// reveal element in viewport
						w.scrollBy({
							left: clientRects.left,
							top: clientRects.top,
							behavior: "smooth",
						});
					}
				};
			}

			{
				// commonjs
				module.exports = { polyfill: polyfill };
			}
		})();
	});
	var smoothscroll_1 = smoothscroll.polyfill;

	var _default$1 = /*#__PURE__*/ (function (_Core) {
		_inherits(_default, _Core);

		var _super = _createSuper(_default);

		function _default() {
			var _this;

			var options =
				arguments.length > 0 && arguments[0] !== undefined
					? arguments[0]
					: {};

			_classCallCheck(this, _default);

			_this = _super.call(this, options);

			if (_this.resetNativeScroll) {
				if (history.scrollRestoration) {
					history.scrollRestoration = "manual";
				}

				window.scrollTo(0, 0);
			}

			window.addEventListener("scroll", _this.checkScroll, false);

			if (window.smoothscrollPolyfill === undefined) {
				window.smoothscrollPolyfill = smoothscroll;
				window.smoothscrollPolyfill.polyfill();
			}

			return _this;
		}

		_createClass(_default, [
			{
				key: "init",
				value: function init() {
					this.instance.scroll.y = window.pageYOffset;
					this.addElements();
					this.detectElements();

					_get(
						_getPrototypeOf(_default.prototype),
						"init",
						this
					).call(this);
				},
			},
			{
				key: "checkScroll",
				value: function checkScroll() {
					var _this2 = this;

					_get(
						_getPrototypeOf(_default.prototype),
						"checkScroll",
						this
					).call(this);

					if (this.getDirection) {
						this.addDirection();
					}

					if (this.getSpeed) {
						this.addSpeed();
						this.speedTs = Date.now();
					}

					this.instance.scroll.y = window.pageYOffset;

					if (Object.entries(this.els).length) {
						if (!this.hasScrollTicking) {
							requestAnimationFrame(function () {
								_this2.detectElements();
							});
							this.hasScrollTicking = true;
						}
					}
				},
			},
			{
				key: "addDirection",
				value: function addDirection() {
					if (window.pageYOffset > this.instance.scroll.y) {
						if (this.instance.direction !== "down") {
							this.instance.direction = "down";
						}
					} else if (window.pageYOffset < this.instance.scroll.y) {
						if (this.instance.direction !== "up") {
							this.instance.direction = "up";
						}
					}
				},
			},
			{
				key: "addSpeed",
				value: function addSpeed() {
					if (window.pageYOffset != this.instance.scroll.y) {
						this.instance.speed =
							(window.pageYOffset - this.instance.scroll.y) /
							Math.max(1, Date.now() - this.speedTs);
					} else {
						this.instance.speed = 0;
					}
				},
			},
			{
				key: "resize",
				value: function resize() {
					if (Object.entries(this.els).length) {
						this.windowHeight = window.innerHeight;
						this.updateElements();
					}
				},
			},
			{
				key: "addElements",
				value: function addElements() {
					var _this3 = this;

					this.els = {};
					var els = this.el.querySelectorAll(
						"[data-" + this.name + "]"
					);
					els.forEach(function (el, index) {
						var BCR = el.getBoundingClientRect();
						var cl =
							el.dataset[_this3.name + "Class"] ||
							_this3["class"];
						var id =
							typeof el.dataset[_this3.name + "Id"] === "string"
								? el.dataset[_this3.name + "Id"]
								: index;
						var top;
						var left;
						var offset =
							typeof el.dataset[_this3.name + "Offset"] ===
							"string"
								? el.dataset[_this3.name + "Offset"].split(",")
								: _this3.offset;
						var repeat = el.dataset[_this3.name + "Repeat"];
						var call = el.dataset[_this3.name + "Call"];
						var target = el.dataset[_this3.name + "Target"];
						var targetEl;

						if (target !== undefined) {
							targetEl = document.querySelector(
								"".concat(target)
							);
						} else {
							targetEl = el;
						}

						var targetElBCR = targetEl.getBoundingClientRect();
						top = targetElBCR.top + _this3.instance.scroll.y;
						left = targetElBCR.left + _this3.instance.scroll.x;
						var bottom = top + targetEl.offsetHeight;
						var right = left + targetEl.offsetWidth;

						if (repeat == "false") {
							repeat = false;
						} else if (repeat != undefined) {
							repeat = true;
						} else {
							repeat = _this3.repeat;
						}

						var relativeOffset = _this3.getRelativeOffset(offset);

						top = top + relativeOffset[0];
						bottom = bottom - relativeOffset[1];
						var mappedEl = {
							el: el,
							targetEl: targetEl,
							id: id,
							class: cl,
							top: top,
							bottom: bottom,
							left: left,
							right: right,
							offset: offset,
							progress: 0,
							repeat: repeat,
							inView: false,
							call: call,
						};
						_this3.els[id] = mappedEl;

						if (el.classList.contains(cl)) {
							_this3.setInView(_this3.els[id], id);
						}
					});
				},
			},
			{
				key: "updateElements",
				value: function updateElements() {
					var _this4 = this;

					Object.entries(this.els).forEach(function (_ref) {
						var _ref2 = _slicedToArray(_ref, 2),
							i = _ref2[0],
							el = _ref2[1];

						var top =
							el.targetEl.getBoundingClientRect().top +
							_this4.instance.scroll.y;

						var bottom = top + el.targetEl.offsetHeight;

						var relativeOffset = _this4.getRelativeOffset(
							el.offset
						);

						_this4.els[i].top = top + relativeOffset[0];
						_this4.els[i].bottom = bottom - relativeOffset[1];
					});
					this.hasScrollTicking = false;
				},
			},
			{
				key: "getRelativeOffset",
				value: function getRelativeOffset(offset) {
					var relativeOffset = [0, 0];

					if (offset) {
						for (var i = 0; i < offset.length; i++) {
							if (typeof offset[i] == "string") {
								if (offset[i].includes("%")) {
									relativeOffset[i] = parseInt(
										(offset[i].replace("%", "") *
											this.windowHeight) /
											100
									);
								} else {
									relativeOffset[i] = parseInt(offset[i]);
								}
							} else {
								relativeOffset[i] = offset[i];
							}
						}
					}

					return relativeOffset;
				},
				/**
				 * Scroll to a desired target.
				 *
				 * @param  Available options :
				 *          target {node, string, "top", "bottom", int} - The DOM element we want to scroll to
				 *          options {object} - Options object for additionnal settings.
				 * @return {void}
				 */
			},
			{
				key: "scrollTo",
				value: function scrollTo(target) {
					var options =
						arguments.length > 1 && arguments[1] !== undefined
							? arguments[1]
							: {};
					// Parse options
					var offset = parseInt(options.offset) || 0; // An offset to apply on top of given `target` or `sourceElem`'s target

					var callback = options.callback ? options.callback : false; // function called when scrollTo completes (note that it won't wait for lerp to stabilize)

					if (typeof target === "string") {
						// Selector or boundaries
						if (target === "top") {
							target = this.html;
						} else if (target === "bottom") {
							target =
								this.html.offsetHeight - window.innerHeight;
						} else {
							target = document.querySelector(target); // If the query fails, abort

							if (!target) {
								return;
							}
						}
					} else if (typeof target === "number") {
						// Absolute coordinate
						target = parseInt(target);
					} else if (target && target.tagName);
					else {
						console.warn("`target` parameter is not valid");
						return;
					} // We have a target that is not a coordinate yet, get it

					if (typeof target !== "number") {
						offset =
							target.getBoundingClientRect().top +
							offset +
							this.instance.scroll.y;
					} else {
						offset = target + offset;
					}

					var isTargetReached = function isTargetReached() {
						return (
							parseInt(window.pageYOffset) === parseInt(offset)
						);
					};

					if (callback) {
						if (isTargetReached()) {
							callback();
							return;
						} else {
							var onScroll = function onScroll() {
								if (isTargetReached()) {
									window.removeEventListener(
										"scroll",
										onScroll
									);
									callback();
								}
							};

							window.addEventListener("scroll", onScroll);
						}
					}

					window.scrollTo({
						top: offset,
						behavior: options.duration === 0 ? "auto" : "smooth",
					});
				},
			},
			{
				key: "update",
				value: function update() {
					this.addElements();
					this.detectElements();
				},
			},
			{
				key: "destroy",
				value: function destroy() {
					_get(
						_getPrototypeOf(_default.prototype),
						"destroy",
						this
					).call(this);

					window.removeEventListener(
						"scroll",
						this.checkScroll,
						false
					);
				},
			},
		]);

		return _default;
	})(_default);

	/*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError(
				"Object.assign cannot be called with null or undefined"
			);
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String("abc"); // eslint-disable-line no-new-wrappers
			test1[5] = "de";
			if (Object.getOwnPropertyNames(test1)[0] === "5") {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2["_" + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join("") !== "0123456789") {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			"abcdefghijklmnopqrst".split("").forEach(function (letter) {
				test3[letter] = letter;
			});
			if (
				Object.keys(Object.assign({}, test3)).join("") !==
				"abcdefghijklmnopqrst"
			) {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	var objectAssign = shouldUseNative()
		? Object.assign
		: function (target, source) {
				var from;
				var to = toObject(target);
				var symbols;

				for (var s = 1; s < arguments.length; s++) {
					from = Object(arguments[s]);

					for (var key in from) {
						if (hasOwnProperty.call(from, key)) {
							to[key] = from[key];
						}
					}

					if (getOwnPropertySymbols) {
						symbols = getOwnPropertySymbols(from);
						for (var i = 0; i < symbols.length; i++) {
							if (propIsEnumerable.call(from, symbols[i])) {
								to[symbols[i]] = from[symbols[i]];
							}
						}
					}
				}

				return to;
		  };

	function E() {
		// Keep this empty so it's easier to inherit from
		// (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
	}

	E.prototype = {
		on: function (name, callback, ctx) {
			var e = this.e || (this.e = {});

			(e[name] || (e[name] = [])).push({
				fn: callback,
				ctx: ctx,
			});

			return this;
		},

		once: function (name, callback, ctx) {
			var self = this;
			function listener() {
				self.off(name, listener);
				callback.apply(ctx, arguments);
			}
			listener._ = callback;
			return this.on(name, listener, ctx);
		},

		emit: function (name) {
			var data = [].slice.call(arguments, 1);
			var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
			var i = 0;
			var len = evtArr.length;

			for (i; i < len; i++) {
				evtArr[i].fn.apply(evtArr[i].ctx, data);
			}

			return this;
		},

		off: function (name, callback) {
			var e = this.e || (this.e = {});
			var evts = e[name];
			var liveEvents = [];

			if (evts && callback) {
				for (var i = 0, len = evts.length; i < len; i++) {
					if (evts[i].fn !== callback && evts[i].fn._ !== callback)
						liveEvents.push(evts[i]);
				}
			}

			// Remove event from queue to prevent memory leak
			// Suggested by https://github.com/lazd
			// Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

			liveEvents.length ? (e[name] = liveEvents) : delete e[name];

			return this;
		},
	};

	var tinyEmitter = E;

	var lethargy = createCommonjsModule(function (module, exports) {
		// Generated by CoffeeScript 1.9.2
		(function () {
			var root;

			root = exports !== null ? exports : this;

			root.Lethargy = (function () {
				function Lethargy(stability, sensitivity, tolerance, delay) {
					this.stability =
						stability != null ? Math.abs(stability) : 8;
					this.sensitivity =
						sensitivity != null ? 1 + Math.abs(sensitivity) : 100;
					this.tolerance =
						tolerance != null ? 1 + Math.abs(tolerance) : 1.1;
					this.delay = delay != null ? delay : 150;
					this.lastUpDeltas = function () {
						var i, ref, results;
						results = [];
						for (
							i = 1, ref = this.stability * 2;
							1 <= ref ? i <= ref : i >= ref;
							1 <= ref ? i++ : i--
						) {
							results.push(null);
						}
						return results;
					}.call(this);
					this.lastDownDeltas = function () {
						var i, ref, results;
						results = [];
						for (
							i = 1, ref = this.stability * 2;
							1 <= ref ? i <= ref : i >= ref;
							1 <= ref ? i++ : i--
						) {
							results.push(null);
						}
						return results;
					}.call(this);
					this.deltasTimestamp = function () {
						var i, ref, results;
						results = [];
						for (
							i = 1, ref = this.stability * 2;
							1 <= ref ? i <= ref : i >= ref;
							1 <= ref ? i++ : i--
						) {
							results.push(null);
						}
						return results;
					}.call(this);
				}

				Lethargy.prototype.check = function (e) {
					var lastDelta;
					e = e.originalEvent || e;
					if (e.wheelDelta != null) {
						lastDelta = e.wheelDelta;
					} else if (e.deltaY != null) {
						lastDelta = e.deltaY * -40;
					} else if (e.detail != null || e.detail === 0) {
						lastDelta = e.detail * -40;
					}
					this.deltasTimestamp.push(Date.now());
					this.deltasTimestamp.shift();
					if (lastDelta > 0) {
						this.lastUpDeltas.push(lastDelta);
						this.lastUpDeltas.shift();
						return this.isInertia(1);
					} else {
						this.lastDownDeltas.push(lastDelta);
						this.lastDownDeltas.shift();
						return this.isInertia(-1);
					}
				};

				Lethargy.prototype.isInertia = function (direction) {
					var lastDeltas,
						lastDeltasNew,
						lastDeltasOld,
						newAverage,
						newSum,
						oldAverage,
						oldSum;
					lastDeltas =
						direction === -1
							? this.lastDownDeltas
							: this.lastUpDeltas;
					if (lastDeltas[0] === null) {
						return direction;
					}
					if (
						this.deltasTimestamp[this.stability * 2 - 2] +
							this.delay >
							Date.now() &&
						lastDeltas[0] === lastDeltas[this.stability * 2 - 1]
					) {
						return false;
					}
					lastDeltasOld = lastDeltas.slice(0, this.stability);
					lastDeltasNew = lastDeltas.slice(
						this.stability,
						this.stability * 2
					);
					oldSum = lastDeltasOld.reduce(function (t, s) {
						return t + s;
					});
					newSum = lastDeltasNew.reduce(function (t, s) {
						return t + s;
					});
					oldAverage = oldSum / lastDeltasOld.length;
					newAverage = newSum / lastDeltasNew.length;
					if (
						Math.abs(oldAverage) <
							Math.abs(newAverage * this.tolerance) &&
						this.sensitivity < Math.abs(newAverage)
					) {
						return direction;
					} else {
						return false;
					}
				};

				Lethargy.prototype.showLastUpDeltas = function () {
					return this.lastUpDeltas;
				};

				Lethargy.prototype.showLastDownDeltas = function () {
					return this.lastDownDeltas;
				};

				return Lethargy;
			})();
		}).call(commonjsGlobal);
	});

	var support = (function getSupport() {
		return {
			hasWheelEvent: "onwheel" in document,
			hasMouseWheelEvent: "onmousewheel" in document,
			hasTouch:
				"ontouchstart" in window ||
				window.TouchEvent ||
				(window.DocumentTouch && document instanceof DocumentTouch),
			hasTouchWin:
				navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
			hasPointer: !!window.navigator.msPointerEnabled,
			hasKeyDown: "onkeydown" in document,
			isFirefox: navigator.userAgent.indexOf("Firefox") > -1,
		};
	})();

	var toString = Object.prototype.toString,
		hasOwnProperty$1 = Object.prototype.hasOwnProperty;

	var bindallStandalone = function (object) {
		if (!object)
			return console.warn("bindAll requires at least one argument.");

		var functions = Array.prototype.slice.call(arguments, 1);

		if (functions.length === 0) {
			for (var method in object) {
				if (hasOwnProperty$1.call(object, method)) {
					if (
						typeof object[method] == "function" &&
						toString.call(object[method]) == "[object Function]"
					) {
						functions.push(method);
					}
				}
			}
		}

		for (var i = 0; i < functions.length; i++) {
			var f = functions[i];
			object[f] = bind(object[f], object);
		}
	};

	/*
      Faster bind without specific-case checking. (see https://coderwall.com/p/oi3j3w).
      bindAll is only needed for events binding so no need to make slow fixes for constructor
      or partial application.
  */
	function bind(func, context) {
		return function () {
			return func.apply(context, arguments);
		};
	}

	var Lethargy = lethargy.Lethargy;

	var EVT_ID = "virtualscroll";

	var src = VirtualScroll;

	var keyCodes = {
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		SPACE: 32,
	};

	function VirtualScroll(options) {
		bindallStandalone(
			this,
			"_onWheel",
			"_onMouseWheel",
			"_onTouchStart",
			"_onTouchMove",
			"_onKeyDown"
		);

		this.el = window;
		if (options && options.el) {
			this.el = options.el;
			delete options.el;
		}
		this.options = objectAssign(
			{
				mouseMultiplier: 1,
				touchMultiplier: 2,
				firefoxMultiplier: 15,
				keyStep: 120,
				preventTouch: false,
				unpreventTouchClass: "vs-touchmove-allowed",
				limitInertia: false,
				useKeyboard: true,
				useTouch: true,
			},
			options
		);

		if (this.options.limitInertia) this._lethargy = new Lethargy();

		this._emitter = new tinyEmitter();
		this._event = {
			y: 0,
			x: 0,
			deltaX: 0,
			deltaY: 0,
		};
		this.touchStartX = null;
		this.touchStartY = null;
		this.bodyTouchAction = null;

		if (this.options.passive !== undefined) {
			this.listenerOptions = { passive: this.options.passive };
		}
	}

	VirtualScroll.prototype._notify = function (e) {
		var evt = this._event;
		evt.x += evt.deltaX;
		evt.y += evt.deltaY;

		this._emitter.emit(EVT_ID, {
			x: evt.x,
			y: evt.y,
			deltaX: evt.deltaX,
			deltaY: evt.deltaY,
			originalEvent: e,
		});
	};

	VirtualScroll.prototype._onWheel = function (e) {
		var options = this.options;
		if (this._lethargy && this._lethargy.check(e) === false) return;
		var evt = this._event;

		// In Chrome and in Firefox (at least the new one)
		evt.deltaX = e.wheelDeltaX || e.deltaX * -1;
		evt.deltaY = e.wheelDeltaY || e.deltaY * -1;

		// for our purpose deltamode = 1 means user is on a wheel mouse, not touch pad
		// real meaning: https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent#Delta_modes
		if (support.isFirefox && e.deltaMode == 1) {
			evt.deltaX *= options.firefoxMultiplier;
			evt.deltaY *= options.firefoxMultiplier;
		}

		evt.deltaX *= options.mouseMultiplier;
		evt.deltaY *= options.mouseMultiplier;

		this._notify(e);
	};

	VirtualScroll.prototype._onMouseWheel = function (e) {
		if (this.options.limitInertia && this._lethargy.check(e) === false)
			return;

		var evt = this._event;

		// In Safari, IE and in Chrome if 'wheel' isn't defined
		evt.deltaX = e.wheelDeltaX ? e.wheelDeltaX : 0;
		evt.deltaY = e.wheelDeltaY ? e.wheelDeltaY : e.wheelDelta;

		this._notify(e);
	};

	VirtualScroll.prototype._onTouchStart = function (e) {
		var t = e.targetTouches ? e.targetTouches[0] : e;
		this.touchStartX = t.pageX;
		this.touchStartY = t.pageY;
	};

	VirtualScroll.prototype._onTouchMove = function (e) {
		var options = this.options;
		if (
			options.preventTouch &&
			!e.target.classList.contains(options.unpreventTouchClass)
		) {
			e.preventDefault();
		}

		var evt = this._event;

		var t = e.targetTouches ? e.targetTouches[0] : e;

		evt.deltaX = (t.pageX - this.touchStartX) * options.touchMultiplier;
		evt.deltaY = (t.pageY - this.touchStartY) * options.touchMultiplier;

		this.touchStartX = t.pageX;
		this.touchStartY = t.pageY;

		this._notify(e);
	};

	VirtualScroll.prototype._onKeyDown = function (e) {
		var evt = this._event;
		evt.deltaX = evt.deltaY = 0;
		var windowHeight = window.innerHeight - 40;

		switch (e.keyCode) {
			case keyCodes.LEFT:
			case keyCodes.UP:
				evt.deltaY = this.options.keyStep;
				break;

			case keyCodes.RIGHT:
			case keyCodes.DOWN:
				evt.deltaY = -this.options.keyStep;
				break;
			case e.shiftKey:
				evt.deltaY = windowHeight;
				break;
			case keyCodes.SPACE:
				evt.deltaY = -windowHeight;
				break;
			default:
				return;
		}

		this._notify(e);
	};

	VirtualScroll.prototype._bind = function () {
		if (support.hasWheelEvent)
			this.el.addEventListener(
				"wheel",
				this._onWheel,
				this.listenerOptions
			);
		if (support.hasMouseWheelEvent)
			this.el.addEventListener(
				"mousewheel",
				this._onMouseWheel,
				this.listenerOptions
			);

		if (support.hasTouch && this.options.useTouch) {
			this.el.addEventListener(
				"touchstart",
				this._onTouchStart,
				this.listenerOptions
			);
			this.el.addEventListener(
				"touchmove",
				this._onTouchMove,
				this.listenerOptions
			);
		}

		if (support.hasPointer && support.hasTouchWin) {
			this.bodyTouchAction = document.body.style.msTouchAction;
			document.body.style.msTouchAction = "none";
			this.el.addEventListener("MSPointerDown", this._onTouchStart, true);
			this.el.addEventListener("MSPointerMove", this._onTouchMove, true);
		}

		if (support.hasKeyDown && this.options.useKeyboard)
			document.addEventListener("keydown", this._onKeyDown);
	};

	VirtualScroll.prototype._unbind = function () {
		if (support.hasWheelEvent)
			this.el.removeEventListener("wheel", this._onWheel);
		if (support.hasMouseWheelEvent)
			this.el.removeEventListener("mousewheel", this._onMouseWheel);

		if (support.hasTouch) {
			this.el.removeEventListener("touchstart", this._onTouchStart);
			this.el.removeEventListener("touchmove", this._onTouchMove);
		}

		if (support.hasPointer && support.hasTouchWin) {
			document.body.style.msTouchAction = this.bodyTouchAction;
			this.el.removeEventListener(
				"MSPointerDown",
				this._onTouchStart,
				true
			);
			this.el.removeEventListener(
				"MSPointerMove",
				this._onTouchMove,
				true
			);
		}

		if (support.hasKeyDown && this.options.useKeyboard)
			document.removeEventListener("keydown", this._onKeyDown);
	};

	VirtualScroll.prototype.on = function (cb, ctx) {
		this._emitter.on(EVT_ID, cb, ctx);

		var events = this._emitter.e;
		if (events && events[EVT_ID] && events[EVT_ID].length === 1)
			this._bind();
	};

	VirtualScroll.prototype.off = function (cb, ctx) {
		this._emitter.off(EVT_ID, cb, ctx);

		var events = this._emitter.e;
		if (!events[EVT_ID] || events[EVT_ID].length <= 0) this._unbind();
	};

	VirtualScroll.prototype.reset = function () {
		var evt = this._event;
		evt.x = 0;
		evt.y = 0;
	};

	VirtualScroll.prototype.destroy = function () {
		this._emitter.off();
		this._unbind();
	};

	function lerp(start, end, amt) {
		return (1 - amt) * start + amt * end;
	}

	function getTranslate(el) {
		var translate = {};
		if (!window.getComputedStyle) return;
		var style = getComputedStyle(el);
		var transform =
			style.transform || style.webkitTransform || style.mozTransform;
		var mat = transform.match(/^matrix3d\((.+)\)$/);

		if (mat) {
			translate.x = mat ? parseFloat(mat[1].split(", ")[12]) : 0;
			translate.y = mat ? parseFloat(mat[1].split(", ")[13]) : 0;
		} else {
			mat = transform.match(/^matrix\((.+)\)$/);
			translate.x = mat ? parseFloat(mat[1].split(", ")[4]) : 0;
			translate.y = mat ? parseFloat(mat[1].split(", ")[5]) : 0;
		}

		return translate;
	}

	/**
	 * Returns an array containing all the parent nodes of the given node
	 * @param  {object} node
	 * @return {array} parent nodes
	 */
	function getParents(elem) {
		// Set up a parent array
		var parents = []; // Push each parent element to the array

		for (; elem && elem !== document; elem = elem.parentNode) {
			parents.push(elem);
		} // Return our parent array

		return parents;
	} // https://gomakethings.com/how-to-get-the-closest-parent-element-with-a-matching-selector-using-vanilla-javascript/

	/**
	 * https://github.com/gre/bezier-easing
	 * BezierEasing - use bezier curve for transition easing function
	 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
	 */

	// These values are established by empiricism with tests (tradeoff: performance VS precision)
	var NEWTON_ITERATIONS = 4;
	var NEWTON_MIN_SLOPE = 0.001;
	var SUBDIVISION_PRECISION = 0.0000001;
	var SUBDIVISION_MAX_ITERATIONS = 10;

	var kSplineTableSize = 11;
	var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

	var float32ArraySupported = typeof Float32Array === "function";

	function A(aA1, aA2) {
		return 1.0 - 3.0 * aA2 + 3.0 * aA1;
	}
	function B(aA1, aA2) {
		return 3.0 * aA2 - 6.0 * aA1;
	}
	function C(aA1) {
		return 3.0 * aA1;
	}

	// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
	function calcBezier(aT, aA1, aA2) {
		return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
	}

	// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
	function getSlope(aT, aA1, aA2) {
		return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
	}

	function binarySubdivide(aX, aA, aB, mX1, mX2) {
		var currentX,
			currentT,
			i = 0;
		do {
			currentT = aA + (aB - aA) / 2.0;
			currentX = calcBezier(currentT, mX1, mX2) - aX;
			if (currentX > 0.0) {
				aB = currentT;
			} else {
				aA = currentT;
			}
		} while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
		return currentT;
	}

	function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
		for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
			var currentSlope = getSlope(aGuessT, mX1, mX2);
			if (currentSlope === 0.0) {
				return aGuessT;
			}
			var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
			aGuessT -= currentX / currentSlope;
		}
		return aGuessT;
	}

	function LinearEasing(x) {
		return x;
	}

	var src$1 = function bezier(mX1, mY1, mX2, mY2) {
		if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
			throw new Error("bezier x values must be in [0, 1] range");
		}

		if (mX1 === mY1 && mX2 === mY2) {
			return LinearEasing;
		}

		// Precompute samples table
		var sampleValues = float32ArraySupported
			? new Float32Array(kSplineTableSize)
			: new Array(kSplineTableSize);
		for (var i = 0; i < kSplineTableSize; ++i) {
			sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
		}

		function getTForX(aX) {
			var intervalStart = 0.0;
			var currentSample = 1;
			var lastSample = kSplineTableSize - 1;

			for (
				;
				currentSample !== lastSample &&
				sampleValues[currentSample] <= aX;
				++currentSample
			) {
				intervalStart += kSampleStepSize;
			}
			--currentSample;

			// Interpolate to provide an initial guess for t
			var dist =
				(aX - sampleValues[currentSample]) /
				(sampleValues[currentSample + 1] - sampleValues[currentSample]);
			var guessForT = intervalStart + dist * kSampleStepSize;

			var initialSlope = getSlope(guessForT, mX1, mX2);
			if (initialSlope >= NEWTON_MIN_SLOPE) {
				return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
			} else if (initialSlope === 0.0) {
				return guessForT;
			} else {
				return binarySubdivide(
					aX,
					intervalStart,
					intervalStart + kSampleStepSize,
					mX1,
					mX2
				);
			}
		}

		return function BezierEasing(x) {
			// Because JavaScript number are imprecise, we should guarantee the extremes are right.
			if (x === 0) {
				return 0;
			}
			if (x === 1) {
				return 1;
			}
			return calcBezier(getTForX(x), mY1, mY2);
		};
	};

	var keyCodes$1 = {
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		SPACE: 32,
		TAB: 9,
		PAGEUP: 33,
		PAGEDOWN: 34,
		HOME: 36,
		END: 35,
	};

	var _default$2 = /*#__PURE__*/ (function (_Core) {
		_inherits(_default, _Core);

		var _super = _createSuper(_default);

		function _default() {
			var _this;

			var options =
				arguments.length > 0 && arguments[0] !== undefined
					? arguments[0]
					: {};

			_classCallCheck(this, _default);

			if (history.scrollRestoration) {
				history.scrollRestoration = "manual";
			}

			window.scrollTo(0, 0);
			_this = _super.call(this, options);
			if (_this.inertia) _this.lerp = _this.inertia * 0.1;
			_this.isScrolling = false;
			_this.isDraggingScrollbar = false;
			_this.isTicking = false;
			_this.hasScrollTicking = false;
			_this.parallaxElements = {};
			_this.stop = false;
			_this.scrollbarContainer = options.scrollbarContainer;
			_this.checkKey = _this.checkKey.bind(_assertThisInitialized(_this));
			window.addEventListener("keydown", _this.checkKey, false);
			return _this;
		}

		_createClass(_default, [
			{
				key: "init",
				value: function init() {
					var _this2 = this;

					this.html.classList.add(this.smoothClass);
					this.html.setAttribute(
						"data-".concat(this.name, "-direction"),
						this.direction
					);
					this.instance = _objectSpread2(
						{
							delta: {
								x: this.initPosition.x,
								y: this.initPosition.y,
							},
							scroll: {
								x: this.initPosition.x,
								y: this.initPosition.y,
							},
						},
						this.instance
					);
					this.vs = new src({
						el: this.scrollFromAnywhere ? document : this.el,
						mouseMultiplier:
							navigator.platform.indexOf("Win") > -1 ? 1 : 0.4,
						firefoxMultiplier: this.firefoxMultiplier,
						touchMultiplier: this.touchMultiplier,
						useKeyboard: false,
						passive: true,
					});
					this.vs.on(function (e) {
						if (_this2.stop) {
							return;
						}

						if (!_this2.isDraggingScrollbar) {
							requestAnimationFrame(function () {
								_this2.updateDelta(e);

								if (!_this2.isScrolling)
									_this2.startScrolling();
							});
						}
					});
					this.setScrollLimit();
					this.initScrollBar();
					this.addSections();
					this.addElements();
					this.checkScroll(true);
					this.transformElements(true, true);

					_get(
						_getPrototypeOf(_default.prototype),
						"init",
						this
					).call(this);
				},
			},
			{
				key: "setScrollLimit",
				value: function setScrollLimit() {
					this.instance.limit.y =
						this.el.offsetHeight - this.windowHeight;

					if (this.direction === "horizontal") {
						var totalWidth = 0;
						var nodes = this.el.children;

						for (var i = 0; i < nodes.length; i++) {
							totalWidth += nodes[i].offsetWidth;
						}

						this.instance.limit.x = totalWidth - this.windowWidth;
					}
				},
			},
			{
				key: "startScrolling",
				value: function startScrolling() {
					this.startScrollTs = Date.now(); // Record timestamp

					this.isScrolling = true;
					this.checkScroll();
					this.html.classList.add(this.scrollingClass);
				},
			},
			{
				key: "stopScrolling",
				value: function stopScrolling() {
					cancelAnimationFrame(this.checkScrollRaf); // Prevent checkScroll to continue looping
					//Pevent scrollbar glitch/locking

					this.startScrollTs = undefined;

					if (this.scrollToRaf) {
						cancelAnimationFrame(this.scrollToRaf);
						this.scrollToRaf = null;
					}

					this.isScrolling = false;
					this.instance.scroll.y = Math.round(this.instance.scroll.y);
					this.html.classList.remove(this.scrollingClass);
				},
			},
			{
				key: "checkKey",
				value: function checkKey(e) {
					var _this3 = this;

					if (this.stop) {
						// If we are stopped, we don't want any scroll to occur because of a keypress
						// Prevent tab to scroll to activeElement
						if (e.keyCode == keyCodes$1.TAB) {
							requestAnimationFrame(function () {
								// Make sure native scroll is always at top of page
								_this3.html.scrollTop = 0;
								document.body.scrollTop = 0;
								_this3.html.scrollLeft = 0;
								document.body.scrollLeft = 0;
							});
						}

						return;
					}

					switch (e.keyCode) {
						case keyCodes$1.TAB:
							// Do not remove the RAF
							// It allows to override the browser's native scrollTo, which is essential
							requestAnimationFrame(function () {
								// Make sure native scroll is always at top of page
								_this3.html.scrollTop = 0;
								document.body.scrollTop = 0;
								_this3.html.scrollLeft = 0;
								document.body.scrollLeft = 0; // Request scrollTo on the focusedElement, putting it at the center of the screen

								_this3.scrollTo(document.activeElement, {
									offset: -window.innerHeight / 2,
								});
							});
							break;

						case keyCodes$1.UP:
							if (this.isActiveElementScrollSensitive()) {
								this.instance.delta[this.directionAxis] -= 240;
							}

							break;

						case keyCodes$1.DOWN:
							if (this.isActiveElementScrollSensitive()) {
								this.instance.delta[this.directionAxis] += 240;
							}

							break;

						case keyCodes$1.PAGEUP:
							this.instance.delta[this.directionAxis] -=
								window.innerHeight;
							break;

						case keyCodes$1.PAGEDOWN:
							this.instance.delta[this.directionAxis] +=
								window.innerHeight;
							break;

						case keyCodes$1.HOME:
							this.instance.delta[this.directionAxis] -=
								this.instance.limit[this.directionAxis];
							break;

						case keyCodes$1.END:
							this.instance.delta[this.directionAxis] +=
								this.instance.limit[this.directionAxis];
							break;

						case keyCodes$1.SPACE:
							if (this.isActiveElementScrollSensitive()) {
								if (e.shiftKey) {
									this.instance.delta[this.directionAxis] -=
										window.innerHeight;
								} else {
									this.instance.delta[this.directionAxis] +=
										window.innerHeight;
								}
							}

							break;

						default:
							return;
					}

					if (this.instance.delta[this.directionAxis] < 0)
						this.instance.delta[this.directionAxis] = 0;
					if (
						this.instance.delta[this.directionAxis] >
						this.instance.limit[this.directionAxis]
					)
						this.instance.delta[this.directionAxis] =
							this.instance.limit[this.directionAxis];
					this.stopScrolling(); // Stop any movement, allows to kill any other `scrollTo` still happening

					this.isScrolling = true;
					this.checkScroll();
					this.html.classList.add(this.scrollingClass);
				},
			},
			{
				key: "isActiveElementScrollSensitive",
				value: function isActiveElementScrollSensitive() {
					return (
						!(document.activeElement instanceof HTMLInputElement) &&
						!(
							document.activeElement instanceof
							HTMLTextAreaElement
						) &&
						!(
							document.activeElement instanceof HTMLButtonElement
						) &&
						!(document.activeElement instanceof HTMLSelectElement)
					);
				},
			},
			{
				key: "checkScroll",
				value: function checkScroll() {
					var _this4 = this;

					var forced =
						arguments.length > 0 && arguments[0] !== undefined
							? arguments[0]
							: false;

					if (
						forced ||
						this.isScrolling ||
						this.isDraggingScrollbar
					) {
						if (!this.hasScrollTicking) {
							this.checkScrollRaf = requestAnimationFrame(
								function () {
									return _this4.checkScroll();
								}
							);
							this.hasScrollTicking = true;
						}

						this.updateScroll();
						var distance = Math.abs(
							this.instance.delta[this.directionAxis] -
								this.instance.scroll[this.directionAxis]
						);
						var timeSinceStart = Date.now() - this.startScrollTs; // Get the time since the scroll was started: the scroll can be stopped again only past 100ms

						if (
							!this.animatingScroll &&
							timeSinceStart > 100 &&
							((distance < 0.5 &&
								this.instance.delta[this.directionAxis] != 0) ||
								(distance < 0.5 &&
									this.instance.delta[this.directionAxis] ==
										0))
						) {
							this.stopScrolling();
						}

						Object.entries(this.sections).forEach(function (_ref) {
							var _ref2 = _slicedToArray(_ref, 2),
								i = _ref2[0],
								section = _ref2[1];

							if (
								section.persistent ||
								(_this4.instance.scroll[_this4.directionAxis] >
									section.offset[_this4.directionAxis] &&
									_this4.instance.scroll[
										_this4.directionAxis
									] < section.limit[_this4.directionAxis])
							) {
								if (_this4.direction === "horizontal") {
									_this4.transform(
										section.el,
										-_this4.instance.scroll[
											_this4.directionAxis
										],
										0
									);
								} else {
									_this4.transform(
										section.el,
										0,
										-_this4.instance.scroll[
											_this4.directionAxis
										]
									);
								}

								if (!section.inView) {
									section.inView = true;
									section.el.style.opacity = 1;
									section.el.style.pointerEvents = "all";
									section.el.setAttribute(
										"data-".concat(
											_this4.name,
											"-section-inview"
										),
										""
									);
								}
							} else {
								if (section.inView || forced) {
									section.inView = false;
									section.el.style.opacity = 0;
									section.el.style.pointerEvents = "none";
									section.el.removeAttribute(
										"data-".concat(
											_this4.name,
											"-section-inview"
										)
									);
								}

								_this4.transform(section.el, 0, 0);
							}
						});

						if (this.getDirection) {
							this.addDirection();
						}

						if (this.getSpeed) {
							this.addSpeed();
							this.speedTs = Date.now();
						}

						this.detectElements();
						this.transformElements();

						if (this.hasScrollbar) {
							var scrollBarTranslation =
								(this.instance.scroll[this.directionAxis] /
									this.instance.limit[this.directionAxis]) *
								this.scrollBarLimit[this.directionAxis];

							if (this.direction === "horizontal") {
								this.transform(
									this.scrollbarThumb,
									scrollBarTranslation,
									0
								);
							} else {
								this.transform(
									this.scrollbarThumb,
									0,
									scrollBarTranslation
								);
							}
						}

						_get(
							_getPrototypeOf(_default.prototype),
							"checkScroll",
							this
						).call(this);

						this.hasScrollTicking = false;
					}
				},
			},
			{
				key: "resize",
				value: function resize() {
					this.windowHeight = window.innerHeight;
					this.windowWidth = window.innerWidth;
					this.checkContext();
					this.windowMiddle = {
						x: this.windowWidth / 2,
						y: this.windowHeight / 2,
					};
					this.update();
				},
			},
			{
				key: "updateDelta",
				value: function updateDelta(e) {
					var delta;
					var gestureDirection =
						this[this.context] &&
						this[this.context].gestureDirection
							? this[this.context].gestureDirection
							: this.gestureDirection;

					if (gestureDirection === "both") {
						delta = e.deltaX + e.deltaY;
					} else if (gestureDirection === "vertical") {
						delta = e.deltaY;
					} else if (gestureDirection === "horizontal") {
						delta = e.deltaX;
					} else {
						delta = e.deltaY;
					}

					this.instance.delta[this.directionAxis] -=
						delta * this.multiplier;
					if (this.instance.delta[this.directionAxis] < 0)
						this.instance.delta[this.directionAxis] = 0;
					if (
						this.instance.delta[this.directionAxis] >
						this.instance.limit[this.directionAxis]
					)
						this.instance.delta[this.directionAxis] =
							this.instance.limit[this.directionAxis];
				},
			},
			{
				key: "updateScroll",
				value: function updateScroll(e) {
					if (this.isScrolling || this.isDraggingScrollbar) {
						this.instance.scroll[this.directionAxis] = lerp(
							this.instance.scroll[this.directionAxis],
							this.instance.delta[this.directionAxis],
							this.lerp
						);
					} else {
						if (
							this.instance.scroll[this.directionAxis] >
							this.instance.limit[this.directionAxis]
						) {
							this.setScroll(
								this.instance.scroll[this.directionAxis],
								this.instance.limit[this.directionAxis]
							);
						} else if (this.instance.scroll.y < 0) {
							this.setScroll(
								this.instance.scroll[this.directionAxis],
								0
							);
						} else {
							this.setScroll(
								this.instance.scroll[this.directionAxis],
								this.instance.delta[this.directionAxis]
							);
						}
					}
				},
			},
			{
				key: "addDirection",
				value: function addDirection() {
					if (this.instance.delta.y > this.instance.scroll.y) {
						if (this.instance.direction !== "down") {
							this.instance.direction = "down";
						}
					} else if (this.instance.delta.y < this.instance.scroll.y) {
						if (this.instance.direction !== "up") {
							this.instance.direction = "up";
						}
					}

					if (this.instance.delta.x > this.instance.scroll.x) {
						if (this.instance.direction !== "right") {
							this.instance.direction = "right";
						}
					} else if (this.instance.delta.x < this.instance.scroll.x) {
						if (this.instance.direction !== "left") {
							this.instance.direction = "left";
						}
					}
				},
			},
			{
				key: "addSpeed",
				value: function addSpeed() {
					if (
						this.instance.delta[this.directionAxis] !=
						this.instance.scroll[this.directionAxis]
					) {
						this.instance.speed =
							(this.instance.delta[this.directionAxis] -
								this.instance.scroll[this.directionAxis]) /
							Math.max(1, Date.now() - this.speedTs);
					} else {
						this.instance.speed = 0;
					}
				},
			},
			{
				key: "initScrollBar",
				value: function initScrollBar() {
					this.scrollbar = document.createElement("span");
					this.scrollbarThumb = document.createElement("span");
					this.scrollbar.classList.add(
						"".concat(this.scrollbarClass)
					);
					this.scrollbarThumb.classList.add(
						"".concat(this.scrollbarClass, "_thumb")
					);
					this.scrollbar.append(this.scrollbarThumb);

					if (this.scrollbarContainer) {
						this.scrollbarContainer.append(this.scrollbar);
					} else {
						document.body.append(this.scrollbar);
					} // Scrollbar Events

					this.getScrollBar = this.getScrollBar.bind(this);
					this.releaseScrollBar = this.releaseScrollBar.bind(this);
					this.moveScrollBar = this.moveScrollBar.bind(this);
					this.scrollbarThumb.addEventListener(
						"mousedown",
						this.getScrollBar
					);
					window.addEventListener("mouseup", this.releaseScrollBar);
					window.addEventListener("mousemove", this.moveScrollBar); // Set scrollbar values

					this.hasScrollbar = false;

					if (this.direction == "horizontal") {
						if (
							this.instance.limit.x + this.windowWidth <=
							this.windowWidth
						) {
							return;
						}
					} else {
						if (
							this.instance.limit.y + this.windowHeight <=
							this.windowHeight
						) {
							return;
						}
					}

					this.hasScrollbar = true;
					this.scrollbarBCR = this.scrollbar.getBoundingClientRect();
					this.scrollbarHeight = this.scrollbarBCR.height;
					this.scrollbarWidth = this.scrollbarBCR.width;

					if (this.direction === "horizontal") {
						this.scrollbarThumb.style.width = "".concat(
							(this.scrollbarWidth * this.scrollbarWidth) /
								(this.instance.limit.x + this.scrollbarWidth),
							"px"
						);
					} else {
						this.scrollbarThumb.style.height = "".concat(
							(this.scrollbarHeight * this.scrollbarHeight) /
								(this.instance.limit.y + this.scrollbarHeight),
							"px"
						);
					}

					this.scrollbarThumbBCR =
						this.scrollbarThumb.getBoundingClientRect();
					this.scrollBarLimit = {
						x: this.scrollbarWidth - this.scrollbarThumbBCR.width,
						y: this.scrollbarHeight - this.scrollbarThumbBCR.height,
					};
				},
			},
			{
				key: "reinitScrollBar",
				value: function reinitScrollBar() {
					this.hasScrollbar = false;

					if (this.direction == "horizontal") {
						if (
							this.instance.limit.x + this.windowWidth <=
							this.windowWidth
						) {
							return;
						}
					} else {
						if (
							this.instance.limit.y + this.windowHeight <=
							this.windowHeight
						) {
							return;
						}
					}

					this.hasScrollbar = true;
					this.scrollbarBCR = this.scrollbar.getBoundingClientRect();
					this.scrollbarHeight = this.scrollbarBCR.height;
					this.scrollbarWidth = this.scrollbarBCR.width;

					if (this.direction === "horizontal") {
						this.scrollbarThumb.style.width = "".concat(
							(this.scrollbarWidth * this.scrollbarWidth) /
								(this.instance.limit.x + this.scrollbarWidth),
							"px"
						);
					} else {
						this.scrollbarThumb.style.height = "".concat(
							(this.scrollbarHeight * this.scrollbarHeight) /
								(this.instance.limit.y + this.scrollbarHeight),
							"px"
						);
					}

					this.scrollbarThumbBCR =
						this.scrollbarThumb.getBoundingClientRect();
					this.scrollBarLimit = {
						x: this.scrollbarWidth - this.scrollbarThumbBCR.width,
						y: this.scrollbarHeight - this.scrollbarThumbBCR.height,
					};
				},
			},
			{
				key: "destroyScrollBar",
				value: function destroyScrollBar() {
					this.scrollbarThumb.removeEventListener(
						"mousedown",
						this.getScrollBar
					);
					window.removeEventListener(
						"mouseup",
						this.releaseScrollBar
					);
					window.removeEventListener("mousemove", this.moveScrollBar);
					this.scrollbar.remove();
				},
			},
			{
				key: "getScrollBar",
				value: function getScrollBar(e) {
					this.isDraggingScrollbar = true;
					this.checkScroll();
					this.html.classList.remove(this.scrollingClass);
					this.html.classList.add(this.draggingClass);
				},
			},
			{
				key: "releaseScrollBar",
				value: function releaseScrollBar(e) {
					this.isDraggingScrollbar = false;

					if (this.isScrolling) {
						this.html.classList.add(this.scrollingClass);
					}

					this.html.classList.remove(this.draggingClass);
				},
			},
			{
				key: "moveScrollBar",
				value: function moveScrollBar(e) {
					var _this5 = this;

					if (this.isDraggingScrollbar) {
						requestAnimationFrame(function () {
							var x =
								((((e.clientX - _this5.scrollbarBCR.left) *
									100) /
									_this5.scrollbarWidth) *
									_this5.instance.limit.x) /
								100;
							var y =
								((((e.clientY - _this5.scrollbarBCR.top) *
									100) /
									_this5.scrollbarHeight) *
									_this5.instance.limit.y) /
								100;

							if (y > 0 && y < _this5.instance.limit.y) {
								_this5.instance.delta.y = y;
							}

							if (x > 0 && x < _this5.instance.limit.x) {
								_this5.instance.delta.x = x;
							}
						});
					}
				},
			},
			{
				key: "addElements",
				value: function addElements() {
					var _this6 = this;

					this.els = {};
					this.parallaxElements = {}; // this.sections.forEach((section, y) => {

					var els = this.el.querySelectorAll(
						"[data-".concat(this.name, "]")
					);
					els.forEach(function (el, index) {
						// Try and find the target's parent section
						var targetParents = getParents(el);
						var section = Object.entries(_this6.sections)
							.map(function (_ref3) {
								var _ref4 = _slicedToArray(_ref3, 2),
									key = _ref4[0],
									section = _ref4[1];

								return section;
							})
							.find(function (section) {
								return targetParents.includes(section.el);
							});
						var cl =
							el.dataset[_this6.name + "Class"] ||
							_this6["class"];
						var id =
							typeof el.dataset[_this6.name + "Id"] === "string"
								? el.dataset[_this6.name + "Id"]
								: "el" + index;
						var top;
						var left;
						var repeat = el.dataset[_this6.name + "Repeat"];
						var call = el.dataset[_this6.name + "Call"];
						var position = el.dataset[_this6.name + "Position"];
						var delay = el.dataset[_this6.name + "Delay"];
						var direction = el.dataset[_this6.name + "Direction"];
						var sticky =
							typeof el.dataset[_this6.name + "Sticky"] ===
							"string";
						var speed = el.dataset[_this6.name + "Speed"]
							? parseFloat(el.dataset[_this6.name + "Speed"]) / 10
							: false;
						var offset =
							typeof el.dataset[_this6.name + "Offset"] ===
							"string"
								? el.dataset[_this6.name + "Offset"].split(",")
								: _this6.offset;
						var target = el.dataset[_this6.name + "Target"];
						var targetEl;

						if (target !== undefined) {
							targetEl = document.querySelector(
								"".concat(target)
							);
						} else {
							targetEl = el;
						}

						var targetElBCR = targetEl.getBoundingClientRect();

						if (section === null) {
							top =
								targetElBCR.top +
								_this6.instance.scroll.y -
								getTranslate(targetEl).y;
							left =
								targetElBCR.left +
								_this6.instance.scroll.x -
								getTranslate(targetEl).x;
						} else {
							if (!section.inView) {
								top =
									targetElBCR.top -
									getTranslate(section.el).y -
									getTranslate(targetEl).y;
								left =
									targetElBCR.left -
									getTranslate(section.el).x -
									getTranslate(targetEl).x;
							} else {
								top =
									targetElBCR.top +
									_this6.instance.scroll.y -
									getTranslate(targetEl).y;
								left =
									targetElBCR.left +
									_this6.instance.scroll.x -
									getTranslate(targetEl).x;
							}
						}

						var bottom = top + targetEl.offsetHeight;
						var right = left + targetEl.offsetWidth;
						var middle = {
							x: (right - left) / 2 + left,
							y: (bottom - top) / 2 + top,
						};

						if (sticky) {
							var elBCR = el.getBoundingClientRect();
							var elTop = elBCR.top;
							var elLeft = elBCR.left;
							var elDistance = {
								x: elLeft - left,
								y: elTop - top,
							};
							top += window.innerHeight;
							left += window.innerWidth;
							bottom =
								elTop +
								targetEl.offsetHeight -
								el.offsetHeight -
								elDistance[_this6.directionAxis];
							right =
								elLeft +
								targetEl.offsetWidth -
								el.offsetWidth -
								elDistance[_this6.directionAxis];
							middle = {
								x: (right - left) / 2 + left,
								y: (bottom - top) / 2 + top,
							};
						}

						if (repeat == "false") {
							repeat = false;
						} else if (repeat != undefined) {
							repeat = true;
						} else {
							repeat = _this6.repeat;
						}

						var relativeOffset = [0, 0];

						if (offset) {
							if (_this6.direction === "horizontal") {
								for (var i = 0; i < offset.length; i++) {
									if (typeof offset[i] == "string") {
										if (offset[i].includes("%")) {
											relativeOffset[i] = parseInt(
												(offset[i].replace("%", "") *
													_this6.windowWidth) /
													100
											);
										} else {
											relativeOffset[i] = parseInt(
												offset[i]
											);
										}
									} else {
										relativeOffset[i] = offset[i];
									}
								}

								left = left + relativeOffset[0];
								right = right - relativeOffset[1];
							} else {
								for (var i = 0; i < offset.length; i++) {
									if (typeof offset[i] == "string") {
										if (offset[i].includes("%")) {
											relativeOffset[i] = parseInt(
												(offset[i].replace("%", "") *
													_this6.windowHeight) /
													100
											);
										} else {
											relativeOffset[i] = parseInt(
												offset[i]
											);
										}
									} else {
										relativeOffset[i] = offset[i];
									}
								}

								top = top + relativeOffset[0];
								bottom = bottom - relativeOffset[1];
							}
						}

						var mappedEl = {
							el: el,
							id: id,
							class: cl,
							section: section,
							top: top,
							middle: middle,
							bottom: bottom,
							left: left,
							right: right,
							offset: offset,
							progress: 0,
							repeat: repeat,
							inView: false,
							call: call,
							speed: speed,
							delay: delay,
							position: position,
							target: targetEl,
							direction: direction,
							sticky: sticky,
						};
						_this6.els[id] = mappedEl;

						if (el.classList.contains(cl)) {
							_this6.setInView(_this6.els[id], id);
						}

						if (speed !== false || sticky) {
							_this6.parallaxElements[id] = mappedEl;
						}
					}); // });
				},
			},
			{
				key: "addSections",
				value: function addSections() {
					var _this7 = this;

					this.sections = {};
					var sections = this.el.querySelectorAll(
						"[data-".concat(this.name, "-section]")
					);

					if (sections.length === 0) {
						sections = [this.el];
					}

					sections.forEach(function (section, index) {
						var id =
							typeof section.dataset[_this7.name + "Id"] ===
							"string"
								? section.dataset[_this7.name + "Id"]
								: "section" + index;
						var sectionBCR = section.getBoundingClientRect();
						var offset = {
							x:
								sectionBCR.left -
								window.innerWidth * 1.5 -
								getTranslate(section).x,
							y:
								sectionBCR.top -
								window.innerHeight * 1.5 -
								getTranslate(section).y,
						};
						var limit = {
							x:
								offset.x +
								sectionBCR.width +
								window.innerWidth * 2,
							y:
								offset.y +
								sectionBCR.height +
								window.innerHeight * 2,
						};
						var persistent =
							typeof section.dataset[
								_this7.name + "Persistent"
							] === "string";
						section.setAttribute("data-aos-section-id", id);
						var mappedSection = {
							el: section,
							offset: offset,
							limit: limit,
							inView: false,
							persistent: persistent,
							id: id,
						};
						_this7.sections[id] = mappedSection;
					});
				},
			},
			{
				key: "transform",
				value: function transform(element, x, y, delay) {
					var transform;

					if (!delay) {
						transform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,"
							.concat(x, ",")
							.concat(y, ",0,1)");
					} else {
						var start = getTranslate(element);
						var lerpX = lerp(start.x, x, delay);
						var lerpY = lerp(start.y, y, delay);
						transform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,"
							.concat(lerpX, ",")
							.concat(lerpY, ",0,1)");
					}

					element.style.webkitTransform = transform;
					element.style.msTransform = transform;
					element.style.transform = transform;
				},
			},
			{
				key: "transformElements",
				value: function transformElements(isForced) {
					var _this8 = this;

					var setAllElements =
						arguments.length > 1 && arguments[1] !== undefined
							? arguments[1]
							: false;
					var scrollRight = this.instance.scroll.x + this.windowWidth;
					var scrollBottom =
						this.instance.scroll.y + this.windowHeight;
					var scrollMiddle = {
						x: this.instance.scroll.x + this.windowMiddle.x,
						y: this.instance.scroll.y + this.windowMiddle.y,
					};
					Object.entries(this.parallaxElements).forEach(function (
						_ref5
					) {
						var _ref6 = _slicedToArray(_ref5, 2),
							i = _ref6[0],
							current = _ref6[1];

						var transformDistance = false;

						if (isForced) {
							transformDistance = 0;
						}

						if (current.inView || setAllElements) {
							switch (current.position) {
								case "top":
									transformDistance =
										_this8.instance.scroll[
											_this8.directionAxis
										] * -current.speed;
									break;

								case "elementTop":
									transformDistance =
										(scrollBottom - current.top) *
										-current.speed;
									break;

								case "bottom":
									transformDistance =
										(_this8.instance.limit[
											_this8.directionAxis
										] -
											scrollBottom +
											_this8.windowHeight) *
										current.speed;
									break;

								case "left":
									transformDistance =
										_this8.instance.scroll[
											_this8.directionAxis
										] * -current.speed;
									break;

								case "elementLeft":
									transformDistance =
										(scrollRight - current.left) *
										-current.speed;
									break;

								case "right":
									transformDistance =
										(_this8.instance.limit[
											_this8.directionAxis
										] -
											scrollRight +
											_this8.windowHeight) *
										current.speed;
									break;

								default:
									transformDistance =
										(scrollMiddle[_this8.directionAxis] -
											current.middle[
												_this8.directionAxis
											]) *
										-current.speed;
									break;
							}
						}

						if (current.sticky) {
							if (current.inView) {
								if (_this8.direction === "horizontal") {
									transformDistance =
										_this8.instance.scroll.x -
										current.left +
										window.innerWidth;
								} else {
									transformDistance =
										_this8.instance.scroll.y -
										current.top +
										window.innerHeight;
								}
							} else {
								if (_this8.direction === "horizontal") {
									if (
										_this8.instance.scroll.x <
											current.left - window.innerWidth &&
										_this8.instance.scroll.x <
											current.left - window.innerWidth / 2
									) {
										transformDistance = 0;
									} else if (
										_this8.instance.scroll.x >
											current.right &&
										_this8.instance.scroll.x >
											current.right + 100
									) {
										transformDistance =
											current.right -
											current.left +
											window.innerWidth;
									} else {
										transformDistance = false;
									}
								} else {
									if (
										_this8.instance.scroll.y <
											current.top - window.innerHeight &&
										_this8.instance.scroll.y <
											current.top - window.innerHeight / 2
									) {
										transformDistance = 0;
									} else if (
										_this8.instance.scroll.y >
											current.bottom &&
										_this8.instance.scroll.y >
											current.bottom + 100
									) {
										transformDistance =
											current.bottom -
											current.top +
											window.innerHeight;
									} else {
										transformDistance = false;
									}
								}
							}
						}

						if (transformDistance !== false) {
							if (
								current.direction === "horizontal" ||
								(_this8.direction === "horizontal" &&
									current.direction !== "vertical")
							) {
								_this8.transform(
									current.el,
									transformDistance,
									0,
									isForced ? false : current.delay
								);
							} else {
								_this8.transform(
									current.el,
									0,
									transformDistance,
									isForced ? false : current.delay
								);
							}
						}
					});
				},
				/**
				 * Scroll to a desired target.
				 *
				 * @param  Available options :
				 *          target {node, string, "top", "bottom", int} - The DOM element we want to scroll to
				 *          options {object} - Options object for additionnal settings.
				 * @return {void}
				 */
			},
			{
				key: "scrollTo",
				value: function scrollTo(target) {
					var _this9 = this;

					var options =
						arguments.length > 1 && arguments[1] !== undefined
							? arguments[1]
							: {};
					// Parse options
					var offset = parseInt(options.offset) || 0; // An offset to apply on top of given `target` or `sourceElem`'s target

					var duration = !isNaN(parseInt(options.duration))
						? parseInt(options.duration)
						: 1000; // Duration of the scroll animation in milliseconds

					var easing = options.easing || [0.25, 0.0, 0.35, 1.0]; // An array of 4 floats between 0 and 1 defining the bezier curve for the animation's easing. See http://greweb.me/bezier-easing-editor/example/

					var disableLerp = options.disableLerp ? true : false; // Lerp effect won't be applied if set to true

					var callback = options.callback ? options.callback : false; // function called when scrollTo completes (note that it won't wait for lerp to stabilize)

					easing = src$1.apply(void 0, _toConsumableArray(easing));

					if (typeof target === "string") {
						// Selector or boundaries
						if (target === "top") {
							target = 0;
						} else if (target === "bottom") {
							target = this.instance.limit.y;
						} else if (target === "left") {
							target = 0;
						} else if (target === "right") {
							target = this.instance.limit.x;
						} else {
							target = document.querySelector(target); // If the query fails, abort

							if (!target) {
								return;
							}
						}
					} else if (typeof target === "number") {
						// Absolute coordinate
						target = parseInt(target);
					} else if (target && target.tagName);
					else {
						console.warn("`target` parameter is not valid");
						return;
					} // We have a target that is not a coordinate yet, get it

					if (typeof target !== "number") {
						// Verify the given target belongs to this scroll scope
						var targetInScope = getParents(target).includes(
							this.el
						);

						if (!targetInScope) {
							// If the target isn't inside our main element, abort any action
							return;
						} // Get target offset from top

						var targetBCR = target.getBoundingClientRect();
						var offsetTop = targetBCR.top;
						var offsetLeft = targetBCR.left; // Try and find the target's parent section

						var targetParents = getParents(target);
						var parentSection = targetParents.find(function (
							candidate
						) {
							return Object.entries(_this9.sections) // Get sections associative array as a regular array
								.map(function (_ref7) {
									var _ref8 = _slicedToArray(_ref7, 2),
										key = _ref8[0],
										section = _ref8[1];

									return section;
								}) // map to section only (we dont need the key here)
								.find(function (section) {
									return section.el == candidate;
								}); // finally find the section that matches the candidate
						});
						var parentSectionOffset = 0;

						if (parentSection) {
							parentSectionOffset =
								getTranslate(parentSection)[this.directionAxis]; // We got a parent section, store it's current offset to remove it later
						} else {
							// if no parent section is found we need to use instance scroll directly
							parentSectionOffset =
								-this.instance.scroll[this.directionAxis];
						} // Final value of scroll destination : offsetTop + (optional offset given in options) - (parent's section translate)

						if (this.direction === "horizontal") {
							offset = offsetLeft + offset - parentSectionOffset;
						} else {
							offset = offsetTop + offset - parentSectionOffset;
						}
					} else {
						offset = target + offset;
					} // Actual scrollto
					// ==========================================================================
					// Setup

					var scrollStart = parseFloat(
						this.instance.delta[this.directionAxis]
					);
					var scrollTarget = Math.max(
						0,
						Math.min(
							offset,
							this.instance.limit[this.directionAxis]
						)
					); // Make sure our target is in the scroll boundaries

					var scrollDiff = scrollTarget - scrollStart;

					var render = function render(p) {
						if (disableLerp) {
							if (_this9.direction === "horizontal") {
								_this9.setScroll(
									scrollStart + scrollDiff * p,
									_this9.instance.delta.y
								);
							} else {
								_this9.setScroll(
									_this9.instance.delta.x,
									scrollStart + scrollDiff * p
								);
							}
						} else {
							_this9.instance.delta[_this9.directionAxis] =
								scrollStart + scrollDiff * p;
						}
					}; // Prepare the scroll

					this.animatingScroll = true; // This boolean allows to prevent `checkScroll()` from calling `stopScrolling` when the animation is slow (i.e. at the beginning of an EaseIn)

					this.stopScrolling(); // Stop any movement, allows to kill any other `scrollTo` still happening

					this.startScrolling(); // Restart the scroll
					// Start the animation loop

					var start = Date.now();

					var loop = function loop() {
						var p = (Date.now() - start) / duration; // Animation progress

						if (p > 1) {
							// Animation ends
							render(1);
							_this9.animatingScroll = false;
							if (duration == 0) _this9.update();
							if (callback) callback();
						} else {
							_this9.scrollToRaf = requestAnimationFrame(loop);
							render(easing(p));
						}
					};

					loop();
				},
			},
			{
				key: "update",
				value: function update() {
					this.setScrollLimit();
					this.addSections();
					this.addElements();
					this.detectElements();
					this.updateScroll();
					this.transformElements(true);
					this.reinitScrollBar();
					this.checkScroll(true);
				},
			},
			{
				key: "startScroll",
				value: function startScroll() {
					this.stop = false;
				},
			},
			{
				key: "stopScroll",
				value: function stopScroll() {
					this.stop = true;
				},
			},
			{
				key: "setScroll",
				value: function setScroll(x, y) {
					this.instance = _objectSpread2(
						_objectSpread2({}, this.instance),
						{},
						{
							scroll: {
								x: x,
								y: y,
							},
							delta: {
								x: x,
								y: y,
							},
							speed: 0,
						}
					);
				},
			},
			{
				key: "destroy",
				value: function destroy() {
					_get(
						_getPrototypeOf(_default.prototype),
						"destroy",
						this
					).call(this);

					this.stopScrolling();
					this.html.classList.remove(this.smoothClass);
					this.vs.destroy();
					this.destroyScrollBar();
					window.removeEventListener("keydown", this.checkKey, false);
				},
			},
		]);

		return _default;
	})(_default);

	var Smooth = /*#__PURE__*/ (function () {
		function Smooth() {
			var options =
				arguments.length > 0 && arguments[0] !== undefined
					? arguments[0]
					: {};

			_classCallCheck(this, Smooth);

			this.options = options; // Override default options with given ones

			Object.assign(this, defaults, options);
			this.smartphone = defaults.smartphone;
			if (options.smartphone)
				Object.assign(this.smartphone, options.smartphone);
			this.tablet = defaults.tablet;
			if (options.tablet) Object.assign(this.tablet, options.tablet);
			if (!this.smooth && this.direction == "horizontal")
				console.warn(
					"🚨 `smooth:false` & `horizontal` direction are not yet compatible"
				);
			if (!this.tablet.smooth && this.tablet.direction == "horizontal")
				console.warn(
					"🚨 `smooth:false` & `horizontal` direction are not yet compatible (tablet)"
				);
			if (
				!this.smartphone.smooth &&
				this.smartphone.direction == "horizontal"
			)
				console.warn(
					"🚨 `smooth:false` & `horizontal` direction are not yet compatible (smartphone)"
				);
			this.init();
		}

		_createClass(Smooth, [
			{
				key: "init",
				value: function init() {
					this.options.isMobile =
						/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
							navigator.userAgent
						) ||
						(navigator.platform === "MacIntel" &&
							navigator.maxTouchPoints > 1) ||
						window.innerWidth < this.tablet.breakpoint;
					this.options.isTablet =
						this.options.isMobile &&
						window.innerWidth >= this.tablet.breakpoint;

					if (
						(this.smooth && !this.options.isMobile) ||
						(this.tablet.smooth && this.options.isTablet) ||
						(this.smartphone.smooth &&
							this.options.isMobile &&
							!this.options.isTablet)
					) {
						this.scroll = new _default$2(this.options);
					} else {
						this.scroll = new _default$1(this.options);
					}

					this.scroll.init();

					if (window.location.hash) {
						// Get the hash without the '#' and find the matching element
						var id = window.location.hash.slice(
							1,
							window.location.hash.length
						);
						var target = document.getElementById(id); // If found, scroll to the element

						if (target) this.scroll.scrollTo(target);
					}
				},
			},
			{
				key: "update",
				value: function update() {
					this.scroll.update();
				},
			},
			{
				key: "start",
				value: function start() {
					this.scroll.startScroll();
				},
			},
			{
				key: "stop",
				value: function stop() {
					this.scroll.stopScroll();
				},
			},
			{
				key: "scrollTo",
				value: function scrollTo(target, options) {
					this.scroll.scrollTo(target, options);
				},
			},
			{
				key: "setScroll",
				value: function setScroll(x, y) {
					this.scroll.setScroll(x, y);
				},
			},
			{
				key: "on",
				value: function on(event, func) {
					this.scroll.setEvents(event, func);
				},
			},
			{
				key: "off",
				value: function off(event, func) {
					this.scroll.unsetEvents(event, func);
				},
			},
			{
				key: "destroy",
				value: function destroy() {
					this.scroll.destroy();
				},
			},
		]);

		return Smooth;
	})();

	return Smooth;
});

/*!
 * cleave.js - 1.6.0
 * https://github.com/nosir/cleave.js
 * Apache License Version 2.0
 *
 * Copyright (C) 2012-2020 Max Huang https://github.com/nosir/
 */
!(function (e, t) {
	"object" == typeof exports && "object" == typeof module
		? (module.exports = t())
		: "function" == typeof define && define.amd
		? define([], t)
		: "object" == typeof exports
		? (exports.Cleave = t())
		: (e.Cleave = t());
})(this, function () {
	return (function (e) {
		function t(i) {
			if (r[i]) return r[i].exports;
			var n = (r[i] = { exports: {}, id: i, loaded: !1 });
			return (
				e[i].call(n.exports, n, n.exports, t),
				(n.loaded = !0),
				n.exports
			);
		}
		var r = {};
		return (t.m = e), (t.c = r), (t.p = ""), t(0);
	})([
		function (e, t, r) {
			(function (t) {
				"use strict";
				var i = function (e, t) {
					var r = this,
						n = !1;
					if (
						("string" == typeof e
							? ((r.element = document.querySelector(e)),
							  (n = document.querySelectorAll(e).length > 1))
							: "undefined" != typeof e.length && e.length > 0
							? ((r.element = e[0]), (n = e.length > 1))
							: (r.element = e),
						!r.element)
					)
						throw new Error("[cleave.js] Please check the element");
					if (n)
						try {
							console.warn(
								"[cleave.js] Multiple input fields matched, cleave.js will only take the first one."
							);
						} catch (a) {}
					(t.initValue = r.element.value),
						(r.properties = i.DefaultProperties.assign({}, t)),
						r.init();
				};
				(i.prototype = {
					init: function () {
						var e = this,
							t = e.properties;
						return t.numeral ||
							t.phone ||
							t.creditCard ||
							t.time ||
							t.date ||
							0 !== t.blocksLength ||
							t.prefix
							? ((t.maxLength = i.Util.getMaxLength(t.blocks)),
							  (e.isAndroid = i.Util.isAndroid()),
							  (e.lastInputValue = ""),
							  (e.isBackward = ""),
							  (e.onChangeListener = e.onChange.bind(e)),
							  (e.onKeyDownListener = e.onKeyDown.bind(e)),
							  (e.onFocusListener = e.onFocus.bind(e)),
							  (e.onCutListener = e.onCut.bind(e)),
							  (e.onCopyListener = e.onCopy.bind(e)),
							  e.initSwapHiddenInput(),
							  e.element.addEventListener(
									"input",
									e.onChangeListener
							  ),
							  e.element.addEventListener(
									"keydown",
									e.onKeyDownListener
							  ),
							  e.element.addEventListener(
									"focus",
									e.onFocusListener
							  ),
							  e.element.addEventListener(
									"cut",
									e.onCutListener
							  ),
							  e.element.addEventListener(
									"copy",
									e.onCopyListener
							  ),
							  e.initPhoneFormatter(),
							  e.initDateFormatter(),
							  e.initTimeFormatter(),
							  e.initNumeralFormatter(),
							  void (
									(t.initValue ||
										(t.prefix && !t.noImmediatePrefix)) &&
									e.onInput(t.initValue)
							  ))
							: void e.onInput(t.initValue);
					},
					initSwapHiddenInput: function () {
						var e = this,
							t = e.properties;
						if (t.swapHiddenInput) {
							var r = e.element.cloneNode(!0);
							e.element.parentNode.insertBefore(r, e.element),
								(e.elementSwapHidden = e.element),
								(e.elementSwapHidden.type = "hidden"),
								(e.element = r),
								(e.element.id = "");
						}
					},
					initNumeralFormatter: function () {
						var e = this,
							t = e.properties;
						t.numeral &&
							(t.numeralFormatter = new i.NumeralFormatter(
								t.numeralDecimalMark,
								t.numeralIntegerScale,
								t.numeralDecimalScale,
								t.numeralThousandsGroupStyle,
								t.numeralPositiveOnly,
								t.stripLeadingZeroes,
								t.prefix,
								t.signBeforePrefix,
								t.tailPrefix,
								t.delimiter
							));
					},
					initTimeFormatter: function () {
						var e = this,
							t = e.properties;
						t.time &&
							((t.timeFormatter = new i.TimeFormatter(
								t.timePattern,
								t.timeFormat
							)),
							(t.blocks = t.timeFormatter.getBlocks()),
							(t.blocksLength = t.blocks.length),
							(t.maxLength = i.Util.getMaxLength(t.blocks)));
					},
					initDateFormatter: function () {
						var e = this,
							t = e.properties;
						t.date &&
							((t.dateFormatter = new i.DateFormatter(
								t.datePattern,
								t.dateMin,
								t.dateMax
							)),
							(t.blocks = t.dateFormatter.getBlocks()),
							(t.blocksLength = t.blocks.length),
							(t.maxLength = i.Util.getMaxLength(t.blocks)));
					},
					initPhoneFormatter: function () {
						var e = this,
							t = e.properties;
						if (t.phone)
							try {
								t.phoneFormatter = new i.PhoneFormatter(
									new t.root.Cleave.AsYouTypeFormatter(
										t.phoneRegionCode
									),
									t.delimiter
								);
							} catch (r) {
								throw new Error(
									"[cleave.js] Please include phone-type-formatter.{country}.js lib"
								);
							}
					},
					onKeyDown: function (e) {
						var t = this,
							r = e.which || e.keyCode;
						(t.lastInputValue = t.element.value),
							(t.isBackward = 8 === r);
					},
					onChange: function (e) {
						var t = this,
							r = t.properties,
							n = i.Util;
						t.isBackward =
							t.isBackward ||
							"deleteContentBackward" === e.inputType;
						var a = n.getPostDelimiter(
							t.lastInputValue,
							r.delimiter,
							r.delimiters
						);
						t.isBackward && a
							? (r.postDelimiterBackspace = a)
							: (r.postDelimiterBackspace = !1),
							this.onInput(this.element.value);
					},
					onFocus: function () {
						var e = this,
							t = e.properties;
						(e.lastInputValue = e.element.value),
							t.prefix &&
								t.noImmediatePrefix &&
								!e.element.value &&
								this.onInput(t.prefix),
							i.Util.fixPrefixCursor(
								e.element,
								t.prefix,
								t.delimiter,
								t.delimiters
							);
					},
					onCut: function (e) {
						i.Util.checkFullSelection(this.element.value) &&
							(this.copyClipboardData(e), this.onInput(""));
					},
					onCopy: function (e) {
						i.Util.checkFullSelection(this.element.value) &&
							this.copyClipboardData(e);
					},
					copyClipboardData: function (e) {
						var t = this,
							r = t.properties,
							n = i.Util,
							a = t.element.value,
							o = "";
						o = r.copyDelimiter
							? a
							: n.stripDelimiters(a, r.delimiter, r.delimiters);
						try {
							e.clipboardData
								? e.clipboardData.setData("Text", o)
								: window.clipboardData.setData("Text", o),
								e.preventDefault();
						} catch (l) {}
					},
					onInput: function (e) {
						var t = this,
							r = t.properties,
							n = i.Util,
							a = n.getPostDelimiter(
								e,
								r.delimiter,
								r.delimiters
							);
						return (
							r.numeral ||
								!r.postDelimiterBackspace ||
								a ||
								(e = n.headStr(
									e,
									e.length - r.postDelimiterBackspace.length
								)),
							r.phone
								? (!r.prefix ||
								  (r.noImmediatePrefix && !e.length)
										? (r.result =
												r.phoneFormatter.format(e))
										: (r.result =
												r.prefix +
												r.phoneFormatter
													.format(e)
													.slice(r.prefix.length)),
								  void t.updateValueState())
								: r.numeral
								? (r.prefix &&
								  r.noImmediatePrefix &&
								  0 === e.length
										? (r.result = "")
										: (r.result =
												r.numeralFormatter.format(e)),
								  void t.updateValueState())
								: (r.date &&
										(e =
											r.dateFormatter.getValidatedDate(
												e
											)),
								  r.time &&
										(e =
											r.timeFormatter.getValidatedTime(
												e
											)),
								  (e = n.stripDelimiters(
										e,
										r.delimiter,
										r.delimiters
								  )),
								  (e = n.getPrefixStrippedValue(
										e,
										r.prefix,
										r.prefixLength,
										r.result,
										r.delimiter,
										r.delimiters,
										r.noImmediatePrefix,
										r.tailPrefix,
										r.signBeforePrefix
								  )),
								  (e = r.numericOnly
										? n.strip(e, /[^\d]/g)
										: e),
								  (e = r.uppercase ? e.toUpperCase() : e),
								  (e = r.lowercase ? e.toLowerCase() : e),
								  r.prefix &&
								  (r.tailPrefix
										? (e += r.prefix)
										: (e = r.prefix + e),
								  0 === r.blocksLength)
										? ((r.result = e),
										  void t.updateValueState())
										: (r.creditCard &&
												t.updateCreditCardPropsByValue(
													e
												),
										  (e = n.headStr(e, r.maxLength)),
										  (r.result = n.getFormattedValue(
												e,
												r.blocks,
												r.blocksLength,
												r.delimiter,
												r.delimiters,
												r.delimiterLazyShow
										  )),
										  void t.updateValueState()))
						);
					},
					updateCreditCardPropsByValue: function (e) {
						var t,
							r = this,
							n = r.properties,
							a = i.Util;
						a.headStr(n.result, 4) !== a.headStr(e, 4) &&
							((t = i.CreditCardDetector.getInfo(
								e,
								n.creditCardStrictMode
							)),
							(n.blocks = t.blocks),
							(n.blocksLength = n.blocks.length),
							(n.maxLength = a.getMaxLength(n.blocks)),
							n.creditCardType !== t.type &&
								((n.creditCardType = t.type),
								n.onCreditCardTypeChanged.call(
									r,
									n.creditCardType
								)));
					},
					updateValueState: function () {
						var e = this,
							t = i.Util,
							r = e.properties;
						if (e.element) {
							var n = e.element.selectionEnd,
								a = e.element.value,
								o = r.result;
							if (
								((n = t.getNextCursorPosition(
									n,
									a,
									o,
									r.delimiter,
									r.delimiters
								)),
								e.isAndroid)
							)
								return void window.setTimeout(function () {
									(e.element.value = o),
										t.setSelection(
											e.element,
											n,
											r.document,
											!1
										),
										e.callOnValueChanged();
								}, 1);
							(e.element.value = o),
								r.swapHiddenInput &&
									(e.elementSwapHidden.value =
										e.getRawValue()),
								t.setSelection(e.element, n, r.document, !1),
								e.callOnValueChanged();
						}
					},
					callOnValueChanged: function () {
						var e = this,
							t = e.properties;
						t.onValueChanged.call(e, {
							target: {
								name: e.element.name,
								value: t.result,
								rawValue: e.getRawValue(),
							},
						});
					},
					setPhoneRegionCode: function (e) {
						var t = this,
							r = t.properties;
						(r.phoneRegionCode = e),
							t.initPhoneFormatter(),
							t.onChange();
					},
					setRawValue: function (e) {
						var t = this,
							r = t.properties;
						(e = void 0 !== e && null !== e ? e.toString() : ""),
							r.numeral &&
								(e = e.replace(".", r.numeralDecimalMark)),
							(r.postDelimiterBackspace = !1),
							(t.element.value = e),
							t.onInput(e);
					},
					getRawValue: function () {
						var e = this,
							t = e.properties,
							r = i.Util,
							n = e.element.value;
						return (
							t.rawValueTrimPrefix &&
								(n = r.getPrefixStrippedValue(
									n,
									t.prefix,
									t.prefixLength,
									t.result,
									t.delimiter,
									t.delimiters,
									t.noImmediatePrefix,
									t.tailPrefix,
									t.signBeforePrefix
								)),
							(n = t.numeral
								? t.numeralFormatter.getRawValue(n)
								: r.stripDelimiters(
										n,
										t.delimiter,
										t.delimiters
								  ))
						);
					},
					getISOFormatDate: function () {
						var e = this,
							t = e.properties;
						return t.date ? t.dateFormatter.getISOFormatDate() : "";
					},
					getISOFormatTime: function () {
						var e = this,
							t = e.properties;
						return t.time ? t.timeFormatter.getISOFormatTime() : "";
					},
					getFormattedValue: function () {
						return this.element.value;
					},
					destroy: function () {
						var e = this;
						e.element.removeEventListener(
							"input",
							e.onChangeListener
						),
							e.element.removeEventListener(
								"keydown",
								e.onKeyDownListener
							),
							e.element.removeEventListener(
								"focus",
								e.onFocusListener
							),
							e.element.removeEventListener(
								"cut",
								e.onCutListener
							),
							e.element.removeEventListener(
								"copy",
								e.onCopyListener
							);
					},
					toString: function () {
						return "[Cleave Object]";
					},
				}),
					(i.NumeralFormatter = r(1)),
					(i.DateFormatter = r(2)),
					(i.TimeFormatter = r(3)),
					(i.PhoneFormatter = r(4)),
					(i.CreditCardDetector = r(5)),
					(i.Util = r(6)),
					(i.DefaultProperties = r(7)),
					(("object" == typeof t && t ? t : window).Cleave = i),
					(e.exports = i);
			}).call(
				t,
				(function () {
					return this;
				})()
			);
		},
		function (e, t) {
			"use strict";
			var r = function (e, t, i, n, a, o, l, s, c, u) {
				var d = this;
				(d.numeralDecimalMark = e || "."),
					(d.numeralIntegerScale = t > 0 ? t : 0),
					(d.numeralDecimalScale = i >= 0 ? i : 2),
					(d.numeralThousandsGroupStyle = n || r.groupStyle.thousand),
					(d.numeralPositiveOnly = !!a),
					(d.stripLeadingZeroes = o !== !1),
					(d.prefix = l || "" === l ? l : ""),
					(d.signBeforePrefix = !!s),
					(d.tailPrefix = !!c),
					(d.delimiter = u || "" === u ? u : ","),
					(d.delimiterRE = u ? new RegExp("\\" + u, "g") : "");
			};
			(r.groupStyle = {
				thousand: "thousand",
				lakh: "lakh",
				wan: "wan",
				none: "none",
			}),
				(r.prototype = {
					getRawValue: function (e) {
						return e
							.replace(this.delimiterRE, "")
							.replace(this.numeralDecimalMark, ".");
					},
					format: function (e) {
						var t,
							i,
							n,
							a,
							o = this,
							l = "";
						switch (
							((e = e
								.replace(/[A-Za-z]/g, "")
								.replace(o.numeralDecimalMark, "M")
								.replace(/[^\dM-]/g, "")
								.replace(/^\-/, "N")
								.replace(/\-/g, "")
								.replace("N", o.numeralPositiveOnly ? "" : "-")
								.replace("M", o.numeralDecimalMark)),
							o.stripLeadingZeroes &&
								(e = e.replace(/^(-)?0+(?=\d)/, "$1")),
							(i = "-" === e.slice(0, 1) ? "-" : ""),
							(n =
								"undefined" != typeof o.prefix
									? o.signBeforePrefix
										? i + o.prefix
										: o.prefix + i
									: i),
							(a = e),
							e.indexOf(o.numeralDecimalMark) >= 0 &&
								((t = e.split(o.numeralDecimalMark)),
								(a = t[0]),
								(l =
									o.numeralDecimalMark +
									t[1].slice(0, o.numeralDecimalScale))),
							"-" === i && (a = a.slice(1)),
							o.numeralIntegerScale > 0 &&
								(a = a.slice(0, o.numeralIntegerScale)),
							o.numeralThousandsGroupStyle)
						) {
							case r.groupStyle.lakh:
								a = a.replace(
									/(\d)(?=(\d\d)+\d$)/g,
									"$1" + o.delimiter
								);
								break;
							case r.groupStyle.wan:
								a = a.replace(
									/(\d)(?=(\d{4})+$)/g,
									"$1" + o.delimiter
								);
								break;
							case r.groupStyle.thousand:
								a = a.replace(
									/(\d)(?=(\d{3})+$)/g,
									"$1" + o.delimiter
								);
						}
						return o.tailPrefix
							? i +
									a.toString() +
									(o.numeralDecimalScale > 0
										? l.toString()
										: "") +
									o.prefix
							: n +
									a.toString() +
									(o.numeralDecimalScale > 0
										? l.toString()
										: "");
					},
				}),
				(e.exports = r);
		},
		function (e, t) {
			"use strict";
			var r = function (e, t, r) {
				var i = this;
				(i.date = []),
					(i.blocks = []),
					(i.datePattern = e),
					(i.dateMin = t
						.split("-")
						.reverse()
						.map(function (e) {
							return parseInt(e, 10);
						})),
					2 === i.dateMin.length && i.dateMin.unshift(0),
					(i.dateMax = r
						.split("-")
						.reverse()
						.map(function (e) {
							return parseInt(e, 10);
						})),
					2 === i.dateMax.length && i.dateMax.unshift(0),
					i.initBlocks();
			};
			(r.prototype = {
				initBlocks: function () {
					var e = this;
					e.datePattern.forEach(function (t) {
						"Y" === t ? e.blocks.push(4) : e.blocks.push(2);
					});
				},
				getISOFormatDate: function () {
					var e = this,
						t = e.date;
					return t[2]
						? t[2] +
								"-" +
								e.addLeadingZero(t[1]) +
								"-" +
								e.addLeadingZero(t[0])
						: "";
				},
				getBlocks: function () {
					return this.blocks;
				},
				getValidatedDate: function (e) {
					var t = this,
						r = "";
					return (
						(e = e.replace(/[^\d]/g, "")),
						t.blocks.forEach(function (i, n) {
							if (e.length > 0) {
								var a = e.slice(0, i),
									o = a.slice(0, 1),
									l = e.slice(i);
								switch (t.datePattern[n]) {
									case "d":
										"00" === a
											? (a = "01")
											: parseInt(o, 10) > 3
											? (a = "0" + o)
											: parseInt(a, 10) > 31 &&
											  (a = "31");
										break;
									case "m":
										"00" === a
											? (a = "01")
											: parseInt(o, 10) > 1
											? (a = "0" + o)
											: parseInt(a, 10) > 12 &&
											  (a = "12");
								}
								(r += a), (e = l);
							}
						}),
						this.getFixedDateString(r)
					);
				},
				getFixedDateString: function (e) {
					var t,
						r,
						i,
						n = this,
						a = n.datePattern,
						o = [],
						l = 0,
						s = 0,
						c = 0,
						u = 0,
						d = 0,
						m = 0,
						p = !1;
					4 === e.length &&
						"y" !== a[0].toLowerCase() &&
						"y" !== a[1].toLowerCase() &&
						((u = "d" === a[0] ? 0 : 2),
						(d = 2 - u),
						(t = parseInt(e.slice(u, u + 2), 10)),
						(r = parseInt(e.slice(d, d + 2), 10)),
						(o = this.getFixedDate(t, r, 0))),
						8 === e.length &&
							(a.forEach(function (e, t) {
								switch (e) {
									case "d":
										l = t;
										break;
									case "m":
										s = t;
										break;
									default:
										c = t;
								}
							}),
							(m = 2 * c),
							(u = l <= c ? 2 * l : 2 * l + 2),
							(d = s <= c ? 2 * s : 2 * s + 2),
							(t = parseInt(e.slice(u, u + 2), 10)),
							(r = parseInt(e.slice(d, d + 2), 10)),
							(i = parseInt(e.slice(m, m + 4), 10)),
							(p = 4 === e.slice(m, m + 4).length),
							(o = this.getFixedDate(t, r, i))),
						4 !== e.length ||
							("y" !== a[0] && "y" !== a[1]) ||
							((d = "m" === a[0] ? 0 : 2),
							(m = 2 - d),
							(r = parseInt(e.slice(d, d + 2), 10)),
							(i = parseInt(e.slice(m, m + 2), 10)),
							(p = 2 === e.slice(m, m + 2).length),
							(o = [0, r, i])),
						6 !== e.length ||
							("Y" !== a[0] && "Y" !== a[1]) ||
							((d = "m" === a[0] ? 0 : 4),
							(m = 2 - 0.5 * d),
							(r = parseInt(e.slice(d, d + 2), 10)),
							(i = parseInt(e.slice(m, m + 4), 10)),
							(p = 4 === e.slice(m, m + 4).length),
							(o = [0, r, i])),
						(o = n.getRangeFixedDate(o)),
						(n.date = o);
					var h =
						0 === o.length
							? e
							: a.reduce(function (e, t) {
									switch (t) {
										case "d":
											return (
												e +
												(0 === o[0]
													? ""
													: n.addLeadingZero(o[0]))
											);
										case "m":
											return (
												e +
												(0 === o[1]
													? ""
													: n.addLeadingZero(o[1]))
											);
										case "y":
											return (
												e +
												(p
													? n.addLeadingZeroForYear(
															o[2],
															!1
													  )
													: "")
											);
										case "Y":
											return (
												e +
												(p
													? n.addLeadingZeroForYear(
															o[2],
															!0
													  )
													: "")
											);
									}
							  }, "");
					return h;
				},
				getRangeFixedDate: function (e) {
					var t = this,
						r = t.datePattern,
						i = t.dateMin || [],
						n = t.dateMax || [];
					return !e.length || (i.length < 3 && n.length < 3)
						? e
						: r.find(function (e) {
								return "y" === e.toLowerCase();
						  }) && 0 === e[2]
						? e
						: n.length &&
						  (n[2] < e[2] ||
								(n[2] === e[2] &&
									(n[1] < e[1] ||
										(n[1] === e[1] && n[0] < e[0]))))
						? n
						: i.length &&
						  (i[2] > e[2] ||
								(i[2] === e[2] &&
									(i[1] > e[1] ||
										(i[1] === e[1] && i[0] > e[0]))))
						? i
						: e;
				},
				getFixedDate: function (e, t, r) {
					return (
						(e = Math.min(e, 31)),
						(t = Math.min(t, 12)),
						(r = parseInt(r || 0, 10)),
						((t < 7 && t % 2 === 0) || (t > 8 && t % 2 === 1)) &&
							(e = Math.min(
								e,
								2 === t ? (this.isLeapYear(r) ? 29 : 28) : 30
							)),
						[e, t, r]
					);
				},
				isLeapYear: function (e) {
					return (e % 4 === 0 && e % 100 !== 0) || e % 400 === 0;
				},
				addLeadingZero: function (e) {
					return (e < 10 ? "0" : "") + e;
				},
				addLeadingZeroForYear: function (e, t) {
					return t
						? (e < 10
								? "000"
								: e < 100
								? "00"
								: e < 1e3
								? "0"
								: "") + e
						: (e < 10 ? "0" : "") + e;
				},
			}),
				(e.exports = r);
		},
		function (e, t) {
			"use strict";
			var r = function (e, t) {
				var r = this;
				(r.time = []),
					(r.blocks = []),
					(r.timePattern = e),
					(r.timeFormat = t),
					r.initBlocks();
			};
			(r.prototype = {
				initBlocks: function () {
					var e = this;
					e.timePattern.forEach(function () {
						e.blocks.push(2);
					});
				},
				getISOFormatTime: function () {
					var e = this,
						t = e.time;
					return t[2]
						? e.addLeadingZero(t[0]) +
								":" +
								e.addLeadingZero(t[1]) +
								":" +
								e.addLeadingZero(t[2])
						: "";
				},
				getBlocks: function () {
					return this.blocks;
				},
				getTimeFormatOptions: function () {
					var e = this;
					return "12" === String(e.timeFormat)
						? {
								maxHourFirstDigit: 1,
								maxHours: 12,
								maxMinutesFirstDigit: 5,
								maxMinutes: 60,
						  }
						: {
								maxHourFirstDigit: 2,
								maxHours: 23,
								maxMinutesFirstDigit: 5,
								maxMinutes: 60,
						  };
				},
				getValidatedTime: function (e) {
					var t = this,
						r = "";
					e = e.replace(/[^\d]/g, "");
					var i = t.getTimeFormatOptions();
					return (
						t.blocks.forEach(function (n, a) {
							if (e.length > 0) {
								var o = e.slice(0, n),
									l = o.slice(0, 1),
									s = e.slice(n);
								switch (t.timePattern[a]) {
									case "h":
										parseInt(l, 10) > i.maxHourFirstDigit
											? (o = "0" + l)
											: parseInt(o, 10) > i.maxHours &&
											  (o = i.maxHours + "");
										break;
									case "m":
									case "s":
										parseInt(l, 10) > i.maxMinutesFirstDigit
											? (o = "0" + l)
											: parseInt(o, 10) > i.maxMinutes &&
											  (o = i.maxMinutes + "");
								}
								(r += o), (e = s);
							}
						}),
						this.getFixedTimeString(r)
					);
				},
				getFixedTimeString: function (e) {
					var t,
						r,
						i,
						n = this,
						a = n.timePattern,
						o = [],
						l = 0,
						s = 0,
						c = 0,
						u = 0,
						d = 0,
						m = 0;
					return (
						6 === e.length &&
							(a.forEach(function (e, t) {
								switch (e) {
									case "s":
										l = 2 * t;
										break;
									case "m":
										s = 2 * t;
										break;
									case "h":
										c = 2 * t;
								}
							}),
							(m = c),
							(d = s),
							(u = l),
							(t = parseInt(e.slice(u, u + 2), 10)),
							(r = parseInt(e.slice(d, d + 2), 10)),
							(i = parseInt(e.slice(m, m + 2), 10)),
							(o = this.getFixedTime(i, r, t))),
						4 === e.length &&
							n.timePattern.indexOf("s") < 0 &&
							(a.forEach(function (e, t) {
								switch (e) {
									case "m":
										s = 2 * t;
										break;
									case "h":
										c = 2 * t;
								}
							}),
							(m = c),
							(d = s),
							(t = 0),
							(r = parseInt(e.slice(d, d + 2), 10)),
							(i = parseInt(e.slice(m, m + 2), 10)),
							(o = this.getFixedTime(i, r, t))),
						(n.time = o),
						0 === o.length
							? e
							: a.reduce(function (e, t) {
									switch (t) {
										case "s":
											return e + n.addLeadingZero(o[2]);
										case "m":
											return e + n.addLeadingZero(o[1]);
										case "h":
											return e + n.addLeadingZero(o[0]);
									}
							  }, "")
					);
				},
				getFixedTime: function (e, t, r) {
					return (
						(r = Math.min(parseInt(r || 0, 10), 60)),
						(t = Math.min(t, 60)),
						(e = Math.min(e, 60)),
						[e, t, r]
					);
				},
				addLeadingZero: function (e) {
					return (e < 10 ? "0" : "") + e;
				},
			}),
				(e.exports = r);
		},
		function (e, t) {
			"use strict";
			var r = function (e, t) {
				var r = this;
				(r.delimiter = t || "" === t ? t : " "),
					(r.delimiterRE = t ? new RegExp("\\" + t, "g") : ""),
					(r.formatter = e);
			};
			(r.prototype = {
				setFormatter: function (e) {
					this.formatter = e;
				},
				format: function (e) {
					var t = this;
					t.formatter.clear(),
						(e = e.replace(/[^\d+]/g, "")),
						(e = e
							.replace(/^\+/, "B")
							.replace(/\+/g, "")
							.replace("B", "+")),
						(e = e.replace(t.delimiterRE, ""));
					for (var r, i = "", n = !1, a = 0, o = e.length; a < o; a++)
						(r = t.formatter.inputDigit(e.charAt(a))),
							/[\s()-]/g.test(r)
								? ((i = r), (n = !0))
								: n || (i = r);
					return (
						(i = i.replace(/[()]/g, "")),
						(i = i.replace(/[\s-]/g, t.delimiter))
					);
				},
			}),
				(e.exports = r);
		},
		function (e, t) {
			"use strict";
			var r = {
				blocks: {
					uatp: [4, 5, 6],
					amex: [4, 6, 5],
					diners: [4, 6, 4],
					discover: [4, 4, 4, 4],
					mastercard: [4, 4, 4, 4],
					dankort: [4, 4, 4, 4],
					instapayment: [4, 4, 4, 4],
					jcb15: [4, 6, 5],
					jcb: [4, 4, 4, 4],
					maestro: [4, 4, 4, 4],
					visa: [4, 4, 4, 4],
					mir: [4, 4, 4, 4],
					unionPay: [4, 4, 4, 4],
					general: [4, 4, 4, 4],
				},
				re: {
					uatp: /^(?!1800)1\d{0,14}/,
					amex: /^3[47]\d{0,13}/,
					discover: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
					diners: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
					mastercard:
						/^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
					dankort: /^(5019|4175|4571)\d{0,12}/,
					instapayment: /^63[7-9]\d{0,13}/,
					jcb15: /^(?:2131|1800)\d{0,11}/,
					jcb: /^(?:35\d{0,2})\d{0,12}/,
					maestro: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
					mir: /^220[0-4]\d{0,12}/,
					visa: /^4\d{0,15}/,
					unionPay: /^(62|81)\d{0,14}/,
				},
				getStrictBlocks: function (e) {
					var t = e.reduce(function (e, t) {
						return e + t;
					}, 0);
					return e.concat(19 - t);
				},
				getInfo: function (e, t) {
					var i = r.blocks,
						n = r.re;
					t = !!t;
					for (var a in n)
						if (n[a].test(e)) {
							var o = i[a];
							return {
								type: a,
								blocks: t ? this.getStrictBlocks(o) : o,
							};
						}
					return {
						type: "unknown",
						blocks: t ? this.getStrictBlocks(i.general) : i.general,
					};
				},
			};
			e.exports = r;
		},
		function (e, t) {
			"use strict";
			var r = {
				noop: function () {},
				strip: function (e, t) {
					return e.replace(t, "");
				},
				getPostDelimiter: function (e, t, r) {
					if (0 === r.length)
						return e.slice(-t.length) === t ? t : "";
					var i = "";
					return (
						r.forEach(function (t) {
							e.slice(-t.length) === t && (i = t);
						}),
						i
					);
				},
				getDelimiterREByDelimiter: function (e) {
					return new RegExp(
						e.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"),
						"g"
					);
				},
				getNextCursorPosition: function (e, t, r, i, n) {
					return t.length === e
						? r.length
						: e + this.getPositionOffset(e, t, r, i, n);
				},
				getPositionOffset: function (e, t, r, i, n) {
					var a, o, l;
					return (
						(a = this.stripDelimiters(t.slice(0, e), i, n)),
						(o = this.stripDelimiters(r.slice(0, e), i, n)),
						(l = a.length - o.length),
						0 !== l ? l / Math.abs(l) : 0
					);
				},
				stripDelimiters: function (e, t, r) {
					var i = this;
					if (0 === r.length) {
						var n = t ? i.getDelimiterREByDelimiter(t) : "";
						return e.replace(n, "");
					}
					return (
						r.forEach(function (t) {
							t.split("").forEach(function (t) {
								e = e.replace(
									i.getDelimiterREByDelimiter(t),
									""
								);
							});
						}),
						e
					);
				},
				headStr: function (e, t) {
					return e.slice(0, t);
				},
				getMaxLength: function (e) {
					return e.reduce(function (e, t) {
						return e + t;
					}, 0);
				},
				getPrefixStrippedValue: function (e, t, r, i, n, a, o, l, s) {
					if (0 === r) return e;
					if (e === t && "" !== e) return "";
					if (s && "-" == e.slice(0, 1)) {
						var c = "-" == i.slice(0, 1) ? i.slice(1) : i;
						return (
							"-" +
							this.getPrefixStrippedValue(
								e.slice(1),
								t,
								r,
								c,
								n,
								a,
								o,
								l,
								s
							)
						);
					}
					if (i.slice(0, r) !== t && !l) return o && !i && e ? e : "";
					if (i.slice(-r) !== t && l) return o && !i && e ? e : "";
					var u = this.stripDelimiters(i, n, a);
					return e.slice(0, r) === t || l
						? e.slice(-r) !== t && l
							? u.slice(0, -r - 1)
							: l
							? e.slice(0, -r)
							: e.slice(r)
						: u.slice(r);
				},
				getFirstDiffIndex: function (e, t) {
					for (var r = 0; e.charAt(r) === t.charAt(r); )
						if ("" === e.charAt(r++)) return -1;
					return r;
				},
				getFormattedValue: function (e, t, r, i, n, a) {
					var o = "",
						l = n.length > 0,
						s = "";
					return 0 === r
						? e
						: (t.forEach(function (t, c) {
								if (e.length > 0) {
									var u = e.slice(0, t),
										d = e.slice(t);
									(s = l ? n[a ? c - 1 : c] || s : i),
										a
											? (c > 0 && (o += s), (o += u))
											: ((o += u),
											  u.length === t &&
													c < r - 1 &&
													(o += s)),
										(e = d);
								}
						  }),
						  o);
				},
				fixPrefixCursor: function (e, t, r, i) {
					if (e) {
						var n = e.value,
							a = r || i[0] || " ";
						if (
							e.setSelectionRange &&
							t &&
							!(t.length + a.length <= n.length)
						) {
							var o = 2 * n.length;
							setTimeout(function () {
								e.setSelectionRange(o, o);
							}, 1);
						}
					}
				},
				checkFullSelection: function (e) {
					try {
						var t =
							window.getSelection() ||
							document.getSelection() ||
							{};
						return t.toString().length === e.length;
					} catch (r) {}
					return !1;
				},
				setSelection: function (e, t, r) {
					if (
						e === this.getActiveElement(r) &&
						!(e && e.value.length <= t)
					)
						if (e.createTextRange) {
							var i = e.createTextRange();
							i.move("character", t), i.select();
						} else
							try {
								e.setSelectionRange(t, t);
							} catch (n) {
								console.warn(
									"The input element type does not support selection"
								);
							}
				},
				getActiveElement: function (e) {
					var t = e.activeElement;
					return t && t.shadowRoot
						? this.getActiveElement(t.shadowRoot)
						: t;
				},
				isAndroid: function () {
					return navigator && /android/i.test(navigator.userAgent);
				},
				isAndroidBackspaceKeydown: function (e, t) {
					return (
						!!(this.isAndroid() && e && t) && t === e.slice(0, -1)
					);
				},
			};
			e.exports = r;
		},
		function (e, t) {
			(function (t) {
				"use strict";
				var r = {
					assign: function (e, r) {
						return (
							(e = e || {}),
							(r = r || {}),
							(e.creditCard = !!r.creditCard),
							(e.creditCardStrictMode = !!r.creditCardStrictMode),
							(e.creditCardType = ""),
							(e.onCreditCardTypeChanged =
								r.onCreditCardTypeChanged || function () {}),
							(e.phone = !!r.phone),
							(e.phoneRegionCode = r.phoneRegionCode || "AU"),
							(e.phoneFormatter = {}),
							(e.time = !!r.time),
							(e.timePattern = r.timePattern || ["h", "m", "s"]),
							(e.timeFormat = r.timeFormat || "24"),
							(e.timeFormatter = {}),
							(e.date = !!r.date),
							(e.datePattern = r.datePattern || ["d", "m", "Y"]),
							(e.dateMin = r.dateMin || ""),
							(e.dateMax = r.dateMax || ""),
							(e.dateFormatter = {}),
							(e.numeral = !!r.numeral),
							(e.numeralIntegerScale =
								r.numeralIntegerScale > 0
									? r.numeralIntegerScale
									: 0),
							(e.numeralDecimalScale =
								r.numeralDecimalScale >= 0
									? r.numeralDecimalScale
									: 2),
							(e.numeralDecimalMark =
								r.numeralDecimalMark || "."),
							(e.numeralThousandsGroupStyle =
								r.numeralThousandsGroupStyle || "thousand"),
							(e.numeralPositiveOnly = !!r.numeralPositiveOnly),
							(e.stripLeadingZeroes =
								r.stripLeadingZeroes !== !1),
							(e.signBeforePrefix = !!r.signBeforePrefix),
							(e.tailPrefix = !!r.tailPrefix),
							(e.swapHiddenInput = !!r.swapHiddenInput),
							(e.numericOnly =
								e.creditCard || e.date || !!r.numericOnly),
							(e.uppercase = !!r.uppercase),
							(e.lowercase = !!r.lowercase),
							(e.prefix =
								e.creditCard || e.date ? "" : r.prefix || ""),
							(e.noImmediatePrefix = !!r.noImmediatePrefix),
							(e.prefixLength = e.prefix.length),
							(e.rawValueTrimPrefix = !!r.rawValueTrimPrefix),
							(e.copyDelimiter = !!r.copyDelimiter),
							(e.initValue =
								void 0 !== r.initValue && null !== r.initValue
									? r.initValue.toString()
									: ""),
							(e.delimiter =
								r.delimiter || "" === r.delimiter
									? r.delimiter
									: r.date
									? "/"
									: r.time
									? ":"
									: r.numeral
									? ","
									: (r.phone, " ")),
							(e.delimiterLength = e.delimiter.length),
							(e.delimiterLazyShow = !!r.delimiterLazyShow),
							(e.delimiters = r.delimiters || []),
							(e.blocks = r.blocks || []),
							(e.blocksLength = e.blocks.length),
							(e.root = "object" == typeof t && t ? t : window),
							(e.document = r.document || e.root.document),
							(e.maxLength = 0),
							(e.backspace = !1),
							(e.result = ""),
							(e.onValueChanged =
								r.onValueChanged || function () {}),
							e
						);
					},
				};
				e.exports = r;
			}).call(
				t,
				(function () {
					return this;
				})()
			);
		},
	]);
});

/*!
* jquery.inputmask.bundle.js
* https://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2016 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.2.8-20
*/
!function($) {
    function Inputmask(alias, options) {
        return this instanceof Inputmask ? ($.isPlainObject(alias) ? options = alias : (options = options || {}, 
        options.alias = alias), this.el = void 0, this.opts = $.extend(!0, {}, this.defaults, options), 
        this.noMasksCache = options && void 0 !== options.definitions, this.userOptions = options || {}, 
        this.events = {}, void resolveAlias(this.opts.alias, options, this.opts)) : new Inputmask(alias, options);
    }
    function isInputEventSupported(eventName) {
        var el = document.createElement("input"), evName = "on" + eventName, isSupported = evName in el;
        return isSupported || (el.setAttribute(evName, "return;"), isSupported = "function" == typeof el[evName]), 
        el = null, isSupported;
    }
    function isElementTypeSupported(input, opts) {
        var elementType = input.getAttribute("type"), isSupported = "INPUT" === input.tagName && -1 !== $.inArray(elementType, opts.supportsInputType) || input.isContentEditable || "TEXTAREA" === input.tagName;
        if (!isSupported && "INPUT" === input.tagName) {
            var el = document.createElement("input");
            el.setAttribute("type", elementType), isSupported = "text" === el.type, el = null;
        }
        return isSupported;
    }
    function resolveAlias(aliasStr, options, opts) {
        var aliasDefinition = opts.aliases[aliasStr];
        return aliasDefinition ? (aliasDefinition.alias && resolveAlias(aliasDefinition.alias, void 0, opts), 
        $.extend(!0, opts, aliasDefinition), $.extend(!0, opts, options), !0) : (null === opts.mask && (opts.mask = aliasStr), 
        !1);
    }
    function importAttributeOptions(npt, opts, userOptions) {
        function importOption(option, optionData) {
            optionData = void 0 !== optionData ? optionData : npt.getAttribute("data-inputmask-" + option), 
            null !== optionData && ("string" == typeof optionData && (0 === option.indexOf("on") ? optionData = window[optionData] : "false" === optionData ? optionData = !1 : "true" === optionData && (optionData = !0)), 
            userOptions[option] = optionData);
        }
        var option, dataoptions, optionData, p, attrOptions = npt.getAttribute("data-inputmask");
        if (attrOptions && "" !== attrOptions && (attrOptions = attrOptions.replace(new RegExp("'", "g"), '"'), 
        dataoptions = JSON.parse("{" + attrOptions + "}")), dataoptions) {
            optionData = void 0;
            for (p in dataoptions) if ("alias" === p.toLowerCase()) {
                optionData = dataoptions[p];
                break;
            }
        }
        importOption("alias", optionData), userOptions.alias && resolveAlias(userOptions.alias, userOptions, opts);
        for (option in opts) {
            if (dataoptions) {
                optionData = void 0;
                for (p in dataoptions) if (p.toLowerCase() === option.toLowerCase()) {
                    optionData = dataoptions[p];
                    break;
                }
            }
            importOption(option, optionData);
        }
        return $.extend(!0, opts, userOptions), opts;
    }
    function generateMaskSet(opts, nocache) {
        function analyseMask(mask) {
            function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
                this.matches = [], this.isGroup = isGroup || !1, this.isOptional = isOptional || !1, 
                this.isQuantifier = isQuantifier || !1, this.isAlternator = isAlternator || !1, 
                this.quantifier = {
                    min: 1,
                    max: 1
                };
            }
            function insertTestDefinition(mtoken, element, position) {
                var maskdef = opts.definitions[element];
                position = void 0 !== position ? position : mtoken.matches.length;
                var prevMatch = mtoken.matches[position - 1];
                if (maskdef && !escaped) {
                    maskdef.placeholder = $.isFunction(maskdef.placeholder) ? maskdef.placeholder(opts) : maskdef.placeholder;
                    for (var prevalidators = maskdef.prevalidator, prevalidatorsL = prevalidators ? prevalidators.length : 0, i = 1; i < maskdef.cardinality; i++) {
                        var prevalidator = prevalidatorsL >= i ? prevalidators[i - 1] : [], validator = prevalidator.validator, cardinality = prevalidator.cardinality;
                        mtoken.matches.splice(position++, 0, {
                            fn: validator ? "string" == typeof validator ? new RegExp(validator) : new function() {
                                this.test = validator;
                            }() : new RegExp("."),
                            cardinality: cardinality ? cardinality : 1,
                            optionality: mtoken.isOptional,
                            newBlockMarker: void 0 === prevMatch || prevMatch.def !== (maskdef.definitionSymbol || element),
                            casing: maskdef.casing,
                            def: maskdef.definitionSymbol || element,
                            placeholder: maskdef.placeholder,
                            mask: element
                        }), prevMatch = mtoken.matches[position - 1];
                    }
                    mtoken.matches.splice(position++, 0, {
                        fn: maskdef.validator ? "string" == typeof maskdef.validator ? new RegExp(maskdef.validator) : new function() {
                            this.test = maskdef.validator;
                        }() : new RegExp("."),
                        cardinality: maskdef.cardinality,
                        optionality: mtoken.isOptional,
                        newBlockMarker: void 0 === prevMatch || prevMatch.def !== (maskdef.definitionSymbol || element),
                        casing: maskdef.casing,
                        def: maskdef.definitionSymbol || element,
                        placeholder: maskdef.placeholder,
                        mask: element
                    });
                } else mtoken.matches.splice(position++, 0, {
                    fn: null,
                    cardinality: 0,
                    optionality: mtoken.isOptional,
                    newBlockMarker: void 0 === prevMatch || prevMatch.def !== element,
                    casing: null,
                    def: opts.staticDefinitionSymbol || element,
                    placeholder: void 0 !== opts.staticDefinitionSymbol ? element : void 0,
                    mask: element
                }), escaped = !1;
            }
            function verifyGroupMarker(lastMatch, isOpenGroup) {
                lastMatch.isGroup && (lastMatch.isGroup = !1, insertTestDefinition(lastMatch, opts.groupmarker.start, 0), 
                isOpenGroup !== !0 && insertTestDefinition(lastMatch, opts.groupmarker.end));
            }
            function maskCurrentToken(m, currentToken, lastMatch, extraCondition) {
                currentToken.matches.length > 0 && (void 0 === extraCondition || extraCondition) && (lastMatch = currentToken.matches[currentToken.matches.length - 1], 
                verifyGroupMarker(lastMatch)), insertTestDefinition(currentToken, m);
            }
            function defaultCase() {
                if (openenings.length > 0) {
                    if (currentOpeningToken = openenings[openenings.length - 1], maskCurrentToken(m, currentOpeningToken, lastMatch, !currentOpeningToken.isAlternator), 
                    currentOpeningToken.isAlternator) {
                        alternator = openenings.pop();
                        for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1;
                        openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1], 
                        currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
                    }
                } else maskCurrentToken(m, currentToken, lastMatch);
            }
            function reverseTokens(maskToken) {
                function reverseStatic(st) {
                    return st === opts.optionalmarker.start ? st = opts.optionalmarker.end : st === opts.optionalmarker.end ? st = opts.optionalmarker.start : st === opts.groupmarker.start ? st = opts.groupmarker.end : st === opts.groupmarker.end && (st = opts.groupmarker.start), 
                    st;
                }
                maskToken.matches = maskToken.matches.reverse();
                for (var match in maskToken.matches) {
                    var intMatch = parseInt(match);
                    if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
                        var qt = maskToken.matches[match];
                        maskToken.matches.splice(match, 1), maskToken.matches.splice(intMatch + 1, 0, qt);
                    }
                    void 0 !== maskToken.matches[match].matches ? maskToken.matches[match] = reverseTokens(maskToken.matches[match]) : maskToken.matches[match] = reverseStatic(maskToken.matches[match]);
                }
                return maskToken;
            }
            for (var match, m, openingToken, currentOpeningToken, alternator, lastMatch, groupToken, tokenizer = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g, escaped = !1, currentToken = new MaskToken(), openenings = [], maskTokens = []; match = tokenizer.exec(mask); ) if (m = match[0], 
            escaped) defaultCase(); else switch (m.charAt(0)) {
              case opts.escapeChar:
                escaped = !0;
                break;

              case opts.optionalmarker.end:
              case opts.groupmarker.end:
                if (openingToken = openenings.pop(), void 0 !== openingToken) if (openenings.length > 0) {
                    if (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(openingToken), 
                    currentOpeningToken.isAlternator) {
                        alternator = openenings.pop();
                        for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1;
                        openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1], 
                        currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
                    }
                } else currentToken.matches.push(openingToken); else defaultCase();
                break;

              case opts.optionalmarker.start:
                openenings.push(new MaskToken(!1, !0));
                break;

              case opts.groupmarker.start:
                openenings.push(new MaskToken(!0));
                break;

              case opts.quantifiermarker.start:
                var quantifier = new MaskToken(!1, !1, !0);
                m = m.replace(/[{}]/g, "");
                var mq = m.split(","), mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]), mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
                if (("*" === mq1 || "+" === mq1) && (mq0 = "*" === mq1 ? 0 : 1), quantifier.quantifier = {
                    min: mq0,
                    max: mq1
                }, openenings.length > 0) {
                    var matches = openenings[openenings.length - 1].matches;
                    match = matches.pop(), match.isGroup || (groupToken = new MaskToken(!0), groupToken.matches.push(match), 
                    match = groupToken), matches.push(match), matches.push(quantifier);
                } else match = currentToken.matches.pop(), match.isGroup || (groupToken = new MaskToken(!0), 
                groupToken.matches.push(match), match = groupToken), currentToken.matches.push(match), 
                currentToken.matches.push(quantifier);
                break;

              case opts.alternatormarker:
                openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1], 
                lastMatch = currentOpeningToken.matches.pop()) : lastMatch = currentToken.matches.pop(), 
                lastMatch.isAlternator ? openenings.push(lastMatch) : (alternator = new MaskToken(!1, !1, !1, !0), 
                alternator.matches.push(lastMatch), openenings.push(alternator));
                break;

              default:
                defaultCase();
            }
            for (;openenings.length > 0; ) openingToken = openenings.pop(), verifyGroupMarker(openingToken, !0), 
            currentToken.matches.push(openingToken);
            return currentToken.matches.length > 0 && (lastMatch = currentToken.matches[currentToken.matches.length - 1], 
            verifyGroupMarker(lastMatch), maskTokens.push(currentToken)), opts.numericInput && reverseTokens(maskTokens[0]), 
            maskTokens;
        }
        function generateMask(mask, metadata) {
            if (null === mask || "" === mask) return void 0;
            if (1 === mask.length && opts.greedy === !1 && 0 !== opts.repeat && (opts.placeholder = ""), 
            opts.repeat > 0 || "*" === opts.repeat || "+" === opts.repeat) {
                var repeatStart = "*" === opts.repeat ? 0 : "+" === opts.repeat ? 1 : opts.repeat;
                mask = opts.groupmarker.start + mask + opts.groupmarker.end + opts.quantifiermarker.start + repeatStart + "," + opts.repeat + opts.quantifiermarker.end;
            }
            var masksetDefinition;
            return void 0 === Inputmask.prototype.masksCache[mask] || nocache === !0 ? (masksetDefinition = {
                mask: mask,
                maskToken: analyseMask(mask),
                validPositions: {},
                _buffer: void 0,
                buffer: void 0,
                tests: {},
                metadata: metadata
            }, nocache !== !0 && (Inputmask.prototype.masksCache[opts.numericInput ? mask.split("").reverse().join("") : mask] = masksetDefinition, 
            masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[opts.numericInput ? mask.split("").reverse().join("") : mask]))) : masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[opts.numericInput ? mask.split("").reverse().join("") : mask]), 
            masksetDefinition;
        }
        function preProcessMask(mask) {
            return mask = mask.toString();
        }
        var ms;
        if ($.isFunction(opts.mask) && (opts.mask = opts.mask(opts)), $.isArray(opts.mask)) {
            if (opts.mask.length > 1) {
                opts.keepStatic = null === opts.keepStatic ? !0 : opts.keepStatic;
                var altMask = "(";
                return $.each(opts.numericInput ? opts.mask.reverse() : opts.mask, function(ndx, msk) {
                    altMask.length > 1 && (altMask += ")|("), altMask += preProcessMask(void 0 === msk.mask || $.isFunction(msk.mask) ? msk : msk.mask);
                }), altMask += ")", generateMask(altMask, opts.mask);
            }
            opts.mask = opts.mask.pop();
        }
        return opts.mask && (ms = void 0 === opts.mask.mask || $.isFunction(opts.mask.mask) ? generateMask(preProcessMask(opts.mask), opts.mask) : generateMask(preProcessMask(opts.mask.mask), opts.mask)), 
        ms;
    }
    function maskScope(actionObj, maskset, opts) {
        function getMaskTemplate(baseOnInput, minimalPos, includeInput) {
            minimalPos = minimalPos || 0;
            var ndxIntlzr, test, testPos, maskTemplate = [], pos = 0, lvp = getLastValidPosition();
            do {
                if (baseOnInput === !0 && getMaskSet().validPositions[pos]) {
                    var validPos = getMaskSet().validPositions[pos];
                    test = validPos.match, ndxIntlzr = validPos.locator.slice(), maskTemplate.push(includeInput === !0 ? validPos.input : getPlaceholder(pos, test));
                } else testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), test = testPos.match, 
                ndxIntlzr = testPos.locator.slice(), (opts.jitMasking === !1 || lvp > pos || isFinite(opts.jitMasking) && opts.jitMasking > pos) && maskTemplate.push(getPlaceholder(pos, test));
                pos++;
            } while ((void 0 === maxLength || maxLength > pos - 1) && null !== test.fn || null === test.fn && "" !== test.def || minimalPos >= pos);
            return "" === maskTemplate[maskTemplate.length - 1] && maskTemplate.pop(), maskTemplate;
        }
        function getMaskSet() {
            return maskset;
        }
        function resetMaskSet(soft) {
            var maskset = getMaskSet();
            maskset.buffer = void 0, soft !== !0 && (maskset.tests = {}, maskset._buffer = void 0, 
            maskset.validPositions = {}, maskset.p = 0);
        }
        function getLastValidPosition(closestTo, strict) {
            var before = -1, after = -1, valids = getMaskSet().validPositions;
            void 0 === closestTo && (closestTo = -1);
            for (var posNdx in valids) {
                var psNdx = parseInt(posNdx);
                valids[psNdx] && (strict || null !== valids[psNdx].match.fn) && (closestTo >= psNdx && (before = psNdx), 
                psNdx >= closestTo && (after = psNdx));
            }
            return -1 !== before && closestTo - before > 1 || closestTo > after ? before : after;
        }
        function setValidPosition(pos, validTest, fromSetValid, isSelection) {
            if (isSelection || opts.insertMode && void 0 !== getMaskSet().validPositions[pos] && void 0 === fromSetValid) {
                var i, positionsClone = $.extend(!0, {}, getMaskSet().validPositions), lvp = getLastValidPosition();
                for (i = pos; lvp >= i; i++) delete getMaskSet().validPositions[i];
                getMaskSet().validPositions[pos] = validTest;
                var j, valid = !0, vps = getMaskSet().validPositions;
                for (i = j = pos; lvp >= i; i++) {
                    var t = positionsClone[i];
                    if (void 0 !== t) for (var posMatch = j, prevPosMatch = -1; posMatch < getMaskLength() && (null == t.match.fn && vps[i] && (vps[i].match.optionalQuantifier === !0 || vps[i].match.optionality === !0) || null != t.match.fn); ) if (null === t.match.fn || !opts.keepStatic && vps[i] && (void 0 !== vps[i + 1] && getTests(i + 1, vps[i].locator.slice(), i).length > 1 || void 0 !== vps[i].alternation) ? posMatch++ : posMatch = seekNext(j), 
                    positionCanMatchDefinition(posMatch, t.match.def)) {
                        var result = isValid(posMatch, t.input, !0, !0);
                        if (valid = result !== !1, j = result.caret || result.insert ? getLastValidPosition() : posMatch, 
                        valid) break;
                    } else {
                        if (valid = null == t.match.fn, prevPosMatch === posMatch) break;
                        prevPosMatch = posMatch;
                    }
                    if (!valid) break;
                }
                if (!valid) return getMaskSet().validPositions = $.extend(!0, {}, positionsClone), 
                resetMaskSet(!0), !1;
            } else getMaskSet().validPositions[pos] = validTest;
            return resetMaskSet(!0), !0;
        }
        function stripValidPositions(start, end, nocheck, strict) {
            function IsEnclosedStatic(pos) {
                var posMatch = getMaskSet().validPositions[pos];
                if (void 0 !== posMatch && null === posMatch.match.fn) {
                    var prevMatch = getMaskSet().validPositions[pos - 1], nextMatch = getMaskSet().validPositions[pos + 1];
                    return void 0 !== prevMatch && void 0 !== nextMatch;
                }
                return !1;
            }
            var i, startPos = start;
            for (getMaskSet().p = start, i = end - 1; i >= startPos; i--) void 0 !== getMaskSet().validPositions[i] && (nocheck === !0 || !IsEnclosedStatic(i) && opts.canClearPosition(getMaskSet(), i, getLastValidPosition(), strict, opts) !== !1) && delete getMaskSet().validPositions[i];
            for (resetMaskSet(!0), i = startPos + 1; i <= getLastValidPosition(); ) {
                for (;void 0 !== getMaskSet().validPositions[startPos]; ) startPos++;
                var s = getMaskSet().validPositions[startPos];
                if (startPos > i && (i = startPos + 1), void 0 === getMaskSet().validPositions[i] && isMask(i) || void 0 !== s) i++; else {
                    var t = getTestTemplate(i);
                    positionCanMatchDefinition(startPos, t.match.def) ? isValid(startPos, t.input || getPlaceholder(i), !0) !== !1 && (delete getMaskSet().validPositions[i], 
                    i++) : isMask(i) || (i++, startPos--), startPos++;
                }
            }
            resetMaskSet(!0);
        }
        function getTestTemplate(pos, ndxIntlzr, tstPs) {
            var testPos = getMaskSet().validPositions[pos];
            if (void 0 === testPos) for (var testPositions = getTests(pos, ndxIntlzr, tstPs), lvp = getLastValidPosition(), lvTest = getMaskSet().validPositions[lvp] || getTests(0)[0], lvTestAltArr = void 0 !== lvTest.alternation ? lvTest.locator[lvTest.alternation].toString().split(",") : [], ndx = 0; ndx < testPositions.length && (testPos = testPositions[ndx], 
            !(testPos.match && (opts.greedy && testPos.match.optionalQuantifier !== !0 || (testPos.match.optionality === !1 || testPos.match.newBlockMarker === !1) && testPos.match.optionalQuantifier !== !0) && (void 0 === lvTest.alternation || lvTest.alternation !== testPos.alternation || void 0 !== testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAltArr)))); ndx++) ;
            return testPos;
        }
        function getTest(pos) {
            return getMaskSet().validPositions[pos] ? getMaskSet().validPositions[pos].match : getTests(pos)[0].match;
        }
        function positionCanMatchDefinition(pos, def) {
            for (var valid = !1, tests = getTests(pos), tndx = 0; tndx < tests.length; tndx++) if (tests[tndx].match && tests[tndx].match.def === def) {
                valid = !0;
                break;
            }
            return valid;
        }
        function selectBestMatch(pos, alternateNdx) {
            var bestMatch, indexPos;
            return (getMaskSet().tests[pos] || getMaskSet().validPositions[pos]) && $.each(getMaskSet().tests[pos] || [ getMaskSet().validPositions[pos] ], function(ndx, lmnt) {
                var ndxPos = lmnt.alternation ? lmnt.locator[lmnt.alternation].toString().indexOf(alternateNdx) : -1;
                (void 0 === indexPos || indexPos > ndxPos) && -1 !== ndxPos && (bestMatch = lmnt, 
                indexPos = ndxPos);
            }), bestMatch;
        }
        function getTests(pos, ndxIntlzr, tstPs) {
            function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
                function handleMatch(match, loopNdx, quantifierRecurse) {
                    function isFirstMatch(latestMatch, tokenGroup) {
                        var firstMatch = 0 === $.inArray(latestMatch, tokenGroup.matches);
                        return firstMatch || $.each(tokenGroup.matches, function(ndx, match) {
                            return match.isQuantifier === !0 && (firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1])) ? !1 : void 0;
                        }), firstMatch;
                    }
                    function resolveNdxInitializer(pos, alternateNdx) {
                        var bestMatch = selectBestMatch(pos, alternateNdx);
                        return bestMatch ? bestMatch.locator.slice(bestMatch.alternation + 1) : [];
                    }
                    if (testPos > 1e4) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + getMaskSet().mask;
                    if (testPos === pos && void 0 === match.matches) return matches.push({
                        match: match,
                        locator: loopNdx.reverse(),
                        cd: cacheDependency
                    }), !0;
                    if (void 0 !== match.matches) {
                        if (match.isGroup && quantifierRecurse !== match) {
                            if (match = handleMatch(maskToken.matches[$.inArray(match, maskToken.matches) + 1], loopNdx)) return !0;
                        } else if (match.isOptional) {
                            var optionalToken = match;
                            if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse)) {
                                if (latestMatch = matches[matches.length - 1].match, !isFirstMatch(latestMatch, optionalToken)) return !0;
                                insertStop = !0, testPos = pos;
                            }
                        } else if (match.isAlternator) {
                            var maltMatches, alternateToken = match, malternateMatches = [], currentMatches = matches.slice(), loopNdxCnt = loopNdx.length, altIndex = ndxInitializer.length > 0 ? ndxInitializer.shift() : -1;
                            if (-1 === altIndex || "string" == typeof altIndex) {
                                var amndx, currentPos = testPos, ndxInitializerClone = ndxInitializer.slice(), altIndexArr = [];
                                if ("string" == typeof altIndex) altIndexArr = altIndex.split(","); else for (amndx = 0; amndx < alternateToken.matches.length; amndx++) altIndexArr.push(amndx);
                                for (var ndx = 0; ndx < altIndexArr.length; ndx++) {
                                    if (amndx = parseInt(altIndexArr[ndx]), matches = [], ndxInitializer = resolveNdxInitializer(testPos, amndx), 
                                    match = handleMatch(alternateToken.matches[amndx] || maskToken.matches[amndx], [ amndx ].concat(loopNdx), quantifierRecurse) || match, 
                                    match !== !0 && void 0 !== match && altIndexArr[altIndexArr.length - 1] < alternateToken.matches.length) {
                                        var ntndx = $.inArray(match, maskToken.matches) + 1;
                                        maskToken.matches.length > ntndx && (match = handleMatch(maskToken.matches[ntndx], [ ntndx ].concat(loopNdx.slice(1, loopNdx.length)), quantifierRecurse), 
                                        match && (altIndexArr.push(ntndx.toString()), $.each(matches, function(ndx, lmnt) {
                                            lmnt.alternation = loopNdx.length - 1;
                                        })));
                                    }
                                    maltMatches = matches.slice(), testPos = currentPos, matches = [];
                                    for (var i = 0; i < ndxInitializerClone.length; i++) ndxInitializer[i] = ndxInitializerClone[i];
                                    for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                                        var altMatch = maltMatches[ndx1];
                                        altMatch.alternation = altMatch.alternation || loopNdxCnt;
                                        for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                                            var altMatch2 = malternateMatches[ndx2];
                                            if (altMatch.match.def === altMatch2.match.def && ("string" != typeof altIndex || -1 !== $.inArray(altMatch.locator[altMatch.alternation].toString(), altIndexArr))) {
                                                altMatch.match.mask === altMatch2.match.mask && (maltMatches.splice(ndx1, 1), ndx1--), 
                                                -1 === altMatch2.locator[altMatch.alternation].toString().indexOf(altMatch.locator[altMatch.alternation]) && (altMatch2.locator[altMatch.alternation] = altMatch2.locator[altMatch.alternation] + "," + altMatch.locator[altMatch.alternation], 
                                                altMatch2.alternation = altMatch.alternation);
                                                break;
                                            }
                                        }
                                    }
                                    malternateMatches = malternateMatches.concat(maltMatches);
                                }
                                "string" == typeof altIndex && (malternateMatches = $.map(malternateMatches, function(lmnt, ndx) {
                                    if (isFinite(ndx)) {
                                        var mamatch, alternation = lmnt.alternation, altLocArr = lmnt.locator[alternation].toString().split(",");
                                        lmnt.locator[alternation] = void 0, lmnt.alternation = void 0;
                                        for (var alndx = 0; alndx < altLocArr.length; alndx++) mamatch = -1 !== $.inArray(altLocArr[alndx], altIndexArr), 
                                        mamatch && (void 0 !== lmnt.locator[alternation] ? (lmnt.locator[alternation] += ",", 
                                        lmnt.locator[alternation] += altLocArr[alndx]) : lmnt.locator[alternation] = parseInt(altLocArr[alndx]), 
                                        lmnt.alternation = alternation);
                                        if (void 0 !== lmnt.locator[alternation]) return lmnt;
                                    }
                                })), matches = currentMatches.concat(malternateMatches), testPos = pos, insertStop = matches.length > 0;
                            } else match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [ altIndex ].concat(loopNdx), quantifierRecurse);
                            if (match) return !0;
                        } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[$.inArray(match, maskToken.matches) - 1]) for (var qt = match, qndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && pos >= testPos; qndx++) {
                            var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
                            if (match = handleMatch(tokenGroup, [ qndx ].concat(loopNdx), tokenGroup)) {
                                if (latestMatch = matches[matches.length - 1].match, latestMatch.optionalQuantifier = qndx > qt.quantifier.min - 1, 
                                isFirstMatch(latestMatch, tokenGroup)) {
                                    if (qndx > qt.quantifier.min - 1) {
                                        insertStop = !0, testPos = pos;
                                        break;
                                    }
                                    return !0;
                                }
                                return !0;
                            }
                        } else if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse)) return !0;
                    } else testPos++;
                }
                for (var tndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) if (maskToken.matches[tndx].isQuantifier !== !0) {
                    var match = handleMatch(maskToken.matches[tndx], [ tndx ].concat(loopNdx), quantifierRecurse);
                    if (match && testPos === pos) return match;
                    if (testPos > pos) break;
                }
            }
            function mergeLocators(tests) {
                var test = tests[0] || tests;
                return test.locator.slice();
            }
            var latestMatch, maskTokens = getMaskSet().maskToken, testPos = ndxIntlzr ? tstPs : 0, ndxInitializer = ndxIntlzr || [ 0 ], matches = [], insertStop = !1, cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";
            if (pos > -1) {
                if (void 0 === ndxIntlzr) {
                    for (var test, previousPos = pos - 1; void 0 === (test = getMaskSet().validPositions[previousPos] || getMaskSet().tests[previousPos]) && previousPos > -1; ) previousPos--;
                    void 0 !== test && previousPos > -1 && (ndxInitializer = mergeLocators(test), cacheDependency = ndxInitializer.join(""), 
                    test = test[0] || test, testPos = previousPos);
                }
                if (getMaskSet().tests[pos] && getMaskSet().tests[pos][0].cd === cacheDependency) return getMaskSet().tests[pos];
                for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
                    var match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [ mtndx ]);
                    if (match && testPos === pos || testPos > pos) break;
                }
            }
            return (0 === matches.length || insertStop) && matches.push({
                match: {
                    fn: null,
                    cardinality: 0,
                    optionality: !0,
                    casing: null,
                    def: ""
                },
                locator: []
            }), getMaskSet().tests[pos] = $.extend(!0, [], matches), getMaskSet().tests[pos];
        }
        function getBufferTemplate() {
            return void 0 === getMaskSet()._buffer && (getMaskSet()._buffer = getMaskTemplate(!1, 1)), 
            getMaskSet()._buffer;
        }
        function getBuffer(noCache) {
            if (void 0 === getMaskSet().buffer || noCache === !0) {
                if (noCache === !0) for (var testNdx in getMaskSet().tests) void 0 === getMaskSet().validPositions[testNdx] && delete getMaskSet().tests[testNdx];
                getMaskSet().buffer = getMaskTemplate(!0, getLastValidPosition(), !0);
            }
            return getMaskSet().buffer;
        }
        function refreshFromBuffer(start, end, buffer) {
            var i;
            if (buffer = buffer, start === !0) resetMaskSet(), start = 0, end = buffer.length; else for (i = start; end > i; i++) delete getMaskSet().validPositions[i], 
            delete getMaskSet().tests[i];
            for (i = start; end > i; i++) resetMaskSet(!0), buffer[i] !== opts.skipOptionalPartCharacter && isValid(i, buffer[i], !0, !0);
        }
        function casing(elem, test) {
            switch (test.casing) {
              case "upper":
                elem = elem.toUpperCase();
                break;

              case "lower":
                elem = elem.toLowerCase();
            }
            return elem;
        }
        function checkAlternationMatch(altArr1, altArr2) {
            for (var altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1), isMatch = !1, alndx = 0; alndx < altArr1.length; alndx++) if (-1 !== $.inArray(altArr1[alndx], altArrC)) {
                isMatch = !0;
                break;
            }
            return isMatch;
        }
        function isValid(pos, c, strict, fromSetValid) {
            function isSelection(posObj) {
                return isRTL ? posObj.begin - posObj.end > 1 || posObj.begin - posObj.end === 1 && opts.insertMode : posObj.end - posObj.begin > 1 || posObj.end - posObj.begin === 1 && opts.insertMode;
            }
            function _isValid(position, c, strict, fromSetValid) {
                var rslt = !1;
                return $.each(getTests(position), function(ndx, tst) {
                    for (var test = tst.match, loopend = c ? 1 : 0, chrs = "", i = test.cardinality; i > loopend; i--) chrs += getBufferElement(position - (i - 1));
                    if (c && (chrs += c), getBuffer(!0), rslt = null != test.fn ? test.fn.test(chrs, getMaskSet(), position, strict, opts) : c !== test.def && c !== opts.skipOptionalPartCharacter || "" === test.def ? !1 : {
                        c: test.placeholder || test.def,
                        pos: position
                    }, rslt !== !1) {
                        var elem = void 0 !== rslt.c ? rslt.c : c;
                        elem = elem === opts.skipOptionalPartCharacter && null === test.fn ? test.placeholder || test.def : elem;
                        var validatedPos = position, possibleModifiedBuffer = getBuffer();
                        if (void 0 !== rslt.remove && ($.isArray(rslt.remove) || (rslt.remove = [ rslt.remove ]), 
                        $.each(rslt.remove.sort(function(a, b) {
                            return b - a;
                        }), function(ndx, lmnt) {
                            stripValidPositions(lmnt, lmnt + 1, !0);
                        })), void 0 !== rslt.insert && ($.isArray(rslt.insert) || (rslt.insert = [ rslt.insert ]), 
                        $.each(rslt.insert.sort(function(a, b) {
                            return a - b;
                        }), function(ndx, lmnt) {
                            isValid(lmnt.pos, lmnt.c, !1, fromSetValid);
                        })), rslt.refreshFromBuffer) {
                            var refresh = rslt.refreshFromBuffer;
                            if (strict = !0, refreshFromBuffer(refresh === !0 ? refresh : refresh.start, refresh.end, possibleModifiedBuffer), 
                            void 0 === rslt.pos && void 0 === rslt.c) return rslt.pos = getLastValidPosition(), 
                            !1;
                            if (validatedPos = void 0 !== rslt.pos ? rslt.pos : position, validatedPos !== position) return rslt = $.extend(rslt, isValid(validatedPos, elem, !0, fromSetValid)), 
                            !1;
                        } else if (rslt !== !0 && void 0 !== rslt.pos && rslt.pos !== position && (validatedPos = rslt.pos, 
                        refreshFromBuffer(position, validatedPos, getBuffer().slice()), validatedPos !== position)) return rslt = $.extend(rslt, isValid(validatedPos, elem, !0)), 
                        !1;
                        return rslt !== !0 && void 0 === rslt.pos && void 0 === rslt.c ? !1 : (ndx > 0 && resetMaskSet(!0), 
                        setValidPosition(validatedPos, $.extend({}, tst, {
                            input: casing(elem, test)
                        }), fromSetValid, isSelection(pos)) || (rslt = !1), !1);
                    }
                }), rslt;
            }
            function alternate(pos, c, strict, fromSetValid) {
                for (var lastAlt, alternation, isValidRslt, altPos, i, validPos, validPsClone = $.extend(!0, {}, getMaskSet().validPositions), testsClone = $.extend(!0, {}, getMaskSet().tests), lAlt = getLastValidPosition(); lAlt >= 0 && (altPos = getMaskSet().validPositions[lAlt], 
                !altPos || void 0 === altPos.alternation || (lastAlt = lAlt, alternation = getMaskSet().validPositions[lastAlt].alternation, 
                getTestTemplate(lastAlt).locator[altPos.alternation] === altPos.locator[altPos.alternation])); lAlt--) ;
                if (void 0 !== alternation) {
                    lastAlt = parseInt(lastAlt);
                    for (var decisionPos in getMaskSet().validPositions) if (decisionPos = parseInt(decisionPos), 
                    altPos = getMaskSet().validPositions[decisionPos], decisionPos >= lastAlt && void 0 !== altPos.alternation) {
                        var altNdxs;
                        0 === lastAlt ? (altNdxs = [], $.each(getMaskSet().tests[lastAlt], function(ndx, test) {
                            void 0 !== test.locator[alternation] && (altNdxs = altNdxs.concat(test.locator[alternation].toString().split(",")));
                        })) : altNdxs = getMaskSet().validPositions[lastAlt].locator[alternation].toString().split(",");
                        var decisionTaker = void 0 !== altPos.locator[alternation] ? altPos.locator[alternation] : altNdxs[0];
                        decisionTaker.length > 0 && (decisionTaker = decisionTaker.split(",")[0]);
                        for (var mndx = 0; mndx < altNdxs.length; mndx++) {
                            var validInputs = [], staticInputsBeforePos = 0, staticInputsBeforePosAlternate = 0;
                            if (decisionTaker < altNdxs[mndx]) {
                                for (var possibilityPos, possibilities, dp = decisionPos; dp >= 0; dp--) if (possibilityPos = getMaskSet().validPositions[dp], 
                                void 0 !== possibilityPos) {
                                    var bestMatch = selectBestMatch(dp, altNdxs[mndx]);
                                    getMaskSet().validPositions[dp].match.def !== bestMatch.match.def && (validInputs.push(getMaskSet().validPositions[dp].input), 
                                    getMaskSet().validPositions[dp] = bestMatch, getMaskSet().validPositions[dp].input = getPlaceholder(dp), 
                                    null === getMaskSet().validPositions[dp].match.fn && staticInputsBeforePosAlternate++, 
                                    possibilityPos = bestMatch), possibilities = possibilityPos.locator[alternation], 
                                    possibilityPos.locator[alternation] = parseInt(altNdxs[mndx]);
                                    break;
                                }
                                if (decisionTaker !== possibilityPos.locator[alternation]) {
                                    for (i = decisionPos + 1; i < getLastValidPosition(void 0, !0) + 1; i++) validPos = getMaskSet().validPositions[i], 
                                    validPos && null != validPos.match.fn ? validInputs.push(validPos.input) : pos > i && staticInputsBeforePos++, 
                                    delete getMaskSet().validPositions[i], delete getMaskSet().tests[i];
                                    for (resetMaskSet(!0), opts.keepStatic = !opts.keepStatic, isValidRslt = !0; validInputs.length > 0; ) {
                                        var input = validInputs.shift();
                                        if (input !== opts.skipOptionalPartCharacter && !(isValidRslt = isValid(getLastValidPosition(void 0, !0) + 1, input, !1, fromSetValid))) break;
                                    }
                                    if (possibilityPos.alternation = alternation, possibilityPos.locator[alternation] = possibilities, 
                                    isValidRslt) {
                                        var targetLvp = getLastValidPosition(pos) + 1;
                                        for (i = decisionPos + 1; i < getLastValidPosition() + 1; i++) validPos = getMaskSet().validPositions[i], 
                                        (void 0 === validPos || null == validPos.match.fn) && pos > i && staticInputsBeforePosAlternate++;
                                        pos += staticInputsBeforePosAlternate - staticInputsBeforePos, isValidRslt = isValid(pos > targetLvp ? targetLvp : pos, c, strict, fromSetValid);
                                    }
                                    if (opts.keepStatic = !opts.keepStatic, isValidRslt) return isValidRslt;
                                    resetMaskSet(), getMaskSet().validPositions = $.extend(!0, {}, validPsClone), getMaskSet().tests = $.extend(!0, {}, testsClone);
                                }
                            }
                        }
                        break;
                    }
                }
                return !1;
            }
            function trackbackAlternations(originalPos, newPos) {
                for (var vp = getMaskSet().validPositions[newPos], targetLocator = vp.locator, tll = targetLocator.length, ps = originalPos; newPos > ps; ps++) if (void 0 === getMaskSet().validPositions[ps] && !isMask(ps, !0)) {
                    var tests = getTests(ps), bestMatch = tests[0], equality = -1;
                    $.each(tests, function(ndx, tst) {
                        for (var i = 0; tll > i && (void 0 !== tst.locator[i] && checkAlternationMatch(tst.locator[i].toString().split(","), targetLocator[i].toString().split(","))); i++) i > equality && (equality = i, 
                        bestMatch = tst);
                    }), setValidPosition(ps, $.extend({}, bestMatch, {
                        input: bestMatch.match.placeholder || bestMatch.match.def
                    }), !0);
                }
            }
            strict = strict === !0;
            var maskPos = pos;
            void 0 !== pos.begin && (maskPos = isRTL && !isSelection(pos) ? pos.end : pos.begin);
            for (var result = !1, positionsClone = $.extend(!0, {}, getMaskSet().validPositions), pndx = maskPos - 1; pndx > -1 && !getMaskSet().validPositions[pndx]; pndx--) ;
            pndx++;
            for (var testTemplate; maskPos > pndx; pndx++) getBuffer(), void 0 === getMaskSet().validPositions[pndx] && ((testTemplate = getTestTemplate(pndx)).match.def === opts.radixPointDefinitionSymbol || !isMask(pndx, !0) || $.inArray(opts.radixPoint, getBuffer()) < pndx && testTemplate.match.fn && testTemplate.match.fn.test(getPlaceholder(pndx), getMaskSet(), pndx, !1, opts)) && _isValid(pndx, testTemplate.match.placeholder || (null == testTemplate.match.fn ? testTemplate.match.def : getPlaceholder(pndx)), !0, fromSetValid);
            if (isSelection(pos) && (handleRemove(void 0, Inputmask.keyCode.DELETE, pos), maskPos = getMaskSet().p), 
            maskPos < getMaskLength() && (result = _isValid(maskPos, c, strict, fromSetValid), 
            (!strict || fromSetValid === !0) && result === !1)) {
                var currentPosValid = getMaskSet().validPositions[maskPos];
                if (!currentPosValid || null !== currentPosValid.match.fn || currentPosValid.match.def !== c && c !== opts.skipOptionalPartCharacter) {
                    if ((opts.insertMode || void 0 === getMaskSet().validPositions[seekNext(maskPos)]) && !isMask(maskPos, !0)) {
                        var staticChar = getTestTemplate(maskPos).match;
                        staticChar = staticChar.placeholder || staticChar.def, _isValid(maskPos, staticChar, strict, fromSetValid);
                        for (var nPos = maskPos + 1, snPos = seekNext(maskPos); snPos >= nPos; nPos++) if (result = _isValid(nPos, c, strict, fromSetValid), 
                        result !== !1) {
                            trackbackAlternations(maskPos, nPos), maskPos = nPos;
                            break;
                        }
                    }
                } else result = {
                    caret: seekNext(maskPos)
                };
            }
            return result === !1 && opts.keepStatic && (result = alternate(maskPos, c, strict, fromSetValid)), 
            result === !0 && (result = {
                pos: maskPos
            }), $.isFunction(opts.postValidation) && result !== !1 && !strict && fromSetValid !== !0 && (result = opts.postValidation(getBuffer(!0), result, opts) ? result : !1), 
            void 0 === result.pos && (result.pos = maskPos), result === !1 && (resetMaskSet(!0), 
            getMaskSet().validPositions = $.extend(!0, {}, positionsClone)), result;
        }
        function isMask(pos, strict) {
            var test;
            if (strict ? (test = getTestTemplate(pos).match, "" === test.def && (test = getTest(pos))) : test = getTest(pos), 
            null != test.fn) return test.fn;
            if (strict !== !0 && pos > -1 && !opts.keepStatic && void 0 === getMaskSet().validPositions[pos]) {
                var tests = getTests(pos);
                return tests.length > 2;
            }
            return !1;
        }
        function getMaskLength() {
            var maskLength;
            maxLength = void 0 !== el ? el.maxLength : void 0, -1 === maxLength && (maxLength = void 0);
            var pos, lvp = getLastValidPosition(), testPos = getMaskSet().validPositions[lvp], ndxIntlzr = void 0 !== testPos ? testPos.locator.slice() : void 0;
            for (pos = lvp + 1; void 0 === testPos || null !== testPos.match.fn || null === testPos.match.fn && "" !== testPos.match.def; pos++) testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), 
            ndxIntlzr = testPos.locator.slice();
            var lastTest = getTest(pos - 1);
            return maskLength = "" !== lastTest.def ? pos : pos - 1, void 0 === maxLength || maxLength > maskLength ? maskLength : maxLength;
        }
        function seekNext(pos, newBlock) {
            var maskL = getMaskLength();
            if (pos >= maskL) return maskL;
            for (var position = pos; ++position < maskL && (newBlock === !0 && (getTest(position).newBlockMarker !== !0 || !isMask(position)) || newBlock !== !0 && !isMask(position) && (opts.nojumps !== !0 || opts.nojumpsThreshold > position)); ) ;
            return position;
        }
        function seekPrevious(pos, newBlock) {
            var position = pos;
            if (0 >= position) return 0;
            for (;--position > 0 && (newBlock === !0 && getTest(position).newBlockMarker !== !0 || newBlock !== !0 && !isMask(position)); ) ;
            return position;
        }
        function getBufferElement(position) {
            return void 0 === getMaskSet().validPositions[position] ? getPlaceholder(position) : getMaskSet().validPositions[position].input;
        }
        function writeBuffer(input, buffer, caretPos, event, triggerInputEvent) {
            if (event && $.isFunction(opts.onBeforeWrite)) {
                var result = opts.onBeforeWrite(event, buffer, caretPos, opts);
                if (result) {
                    if (result.refreshFromBuffer) {
                        var refresh = result.refreshFromBuffer;
                        refreshFromBuffer(refresh === !0 ? refresh : refresh.start, refresh.end, result.buffer || buffer), 
                        buffer = getBuffer(!0);
                    }
                    void 0 !== caretPos && (caretPos = void 0 !== result.caret ? result.caret : caretPos);
                }
            }
            input.inputmask._valueSet(buffer.join("")), void 0 === caretPos || void 0 !== event && "blur" === event.type || caret(input, caretPos), 
            triggerInputEvent === !0 && (skipInputEvent = !0, $(input).trigger("input"));
        }
        function getPlaceholder(pos, test) {
            if (test = test || getTest(pos), void 0 !== test.placeholder) return test.placeholder;
            if (null === test.fn) {
                if (pos > -1 && !opts.keepStatic && void 0 === getMaskSet().validPositions[pos]) {
                    var prevTest, tests = getTests(pos), staticAlternations = 0;
                    if (tests.length > 2) for (var i = 0; i < tests.length; i++) if (tests[i].match.optionality !== !0 && tests[i].match.optionalQuantifier !== !0 && (null === tests[i].match.fn || void 0 === prevTest || tests[i].match.fn.test(prevTest.match.def, getMaskSet(), pos, !0, opts) !== !1) && (staticAlternations++, 
                    null === tests[i].match.fn && (prevTest = tests[i]), staticAlternations > 1)) return opts.placeholder.charAt(pos % opts.placeholder.length);
                }
                return test.def;
            }
            return opts.placeholder.charAt(pos % opts.placeholder.length);
        }
        function checkVal(input, writeOut, strict, nptvl) {
            function isTemplateMatch() {
                var isMatch = !1, charCodeNdx = getBufferTemplate().slice(initialNdx, seekNext(initialNdx)).join("").indexOf(charCodes);
                if (-1 !== charCodeNdx && !isMask(initialNdx)) {
                    isMatch = !0;
                    for (var bufferTemplateArr = getBufferTemplate().slice(initialNdx, initialNdx + charCodeNdx), i = 0; i < bufferTemplateArr.length; i++) if (" " !== bufferTemplateArr[i]) {
                        isMatch = !1;
                        break;
                    }
                }
                return isMatch;
            }
            var inputValue = nptvl.slice(), charCodes = "", initialNdx = 0;
            if (resetMaskSet(), getMaskSet().p = seekNext(-1), !strict) if (opts.autoUnmask !== !0) {
                var staticInput = getBufferTemplate().slice(0, seekNext(-1)).join(""), matches = inputValue.join("").match(new RegExp("^" + Inputmask.escapeRegex(staticInput), "g"));
                matches && matches.length > 0 && (inputValue.splice(0, matches.length * staticInput.length), 
                initialNdx = seekNext(initialNdx));
            } else initialNdx = seekNext(initialNdx);
            $.each(inputValue, function(ndx, charCode) {
                if (void 0 !== charCode) {
                    var keypress = new $.Event("keypress");
                    keypress.which = charCode.charCodeAt(0), charCodes += charCode;
                    var lvp = getLastValidPosition(void 0, !0), lvTest = getMaskSet().validPositions[lvp], nextTest = getTestTemplate(lvp + 1, lvTest ? lvTest.locator.slice() : void 0, lvp);
                    if (!isTemplateMatch() || strict || opts.autoUnmask) {
                        var pos = strict ? ndx : null == nextTest.match.fn && nextTest.match.optionality && lvp + 1 < getMaskSet().p ? lvp + 1 : getMaskSet().p;
                        keypressEvent.call(input, keypress, !0, !1, strict, pos), initialNdx = pos + 1, 
                        charCodes = "";
                    } else keypressEvent.call(input, keypress, !0, !1, !0, lvp + 1);
                }
            }), writeOut && writeBuffer(input, getBuffer(), document.activeElement === input ? seekNext(getLastValidPosition(0)) : void 0, new $.Event("checkval"));
        }
        function unmaskedvalue(input) {
            if (input && void 0 === input.inputmask) return input.value;
            var umValue = [], vps = getMaskSet().validPositions;
            for (var pndx in vps) vps[pndx].match && null != vps[pndx].match.fn && umValue.push(vps[pndx].input);
            var unmaskedValue = 0 === umValue.length ? null : (isRTL ? umValue.reverse() : umValue).join("");
            if (null !== unmaskedValue) {
                var bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("");
                $.isFunction(opts.onUnMask) && (unmaskedValue = opts.onUnMask(bufferValue, unmaskedValue, opts) || unmaskedValue);
            }
            return unmaskedValue;
        }
        function caret(input, begin, end, notranslate) {
            function translatePosition(pos) {
                if (notranslate !== !0 && isRTL && "number" == typeof pos && (!opts.greedy || "" !== opts.placeholder)) {
                    var bffrLght = getBuffer().join("").length;
                    pos = bffrLght - pos;
                }
                return pos;
            }
            var range;
            if ("number" != typeof begin) return input.setSelectionRange ? (begin = input.selectionStart, 
            end = input.selectionEnd) : window.getSelection ? (range = window.getSelection().getRangeAt(0), 
            (range.commonAncestorContainer.parentNode === input || range.commonAncestorContainer === input) && (begin = range.startOffset, 
            end = range.endOffset)) : document.selection && document.selection.createRange && (range = document.selection.createRange(), 
            begin = 0 - range.duplicate().moveStart("character", -input.inputmask._valueGet().length), 
            end = begin + range.text.length), {
                begin: translatePosition(begin),
                end: translatePosition(end)
            };
            begin = translatePosition(begin), end = translatePosition(end), end = "number" == typeof end ? end : begin;
            var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
            if (input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0, mobile || opts.insertMode !== !1 || begin !== end || end++, 
            input.setSelectionRange) input.selectionStart = begin, input.selectionEnd = end; else if (window.getSelection) {
                if (range = document.createRange(), void 0 === input.firstChild || null === input.firstChild) {
                    var textNode = document.createTextNode("");
                    input.appendChild(textNode);
                }
                range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length), 
                range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length), 
                range.collapse(!0);
                var sel = window.getSelection();
                sel.removeAllRanges(), sel.addRange(range);
            } else input.createTextRange && (range = input.createTextRange(), range.collapse(!0), 
            range.moveEnd("character", end), range.moveStart("character", begin), range.select());
        }
        function determineLastRequiredPosition(returnDefinition) {
            var pos, testPos, buffer = getBuffer(), bl = buffer.length, lvp = getLastValidPosition(), positions = {}, lvTest = getMaskSet().validPositions[lvp], ndxIntlzr = void 0 !== lvTest ? lvTest.locator.slice() : void 0;
            for (pos = lvp + 1; pos < buffer.length; pos++) testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), 
            ndxIntlzr = testPos.locator.slice(), positions[pos] = $.extend(!0, {}, testPos);
            var lvTestAlt = lvTest && void 0 !== lvTest.alternation ? lvTest.locator[lvTest.alternation] : void 0;
            for (pos = bl - 1; pos > lvp && (testPos = positions[pos], (testPos.match.optionality || testPos.match.optionalQuantifier || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && null != testPos.match.fn || null === testPos.match.fn && testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && "" !== getTests(pos)[0].def)) && buffer[pos] === getPlaceholder(pos, testPos.match)); pos--) bl--;
            return returnDefinition ? {
                l: bl,
                def: positions[bl] ? positions[bl].match : void 0
            } : bl;
        }
        function clearOptionalTail(buffer) {
            for (var rl = determineLastRequiredPosition(), lmib = buffer.length - 1; lmib > rl && !isMask(lmib); lmib--) ;
            return buffer.splice(rl, lmib + 1 - rl), buffer;
        }
        function isComplete(buffer) {
            if ($.isFunction(opts.isComplete)) return opts.isComplete(buffer, opts);
            if ("*" === opts.repeat) return void 0;
            var complete = !1, lrp = determineLastRequiredPosition(!0), aml = seekPrevious(lrp.l);
            if (void 0 === lrp.def || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
                complete = !0;
                for (var i = 0; aml >= i; i++) {
                    var test = getTestTemplate(i).match;
                    if (null !== test.fn && void 0 === getMaskSet().validPositions[i] && test.optionality !== !0 && test.optionalQuantifier !== !0 || null === test.fn && buffer[i] !== getPlaceholder(i, test)) {
                        complete = !1;
                        break;
                    }
                }
            }
            return complete;
        }
        function patchValueProperty(npt) {
            function patchValhook(type) {
                if ($.valHooks && (void 0 === $.valHooks[type] || $.valHooks[type].inputmaskpatch !== !0)) {
                    var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function(elem) {
                        return elem.value;
                    }, valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function(elem, value) {
                        return elem.value = value, elem;
                    };
                    $.valHooks[type] = {
                        get: function(elem) {
                            if (elem.inputmask) {
                                if (elem.inputmask.opts.autoUnmask) return elem.inputmask.unmaskedvalue();
                                var result = valhookGet(elem), maskset = elem.inputmask.maskset, bufferTemplate = maskset._buffer;
                                return bufferTemplate = bufferTemplate ? bufferTemplate.join("") : "", result !== bufferTemplate ? result : "";
                            }
                            return valhookGet(elem);
                        },
                        set: function(elem, value) {
                            var result, $elem = $(elem);
                            return result = valhookSet(elem, value), elem.inputmask && $elem.trigger("setvalue"), 
                            result;
                        },
                        inputmaskpatch: !0
                    };
                }
            }
            function getter() {
                return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : valueGet.call(this) !== getBufferTemplate().join("") ? document.activeElement === this && opts.clearMaskOnLostFocus ? (isRTL ? clearOptionalTail(getBuffer().slice()).reverse() : clearOptionalTail(getBuffer().slice())).join("") : valueGet.call(this) : "" : valueGet.call(this);
            }
            function setter(value) {
                valueSet.call(this, value), this.inputmask && $(this).trigger("setvalue");
            }
            function installNativeValueSetFallback(npt) {
                EventRuler.on(npt, "mouseenter", function(event) {
                    var $input = $(this), input = this, value = input.inputmask._valueGet();
                    value !== getBuffer().join("") && $input.trigger("setvalue");
                });
            }
            var valueGet, valueSet;
            if (!npt.inputmask.__valueGet) {
                if (Object.getOwnPropertyDescriptor) {
                    var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : void 0;
                    valueProperty && valueProperty.get && valueProperty.set ? (valueGet = valueProperty.get, 
                    valueSet = valueProperty.set, Object.defineProperty(npt, "value", {
                        get: getter,
                        set: setter,
                        configurable: !0
                    })) : "INPUT" !== npt.tagName && (valueGet = function() {
                        return this.textContent;
                    }, valueSet = function(value) {
                        this.textContent = value;
                    }, Object.defineProperty(npt, "value", {
                        get: getter,
                        set: setter,
                        configurable: !0
                    }));
                } else document.__lookupGetter__ && npt.__lookupGetter__("value") && (valueGet = npt.__lookupGetter__("value"), 
                valueSet = npt.__lookupSetter__("value"), npt.__defineGetter__("value", getter), 
                npt.__defineSetter__("value", setter));
                void 0 === valueGet && (valueGet = function() {
                    return npt.value;
                }, valueSet = function(value) {
                    npt.value = value;
                }, patchValhook(npt.type), installNativeValueSetFallback(npt)), npt.inputmask.__valueGet = valueGet, 
                npt.inputmask._valueGet = function(overruleRTL) {
                    return isRTL && overruleRTL !== !0 ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
                }, npt.inputmask.__valueSet = valueSet, npt.inputmask._valueSet = function(value, overruleRTL) {
                    valueSet.call(this.el, null === value || void 0 === value ? "" : overruleRTL !== !0 && isRTL ? value.split("").reverse().join("") : value);
                };
            }
        }
        function handleRemove(input, k, pos, strict) {
            function generalize() {
                if (opts.keepStatic) {
                    resetMaskSet(!0);
                    var lastAlt, validInputs = [], positionsClone = $.extend(!0, {}, getMaskSet().validPositions);
                    for (lastAlt = getLastValidPosition(); lastAlt >= 0; lastAlt--) {
                        var validPos = getMaskSet().validPositions[lastAlt];
                        if (validPos && (null != validPos.match.fn && validInputs.push(validPos.input), 
                        delete getMaskSet().validPositions[lastAlt], void 0 !== validPos.alternation && validPos.locator[validPos.alternation] === getTestTemplate(lastAlt).locator[validPos.alternation])) break;
                    }
                    if (lastAlt > -1) for (;validInputs.length > 0; ) {
                        getMaskSet().p = seekNext(getLastValidPosition());
                        var keypress = new $.Event("keypress");
                        keypress.which = validInputs.pop().charCodeAt(0), keypressEvent.call(input, keypress, !0, !1, !1, getMaskSet().p);
                    } else getMaskSet().validPositions = $.extend(!0, {}, positionsClone);
                }
            }
            if ((opts.numericInput || isRTL) && (k === Inputmask.keyCode.BACKSPACE ? k = Inputmask.keyCode.DELETE : k === Inputmask.keyCode.DELETE && (k = Inputmask.keyCode.BACKSPACE), 
            isRTL)) {
                var pend = pos.end;
                pos.end = pos.begin, pos.begin = pend;
            }
            k === Inputmask.keyCode.BACKSPACE && (pos.end - pos.begin < 1 || opts.insertMode === !1) ? (pos.begin = seekPrevious(pos.begin), 
            void 0 === getMaskSet().validPositions[pos.begin] || getMaskSet().validPositions[pos.begin].input !== opts.groupSeparator && getMaskSet().validPositions[pos.begin].input !== opts.radixPoint || pos.begin--) : k === Inputmask.keyCode.DELETE && pos.begin === pos.end && (pos.end = isMask(pos.end) ? pos.end + 1 : seekNext(pos.end) + 1, 
            void 0 === getMaskSet().validPositions[pos.begin] || getMaskSet().validPositions[pos.begin].input !== opts.groupSeparator && getMaskSet().validPositions[pos.begin].input !== opts.radixPoint || pos.end++), 
            stripValidPositions(pos.begin, pos.end, !1, strict), strict !== !0 && generalize();
            var lvp = getLastValidPosition(pos.begin);
            lvp < pos.begin ? (-1 === lvp && resetMaskSet(), getMaskSet().p = seekNext(lvp)) : strict !== !0 && (getMaskSet().p = pos.begin);
        }
        function keydownEvent(e) {
            var input = this, $input = $(input), k = e.keyCode, pos = caret(input);
            if (k === Inputmask.keyCode.BACKSPACE || k === Inputmask.keyCode.DELETE || iphone && k === Inputmask.keyCode.BACKSPACE_SAFARI || e.ctrlKey && k === Inputmask.keyCode.X && !isInputEventSupported("cut")) e.preventDefault(), 
            handleRemove(input, k, pos), writeBuffer(input, getBuffer(), getMaskSet().p, e, undoValue !== getBuffer().join("")), 
            input.inputmask._valueGet() === getBufferTemplate().join("") ? $input.trigger("cleared") : isComplete(getBuffer()) === !0 && $input.trigger("complete"), 
            opts.showTooltip && (input.title = opts.tooltip || getMaskSet().mask); else if (k === Inputmask.keyCode.END || k === Inputmask.keyCode.PAGE_DOWN) {
                e.preventDefault();
                var caretPos = seekNext(getLastValidPosition());
                opts.insertMode || caretPos !== getMaskLength() || e.shiftKey || caretPos--, caret(input, e.shiftKey ? pos.begin : caretPos, caretPos, !0);
            } else k === Inputmask.keyCode.HOME && !e.shiftKey || k === Inputmask.keyCode.PAGE_UP ? (e.preventDefault(), 
            caret(input, 0, e.shiftKey ? pos.begin : 0, !0)) : (opts.undoOnEscape && k === Inputmask.keyCode.ESCAPE || 90 === k && e.ctrlKey) && e.altKey !== !0 ? (checkVal(input, !0, !1, undoValue.split("")), 
            $input.trigger("click")) : k !== Inputmask.keyCode.INSERT || e.shiftKey || e.ctrlKey ? opts.tabThrough === !0 && k === Inputmask.keyCode.TAB ? (e.shiftKey === !0 ? (null === getTest(pos.begin).fn && (pos.begin = seekNext(pos.begin)), 
            pos.end = seekPrevious(pos.begin, !0), pos.begin = seekPrevious(pos.end, !0)) : (pos.begin = seekNext(pos.begin, !0), 
            pos.end = seekNext(pos.begin, !0), pos.end < getMaskLength() && pos.end--), pos.begin < getMaskLength() && (e.preventDefault(), 
            caret(input, pos.begin, pos.end))) : opts.insertMode !== !1 || e.shiftKey || (k === Inputmask.keyCode.RIGHT ? setTimeout(function() {
                var caretPos = caret(input);
                caret(input, caretPos.begin);
            }, 0) : k === Inputmask.keyCode.LEFT && setTimeout(function() {
                var caretPos = caret(input);
                caret(input, isRTL ? caretPos.begin + 1 : caretPos.begin - 1);
            }, 0)) : (opts.insertMode = !opts.insertMode, caret(input, opts.insertMode || pos.begin !== getMaskLength() ? pos.begin : pos.begin - 1));
            opts.onKeyDown.call(this, e, getBuffer(), caret(input).begin, opts), ignorable = -1 !== $.inArray(k, opts.ignorables);
        }
        function keypressEvent(e, checkval, writeOut, strict, ndx) {
            var input = this, $input = $(input), k = e.which || e.charCode || e.keyCode;
            if (!(checkval === !0 || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable)) return k === Inputmask.keyCode.ENTER && undoValue !== getBuffer().join("") && (undoValue = getBuffer().join(""), 
            setTimeout(function() {
                $input.trigger("change");
            }, 0)), !0;
            if (k) {
                46 === k && e.shiftKey === !1 && "," === opts.radixPoint && (k = 44);
                var forwardPosition, pos = checkval ? {
                    begin: ndx,
                    end: ndx
                } : caret(input), c = String.fromCharCode(k);
                getMaskSet().writeOutBuffer = !0;
                var valResult = isValid(pos, c, strict);
                if (valResult !== !1) {
                    var p = valResult.pos;
                    if (resetMaskSet(!0), void 0 !== valResult.caret) forwardPosition = valResult.caret; else {
                        var vps = getMaskSet().validPositions;
                        forwardPosition = !opts.keepStatic && (void 0 !== vps[p + 1] && getTests(p + 1, vps[p].locator.slice(), p).length > 1 || void 0 !== vps[p].alternation) ? p + 1 : seekNext(p);
                    }
                    getMaskSet().p = forwardPosition;
                }
                if (writeOut !== !1) {
                    var self = this;
                    if (setTimeout(function() {
                        opts.onKeyValidation.call(self, k, valResult, opts);
                    }, 0), getMaskSet().writeOutBuffer && valResult !== !1) {
                        var buffer = getBuffer();
                        writeBuffer(input, buffer, opts.numericInput && void 0 === valResult.caret ? seekPrevious(forwardPosition) : forwardPosition, e, checkval !== !0), 
                        checkval !== !0 && setTimeout(function() {
                            isComplete(buffer) === !0 && $input.trigger("complete");
                        }, 0);
                    }
                }
                if (opts.showTooltip && (input.title = opts.tooltip || getMaskSet().mask), checkval && $.isFunction(opts.onBeforeWrite)) {
                    var result = opts.onBeforeWrite(e, getBuffer(), forwardPosition, opts);
                    if (result && result.refreshFromBuffer) {
                        var refresh = result.refreshFromBuffer;
                        refreshFromBuffer(refresh === !0 ? refresh : refresh.start, refresh.end, result.buffer), 
                        resetMaskSet(!0), result.caret && (getMaskSet().p = result.caret);
                    }
                }
                if (e.preventDefault(), checkval) return valResult;
            }
        }
        function pasteEvent(e) {
            var tempValue, input = this, ev = e.originalEvent || e, $input = $(input), inputValue = input.inputmask._valueGet(!0), caretPos = caret(input);
            isRTL && (tempValue = caretPos.end, caretPos.end = caretPos.begin, caretPos.begin = tempValue);
            var valueBeforeCaret = inputValue.substr(0, caretPos.begin), valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
            valueBeforeCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(0, caretPos.begin).join("") && (valueBeforeCaret = ""), 
            valueAfterCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(caretPos.end).join("") && (valueAfterCaret = ""), 
            isRTL && (tempValue = valueBeforeCaret, valueBeforeCaret = valueAfterCaret, valueAfterCaret = tempValue), 
            window.clipboardData && window.clipboardData.getData ? inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret : ev.clipboardData && ev.clipboardData.getData && (inputValue = valueBeforeCaret + ev.clipboardData.getData("text/plain") + valueAfterCaret);
            var pasteValue = inputValue;
            if ($.isFunction(opts.onBeforePaste)) {
                if (pasteValue = opts.onBeforePaste(inputValue, opts), pasteValue === !1) return e.preventDefault();
                pasteValue || (pasteValue = inputValue);
            }
            return checkVal(input, !1, !1, isRTL ? pasteValue.split("").reverse() : pasteValue.toString().split("")), 
            writeBuffer(input, getBuffer(), seekNext(getLastValidPosition()), e, !0), isComplete(getBuffer()) === !0 && $input.trigger("complete"), 
            e.preventDefault();
        }
        function inputFallBackEvent(e) {
            var input = this, inputValue = input.inputmask._valueGet();
            if (getBuffer().join("") !== inputValue) {
                var caretPos = caret(input);
                if (inputValue = inputValue.replace(new RegExp("(" + Inputmask.escapeRegex(getBufferTemplate().join("")) + ")*"), ""), 
                iemobile) {
                    var inputChar = inputValue.replace(getBuffer().join(""), "");
                    if (1 === inputChar.length) {
                        var keypress = new $.Event("keypress");
                        return keypress.which = inputChar.charCodeAt(0), keypressEvent.call(input, keypress, !0, !0, !1, getMaskSet().validPositions[caretPos.begin - 1] ? caretPos.begin : caretPos.begin - 1), 
                        !1;
                    }
                }
                if (caretPos.begin > inputValue.length && (caret(input, inputValue.length), caretPos = caret(input)), 
                getBuffer().length - inputValue.length !== 1 || inputValue.charAt(caretPos.begin) === getBuffer()[caretPos.begin] || inputValue.charAt(caretPos.begin + 1) === getBuffer()[caretPos.begin] || isMask(caretPos.begin)) {
                    for (var lvp = getLastValidPosition() + 1, bufferTemplate = getBuffer().slice(lvp).join(""); null === inputValue.match(Inputmask.escapeRegex(bufferTemplate) + "$"); ) bufferTemplate = bufferTemplate.slice(1);
                    inputValue = inputValue.replace(bufferTemplate, ""), inputValue = inputValue.split(""), 
                    checkVal(input, !0, !1, inputValue), isComplete(getBuffer()) === !0 && $(input).trigger("complete");
                } else e.keyCode = Inputmask.keyCode.BACKSPACE, keydownEvent.call(input, e);
                e.preventDefault();
            }
        }
        function setValueEvent(e) {
            var input = this, value = input.inputmask._valueGet();
            checkVal(input, !0, !1, ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask(value, opts) || value : value).split("")), 
            undoValue = getBuffer().join(""), (opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === getBufferTemplate().join("") && input.inputmask._valueSet("");
        }
        function focusEvent(e) {
            var input = this, nptValue = input.inputmask._valueGet();
            opts.showMaskOnFocus && (!opts.showMaskOnHover || opts.showMaskOnHover && "" === nptValue) ? input.inputmask._valueGet() !== getBuffer().join("") && writeBuffer(input, getBuffer(), seekNext(getLastValidPosition())) : mouseEnter === !1 && caret(input, seekNext(getLastValidPosition())), 
            opts.positionCaretOnTab === !0 && setTimeout(function() {
                caret(input, seekNext(getLastValidPosition()));
            }, 0), undoValue = getBuffer().join("");
        }
        function mouseleaveEvent(e) {
            var input = this;
            if (mouseEnter = !1, opts.clearMaskOnLostFocus && document.activeElement !== input) {
                var buffer = getBuffer().slice(), nptValue = input.inputmask._valueGet();
                nptValue !== input.getAttribute("placeholder") && "" !== nptValue && (-1 === getLastValidPosition() && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer), 
                writeBuffer(input, buffer));
            }
        }
        function clickEvent(e) {
            function doRadixFocus(clickPos) {
                if (opts.radixFocus && "" !== opts.radixPoint) {
                    var vps = getMaskSet().validPositions;
                    if (void 0 === vps[clickPos] || vps[clickPos].input === getPlaceholder(clickPos)) {
                        if (clickPos < seekNext(-1)) return !0;
                        var radixPos = $.inArray(opts.radixPoint, getBuffer());
                        if (-1 !== radixPos) {
                            for (var vp in vps) if (vp > radixPos && vps[vp].input !== getPlaceholder(vp)) return !1;
                            return !0;
                        }
                    }
                }
                return !1;
            }
            var input = this;
            if (document.activeElement === input) {
                var selectedCaret = caret(input);
                if (selectedCaret.begin === selectedCaret.end) if (doRadixFocus(selectedCaret.begin)) caret(input, opts.numericInput ? seekNext($.inArray(opts.radixPoint, getBuffer())) : $.inArray(opts.radixPoint, getBuffer())); else {
                    var clickPosition = selectedCaret.begin, lvclickPosition = getLastValidPosition(clickPosition, !0), lastPosition = seekNext(lvclickPosition);
                    if (lastPosition > clickPosition) caret(input, isMask(clickPosition) || isMask(clickPosition - 1) ? clickPosition : seekNext(clickPosition)); else {
                        var placeholder = getPlaceholder(lastPosition);
                        ("" !== placeholder && getBuffer()[lastPosition] !== placeholder || !isMask(lastPosition, !0) && getTest(lastPosition).def === placeholder) && (lastPosition = seekNext(lastPosition)), 
                        caret(input, lastPosition);
                    }
                }
            }
        }
        function dblclickEvent(e) {
            var input = this;
            setTimeout(function() {
                caret(input, 0, seekNext(getLastValidPosition()));
            }, 0);
        }
        function cutEvent(e) {
            var input = this, $input = $(input), pos = caret(input), ev = e.originalEvent || e, clipboardData = window.clipboardData || ev.clipboardData, clipData = isRTL ? getBuffer().slice(pos.end, pos.begin) : getBuffer().slice(pos.begin, pos.end);
            clipboardData.setData("text", isRTL ? clipData.reverse().join("") : clipData.join("")), 
            document.execCommand && document.execCommand("copy"), handleRemove(input, Inputmask.keyCode.DELETE, pos), 
            writeBuffer(input, getBuffer(), getMaskSet().p, e, undoValue !== getBuffer().join("")), 
            input.inputmask._valueGet() === getBufferTemplate().join("") && $input.trigger("cleared"), 
            opts.showTooltip && (input.title = opts.tooltip || getMaskSet().mask);
        }
        function blurEvent(e) {
            var $input = $(this), input = this;
            if (input.inputmask) {
                var nptValue = input.inputmask._valueGet(), buffer = getBuffer().slice();
                undoValue !== buffer.join("") && setTimeout(function() {
                    $input.trigger("change"), undoValue = buffer.join("");
                }, 0), "" !== nptValue && (opts.clearMaskOnLostFocus && (-1 === getLastValidPosition() && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer)), 
                isComplete(buffer) === !1 && (setTimeout(function() {
                    $input.trigger("incomplete");
                }, 0), opts.clearIncomplete && (resetMaskSet(), buffer = opts.clearMaskOnLostFocus ? [] : getBufferTemplate().slice())), 
                writeBuffer(input, buffer, void 0, e));
            }
        }
        function mouseenterEvent(e) {
            var input = this;
            mouseEnter = !0, document.activeElement !== input && opts.showMaskOnHover && input.inputmask._valueGet() !== getBuffer().join("") && writeBuffer(input, getBuffer());
        }
        function submitEvent(e) {
            undoValue !== getBuffer().join("") && $el.trigger("change"), opts.clearMaskOnLostFocus && -1 === getLastValidPosition() && el.inputmask._valueGet && el.inputmask._valueGet() === getBufferTemplate().join("") && el.inputmask._valueSet(""), 
            opts.removeMaskOnSubmit && (el.inputmask._valueSet(el.inputmask.unmaskedvalue(), !0), 
            setTimeout(function() {
                writeBuffer(el, getBuffer());
            }, 0));
        }
        function resetEvent(e) {
            setTimeout(function() {
                $el.trigger("setvalue");
            }, 0);
        }
        function mask(elem) {
            if (el = elem, $el = $(el), opts.showTooltip && (el.title = opts.tooltip || getMaskSet().mask), 
            ("rtl" === el.dir || opts.rightAlign) && (el.style.textAlign = "right"), ("rtl" === el.dir || opts.numericInput) && (el.dir = "ltr", 
            el.removeAttribute("dir"), el.inputmask.isRTL = !0, isRTL = !0), EventRuler.off(el), 
            patchValueProperty(el), isElementTypeSupported(el, opts) && (EventRuler.on(el, "submit", submitEvent), 
            EventRuler.on(el, "reset", resetEvent), EventRuler.on(el, "mouseenter", mouseenterEvent), 
            EventRuler.on(el, "blur", blurEvent), EventRuler.on(el, "focus", focusEvent), EventRuler.on(el, "mouseleave", mouseleaveEvent), 
            EventRuler.on(el, "click", clickEvent), EventRuler.on(el, "dblclick", dblclickEvent), 
            EventRuler.on(el, "paste", pasteEvent), EventRuler.on(el, "dragdrop", pasteEvent), 
            EventRuler.on(el, "drop", pasteEvent), EventRuler.on(el, "cut", cutEvent), EventRuler.on(el, "complete", opts.oncomplete), 
            EventRuler.on(el, "incomplete", opts.onincomplete), EventRuler.on(el, "cleared", opts.oncleared), 
            EventRuler.on(el, "keydown", keydownEvent), EventRuler.on(el, "keypress", keypressEvent), 
            EventRuler.on(el, "input", inputFallBackEvent)), EventRuler.on(el, "setvalue", setValueEvent), 
            "" !== el.inputmask._valueGet() || opts.clearMaskOnLostFocus === !1 || document.activeElement === el) {
                var initialValue = $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask(el.inputmask._valueGet(), opts) || el.inputmask._valueGet() : el.inputmask._valueGet();
                checkVal(el, !0, !1, initialValue.split(""));
                var buffer = getBuffer().slice();
                undoValue = buffer.join(""), isComplete(buffer) === !1 && opts.clearIncomplete && resetMaskSet(), 
                opts.clearMaskOnLostFocus && document.activeElement !== el && (-1 == getLastValidPosition() ? buffer = [] : clearOptionalTail(buffer)), 
                writeBuffer(el, buffer), document.activeElement === el && caret(el, seekNext(getLastValidPosition()));
            }
        }
        var undoValue, el, $el, maxLength, valueBuffer, isRTL = !1, skipKeyPressEvent = !1, skipInputEvent = !1, ignorable = !1, mouseEnter = !0, EventRuler = {
            on: function(input, eventName, eventHandler) {
                var ev = function(e) {
                    if (void 0 === this.inputmask && "FORM" !== this.nodeName) {
                        var imOpts = $.data(this, "_inputmask_opts");
                        imOpts ? new Inputmask(imOpts).mask(this) : EventRuler.off(this);
                    } else {
                        if ("setvalue" === e.type || !(this.disabled || this.readOnly && !("keydown" === e.type && e.ctrlKey && 67 === e.keyCode || opts.tabThrough === !1 && e.keyCode === Inputmask.keyCode.TAB))) {
                            switch (e.type) {
                              case "input":
                                if (skipInputEvent === !0) return skipInputEvent = !1, e.preventDefault();
                                break;

                              case "keydown":
                                skipKeyPressEvent = !1, skipInputEvent = !1;
                                break;

                              case "keypress":
                                if (skipKeyPressEvent === !0) return e.preventDefault();
                                skipKeyPressEvent = !0;
                                break;

                              case "click":
                                if (iemobile) {
                                    var that = this;
                                    return setTimeout(function() {
                                        eventHandler.apply(that, arguments);
                                    }, 0), !1;
                                }
                            }
                            var returnVal = eventHandler.apply(this, arguments);
                            return returnVal === !1 && (e.preventDefault(), e.stopPropagation()), returnVal;
                        }
                        e.preventDefault();
                    }
                };
                input.inputmask.events[eventName] = input.inputmask.events[eventName] || [], input.inputmask.events[eventName].push(ev), 
                -1 !== $.inArray(eventName, [ "submit", "reset" ]) ? null != input.form && $(input.form).on(eventName, ev) : $(input).on(eventName, ev);
            },
            off: function(input, event) {
                if (input.inputmask && input.inputmask.events) {
                    var events;
                    event ? (events = [], events[event] = input.inputmask.events[event]) : events = input.inputmask.events, 
                    $.each(events, function(eventName, evArr) {
                        for (;evArr.length > 0; ) {
                            var ev = evArr.pop();
                            -1 !== $.inArray(eventName, [ "submit", "reset" ]) ? null != input.form && $(input.form).off(eventName, ev) : $(input).off(eventName, ev);
                        }
                        delete input.inputmask.events[eventName];
                    });
                }
            }
        };
        if (void 0 !== actionObj) switch (actionObj.action) {
          case "isComplete":
            return el = actionObj.el, isComplete(getBuffer());

          case "unmaskedvalue":
            return el = actionObj.el, void 0 !== el && void 0 !== el.inputmask ? (maskset = el.inputmask.maskset, 
            opts = el.inputmask.opts, isRTL = el.inputmask.isRTL) : (valueBuffer = actionObj.value, 
            opts.numericInput && (isRTL = !0), valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask(valueBuffer, opts) || valueBuffer : valueBuffer).split(""), 
            checkVal(void 0, !1, !1, isRTL ? valueBuffer.reverse() : valueBuffer), $.isFunction(opts.onBeforeWrite) && opts.onBeforeWrite(void 0, getBuffer(), 0, opts)), 
            unmaskedvalue(el);

          case "mask":
            el = actionObj.el, maskset = el.inputmask.maskset, opts = el.inputmask.opts, isRTL = el.inputmask.isRTL, 
            undoValue = getBuffer().join(""), mask(el);
            break;

          case "format":
            return opts.numericInput && (isRTL = !0), valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask(actionObj.value, opts) || actionObj.value : actionObj.value).split(""), 
            checkVal(void 0, !1, !1, isRTL ? valueBuffer.reverse() : valueBuffer), $.isFunction(opts.onBeforeWrite) && opts.onBeforeWrite(void 0, getBuffer(), 0, opts), 
            actionObj.metadata ? {
                value: isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
                metadata: maskScope({
                    action: "getmetadata"
                }, maskset, opts)
            } : isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");

          case "isValid":
            opts.numericInput && (isRTL = !0), actionObj.value ? (valueBuffer = actionObj.value.split(""), 
            checkVal(void 0, !1, !0, isRTL ? valueBuffer.reverse() : valueBuffer)) : actionObj.value = getBuffer().join("");
            for (var buffer = getBuffer(), rl = determineLastRequiredPosition(), lmib = buffer.length - 1; lmib > rl && !isMask(lmib); lmib--) ;
            return buffer.splice(rl, lmib + 1 - rl), isComplete(buffer) && actionObj.value === getBuffer().join("");

          case "getemptymask":
            return getBufferTemplate().join("");

          case "remove":
            el = actionObj.el, $el = $(el), maskset = el.inputmask.maskset, opts = el.inputmask.opts, 
            el.inputmask._valueSet(unmaskedvalue(el)), EventRuler.off(el);
            var valueProperty;
            Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? (valueProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value"), 
            valueProperty && el.inputmask.__valueGet && Object.defineProperty(el, "value", {
                get: el.inputmask.__valueGet,
                set: el.inputmask.__valueSet,
                configurable: !0
            })) : document.__lookupGetter__ && el.__lookupGetter__("value") && el.inputmask.__valueGet && (el.__defineGetter__("value", el.inputmask.__valueGet), 
            el.__defineSetter__("value", el.inputmask.__valueSet)), el.inputmask = void 0;
            break;

          case "getmetadata":
            if ($.isArray(maskset.metadata)) {
                for (var alternation, lvp = getLastValidPosition(void 0, !0), firstAlt = lvp; firstAlt >= 0; firstAlt--) if (getMaskSet().validPositions[firstAlt] && void 0 !== getMaskSet().validPositions[firstAlt].alternation) {
                    alternation = getMaskSet().validPositions[firstAlt].alternation;
                    break;
                }
                return void 0 !== alternation ? maskset.metadata[getMaskSet().validPositions[firstAlt].locator[alternation]] : [];
            }
            return maskset.metadata;
        }
    }
    Inputmask.prototype = {
        defaults: {
            placeholder: "_",
            optionalmarker: {
                start: "[",
                end: "]"
            },
            quantifiermarker: {
                start: "{",
                end: "}"
            },
            groupmarker: {
                start: "(",
                end: ")"
            },
            alternatormarker: "|",
            escapeChar: "\\",
            mask: null,
            oncomplete: $.noop,
            onincomplete: $.noop,
            oncleared: $.noop,
            repeat: 0,
            greedy: !0,
            autoUnmask: !1,
            removeMaskOnSubmit: !1,
            clearMaskOnLostFocus: !0,
            insertMode: !0,
            clearIncomplete: !1,
            aliases: {},
            alias: null,
            onKeyDown: $.noop,
            onBeforeMask: null,
            onBeforePaste: function(pastedValue, opts) {
                return $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask(pastedValue, opts) : pastedValue;
            },
            onBeforeWrite: null,
            onUnMask: null,
            showMaskOnFocus: !0,
            showMaskOnHover: !0,
            onKeyValidation: $.noop,
            skipOptionalPartCharacter: " ",
            showTooltip: !1,
            tooltip: void 0,
            numericInput: !1,
            rightAlign: !1,
            undoOnEscape: !0,
            radixPoint: "",
            radixPointDefinitionSymbol: void 0,
            groupSeparator: "",
            radixFocus: !1,
            nojumps: !1,
            nojumpsThreshold: 0,
            keepStatic: null,
            positionCaretOnTab: !1,
            tabThrough: !1,
            supportsInputType: [ "text", "tel", "password" ],
            definitions: {
                "9": {
                    validator: "[0-9]",
                    cardinality: 1,
                    definitionSymbol: "*"
                },
                a: {
                    validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                    cardinality: 1,
                    definitionSymbol: "*"
                },
                "*": {
                    validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                    cardinality: 1
                }
            },
            ignorables: [ 8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123 ],
            isComplete: null,
            canClearPosition: $.noop,
            postValidation: null,
            staticDefinitionSymbol: void 0,
            jitMasking: !1
        },
        masksCache: {},
        mask: function(elems) {
            var that = this;
            return "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), 
            elems = elems.nodeName ? [ elems ] : elems, $.each(elems, function(ndx, el) {
                var scopedOpts = $.extend(!0, {}, that.opts);
                importAttributeOptions(el, scopedOpts, $.extend(!0, {}, that.userOptions));
                var maskset = generateMaskSet(scopedOpts, that.noMasksCache);
                void 0 !== maskset && (void 0 !== el.inputmask && el.inputmask.remove(), el.inputmask = new Inputmask(), 
                el.inputmask.opts = scopedOpts, el.inputmask.noMasksCache = that.noMasksCache, el.inputmask.userOptions = $.extend(!0, {}, that.userOptions), 
                el.inputmask.el = el, el.inputmask.maskset = maskset, el.inputmask.isRTL = !1, $.data(el, "_inputmask_opts", scopedOpts), 
                maskScope({
                    action: "mask",
                    el: el
                }));
            }), elems && elems[0] ? elems[0].inputmask || this : this;
        },
        option: function(options) {
            return "string" == typeof options ? this.opts[options] : "object" == typeof options ? ($.extend(this.opts, options), 
            $.extend(this.userOptions, options), this.el && (void 0 !== options.mask || void 0 !== options.alias ? this.mask(this.el) : ($.data(this.el, "_inputmask_opts", this.opts), 
            maskScope({
                action: "mask",
                el: this.el
            }))), this) : void 0;
        },
        unmaskedvalue: function(value) {
            return maskScope({
                action: "unmaskedvalue",
                el: this.el,
                value: value
            }, this.el && this.el.inputmask ? this.el.inputmask.maskset : generateMaskSet(this.opts, this.noMasksCache), this.opts);
        },
        remove: function() {
            return this.el ? (maskScope({
                action: "remove",
                el: this.el
            }), this.el.inputmask = void 0, this.el) : void 0;
        },
        getemptymask: function() {
            return maskScope({
                action: "getemptymask"
            }, this.maskset || generateMaskSet(this.opts, this.noMasksCache), this.opts);
        },
        hasMaskedValue: function() {
            return !this.opts.autoUnmask;
        },
        isComplete: function() {
            return maskScope({
                action: "isComplete",
                el: this.el
            }, this.maskset || generateMaskSet(this.opts, this.noMasksCache), this.opts);
        },
        getmetadata: function() {
            return maskScope({
                action: "getmetadata"
            }, this.maskset || generateMaskSet(this.opts, this.noMasksCache), this.opts);
        },
        isValid: function(value) {
            return maskScope({
                action: "isValid",
                value: value
            }, this.maskset || generateMaskSet(this.opts, this.noMasksCache), this.opts);
        },
        format: function(value, metadata) {
            return maskScope({
                action: "format",
                value: value,
                metadata: metadata
            }, this.maskset || generateMaskSet(this.opts, this.noMasksCache), this.opts);
        }
    }, Inputmask.extendDefaults = function(options) {
        $.extend(!0, Inputmask.prototype.defaults, options);
    }, Inputmask.extendDefinitions = function(definition) {
        $.extend(!0, Inputmask.prototype.defaults.definitions, definition);
    }, Inputmask.extendAliases = function(alias) {
        $.extend(!0, Inputmask.prototype.defaults.aliases, alias);
    }, Inputmask.format = function(value, options, metadata) {
        return Inputmask(options).format(value, metadata);
    }, Inputmask.unmask = function(value, options) {
        return Inputmask(options).unmaskedvalue(value);
    }, Inputmask.isValid = function(value, options) {
        return Inputmask(options).isValid(value);
    }, Inputmask.remove = function(elems) {
        $.each(elems, function(ndx, el) {
            el.inputmask && el.inputmask.remove();
        });
    }, Inputmask.escapeRegex = function(str) {
        var specials = [ "/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^" ];
        return str.replace(new RegExp("(\\" + specials.join("|\\") + ")", "gim"), "\\$1");
    }, Inputmask.keyCode = {
        ALT: 18,
        BACKSPACE: 8,
        BACKSPACE_SAFARI: 127,
        CAPS_LOCK: 20,
        COMMA: 188,
        COMMAND: 91,
        COMMAND_LEFT: 91,
        COMMAND_RIGHT: 93,
        CONTROL: 17,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        INSERT: 45,
        LEFT: 37,
        MENU: 93,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SHIFT: 16,
        SPACE: 32,
        TAB: 9,
        UP: 38,
        WINDOWS: 91,
        X: 88
    };
    var ua = navigator.userAgent, mobile = /mobile/i.test(ua), iemobile = /iemobile/i.test(ua), iphone = /iphone/i.test(ua) && !iemobile;
    /android.*safari.*/i.test(ua) && !iemobile;
    return window.Inputmask = Inputmask, Inputmask;
}(jQuery), function($, Inputmask) {
    return void 0 === $.fn.inputmask && ($.fn.inputmask = function(fn, options) {
        var nptmask, input = this[0];
        if (void 0 === options && (options = {}), "string" == typeof fn) switch (fn) {
          case "unmaskedvalue":
            return input && input.inputmask ? input.inputmask.unmaskedvalue() : $(input).val();

          case "remove":
            return this.each(function() {
                this.inputmask && this.inputmask.remove();
            });

          case "getemptymask":
            return input && input.inputmask ? input.inputmask.getemptymask() : "";

          case "hasMaskedValue":
            return input && input.inputmask ? input.inputmask.hasMaskedValue() : !1;

          case "isComplete":
            return input && input.inputmask ? input.inputmask.isComplete() : !0;

          case "getmetadata":
            return input && input.inputmask ? input.inputmask.getmetadata() : void 0;

          case "setvalue":
            $(input).val(options), input && void 0 !== input.inputmask && $(input).triggerHandler("setvalue");
            break;

          case "option":
            if ("string" != typeof options) return this.each(function() {
                return void 0 !== this.inputmask ? this.inputmask.option(options) : void 0;
            });
            if (input && void 0 !== input.inputmask) return input.inputmask.option(options);
            break;

          default:
            return options.alias = fn, nptmask = new Inputmask(options), this.each(function() {
                nptmask.mask(this);
            });
        } else {
            if ("object" == typeof fn) return nptmask = new Inputmask(fn), void 0 === fn.mask && void 0 === fn.alias ? this.each(function() {
                return void 0 !== this.inputmask ? this.inputmask.option(fn) : void nptmask.mask(this);
            }) : this.each(function() {
                nptmask.mask(this);
            });
            if (void 0 === fn) return this.each(function() {
                nptmask = new Inputmask(options), nptmask.mask(this);
            });
        }
    }), $.fn.inputmask;
}(jQuery, Inputmask), function($, Inputmask) {
    return Inputmask.extendDefinitions({
        h: {
            validator: "[01][0-9]|2[0-3]",
            cardinality: 2,
            prevalidator: [ {
                validator: "[0-2]",
                cardinality: 1
            } ]
        },
        s: {
            validator: "[0-5][0-9]",
            cardinality: 2,
            prevalidator: [ {
                validator: "[0-5]",
                cardinality: 1
            } ]
        },
        d: {
            validator: "0[1-9]|[12][0-9]|3[01]",
            cardinality: 2,
            prevalidator: [ {
                validator: "[0-3]",
                cardinality: 1
            } ]
        },
        m: {
            validator: "0[1-9]|1[012]",
            cardinality: 2,
            prevalidator: [ {
                validator: "[01]",
                cardinality: 1
            } ]
        },
        y: {
            validator: "(19|20)\\d{2}",
            cardinality: 4,
            prevalidator: [ {
                validator: "[12]",
                cardinality: 1
            }, {
                validator: "(19|20)",
                cardinality: 2
            }, {
                validator: "(19|20)\\d",
                cardinality: 3
            } ]
        }
    }), Inputmask.extendAliases({
        "dd/mm/yyyy": {
            mask: "1/2/y",
            placeholder: "dd/mm/yyyy",
            regex: {
                val1pre: new RegExp("[0-3]"),
                val1: new RegExp("0[1-9]|[12][0-9]|3[01]"),
                val2pre: function(separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[1-9]|[12][0-9]|3[01])" + escapedSeparator + "[01])");
                },
                val2: function(separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[1-9]|[12][0-9])" + escapedSeparator + "(0[1-9]|1[012]))|(30" + escapedSeparator + "(0[13-9]|1[012]))|(31" + escapedSeparator + "(0[13578]|1[02]))");
                }
            },
            leapday: "29/02/",
            separator: "/",
            yearrange: {
                minyear: 1900,
                maxyear: 2099
            },
            isInYearRange: function(chrs, minyear, maxyear) {
                if (isNaN(chrs)) return !1;
                var enteredyear = parseInt(chrs.concat(minyear.toString().slice(chrs.length))), enteredyear2 = parseInt(chrs.concat(maxyear.toString().slice(chrs.length)));
                return (isNaN(enteredyear) ? !1 : enteredyear >= minyear && maxyear >= enteredyear) || (isNaN(enteredyear2) ? !1 : enteredyear2 >= minyear && maxyear >= enteredyear2);
            },
            determinebaseyear: function(minyear, maxyear, hint) {
                var currentyear = new Date().getFullYear();
                if (minyear > currentyear) return minyear;
                if (currentyear > maxyear) {
                    for (var maxYearPrefix = maxyear.toString().slice(0, 2), maxYearPostfix = maxyear.toString().slice(2, 4); maxYearPrefix + hint > maxyear; ) maxYearPrefix--;
                    var maxxYear = maxYearPrefix + maxYearPostfix;
                    return minyear > maxxYear ? minyear : maxxYear;
                }
                if (currentyear >= minyear && maxyear >= currentyear) {
                    for (var currentYearPrefix = currentyear.toString().slice(0, 2); currentYearPrefix + hint > maxyear; ) currentYearPrefix--;
                    var currentYearAndHint = currentYearPrefix + hint;
                    return minyear > currentYearAndHint ? minyear : currentYearAndHint;
                }
                return currentyear;
            },
            onKeyDown: function(e, buffer, caretPos, opts) {
                var $input = $(this);
                if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                    var today = new Date();
                    $input.val(today.getDate().toString() + (today.getMonth() + 1).toString() + today.getFullYear().toString()), 
                    $input.trigger("setvalue");
                }
            },
            getFrontValue: function(mask, buffer, opts) {
                for (var start = 0, length = 0, i = 0; i < mask.length && "2" !== mask.charAt(i); i++) {
                    var definition = opts.definitions[mask.charAt(i)];
                    definition ? (start += length, length = definition.cardinality) : length++;
                }
                return buffer.join("").substr(start, length);
            },
            definitions: {
                "1": {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        var isValid = opts.regex.val1.test(chrs);
                        return strict || isValid || chrs.charAt(1) !== opts.separator && -1 === "-./".indexOf(chrs.charAt(1)) || !(isValid = opts.regex.val1.test("0" + chrs.charAt(0))) ? isValid : (maskset.buffer[pos - 1] = "0", 
                        {
                            refreshFromBuffer: {
                                start: pos - 1,
                                end: pos
                            },
                            pos: pos,
                            c: chrs.charAt(0)
                        });
                    },
                    cardinality: 2,
                    prevalidator: [ {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            var pchrs = chrs;
                            isNaN(maskset.buffer[pos + 1]) || (pchrs += maskset.buffer[pos + 1]);
                            var isValid = 1 === pchrs.length ? opts.regex.val1pre.test(pchrs) : opts.regex.val1.test(pchrs);
                            if (!strict && !isValid) {
                                if (isValid = opts.regex.val1.test(chrs + "0")) return maskset.buffer[pos] = chrs, 
                                maskset.buffer[++pos] = "0", {
                                    pos: pos,
                                    c: "0"
                                };
                                if (isValid = opts.regex.val1.test("0" + chrs)) return maskset.buffer[pos] = "0", 
                                pos++, {
                                    pos: pos
                                };
                            }
                            return isValid;
                        },
                        cardinality: 1
                    } ]
                },
                "2": {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        var frontValue = opts.getFrontValue(maskset.mask, maskset.buffer, opts);
                        -1 !== frontValue.indexOf(opts.placeholder[0]) && (frontValue = "01" + opts.separator);
                        var isValid = opts.regex.val2(opts.separator).test(frontValue + chrs);
                        if (!strict && !isValid && (chrs.charAt(1) === opts.separator || -1 !== "-./".indexOf(chrs.charAt(1))) && (isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs.charAt(0)))) return maskset.buffer[pos - 1] = "0", 
                        {
                            refreshFromBuffer: {
                                start: pos - 1,
                                end: pos
                            },
                            pos: pos,
                            c: chrs.charAt(0)
                        };
                        if (opts.mask.indexOf("2") === opts.mask.length - 1 && isValid) {
                            var dayMonthValue = maskset.buffer.join("").substr(4, 4) + chrs;
                            if (dayMonthValue !== opts.leapday) return !0;
                            var year = parseInt(maskset.buffer.join("").substr(0, 4), 10);
                            return year % 4 === 0 ? year % 100 === 0 ? year % 400 === 0 ? !0 : !1 : !0 : !1;
                        }
                        return isValid;
                    },
                    cardinality: 2,
                    prevalidator: [ {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            isNaN(maskset.buffer[pos + 1]) || (chrs += maskset.buffer[pos + 1]);
                            var frontValue = opts.getFrontValue(maskset.mask, maskset.buffer, opts);
                            -1 !== frontValue.indexOf(opts.placeholder[0]) && (frontValue = "01" + opts.separator);
                            var isValid = 1 === chrs.length ? opts.regex.val2pre(opts.separator).test(frontValue + chrs) : opts.regex.val2(opts.separator).test(frontValue + chrs);
                            return strict || isValid || !(isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs)) ? isValid : (maskset.buffer[pos] = "0", 
                            pos++, {
                                pos: pos
                            });
                        },
                        cardinality: 1
                    } ]
                },
                y: {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        if (opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) {
                            var dayMonthValue = maskset.buffer.join("").substr(0, 6);
                            if (dayMonthValue !== opts.leapday) return !0;
                            var year = parseInt(chrs, 10);
                            return year % 4 === 0 ? year % 100 === 0 ? year % 400 === 0 ? !0 : !1 : !0 : !1;
                        }
                        return !1;
                    },
                    cardinality: 4,
                    prevalidator: [ {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            var isValid = opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                            if (!strict && !isValid) {
                                var yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs + "0").toString().slice(0, 1);
                                if (isValid = opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) return maskset.buffer[pos++] = yearPrefix.charAt(0), 
                                {
                                    pos: pos
                                };
                                if (yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs + "0").toString().slice(0, 2), 
                                isValid = opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) return maskset.buffer[pos++] = yearPrefix.charAt(0), 
                                maskset.buffer[pos++] = yearPrefix.charAt(1), {
                                    pos: pos
                                };
                            }
                            return isValid;
                        },
                        cardinality: 1
                    }, {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            var isValid = opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                            if (!strict && !isValid) {
                                var yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs).toString().slice(0, 2);
                                if (isValid = opts.isInYearRange(chrs[0] + yearPrefix[1] + chrs[1], opts.yearrange.minyear, opts.yearrange.maxyear)) return maskset.buffer[pos++] = yearPrefix.charAt(1), 
                                {
                                    pos: pos
                                };
                                if (yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs).toString().slice(0, 2), 
                                opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) {
                                    var dayMonthValue = maskset.buffer.join("").substr(0, 6);
                                    if (dayMonthValue !== opts.leapday) isValid = !0; else {
                                        var year = parseInt(chrs, 10);
                                        isValid = year % 4 === 0 ? year % 100 === 0 ? year % 400 === 0 ? !0 : !1 : !0 : !1;
                                    }
                                } else isValid = !1;
                                if (isValid) return maskset.buffer[pos - 1] = yearPrefix.charAt(0), maskset.buffer[pos++] = yearPrefix.charAt(1), 
                                maskset.buffer[pos++] = chrs.charAt(0), {
                                    refreshFromBuffer: {
                                        start: pos - 3,
                                        end: pos
                                    },
                                    pos: pos
                                };
                            }
                            return isValid;
                        },
                        cardinality: 2
                    }, {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            return opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                        },
                        cardinality: 3
                    } ]
                }
            },
            insertMode: !1,
            autoUnmask: !1
        },
        "mm/dd/yyyy": {
            placeholder: "mm/dd/yyyy",
            alias: "dd/mm/yyyy",
            regex: {
                val2pre: function(separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[13-9]|1[012])" + escapedSeparator + "[0-3])|(02" + escapedSeparator + "[0-2])");
                },
                val2: function(separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + escapedSeparator + "30)|((0[13578]|1[02])" + escapedSeparator + "31)");
                },
                val1pre: new RegExp("[01]"),
                val1: new RegExp("0[1-9]|1[012]")
            },
            leapday: "02/29/",
            onKeyDown: function(e, buffer, caretPos, opts) {
                var $input = $(this);
                if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                    var today = new Date();
                    $input.val((today.getMonth() + 1).toString() + today.getDate().toString() + today.getFullYear().toString()), 
                    $input.trigger("setvalue");
                }
            }
        },
        "yyyy/mm/dd": {
            mask: "y/1/2",
            placeholder: "yyyy/mm/dd",
            alias: "mm/dd/yyyy",
            leapday: "/02/29",
            onKeyDown: function(e, buffer, caretPos, opts) {
                var $input = $(this);
                if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                    var today = new Date();
                    $input.val(today.getFullYear().toString() + (today.getMonth() + 1).toString() + today.getDate().toString()), 
                    $input.trigger("setvalue");
                }
            }
        },
        "dd.mm.yyyy": {
            mask: "1.2.y",
            placeholder: "dd.mm.yyyy",
            leapday: "29.02.",
            separator: ".",
            alias: "dd/mm/yyyy"
        },
        "dd-mm-yyyy": {
            mask: "1-2-y",
            placeholder: "dd-mm-yyyy",
            leapday: "29-02-",
            separator: "-",
            alias: "dd/mm/yyyy"
        },
        "mm.dd.yyyy": {
            mask: "1.2.y",
            placeholder: "mm.dd.yyyy",
            leapday: "02.29.",
            separator: ".",
            alias: "mm/dd/yyyy"
        },
        "mm-dd-yyyy": {
            mask: "1-2-y",
            placeholder: "mm-dd-yyyy",
            leapday: "02-29-",
            separator: "-",
            alias: "mm/dd/yyyy"
        },
        "yyyy.mm.dd": {
            mask: "y.1.2",
            placeholder: "yyyy.mm.dd",
            leapday: ".02.29",
            separator: ".",
            alias: "yyyy/mm/dd"
        },
        "yyyy-mm-dd": {
            mask: "y-1-2",
            placeholder: "yyyy-mm-dd",
            leapday: "-02-29",
            separator: "-",
            alias: "yyyy/mm/dd"
        },
        datetime: {
            mask: "1/2/y h:s",
            placeholder: "dd/mm/yyyy hh:mm",
            alias: "dd/mm/yyyy",
            regex: {
                hrspre: new RegExp("[012]"),
                hrs24: new RegExp("2[0-4]|1[3-9]"),
                hrs: new RegExp("[01][0-9]|2[0-4]"),
                ampm: new RegExp("^[a|p|A|P][m|M]"),
                mspre: new RegExp("[0-5]"),
                ms: new RegExp("[0-5][0-9]")
            },
            timeseparator: ":",
            hourFormat: "24",
            definitions: {
                h: {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        if ("24" === opts.hourFormat && 24 === parseInt(chrs, 10)) return maskset.buffer[pos - 1] = "0", 
                        maskset.buffer[pos] = "0", {
                            refreshFromBuffer: {
                                start: pos - 1,
                                end: pos
                            },
                            c: "0"
                        };
                        var isValid = opts.regex.hrs.test(chrs);
                        if (!strict && !isValid && (chrs.charAt(1) === opts.timeseparator || -1 !== "-.:".indexOf(chrs.charAt(1))) && (isValid = opts.regex.hrs.test("0" + chrs.charAt(0)))) return maskset.buffer[pos - 1] = "0", 
                        maskset.buffer[pos] = chrs.charAt(0), pos++, {
                            refreshFromBuffer: {
                                start: pos - 2,
                                end: pos
                            },
                            pos: pos,
                            c: opts.timeseparator
                        };
                        if (isValid && "24" !== opts.hourFormat && opts.regex.hrs24.test(chrs)) {
                            var tmp = parseInt(chrs, 10);
                            return 24 === tmp ? (maskset.buffer[pos + 5] = "a", maskset.buffer[pos + 6] = "m") : (maskset.buffer[pos + 5] = "p", 
                            maskset.buffer[pos + 6] = "m"), tmp -= 12, 10 > tmp ? (maskset.buffer[pos] = tmp.toString(), 
                            maskset.buffer[pos - 1] = "0") : (maskset.buffer[pos] = tmp.toString().charAt(1), 
                            maskset.buffer[pos - 1] = tmp.toString().charAt(0)), {
                                refreshFromBuffer: {
                                    start: pos - 1,
                                    end: pos + 6
                                },
                                c: maskset.buffer[pos]
                            };
                        }
                        return isValid;
                    },
                    cardinality: 2,
                    prevalidator: [ {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            var isValid = opts.regex.hrspre.test(chrs);
                            return strict || isValid || !(isValid = opts.regex.hrs.test("0" + chrs)) ? isValid : (maskset.buffer[pos] = "0", 
                            pos++, {
                                pos: pos
                            });
                        },
                        cardinality: 1
                    } ]
                },
                s: {
                    validator: "[0-5][0-9]",
                    cardinality: 2,
                    prevalidator: [ {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            var isValid = opts.regex.mspre.test(chrs);
                            return strict || isValid || !(isValid = opts.regex.ms.test("0" + chrs)) ? isValid : (maskset.buffer[pos] = "0", 
                            pos++, {
                                pos: pos
                            });
                        },
                        cardinality: 1
                    } ]
                },
                t: {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        return opts.regex.ampm.test(chrs + "m");
                    },
                    casing: "lower",
                    cardinality: 1
                }
            },
            insertMode: !1,
            autoUnmask: !1
        },
        datetime12: {
            mask: "1/2/y h:s t\\m",
            placeholder: "dd/mm/yyyy hh:mm xm",
            alias: "datetime",
            hourFormat: "12"
        },
        "mm/dd/yyyy hh:mm xm": {
            mask: "1/2/y h:s t\\m",
            placeholder: "mm/dd/yyyy hh:mm xm",
            alias: "datetime12",
            regex: {
                val2pre: function(separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[13-9]|1[012])" + escapedSeparator + "[0-3])|(02" + escapedSeparator + "[0-2])");
                },
                val2: function(separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + escapedSeparator + "30)|((0[13578]|1[02])" + escapedSeparator + "31)");
                },
                val1pre: new RegExp("[01]"),
                val1: new RegExp("0[1-9]|1[012]")
            },
            leapday: "02/29/",
            onKeyDown: function(e, buffer, caretPos, opts) {
                var $input = $(this);
                if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                    var today = new Date();
                    $input.val((today.getMonth() + 1).toString() + today.getDate().toString() + today.getFullYear().toString()), 
                    $input.trigger("setvalue");
                }
            }
        },
        "hh:mm t": {
            mask: "h:s t\\m",
            placeholder: "hh:mm xm",
            alias: "datetime",
            hourFormat: "12"
        },
        "h:s t": {
            mask: "h:s t\\m",
            placeholder: "hh:mm xm",
            alias: "datetime",
            hourFormat: "12"
        },
        "hh:mm:ss": {
            mask: "h:s:s",
            placeholder: "hh:mm:ss",
            alias: "datetime",
            autoUnmask: !1
        },
        "hh:mm": {
            mask: "h:s",
            placeholder: "hh:mm",
            alias: "datetime",
            autoUnmask: !1
        },
        date: {
            alias: "dd/mm/yyyy"
        },
        "mm/yyyy": {
            mask: "1/y",
            placeholder: "mm/yyyy",
            leapday: "donotuse",
            separator: "/",
            alias: "mm/dd/yyyy"
        },
        shamsi: {
            regex: {
                val2pre: function(separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "[0-3])");
                },
                val2: function(separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "(0[1-9]|[12][0-9]))|((0[1-9]|1[012])" + escapedSeparator + "30)|((0[1-6])" + escapedSeparator + "31)");
                },
                val1pre: new RegExp("[01]"),
                val1: new RegExp("0[1-9]|1[012]")
            },
            yearrange: {
                minyear: 1300,
                maxyear: 1499
            },
            mask: "y/1/2",
            leapday: "/12/30",
            placeholder: "yyyy/mm/dd",
            alias: "mm/dd/yyyy",
            clearIncomplete: !0
        }
    }), Inputmask;
}(jQuery, Inputmask), function($, Inputmask) {
    return Inputmask.extendDefinitions({
        A: {
            validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
            cardinality: 1,
            casing: "upper"
        },
        "&": {
            validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
            cardinality: 1,
            casing: "upper"
        },
        "#": {
            validator: "[0-9A-Fa-f]",
            cardinality: 1,
            casing: "upper"
        }
    }), Inputmask.extendAliases({
        url: {
            definitions: {
                i: {
                    validator: ".",
                    cardinality: 1
                }
            },
            mask: "(\\http://)|(\\http\\s://)|(ftp://)|(ftp\\s://)i{+}",
            insertMode: !1,
            autoUnmask: !1
        },
        ip: {
            mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]",
            definitions: {
                i: {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        return pos - 1 > -1 && "." !== maskset.buffer[pos - 1] ? (chrs = maskset.buffer[pos - 1] + chrs, 
                        chrs = pos - 2 > -1 && "." !== maskset.buffer[pos - 2] ? maskset.buffer[pos - 2] + chrs : "0" + chrs) : chrs = "00" + chrs, 
                        new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(chrs);
                    },
                    cardinality: 1
                }
            },
            onUnMask: function(maskedValue, unmaskedValue, opts) {
                return maskedValue;
            }
        },
        email: {
            mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}[.-{1,63}][.-{1,63}][.-{1,63}]",
            greedy: !1,
            onBeforePaste: function(pastedValue, opts) {
                return pastedValue = pastedValue.toLowerCase(), pastedValue.replace("mailto:", "");
            },
            definitions: {
                "*": {
                    validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
                    cardinality: 1,
                    casing: "lower"
                },
                "-": {
                    validator: "[0-9A-Za-z-]",
                    cardinality: 1,
                    casing: "lower"
                }
            },
            onUnMask: function(maskedValue, unmaskedValue, opts) {
                return maskedValue;
            }
        },
        mac: {
            mask: "##:##:##:##:##:##"
        },
        vin: {
            mask: "V{8}vV{4}9{4}",
            definitions: {
                V: {
                    validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
                    cardinality: 1,
                    casing: "upper"
                },
                v: {
                    validator: "[Xx\\d]",
                    cardinality: 1,
                    casing: "upper"
                }
            },
            clearIncomplete: !0,
            autoUnmask: !0
        }
    }), Inputmask;
}(jQuery, Inputmask), function($, Inputmask) {
    return Inputmask.extendAliases({
        numeric: {
            mask: function(opts) {
                function autoEscape(txt) {
                    for (var escapedTxt = "", i = 0; i < txt.length; i++) escapedTxt += opts.definitions[txt.charAt(i)] || opts.optionalmarker.start === txt.charAt(i) || opts.optionalmarker.end === txt.charAt(i) || opts.quantifiermarker.start === txt.charAt(i) || opts.quantifiermarker.end === txt.charAt(i) || opts.groupmarker.start === txt.charAt(i) || opts.groupmarker.end === txt.charAt(i) || opts.alternatormarker === txt.charAt(i) ? "\\" + txt.charAt(i) : txt.charAt(i);
                    return escapedTxt;
                }
                if (0 !== opts.repeat && isNaN(opts.integerDigits) && (opts.integerDigits = opts.repeat), 
                opts.repeat = 0, opts.groupSeparator === opts.radixPoint && ("." === opts.radixPoint ? opts.groupSeparator = "," : "," === opts.radixPoint ? opts.groupSeparator = "." : opts.groupSeparator = ""), 
                " " === opts.groupSeparator && (opts.skipOptionalPartCharacter = void 0), opts.autoGroup = opts.autoGroup && "" !== opts.groupSeparator, 
                opts.autoGroup && ("string" == typeof opts.groupSize && isFinite(opts.groupSize) && (opts.groupSize = parseInt(opts.groupSize)), 
                isFinite(opts.integerDigits))) {
                    var seps = Math.floor(opts.integerDigits / opts.groupSize), mod = opts.integerDigits % opts.groupSize;
                    opts.integerDigits = parseInt(opts.integerDigits) + (0 === mod ? seps - 1 : seps), 
                    opts.integerDigits < 1 && (opts.integerDigits = "*");
                }
                opts.placeholder.length > 1 && (opts.placeholder = opts.placeholder.charAt(0)), 
                opts.radixFocus = opts.radixFocus && "" !== opts.placeholder && opts.integerOptional === !0, 
                opts.definitions[";"] = opts.definitions["~"], opts.definitions[";"].definitionSymbol = "~", 
                opts.numericInput === !0 && (opts.radixFocus = !1, opts.digitsOptional = !1, isNaN(opts.digits) && (opts.digits = 2), 
                opts.decimalProtect = !1);
                var mask = autoEscape(opts.prefix);
                return mask += "[+]", mask += opts.integerOptional === !0 ? "~{1," + opts.integerDigits + "}" : "~{" + opts.integerDigits + "}", 
                void 0 !== opts.digits && (isNaN(opts.digits) || parseInt(opts.digits) > 0) && (opts.decimalProtect && (opts.radixPointDefinitionSymbol = ":"), 
                mask += opts.digitsOptional ? "[" + (opts.decimalProtect ? ":" : opts.radixPoint) + ";{1," + opts.digits + "}]" : (opts.decimalProtect ? ":" : opts.radixPoint) + ";{" + opts.digits + "}"), 
                mask += "[-]", mask += "[" + autoEscape(opts.suffix) + "]", opts.greedy = !1, mask;
            },
            placeholder: "",
            greedy: !1,
            digits: "*",
            digitsOptional: !0,
            radixPoint: ".",
            radixFocus: !0,
            groupSize: 3,
            groupSeparator: "",
            autoGroup: !1,
            allowPlus: !0,
            allowMinus: !0,
            negationSymbol: {
                front: "-",
                back: ""
            },
            integerDigits: "+",
            integerOptional: !0,
            prefix: "",
            suffix: "",
            rightAlign: !0,
            decimalProtect: !0,
            min: null,
            max: null,
            step: 1,
            insertMode: !0,
            autoUnmask: !1,
            unmaskAsNumber: !1,
            postFormat: function(buffer, pos, opts) {
                opts.numericInput === !0 && (buffer = buffer.reverse(), isFinite(pos) && (pos = buffer.join("").length - pos - 1));
                var i, l, suffixStripped = !1;
                buffer.length >= opts.suffix.length && buffer.join("").indexOf(opts.suffix) === buffer.length - opts.suffix.length && (buffer.length = buffer.length - opts.suffix.length, 
                suffixStripped = !0), pos = pos >= buffer.length ? buffer.length - 1 : pos < opts.prefix.length ? opts.prefix.length : pos;
                var needsRefresh = !1, charAtPos = buffer[pos], cbuf = buffer.slice();
                charAtPos === opts.groupSeparator && (cbuf.splice(pos--, 1), charAtPos = cbuf[pos]), 
                charAtPos !== opts.radixPoint && charAtPos !== opts.negationSymbol.front && charAtPos !== opts.negationSymbol.back && (cbuf[pos] = "?");
                var bufVal = cbuf.join(""), bufValOrigin = bufVal;
                if (bufVal.length > 0 && opts.autoGroup || -1 !== bufVal.indexOf(opts.groupSeparator)) {
                    var escapedGroupSeparator = Inputmask.escapeRegex(opts.groupSeparator);
                    needsRefresh = 0 === bufVal.indexOf(opts.groupSeparator), bufVal = bufVal.replace(new RegExp(escapedGroupSeparator, "g"), "");
                    var radixSplit = bufVal.split(opts.radixPoint);
                    if (bufVal = "" === opts.radixPoint ? bufVal : radixSplit[0], bufVal !== opts.prefix + "?0" && bufVal.length >= opts.groupSize + opts.prefix.length) for (var reg = new RegExp("([-+]?[\\d?]+)([\\d?]{" + opts.groupSize + "})"); reg.test(bufVal) && "" !== opts.groupSeparator; ) bufVal = bufVal.replace(reg, "$1" + opts.groupSeparator + "$2"), 
                    bufVal = bufVal.replace(opts.groupSeparator + opts.groupSeparator, opts.groupSeparator);
                    "" !== opts.radixPoint && radixSplit.length > 1 && (bufVal += opts.radixPoint + radixSplit[1]);
                }
                for (needsRefresh = bufValOrigin !== bufVal, buffer.length = bufVal.length, i = 0, 
                l = bufVal.length; l > i; i++) buffer[i] = bufVal.charAt(i);
                var newPos = $.inArray("?", buffer);
                if (-1 === newPos && (newPos = $.inArray(charAtPos, buffer)), buffer[newPos] = charAtPos, 
                !needsRefresh && suffixStripped) for (i = 0, l = opts.suffix.length; l > i; i++) buffer.push(opts.suffix.charAt(i));
                return newPos = opts.numericInput && isFinite(pos) ? buffer.join("").length - newPos - 1 : newPos, 
                opts.numericInput && (buffer = buffer.reverse(), $.inArray(opts.radixPoint, buffer) < newPos && buffer.join("").length - opts.suffix.length !== newPos && (newPos -= 1)), 
                {
                    pos: newPos,
                    refreshFromBuffer: needsRefresh,
                    buffer: buffer
                };
            },
            onBeforeWrite: function(e, buffer, caretPos, opts) {
                var rslt;
                if (e && ("blur" === e.type || "checkval" === e.type || "keydown" === e.type)) {
                    var maskedValue = opts.numericInput ? buffer.slice().reverse().join("") : buffer.join(""), processValue = maskedValue.replace(opts.prefix, "");
                    processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                    "," === opts.radixPoint && (processValue = processValue.replace(opts.radixPoint, "."));
                    var isNegative = processValue.match(new RegExp("[-" + Inputmask.escapeRegex(opts.negationSymbol.front) + "]", "g"));
                    if (isNegative = null !== isNegative && 1 === isNegative.length, processValue = processValue.replace(new RegExp("[-" + Inputmask.escapeRegex(opts.negationSymbol.front) + "]", "g"), ""), 
                    processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), ""), 
                    processValue = processValue === opts.negationSymbol.front ? processValue + "0" : processValue, 
                    "" !== processValue && isFinite(processValue)) {
                        var floatValue = parseFloat(processValue), signedFloatValue = isNegative ? -1 * floatValue : floatValue;
                        if (null !== opts.min && isFinite(opts.min) && signedFloatValue < parseFloat(opts.min) ? (floatValue = Math.abs(opts.min), 
                        isNegative = opts.min < 0) : null !== opts.max && isFinite(opts.max) && signedFloatValue > parseFloat(opts.max) && (floatValue = Math.abs(opts.max), 
                        isNegative = opts.max < 0), processValue = floatValue.toString().replace(".", opts.radixPoint).split(""), 
                        isFinite(opts.digits)) {
                            var radixPosition = $.inArray(opts.radixPoint, processValue), rpb = $.inArray(opts.radixPoint, maskedValue);
                            -1 === radixPosition && (processValue.push(opts.radixPoint), radixPosition = processValue.length - 1);
                            for (var i = 1; i <= opts.digits; i++) opts.digitsOptional || void 0 !== processValue[radixPosition + i] && processValue[radixPosition + i] !== opts.placeholder.charAt(0) ? -1 !== rpb && void 0 !== maskedValue[rpb + i] && (processValue[radixPosition + i] = processValue[radixPosition + i] || maskedValue[rpb + i]) : processValue[radixPosition + i] = "0";
                            processValue[processValue.length - 1] === opts.radixPoint && delete processValue[processValue.length - 1];
                        }
                        if (floatValue.toString() !== processValue && floatValue.toString() + "." !== processValue || isNegative) return !isNegative || 0 === floatValue && "blur" === e.type || (processValue.unshift(opts.negationSymbol.front), 
                        processValue.push(opts.negationSymbol.back)), processValue = (opts.prefix + processValue.join("")).split(""), 
                        opts.numericInput && (processValue = processValue.reverse()), rslt = opts.postFormat(processValue, opts.numericInput ? caretPos : caretPos - 1, opts), 
                        rslt.buffer && (rslt.refreshFromBuffer = rslt.buffer.join("") !== buffer.join("")), 
                        rslt;
                    }
                }
                return opts.autoGroup ? (rslt = opts.postFormat(buffer, opts.numericInput ? caretPos : caretPos - 1, opts), 
                rslt.caret = caretPos <= opts.prefix.length ? rslt.pos : rslt.pos + 1, rslt) : void 0;
            },
            regex: {
                integerPart: function(opts) {
                    return new RegExp("[" + Inputmask.escapeRegex(opts.negationSymbol.front) + "+]?\\d+");
                },
                integerNPart: function(opts) {
                    return new RegExp("[\\d" + Inputmask.escapeRegex(opts.groupSeparator) + Inputmask.escapeRegex(opts.placeholder.charAt(0)) + "]+");
                }
            },
            signHandler: function(chrs, maskset, pos, strict, opts) {
                if (!strict && opts.allowMinus && "-" === chrs || opts.allowPlus && "+" === chrs) {
                    var matchRslt = maskset.buffer.join("").match(opts.regex.integerPart(opts));
                    if (matchRslt && matchRslt[0].length > 0) return maskset.buffer[matchRslt.index] === ("-" === chrs ? "+" : opts.negationSymbol.front) ? "-" === chrs ? "" !== opts.negationSymbol.back ? {
                        pos: matchRslt.index,
                        c: opts.negationSymbol.front,
                        remove: matchRslt.index,
                        caret: pos,
                        insert: {
                            pos: maskset.buffer.length - opts.suffix.length - 1,
                            c: opts.negationSymbol.back
                        }
                    } : {
                        pos: matchRslt.index,
                        c: opts.negationSymbol.front,
                        remove: matchRslt.index,
                        caret: pos
                    } : "" !== opts.negationSymbol.back ? {
                        pos: matchRslt.index,
                        c: "+",
                        remove: [ matchRslt.index, maskset.buffer.length - opts.suffix.length - 1 ],
                        caret: pos
                    } : {
                        pos: matchRslt.index,
                        c: "+",
                        remove: matchRslt.index,
                        caret: pos
                    } : maskset.buffer[matchRslt.index] === ("-" === chrs ? opts.negationSymbol.front : "+") ? "-" === chrs && "" !== opts.negationSymbol.back ? {
                        remove: [ matchRslt.index, maskset.buffer.length - opts.suffix.length - 1 ],
                        caret: pos - 1
                    } : {
                        remove: matchRslt.index,
                        caret: pos - 1
                    } : "-" === chrs ? "" !== opts.negationSymbol.back ? {
                        pos: matchRslt.index,
                        c: opts.negationSymbol.front,
                        caret: pos + 1,
                        insert: {
                            pos: maskset.buffer.length - opts.suffix.length,
                            c: opts.negationSymbol.back
                        }
                    } : {
                        pos: matchRslt.index,
                        c: opts.negationSymbol.front,
                        caret: pos + 1
                    } : {
                        pos: matchRslt.index,
                        c: chrs,
                        caret: pos + 1
                    };
                }
                return !1;
            },
            radixHandler: function(chrs, maskset, pos, strict, opts) {
                if (!strict && opts.numericInput !== !0 && (-1 !== $.inArray(chrs, [ ",", "." ]) && (chrs = opts.radixPoint), 
                chrs === opts.radixPoint && void 0 !== opts.digits && (isNaN(opts.digits) || parseInt(opts.digits) > 0))) {
                    var radixPos = $.inArray(opts.radixPoint, maskset.buffer), integerValue = maskset.buffer.join("").match(opts.regex.integerPart(opts));
                    if (-1 !== radixPos && maskset.validPositions[radixPos]) return maskset.validPositions[radixPos - 1] ? {
                        caret: radixPos + 1
                    } : {
                        pos: integerValue.index,
                        c: integerValue[0],
                        caret: radixPos + 1
                    };
                    if (!integerValue || "0" === integerValue[0] && integerValue.index + 1 !== pos) return maskset.buffer[integerValue ? integerValue.index : pos] = "0", 
                    {
                        pos: (integerValue ? integerValue.index : pos) + 1,
                        c: opts.radixPoint
                    };
                }
                return !1;
            },
            leadingZeroHandler: function(chrs, maskset, pos, strict, opts) {
                if (!strict) if (opts.numericInput === !0) {
                    var buffer = maskset.buffer.slice("").reverse(), char = buffer[opts.prefix.length];
                    if ("0" === char) return {
                        pos: pos,
                        remove: buffer.length - opts.prefix.length - 1
                    };
                } else {
                    var radixPosition = $.inArray(opts.radixPoint, maskset.buffer), matchRslt = maskset.buffer.slice(0, -1 !== radixPosition ? radixPosition : void 0).join("").match(opts.regex.integerNPart(opts));
                    if (matchRslt && (-1 === radixPosition || radixPosition >= pos)) {
                        if (0 === matchRslt[0].indexOf("" !== opts.placeholder ? opts.placeholder.charAt(0) : "0") && matchRslt.index + 1 === pos) return maskset.buffer.splice(matchRslt.index, 1), 
                        pos = matchRslt.index, {
                            pos: pos,
                            remove: matchRslt.index
                        };
                        if ("0" === chrs && pos <= matchRslt.index && matchRslt[0] !== opts.groupSeparator) return !1;
                    }
                }
                return !0;
            },
            definitions: {
                "~": {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
                        if (!isValid && (isValid = opts.radixHandler(chrs, maskset, pos, strict, opts), 
                        !isValid && (isValid = strict ? new RegExp("[0-9" + Inputmask.escapeRegex(opts.groupSeparator) + "]").test(chrs) : new RegExp("[0-9]").test(chrs), 
                        isValid === !0 && (isValid = opts.leadingZeroHandler(chrs, maskset, pos, strict, opts), 
                        isValid === !0)))) {
                            var radixPosition = $.inArray(opts.radixPoint, maskset.buffer);
                            isValid = -1 !== radixPosition && (opts.digitsOptional === !1 || maskset.validPositions[pos]) && opts.numericInput !== !0 && pos > radixPosition && !strict ? {
                                pos: pos,
                                remove: pos
                            } : {
                                pos: pos
                            };
                        }
                        return isValid;
                    },
                    cardinality: 1
                },
                "+": {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
                        return !isValid && (strict && opts.allowMinus && chrs === opts.negationSymbol.front || opts.allowMinus && "-" === chrs || opts.allowPlus && "+" === chrs) && (isValid = strict || "-" !== chrs ? !0 : "" !== opts.negationSymbol.back ? {
                            pos: pos,
                            c: "-" === chrs ? opts.negationSymbol.front : "+",
                            caret: pos + 1,
                            insert: {
                                pos: maskset.buffer.length,
                                c: opts.negationSymbol.back
                            }
                        } : {
                            pos: pos,
                            c: "-" === chrs ? opts.negationSymbol.front : "+",
                            caret: pos + 1
                        }), isValid;
                    },
                    cardinality: 1,
                    placeholder: ""
                },
                "-": {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
                        return !isValid && strict && opts.allowMinus && chrs === opts.negationSymbol.back && (isValid = !0), 
                        isValid;
                    },
                    cardinality: 1,
                    placeholder: ""
                },
                ":": {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
                        if (!isValid) {
                            var radix = "[" + Inputmask.escapeRegex(opts.radixPoint) + ",\\.]";
                            isValid = new RegExp(radix).test(chrs), isValid && maskset.validPositions[pos] && maskset.validPositions[pos].match.placeholder === opts.radixPoint && (isValid = {
                                caret: pos + 1
                            });
                        }
                        return isValid ? {
                            c: opts.radixPoint
                        } : isValid;
                    },
                    cardinality: 1,
                    placeholder: function(opts) {
                        return opts.radixPoint;
                    }
                }
            },
            onUnMask: function(maskedValue, unmaskedValue, opts) {
                var processValue = maskedValue.replace(opts.prefix, "");
                return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                opts.unmaskAsNumber ? ("" !== opts.radixPoint && -1 !== processValue.indexOf(opts.radixPoint) && (processValue = processValue.replace(Inputmask.escapeRegex.call(this, opts.radixPoint), ".")), 
                Number(processValue)) : processValue;
            },
            isComplete: function(buffer, opts) {
                var maskedValue = buffer.join(""), bufClone = buffer.slice();
                if (opts.postFormat(bufClone, 0, opts), bufClone.join("") !== maskedValue) return !1;
                var processValue = maskedValue.replace(opts.prefix, "");
                return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                "," === opts.radixPoint && (processValue = processValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".")), 
                isFinite(processValue);
            },
            onBeforeMask: function(initialValue, opts) {
                if ("" !== opts.radixPoint && isFinite(initialValue)) initialValue = initialValue.toString().replace(".", opts.radixPoint); else {
                    var kommaMatches = initialValue.match(/,/g), dotMatches = initialValue.match(/\./g);
                    dotMatches && kommaMatches ? dotMatches.length > kommaMatches.length ? (initialValue = initialValue.replace(/\./g, ""), 
                    initialValue = initialValue.replace(",", opts.radixPoint)) : kommaMatches.length > dotMatches.length ? (initialValue = initialValue.replace(/,/g, ""), 
                    initialValue = initialValue.replace(".", opts.radixPoint)) : initialValue = initialValue.indexOf(".") < initialValue.indexOf(",") ? initialValue.replace(/\./g, "") : initialValue = initialValue.replace(/,/g, "") : initialValue = initialValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
                }
                if (0 === opts.digits && (-1 !== initialValue.indexOf(".") ? initialValue = initialValue.substring(0, initialValue.indexOf(".")) : -1 !== initialValue.indexOf(",") && (initialValue = initialValue.substring(0, initialValue.indexOf(",")))), 
                "" !== opts.radixPoint && isFinite(opts.digits) && -1 !== initialValue.indexOf(opts.radixPoint)) {
                    var valueParts = initialValue.split(opts.radixPoint), decPart = valueParts[1].match(new RegExp("\\d*"))[0];
                    if (parseInt(opts.digits) < decPart.toString().length) {
                        var digitsFactor = Math.pow(10, parseInt(opts.digits));
                        initialValue = initialValue.replace(Inputmask.escapeRegex(opts.radixPoint), "."), 
                        initialValue = Math.round(parseFloat(initialValue) * digitsFactor) / digitsFactor, 
                        initialValue = initialValue.toString().replace(".", opts.radixPoint);
                    }
                }
                return initialValue.toString();
            },
            canClearPosition: function(maskset, position, lvp, strict, opts) {
                var positionInput = maskset.validPositions[position].input, canClear = positionInput !== opts.radixPoint || null !== maskset.validPositions[position].match.fn && opts.decimalProtect === !1 || isFinite(positionInput) || position === lvp || positionInput === opts.groupSeparator || positionInput === opts.negationSymbol.front || positionInput === opts.negationSymbol.back;
                return canClear;
            },
            onKeyDown: function(e, buffer, caretPos, opts) {
                var $input = $(this);
                if (e.ctrlKey) switch (e.keyCode) {
                  case Inputmask.keyCode.UP:
                    $input.val(parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step)), $input.trigger("setvalue");
                    break;

                  case Inputmask.keyCode.DOWN:
                    $input.val(parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step)), $input.trigger("setvalue");
                }
            }
        },
        currency: {
            prefix: "$ ",
            groupSeparator: ",",
            alias: "numeric",
            placeholder: "0",
            autoGroup: !0,
            digits: 2,
            digitsOptional: !1,
            clearMaskOnLostFocus: !1
        },
        decimal: {
            alias: "numeric"
        },
        integer: {
            alias: "numeric",
            digits: 0,
            radixPoint: ""
        },
        percentage: {
            alias: "numeric",
            digits: 2,
            radixPoint: ".",
            placeholder: "0",
            autoGroup: !1,
            min: 0,
            max: 100,
            suffix: " %",
            allowPlus: !1,
            allowMinus: !1
        }
    }), Inputmask;
}(jQuery, Inputmask), function($, Inputmask) {
    return Inputmask.extendAliases({
        phone: {
            url: "phone-codes/phone-codes.js",
            countrycode: "",
            phoneCodeCache: {},
            mask: function(opts) {
                if (void 0 === opts.phoneCodeCache[opts.url]) {
                    var maskList = [];
                    opts.definitions["#"] = opts.definitions[9], $.ajax({
                        url: opts.url,
                        async: !1,
                        type: "get",
                        dataType: "json",
                        success: function(response) {
                            maskList = response;
                        },
                        error: function(xhr, ajaxOptions, thrownError) {
                            alert(thrownError + " - " + opts.url);
                        }
                    }), opts.phoneCodeCache[opts.url] = maskList.sort(function(a, b) {
                        return (a.mask || a) < (b.mask || b) ? -1 : 1;
                    });
                }
                return opts.phoneCodeCache[opts.url];
            },
            keepStatic: !1,
            nojumps: !0,
            nojumpsThreshold: 1,
            onBeforeMask: function(value, opts) {
                var processedValue = value.replace(/^0{1,2}/, "").replace(/[\s]/g, "");
                return (processedValue.indexOf(opts.countrycode) > 1 || -1 === processedValue.indexOf(opts.countrycode)) && (processedValue = "+" + opts.countrycode + processedValue), 
                processedValue;
            }
        },
        phonebe: {
            alias: "phone",
            url: "phone-codes/phone-be.js",
            countrycode: "32",
            nojumpsThreshold: 4
        }
    }), Inputmask;
}(jQuery, Inputmask), function($, Inputmask) {
    return Inputmask.extendAliases({
        Regex: {
            mask: "r",
            greedy: !1,
            repeat: "*",
            regex: null,
            regexTokens: null,
            tokenizer: /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
            quantifierFilter: /[0-9]+[^,]/,
            isComplete: function(buffer, opts) {
                return new RegExp(opts.regex).test(buffer.join(""));
            },
            definitions: {
                r: {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        function RegexToken(isGroup, isQuantifier) {
                            this.matches = [], this.isGroup = isGroup || !1, this.isQuantifier = isQuantifier || !1, 
                            this.quantifier = {
                                min: 1,
                                max: 1
                            }, this.repeaterPart = void 0;
                        }
                        function analyseRegex() {
                            var match, m, currentToken = new RegexToken(), opengroups = [];
                            for (opts.regexTokens = []; match = opts.tokenizer.exec(opts.regex); ) switch (m = match[0], 
                            m.charAt(0)) {
                              case "(":
                                opengroups.push(new RegexToken(!0));
                                break;

                              case ")":
                                groupToken = opengroups.pop(), opengroups.length > 0 ? opengroups[opengroups.length - 1].matches.push(groupToken) : currentToken.matches.push(groupToken);
                                break;

                              case "{":
                              case "+":
                              case "*":
                                var quantifierToken = new RegexToken(!1, !0);
                                m = m.replace(/[{}]/g, "");
                                var mq = m.split(","), mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]), mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
                                if (quantifierToken.quantifier = {
                                    min: mq0,
                                    max: mq1
                                }, opengroups.length > 0) {
                                    var matches = opengroups[opengroups.length - 1].matches;
                                    match = matches.pop(), match.isGroup || (groupToken = new RegexToken(!0), groupToken.matches.push(match), 
                                    match = groupToken), matches.push(match), matches.push(quantifierToken);
                                } else match = currentToken.matches.pop(), match.isGroup || (groupToken = new RegexToken(!0), 
                                groupToken.matches.push(match), match = groupToken), currentToken.matches.push(match), 
                                currentToken.matches.push(quantifierToken);
                                break;

                              default:
                                opengroups.length > 0 ? opengroups[opengroups.length - 1].matches.push(m) : currentToken.matches.push(m);
                            }
                            currentToken.matches.length > 0 && opts.regexTokens.push(currentToken);
                        }
                        function validateRegexToken(token, fromGroup) {
                            var isvalid = !1;
                            fromGroup && (regexPart += "(", openGroupCount++);
                            for (var mndx = 0; mndx < token.matches.length; mndx++) {
                                var matchToken = token.matches[mndx];
                                if (matchToken.isGroup === !0) isvalid = validateRegexToken(matchToken, !0); else if (matchToken.isQuantifier === !0) {
                                    var crrntndx = $.inArray(matchToken, token.matches), matchGroup = token.matches[crrntndx - 1], regexPartBak = regexPart;
                                    if (isNaN(matchToken.quantifier.max)) {
                                        for (;matchToken.repeaterPart && matchToken.repeaterPart !== regexPart && matchToken.repeaterPart.length > regexPart.length && !(isvalid = validateRegexToken(matchGroup, !0)); ) ;
                                        isvalid = isvalid || validateRegexToken(matchGroup, !0), isvalid && (matchToken.repeaterPart = regexPart), 
                                        regexPart = regexPartBak + matchToken.quantifier.max;
                                    } else {
                                        for (var i = 0, qm = matchToken.quantifier.max - 1; qm > i && !(isvalid = validateRegexToken(matchGroup, !0)); i++) ;
                                        regexPart = regexPartBak + "{" + matchToken.quantifier.min + "," + matchToken.quantifier.max + "}";
                                    }
                                } else if (void 0 !== matchToken.matches) for (var k = 0; k < matchToken.length && !(isvalid = validateRegexToken(matchToken[k], fromGroup)); k++) ; else {
                                    var testExp;
                                    if ("[" == matchToken.charAt(0)) {
                                        testExp = regexPart, testExp += matchToken;
                                        for (var j = 0; openGroupCount > j; j++) testExp += ")";
                                        var exp = new RegExp("^(" + testExp + ")$");
                                        isvalid = exp.test(bufferStr);
                                    } else for (var l = 0, tl = matchToken.length; tl > l; l++) if ("\\" !== matchToken.charAt(l)) {
                                        testExp = regexPart, testExp += matchToken.substr(0, l + 1), testExp = testExp.replace(/\|$/, "");
                                        for (var j = 0; openGroupCount > j; j++) testExp += ")";
                                        var exp = new RegExp("^(" + testExp + ")$");
                                        if (isvalid = exp.test(bufferStr)) break;
                                    }
                                    regexPart += matchToken;
                                }
                                if (isvalid) break;
                            }
                            return fromGroup && (regexPart += ")", openGroupCount--), isvalid;
                        }
                        var bufferStr, groupToken, cbuffer = maskset.buffer.slice(), regexPart = "", isValid = !1, openGroupCount = 0;
                        null === opts.regexTokens && analyseRegex(), cbuffer.splice(pos, 0, chrs), bufferStr = cbuffer.join("");
                        for (var i = 0; i < opts.regexTokens.length; i++) {
                            var regexToken = opts.regexTokens[i];
                            if (isValid = validateRegexToken(regexToken, regexToken.isGroup)) break;
                        }
                        return isValid;
                    },
                    cardinality: 1
                }
            }
        }
    }), Inputmask;
}(jQuery, Inputmask);
/*!
 * @fileOverview TouchSwipe - jQuery Plugin
 * @version 1.6.18
 *
 * @author Matt Bryson http://www.github.com/mattbryson
 * @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
 * @see http://labs.rampinteractive.co.uk/touchSwipe/
 * @see http://plugins.jquery.com/project/touchSwipe
 * @license
 * Copyright (c) 2010-2015 Matt Bryson
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */

!(function (factory) {
	"function" == typeof define && define.amd && define.amd.jQuery
		? define(["jquery"], factory)
		: factory(
				"undefined" != typeof module && module.exports
					? require("jquery")
					: jQuery
		  );
})(function ($) {
	"use strict";
	function init(options) {
		return (
			!options ||
				void 0 !== options.allowPageScroll ||
				(void 0 === options.swipe && void 0 === options.swipeStatus) ||
				(options.allowPageScroll = NONE),
			void 0 !== options.click &&
				void 0 === options.tap &&
				(options.tap = options.click),
			options || (options = {}),
			(options = $.extend({}, $.fn.swipe.defaults, options)),
			this.each(function () {
				var $this = $(this),
					plugin = $this.data(PLUGIN_NS);
				plugin ||
					((plugin = new TouchSwipe(this, options)),
					$this.data(PLUGIN_NS, plugin));
			})
		);
	}
	function TouchSwipe(element, options) {
		function touchStart(jqEvent) {
			if (
				!(
					getTouchInProgress() ||
					$(jqEvent.target).closest(
						options.excludedElements,
						$element
					).length > 0
				)
			) {
				var event = jqEvent.originalEvent
					? jqEvent.originalEvent
					: jqEvent;
				if (
					!event.pointerType ||
					"mouse" != event.pointerType ||
					0 != options.fallbackToMouseEvents
				) {
					var ret,
						touches = event.touches,
						evt = touches ? touches[0] : event;
					return (
						(phase = PHASE_START),
						touches
							? (fingerCount = touches.length)
							: options.preventDefaultEvents !== !1 &&
							  jqEvent.preventDefault(),
						(distance = 0),
						(direction = null),
						(currentDirection = null),
						(pinchDirection = null),
						(duration = 0),
						(startTouchesDistance = 0),
						(endTouchesDistance = 0),
						(pinchZoom = 1),
						(pinchDistance = 0),
						(maximumsMap = createMaximumsData()),
						cancelMultiFingerRelease(),
						createFingerData(0, evt),
						!touches ||
						fingerCount === options.fingers ||
						options.fingers === ALL_FINGERS ||
						hasPinches()
							? ((startTime = getTimeStamp()),
							  2 == fingerCount &&
									(createFingerData(1, touches[1]),
									(startTouchesDistance = endTouchesDistance =
										calculateTouchesDistance(
											fingerData[0].start,
											fingerData[1].start
										))),
							  (options.swipeStatus || options.pinchStatus) &&
									(ret = triggerHandler(event, phase)))
							: (ret = !1),
						ret === !1
							? ((phase = PHASE_CANCEL),
							  triggerHandler(event, phase),
							  ret)
							: (options.hold &&
									(holdTimeout = setTimeout(
										$.proxy(function () {
											$element.trigger("hold", [
												event.target,
											]),
												options.hold &&
													(ret = options.hold.call(
														$element,
														event,
														event.target
													));
										}, this),
										options.longTapThreshold
									)),
							  setTouchInProgress(!0),
							  null)
					);
				}
			}
		}
		function touchMove(jqEvent) {
			var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;
			if (
				phase !== PHASE_END &&
				phase !== PHASE_CANCEL &&
				!inMultiFingerRelease()
			) {
				var ret,
					touches = event.touches,
					evt = touches ? touches[0] : event,
					currentFinger = updateFingerData(evt);
				if (
					((endTime = getTimeStamp()),
					touches && (fingerCount = touches.length),
					options.hold && clearTimeout(holdTimeout),
					(phase = PHASE_MOVE),
					2 == fingerCount &&
						(0 == startTouchesDistance
							? (createFingerData(1, touches[1]),
							  (startTouchesDistance = endTouchesDistance =
									calculateTouchesDistance(
										fingerData[0].start,
										fingerData[1].start
									)))
							: (updateFingerData(touches[1]),
							  (endTouchesDistance = calculateTouchesDistance(
									fingerData[0].end,
									fingerData[1].end
							  )),
							  (pinchDirection = calculatePinchDirection(
									fingerData[0].end,
									fingerData[1].end
							  ))),
						(pinchZoom = calculatePinchZoom(
							startTouchesDistance,
							endTouchesDistance
						)),
						(pinchDistance = Math.abs(
							startTouchesDistance - endTouchesDistance
						))),
					fingerCount === options.fingers ||
						options.fingers === ALL_FINGERS ||
						!touches ||
						hasPinches())
				) {
					if (
						((direction = calculateDirection(
							currentFinger.start,
							currentFinger.end
						)),
						(currentDirection = calculateDirection(
							currentFinger.last,
							currentFinger.end
						)),
						validateDefaultEvent(jqEvent, currentDirection),
						(distance = calculateDistance(
							currentFinger.start,
							currentFinger.end
						)),
						(duration = calculateDuration()),
						setMaxDistance(direction, distance),
						(ret = triggerHandler(event, phase)),
						!options.triggerOnTouchEnd ||
							options.triggerOnTouchLeave)
					) {
						var inBounds = !0;
						if (options.triggerOnTouchLeave) {
							var bounds = getbounds(this);
							inBounds = isInBounds(currentFinger.end, bounds);
						}
						!options.triggerOnTouchEnd && inBounds
							? (phase = getNextPhase(PHASE_MOVE))
							: options.triggerOnTouchLeave &&
							  !inBounds &&
							  (phase = getNextPhase(PHASE_END)),
							(phase != PHASE_CANCEL && phase != PHASE_END) ||
								triggerHandler(event, phase);
					}
				} else (phase = PHASE_CANCEL), triggerHandler(event, phase);
				ret === !1 &&
					((phase = PHASE_CANCEL), triggerHandler(event, phase));
			}
		}
		function touchEnd(jqEvent) {
			var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent,
				touches = event.touches;
			if (touches) {
				if (touches.length && !inMultiFingerRelease())
					return startMultiFingerRelease(event), !0;
				if (touches.length && inMultiFingerRelease()) return !0;
			}
			return (
				inMultiFingerRelease() && (fingerCount = fingerCountAtRelease),
				(endTime = getTimeStamp()),
				(duration = calculateDuration()),
				didSwipeBackToCancel() || !validateSwipeDistance()
					? ((phase = PHASE_CANCEL), triggerHandler(event, phase))
					: options.triggerOnTouchEnd ||
					  (options.triggerOnTouchEnd === !1 && phase === PHASE_MOVE)
					? (options.preventDefaultEvents !== !1 &&
							jqEvent.preventDefault(),
					  (phase = PHASE_END),
					  triggerHandler(event, phase))
					: !options.triggerOnTouchEnd && hasTap()
					? ((phase = PHASE_END),
					  triggerHandlerForGesture(event, phase, TAP))
					: phase === PHASE_MOVE &&
					  ((phase = PHASE_CANCEL), triggerHandler(event, phase)),
				setTouchInProgress(!1),
				null
			);
		}
		function touchCancel() {
			(fingerCount = 0),
				(endTime = 0),
				(startTime = 0),
				(startTouchesDistance = 0),
				(endTouchesDistance = 0),
				(pinchZoom = 1),
				cancelMultiFingerRelease(),
				setTouchInProgress(!1);
		}
		function touchLeave(jqEvent) {
			var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;
			options.triggerOnTouchLeave &&
				((phase = getNextPhase(PHASE_END)),
				triggerHandler(event, phase));
		}
		function removeListeners() {
			$element.unbind(START_EV, touchStart),
				$element.unbind(CANCEL_EV, touchCancel),
				$element.unbind(MOVE_EV, touchMove),
				$element.unbind(END_EV, touchEnd),
				LEAVE_EV && $element.unbind(LEAVE_EV, touchLeave),
				setTouchInProgress(!1);
		}
		function getNextPhase(currentPhase) {
			var nextPhase = currentPhase,
				validTime = validateSwipeTime(),
				validDistance = validateSwipeDistance(),
				didCancel = didSwipeBackToCancel();
			return (
				!validTime || didCancel
					? (nextPhase = PHASE_CANCEL)
					: !validDistance ||
					  currentPhase != PHASE_MOVE ||
					  (options.triggerOnTouchEnd &&
							!options.triggerOnTouchLeave)
					? !validDistance &&
					  currentPhase == PHASE_END &&
					  options.triggerOnTouchLeave &&
					  (nextPhase = PHASE_CANCEL)
					: (nextPhase = PHASE_END),
				nextPhase
			);
		}
		function triggerHandler(event, phase) {
			var ret,
				touches = event.touches;
			return (
				(didSwipe() || hasSwipes()) &&
					(ret = triggerHandlerForGesture(event, phase, SWIPE)),
				(didPinch() || hasPinches()) &&
					ret !== !1 &&
					(ret = triggerHandlerForGesture(event, phase, PINCH)),
				didDoubleTap() && ret !== !1
					? (ret = triggerHandlerForGesture(event, phase, DOUBLE_TAP))
					: didLongTap() && ret !== !1
					? (ret = triggerHandlerForGesture(event, phase, LONG_TAP))
					: didTap() &&
					  ret !== !1 &&
					  (ret = triggerHandlerForGesture(event, phase, TAP)),
				phase === PHASE_CANCEL && touchCancel(event),
				phase === PHASE_END &&
					(touches
						? touches.length || touchCancel(event)
						: touchCancel(event)),
				ret
			);
		}
		function triggerHandlerForGesture(event, phase, gesture) {
			var ret;
			if (gesture == SWIPE) {
				if (
					($element.trigger("swipeStatus", [
						phase,
						direction || null,
						distance || 0,
						duration || 0,
						fingerCount,
						fingerData,
						currentDirection,
					]),
					options.swipeStatus &&
						((ret = options.swipeStatus.call(
							$element,
							event,
							phase,
							direction || null,
							distance || 0,
							duration || 0,
							fingerCount,
							fingerData,
							currentDirection
						)),
						ret === !1))
				)
					return !1;
				if (phase == PHASE_END && validateSwipe()) {
					if (
						(clearTimeout(singleTapTimeout),
						clearTimeout(holdTimeout),
						$element.trigger("swipe", [
							direction,
							distance,
							duration,
							fingerCount,
							fingerData,
							currentDirection,
						]),
						options.swipe &&
							((ret = options.swipe.call(
								$element,
								event,
								direction,
								distance,
								duration,
								fingerCount,
								fingerData,
								currentDirection
							)),
							ret === !1))
					)
						return !1;
					switch (direction) {
						case LEFT:
							$element.trigger("swipeLeft", [
								direction,
								distance,
								duration,
								fingerCount,
								fingerData,
								currentDirection,
							]),
								options.swipeLeft &&
									(ret = options.swipeLeft.call(
										$element,
										event,
										direction,
										distance,
										duration,
										fingerCount,
										fingerData,
										currentDirection
									));
							break;
						case RIGHT:
							$element.trigger("swipeRight", [
								direction,
								distance,
								duration,
								fingerCount,
								fingerData,
								currentDirection,
							]),
								options.swipeRight &&
									(ret = options.swipeRight.call(
										$element,
										event,
										direction,
										distance,
										duration,
										fingerCount,
										fingerData,
										currentDirection
									));
							break;
						case UP:
							$element.trigger("swipeUp", [
								direction,
								distance,
								duration,
								fingerCount,
								fingerData,
								currentDirection,
							]),
								options.swipeUp &&
									(ret = options.swipeUp.call(
										$element,
										event,
										direction,
										distance,
										duration,
										fingerCount,
										fingerData,
										currentDirection
									));
							break;
						case DOWN:
							$element.trigger("swipeDown", [
								direction,
								distance,
								duration,
								fingerCount,
								fingerData,
								currentDirection,
							]),
								options.swipeDown &&
									(ret = options.swipeDown.call(
										$element,
										event,
										direction,
										distance,
										duration,
										fingerCount,
										fingerData,
										currentDirection
									));
					}
				}
			}
			if (gesture == PINCH) {
				if (
					($element.trigger("pinchStatus", [
						phase,
						pinchDirection || null,
						pinchDistance || 0,
						duration || 0,
						fingerCount,
						pinchZoom,
						fingerData,
					]),
					options.pinchStatus &&
						((ret = options.pinchStatus.call(
							$element,
							event,
							phase,
							pinchDirection || null,
							pinchDistance || 0,
							duration || 0,
							fingerCount,
							pinchZoom,
							fingerData
						)),
						ret === !1))
				)
					return !1;
				if (phase == PHASE_END && validatePinch())
					switch (pinchDirection) {
						case IN:
							$element.trigger("pinchIn", [
								pinchDirection || null,
								pinchDistance || 0,
								duration || 0,
								fingerCount,
								pinchZoom,
								fingerData,
							]),
								options.pinchIn &&
									(ret = options.pinchIn.call(
										$element,
										event,
										pinchDirection || null,
										pinchDistance || 0,
										duration || 0,
										fingerCount,
										pinchZoom,
										fingerData
									));
							break;
						case OUT:
							$element.trigger("pinchOut", [
								pinchDirection || null,
								pinchDistance || 0,
								duration || 0,
								fingerCount,
								pinchZoom,
								fingerData,
							]),
								options.pinchOut &&
									(ret = options.pinchOut.call(
										$element,
										event,
										pinchDirection || null,
										pinchDistance || 0,
										duration || 0,
										fingerCount,
										pinchZoom,
										fingerData
									));
					}
			}
			return (
				gesture == TAP
					? (phase !== PHASE_CANCEL && phase !== PHASE_END) ||
					  (clearTimeout(singleTapTimeout),
					  clearTimeout(holdTimeout),
					  hasDoubleTap() && !inDoubleTap()
							? ((doubleTapStartTime = getTimeStamp()),
							  (singleTapTimeout = setTimeout(
									$.proxy(function () {
										(doubleTapStartTime = null),
											$element.trigger("tap", [
												event.target,
											]),
											options.tap &&
												(ret = options.tap.call(
													$element,
													event,
													event.target
												));
									}, this),
									options.doubleTapThreshold
							  )))
							: ((doubleTapStartTime = null),
							  $element.trigger("tap", [event.target]),
							  options.tap &&
									(ret = options.tap.call(
										$element,
										event,
										event.target
									))))
					: gesture == DOUBLE_TAP
					? (phase !== PHASE_CANCEL && phase !== PHASE_END) ||
					  (clearTimeout(singleTapTimeout),
					  clearTimeout(holdTimeout),
					  (doubleTapStartTime = null),
					  $element.trigger("doubletap", [event.target]),
					  options.doubleTap &&
							(ret = options.doubleTap.call(
								$element,
								event,
								event.target
							)))
					: gesture == LONG_TAP &&
					  ((phase !== PHASE_CANCEL && phase !== PHASE_END) ||
							(clearTimeout(singleTapTimeout),
							(doubleTapStartTime = null),
							$element.trigger("longtap", [event.target]),
							options.longTap &&
								(ret = options.longTap.call(
									$element,
									event,
									event.target
								)))),
				ret
			);
		}
		function validateSwipeDistance() {
			var valid = !0;
			return (
				null !== options.threshold &&
					(valid = distance >= options.threshold),
				valid
			);
		}
		function didSwipeBackToCancel() {
			var cancelled = !1;
			return (
				null !== options.cancelThreshold &&
					null !== direction &&
					(cancelled =
						getMaxDistance(direction) - distance >=
						options.cancelThreshold),
				cancelled
			);
		}
		function validatePinchDistance() {
			return (
				null === options.pinchThreshold ||
				pinchDistance >= options.pinchThreshold
			);
		}
		function validateSwipeTime() {
			var result;
			return (result =
				!options.maxTimeThreshold ||
				!(duration >= options.maxTimeThreshold));
		}
		function validateDefaultEvent(jqEvent, direction) {
			if (options.preventDefaultEvents !== !1)
				if (options.allowPageScroll === NONE) jqEvent.preventDefault();
				else {
					var auto = options.allowPageScroll === AUTO;
					switch (direction) {
						case LEFT:
							((options.swipeLeft && auto) ||
								(!auto &&
									options.allowPageScroll != HORIZONTAL)) &&
								jqEvent.preventDefault();
							break;
						case RIGHT:
							((options.swipeRight && auto) ||
								(!auto &&
									options.allowPageScroll != HORIZONTAL)) &&
								jqEvent.preventDefault();
							break;
						case UP:
							((options.swipeUp && auto) ||
								(!auto &&
									options.allowPageScroll != VERTICAL)) &&
								jqEvent.preventDefault();
							break;
						case DOWN:
							((options.swipeDown && auto) ||
								(!auto &&
									options.allowPageScroll != VERTICAL)) &&
								jqEvent.preventDefault();
							break;
						case NONE:
					}
				}
		}
		function validatePinch() {
			var hasCorrectFingerCount = validateFingers(),
				hasEndPoint = validateEndPoint(),
				hasCorrectDistance = validatePinchDistance();
			return hasCorrectFingerCount && hasEndPoint && hasCorrectDistance;
		}
		function hasPinches() {
			return !!(
				options.pinchStatus ||
				options.pinchIn ||
				options.pinchOut
			);
		}
		function didPinch() {
			return !(!validatePinch() || !hasPinches());
		}
		function validateSwipe() {
			var hasValidTime = validateSwipeTime(),
				hasValidDistance = validateSwipeDistance(),
				hasCorrectFingerCount = validateFingers(),
				hasEndPoint = validateEndPoint(),
				didCancel = didSwipeBackToCancel(),
				valid =
					!didCancel &&
					hasEndPoint &&
					hasCorrectFingerCount &&
					hasValidDistance &&
					hasValidTime;
			return valid;
		}
		function hasSwipes() {
			return !!(
				options.swipe ||
				options.swipeStatus ||
				options.swipeLeft ||
				options.swipeRight ||
				options.swipeUp ||
				options.swipeDown
			);
		}
		function didSwipe() {
			return !(!validateSwipe() || !hasSwipes());
		}
		function validateFingers() {
			return (
				fingerCount === options.fingers ||
				options.fingers === ALL_FINGERS ||
				!SUPPORTS_TOUCH
			);
		}
		function validateEndPoint() {
			return 0 !== fingerData[0].end.x;
		}
		function hasTap() {
			return !!options.tap;
		}
		function hasDoubleTap() {
			return !!options.doubleTap;
		}
		function hasLongTap() {
			return !!options.longTap;
		}
		function validateDoubleTap() {
			if (null == doubleTapStartTime) return !1;
			var now = getTimeStamp();
			return (
				hasDoubleTap() &&
				now - doubleTapStartTime <= options.doubleTapThreshold
			);
		}
		function inDoubleTap() {
			return validateDoubleTap();
		}
		function validateTap() {
			return (
				(1 === fingerCount || !SUPPORTS_TOUCH) &&
				(isNaN(distance) || distance < options.threshold)
			);
		}
		function validateLongTap() {
			return (
				duration > options.longTapThreshold &&
				distance < DOUBLE_TAP_THRESHOLD
			);
		}
		function didTap() {
			return !(!validateTap() || !hasTap());
		}
		function didDoubleTap() {
			return !(!validateDoubleTap() || !hasDoubleTap());
		}
		function didLongTap() {
			return !(!validateLongTap() || !hasLongTap());
		}
		function startMultiFingerRelease(event) {
			(previousTouchEndTime = getTimeStamp()),
				(fingerCountAtRelease = event.touches.length + 1);
		}
		function cancelMultiFingerRelease() {
			(previousTouchEndTime = 0), (fingerCountAtRelease = 0);
		}
		function inMultiFingerRelease() {
			var withinThreshold = !1;
			if (previousTouchEndTime) {
				var diff = getTimeStamp() - previousTouchEndTime;
				diff <= options.fingerReleaseThreshold &&
					(withinThreshold = !0);
			}
			return withinThreshold;
		}
		function getTouchInProgress() {
			return !($element.data(PLUGIN_NS + "_intouch") !== !0);
		}
		function setTouchInProgress(val) {
			$element &&
				(val === !0
					? ($element.bind(MOVE_EV, touchMove),
					  $element.bind(END_EV, touchEnd),
					  LEAVE_EV && $element.bind(LEAVE_EV, touchLeave))
					: ($element.unbind(MOVE_EV, touchMove, !1),
					  $element.unbind(END_EV, touchEnd, !1),
					  LEAVE_EV && $element.unbind(LEAVE_EV, touchLeave, !1)),
				$element.data(PLUGIN_NS + "_intouch", val === !0));
		}
		function createFingerData(id, evt) {
			var f = {
				start: { x: 0, y: 0 },
				last: { x: 0, y: 0 },
				end: { x: 0, y: 0 },
			};
			return (
				(f.start.x = f.last.x = f.end.x = evt.pageX || evt.clientX),
				(f.start.y = f.last.y = f.end.y = evt.pageY || evt.clientY),
				(fingerData[id] = f),
				f
			);
		}
		function updateFingerData(evt) {
			var id = void 0 !== evt.identifier ? evt.identifier : 0,
				f = getFingerData(id);
			return (
				null === f && (f = createFingerData(id, evt)),
				(f.last.x = f.end.x),
				(f.last.y = f.end.y),
				(f.end.x = evt.pageX || evt.clientX),
				(f.end.y = evt.pageY || evt.clientY),
				f
			);
		}
		function getFingerData(id) {
			return fingerData[id] || null;
		}
		function setMaxDistance(direction, distance) {
			direction != NONE &&
				((distance = Math.max(distance, getMaxDistance(direction))),
				(maximumsMap[direction].distance = distance));
		}
		function getMaxDistance(direction) {
			if (maximumsMap[direction]) return maximumsMap[direction].distance;
		}
		function createMaximumsData() {
			var maxData = {};
			return (
				(maxData[LEFT] = createMaximumVO(LEFT)),
				(maxData[RIGHT] = createMaximumVO(RIGHT)),
				(maxData[UP] = createMaximumVO(UP)),
				(maxData[DOWN] = createMaximumVO(DOWN)),
				maxData
			);
		}
		function createMaximumVO(dir) {
			return { direction: dir, distance: 0 };
		}
		function calculateDuration() {
			return endTime - startTime;
		}
		function calculateTouchesDistance(startPoint, endPoint) {
			var diffX = Math.abs(startPoint.x - endPoint.x),
				diffY = Math.abs(startPoint.y - endPoint.y);
			return Math.round(Math.sqrt(diffX * diffX + diffY * diffY));
		}
		function calculatePinchZoom(startDistance, endDistance) {
			var percent = (endDistance / startDistance) * 1;
			return percent.toFixed(2);
		}
		function calculatePinchDirection() {
			return pinchZoom < 1 ? OUT : IN;
		}
		function calculateDistance(startPoint, endPoint) {
			return Math.round(
				Math.sqrt(
					Math.pow(endPoint.x - startPoint.x, 2) +
						Math.pow(endPoint.y - startPoint.y, 2)
				)
			);
		}
		function calculateAngle(startPoint, endPoint) {
			var x = startPoint.x - endPoint.x,
				y = endPoint.y - startPoint.y,
				r = Math.atan2(y, x),
				angle = Math.round((180 * r) / Math.PI);
			return angle < 0 && (angle = 360 - Math.abs(angle)), angle;
		}
		function calculateDirection(startPoint, endPoint) {
			if (comparePoints(startPoint, endPoint)) return NONE;
			var angle = calculateAngle(startPoint, endPoint);
			return angle <= 45 && angle >= 0
				? LEFT
				: angle <= 360 && angle >= 315
				? LEFT
				: angle >= 135 && angle <= 225
				? RIGHT
				: angle > 45 && angle < 135
				? DOWN
				: UP;
		}
		function getTimeStamp() {
			var now = new Date();
			return now.getTime();
		}
		function getbounds(el) {
			el = $(el);
			var offset = el.offset(),
				bounds = {
					left: offset.left,
					right: offset.left + el.outerWidth(),
					top: offset.top,
					bottom: offset.top + el.outerHeight(),
				};
			return bounds;
		}
		function isInBounds(point, bounds) {
			return (
				point.x > bounds.left &&
				point.x < bounds.right &&
				point.y > bounds.top &&
				point.y < bounds.bottom
			);
		}
		function comparePoints(pointA, pointB) {
			return pointA.x == pointB.x && pointA.y == pointB.y;
		}
		var options = $.extend({}, options),
			useTouchEvents =
				SUPPORTS_TOUCH ||
				SUPPORTS_POINTER ||
				!options.fallbackToMouseEvents,
			START_EV = useTouchEvents
				? SUPPORTS_POINTER
					? SUPPORTS_POINTER_IE10
						? "MSPointerDown"
						: "pointerdown"
					: "touchstart"
				: "mousedown",
			MOVE_EV = useTouchEvents
				? SUPPORTS_POINTER
					? SUPPORTS_POINTER_IE10
						? "MSPointerMove"
						: "pointermove"
					: "touchmove"
				: "mousemove",
			END_EV = useTouchEvents
				? SUPPORTS_POINTER
					? SUPPORTS_POINTER_IE10
						? "MSPointerUp"
						: "pointerup"
					: "touchend"
				: "mouseup",
			LEAVE_EV = useTouchEvents
				? SUPPORTS_POINTER
					? "mouseleave"
					: null
				: "mouseleave",
			CANCEL_EV = SUPPORTS_POINTER
				? SUPPORTS_POINTER_IE10
					? "MSPointerCancel"
					: "pointercancel"
				: "touchcancel",
			distance = 0,
			direction = null,
			currentDirection = null,
			duration = 0,
			startTouchesDistance = 0,
			endTouchesDistance = 0,
			pinchZoom = 1,
			pinchDistance = 0,
			pinchDirection = 0,
			maximumsMap = null,
			$element = $(element),
			phase = "start",
			fingerCount = 0,
			fingerData = {},
			startTime = 0,
			endTime = 0,
			previousTouchEndTime = 0,
			fingerCountAtRelease = 0,
			doubleTapStartTime = 0,
			singleTapTimeout = null,
			holdTimeout = null;
		try {
			$element.bind(START_EV, touchStart),
				$element.bind(CANCEL_EV, touchCancel);
		} catch (e) {
			$.error(
				"events not supported " +
					START_EV +
					"," +
					CANCEL_EV +
					" on jQuery.swipe"
			);
		}
		(this.enable = function () {
			return (
				this.disable(),
				$element.bind(START_EV, touchStart),
				$element.bind(CANCEL_EV, touchCancel),
				$element
			);
		}),
			(this.disable = function () {
				return removeListeners(), $element;
			}),
			(this.destroy = function () {
				removeListeners(),
					$element.data(PLUGIN_NS, null),
					($element = null);
			}),
			(this.option = function (property, value) {
				if ("object" == typeof property)
					options = $.extend(options, property);
				else if (void 0 !== options[property]) {
					if (void 0 === value) return options[property];
					options[property] = value;
				} else {
					if (!property) return options;
					$.error(
						"Option " +
							property +
							" does not exist on jQuery.swipe.options"
					);
				}
				return null;
			});
	}
	var VERSION = "1.6.18",
		LEFT = "left",
		RIGHT = "right",
		UP = "up",
		DOWN = "down",
		IN = "in",
		OUT = "out",
		NONE = "none",
		AUTO = "auto",
		SWIPE = "swipe",
		PINCH = "pinch",
		TAP = "tap",
		DOUBLE_TAP = "doubletap",
		LONG_TAP = "longtap",
		HORIZONTAL = "horizontal",
		VERTICAL = "vertical",
		ALL_FINGERS = "all",
		DOUBLE_TAP_THRESHOLD = 10,
		PHASE_START = "start",
		PHASE_MOVE = "move",
		PHASE_END = "end",
		PHASE_CANCEL = "cancel",
		SUPPORTS_TOUCH = "ontouchstart" in window,
		SUPPORTS_POINTER_IE10 =
			window.navigator.msPointerEnabled &&
			!window.PointerEvent &&
			!SUPPORTS_TOUCH,
		SUPPORTS_POINTER =
			(window.PointerEvent || window.navigator.msPointerEnabled) &&
			!SUPPORTS_TOUCH,
		PLUGIN_NS = "TouchSwipe",
		defaults = {
			fingers: 1,
			threshold: 75,
			cancelThreshold: null,
			pinchThreshold: 20,
			maxTimeThreshold: null,
			fingerReleaseThreshold: 250,
			longTapThreshold: 500,
			doubleTapThreshold: 200,
			swipe: null,
			swipeLeft: null,
			swipeRight: null,
			swipeUp: null,
			swipeDown: null,
			swipeStatus: null,
			pinchIn: null,
			pinchOut: null,
			pinchStatus: null,
			click: null,
			tap: null,
			doubleTap: null,
			longTap: null,
			hold: null,
			triggerOnTouchEnd: !0,
			triggerOnTouchLeave: !1,
			allowPageScroll: "auto",
			fallbackToMouseEvents: !0,
			excludedElements: ".noSwipe",
			preventDefaultEvents: !0,
		};
	($.fn.swipe = function (method) {
		var $this = $(this),
			plugin = $this.data(PLUGIN_NS);
		if (plugin && "string" == typeof method) {
			if (plugin[method])
				return plugin[method].apply(
					plugin,
					Array.prototype.slice.call(arguments, 1)
				);
			$.error("Method " + method + " does not exist on jQuery.swipe");
		} else if (plugin && "object" == typeof method)
			plugin.option.apply(plugin, arguments);
		else if (!(plugin || ("object" != typeof method && method)))
			return init.apply(this, arguments);
		return $this;
	}),
		($.fn.swipe.version = VERSION),
		($.fn.swipe.defaults = defaults),
		($.fn.swipe.phases = {
			PHASE_START: PHASE_START,
			PHASE_MOVE: PHASE_MOVE,
			PHASE_END: PHASE_END,
			PHASE_CANCEL: PHASE_CANCEL,
		}),
		($.fn.swipe.directions = {
			LEFT: LEFT,
			RIGHT: RIGHT,
			UP: UP,
			DOWN: DOWN,
			IN: IN,
			OUT: OUT,
		}),
		($.fn.swipe.pageScroll = {
			NONE: NONE,
			HORIZONTAL: HORIZONTAL,
			VERTICAL: VERTICAL,
			AUTO: AUTO,
		}),
		($.fn.swipe.fingers = {
			ONE: 1,
			TWO: 2,
			THREE: 3,
			FOUR: 4,
			FIVE: 5,
			ALL: ALL_FINGERS,
		});
});
