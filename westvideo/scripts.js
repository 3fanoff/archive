$(function(){
	slider('#slider');
	openSearch('#open_search');
	hoverFilm('film_list');
	hoverFilm('dvd_list');
	hoverFilm('movie_list');
	hoverFilm('press_list');
	cinemaShadows();
	//cinemaHeight('#cinema div[id$="-tab"]','cinema_height');
	$('#movies-tab, #dvd-tab').data('scroll','on');
	show_tab('movies');
	show_tab('cinema_02');
	show_tab('all');
	calendar('#outside-calendar');
	newsLoad();
	movie_cnttToggle('movie_news','_test/movie_news.html');
	movie_cnttToggle('files-press','_test/press.html');
	movie_cnttToggle('posters-press','_test/press.html');
	movie_cnttToggle('images-press','_test/press.html');
	movie_cnttToggle('videos-press','_test/press.html');
	media_tab('video1');
	
	var photos = '.fancy_gallery',
		videos = '.fancy_vids';
	if($(photos).length > 0){
		$(photos).fancybox({
			prevEffect: 'elastic',
			nextEffect: 'elastic',
			maxHeight: 700,
			helpers: {
				title: {
					type: 'outside'
				},
				thumbs: {
					width: 80,
					height: 80
				}
			}
		});
	}
	if($(videos).length > 0){
		$(videos).fancybox({
			helpers: {
				title: {
					type: 'outside'
				}, 
				thumbs: {
					width: 120, 
					height: 70,
					source: function(item){
						var href = $(item.href).find('img').attr('src');
						return href;
					}
				}
			},
			afterClose: function(){
				$('#video_nav li a:first').click();
			}
		});
	}
	authToggle();
	authForms();
	assetsLoad();
	movieInfo();//23.05.2013
	//darkBG();
});

function openSearch(obj){
	$(obj).click(function(e){
		var $obj_box = $(obj).next('.box');
		e.stopPropagation();
		$(this).toggleClass('active').next('.box').slideToggle('fast').find('input[type="text"]').focus();
		
		$('.mybody').click(function(e){
			$obj_box.slideUp('fast');
		});
		$obj_box.click(function(e){
			e.stopPropagation();
		});
	})
}
function hoverFilm(cls){
	if (typeof(cls) == 'undefined' || $('.' + cls).length == 0) return;
	var selector = '.' + cls + ' li a',
		over = function(){
			return $(this).parents('li').find('a');
		}
	$(document).on('mouseenter', selector, function(){
		over.call(this).addClass('over');
	});
	$(document).on('mouseleave', selector, function(){
		over.call(this).removeClass('over');
	});
	
}
function cinemaShadows(){
	if ($('.cinema_list').length == 0) return;
	$('.cinema_list ul').each(function(){
		$(this).children('li:first').before('<div />');
		$(this).children('li:last').after('<div />');
	});
}
function show_tab(tab){
	if ($('#' + tab + '-tab').length == 0) return;
	
	$('div[id$="-tab"]').hide().data('status','');
	$('#' + tab + '-tab').show().data('status','act');
	$('li[id$="-button"]').removeClass('active');
	$('#' + tab + '-button').addClass('active');
		
	if ($('#' + tab + '-tab').data('status') == 'act' && $('#' + tab + '-tab').data('scroll') == 'on'){
			engine.init(null, $('#' + tab + '-tab').find('.load-box'), '#' + tab + '-tab');
	} else return;
	//window.history.replaceState('object or string', 'Title', '/' + tab + '/');
}

/* MEDIA_TABS */
function media_tab(tab){
	if ($('#' + tab + '-container').length == 0) return;
	
	$('#video_tabs [id$="-container"]').hide();
	$('#' + tab + '-container').show();
	var id_video = $('#' + tab + '-container').find('video').attr('id');
	$('#video_tabs video').each(function(){
		id_video = $(this).attr('id');
		_V_(id_video).pause();
	});
	
	$('#video_nav a#' + tab + '-button').parent().addClass('current').siblings().removeClass('current');
}
function cinemaHeight(obj, cls){
	if ($(obj).length == 0) return;
	
	var maxbox = 0;
	$(obj).each(function() {
        maxbox = Math.max(maxbox, $(this).outerHeight(true));
    });
	$('#cinema .cinema_box').wrap('<div class="' + cls + '" />');
	$('.' + cls).height(maxbox);
}
/* CALENDAR */
function calendar(obj){
	if ($(obj).length == 0) return;
	$(obj + ' a').append('<span/>');
	$(obj + ' a').click(function(e){
		e.preventDefault();
		var $this = $(this),
			sibling =  $this.parent().siblings(),
			cur_cls = 'current',
			act_cls = 'act',
			sibfind = function(cls){
				sibling.find('.' + cls).removeClass(cls);
			};
			
		if ($this.next('ul:hidden').length > 0 && !$this.hasClass(cur_cls)){
			$this.next().slideDown(300);
			sibfind(act_cls);
			sibling.find('ul:visible').slideUp(300);
			
		} else if (!$this.hasClass(cur_cls)){
			$this.closest('ul').prev().attr('class',act_cls);
			
			if ($this.parent().hasClass('first')){
				sibling.children().removeClass(act_cls).next('ul:visible').slideUp(300);
			}
			if ($this.hasClass(act_cls)){
				$this.attr('class',cur_cls).next().find('.' + cur_cls).removeClass(cur_cls);
			}
		}
		sibfind(cur_cls);
		$this.addClass(cur_cls);
	});
	//$('.calendar li.first a').click();
}
/* NEWS_LOAD */
function newsLoad(){
	$('.news_list_item .anchor').bind('click',function(e){
		e.preventDefault();
			var $this = $(this),
				text = $this.text(),
				news_box = $this.parents('.news_list_item');
			news_box.append('<div class="loader">');
			$this.unbind('click');
			
			$.ajax({
				url:'_test/news-01.html',
				dataType: 'html',
				success: function(data){
					setTimeout(function(){ //temp!
						content = data;
						news_box.append('<div class="news_content_box" />');
						news_box.find('.news_content_box').html(content).hide().slideDown(700);
						news_box.find('.loader').remove();
						$this.replaceWith(text);
					},1000);
				},
				error: function(){
					news_box.append('<p class="error">Не могу загрузить</p>');
				}
			});
	});
}
function movie_cnttLoad(obj, uri){
	$('#' + obj + '-load .anchor').bind('click',function(e){
		e.preventDefault();
		var $this = $(this),
			cntt_box = $('#' + obj + ' ul'),
			load_box = obj + '_load';
		$this.removeClass('anchor').unbind('click').parent().addClass('nolink');
		cntt_box.css('opacity',0.6).parent().append('<div class="loader" />');
		
		$.ajax({
			url: uri,
			dataType: 'html',
			success: function(data){
				setTimeout(function(){ //temp!
					var content = data;
					cntt_box.append('<div id="' + load_box + '">' + content + '</div>');
					$('#' + load_box).hide().slideDown(700);
					cntt_box.parent().find('.loader').remove();
					cntt_box.css('opacity',1);
				},1000);
			},
			error: function(){
				cntt_box.append('<li class="error">Не могу загрузить</li>');
			}
		});
	});
}
function movie_cnttToggle(obj,uri){
	if ($(obj).length == 0) return;
	movie_cnttLoad(obj, uri);
	//$(obj + '-load').addClass('nolink').children('a').removeClass('anchor');
}
function assetsLoad(){
	$('#assets .more a').bind('click',function(e){
		e.preventDefault();
		var $this = $(this),
			assets_box = $this.parents('.more').prev('.press_list').children('ul');
		$this.parents('.more').append('<div class="loader"/>');
		$this.unbind('click');
			
		$.ajax({
			url:'_test/press.html',
			dataType: 'html',
			success: function(data){
				setTimeout(function(){ //temp!
					var content = $(data);
					//console.log();
					assets_box.append(content);//.hide().slideDown(700);
					$this.parents('.more').remove();
				},1000);
			},
			error: function(){
				assets_box.append('<p class="error">Не могу загрузить</p>');
			}
		});
	});
}
/*function darkBG(){
	if ($('body.dark').length > 0){
		setPosBG = function(){
			logoX = $('#header .logo').offset().left;
			$('body.dark #wrapper').css({'background-position':(logoX-80) + 'px 0'});
		}
		setPosBG();
		$(window).resize(setPosBG);
	}
}*/
/* AUTH_BLOCK_TOGGLE */
function authToggle(){
	var context = '#auth_block',
		$cnt = $(context);
	cookieLoad();
	$('.toggle', context).click(function(){
		$cnt.toggleClass('open').children('.container').slideToggle();
		if ($cnt.hasClass('open')){
			$cnt.data('status', 'open');
		} 
		if (!$cnt.hasClass('open')) {
			$cnt.data('status', null);
		}
		cookieSave();
	});
	$('.ftype', context).click(function(e){
		e.preventDefault();
		var is = $(this),
			cls = is.data('form');
		if (!is.hasClass('show')){
			$cnt.attr('class', 'open ' + cls);
			//$cnt.data('form',cls);
			$('.formbox').slideUp();
			$('.ftype').removeClass('show');
			is.addClass('show').parent().next('.formbox').slideDown();
			cookieSave();
		}
	});
	function cookieSave(){
		$.cookie('open_status',$cnt.data('status'));
		//$.cookie('form_status',$cnt.data('form'));
	}
	function cookieLoad(){
		if (typeof($.cookie) == 'undefined') return;
		if ($.cookie('open_status') == 'open' || $cnt.hasClass('open')){
			$cnt.addClass('open').find('.container').show();
		} 
		/* open form save
		if($.cookie('form_status') == 'reg'){
			$cnt.addClass('reg').find('.formbox.reg').show();
		}
		if($.cookie('form_status') == 'log'){
			$cnt.addClass('log').find('.formbox.log').show();
		}
		*/
	}
}
/* REGISTRATION */
function authForms(){
	var regform = '#registration',
		authform = '#authorization',
		dis = 'disabled';
	if ($(regform).length > 0){
		
		/* VALIDATE */
		$(regform).clearForm().validate({
			submitHandler: function(form){
				$(form).ajaxSubmit({
					target: ".formbox.reg",
					timeout: 3000,
					success: function(){
						$(".formbox.reg").html('Ваши данные отправлены. После одобрения заявки вы получите письмо по адресу <br /><b>ivanpetrov@gmail.com</b>');
					}
				});
			},
			rules: {
				r_name:		{required: true},
				r_email:	{required: true, email: true},
				r_job: 		{required: false},
				r_pos: 		{required: false},
				r_pass1: 	{required: true, minlength: 3},
				r_pass2: 	{required: true, equalTo: "#r_pass1"},
				r_tel: 		{required: false}
			},
			messages: {
     			r_name: "Представьтесь, пожалуйста",
     			r_email: "Введите правильный адрес вида mail@server.ru",
				r_pass1: {
					required: "Введите пароль",
					minlength: "В пароле должно быть не менее трех символов"
				},
				r_pass2: {
					required: "Повторите пароль",
					equalTo: "Пароли не совпадают"
				}
   			},
			errorClass: "invalid",
			errorElement: "div",
			errorPlacement: function(error, element) {
				element.after(error);
			}
		});
		$(authform).clearForm().validate({
			submitHandler: function(form){
				$(form).ajaxSubmit({
					target: ".formbox.log",
					timeout: 3000,
					success: function(){
						window.location.reload();
					}
				});
			},
			rules: {
				a_email: {required: true, email: true},
				a_pass1: {required: true, minlength: 3}
			},
			messages: {
     			a_email: "Введите правильный адрес вида mail@server.ru",
				a_pass1: {
					required: "Введите пароль",
					minlength: "В пароле должно быть не менее трех символов"
				}
   			},
			errorClass: "invalid",
			errorElement: "div",
			errorPlacement: function(error, element) {
				element.after(error);
			}
		});
		/* DISABLE SUBMIT 
		$('input[type="submit"]', $('#auth_block')).addClass(dis).attr(dis,dis);
		$(document).on('change', regform + ' .req', function(){
			submitBlock($(this),dis);
		});
		$(document).on('change', authform + ' .req', function(){
			submitBlock($(this),dis);
		});*/
	}
}
/*
function submitBlock(obj,dis){
	$cnt =  obj.parents('form');
	len = $cnt.find('.req').length;
	len2 = $cnt.find('.req.valid').length;
	if(obj.valid() && len2 == len){
		$('input[type="submit"]', $cnt).removeClass(dis).removeAttr(dis);
	} else {
		$('input[type="submit"]', $cnt).addClass(dis).attr(dis,dis);
	}
}
*/
/**********************
	SLIDER
**********************/
function slider(container){
	var num, slide, play, slidetime, slidepause, elem, elem_pic, text_box, nav_id,
		slider = {
		init : function(object){
			if (typeof(object) == 'undefined' || $(object).length == 0 ) return;
			
			num = 0,
			slide = 0,
			play = 1,
			slidetime = 4000,
			slidepause = 7000,
			elem = $(object),
			elem_pic = elem.find('.pic'),
			text_box = '#header .intro_box',
			nav_id = 'navigation';
			
			elem.after('<ul id="' + nav_id + '"></ul>');
			elem_pic.each(function(){
				$(this).attr('id','pic-' + num);
				$(this).parent().next('ul').append('<li><a href="#pic-' + num + '">' + num + '</a></li>')
				num++
			});
			$('#' + nav_id + ' a').click(function(e){
				e.preventDefault();
				slide = $(this).parent().index();
				slider.action(this);
				slider.pause();
				slide++;
			});
			slider.start();
			slider.intro(':first');
			slider.navwidth();
			
			if (play){
				playInterval = setInterval(function() {
					slider.autoplay();
				},slidetime);
				elem.data('interval',playInterval);
			}
		},
		start : function(){
			$('#' + nav_id + ' li:eq(0)').addClass('current');
			elem_pic = elem.find('.pic:eq(0)').show();
		},
		action : function(obj){
			pic_id = $(obj).attr('href');	
			$(obj).parent().addClass('current').siblings().removeClass();
			elem.find(pic_id).fadeIn(600, slider.intro(pic_id)).siblings('.pic:visible').fadeOut(600);
		},
		intro : function(atr){
			$box = elem.find('.pic' + atr),
			date = $box.children('.date').text(),
			title = $box.children('.title').text(),
			alink = $box.children('a').attr('href');
			$(text_box + ' .date a').text(date);
			$(text_box + ' .title a').text(title);
			$(text_box + ' a').attr('href',alink);
		},
		navwidth : function(){
			li_w = $('#' + nav_id + ' li').outerWidth(true),
			li_num = num;
			$('#' + nav_id).css({'width':li_num*li_w,'margin-left':(-li_num*li_w)/2});
		},
		pause : function(){
			if (play){
				clearTimeout(elem.data('pause'));
				clearInterval(elem.data('interval'));
				pauseTimeout = setTimeout(function() {
					clearTimeout(elem.data('pause'));
					playInterval = setInterval(function() {
						slider.autoplay();
					},slidetime);
					elem.data('interval',playInterval);
				},slidepause);
				//console.log('sec');
				elem.data('pause',pauseTimeout);
			}
		},
		autoplay : function(){
			pos = num-1;
			//console.log(slide,pos);
			if (slide<pos){
				slider.action($('#' + nav_id + ' li:eq('+slide+') a'));
				slide++
			} else {
				slide = pos;
				slider.action($('#' + nav_id + ' li:eq('+slide+') a'));
				slide = 0;
			}
		}
	}
	return slider.init(container);
}
/***end SLIDER********/
/**********************
	INFINITE SCROLL
**********************/
var engine = {
	posts : [],
	target : null,
	elem : null,
	busy : false,
	count : 1,
	
	init: function(posts,target,elem){
		if (!target) return;

		this.target = $(target);
		this.elem = $(elem);
		//this.append(posts);

		var that = this;
		$(window).scroll(function(){
			if(that.elem.data('status') == 'act'){
				if ($(document).height() - $(window).height() <= $(window).scrollTop()) {
					that.scrollPosition = $(window).scrollTop();
					that.get();
				} else return;
			}
		});
	},	
	get : function() {				
		if (!this.target || this.busy) return;

		if (this.posts && this.posts.length) {
			var lastId = this.posts[this.posts.length-1].id;
			//console.log(lastId);
		} else {
			var lastId = 0;
		}
		this.setBusy(true);

		var that = this;
		$.getJSON('http://3fan.ru/cityjam/west/_test/getcontent.php', /*{count:this.count, last:lastId},*/
			function(data){
				if (data.elem.length > 0) {
					that.append(data.elem,data.word);
					//console.log();
				}
				that.setBusy(false);
			}
		);
	},	
	append : function(posts,head){
		posts = (posts instanceof Array) ? posts : [];
		this.posts = this.posts.concat(posts);
		//console.log(posts);
		//console.log(head);
		this.target.append('<div class="movie_list"><div class="word_big">' + head + '</div><ul></ul></div>');
		for (var i=0, len = posts.length; i < len; i++) {
			this.target.find('.movie_list:last ul').append(this.render(posts[i]));
		}
	
		if (this.scrollPosition !== undefined && this.scrollPosition !== null) {
			$(window).scrollTop(this.scrollPosition);
		}
	},
	render : function(obj){
		var xhtml = '<li><a href="#" class="img" style="background-image:url('+obj.img+');"><span class="date yel">'+obj.date+'<span></span></span></a>';
		if (obj.title) {
			xhtml += '<div class="title"><a href="#">'+obj.title+'</a></div>';
		}
		if (obj.eng_title) {
			xhtml += '<div class="eng-title">'+obj.eng_title+'</div>';
		}
		if (obj.genre) {
			xhtml += '<div class="genre">'+obj.genre+'</div>';
		}
		xhtml += '</li>';
		return xhtml;
	},
	showLoading : function(bState){
		var loading = $('.loader');
 
		if (bState) {
			$(this.target).append(loading);
			loading.show();
		} else {
			$('.loader').hide();
		}
	},
	setBusy : function(bState){
		this.showLoading(this.busy = bState);
	}
	
}
//30.05.2013
function movieInfo(){
	$('.shedule_box .movie .name').hover(function(){
		var $is = $(this),
			time = 0,
			infoP = setTimeout(function(){
				$is.find('.info').appendTo($is.find('.holder')).css('opacity',0).show().animate({'opacity':10}, 800);
				time = 1;
			}, 500);
	}, function(){
		if (time == 0){
			clearTimeout(infoP);
		} else {
			$is.find('.info').animate({'opacity':0}, 200, function(){
				$(this).appendTo($is).hide();
			});
		}
	});
	$('.filter_shedule a').click(function(){
		var $is = $(this),
			$id = $is.attr('id'),
			$obj = $('ul.shedule.more'),
			togClass = function(){
				$is.attr('class','active').siblings().attr('class','anchor');
			}
		if ($id == 'curr_day' && !$is.hasClass('active')){
			$obj.slideUp();
			togClass();
		} else if ($id == 'next_day' && !$is.hasClass('active')){
			$obj.slideDown();
			togClass();
		} else return;
	});
}