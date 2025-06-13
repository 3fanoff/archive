// JavaScript
$(function(){
	// carousel news
	$(".news_box .body ul").bxSlider({
		mode:'vertical',
		pager: false,
		nextSelector: '.news_box > .next',
		minSlides: 3,
		moveSlides: 1,
		responsive: false,
		adaptiveHeight: false,
		onSliderLoad: function (){
			var el_sum = 0;
			for (var i = 0; i < 3 ; i++) {
				el_h = $('.news_box .body li:eq(' + i + ')').outerHeight();
				el_sum = el_sum + el_h;
			}
			$('.news_box .body').height(el_sum);
		}
	});
	
	//text toggle
	textHeight();
	
	// slider
	$('#slider').sliderFan({
		infoboxCls: 'textbox'
	});
	
	// placeholder
	var $input = $('.input_text');
	$input.focus(function() {
		var deftext = $(this).data('placeholder');
		if (this.value == deftext) {
			$(this).removeClass('placeholder'); 
			this.value = '';
		}
	}).blur(function() {
		var deftext = $(this).data('placeholder');
		if (this.value == '' || this.value == deftext) {
			$(this).addClass('placeholder');
			this.value = deftext;
		}
	}).trigger('blur');
});
/*$(window).resize(textHeight);*/
function textHeight(){
	var $cnt = $('.content.index');
	var $txt = $('.body', $cnt);
	var txt_h = $txt.height();
	var text_top = $txt.offset().top;
	$txt.hide();
	var foot_top = $('#footer').offset().top - 60;
	var vis_h = foot_top - text_top - 30;
	$txt.height(vis_h).show();
	var in_h = $txt.find('.inside').height();
	if(vis_h >= in_h){
		$cnt.find('.showmore, .grad').hide();
	} else {
		$cnt.find('.showmore, .grad').show();
	}
	/*$txt.height(120);*/
	$('.more.to_full a', $cnt).click(function(){
		$(this).parents('.showmore').prev('.body').animate({'height': txt_h}, 400);
		$txt.find('.grad').hide();
		$('.showmore .to_short').show().prev().hide();
		return false
	});
	$('.more.to_short a', $cnt).click(function(){
		$(this).parents('.showmore').prev('.body').animate({'height': vis_h}, 400);
		$txt.find('.grad').show();
		$('.showmore .to_full').show().next().hide();
		return false
	});
}

