$(document).ready(function(e) {
	if($('#m_cards').length > 0){
		$('.card_list').carouselme({
			visible: 5,
			circle: true
		});
		$(window).resize(function(){
			var ww = $(window).width(),
				mw = 1120,
				$obj = $('a.nav','.card_list');
			if (ww <= mw){
				$obj.hide();
			} else {
				$obj.show();
			}
		});
	}
	
	$('.basket table').each(function(){
		$('tbody tr:last',$(this)).addClass('last');
	});
	
	if($('.order_act').length > 0){
		$('.order_act').click(function(){
			$(this).next('.order').toggle(400);
		});
	}
	authToggle()
	if($('#slider').length > 0){
		$('#slider').liteAccordion({
			containerWidth : 1110,
			containerHeight : 182,
			headerWidth: 70,
			slideSpeed : 500
		});
	}
});
function authToggle(){
	var auth = '.auth-on',
		actcls = 'active',
		box = '.box';
	$('.ent a',auth).click(function(e){
		e.preventDefault();
		$('body.my').click(function(){
			$(auth + ' .ent').removeClass(actcls);
			$(auth).children(box).hide();
		});
		$(this).parent().toggleClass(actcls).parent(auth).children(box).toggle();
		$(box + ', .ent',auth).click(function(e){
			e.stopPropagation();
		})
	});
}