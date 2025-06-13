$(document).ready(function(){
	$('#top_menu').find('.active').append('<span class="arrow"></span>');//add arrow to active menu item
	submenuHeight('.left_menu ul','selected');//selected item
	if($('#carousel').length > 0) {
		setTimeout(function(){
			$('#carousel').carouselme({});//carousel on main page
		},1);
	}
	if($('.card_carousel').length > 0) {
		setTimeout(function(){
			$('.card_carousel').carouselme({
				visible: 3
			});
		},1);
	}
	$('.changeval').each(function(){
		var input = $(this).find('input[type="text"]');
		if (input.val() == "NaN"){
			input.val('1')
		}
		$('.minus',$(this)).click(function(e){
			e.preventDefault();
			changevalue(-1,input)
		});
		$('.plus',$(this)).click(function(e){
			e.preventDefault();
			changevalue(1,input)
		});
	})
	selectstyle();
	changecolor('span.changecolor');
});
function submenuHeight (boxname,selclass){
	setTimeout(function(){
		var inner_ul = 0,
			addpx = 10,
			sel_h = $('.' + selclass,boxname).height();
		$('.' + selclass + ' ul > li',boxname).each(function() {
			$(this).css({
				'height':$(this).height()
			});
			inner_li = $(this).outerHeight(true);
			inner_ul += inner_li; 
		});;
		$('.' + selclass,boxname).css('margin-bottom',inner_ul + addpx)
		$('.' + selclass + ' ul',boxname).css('top',sel_h);
	},2);
}
function changevalue (value,input){
	var sum = parseInt(input.val())+parseInt(value);
	sum < 1 || input.val()=="NaN" ? sum = 1 : sum;
	input.val(sum)
}
function selectstyle (){
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
	$("select").each(function(){
		var $this = $(this),
			$select = "";
		$this.wrapAll('<div class="select_block"/>');
		$this.children('option').each(function(){
			$select += '<div class="option" value="'+ $(this).val() +'">' + $(this).text() + '</div>';
		});
		var imul = '<div class="select_imul">\
						<div class="select_selected">\
							<div class="selected_text">' + $("option:first", $this).html() + '</div><div class="selected_arrow"></div>\
						</div>\
						<div class="select_options">' + $select + '</div>\
					</div>';
		$this.before(imul);
	});
}
function changecolor(el){
	 $(el).each(function() {
		var state = $(this).closest('.sizes'),
			inputart = $('.changecolor input.art', state),
			selblock = '.select_color .box';
		$('body').click(function() {
        	$(selblock).hide();
		});
		$(selblock + ',' + el).click(function(e) {
			e.stopPropagation();
		});
        $('a',$(this)).click(function(e){
			e.preventDefault();
			$(this).parent().next().find('.box').toggle();
		});
		insertcolor(state);
		
		function insertcolor(context){
			$('.c-color span',context).click(function(){
				var colornum = $(this).text();
				inputart.val(colornum);
			});
		}
    });
}