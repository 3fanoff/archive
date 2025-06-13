/*********************
CAROUSELME PLUGIN bu Michael Trifanov
ver.1.0
sep.2012

$('#element').carouselme({option: 'val'});

*********************/
(function($){
	$.fn.carouselme = function(options){
		var defs = {
			visible: 4,
			start: 2,
			speed: 500,
			type: 'simple',
			circle: true,
			autoplay: false,
			playint: 2500,
			pausetime: 5000,
			elbox_cls: 'elems_block',
			nav_cls: 'nav',
			prev_cls: 'prev',
			next_cls: 'next',
			dis_cls: 'disable',
			generatenav: true,
			gotostart: false // go to start then elements end
		};
		var el_pos = [],
			curr = [];
			
		return this.each(function(i){
			var opts = $.extend(defs, options),
				$this = $(this),
				elbox = $('ul',$this)//$this.find('ul'),
				elbox_w = $this.width(),
				el = $('li',elbox),//$this.find('li'),
				el_num = el.size(),
				el_pos[i] = 0,
				el_vis = opts.visible,
				step = opts.step,
				active = true;
			if (el_vis > el_num){
				el_vis = el_num;
			}
			if (opts.start >= el_vis || opts.start <= 0 || el_vis == el_num){
				start = 0;
			} else {
				start = opts.start - 1;
			}
			if (opts.circle){
				gts = 0;
			} else {
				gts = opts.gotostart;
			}
			el_w = Math.round(elbox_w / el_vis);
			curr[i] = -((0 + start) * el_w);
				
			elbox.wrapAll('<div class="' + opts.elbox_cls + '"/>');
			$this.children('.' + opts.elbox_cls).css({'width': elbox_w, 'overflow-x': 'hidden', 'position': 'relative'});
			el.css({'width': el_w});
			elbox.css({'width': el_num * el_w, 'position': 'relative', 'left': curr[i]});
			if (opts.generatenav){
				$this.prepend('<a href="#" class="' + opts.nav_cls + ' ' + opts.prev_cls + '"/>\
							   <a href="#" class="' + opts.nav_cls + ' ' + opts.next_cls + '"/>');
			}
			/***********  SIMPLE  ***********/
			if (opts.type == 'simple' || typeof opts.type == 'undefined' || opts.type == ''){
				max_pos = el_num * el_w - el_vis * el_w;
				function act(dir){
					if (opts.circle){
						first = $('li:first',elbox),
						last = $('li:last',elbox);
						if (dir == 'p' && el_pos[i] == curr[i]){
							last.after(first);
							elbox.css({left: el_pos[i] + el_w})
						} else if (dir == 'n' && curr[i] == 0){
							first.before(last);
							elbox.css({left: el_pos[i] - el_w});
						}
					}
					//return false
				}
				function prev(){
					active = false;
					if (el_pos[i] <= -max_pos){
						gts == 1 ? el_pos[i] = 0 : el_pos[i] = curr[i];
					} else {
						el_pos[i] = curr[i] - el_w;
					}
					elbox.animate({left: el_pos[i]}, opts.speed, act('p'));
					elbox.queue(function(){
							active = true;
							$(this).dequeue(); 
					});
					curr[i] = el_pos[i];
					if (!opts.gotostart && !opts.circle){
						hold('p');
					}
				}
				function next(){
					active = false;
					if (curr[i] == 0){
						gts == 1 ? el_pos[i] = -max_pos : el_pos[i] = 0;
					} else {
						el_pos[i] = curr[i] + el_w;
					}
					elbox.animate({left: el_pos[i]}, opts.speed, act('n'));
					elbox.queue(function(){
							active = true;
							$(this).dequeue(); 
					});
					curr[i] = el_pos[i];
					if (!opts.gotostart && !opts.circle){ 
						hold('n');
					}
				}
			}
			/********** /SIMPLE  ***********/
			function hold(holder){
				if (holder == 'n'){
					curr[i] == 0 ? $('.' + opts.next_cls, $this).addClass(opts.dis_cls) : $('.' + opts.nav_cls, $this).removeClass(opts.dis_cls);
				}
				if (holder == 'p'){
					el_pos[i] <= -max_pos ? $('.' + opts.prev_cls, $this).addClass(opts.dis_cls) : $('.' + opts.nav_cls, $this).removeClass(opts.dis_cls);
				}
			}
			function pause(){
				clearTimeout($this.data('pause'));
				clearInterval($this.data('interval'));
				pausetime = setTimeout(function(){
					clearTimeout($this.data('pause'));
					autoplay = setInterval(function(){
						next();
					}, opts.playint);
					$this.data('interval', autoplay);
				}, opts.pausetime);
				$this.data('pause', pausetime);
			}
			$('.' + opts.prev_cls, $this).click(function(e){
				e.preventDefault();
				if (opts.autoplay){
					pause();
				}
				if (active){
					prev();
				}
			});
			$('.' + opts.next_cls, $this).click(function(e){
				e.preventDefault();
				if (opts.autoplay){
					pause();
				}
				if (active){
					next();
				}
			});
			if (opts.autoplay) {
				autoplay = setInterval(function(){
					next();
				}, opts.playint);
				$this.data('interval', autoplay);
			}
		});
	}
})(jQuery);