// JavaScript Document
$(document).ready(function(){
	var container_size = $('.content').width();
		onwindow_resize(container_size);
	$(window).resize(function(_event){
		onwindow_resize(container_size);
	});					   
});			  
function onwindow_resize(container_size)
{
	var _cor_size = $(window).width();
	if(_cor_size < container_size)
	{
		$('#pr,#footer').width(container_size);				
	}
	else
	{
		$('#pr,#footer').width(_cor_size);
	}	
}
//LEFT MENU
$(document).ready(function(){
	$('#leftmenu li.current').parent().show().parent().addClass('selected').siblings().children('ul').hide();//show current list and hide another lists then DOM ready
	$('#leftmenu ul li a.parent').click(function(){
		$(this).next('ul').slideToggle(250).parent('li').toggleClass('selected').siblings().removeClass('selected').children('ul:visible').slideToggle();//open(slide) selected list by click and close another lists
	});
});

