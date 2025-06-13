//LIST ORDER
$(document).ready(function(){
		$("div.you_order a").click(function(){
				$("#list_open").toggle();
		});
});
//DELIVERY FORM
$(document).ready(function(){
		if($("#order-form-delivery-2").is(":checked")){
				$("#adress_block").hide().next('div').removeClass("total-deliv");
			}
		$("#order-form-delivery-2").click(function(){
				$("#adress_block").hide().next('div').removeClass("total-deliv");
		});
		$("#order-form-delivery-1").click(function(){
				$("#adress_block").show().next('div').addClass("total-deliv");
		});
});
//ADD COMMENT FORM
$(document).ready(function(){
		$("#order-form-addcomment").click(function(){
				$("#order-form-comment_text").toggle();
		});
});
//MAILING CHECKBOXES
$(document).ready(function(){
		$("a.change").click(function(){
			$(this).closest('ul').hide();
			$("#mailing").show();
		});
});
//DETAILS DESCRIPTION OF ORDER
$(document).ready(function(){
		$('p.open_box a').click(function(){
			var $string1 = "Подробное описание заказа",
				$string2 = "Скрыть подробное описание заказа";
			$(this).parent().next().toggle();
			if($(this).text() == $string2){
				$(this).text($string1);												
			}
			else {
				$(this).text($string2);
			}
		});
});
//CALL CANCELLED FORM
$(document).ready(function(){
		$('a.call-form').click(function(){
			$(this).parents('.order_list').hide().next().show();
			//$(this).parents('.order_list').next().show();
		});
});
//DECIDE - CANCELLED FORM
$(document).ready(function(){
		$('input.decide').click(function(){
			$(this).parents('.order_cancelled').hide().prev().show();
			//$(this).parents('.order_cancelled').prev().show();
		});
});
                             