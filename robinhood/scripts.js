$(function(){
	inputFlash('flash','nofocus');
	if($('#slider').length > 0){
		$('#slider ul').roundabout({
			btnNext: '#slider .next',
			btnPrev: '#slider .prev',
			minOpacity: 1.0,
			minScale:0.2,
			autoplay: true,
			autoplayDuration: 6000
		});
	}
	rounds();
	photoSlide('.photos');
	initRC();
	$('.main_news .news:first').addClass('pr-28');
	if($('.fancy-item').length > 0){
		$('.fancy-item').fancybox({
			openEffect  : 'none',
			closeEffect : 'none'
		});
	}
});
/* INIT RC v.1.5 */
function initRC(){
	var main_el = $('input.rc'),
		act = 'act';
	
	if(main_el.length <=0) return;
	main_el.on('load_rc',function(){
		customizeRC(main_el);
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
function customizeRC(el){
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
		}
	});
}
/* PhotoSlider */
function photoSlide(object){
	if($(object).length <= 0) return;
	$(object + ' li').first().show().siblings().hide();
	ix = 0;
	next = 0;
	curr = 0;
	last = $(object + ' li:last').index();
	setInterval(function() {
		if (ix == last){
			next = 0;
			curr = 0;
		} else {
			next = curr+1;
			curr = ix+1;
		}
		$(object + ' li:eq('+ix+')').fadeIn(600).siblings(':visible').fadeOut(600);
		ix = next;
	},4000);
}
/* Numeric List */
function rounds(){
	if($('.rounds').length <= 0) return;
	$('.rounds').each(function(){
		num=1
		$(this).find('li').each(function(){
			$(this).prepend('<span class="round">' + num + '</span>');
			num++
		});
	})
}
/* FLASHING INPUT v.2.0 */
function inputFlash(obj_cls,def_cls){
	var $obj = $('.'+obj_cls),
		type = 'type',
		pass = 'password',
		text = 'text';
	$obj.each(function(){
		var elem = $(this);
		elem.addClass(def_cls);
		if(elem.attr(type) == pass){
			elem.attr(type,text);
			elem.data(type,pass);
		}
		elem.focus(function(){
			elem.removeClass(def_cls);	
			if (this.value == this.defaultValue){
				this.value = '';
				if(elem.data(type) == pass){
					elem.attr(type,pass);
				}
			}
		});
		elem.blur(function() {
			elem.addClass(def_cls);
			if ($.trim(this.value) == ''){
				this.value = (this.defaultValue ? this.defaultValue : '');
				if(elem.data(type) == pass){
					elem.attr(type,text);
				}
			}
		});
	});
}