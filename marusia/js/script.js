$(document).ready(function(){
	setTimeout(function(){
		if ($('#index_blocks').length > 0){
			var right_height = $('#index_blocks .right').height();
			$('#index_blocks .left').css({'min-height':right_height});
		}
	},500);
	
	inputFlash('pholder','nofocus');
	
	if($('form#subscribe').length > 0) {
	$('form#subscribe').validate({
		submitHandler: function(form){
    		$(form).ajaxSubmit({
				target: 'form#subscribe',
				timeout: 3000/*,
				success: function() {
	                $(this).html('<p>Спасибо! Заявка принята</p>');
	            }*/
			});
    	},
		focusInvalid: false,
    	focusCleanup: true,
		rules: {
			subscribe:		{required: true, email: true}
		},
		messages: {
			subscribe:		{
				required: 	"Введите адрес",
				email: 		"Введите правильный адрес вида mail@server.ru"
			},
		}
	});
	}
	if($('form[name="sign_up_training"]').length > 0) {
	$('form[name="sign_up_training"]').validate({
		submitHandler: function(form){
    		$(form).ajaxSubmit({
				target: 'form[name="sign_up_training"]',
				timeout: 3000/*,
				success: function() {
	                $(this).html('<p>Спасибо! Заявка принята</p>');
	            }*/
			});
    	},
		focusInvalid: false,
    	focusCleanup: true,
		rules: {
			training:		{required: true},
			trainingDate:	{required: true},
			appFirstName: 	{required: true},
			appLastName: 	{required: true},
			appEmail:		{required: true, email: true},
			appTel: 		{required: true},
			appCity: 		{required: true}
		},
		messages: {
			training:		"Выберите тренинг",
			trainingDate:	"Выберите дату тренинга",
			appFirstName: 	{
				required: 	"Пожалуйста введите имя", 
				digits: 	"Только буквы!"
			},
			appLastName: 	{
				required: 	"Пожалуйста введите фамилию", 
				digits: 	"Только буквы!"
			},
			appEmail:		{
				required: 	"Введите адрес",
				email: 		"Введите правильный адрес вида mail@server.ru"
			},
			appTel: 		"Введите телефон",
			appCity: 		"Введите город"
   		}
	});
	}
	if($('form[name="order_books"]').length > 0) {
	$('form[name="order_books"]').validate({
		submitHandler: function(form){
    		$(form).ajaxSubmit({
				target: '#cartBox',
				timeout: 3000
			});
    	},
		focusInvalid: false,
    	focusCleanup: true,
		rules: {
			orderFio:		{required: true},
			orderCountry:	{required: true},
			orderIndex: 	{required: true, digits:true, maxlength: 6, minlength: 6},
			orderCity: 		{required: true},
			orderStreet:	{required: true},
			orderEmail: 	{required: true, email: true},
			orderTel: 		{required: false},
			orderComm: 		{required: false}
		},
		messages: {
			orderFio:		"Представьтесь, пожалуйста",
			orderCountry:	"Ваша страна",
			orderIndex:		{
				required: 	"Введите индекс",
				digits: 	"Только цифры!",
				maxlength: 	"Не более 6 цифр",
				minlength: 	"Не менее 6 цифр"
			},
			orderCity: 		"Ваш город",
			orderStreet: 	"Введите адрес",
			orderEmail:		{
				required: 	"Введите адрес",
				email: 		"Введите правильный адрес вида mail@server.ru"
			}
   		}
	});
	removeForm();
	
	}
		
});
/* FLASHING INPUT v.3.0 */
function inputFlash(obj_cls, def_cls){
	var $obj = $('.' + obj_cls),
		type = 'type',
		pass = 'password',
		text = 'text';
	if($obj.length < 0) return;
	$obj.each(function(){
		var el = $(this);
		var val = el.attr('rel'); 
		var form = el.parents('form');
		if(this.value == ''){
			el.val(val).addClass(def_cls);
		}
		if(el.attr(type) == pass){
			el.attr(type,text).data(type,pass);
		}
		el.bind('focus.pholder', function(){
			el.removeClass(def_cls);	
			if (this.value === val){
				this.value = '';
				if(el.data(type) == pass){
					el.attr(type,pass);
				}
			}
		}).bind('blur.pholder', function() {
			if ($.trim(this.value) === ''){
				el.val(val).addClass(def_cls);
				//this.value = (this.defaultValue ? this.defaultValue : '');
				if(el.data(type) == pass){
					el.attr(type,text);
				}
			}
		});
		form.bind('submit.pholder', function(){
			//console.log(el.val(),val);
			if (el.val() == val) el.val('');
		});
	});
}

function removeForm(){
	if(SHK.data.items_total <= 0){
		$('form[name="order_books"]').remove();
	} else {
		remForm = setInterval(function(){
			console.log('cat');
			if(SHK.data.items_total <= 0){
				clearInterval(remForm);
				$('form[name="order_books"]').fadeOut(400,function(){
					$(this).remove();
				});
			}
		}, 2000);
	}
}
