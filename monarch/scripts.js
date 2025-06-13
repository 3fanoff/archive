$(function(){
	rounds();
	initRC();
	jQuery("#gallery").jCarouselLite({
		btnNext: ".next_gal",
		btnPrev: ".prev_gal",
		visible: 5,
		auto: 5000
	});
});

function rounds(){
	if(!$('.rounds')) return;
	$('.rounds').each(function(){
		num = 1
		$(this).find('li').each(function(){
			$(this).prepend('<span class="round">' + num + '</span>');
			num ++
		});
	})
}
/* INIT RC v.1.5.1 */
function initRC(){
	var main_el = $('input.rc'),
		act = 'act';
	
	if(!main_el) return;
	main_el.on('load_rc',function(){
		customizeRC(main_el,act);
	});
	main_el.trigger('load_rc');
	$('.rcbtn').on('click',function(){
		var attrval = $(this).prev().attr("type"),
			nameval = $(this).prev().attr("name");
		if (attrval == 'radio'){
			$('input[name="'+nameval+'"]').next().removeClass(act);
			$(this).addClass(act);
		}
		if (attrval == 'checkbox'){
			$(this).toggleClass(act);
		}
		$(this).prev().click();
	})
	main_el.filter(':checked').next().addClass(act);
	$('label').on('click',function(){
		var id_inp = $(this).attr("for"),
			nameval = $('#'+id_inp).attr("name");
		if ($('#'+id_inp).hasClass('radio')){
			$('input[name="'+nameval+'"]').next().removeClass(act);
			$('#'+id_inp).next().addClass(act);
		}
		if ($('#'+id_inp).hasClass('checkbox')){
			$('#'+id_inp).next().toggleClass(act);
		}
	});
}
function customizeRC(el,act){
	el.each(function() {
		if(!$(this).hasClass('hiden')){
			if($(this).attr('type') == 'radio'){
				var itype = 'radio'
			}
			if($(this).attr('type') == 'checkbox'){
				var itype = 'checkbox'
			}
			$(this).addClass('hiden').css({
				visibility	:'hidden',
				position	:'absolute'
			}).after('<div class="'+itype+' rcbtn"/>');
			if($(this).attr('checked') == 'checked'){
				$(this).next('.rcbtn').addClass(act);
			}
		}
	});
}
