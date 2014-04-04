/*
 * Ever After Theme - Global Scripts
 * Version: 1.0.0
 *
 * Author: Chris Rivers
 * xxcriversxx@gmail.com
 *
 * Changelog: 
 * Version: 1.0.0
 *  Init Build
 *
 */

// Globals
var startedInstagram = 0;
var startedServices = 0;
var startedOurStory = 0;

var closingInterval;
var closingIteration = 0;
var startedClosing = 0;
var startedContact = 0;

$(function(){
	"use strict";
	
	// Scrollspy onload
	scrollSpy();
	
	// Slide Inview
	$(".slide").bind("inview", function (event, visible){
		if (visible) {
			$(this).addClass("inview");
		} else {
			$(this).removeClass("inview");
		}
	});
	
	// Scroll Events
	$(window).scroll(function(){
		
		// Fixed Header
		if( getPreciseScrollTop() > 70 ){
			$("#header").removeClass("fixed");
			
		} else {
			$("#header").addClass("fixed");
		}
		
		// Mobile Fixed Header
		if( $("#header ul.navigation").hasClass("collapse") ){
			$("#header ul.navigation").removeClass("collapse");
		}
		
		// Intro Leaves
		moveLeaves();
		
		// Scrollspy on scroll
		scrollSpy();

		// Start Instagram only when in view
		// if( isScrolledIntoView($(".instagram-layout .content")) ){
            /*
			if( startedInstagram == 0 ){
				// Instagram Theatre
				$('.instagram-theatre').instagramTheatre({
					mode : 'tag',
					accessToken : '382256144.ab103e5.25ac515d1e734492b1592e71f430d831',
					tag : 'travel'
				});
				
				startedInstagram = 1;
			}
            */
		// }
		
		// Services Visible
        /*
		if(  isScrolledIntoView(".slide.services-layout .section-callouts") ){
			if( startedServices == 0 ){
				$(".slide.services-layout .section-callouts div").each(function(i,e){
					$(this).delay(i*400).animate({
						marginTop: "0"
					}, {duration: 1000, easing:"easeOutBounce"});
				});
			
				startedServices = 1;
			}
		}
        */
		
		// Our Story Visible
        /*
		if(  isScrolledIntoView(".slide.story-layout .section-callouts") ){
			if( startedOurStory == 0 ){
				$(".slide.story-layout .section-callouts .bio").each(function(i,e){
					$(this).delay(i*200).animate({
						marginTop: "0"
					}, {duration: 500, easing:"easeOutSine"});
				});
			
				startedOurStory = 1;
			}
		}
        */
		
		// Closing Slide Visible
		if(  isScrolledIntoView(".slide.layout-animation .content") ){
			if( startedClosing == 0 ){
				closingInterval = setInterval(animateFloral, 1000 / 15);
				startedClosing = 1;
			}
		}
		
		// Finale Slide Visible
		if(  $(".slide.layout-scroller").hasClass("inview") ){
			animateForest();
		}
	});
	
	$(window).resize(function(){
		// Hide Validation Tooltips
		$(".validate").validationEngine('hide');
	});
		
	/* Dynamically Sets Slide Backgrounds.
	------------------------------------------*/
	$(".slide").not(".no-bg").each(function(){
		// Check If Photo Exists.
		if( $(this).find(".slide-photo img").length != 0 ){
			$(this).css("background-image", "url("+ $(this).find(".slide-photo img").attr("src") +")");
			$(this).find(".slide-photo img").remove();
		}
	});
	
	$(".slide.layout-image").each(function(){
		$(this).find(".inner-wrap").append('<div class="texture"></div>');
	});
	
	/* Fullscreen Gallery - Supports only 1 per page
	-------------------------------------------------*/
    /*
	// Store image data
	var images = [];
	var fullScreenIndex = 0;
	
	$(".featured-gallery img").each(function(index){				
		var imageObj = {
			'path' : jQuery(this).attr("src"),
			'title' : jQuery(this).attr("title")
		}
		
		images[index] = imageObj;
	});
	
	// On load
	$(".slide.fgallery-layout").css("background-image", "url("+ images[fullScreenIndex].path +")");
	$(".slide.fgallery-layout").addClass("active-bg");
	
	// On each featured gallery, show caption
	$(".photo-details").each(function(){	
		if( $(".photo-detail-content").size() == 0 ){
			$(this).parent().parent().append("<div class='photo-detail-content'>"+ images[0].title +"</div>");
			$(".photo-detail-content").hide().fadeIn();
		} else {
			$(".photo-detail-content").fadeOut(function(){
				$(".photo-detail-content").remove();
			});
		}
	});
	
	// On click. Transition only works in Chrome & Safari
	$(".nav-arrow.next").click(function(){
		fullScreenIndex = (fullScreenIndex >= images.length - 1) ? 0 : fullScreenIndex + 1;
							
		if( images[fullScreenIndex] ){
			$(this).parent().parent().parent()
			.css({
				"background-image" : "url("+ images[fullScreenIndex].path +")",
				"background-position-x": "5000px"
			})
			.animate({
			  'background-position-x': '0px'
			}, {duration: 500, easing:"easeOutQuad"});
				
		} else {
			fullScreenIndex = fullScreenIndex - 1;
		}
		
		$(".slide.fgallery-layout").removeClass("active-bg").addClass("active-bg");
		
		var currentEl = $(this);
		
		$(".photo-detail-content").fadeOut(function(){
			$(".photo-detail-content").remove();
			
			currentEl.parent().parent().append("<div class='photo-detail-content'>"+ images[fullScreenIndex].title +"</div>");
			$(".photo-detail-content").hide().fadeIn();
		});
	});

	$(".nav-arrow.prev").click(function(){
		fullScreenIndex = (fullScreenIndex >= 1) ? fullScreenIndex - 1 : images.length - 1;
    
		if( images[fullScreenIndex] ){
			$(this).parent().parent().parent()
			.css({
				"background-image" : "url("+ images[fullScreenIndex].path +")",
				"background-position-x": "5000px"
			})
			.animate({
			  'background-position-x': '0px'
			}, {duration: 500, easing:"easeOutQuad"});
			
		} else {
			fullScreenIndex = fullScreenIndex + 1;
		}
		
		var currentEl = $(this);
		
		$(".photo-detail-content").fadeOut(function(){
			$(".photo-detail-content").remove();
			
			currentEl.parent().parent().append("<div class='photo-detail-content'>"+ images[fullScreenIndex].title +"</div>");
			$(".photo-detail-content").hide().fadeIn();
		});
	});
	
	$(".photo-details").click(function(){	
		if( $(".photo-detail-content").size() == 0 ){
			$(this).parent().parent().append("<div class='photo-detail-content'>"+ images[fullScreenIndex].title +"</div>");
			$(".photo-detail-content").hide().fadeIn();
		} else {
			$(".photo-detail-content").fadeOut(function(){
				$(".photo-detail-content").remove();
			});
		}
	});
	*/
    
	/* Navigation Scrollspy
	--------------------------*/
	var navSpeed = parseInt($("#header .navigation").attr("rel"));
	if( navSpeed == ""){ navSpeed = 1200; }
		
	$("#header .navigation a, #header .logo a, a.scrollTo").click(function(){
		gotoScrollSpy( ($(this).attr("href")), navSpeed );
		return false;
	});
	
	$(".fancybox").fancybox({
    	openEffect	: 'elastic',
    	closeEffect	: 'elastic',

    	helpers : {
    		title : {
    			type : 'inside'
    		},
			overlay: {
				locked: false
			}
    	}
    });
	
	/* Hover Effects
	-----------------------*/
	$(".slide.story-layout .content .bio img").hover(
		function() {
			$(".slide.story-layout .content .bio img").not($(this)).addClass("blur");
	  	}, 
		function() {
	    	$(".slide.story-layout .content .bio img").removeClass("blur");
	  	}
	);
	
	/* Form Validation
	-----------------------*/
	$(".validate").validationEngine({scroll: false});
		
	/* HTML5 Video
	------------------------*/
	$(".player").mb_YTPlayer();
	
	$(".slide.video-layout .music-toggle").click(function(){
		$(".player").toggleVolume();
	});
	
	/* Mobile & Responsive
	----------------------------*/
	// Responsive Headlines
	$(".responsive-text").fitText(1.3, { minFontSize: '50px' });
	$(".responsive-text-close").fitText(1.3, { minFontSize: '50px' });
	
	// Mobile Navigation
	$("#header .btn-navbar").click(function(){
		$("#header ul.navigation").toggleClass("collapse");
	});
	
	$("#header ul.navigation li a").click(function(){
		$("#header ul.navigation").toggleClass("collapse");
	});
	
});

// Scrollspy
function gotoScrollSpy(id, speed){
	var curSlide = $(".slide[rel='"+ (id).replace("#","") +"']");
	$('html,body').animate({scrollTop: (curSlide).offset().top }, speed);
}

function scrollSpy() {
	var e, n, i, a, b, c;	
	var curSlide;
	
	$("ul.navigation li a").each(function(){
		curSlide = $(".slide[rel='"+ ($(this).attr("href")).replace("#","") +"']");
		
		if( curSlide.size() > 0 ){	
			a = curSlide.offset().top + curSlide.outerHeight() - 1500; 
			b = $(this);
			c = $(window).scrollTop();
		
			if (a <= c) {
				$("ul.navigation li a").removeClass("active");
				$(this).addClass("active");
			} else {
				$(this).removeClass("active");
			}
		}
	});
}

// Detect When Element is visible, good for specific elements
function isScrolledIntoView(elem){
	// New & Improved Check
	var docViewTop = $(window).scrollTop(),
	docViewBottom = docViewTop + $(window).height(),
	elemTop = $(elem).offset().top,
	elemBottom = elemTop + $(elem).height();
	
	// Is more than half of the element visible
	return ((elemTop + ((elemBottom - elemTop)/2)) >= docViewTop && ((elemTop + ((elemBottom - elemTop)/2)) <= docViewBottom));
}

// Get Accurate Scroll Amount
function getPreciseScrollTop(){
    var b = $(window).scrollTop();
    var e = $(window).height();

    return parseFloat(  e - b );
}

/* Motion Events
----------------------------*/
// Leaf Motions
function moveLeaves(){
	var windowScroll = $(window).scrollTop();
	var rotationSpeed = windowScroll/4;
	var rotationRevSpeed = -(windowScroll/4);
	
	if( windowScroll > 0 && windowScroll < 1000 ){
		$('.image-layers .img-1').css({
			'top': (360) - (windowScroll / 2),
			'-webkit-transform':'rotate('+rotationRevSpeed/3+'deg)',
			'-moz-transform':'rotate('+rotationRevSpeed/3+'deg)',
			'-o-transform':'rotate('+rotationRevSpeed/3+'deg)',
			'-ms-transform':'rotate('+rotationRevSpeed/3+'deg)',
			'transform':'rotate('+rotationRevSpeed/3+'deg)'
		});
		
		$('.image-layers .img-2').css({
			'top': (600) - (windowScroll/3), // * 1.5
			'-webkit-transform':'rotate('+rotationRevSpeed+'deg)',
			'-moz-transform':'rotate('+rotationRevSpeed+'deg)',
			'-o-transform':'rotate('+rotationRevSpeed+'deg)',
			'-ms-transform':'rotate('+rotationRevSpeed+'deg)',
			'transform':'rotate('+rotationRevSpeed+'deg)'
		});
	}
}

// Floral Animation
function animateFloral(){
	// Animate Beautiful Sprite
	if( closingIteration <= 35 ){
		$('.slide.layout-animation .content').removeAttr("class").addClass("content").addClass("sprite-"+closingIteration)
	}
	
	closingIteration++;
}

// Forest Animation
function animateForest(){
	var parentElem = $(".slide.layout-scroller");
	var windowScroll = $(window).scrollTop();
	var windowHeight = $(window).height();
	
	var trueScrollTop = (windowHeight + windowScroll) - (parentElem.position()).top;
	var rotationRevSpeed = -(windowScroll/2);
	var rotationRevSpeedB = -(windowScroll);
	var rotationRevSpeedC = -(windowScroll/4);
	
	// var yield = ( -1200 + ( (trueScrollTop - 500) *1.2 ) )  + "px";
	// var yield = ( -(trueScrollTop - 2500) / 2 )  + "px";
	// console.log("moving" + " " + trueScrollTop);
	
	parentElem.find('.image-layers .img-1').css({
		'position' : 'fixed',
		'top': ( -1500 + ( (trueScrollTop - 500) ) )  + "px",
		'left': "62%",
		'-webkit-transform':'rotate('+rotationRevSpeedC+'deg)',
		'-moz-transform':'rotate('+rotationRevSpeedC+'deg)',
		'-o-transform':'rotate('+rotationRevSpeedC+'deg)',
		'-ms-transform':'rotate('+rotationRevSpeedC+'deg)',
		'transform':'rotate('+rotationRevSpeedC+'deg)'
	});
	
	parentElem.find('.image-layers .img-2').css({
		'position' : 'fixed',
		'top': ( -400 + ( (trueScrollTop - 500) ) )  + "px",
		'left': "15%",
		'-webkit-transform':'rotate('+rotationRevSpeed+'deg)',
		'-moz-transform':'rotate('+rotationRevSpeed+'deg)',
		'-o-transform':'rotate('+rotationRevSpeed+'deg)',
		'-ms-transform':'rotate('+rotationRevSpeed+'deg)',
		'transform':'rotate('+rotationRevSpeed+'deg)'
	});
		
	parentElem.find('.image-layers .img-3').css({
		'position' : 'fixed',
		'top': ( -1900 + ( (trueScrollTop - 500) ) )  + "px",
		'left': "10%",
		'-webkit-transform':'rotate('+rotationRevSpeed+'deg)',
		'-moz-transform':'rotate('+rotationRevSpeed+'deg)',
		'-o-transform':'rotate('+rotationRevSpeed+'deg)',
		'-ms-transform':'rotate('+rotationRevSpeed+'deg)',
		'transform':'rotate('+rotationRevSpeed+'deg)'
	});
	
	parentElem.find('.image-layers .img-4').css({
		'position' : 'fixed',
		'top': ( -1500 + ( (trueScrollTop - 500) *1.7 ) )  + "px",
		'left': "60%",
		'-webkit-transform':'rotate('+rotationRevSpeedB+'deg)',
		'-moz-transform':'rotate('+rotationRevSpeedB+'deg)',
		'-o-transform':'rotate('+rotationRevSpeedB+'deg)',
		'-ms-transform':'rotate('+rotationRevSpeedB+'deg)',
		'transform':'rotate('+rotationRevSpeedB+'deg)'
	});
	
	parentElem.find('.image-layers .img-5').css({
		'position' : 'fixed',
		'top': ( -1000 + ( (trueScrollTop - 500) ) )  + "px",
		'left': "10%"
	});
	
	parentElem.find('.image-layers .img-6').css({
		'position' : 'fixed',
		'top': ( -1600 + ( (trueScrollTop - 500) ) )  + "px",
		'left': "30%",
		'-webkit-transform':'rotate('+rotationRevSpeedC+'deg)',
		'-moz-transform':'rotate('+rotationRevSpeedC+'deg)',
		'-o-transform':'rotate('+rotationRevSpeedC+'deg)',
		'-ms-transform':'rotate('+rotationRevSpeedC+'deg)',
		'transform':'rotate('+rotationRevSpeedC+'deg)'
	});
	
	parentElem.find('.image-layers .img-7').css({
		'position' : 'fixed',
		'top': ( -2000 + ( (trueScrollTop - 500) *1.7 ) )  + "px",
		'left': "40%",
		'-webkit-transform':'rotate('+rotationRevSpeedB+'deg)',
		'-moz-transform':'rotate('+rotationRevSpeedB+'deg)',
		'-o-transform':'rotate('+rotationRevSpeedB+'deg)',
		'-ms-transform':'rotate('+rotationRevSpeedB+'deg)',
		'transform':'rotate('+rotationRevSpeedB+'deg)'
	});
	
	parentElem.find('.image-layers .img-8').css({
		'position' : 'fixed',
		'top': ( -2000 + ( (trueScrollTop - 500) *1.5 ) )  + "px",
		'left': "50%",
		'-webkit-transform':'rotate('+rotationRevSpeed+'deg)',
		'-moz-transform':'rotate('+rotationRevSpeed+'deg)',
		'-o-transform':'rotate('+rotationRevSpeed+'deg)',
		'-ms-transform':'rotate('+rotationRevSpeed+'deg)',
		'transform':'rotate('+rotationRevSpeed+'deg)'
	});
	
	parentElem.find('.image-layers .img-9').css({
		'position' : 'fixed',
		'top': ( -1700 + ( (trueScrollTop - 500) ) )  + "px",
		'left': "50%",
		'-webkit-transform':'rotate('+rotationRevSpeedB+'deg)',
		'-moz-transform':'rotate('+rotationRevSpeedB+'deg)',
		'-o-transform':'rotate('+rotationRevSpeedB+'deg)',
		'-ms-transform':'rotate('+rotationRevSpeedB+'deg)',
		'transform':'rotate('+rotationRevSpeedB+'deg)'
	});
}
