$(document).ready(function() {
	$('.switch').toggle(function() {
		$('#container hgroup , #container p , #container nav , .number').fadeOut(200);
		$('#container').addClass('hidesudo').animate({
			width : '0',
			padding : '0'
		});
		$('.switch').text('OFF');
	}, function() {
		$('.switch').text('ON');
		$('#container').animate({
			width : '800px',
			padding : '40px'
		}).removeClass('hidesudo');
		$('#container hgroup').fadeIn(200, function(){
			$('#container p').fadeIn(200, function(){
				$('#container nav').fadeIn(200);
				$('.number').fadeIn(200);
			});
		});
	});
});