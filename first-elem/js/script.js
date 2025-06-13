// JavaScript Document
$(document).ready(function(){
	$('#top_menu a').hover(
		function(){
			$(this).parent().addClass('over');
		},
		function(){
			$(this).parent().removeClass('over');
		});
});