// JavaScript Document
$(document).ready(function(){
    //Login menu open/close
	$('body').click(function() {
        $('#login_menu div.container').hide().prev().removeClass('active');
    });
	$("#login_menu div.container, a.open_menu").click(function(e) {
        e.stopPropagation();
    });
	$('a.open_menu').click(function(){
		$(this).toggleClass('active').next().toggle();
	});
	
	//Left menu Sub open/close
	$('#left_menu > ul > li').each(function(){
		if($(this).children('ul').length > 0){
			$(this).children('a').click(function(){
				$(this).parent('li').toggleClass('active').children('ul').slideToggle("fast");
				//IE6 have bodyheight bug???
			});
		}
	});
	
	//search of BR and replacement by SPAN's
	//wrap up text SPAN's
	$('#image').children().each(function(){
	if ($(this).find('br').length > 0){
		if ($.browser.version <= 8 && $.browser.msie) {
			var brtag = '<BR>';
		} else {
			var brtag = '<br>';
		}
		var splitlines = $(this).html().split(brtag).join('</span><span>');
		$(this).html('<span>'+ splitlines +'</span>');
	} else {
		$(this).wrapInner('<span></span>');
	}
	});
	$('#image span').animate({'opacity':0.9}).after('<div class="clear"></div>');
	
	/***** SELECT *****/
	$('.select_imul').live('click', function() {
		$('.select_imul').removeClass('act');
		$(this).addClass('act');
		if ($(this).children('.select_options').is(':visible')) {
			$('.select_options').hide();
		} else {
			$('.select_options').hide();
			$(this).children('.select_options').show();
		}
	});
	$('.select_options .option').live('click', function() {
    	//insert selected value in DIV
    	var optiontext = $(this).html();
    	$(this).parents('.select_imul').find('.selected_text').html(optiontext);

    	//activ. current value
		$(this).addClass('sel').siblings().removeClass('sel');

    	//insert attr. in OPTION
    	var optionval = $(this).attr('value');
    	optionval = typeof(optionval) != 'undefined' ? optionval : optiontext;
		$(this).parents('.select_block').find('option').removeAttr('selected').each(function() {
			if ($(this).val() == optionval) {
				$(this).attr('selected', 'select');
			}
		});
	});
	var selenter = false;
	$('.select_imul').live('mouseenter', function() {
		selenter = true;
	});
	$('.select_imul').live('mouseleave', function() {
		selenter = false;
	});
	$(document).click(function() {
		if (!selenter) {
			$('.select_options').hide();
			$('.select_imul').removeClass('act');
		}
	});
	//creation of imitation of the SELECT
	$(".select_block select").each(function(){
		var $select = "";
		$(this).children('option').each(function(){
			$select += '<div class="option" value="'+ $(this).val() +'">' + $(this).text() + '</div>';
		});
		var imul = '<div class="select_imul">\
						<div class="select_selected">\
							<div class="selected_text">' + $(this).children("option").first().html() + '</div><div class="selected_arrow"></div>\
						</div>\
						<div class="select_options">' + $select + '</div>\
					</div>';
					
		$(this).before(imul);
	});
	/***** /SELECT *****/
	
	//body background position-Y (if exists)
	setTimeout(function(){
		if ($('.bg_pos').length > 0) {
			//if ($.browser.webkit) {
			//	var y_pos = $('.bg_pos').delay(1000).offset().top + 41;
			//}
			//else { 
				var y_pos = $('.bg_pos').offset().top - 29;
			//}
			$('.body').css("background-position", "0px " + y_pos + "px");
			//alert(y_pos);
		}
	},1500);
});