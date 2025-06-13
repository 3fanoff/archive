// JavaScript Document
$(function(){
	footerSize();
	selectStyle();
	toggleBoxes();
	if($('#slider').length >0 ){
		$('#slider').sliderme({
			start:2,
			speed:300,
			pagiclass: 'pagislides'
		});
	}
	flashInput();
	popup.popupStart();
	rowLink();
	addToFav();
	radioClick();
	cMenu();
	payType();
	/*$('img').click(function(){
		$(this).after('<input type="checkbox" class="radio rc" value="3" id="ad_dog2" name="ad_dog2"/>');
		$(this).next().trigger('load_rc');
	});*/
});
$(window).resize(function(){
	popup.popupStart();
});
function footerSize (){
	var footer_height = $('#footer').outerHeight(true);
	$('#sp_footer').css('height',footer_height);
}
function selectStyle (){
	var imul_b = 'select_imul',
		opts_b = 'select_options',
		selenter = false;
	$('.' + imul_b).live('click', function() {
		var $this = $(this); 
		$('.' + imul_b).removeClass('act');
		$this.addClass('act');
		if ($('.' + opts_b, $this).is(':visible')) {
			$('.' + opts_b).hide();
		} else {
			$('.' + opts_b).hide();
			$('.' + opts_b, $this).show();
		}
	});
	$('.' + opts_b + ' .option').live('click', function() {
    	//insert selected value in DIV
		var $this = $(this),
    		opttext = $this.html(),
			optval = $this.attr('value');
    	$this.parents('.' + imul_b).find('.selected_text').html(opttext);
    	//activ. current value
		$this.addClass('sel').siblings().removeClass('sel');
    	//insert attr. in OPTION
    	optval = typeof(optval) != 'undefined' ? optval : opttext;
		$this.parents('.select_block').find('option').removeAttr('selected').each(function() {
			if ($(this).val() == optval) {
				$(this).attr('selected', 'select');
			}
		});
	}); 
	$('.' + imul_b).live('mouseenter', function() {
		selenter = true;
	});
	$('.' + imul_b).live('mouseleave', function() {
		selenter = false;
	});
	$(document).click(function() {
		if (!selenter) {
			$('.' + opts_b).hide();
			$('.' + imul_b).removeClass('act');
		}
	});
	//creation of imitation of the SELECT
	constructor($('select'));
	$("select option").live('change',function(){
		var isobj = $(this).parent();
		constructor(isobj);
	});
	function constructor(obj){
		$.each(obj,function(){
			var $this = $(this),
				$select = "",
				pos = 0;
			
			$this.children('option').each(function(){
				pos += 1
				pos == 1 ? dis = 'style="display:none"': dis = '';
				$select += '<div class="option" value="'+ $(this).val() +'"'+dis+'>' + $(this).text() + '</div>';
			});
			var imul_opts = '<div class="select_options">' + $select + '</div>';
			//add or replace
			if ($this.parents('.select_block').length <=0){
				$this.wrapAll('<div class="select_block"/>');
				var imul = '<div class="select_imul">\
							<div class="select_selected">\
								<div class="selected_text">' + $("option:first", $this).html() + '</div><div class="selected_arrow"></div>\
							</div>\
						</div>';
				$this.before(imul);
				$this.prev().append(imul_opts);
			} else {
				var sel_val = $this.prev().find('.sel').attr('value');
				$this.prev().find('.select_options').replaceWith(imul_opts);
				$this.prev().find('.option[value="'+sel_val+'"]').addClass('sel');
			}
		});
	}
	
}
function toggleBoxes(){
	var par_box = $('.toggle_boxes');
	par_box.find('dt').click(function(){
		var a_cls = 'active';
		$(this).siblings('dt.'+a_cls).removeClass(a_cls).next('dd').slideToggle(200);
		$(this).toggleClass(a_cls).next('dd').slideToggle(200);
	});
	par_box.find('.title.toggle').click(function(){
		$(this).toggleClass('active').parent().find('.container').slideToggle(200);
	});
}
/*****************POPUP*****************/
var popup = {
	popupInit : function(pup,cont,ttl){
		var $over = $('#overlay'),
			$pop_cont = $(pup+' .popup_content');
		$(pup).show();
		$over.show();
		$(pup+' .head span').text(ttl);
		$pop_cont.empty();
		$(cont).clone(true).appendTo($pop_cont);
		popup.popupPos(pup,cont);
	},
	popupClose: function(pup){
		var $over = $('#overlay');
			$(pup).hide();
			$over.hide();
	},
	popupStart: function(){
		var body_w = $('body.mybody'),
			win = $(window),
			$over = $('#overlay'),
			body_width = body_w.width(),
			win_height = win.height(),
			win_width = win.width();
		$over.css({
			'width':body_width,
			'height':win_height,
			'opacity':0.3
		})
	},
	popupPos: function(pup,cont){
		var popup = $(pup),
			popcont = $(cont);
			left_pos = popcont.outerWidth(true)/2,
			top_pos = popcont.outerHeight(true)/2;
		popup.css({'margin-left':-left_pos,'margin-top':-top_pos});
	}
}
/*temporary link script*/
function rowLink(){
	$('.trow .link').bind('click.go', function(){
		var go_to = $(this).attr('href');
		window.location.hash = go_to;
	});
	$('.trow').click(function(){
		$(this).find('.link').trigger('click.go');
	});
}
function addToFav(){
	$('.add_fav').click(function(e){
		e.stopPropagation();
		var $this = $(this); 
		if (!$this.hasClass('added')){
			$this.parent().addClass('added');
		}
	});
}
function toggleMap(obj,height){
	obj = $(obj);
	obj_cnt = obj.parents('.map_box');
	$('.ymap',obj_cnt).animate({'height':height+'px'},500);
}
function flashInput(){
	//$('input[type=text]').addClass('nofocus');
	$('input[type=text]').focus(function(){
		//$(this).removeClass("nofocus");
		if (this.value == this.defaultValue){
			this.value = '';
		}
	});
	$('input[type=text]').blur(function(){
		//$(this).addClass('nofocus');
		if ($.trim(this.value) == ''){
			this.value = (this.defaultValue ? this.defaultValue : '');
		}
	});
}
function fileType(obj){
	obj = $(obj);
	obj.prev('input[type="file"]').click();
}
function radioClick(){
	var act = 'act';
	$('input.rc').live('load_rc',function(){
		customize();
	});
	$('input.rc').trigger('load_rc');
	$('.rcbtn').live('click',function(){
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
	$('input.rc:checked').next().addClass(act);
	$('label').live('click',function(){
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
function customize(){
		$('input.rc').each(function() {
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
function cMenu(){
	$('.c_menu').hover(function(){
		$(this).children('a').addClass('active').next('ul').show();
	},function(){
		$(this).children('a').removeClass('active').next('ul').hide();
	});
}

function payType(){
	$('.enter_way .way').click(function(){
		var $obj = $(this),
			$act = 'active';
		if (!$obj.hasClass($act)){
			var cls = $obj.addClass($act).attr('class').split(' ')[1];
			$obj.siblings('.'+$act).removeClass($act);
			$('.enter_type.'+cls).show().siblings('.enter_type').hide();
		}
	});
}


