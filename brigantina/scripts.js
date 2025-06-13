// JavaScript Document
$(document).ready(function(){
	/* OPEN/CLOSE LOGIN BLOCK */
	$(".entersite .login_block").hide();
	$('body').click(function() {
        $('.entersite .login_block').hide().prev().removeClass('active');
    });
	$(".entersite .login_block, a#enter").click(function(e) {
        e.stopPropagation();
    });
	$('a#enter').click(function(){
		$(this).toggleClass('active').next().toggle();
	});
	
	/* activation REPLACE STANDART SUBMIT BUTTON */
	$('input.button').prepareinputs();
	
	/* BOTTOM MENU WIDTH*/
	var ul_width = 0;
	$('#menu_bottom ul li').each(function(){
		ul_width += $(this).outerWidth(true);
	});
	$('#menu_bottom ul').css("width", ul_width);
	
	/* SHOW/HIDE SUBSCRIBE SECTIONS */
	if ($.browser.msie && $.browser.version == 6.0){
		$('#subscribe .sections').show();
	} else {
		$('#subscribe .sections').hide();
	}
	$('.select_sections a').click(function(){
		$(this).parent().next().toggle();
	});
	
	/* SLIDER ON RIGHT COLUMN */
	$(function(){
		if ($('#slides').length > 0) {
			$('#slides').slides({
				//autoHeight: true,
				play: 2000,
				pause: 5000,
				paginationClass: 'nav'
				});
			/* size of navigation element */
			var elemwidth = 0;
			$('#slides ul.nav li').each(function(){
				elemwidth += $(this).outerWidth();
			});
			$('#slides ul.nav').css({"width": elemwidth, "margin-left": -elemwidth*0.5});
		}
	});
	
	/* FLASHING INPUT */
		$('.flashing').addClass('nofocus');
		$('.flashing').focus(function(){
			$(this).removeClass("nofocus");//.addClass('focus');	
			if (this.value == this.defaultValue){
				this.value = '';
			}
			//if (this.value != this.defaultValue){
			//	this.select();
			//}
		});
		$('.flashing').blur(function() {
			$(this).addClass('nofocus');//.removeClass('focus');
			if ($.trim(this.value) == ''){
				this.value = (this.defaultValue ? this.defaultValue : '');
			}
		});
	
	/* SHOW/HIDE FULL REVIEW */
	$('.review_block').each(function(){
		$(this).find('.top').children('p').hide().slice(0,2).wrapAll('<div class="showthis"></div>').show();
	});
	$('.review_block a.show_max').click(function(){
		$(this).parent().children().not('div,a').toggle();
		$(this).find('span:hidden').show().siblings().hide();
	});
	
	//Scroll to top
	$('.go_to_top').click(function(e){
        $('body,html').animate({scrollTop:0}, 'fest'); 
    });
	
	/* GALLERY */
	
	//Gallery show image
	$('.thumbs a:first').addClass('active')
	$('.thumbs a').click(function(){
		var i_thumb = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		$(this).parents('.thumbs').prev().find('a[rel="gallery"]:eq(' + i_thumb + ')').show().siblings().hide();
	});
	
	//activation BRIGA STYLE FANCYBOX 
	if ($('a[rel^="gallery"]').length > 0){
		$('a[rel^="gallery"]').fancybox({
			padding: 0,
			tpl: {
				next: '<a class="fancybox-nav fancybox-next briga"><span>\u0432\u043F\u0435\u0440\u0435\u0434</span></a>',
				prev: '<a class="fancybox-nav fancybox-prev briga"><span>\u043D\u0430\u0437\u0430\u0434</span></a>',
				closeBtn: '<div class="fancybox-item fancybox-close briga">\u0437\u0430\u043A\u0440\u044B\u0442\u044C</div>'
			},
			nextEffect: 'fade',
			prevEffect: 'fade'
		});
	}
	
	/* TEXT ELEMENTS TOGGLE */
	$('.toggles').siblings().toggle();
	$('.toggles').click(function(){
		$(this).siblings().toggle();
	});
	
	/* EXPERTS FACES (experts_journal)*/
	$('#experts_faces li').bind("click",function(event){
		if ($(this).attr("class") != "current" ){
			if ($(this).hasClass('active')){
			} else {
				$(this).addClass('active').siblings().removeClass('active');
				event.preventDefault();
				//$(this).unbind(event);
			}
		}
	});
	
});

/* REPLACE STANDART SUBMIT BUTTON */
(function($) {
	var prepareinputs_methods = {
		convert_input : function($obj){
			var valtext = $obj.attr('value');//value from standart button
			$obj.replaceWith('<div class="button_typea"><div class="inp">' + valtext + '</div></div>');//create new button
		}	
	};
	$.fn.prepareinputs = function(){
		if(this.length == 1){
			prepareinputs_methods.convert_input(this);//replace standart button to new button
		} else if(this.length > 1){
			this.each(function(key, item){
				prepareinputs_methods.convert_input($(item));			   
			});
		}
		
		$('.button_typea').click(function(){//submit form on click new button
			$(this).parents('form').submit();
		});
	}
})(jQuery);


