$(document).ready(function(){
//ADD OVERLAY <SPAN> TO ATTENTION
	$('.attention_block p.desc a').append('<span class="overlay"></span>');

//HOVER FOR IE6
	if(navigator.userAgent.match('MSIE 6.0')) {
	$('.attention_block .inner').hover(
	function(){
		$(this).addClass('over');
	}, 
	function(){
		$(this).removeClass('over');
	})
	}

//SLIDE SHOW ACTIVATE
	$("#slides").slides();

//ADD '.OVER' TO CAPTION
	$('.overlay').hover(
		function(){
			$(this).parents('.caption').addClass('over');
		},
		function(){
			$(this).parents('.caption').removeClass('over');
		})
//BOTTOM PAGING TOTAL WIDTH 
	var totWidth=0;
	$('.paging ul li').each(function(i){
		totWidth += $(this).outerWidth(true);
	});
	$('.paging').css("width", totWidth);

//LIGHTBOX CAPTION SIZE	
	var widthCaption = $('#lightbox img').width();
	$('#lightbox .caption').css("width", widthCaption);
	
	
});
