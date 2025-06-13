// OMG!!
$(document).ready(function(){
	var bodysize = $(window).outerWidth();//width of <body>
	var arrow = "<span class='arrow'></span>"
	var service_in_arrowpath = $('#service_in ul li.parent.over')
	var ulwd = 0
	
	//TOPMENU in center
	$('#top_menu > ul > li').each(function(){
		ulwd += $(this).outerWidth();
	});
	$('#top_menu ul:first').css("width",ulwd+1);
	
	//SEPARATOR start-width
	if (bodysize > 960){
		$('.separator_bar').css({'width': bodysize, 'margin-left': -bodysize/2, 'left': 480});
	}
	
	//TOPMENU hover
	$('#top_menu ul li.parent').hover(
		function(){
			var owd = $(this).outerWidth()
			$(this).addClass('over').css({'width':owd}).prepend(arrow);
		},
		function(){
			$(this).removeClass('over').css({'width':'auto'});
			$('#top_menu ul li.parent span.arrow').remove();
	})
	
	//IN SERVICE MENU arrow
	service_in_arrowpath.children('a').prepend(arrow);
	//.css({'width':service_in_arrowpath.outerWidth()})
	
	//CAROUSEL
	$('#carousel').jcarousel({
    	wrap: 'circular',
		scroll: 1,
		auto: 3
    });
	
	//TEXT-INDENT P in response
	$('.resp_serv .textcloud').find('p:first').css('text-indent',50);
	
	//FAQ
	if (navigator.userAgent.match('MSIE 6.0')){
		$('.faq ul li p').show();
	}
	else {
		$('.faq ul li span').click(function(){
			$(this).parent().find('p').slideToggle("fast");
		});
	}
	
	//TABS
	$('#tabs.tabs_block div a').click(function(){
		if ($(this).parent('div').hasClass('noact')) {
			$(this).parent().removeClass('noact').addClass('act').siblings().addClass('noact').removeClass('act');
		}
		var tab_n = $('#tabs.tabs_block div.tab').index($(".act"));
		$('.show_tab_block div.tab_zone').eq(tab_n).show().animate({'height':'auto'}).siblings('.tab_zone').hide();
	});
	
	//INPUT onfocus
	$('input.email[type="text"]').addClass('nofocus');
	$('input.email[type="text"]').focus(function(){
		$(this).removeClass("nofocus");//.addClass('focus');	
		if (this.value == this.defaultValue){
			this.value = '';
		}
		if (this.value != this.defaultValue){
			this.select();
		}
	});
	$('input.email[type="text"]').blur(function() {
		$(this).addClass('nofocus');//.removeClass('focus');
		if ($.trim(this.value) == ''){
			this.value = (this.defaultValue ? this.defaultValue : '');
		}
	});
	
	//TAGS LIST
	/*
	$('.tags .filter a').not('.act').click(function(){});*/
	//OPEN COMMENT FORM
	$("#toggle_form").click(function(){
		$('#comment_block .form').slideToggle("fast");
	});
	
});

//SEPARATOR WIDTH
$(window).bind("resize",function(){
			var bodysize = $(window).outerWidth();
			if (bodysize > 960){
				$('.separator_bar').css({'width': bodysize,'left': 480, 'margin-left': -bodysize/2});
			}
			else {
				$('.separator_bar').css({'width': 960,'left': 0, 'margin-left':0});
			}
});