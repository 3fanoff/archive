var d = document;
$(function(){
	order();
	inputFlash('place','nofocus');
	$('.flexslider.photos').flexslider({
		animation: 'slide',
		start: function(){
			//var hei = $(this.selector).parents('.flexslider').height();
			//$(this.selector).parents('.flexslider').parent().height(hei);
		}
	});
	$('.flexslider.plan').flexslider({
		animation: 'slide',
		animationLoop: false,  
		slideshow: false,      
		start: function(){}
	});
	
	$moveBox = $('.move_box');
	formPos = $('.right_col').offset().top;
	stopPos = $('#footer .content').offset().top - 50;
	moveHeight = $moveBox.outerHeight();
	holdPos = stopPos-moveHeight-formPos;
	clicked = 0;
	
	/*$('.flexslider').flexslider({
    	animation: "slide"
    });*/
});

$(window).scroll(function(){
	var scrollPos = $(window).scrollTop();
	if (scrollPos >= formPos) {
		$moveBox.css({'position':'fixed', 'top': 0});
	}
	if (moveHeight + scrollPos >= stopPos) {
		$moveBox.css({'position':'relative', 'top': holdPos});
	}
	if (scrollPos < formPos) {
		$moveBox.css({'position':'relative', 'top': 0});
	}
});

function flashForm(msg){
	if(clicked == 1) {
		$('.flashbox').stop();
		clicked = 0;
	}
	clicked = 1;
	$('.flashbox').css('opacity', 1).animate({'opacity':0},2400, function(){
		clicked = 0;
	});
	$('[name="order_text"]').val(msg);
}

/* FLASHING INPUT v.2.1 */
function inputFlash(obj_cls, def_cls){
	var $obj = $('.' + obj_cls),
		type = 'type',
		pass = 'password',
		text = 'text';
	if($obj.length < 0) return;
	$obj.each(function(){
		var el = $(this);
		el.addClass(def_cls);
		if(el.attr(type) == pass){
			el.attr(type,text);
			el.data(type,pass);
		}
		el.focus(function(){
			el.removeClass(def_cls);	
			if (this.value == this.defaultValue){
				this.value = '';
				if(el.data(type) == pass){
					el.attr(type,pass);
				}
			}
		}).blur(function() {
			if ($.trim(this.value) == ''){
				el.addClass(def_cls);
				this.value = (this.defaultValue ? this.defaultValue : '');
				if(el.data(type) == pass){
					el.attr(type,text);
				}
			}
		});
	});
}
function order(){
	if ($('#order').length > 0) {
		$('#order').submit(function(){;
			var errs = 0;
			$('.req', this).each(function(){
				if($(this).val() == this.defaultValue || $(this).val() == ''){
					$(this).addClass('error');
					$('.error_box').html("Не все поля заполнены");
					errs++;
				} else {
					$(this).removeClass('error');
					//$('.error_box').empty();
				}
			});
			if (errs > 0) {
				return false;
			} else {
				$(this).ajaxSubmit({
						target: ".formbox",
						timeout: 3000,
						dataType: 'html',
						beforeSubmit:  function (formData) { 
							var queryString = $.param(formData);  
							return true;
						},
						error: function(){
							console.log('error');
						},
						success: function(data){
							$('.formbox').html('<p><b>Ваш заказ был отправлен!</b><br />В ближайшее время с вами<br />свяжутся по указанному номеру телефона.</p>');
						}
				});
				return false;
			}
		});
	}
}

var modal = {
	over : '#m-overlay',
	popup : '#modal',
	content: '.popup_content',
	init : function( _cont ){
		var $cont = $(this.content, this.popup);
		$(this.over).show();
		$(this.popup).show();
		$cont.empty();
		$( _cont ).appendTo($cont);//kjl
		this.start();
		this.pos($cont);
		$(window).resize(function(){
			modal.start();
		});
	},
	closed: function(){
		$(this.popup).hide();
		$(this.over).hide();
		$(this.content).children().appendTo('#hiden');
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

