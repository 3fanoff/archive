// JavaScript Document
$(function(){
	simple_flashingInputs();
	toggleDropdown();
	itemBorders();
	initSlideshow();
	autoClear();
	initcatMenu();
	title_transform();
	labelClick();
	initTrackbar();
	button_transform('btncls');
	setTimeout(function(){
		initFaqOps();
		initCarousel();
		pagingWidth();
	},1);
	initErrorBckg();
});

/*
	SIMPLE FLASHING INPUTS
*/
function simple_flashingInputs(){
	var pholders = [];//empty array
	$(".placeholder").each(function(i){
		pholders[i] = $(this).val();
		//get focus
		$(this).focus(function(){
			if ($(this).val() == pholders[i]) {
				$(this).val("");
			}
		//lost focus
		}).blur(function(){
			if ($.trim($(this).val()) == "") {
				$(this).val(pholders[i]);
			}
		});
	});
}

/*
	TOGGLE DROPDOWN BOX FOR BASKETS
*/
function toggleDropdown(){
	$("body").click(function() {
		$(".u_basket .dropdown_box").hide();
	});
	$(".u_basket .clicker, .dropdown_box").click(function(e){
		e.stopPropagation();//not to close by click on .clicker
	}); 
	$(".u_basket .clicker").click(function(){
		$(this).next().toggle();
	});
}

/*
	MENU ITEM BORDERS
*/
function itemBorders(){
	var menu_item = $("#menu_top li a");
		item_noactive =	menu_item.parent().not('.active');
		
	menu_item.before("<span class='l_side'></span><span class='r_side'></span>");//insert span's before item
	item_noactive.hover(function(){
		$(this).addClass('over');
	},
	function(){
		$(this).removeClass('over');
	});
}

/*
	SLIDESHOW
*/
function initSlideshow(){
	if($("#slides").length>0){
		$("#slides").slides({
			effect: 'fade',
			fadeSpeed: 0,
			play: 5000,
			pause: 2500,
			generatePagination: false,
			generateNextPrev: true
		});
	}
}

/*
	CAROUSEL
*/
function initCarousel(){
	if($("#carousel").length>0){
		$("#carousel").show().jcarousel({
			vertical: true,
			scroll: 1,
			auto: 3,
			wrap: 'circular',
			buttonNextHTML: '<a href="javaScript:void(0);"></a>',
			buttonPrevHTML: '<a href="javaScript:void(0);"></a>'
		});
	}
}

/*
	CATALOG_LIST AUTO CLEAR
*/
function autoClear(){
	if($('.mainpage-catalog').length>0){
		$(".mainpage-catalog ul > li.parent:nth-child(4n)").after("<li class='clear'></li>");
	}
	return false
}

/*
	FAQ_BLOCK TOGGLE QUESTIONS AND SIZE
*/
function initFaqOps(){
	$(".faq_block .title").click(function(){
		$(this).parent().addClass("open")
						.siblings(".open").removeClass();
	});
	//height blocks function
	var faqsize = $(".faq_block").height();
		newssize = $(".news_block").height();
	if (newssize >= faqsize){
		$(".faq_block").css({"min-height":newssize});
	}
	return false;
}

/*
	SELECT_CATEGORY MENU
*/
//show sub-categories function (no mikhail)
function initcatMenu(){
	$(".category-col li a,.subcategory li a").not(".clickable").click(function(){
		var parent = $(this).parents("ul").parent(),
			index = $(this).parent().index(),
			block = $(this).parents(".block"),
			subCat = $(parent).find(">.subcategory-holder");
		$(this).parents("ul").find(".active").removeClass("active");
		$(this).addClass("active");
		subCat.filter(".subcategory-holder:visible").find(".active").removeClass("active");
		$(".activeSub",parent).hide().removeClass("activeSub");
		subCat.eq(index).show().addClass("activeSub");
		return false;
	});
	//toggle menu
	$(".select-category .opener").click(function(){
		$(this).toggleClass("close").parent().next().slideToggle();
	})
}

/*
	H1 TRANSFORM u002E(dot)
*/
function title_transform(){
	$('h1').each(function(){ //multiply h1 protection
		if($(this).text().match(/\.\s/)){ //check on "point & space" existence
			var parts = $(this).text().split(".");//create array
			if (parts.length > 1){
				var trnsf_no = parts[0];
					trnsf = parts.slice(1).join(".");
				$(this).html(trnsf_no + ".<span class='sub'>" + trnsf + "</span>");//insert result
			}
			return false
		}
		return false
	});
}

/*
	PAGING CLASS WIDTH
*/
function pagingWidth(){
	var perpg_w = $('.perpage').outerWidth(true);
		pages_sum = 0;
	$('.paging ul li').each(function(){
		pages_sum += $(this).outerWidth(true);
	});
	$('.paging').width(pages_sum + perpg_w);
}

/*
	FILTER
*/
function labelClick(){
	var act = 'active';
	$('*[class$="_sizes"] label').click(function(){
		var attrval = $(this).prev().attr("type");
		if (attrval == 'radio'){
			$(this).addClass(act).siblings().removeClass(act);
		}
		if (attrval == 'checkbox'){
			$(this).toggleClass(act);
		}
		$(this).prev().click();
		return false
	})
	$('*[class$="_sizes"] input:checked').next().addClass(act);
	//choose your color
	$('.get_colors li').click(function(){
		var lipos = $(this).index();
		$(this).addClass(act).siblings().removeClass(act).parents('.get_colors').find('input:eq('+lipos+')').click();
	})
	
}
function resetFilterGroup(cls){
		$('.'+cls+' input[type="checkbox"]').removeAttr('checked')
											.next('label')
											.removeClass('active');
}

/*
	TRACKBAR
*/
function initTrackbar(){
	if($('#trackbar').length>0){
		$('#trackbar').trackbar({
			onMove : function() {
				$("#from_").val(this.leftValue);
				$("#to_").val(this.rightValue);
				$(".from_cost").text(this.leftValue);
				$(".to_cost").text(this.rightValue);
			},
			dual : true, // two intervals
			width : 155, // px
			leftLimit : 99, // unit of value
			leftValue : 999, // unit of value
			rightLimit : 99999, // unit of value
			rightValue : 45990 // unit of value
		});
	}
	$('.filter_cost').prev('.reset').click(function(){
			//initTrackbar();
	});
}

/*
	SENDBUTTON TRANSFORM
*/
function button_transform(tcls){
	var button_id = 0;
	$("." + tcls).each(function(){
		if ($(this).is(':input')){
			var valtxt_button = $(this).val();
		} else {
			var valtxt_button = $(this).text();
		}
		var class_button = $(this).attr("class");
			button_id += 1;//number this tag has class "btncls"
			html_button = '<div class="btn ' + class_button + '" id="btn_' + button_id + '">\
						<div class="r_bord"></div>\
						<div class="flow"></div>\
						<p>' + valtxt_button + '</p>\
						<span class="icon"></span>\
						<span class="arrow"></span>\
						</div>';//code at button
			result_button = $(this).before(html_button).appendTo("#btn_" + button_id + "");
		return result_button
	});
}

/*
	ERROR PAGE BACKGROUND
*/
function initErrorBckg(){
	if($('#error_box').length>0){
		$('.mybody').addClass('error_page');
	}
	return false
}





