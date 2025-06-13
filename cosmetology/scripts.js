// JavaScript Document
$(document).ready(function(){
	dropdownHover();
	setTimeout(function(){
		colHeight();
	},300);
	radioClick();
	popup.popupStart();
	rate();
	fileType();
	selectStyle();
});
$(window).resize(function(){
	popup.popupStart();
});

function dropdownHover(){
	var cls = 'active';
	$('#dropdown-menu dl').hover(function(){},function(){
		$(this).find('.'+cls).removeClass(cls);
	});
	$('#dropdown-menu dt a').hover(function(e){
		var obj = $(this).parent();
		obj.addClass(cls).siblings('dt').removeClass(cls);
		obj.next('dd').addClass(cls).siblings('dd').removeClass(cls);
		e.stopPropogation();
	});
}

function colHeight(){
	var $l_col = $('#main_body > .left_col'),
		$r_col = $('#main_body > .right_col');
	if($l_col.length > 0 && $r_col.length > 0){
		var l_height = $l_col.height(),
			r_height = $r_col.height();
		if(l_height >= r_height){
			$r_col.css('min-height',l_height);
		} else {
			$l_col.css('min-height',r_height);
		}
	}
}

function radioClick(){
	var act = 'act';
	$('input.rc').on('load_rc',function(){
		customize();
	});
	$('input.rc').trigger('load_rc');
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
	$('input.rc:checked').next().addClass(act);
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

var popup = {
	popupInit : function(pup,cont){
		var $over = $('#overlay'),
			$pop_cont = $(pup+' .popup_content');
		$(pup).show();
		$over.show();
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
		var body_w = $('body'),
			win = $(window),
			$over = $('#overlay'),
			body_width = body_w.width(),
			win_height = win.height();
			//win_width = win.width();
		$over.css({
			'width':body_width,
			'height':win_height,
			'opacity':0.7
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

function rate(){
	if($('#rate').length > 0){
		$rate_s = $('#rate a');
		$rate_s.click(function(){
			var rval = $(this).attr('title');
			$(this).addClass('curr').siblings('.curr').removeClass();
			$(this).parent().next('input').val(rval);
		});
		$rate_s.hover(function(){
			id_rate = $(this).attr('id');
			$(this).parent().removeClass().addClass(id_rate);
		},function(){
			var cur_id = $('#rate a.curr').attr('id');
			$(this).parent().removeClass().addClass(cur_id);
		});
	}
}

function fileType(){
	$('.file-rep').click(function(){
		$obj = $(this).parent().prev('input[type="file"]');
		$obj.click();
		$obj.change(function(){
			file = $(this).val();
			$(this).next().find('input').val(file);
		});
	});
}

function selectStyle(){
	var imul_b = 'select_imul',
		opts_b = 'select_options',
		selenter = false;
	$(document).on('click', '.' + imul_b, function() {
		var $this = $(this);
		$('.' + imul_b).removeClass('act');
		$this.addClass('act');
		if ($('.' + opts_b, $this).is(':visible')) {
			$('.' + opts_b).hide();
		} else {
			//$('.' + opts_b).hide();
			$('.' + opts_b, $this).show(); 
		}
	});
	$(document).on('click', '.' + opts_b + ' .option', function() {
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
	$(document).on('mouseenter', '.' + imul_b, function() {
		selenter = true;
	});
	$(document).on('mouseleave', '.' + imul_b, function() {
		selenter = false;
	});
	$(document).click(function() {
		if (!selenter) {
			//alert('12');
			$('.' + opts_b).hide();
			$('.' + imul_b).removeClass('act');
			console.log('start');
		}
	});
	//creation of imitation of the SELECT
	constructor($('select'));
	$(document).on('change','select option',function(){
		var isobj = $(this).parent();
		constructor(isobj);
	});
	function constructor(obj){
		$.each(obj,function(){
			var $this = $(this),
				$select = "",
				pos = 0;
			
			$this.children('option').each(function(){
				pos += 1;
				//pos == 1 ? dis = 'style="display:none"': dis = '';
				$select += '<div class="option" value="'+ $(this).val() +'">' + $(this).text() + '</div>';
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
