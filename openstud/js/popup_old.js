$(document).ready(function(){
// POPUP QUESTION
	$('#overlay').animate({opacity:0});
	//OPEN POPUP
	$('.zadat a').click(function(){
		var bodywidth = $(window).outerWidth();//width of <body>
			bodyheight = $('body').outerHeight();//height of <body>
			windowheight = $(window).height();
			popupheight = $('.popup_question').outerHeight();
			scroll_y = $(window).scrollTop();
			
		$('.popup_question').show().css({'top':windowheight*0.5 - popupheight*0.5 + scroll_y});
		if (bodywidth > 960){
			$('.popup_question').css({'left':'50%','margin-left':'-303px'});
		}
		else {
			$('.popup_question').css({'left':'480px','margin-left':'-303px'});
			$('#overlay').css({'width':'960px'});
		}
		//SHOW OVERLAY
		$('#overlay').show().animate({opacity:0.7}, 'fast').css({'height':bodyheight});
		//WHEN BROWSER RESIZE
		$(window).bind("resize",function(){
				var bodywidth = $(window).outerWidth();
					bodyheight = $('body').outerHeight();
					windowheight = $(window).height();
					popupheight = $('.popup_question').outerHeight();
					scroll_y = $(window).scrollTop();
					
				$('.popup_question').css({'top':windowheight*0.5  - popupheight*0.5 + scroll_y});
				if (bodywidth > 960){
					$('.popup_question').css({'left':'50%','margin-left':'-303px'});
					$('#overlay').css({'width':bodywidth,'height':bodyheight});
				}
				else {
					$('.popup_question').css({'left':'480px','margin-left':'-303px'});
					$('#overlay').css({'width':'960px','height':bodyheight});
				}
				
		});
		//WHEN PAGE ON SCROLLING
		$(window).scroll(function(){
			var scroll_y = $(window).scrollTop();
				windowheight = $(window).height();
				popupheight = $('.popup_question').outerHeight();
			$('.popup_question').css({'top':windowheight*0.5 - popupheight*0.5 + scroll_y});
		});
		
	});
	
	//CLOSE POPUP
	$('.popup_question .close').click(function(){
		$('.popup_question').hide();
		$('#overlay').hide().animate({opacity:0});
	});
	
	//CLOSE POPUP ON 'ESC' PRESS
	$('body').keypress(function(press){
		if (press.keyCode==27) {
			$('.popup_question').hide();
			$('#overlay').hide().animate({opacity:0});
		}
	});
// /POPUP QUESTION
});