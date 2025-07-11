/*
 * 	Easy Slider - jQuery plugin
 *	written by Alen Grakalic	
 *	http://cssglobe.com/post/3783/jquery-plugin-easy-image-or-content-slider
 *
 *	Copyright (c) 2009 Alen Grakalic (http://cssglobe.com)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
 

(function($) {

	$.fn.easySlider = function(options){
	  
		// default configuration properties
		var defaults = {
			prevId: 		'prev-photos',
			prevText: 		'',
			nextId: 		'next-photos',	
			nextText: 		'',
			orientation:	'', //  'vertical' is optional;
			speed: 			0			
		}; 
		
		var options = $.extend(defaults, options);  
		
		return this.each(function() {  
			obj = $(this); 				
			var s = $("li", obj).length;
			var w = obj.width(); 
			var h = obj.height(); 
			var ts = s-1;
			var t = 0;
			var vertical = (options.orientation == 'vertical');
			$("ul", obj).css('width',s*w);			
			if(!vertical) $("li", obj).css('float','left');
			$(obj).after('<div id="'+ options.prevId +'"><a href=\"javascript:void(0);\">'+ options.prevText +'</a></div> <div id="'+ options.nextId +'"><a href=\"javascript:void(0);\">'+ options.nextText +'</a></div>');		
			$("a","#"+options.prevId).hide();
			$("a","#"+options.nextId).hide();
			$("a","#"+options.nextId).click(function(){		
				animate("next");
				if (t>=ts) $(this).fadeOut();
				$("a","#"+options.prevId).fadeIn();
			});
			$("a","#"+options.prevId).click(function(){		
				animate("prev");
				if (t<=0) $(this).fadeOut();
				$("a","#"+options.nextId).fadeIn();
			});	
			function animate(dir){
				if(dir == "next"){
					t = (t>=ts) ? ts : t+1;	
				} else {
					t = (t<=0) ? 0 : t-1;
				};								
				if(!vertical) {
					p = (t*w*-1);
					$("ul",obj).animate(
						{ marginLeft: p }, 
						options.speed
					);				
				} else {
					p = (t*h*-1);
					$("ul",obj).animate(
						{ marginTop: p }, 
						options.speed
					);					
				}
			};
			if(s>1) $("a","#"+options.nextId).fadeIn();	
		});
	  
	};

})(jQuery);