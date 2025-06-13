$(document).ready(function(){
	//TOP MENU
	$('#top_menu ul li:first, #top_menu ul li:last').addClass('nobg');
	$('#top_menu ul li.current').next().addClass('bg-r').end().prev().addClass('bg-l');
	//LOG_ON MENU
	$('body').click(function() {
        $('#menu').hide().prev().removeClass('act');
    });
	$("#menu, a#open_menu").click(function(e) {
        e.stopPropagation();
    });
	$('a#open_menu').click(function(){
		$(this).toggleClass('act').next().toggle();
	});
});