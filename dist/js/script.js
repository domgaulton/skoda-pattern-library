if(($("[data-bg-image]").length||$("[data-bg-image-dark]").length)&&($("[data-bg-image]").each(function(){var e=$(this).attr("data-bg-image");$(this).css("background-image","url("+e+")")}),$("[data-bg-image-dark]").each(function(){var e=$(this).attr("data-bg-image-dark");$(this).css("background-image","linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url("+e+")")})),$(document).ready(function(){if($(".humanise-slider__list--one-item").length)for(var e=document.querySelectorAll(".humanise-slider__list--one-item"),t=0,i=e.length;t<i;t++){var a=e[t];new Flickity(a,{resize:!0,contain:!1,groupCells:1,prevNextButtons:!0,pageDots:!1,wrapAround:!0,draggable:!0,autoPlay:!1,on:{ready:function(){$(".humanise-slider__list--one-item .flickity-button").wrapAll("<div class='flickity-buttons'></div>");var e=$(".humanise-slider__list--one-item .humanise-slide__img").height();$(".humanise-slider__list--one-item .flickity-buttons").height(e),$(window).resize(function(){e=$(".humanise-slider__list--one-item .humanise-slide__img").height(),$(".humanise-slider__list--one-item .flickity-buttons").height(e)})},change:function(){$(".humanise-slider__list--one-item .flickity-button").removeClass("show").addClass("hide")},settle:function(){$(".humanise-slider__list--one-item .flickity-button").removeClass("hide").addClass("show")}}})}}),$("[data-ytID]").length){var tag=document.createElement("script");tag.src="https://www.youtube.com/iframe_api";var firstScriptTag=document.getElementsByTagName("script")[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);var players=[],videoIds=[];function onYouTubeIframeAPIReady(){$("[data-ytID]").each(function(t){videoIds[t]=$(this).attr("id");var e=$("#"+videoIds[t]+"[data-ytID]").attr("data-ytID");players[t]=new YT.Player(videoIds[t],{height:"100%",width:"100%",videoId:e,playerVars:{showinfo:0,controls:0,rel:0,fs:0,modestbranding:1},events:{onReady:function(e){1==$("#"+videoIds[t]).attr("data-video-autoplay")&&(e.target.mute(),e.target.playVideo())},onStateChange:function(e){loopVideo(e,videoIds[t],players[t])}}})})}function loopVideo(e,t,i){var a=$("#"+t).attr("data-video-loop");e.data===YT.PlayerState.ENDED&&1==a&&i.playVideo()}}if($(document).ready(function(){if($(".humanise-slider__list--one-item").length)for(var e=document.querySelectorAll(".humanise-slider__list--one-item"),t=0,i=e.length;t<i;t++){var a=e[t];new Flickity(a,{resize:!0,contain:!1,groupCells:1,prevNextButtons:!0,pageDots:!1,wrapAround:!0,draggable:!0,autoPlay:!1,on:{ready:function(){$(".humanise-slider__list--one-item .flickity-button").wrapAll("<div class='flickity-buttons'></div>");var e=$(".humanise-slider__list--one-item .humanise-slide__img").height();$(".humanise-slider__list--one-item .flickity-buttons").height(e),$(window).resize(function(){e=$(".humanise-slider__list--one-item .humanise-slide__img").height(),$(".humanise-slider__list--one-item .flickity-buttons").height(e)})},change:function(){$(".humanise-slider__list--one-item .flickity-button").removeClass("show").addClass("hide")},settle:function(){$(".humanise-slider__list--one-item .flickity-button").removeClass("hide").addClass("show")}}})}}),$(document).ready(function(){if(0!=$(".humanise-tabs__tab-select--tab").length){var e=$(".humanise-tabs__tab-select--tab").first().position().left;$(".humanise-tabs__tab-select--nav").css("left",e+"px"),$(".humanise-tabs__tab-select--tab").click(function(){$("li[role='tab']").attr("aria-selected","false"),$(this).attr("aria-selected","true");var e=$(this).position().left;$(".humanise-tabs__tab-select--nav").css("left",e+"px");var t=$(this).attr("aria-controls"),i=$("#"+t);$("div[role='tabpanel']").attr("aria-hidden","true"),i.attr("aria-hidden","false")}),$("li[role='tab']").keydown(function(e){13==e.which&&$(this).click()}),$("li[role='tab']").keydown(function(e){if((39==e.which||37==e.which)&&"true"==$(this).attr("aria-selected")){$("li[aria-selected='false']").attr("aria-selected","true").focus(),$(this).attr("aria-selected","false");var t=$("li[aria-selected='true']").attr("aria-controls"),i=$("#"+t);$("div[role='tabpanel']").attr("aria-hidden","true"),i.attr("aria-hidden","false")}})}}),$(".fancybox-thumb").length&&(!function(n,i,L,p){"use strict";var o=L("html"),a=L(n),c=L(i),H=L.fancybox=function(){H.open.apply(this,arguments)},r=navigator.userAgent.match(/msie/i),s=null,d=i.createTouch!==p,u=function(e){return e&&e.hasOwnProperty&&e instanceof L},f=function(e){return e&&"string"===L.type(e)},R=function(e){return f(e)&&0<e.indexOf("%")},j=function(e,t){var i=parseInt(e,10)||0;return t&&R(e)&&(i=H.getViewport()[t]/100*i),Math.ceil(i)},D=function(e,t){return j(e,t)+"px"};L.extend(H,{version:"2.1.7",defaults:{padding:0,margin:0,width:1920,height:1300,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,pixelRatio:1,autoSize:!1,autoHeight:!1,autoWidth:!1,autoResize:!1,autoCenter:!d,fitToView:!0,aspectRatio:!1,topRatio:.5,leftRatio:.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!0,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3e3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancybox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+(r?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>',loading:'<div id="fancybox-loading"><div></div></div>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:L.noop,beforeLoad:L.noop,afterLoad:L.noop,beforeShow:L.noop,afterShow:L.noop,beforeChange:L.noop,beforeClose:L.noop,afterClose:L.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(d,h){if(d&&(L.isPlainObject(h)||(h={}),!1!==H.close(!0)))return L.isArray(d)||(d=u(d)?L(d).get():[d]),L.each(d,function(e,t){var i,a,n,o,r,s,l,c={};"object"===L.type(t)&&(t.nodeType&&(t=L(t)),u(t)?(c={href:t.data("fancybox-href")||t.attr("href"),title:L("<div/>").text(t.data("fancybox-title")||t.attr("title")||"").html(),isDom:!0,element:t},L.metadata&&L.extend(!0,c,t.metadata())):c=t),i=h.href||c.href||(f(t)?t:null),a=h.title!==p?h.title:c.title||"",!(o=(n=h.content||c.content)?"html":h.type||c.type)&&c.isDom&&((o=t.data("fancybox-type"))||(o=(r=t.prop("class").match(/fancybox\.(\w+)/))?r[1]:null)),f(i)&&(o||(H.isImage(i)?o="image":H.isSWF(i)?o="swf":"#"===i.charAt(0)?o="inline":f(t)&&(o="html",n=t)),"ajax"===o&&(i=(s=i.split(/\s+/,2)).shift(),l=s.shift())),n||("inline"===o?i?n=L(f(i)?i.replace(/.*(?=#[^\s]+$)/,""):i):c.isDom&&(n=t):"html"===o?n=i:o||i||!c.isDom||(o="inline",n=t)),L.extend(c,{href:i,type:o,content:n,title:a,selector:l}),d[e]=c}),H.opts=L.extend(!0,{},H.defaults,h),h.keys!==p&&(H.opts.keys=!!h.keys&&L.extend({},H.defaults.keys,h.keys)),H.group=d,H._start(H.opts.index)},cancel:function(){var e=H.coming;e&&!1===H.trigger("onCancel")||(H.hideLoading(),e&&(H.ajaxLoad&&H.ajaxLoad.abort(),H.ajaxLoad=null,H.imgPreload&&(H.imgPreload.onload=H.imgPreload.onerror=null),e.wrap&&e.wrap.stop(!0,!0).trigger("onReset").remove(),H.coming=null,H.current||H._afterZoomOut(e)))},close:function(e){H.cancel(),!1!==H.trigger("beforeClose")&&(H.unbindEvents(),H.isActive&&(H.isOpen&&!0!==e?(H.isOpen=H.isOpened=!1,H.isClosing=!0,L(".fancybox-item, .fancybox-nav").remove(),H.wrap.stop(!0,!0).removeClass("fancybox-opened"),H.transitions[H.current.closeMethod]()):(L(".fancybox-wrap").stop(!0).trigger("onReset").remove(),H._afterZoomOut())))},play:function(e){var t=function(){clearTimeout(H.player.timer)},i=function(){t(),H.current&&H.player.isActive&&(H.player.timer=setTimeout(H.next,H.current.playSpeed))},a=function(){t(),c.unbind(".player"),H.player.isActive=!1,H.trigger("onPlayEnd")};!0===e||!H.player.isActive&&!1!==e?H.current&&(H.current.loop||H.current.index<H.group.length-1)&&(H.player.isActive=!0,c.bind({"onCancel.player beforeClose.player":a,"onUpdate.player":i,"beforeLoad.player":t}),i(),H.trigger("onPlayStart")):a()},next:function(e){var t=H.current;t&&(f(e)||(e=t.direction.next),H.jumpto(t.index+1,e,"next"))},prev:function(e){var t=H.current;t&&(f(e)||(e=t.direction.prev),H.jumpto(t.index-1,e,"prev"))},jumpto:function(e,t,i){var a=H.current;a&&(e=j(e),H.direction=t||a.direction[e>=a.index?"next":"prev"],H.router=i||"jumpto",a.loop&&(e<0&&(e=a.group.length+e%a.group.length),e%=a.group.length),a.group[e]!==p&&(H.cancel(),H._start(e)))},reposition:function(e,t){var i,a=H.current,n=a?a.wrap:null;n&&(i=H._getPosition(t),e&&"scroll"===e.type?(delete i.position,n.stop(!0,!0).animate(i,200)):(n.css(i),a.pos=L.extend({},a.dim,i)))},update:function(t){var i=t&&t.originalEvent&&t.originalEvent.type,a=!i||"orientationchange"===i;a&&(clearTimeout(s),s=null),H.isOpen&&!s&&(s=setTimeout(function(){var e=H.current;e&&!H.isClosing&&(H.wrap.removeClass("fancybox-tmp"),(a||"load"===i||"resize"===i&&e.autoResize)&&H._setDimension(),"scroll"===i&&e.canShrink||H.reposition(t),H.trigger("onUpdate"),s=null)},a&&!d?0:300))},toggle:function(e){H.isOpen&&(H.current.fitToView="boolean"===L.type(e)?e:!H.current.fitToView,d&&(H.wrap.removeAttr("style").addClass("fancybox-tmp"),H.trigger("onUpdate")),H.update())},hideLoading:function(){c.unbind(".loading"),L("#fancybox-loading").remove()},showLoading:function(){var e,t;H.hideLoading(),e=L(H.opts.tpl.loading).click(H.cancel).appendTo("body"),c.bind("keydown.loading",function(e){27===(e.which||e.keyCode)&&(e.preventDefault(),H.cancel())}),H.defaults.fixed||(t=H.getViewport(),e.css({position:"absolute",top:.5*t.h+t.y,left:.5*t.w+t.x})),H.trigger("onLoading")},getViewport:function(){var e=H.current&&H.current.locked||!1,t={x:a.scrollLeft(),y:a.scrollTop()};return e&&e.length?(t.w=e[0].clientWidth,t.h=e[0].clientHeight):(t.w=d&&n.innerWidth?n.innerWidth:a.width(),t.h=d&&n.innerHeight?n.innerHeight:a.height()),t},unbindEvents:function(){H.wrap&&u(H.wrap)&&H.wrap.unbind(".fb"),c.unbind(".fb"),a.unbind(".fb")},bindEvents:function(){var t,l=H.current;l&&(a.bind("orientationchange.fb"+(d?"":" resize.fb")+(l.autoCenter&&!l.locked?" scroll.fb":""),H.update),(t=l.keys)&&c.bind("keydown.fb",function(i){var a=i.which||i.keyCode,e=i.target||i.srcElement;if(27===a&&H.coming)return!1;i.ctrlKey||i.altKey||i.shiftKey||i.metaKey||e&&(e.type||L(e).is("[contenteditable]"))||L.each(t,function(e,t){return 1<l.group.length&&t[a]!==p?(H[e](t[a]),i.preventDefault(),!1):-1<L.inArray(a,t)?(H[e](),i.preventDefault(),!1):void 0})}),L.fn.mousewheel&&l.mouseWheel&&H.wrap.bind("mousewheel.fb",function(e,t,i,a){for(var n,o=e.target||null,r=L(o),s=!1;r.length&&!(s||r.is(".fancybox-skin")||r.is(".fancybox-wrap"));)s=(n=r[0])&&!(n.style.overflow&&"hidden"===n.style.overflow)&&(n.clientWidth&&n.scrollWidth>n.clientWidth||n.clientHeight&&n.scrollHeight>n.clientHeight),r=L(r).parent();0===t||s||1<H.group.length&&!l.canShrink&&(0<a||0<i?H.prev(0<a?"down":"left"):(a<0||i<0)&&H.next(a<0?"up":"right"),e.preventDefault())}))},trigger:function(i,e){var t,a=e||H.coming||H.current;if(a){if(L.isFunction(a[i])&&(t=a[i].apply(a,Array.prototype.slice.call(arguments,1))),!1===t)return!1;a.helpers&&L.each(a.helpers,function(e,t){t&&H.helpers[e]&&L.isFunction(H.helpers[e][i])&&H.helpers[e][i](L.extend(!0,{},H.helpers[e].defaults,t),a)})}c.trigger(i)},isImage:function(e){return f(e)&&e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSWF:function(e){return f(e)&&e.match(/\.(swf)((\?|#).*)?$/i)},_start:function(e){var t,i,a,n,o,r={};if(e=j(e),!(t=H.group[e]||null))return!1;if(n=(r=L.extend(!0,{},H.opts,t)).margin,o=r.padding,"number"===L.type(n)&&(r.margin=[n,n,n,n]),"number"===L.type(o)&&(r.padding=[o,o,o,o]),r.modal&&L.extend(!0,r,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}}),r.autoSize&&(r.autoWidth=r.autoHeight=!0),"auto"===r.width&&(r.autoWidth=!0),"auto"===r.height&&(r.autoHeight=!0),r.group=H.group,r.index=e,H.coming=r,!1!==H.trigger("beforeLoad")){if(a=r.type,i=r.href,!a)return H.coming=null,!(!H.current||!H.router||"jumpto"===H.router)&&(H.current.index=e,H[H.router](H.direction));if(H.isActive=!0,"image"!==a&&"swf"!==a||(r.autoHeight=r.autoWidth=!1,r.scrolling="visible"),"image"===a&&(r.aspectRatio=!0),"iframe"===a&&d&&(r.scrolling="scroll"),r.wrap=L(r.tpl.wrap).addClass("fancybox-"+(d?"mobile":"desktop")+" fancybox-type-"+a+" fancybox-tmp "+r.wrapCSS).appendTo(r.parent||"body"),L.extend(r,{skin:L(".fancybox-skin",r.wrap),outer:L(".fancybox-outer",r.wrap),inner:L(".fancybox-inner",r.wrap)}),L.each(["Top","Right","Bottom","Left"],function(e,t){r.skin.css("padding"+t,D(r.padding[e]))}),H.trigger("onReady"),"inline"===a||"html"===a){if(!r.content||!r.content.length)return H._error("content")}else if(!i)return H._error("href");"image"===a?H._loadImage():"ajax"===a?H._loadAjax():"iframe"===a?H._loadIframe():H._afterLoad()}else H.coming=null},_error:function(e){L.extend(H.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:e,content:H.coming.tpl.error}),H._afterLoad()},_loadImage:function(){var e=H.imgPreload=new Image;e.onload=function(){this.onload=this.onerror=null,H.coming.width=this.width/H.opts.pixelRatio,H.coming.height=this.height/H.opts.pixelRatio,H._afterLoad()},e.onerror=function(){this.onload=this.onerror=null,H._error("image")},e.src=H.coming.href,!0!==e.complete&&H.showLoading()},_loadAjax:function(){var i=H.coming;H.showLoading(),H.ajaxLoad=L.ajax(L.extend({},i.ajax,{url:i.href,error:function(e,t){H.coming&&"abort"!==t?H._error("ajax",e):H.hideLoading()},success:function(e,t){"success"===t&&(i.content=e,H._afterLoad())}}))},_loadIframe:function(){var e=H.coming,t=L(e.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",d?"auto":e.iframe.scrolling).attr("src",e.href);L(e.wrap).bind("onReset",function(){try{L(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(e){}}),e.iframe.preload&&(H.showLoading(),t.one("load",function(){L(this).data("ready",1),d||L(this).bind("load.fb",H.update),L(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(),H._afterLoad()})),e.content=t.appendTo(e.inner),e.iframe.preload||H._afterLoad()},_preloadImages:function(){var e,t,i=H.group,a=H.current,n=i.length,o=a.preload?Math.min(a.preload,n-1):0;for(t=1;t<=o;t+=1)"image"===(e=i[(a.index+t)%n]).type&&e.href&&((new Image).src=e.href)},_afterLoad:function(){var e,i,t,a,n,o,r=H.coming,s=H.current,l="fancybox-placeholder";if(H.hideLoading(),r&&!1!==H.isActive){if(!1===H.trigger("afterLoad",r,s))return r.wrap.stop(!0).trigger("onReset").remove(),void(H.coming=null);switch(s&&(H.trigger("beforeChange",s),s.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()),H.unbindEvents(),i=(e=r).content,t=r.type,a=r.scrolling,L.extend(H,{wrap:e.wrap,skin:e.skin,outer:e.outer,inner:e.inner,current:e,previous:s}),n=e.href,t){case"inline":case"ajax":case"html":e.selector?i=L("<div>").html(i).find(e.selector):u(i)&&(i.data(l)||i.data(l,L('<div class="'+l+'"></div>').insertAfter(i).hide()),i=i.show().detach(),e.wrap.bind("onReset",function(){L(this).find(i).length&&i.hide().replaceAll(i.data(l)).data(l,!1)}));break;case"image":i=e.tpl.image.replace(/\{href\}/g,n);break;case"swf":i='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+n+'"></param>',o="",L.each(e.swf,function(e,t){i+='<param name="'+e+'" value="'+t+'"></param>',o+=" "+e+'="'+t+'"'}),i+='<embed src="'+n+'" type="application/x-shockwave-flash" width="100%" height="100%"'+o+"></embed></object>"}u(i)&&i.parent().is(e.inner)||e.inner.append(i),H.trigger("beforeShow"),e.inner.css("overflow","yes"===a?"scroll":"no"===a?"hidden":a),H._setDimension(),H.reposition(),H.isOpen=!1,H.coming=null,H.bindEvents(),H.isOpened?s.prevMethod&&H.transitions[s.prevMethod]():L(".fancybox-wrap").not(e.wrap).stop(!0).trigger("onReset").remove(),H.transitions[H.isOpened?e.nextMethod:e.openMethod](),H._preloadImages()}},_setDimension:function(){var e,t,i,a,n,o,r,s,l,c,d,h,p,u,f,g,m,y=H.getViewport(),b=0,v=H.wrap,w=H.skin,x=H.inner,_=H.current,k=_.width,$=_.height,C=_.minWidth,S=_.minHeight,T=_.maxWidth,O=_.maxHeight,E=_.scrolling,W=_.scrollOutside?_.scrollbarWidth:0,A=_.margin,P=j(A[1]+A[3]),I=j(A[0]+A[2]);if(v.add(w).add(x).width("auto").height("auto").removeClass("fancybox-tmp"),n=P+(i=j(w.outerWidth(!0)-w.width())),o=I+(a=j(w.outerHeight(!0)-w.height())),r=R(k)?(y.w-n)*j(k)/100:k,s=R($)?(y.h-o)*j($)/100:$,"iframe"===_.type){if(g=_.content,_.autoHeight&&g&&1===g.data("ready"))try{g[0].contentWindow.document.location&&(x.width(r).height(9999),m=g.contents().find("body"),W&&m.css("overflow-x","hidden"),s=m.outerHeight(!0))}catch(e){}}else(_.autoWidth||_.autoHeight)&&(x.addClass("fancybox-tmp"),_.autoWidth||x.width(r),_.autoHeight||x.height(s),_.autoWidth&&(r=x.width()),_.autoHeight&&(s=x.height()),x.removeClass("fancybox-tmp"));if(k=j(r),$=j(s),d=r/s,C=j(R(C)?j(C,"w")-n:C),T=j(R(T)?j(T,"w")-n:T),S=j(R(S)?j(S,"h")-o:S),l=T,c=O=j(R(O)?j(O,"h")-o:O),_.fitToView&&(T=Math.min(y.w-n,T),O=Math.min(y.h-o,O)),u=y.w-P,f=y.h-I,_.aspectRatio?(T<k&&($=j((k=T)/d)),O<$&&(k=j(($=O)*d)),k<C&&($=j((k=C)/d)),$<S&&(k=j(($=S)*d))):(k=Math.max(C,Math.min(k,T)),_.autoHeight&&"iframe"!==_.type&&(x.width(k),$=x.height()),$=Math.max(S,Math.min($,O))),_.fitToView)if(x.width(k).height($),v.width(k+i),h=v.width(),p=v.height(),_.aspectRatio)for(;(u<h||f<p)&&C<k&&S<$&&!(19<b++);)$=Math.max(S,Math.min(O,$-10)),(k=j($*d))<C&&($=j((k=C)/d)),T<k&&($=j((k=T)/d)),x.width(k).height($),v.width(k+i),h=v.width(),p=v.height();else k=Math.max(C,Math.min(k,k-(h-u))),$=Math.max(S,Math.min($,$-(p-f)));W&&"auto"===E&&$<s&&k+i+W<u&&(k+=W),x.width(k).height($),v.width(k+i),h=v.width(),p=v.height(),e=(u<h||f<p)&&C<k&&S<$,t=_.aspectRatio?k<l&&$<c&&k<r&&$<s:(k<l||$<c)&&(k<r||$<s),L.extend(_,{dim:{width:D(h),height:D(p)},origWidth:r,origHeight:s,canShrink:e,canExpand:t,wPadding:i,hPadding:a,wrapSpace:p-w.outerHeight(!0),skinSpace:w.height()-$}),!g&&_.autoHeight&&S<$&&$<O&&!t&&x.height("auto")},_getPosition:function(e){var t=H.current,i=H.getViewport(),a=t.margin,n=H.wrap.width()+a[1]+a[3],o=H.wrap.height()+a[0]+a[2],r={position:"absolute",top:a[0],left:a[3]};return t.autoCenter&&t.fixed&&!e&&o<=i.h&&n<=i.w?r.position="fixed":t.locked||(r.top+=i.y,r.left+=i.x),r.top=D(Math.max(r.top,r.top+(i.h-o)*t.topRatio)),r.left=D(Math.max(r.left,r.left+(i.w-n)*t.leftRatio)),r},_afterZoomIn:function(){var t=H.current;t&&(H.isOpen=H.isOpened=!0,H.wrap.css("overflow","visible").addClass("fancybox-opened").hide().show(0),H.update(),(t.closeClick||t.nextClick&&1<H.group.length)&&H.inner.css("cursor","pointer").bind("click.fb",function(e){L(e.target).is("a")||L(e.target).parent().is("a")||(e.preventDefault(),H[t.closeClick?"close":"next"]())}),t.closeBtn&&L(t.tpl.closeBtn).appendTo(H.skin).bind("click.fb",function(e){e.preventDefault(),H.close()}),t.arrows&&1<H.group.length&&((t.loop||0<t.index)&&L(t.tpl.prev).appendTo(H.outer).bind("click.fb",H.prev),(t.loop||t.index<H.group.length-1)&&L(t.tpl.next).appendTo(H.outer).bind("click.fb",H.next)),H.trigger("afterShow"),t.loop||t.index!==t.group.length-1?H.opts.autoPlay&&!H.player.isActive&&(H.opts.autoPlay=!1,H.play(!0)):H.play(!1))},_afterZoomOut:function(e){e=e||H.current,L(".fancybox-wrap").trigger("onReset").remove(),L.extend(H,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null}),H.trigger("afterClose",e)}}),H.transitions={getOrigPosition:function(){var e=H.current,t=e.element,i=e.orig,a={},n=50,o=50,r=e.hPadding,s=e.wPadding,l=H.getViewport();return!i&&e.isDom&&t.is(":visible")&&((i=t.find("img:first")).length||(i=t)),u(i)?(a=i.offset(),i.is("img")&&(n=i.outerWidth(),o=i.outerHeight())):(a.top=l.y+(l.h-o)*e.topRatio,a.left=l.x+(l.w-n)*e.leftRatio),("fixed"===H.wrap.css("position")||e.locked)&&(a.top-=l.y,a.left-=l.x),a={top:D(a.top-r*e.topRatio),left:D(a.left-s*e.leftRatio),width:D(n+s),height:D(o+r)}},step:function(e,t){var i,a,n=t.prop,o=H.current,r=o.wrapSpace,s=o.skinSpace;"width"!==n&&"height"!==n||(i=t.end===t.start?1:(e-t.start)/(t.end-t.start),H.isClosing&&(i=1-i),a=e-("width"===n?o.wPadding:o.hPadding),H.skin[n](j("width"===n?a:a-r*i)),H.inner[n](j("width"===n?a:a-r*i-s*i)))},zoomIn:function(){var e=H.current,t=e.pos,i=e.openEffect,a="elastic"===i,n=L.extend({opacity:1},t);delete n.position,a?(t=this.getOrigPosition(),e.openOpacity&&(t.opacity=.1)):"fade"===i&&(t.opacity=.1),H.wrap.css(t).animate(n,{duration:"none"===i?0:e.openSpeed,easing:e.openEasing,step:a?this.step:null,complete:H._afterZoomIn})},zoomOut:function(){var e=H.current,t=e.closeEffect,i="elastic"===t,a={opacity:.1};i&&(a=this.getOrigPosition(),e.closeOpacity&&(a.opacity=.1)),H.wrap.animate(a,{duration:"none"===t?0:e.closeSpeed,easing:e.closeEasing,step:i?this.step:null,complete:H._afterZoomOut})},changeIn:function(){var e,t=H.current,i=t.nextEffect,a=t.pos,n={opacity:1},o=H.direction;a.opacity=.1,"elastic"===i&&(e="down"===o||"up"===o?"top":"left","down"===o||"right"===o?(a[e]=D(j(a[e])-200),n[e]="+=200px"):(a[e]=D(j(a[e])+200),n[e]="-=200px")),"none"===i?H._afterZoomIn():H.wrap.css(a).animate(n,{duration:t.nextSpeed,easing:t.nextEasing,complete:H._afterZoomIn})},changeOut:function(){var e=H.previous,t=e.prevEffect,i={opacity:.1},a=H.direction;"elastic"===t&&(i["down"===a||"up"===a?"top":"left"]=("up"===a||"left"===a?"-":"+")+"=200px"),e.wrap.animate(i,{duration:"none"===t?0:e.prevSpeed,easing:e.prevEasing,complete:function(){L(this).trigger("onReset").remove()}})}},H.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!d,fixed:!0},overlay:null,fixed:!1,el:L("html"),create:function(e){var t;e=L.extend({},this.defaults,e),this.overlay&&this.close(),t=H.coming?H.coming.parent:e.parent,this.overlay=L('<div class="fancybox-overlay"></div>').appendTo(t&&t.length?t:"body"),this.fixed=!1,e.fixed&&H.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(e){var t=this;e=L.extend({},this.defaults,e),this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(e),this.fixed||(a.bind("resize.overlay",L.proxy(this.update,this)),this.update()),e.closeClick&&this.overlay.bind("click.overlay",function(e){if(L(e.target).hasClass("fancybox-overlay"))return H.isActive?H.close():t.close(),!1}),this.overlay.css(e.css).show()},close:function(){a.unbind("resize.overlay"),this.el.hasClass("fancybox-lock")&&(L(".fancybox-margin").removeClass("fancybox-margin"),this.el.removeClass("fancybox-lock"),a.scrollTop(this.scrollV).scrollLeft(this.scrollH)),L(".fancybox-overlay").remove().hide(),L.extend(this,{overlay:null,fixed:!1})},update:function(){var e,t="100%";this.overlay.width(t).height("100%"),r?(e=Math.max(i.documentElement.offsetWidth,i.body.offsetWidth),c.width()>e&&(t=c.width())):c.width()>a.width()&&(t=c.width()),this.overlay.width(t).height(c.height())},onReady:function(e,t){var i=this.overlay;L(".fancybox-overlay").stop(!0,!0),i||this.create(e),e.locked&&this.fixed&&t.fixed&&(t.locked=this.overlay.append(t.wrap),t.fixed=!1),!0===e.showEarly&&this.beforeShow.apply(this,arguments)},beforeShow:function(e,t){t.locked&&!this.el.hasClass("fancybox-lock")&&(!1!==this.fixPosition&&L("*:not(object)").filter(function(){return"fixed"===L(this).css("position")&&!L(this).hasClass("fancybox-overlay")&&!L(this).hasClass("fancybox-wrap")}).addClass("fancybox-margin"),this.el.addClass("fancybox-margin"),this.scrollV=a.scrollTop(),this.scrollH=a.scrollLeft(),this.el.addClass("fancybox-lock"),a.scrollTop(this.scrollV).scrollLeft(this.scrollH)),this.open(e)},onUpdate:function(){this.fixed||this.update()},afterClose:function(e){this.overlay&&!H.coming&&this.overlay.fadeOut(e.speedOut,L.proxy(this.close,this))}},H.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(e){var t,i,a=H.current,n=a.title,o=e.type;if(L.isFunction(n)&&(n=n.call(a.element,a)),f(n)&&""!==L.trim(n)){switch(t=L('<div class="fancybox-title fancybox-title-'+o+'-wrap">'+n+"</div>"),o){case"inside":i=H.skin;break;case"outside":i=H.wrap;break;case"over":i=H.inner;break;default:i=H.skin,t.appendTo("body"),r&&t.width(t.width()),t.wrapInner('<span class="child"></span>'),H.current.margin[2]+=Math.abs(j(t.css("margin-bottom")))}t["top"===e.position?"prependTo":"appendTo"](i)}}},L.fn.fancybox=function(o){var r,s=L(this),l=this.selector||"",e=function(e){var t,i,a=L(this).blur(),n=r;e.ctrlKey||e.altKey||e.shiftKey||e.metaKey||a.is(".fancybox-wrap")||(t=o.groupAttr||"data-fancybox-group",(i=a.attr(t))||(t="rel",i=a.get(0)[t]),i&&""!==i&&"nofollow"!==i&&(n=(a=(a=l.length?L(l):s).filter("["+t+'="'+i+'"]')).index(this)),o.index=n,!1!==H.open(a,o)&&e.preventDefault())};return r=(o=o||{}).index||0,l&&!1!==o.live?c.undelegate(l,"click.fb-start").delegate(l+":not('.fancybox-item, .fancybox-nav')","click.fb-start",e):s.unbind("click.fb-start").bind("click.fb-start",e),this.filter("[data-fancybox-start=1]").trigger("click"),this},c.ready(function(){var e,t,i,a;L.scrollbarWidth===p&&(L.scrollbarWidth=function(){var e=L('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),t=e.children(),i=t.innerWidth()-t.height(99).innerWidth();return e.remove(),i}),L.support.fixedPosition===p&&(L.support.fixedPosition=(i=L('<div style="position:fixed;top:20px;"></div>').appendTo("body"),a=20===i[0].offsetTop||15===i[0].offsetTop,i.remove(),a)),L.extend(H.defaults,{scrollbarWidth:L.scrollbarWidth(),fixed:L.support.fixedPosition,parent:L("body")}),e=L(n).width(),o.addClass("fancybox-lock-test"),t=L(n).width(),o.removeClass("fancybox-lock-test"),L("<style type='text/css'>.fancybox-margin{margin-right:"+(t-e)+"px;}</style>").appendTo("head")})}(window,document,jQuery),$(".fancybox-thumb").fancybox({prevEffect:"none",nextEffect:"none"})),$(".humanise-parallax__item").length&&$(window).scroll(function(){if(function(e){if($(".humanise-parallax__item").length){var t=(t=$(window).scrollTop())+1800;return $(e).offset().top<=t}}(".humanise-parallax")){var e=(e=$(window).scrollTop()+$(".humanise-parallax__item").outerHeight()-$(".humanise-parallax").offset().top+200)+200;$(".itemA").css("top",-.3*e+"px"),$(".itemB").css("top",.3*e+"px")}}),$(document).ready(function(){if($(".humanise-quote-slider__list").length)for(var e=document.querySelectorAll(".humanise-quote-slider__list"),t=0,i=e.length;t<i;t++){var a=e[t];new Flickity(a,{resize:!0,contain:!1,prevNextButtons:!1,pageDots:!0,wrapAround:!0,draggable:!0,autoPlay:!1})}}),$(document).ready(function(){if($(".humanise-sidebar-ctas").length){var e=window.location.href;if(-1<e.indexOf("kodiaq"))var t="/en-gb/models/kodiaq/test-drive-offer",i="http://cc-cloud.skoda-auto.com/gbr/gbr/en-gb?carline=67518";else if(-1<e.indexOf("karoq"))t="http://www.skoda.co.uk/tools/book-a-test-drive/?source=karoq",i="http://cc-cloud.skoda-auto.com/gbr/gbr/en-gb?carline=66328";$(".humanise-sidebar-ctas__icon--test-drive").next().attr("href",t),$(".humanise-sidebar-ctas__icon--car-configutator").next().attr("href",i),$(".humanise-sidebar-ctas__icon").mouseenter(function(){$(".humanise-sidebar-ctas__link").addClass("active")}),$(".humanise-sidebar-ctas__icon").click(function(){$(".humanise-sidebar-ctas__link").toggleClass("active")}),$(window).scroll(function(){$(".humanise-sidebar-ctas__link").removeClass("active")})}}),$(".humanise-tabs__tab-select--tab").length){var startLeft=$(".humanise-tabs__tab-select--tab").first().position().left;$(".humanise-tabs__nav-wrapper--nav").css("left",startLeft+"px"),$(".humanise-tabs__tab-select--tab").click(function(){$("li[role='tab']").attr("aria-selected","false"),$(this).attr("aria-selected","true");var e=$(this).position().left;console.log(e),$(".humanise-tabs__nav-wrapper--nav").css("left",e+"px");var t=$(this).attr("aria-controls"),i=$("#"+t);$("div[role='tabpanel']").attr("aria-hidden","true"),i.attr("aria-hidden","false")}),$("li[role='tab']").keydown(function(e){13==e.which&&$(this).click()}),$("li[role='tab']").keydown(function(e){if((39==e.which||37==e.which)&&"true"==$(this).attr("aria-selected")){$("li[aria-selected='false']").attr("aria-selected","true").focus(),$(this).attr("aria-selected","false");var t=$("li[aria-selected='true']").attr("aria-controls"),i=$("#"+t);$("div[role='tabpanel']").attr("aria-hidden","true"),i.attr("aria-hidden","false")}})}