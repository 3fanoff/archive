$(function(){
	if($('.slider').length > 0){
		$('.slider').sliderFan({
			infoboxCls: 'slide_textbox',
			arrows: false,
			intro: true
		});
	}
	
	if($('.clients .carousel').length > 0){
		$('.clients .carousel').jCarouselLite({
			btnNext: '.clients .next',
			btnPrev: '.clients .prev',
			visible: 5,
			auto: 4000,
			speed: 1000
		}).width('auto');
	}
	if($('.recom').length > 0){
		$('.recom').fancybox({
			helpers: {
				overlay: {locked: false}
			}
			/*afterShow: function(){
				//console.log(this.href);
				this.inner.append('<a href="' + this.href + '" target="_blank" class="original">Посмотреть в оригинальном размере</a>');
			}*/
		});
	}
	full_short();
	if($('.reviews').length > 0){
		var maxLi = 0;
		$('.reviews_serv .reviews li').each(function(){
			maxLi = Math.max(maxLi, $(this).height());
		});
		$('.reviews_serv .reviews li').height(maxLi);
		$('.reviews').jCarouselLite({
			btnNext: '.reviews .next',
			btnPrev: '.reviews .prev',
			visible: 1,
			speed: 1000
		});
	}
	
	$('.faq dt span').click(function(){
		$(this).parent().next().toggle();
	});
	
	$('.tab_boxes > div').hide();
	clickTab('.service_tabs div:first a');
	
	$('.price_nav li a').click(function(){
		var href = $(this).attr('href');
		var pos = $(href).offset().top - 20;
		$('.mybody, html').animate({scrollTop: pos}, 'slow');
		return false;
	});
	
	clickTab('.tabs.modal a:first');
	help();
	
	/*$("input[name='mail_phone']").keypress(function (e){
		if(e.which!=40 && e.which!=41 && e.which!=43 && e.which!=45 && (e.which<48 || e.which>57)) return false;
	});
 
	$("input[name='mail_mail']").keypress(function(e){
		if((e.which<45 || e.which>57) && (e.which<63 || e.which>90) && (e.which<96 || e.which>122)) return false;
	});*/
		
	
	$('#buy-order-form-submit').click(function(){
		var form = $('#buy-order-form');
		form.submit();
	});
	if($('#tabmenu li div').hasClass('current')){
		$('#tabmenu li div.current').parents('li').addClass('over');
	} else {
		$('#tabmenu li:last').addClass('over');
	}
	/*$(document).on('click', '.hidden input',function(){
		return false;
	});*/
	
	var tags = $('.tags .tag');
	if(tags.length >=0){
		tags.last().addClass('active');
		for(i = 1; tags.length > i; i++){
			if (tags.eq(i-1).hasClass('active')){
				tags.last().removeClass('active');
				return false;
			}
		}
	}
});

function showSub( _is ){
	$(_is).parent().addClass('over').siblings().removeClass('over');
}
function clickTab( _is ){
	var tabId = $(_is).attr('href');
	$(tabId).show().siblings('div:not(".tabs")').hide();
	$(_is).parent().siblings().children().removeClass('active');
	$(_is).addClass('active').siblings('a').removeClass('active');
}
function full_short(){
	$('.text_full').prev('p').append(' <a href="#more" id="more_serv">Подробнее</a>');
	$('#more_serv, .benefit_box._all li a').click(function(){
		$('.full_short').trigger('click');
		return false;
	});
	$('.full_short').click(function(){
		$(this).toggleClass('_fs');
		$('.text_full, .benefits_full').slideToggle();
		$('.benefit_box._all').slideToggle();
		$('#more_serv').toggle();
	});
}
function help(){
	$('.help').each(function(){
		var $is = $(this);
		var helpTxt = $is.attr('title');
		$is.removeAttr('title').data('help', helpTxt);
	});
	$('.help').hover(function(){
		var $is = $(this);
		var helpTxt = $is.data().help;
		$is.append('<span class="help_text">' + helpTxt + '</span>')
	}, function(){
		$('.help_text', this).remove();
	});
};
function validOrder(){
	$('form#order').clearForm().validate({
		submitHandler: function(forma) {
			$(forma).ajaxSubmit({
				target: "#form_order .body",
				timeout: 3000/*,
				success: function() {
					$('#form_order .body').append('<p>Данные успешно отправлены</p>');
				}*/
			});
		},
		rules: {
			mail_name: {required: true, minlength: 3},
			mail_mail: {required: true, email: true},
			mail_phone: {required: false},
			mail_msg: {required: true, minlength: 5}
		},
		messages: {
			mail_name: {required: "Введите имя", minlength: "Имя должно содержать не менее 3 символов"},
			mail_mail: "Введите правильный адрес",
			mail_msg: {required: "Оставьте комментарий", minlength: "Комментарий должен содержать не менее 5 символов"}
		},
		errorClass: 'invalid',
		errorElement: 'div',
		errorPlacement: function(er, el) {
			el.after(er);
		}
	});
}
function validPay(){
	$('form#buy-order-form').resetForm().validate({
		rules: {
			InvId: {required: true, digits: true},
			OutSum: {required: true, number: true}
		},
		messages: {
			InvId: {required: "Введите номер", digits: "Только числа"},
			OutSum: {required: "Введите сумму", number: "Укажите правильную сумму"}
		},
		errorClass: 'invalid',
		errorElement: 'div',
		errorPlacement: function(er, el) {
			el.after(er);
		}
	});
}
function validCall(){
	$('form#call').resetForm().validate({
		submitHandler: function(forma) {
			$(forma).ajaxSubmit({
				target: "#callback_form .body",
				timeout: 3000,
				success: function() {}
			});
		},
		rules: {
			mail_name: {required: true, minlength: 3},
			mail_phone: {required: true, minlength: 7, number: true}
		},
		messages: {
			mail_name: {required: "Введите имя", minlength: "Имя должно содержать не менее 3 символов"},
			mail_phone: {required: "Укажите телефон", minlength: "Не менее 7 чисел", number: "Только числа"}
		},
		errorClass: 'invalid',
		errorElement: 'div',
		errorPlacement: function(er, el) {
			el.after(er);
		}
	});
}
var modal = {
	over : '#m-overlay',
	popup : '#modal',
	content: '.popup_content',
	init : function( _cont ){
		var $cont = $(this.content, this.popup);
		$(this.popup).show();
		$(this.over).show();
		$cont.empty();
		$( _cont ).clone(true).appendTo($cont);
		this.start();
		this.pos( _cont );
		$(window).resize(function(){
			modal.start();
		});
	},
	closed: function(){
		$(this.popup).hide();
		$(this.over).hide();
	},
	start: function(){
		var body_width = $('body').width(),
			win_height = $(window).height();
			//win_width = win.width();
		$(this.over).css({
			'width': body_width,
			'height': win_height,
			'opacity': 0.5
		});
	},
	pos: function( _cont ){
		var $popup = $(this.popup),
			$cont = $( _cont );
			x_pos = $cont.outerWidth(true)/2,
			y_pos = $cont.outerHeight(true)/2;
		$popup.css({'margin-left':-x_pos,'margin-top':-y_pos});
	}
};
