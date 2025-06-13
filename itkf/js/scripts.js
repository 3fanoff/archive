// JavaScript Document by mihalich
$(document).ready(function(){
	$('.calendar_events tbody tr').hover(
		function(){
			$(this).addClass('over').prev().addClass('pre_over');
		},
		function(){
			$(this).removeClass('over').prev().removeClass('pre_over');
		});
	//***********FILTER*************
		$('.calendar_events tbody tr:last').addClass('last');
		$('select[name=months] option').eq(12).attr('selected',true); //selected then DOM ready 
        $('select[name=months]').change(function(){ 
                var nnm = $('select[name=months] option:selected').val(); // value = tr class name 
                $('.calendar_events tbody tr').each(function(){ 
                     if ($(this).hasClass(nnm)){ 
                         $(this).show().addClass('last').siblings('tr:visible').hide().removeClass('last'); 
                     }
					 if (nnm == 'all'){
						 $('.calendar_events tbody tr:hidden').show();
						 $('.calendar_events tbody tr:last').addClass('last').siblings().removeClass('last');
					 }
                 });
         });
	//***********PHOTOS NUMBER SHOW*************
	$('a.photohere, .photo p.title a').hover(
		function(){
			//$(this).parents('.photo').addClass('over'); //simple var
			$(this).parents('.photo').addClass('over').find('.number').stop().animate({left:"0"}, 150);
		},
		function(){
			//$(this).parents('.photo').removeClass('over'); //simple var
			$(this).parents('.photo').removeClass('over').find('.number').stop().animate({left:"-137px"}, 100);
		});
	//***********VIDEOS HOVER*************
	$('a.photohere').hover(
		function(){
			$(this).parents('.video').addClass('over');
		},
		function(){
			$(this).parents('.video').removeClass('over');
			
		});	
	
});
//*******************************************
