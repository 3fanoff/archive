// SLIDERME ver.2.0 by Michael Trifanov
(function($){
	$.fn.sliderme = function(opts){
		var defaults = {
			start: 1,
			speed: 1000,
			nextclass: 'next',
			prevclass: 'prev',
			nexttext: '&raquo;',
			prevtext: '&laquo;',
			pagination: true,
			pagiclass: 'pagination',
			currclass: 'current',
			play: 4000, 
			pause: 7000
		};
		var opts = $.extend(defaults,opts);
		var elem = $(this);
			
		return this.each(function(){
			elem.find('.pic').wrapAll('<div class="pics_box"></div>');
			var pics_box = elem.find('.pics_box'),
				prev = 0,
				next = 0,
				curr = 0,
				start = opts.start -1,
				total = pics_box.children().size(),
				width = pics_box.children().width(),
				posx = dirx = 0,
				number = 0,
				pagiclick,
				clicked = false;
				//alert();
			
			function move(direct, pagiclick){
				clicked = true;
				switch(direct) {
					case 'next':
						prev = curr;
						next = curr + 1;
						next = total === next ? 0 : next;
						posx = width * 2;
						dirx = -width * 2;
						curr = next;
					break;
					case 'prev':
						prev = curr;
						next = curr - 1;
						next = next === -1 ? total-1 : next;
						posx = 0;
						dirx = 0;
						curr = next;
					break;
					case 'pagi':
						next = parseInt(pagiclick,10);
						prev = $('.' + opts.pagiclass + ' li.'+ opts.currclass +' a', elem).attr('href').match('[^#/]+$');
						if (next > prev) {
							posx = width*2;
							dirx = -width*2;
						} else {
							posx = 0;
							dirx = 0;
						}
						curr = next;
					break;
				};
				
				pics_box.children(':eq('+ next +')').css({'display':'block','left':posx})
				pics_box.animate({
						left:dirx
				}, opts.speed, function(){
						pics_box.css({'left':-width});
						pics_box.children(':eq('+ next +')').css({'left':width, 'z-index':10});
						pics_box.children(':eq('+ prev +')').css({'left':-width, 'display':'none', 'z-index':0});
						clicked = false;
				});
				if (opts.pagination) {
					$('.'+ opts.pagiclass +' li.' + opts.currclass, elem).removeClass(opts.currclass);
					$('.'+ opts.pagiclass +' li:eq('+ next +')', elem).addClass(opts.currclass);
				}
			}
			pics_box.children().css({'position':'absolute', 'top': 0, 'left':width, 'display':'none'});//default slide style
			pics_box.css({'position':'relative', 'width':width * 3, 'left':-width});//default box style
			
			if(start < 0 || start > total){
				start = 0;
			}
			if (opts.start) {
				curr = start;
			}
			pics_box.children(':eq('+start+')').css({'display':'block'});//show start slide
			
			elem.append('<div class="'+ opts.prevclass +'">'+opts.prevtext+'</div><div class="'+ opts.nextclass +'">'+ opts.nexttext +'</div>');//add nav
			elem.children('.prev').click(function(){
				if (clicked == false){
					if (opts.play){
						pause();
					}
					move('prev');
				}
			});
			elem.children('.next').click(function(){
				if (clicked == false){
					if (opts.play){
						pause();
					}
					move('next');
				}
			});
			if (opts.pagination){
				elem.append('<ul class='+ opts.pagiclass +'></ul>');
				pics_box.children().each(function(){
					$('.' + opts.pagiclass, elem).append('<li><a href="#'+ number +'">'+ (number+1) +'</a></li>');
					number++;
				});
				$('.'+ opts.pagiclass +' li:eq('+ start +')', elem).addClass(opts.currclass);
			}
			$('.'+ opts.pagiclass +' li a', elem).click(function(){
				if (opts.play){
					pause();
				}
				if (clicked == false){				
					pagiclick = $(this).attr('href').match('[^#/]+$');
					if (curr != pagiclick) {
						move('pagi', pagiclick);
					}
					return false;
				}
			});
			if (opts.play) {
				playInterval = setInterval(function() {
					move('next');
				},opts.play);
				elem.data('interval',playInterval);
			}
			
			function pause() {
				if (opts.pause) {
					clearTimeout(elem.data('pause'));
					clearInterval(elem.data('interval'));
					pauseTimeout = setTimeout(function() {
						clearTimeout(elem.data('pause'));
						playInterval = setInterval(function(){
							move('next');
						},opts.play);
						elem.data('interval',playInterval);
					},opts.pause);
					elem.data('pause',pauseTimeout);
				} else {
					stop();
				}
			}
			
			function stop() {
				clearInterval(elem.data('interval'));
			}
		});
	};
})(jQuery);