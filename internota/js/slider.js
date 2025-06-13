/**********
sliderFan ver 2.0. powered by Michael Trifanoff
***********
*<div id="slider">
*	<div class="%pic%">
*		<img src="slider/picture_36.jpg" alt=" " />
*		<span class="%pic%_numb">239</span>
*		<span class="%pic%_name">Picture name</span>
*		<span class="%pic%_desc">Picture description</span>
*	</div>
*	<div class="%pic%" />
*	<div class="%pic%" />
*</div>
**********/

(function( $ ){
var slider = {
	index: 1,
	init : function(options){
		var defaults = {
			num: 1, //start number for slides
			start: 1,
			autoplay: true,
			interval: 4000,
			pause: 8000,
			slideCls: 'pic',
			infoboxCls: 'pic_info',
			actCls: 'active',
			navId: 'navigation', // + index
			navCls: 'navigation',
			naviCls: 'item',
			arrowsCls: 'positions',
			prevTxt: '&laquo;',
			nextTxt: '&raquo;',
			intro: true,
			nav: true, //navigation on/off
			arrows: true, //arrows on/off
			navCall: false, //callback for nav items
			startCall: false, //callback on slider start
			infoCall: false, //callback for info generate
			actionCall: false //callback on slide changes
		}
		
		var initial = this.each(function(){
			var o = $.extend(defaults, options, {}),
				pic_cls = '.' + o.slideCls,
				text_cls = '.' + o.infoboxCls,
				start = o.start - 1,
				elem = $(this),
				num = o.num,
				elem_pic = $(pic_cls, elem),
				len = elem_pic.length - 1,
				slide = o.start - 1;
			var meth = {
				autoplay: function(){
					if (slide < len){
						meth.action();
						slide++
					} else if (slide > len){
						slide = 0;
						meth.action();
						slide++
					} else {
						slide = len;
						meth.action();
						slide = 0;
					}
				},
				pause: function(){
					if (o.autoplay){
						clearTimeout(elem.data('pause'));
						clearInterval(elem.data('interval'));
						pauseTimeout = setTimeout(function() {
							clearTimeout(elem.data('pause'));
							playInterval = setInterval(meth.autoplay, o.interval);
							elem.data('interval', playInterval);
						}, o.pause);
						elem.data('pause', pauseTimeout);
					}
				},
				start: function(){
					slide = (slide < 0) ? 0 : slide;
					slide = (slide > len) ? len : slide;
					
					elem.data({cur_slide: slide});
					$(pic_cls + ':eq(' + slide + ')', elem).show();
					meth.intro();
					if (o.nav) meth.active();
					if (o.startCall) o.startCall();//additional callback
				},
				active: function(){
					$('.' + o.naviCls + ':eq(' + slide + ')', '#' + nav_id).addClass(o.actCls).siblings().removeClass(o.actCls);
				},
				action: function(){
					$(pic_cls + ':eq(' + slide + ')', elem).fadeIn(600, meth.intro()).siblings(pic_cls).fadeOut(600, meth.hide);
					elem.data({cur_slide: slide});
		
					if (o.nav) meth.active();
					if (o.actionCall) o.actionCall(slide);
				},
				intro: function(){
					if (o.intro){
						$box = $(pic_cls + ':eq(' + slide + ')', elem),
						numb = $(pic_cls + '_numb', $box).html(),
						name = $(pic_cls + '_name', $box).html(),
						desc = $(pic_cls + '_desc', $box).html();
						$(text_cls + ' b', elem).html(numb + '.');
						$(text_cls + ' span', elem).html(name);
						$(text_cls + ' i', elem).html(desc);
				
						if (o.infoCall) o.infoCall();
					}
				},
				hide: function(){
					$(this).hide();
				}
			};
			//generate navigation
			if (o.nav){
				var nav_id = o.navId + '-' + slider.index;
				
				elem.append('<ul class="' + o.navCls + '" id="' + nav_id + '" />');
				elem.on('click', '#' + nav_id + ' .' + o.naviCls + ' > a', function(){
					slide = $(this).parent().index();
					meth.action();
					slide++;
					meth.pause();
					return false;
				});
				slider.index++;
			}
			if (o.arrows){
				elem.append('<div class="' + o.arrowsCls + '"><a href="#prev" class="prev">' + o.prevTxt + '</a><a href="#next" class="next">' + o.nextTxt + '</a></div>');
				elem.on('click', '.' + o.arrowsCls + ' > a', function(){
					dir = $(this).attr('href').substr(1);
					current = elem.data().cur_slide;
					switch (dir) {
						case 'next':
							slide = current+1;
							if (slide > len) {
								slide = current = 0;
							} else {
								current++
							}
							break
						case 'prev':
							slide = current-1;
							if(slide < 0){
								slide = current = len;
							} else {
								current--
							}
							break;
					}
					meth.action();
					slide++;
					meth.pause();
					return false;
				});
			}
			for (n=0; n <= len; n++){
				$is = $(elem_pic[n]);
				src = $('img', $is).attr('src');
				
				$is.addClass('pic-' + num).hide();
				if (o.nav) {
					if (!o.navCall){
						$('#' + nav_id).append('<li class="' + o.naviCls + '"><a href="#pic-' + num + '">' + num + '</a></li>');
					} else {
						o.navCall(pic_cls, o.naviCls, num, nav_id);
					}
				}
				num++
			}
			
			meth.start();
			//start slider
			
			if (o.autoplay){//autoplay start
				slide = elem.data().cur_slide+1;
				playInterval = setInterval(meth.autoplay, o.interval);
				elem.data('interval', playInterval);
			}
		});
		
		return initial;
	}
};
$.fn.sliderFan = function( _method ) {
	if (slider[ _method ]) return slider[ _method ].apply(this, Array.prototype.slice.call(arguments, 1));
	else if (typeof _method === 'object' || ! _method) return slider.init.apply(this, arguments);
	else $.error('Method ' +  _method + ' does not exist on $.sliderFan');
};
})( jQuery );