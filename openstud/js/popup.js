$(document).ready(function(){
// POPUP QUESTION
	$('#overlay').hide().css({opacity:0});//HIDE OVERLAY
	$('.zadat a').click(popupmove);//START POPUP
	$('.zadat a').click(actions);//OPEN POPUP & MORE

	function actions()
		{
			$('.popup_question').show();//SHOW POPUP
			$('#overlay').show().css({'height':bodyheight}).animate({opacity:0.7}, 'fast');//SHOW OVERLAY
			
			//WHEN PAGE ON SCROLLING
			$(window).scroll(function(){
				var scroll_y = $(window).scrollTop();
					windowheight = $(window).height();
					popupheight = $('.popup_question').outerHeight();
				$('.popup_question').css({'top':windowheight*0.5 - popupheight*0.5 + scroll_y});
			});
			
			//WHEN BROWSER RESIZE
			$(window).bind("resize",popupmove);
			
			//CLOSE POPUP
			$('.popup_question .close').click(function(){
				$('.popup_question').hide();
				$('#overlay').hide().css({opacity:0});
			});
			
			//CLOSE POPUP ON 'ESC' PRESS
			$('body').keypress(function(press){
				if (press.keyCode==27) {
					$('.popup_question').hide();
					$('#overlay').hide().css({opacity:0});
				}
			});
		}

	function popupmove()
		{
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
		}
// /POPUP QUESTION
});