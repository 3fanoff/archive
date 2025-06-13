var d = document;
$(function(){
	$('.topmenu .enter > a').click(function(){
		$(this).parent().toggleClass('active');
		if($('#overlay').data().open == true) {
			$('#overlay').animate({opacity:0}, function(){
				$(this).hide().data('open',false);
			});
		}
		return false;
	})
	$('#addwork.nologin').click(function(){
		$('.topmenu .enter').removeClass('active');
		$('.topmenu .enter > a').trigger('click');
		$('#overlay').show().animate({opacity: 0.5}, 'slow').data('open',true);
		$('.mybody, html').animate({scrollTop:0}, 'slow');
		return false;
	});
	disSubmit('enter_the_site');
	inputFlash('flash','nofocus');
	registration();
	
});
/* timeline */
function timeline(start, end){
		var month = new Array ("января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря");

		var start_d = start.slice(0,1) == 0 ? start.slice(1,2) : start.slice(0,2);
		var start_m = start.slice(3,4) == 0 ? start.slice(4,5) - 1 : start.slice(3,5) - 1;
		var start_y = start.slice(6);
		
		var end_d = end.slice(0,1) == 0 ? end.slice(1,2) : end.slice(0,2);
		var end_m = end.slice(3,4) == 0 ? end.slice(4,5) - 1 : end.slice(3,5) - 1;
		var end_y = end.slice(6);
		
		//var now = new Date();
		var now = new Date();
		now.toDateString()
		var startday = new Date(start_y, start_m, start_d);
		var endday = new Date(end_y, end_m, end_d);
		var s_e = endday - startday; // всего дней в мс
		var t_e = now - startday; // прошло дней в мс
		if (t_e <= 0) var t_e = 0;
		var s_e = (Math.round(s_e / 1000))/ 86400; // всего дней
		var t_e =  (Math.round(t_e / 1000))/ 86400; // прошло дней
		if (t_e >= s_e) var t_e = s_e = 1;
		var step = 230/s_e; 
		var pos = Math.round(t_e * step);
		d.getElementById("day-from").style.top = pos + 70 + 'px';
		d.getElementById("addwork").style.top = pos + 10 + 'px';
		d.getElementById("day-from").innerHTML = now.getDate() + ' ' + month[now.getMonth()];
		d.getElementById("day-to").innerHTML = end_d + ' ' + month[end_m];
}
/* disabled submit button */
function disSubmit(formid){
	var	btn = 'form#' +  formid + ' input[type="submit"]',
		dis = 'disabled',
		req = 'req';
	$(d).ready(function(){
		disabled('.' + req, '#' + formid);
	});
	$('.req', '#' + formid).keyup(function(){
		disabled('.' + req, '#' + formid);
	});
	
	function disabled(elem){
		$(elem).each(function(){
			if($(this).val() == this.defaultValue || $(this).val() == ''){
				$(btn).attr(dis, dis);
				return false;
			} else {
				$(btn).removeAttr(dis);
			}
		});
	}
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
function registration(){
	if ($('#registration').length > 0) {
	$('#registration').validate({
			submitHandler: function(form){
				$(form).ajaxSubmit({
					target: ".registration_zone",
					timeout: 3000,
					url: 'end_reg.html',
					dataType: 'html',
					error: function(){
						console.log('err');
					},
					success: function(data){
						var e_mail = $('[name="reg_email"]').val();
						$('.registration_zone').html(data).find('.mail').text(e_mail);
					}
				});
			},
			rules: {
				reg_email:			{
									required: true,
									email: true,
									// Проверка свободности e-mail
									/*remote: {
										url: "#",
										dataType: 'html',
										beforeSend: function(){
											$('[name="reg_email"]').parent().addClass('check');
										},
										success: function(){
											setTimeout(function(){
												$('[name="reg_email"]').parent().removeClass('check');
											}, 2000);
										}
									}*/
				},
				reg_email_repeat:	{required: true, email: true, equalTo: '[name="reg_email"]'},
				reg_pass: 			{required: true, minlength: 6},
				reg_pass_repeat: 	{required: true, equalTo: '[name="reg_pass"]'},
			},
			messages: {
				reg_email: {
					required: "Введите адрес",
					email: "Введите правильный адрес вида my@mail.ru",
					remote: "Адрес уже используется"
				},
				reg_email_repeat: {
					required: "Повторите адрес",
					email: "Введите правильный адрес вида my@mail.ru",
					equalTo: "Адреса не совпадают"
				},
				reg_pass: {
					required: "Введите пароль",
					minlength: "В пароле менее шести символов"
				},
				reg_pass_repeat: {
					required: "Повторите пароль",
					equalTo: "Пароли не совпадают"
				}
   			},
			errorClass: "error",
			errorElement: "span",
			errorPlacement: function(error, element) {
				element.parent().find('.error_set').append(error.addClass('error_box'));
			}
	});
	}
}

