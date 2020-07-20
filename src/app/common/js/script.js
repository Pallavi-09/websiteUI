(function($) {

	if(document.getElementById('nokey')){
		var canvas = document.getElementById('nokey'),
		can_w = parseInt(canvas.getAttribute('width')),
		can_h = parseInt(canvas.getAttribute('height')),
		ctx = canvas.getContext('2d');
	 
	   console.log(canvas);
	   console.log(typeof can_w);

 
			var ball = {
			x: 0,
			y: 0,
			vx: 0,
			vy: 0,
			r: 0,
			alpha: 1,
			phase: 0
			},
			ball_color = {
				r: 207,
				g: 255,
				b: 4
			},
			R = 2,
			balls = [],
			alpha_f = 0.03,
			alpha_phase = 0,
			
		// Line
			link_line_width = 0.8,
			dis_limit = 260,
			add_mouse_point = true,
			mouse_in = false,
			mouse_ball = {
			x: 0,
			y: 0,
			vx: 0,
			vy: 0,
			r: 0,
			type: 'mouse'
			};
		
		// Random speed
		function getRandomSpeed(pos){
			var  min = -1,
				max = 1;
			switch(pos){
				case 'top':
					return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
					break;
				case 'right':
					return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
					break;
				case 'bottom':
					return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
					break;
				case 'left':
					return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
					break;
				default:
					return;
					break;
			}
		}
		function randomArrayItem(arr){
			return arr[Math.floor(Math.random() * arr.length)];
		}
		function randomNumFrom(min, max){
			return Math.random()*(max - min) + min;
		}
		console.log(randomNumFrom(0, 10));
		// Random Ball
		function getRandomBall(){
			var pos = randomArrayItem(['top', 'right', 'bottom', 'left']);
			switch(pos){
				case 'top':
					return {
						x: randomSidePos(can_w),
						y: -R,
						vx: getRandomSpeed('top')[0],
						vy: getRandomSpeed('top')[1],
						r: R,
						alpha: 1,
						phase: randomNumFrom(0, 10)
					}
					break;
				case 'right':
					return {
						x: can_w + R,
						y: randomSidePos(can_h),
						vx: getRandomSpeed('right')[0],
						vy: getRandomSpeed('right')[1],
						r: R,
						alpha: 1,
						phase: randomNumFrom(0, 10)
					}
					break;
				case 'bottom':
					return {
						x: randomSidePos(can_w),
						y: can_h + R,
						vx: getRandomSpeed('bottom')[0],
						vy: getRandomSpeed('bottom')[1],
						r: R,
						alpha: 1,
						phase: randomNumFrom(0, 10)
					}
					break;
				case 'left':
					return {
						x: -R,
						y: randomSidePos(can_h),
						vx: getRandomSpeed('left')[0],
						vy: getRandomSpeed('left')[1],
						r: R,
						alpha: 1,
						phase: randomNumFrom(0, 10)
					}
					break;
			}
		}
		function randomSidePos(length){
			return Math.ceil(Math.random() * length);
		}
		
		// Draw Ball
		function renderBalls(){
			Array.prototype.forEach.call(balls, function(b){
				if(!b.hasOwnProperty('type')){
					ctx.fillStyle = 'rgba('+ball_color.r+','+ball_color.g+','+ball_color.b+','+b.alpha+')';
					ctx.beginPath();
					ctx.arc(b.x, b.y, R, 0, Math.PI*2, true);
					ctx.closePath();
					ctx.fill();
				}
			});
		}
		
		// Update balls
		function updateBalls(){
			var new_balls = [];
			Array.prototype.forEach.call(balls, function(b){
				b.x += b.vx;
				b.y += b.vy;
				
				if(b.x > -(50) && b.x < (can_w+50) && b.y > -(50) && b.y < (can_h+50)){
					new_balls.push(b);
				}
				
				// alpha change
				b.phase += alpha_f;
				b.alpha = Math.abs(Math.cos(b.phase));
				// console.log(b.alpha);
			});
			
			balls = new_balls.slice(0);
		}
		
		// loop alpha
		function loopAlphaInf(){
			
		}
		
		// Draw lines
		function renderLines(){
			var fraction, alpha;
			for (var i = 0; i < balls.length; i++) {
				for (var j = i + 1; j < balls.length; j++) {
					
					fraction = getDisOf(balls[i], balls[j]) / dis_limit;
					
					if(fraction < 1){
						alpha = (1 - fraction).toString();
		
						ctx.strokeStyle = 'rgba(150,150,150,'+alpha+')';
						ctx.lineWidth = link_line_width;
						
						ctx.beginPath();
						ctx.moveTo(balls[i].x, balls[i].y);
						ctx.lineTo(balls[j].x, balls[j].y);
						ctx.stroke();
						ctx.closePath();
					}
				}
			}
		}
		
		// calculate distance between two points
		function getDisOf(b1, b2){
			var  delta_x = Math.abs(b1.x - b2.x),
				delta_y = Math.abs(b1.y - b2.y);
			
			return Math.sqrt(delta_x*delta_x + delta_y*delta_y);
		}
		
		// add balls if there a little balls
		function addBallIfy(){
			if(balls.length < 20){
				balls.push(getRandomBall());
			}
		}
		
		// Render
		function render(){
			ctx.clearRect(0, 0, can_w, can_h);
			
			renderBalls();
			
			renderLines();
			
			updateBalls();
			
			addBallIfy();
		
			addCustomStuff();
			
			window.requestAnimationFrame(render);
		}
		
		
		function addCustomStuff(){
			console.log(ball);
			if(mouse_in){
				ctx.fillStyle = 'red';
				ctx.fillText("StackOverflow",mouse_ball.x,mouse_ball.y);
			}
			
		}
		
		// Init Balls
		function initBalls(num){
			for(var i = 1; i <= num; i++){
				balls.push({
					x: randomSidePos(can_w),
					y: randomSidePos(can_h),
					vx: getRandomSpeed('top')[0],
					vy: getRandomSpeed('top')[1],
					r: R,
					alpha: 1,
					phase: randomNumFrom(0, 10)
				});
			}
		}
		// Init Canvas
		function initCanvas(){
			canvas.setAttribute('width', window.innerWidth);
			canvas.setAttribute('height', window.innerHeight);
			
			can_w = parseInt(canvas.getAttribute('width'));
			can_h = parseInt(canvas.getAttribute('height'));
		}
		window.addEventListener('resize', function(e){
			console.log('Window Resize...');
			initCanvas();
		});
		
		function goMovie(){
			initCanvas();
			initBalls(20);
			window.requestAnimationFrame(render);
		}
		goMovie();
		
		// Mouse effect
		canvas.addEventListener('mouseenter', function(){
			console.log('mouseenter');
			mouse_in = true;
			balls.push(mouse_ball);
		});
		canvas.addEventListener('mouseleave', function(){
			console.log('mouseleave');
			mouse_in = false;
			var new_balls = [];
			Array.prototype.forEach.call(balls, function(b){
				if(!b.hasOwnProperty('type')){
					new_balls.push(b);
				}
			});
			balls = new_balls.slice(0);
		});
		canvas.addEventListener('mousemove', function(e){
			var e = e || window.event;
			mouse_ball.x = e.pageX;
			mouse_ball.y = e.pageY;
			// console.log(mouse_ball);
		});
	}
		
	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.preloader').length){
			$('.preloader').delay(200).fadeOut(500);
		}
	}
	
	
	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');
		
		//Dropdown Button
		$('.main-header li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('ul').slideToggle(500);
		});
		
		//Disable dropdown parent link
		$('.main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a').on('click', function(e) {
			e.preventDefault();
		});
		
	}
	
	
	//Update Header Style and Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.main-header');
			var scrollLink = $('.scroll-to-top');
			var sticky_header = $('.main-header .sticky-header');
			if (windowpos > 100) {
				siteHeader.addClass('fixed-header');
				sticky_header.addClass("animated slideInDown");
				scrollLink.fadeIn(300);
			} else {
				siteHeader.removeClass('fixed-header');
				sticky_header.removeClass("animated slideInDown");
				scrollLink.fadeOut(300);
			}
		}
	}
	
	headerStyle();
	
	
	//Hidden Sidebar
	if ($('.hidden-bar').length) {
		var hiddenBar = $('.hidden-bar');
		var hiddenBarOpener = $('.nav-toggler');
		var hiddenBarCloser = $('.hidden-bar-closer');
		$('.hidden-bar-wrapper').mCustomScrollbar();
		
		//Show Sidebar
		hiddenBarOpener.on('click', function () {
			hiddenBar.addClass('visible-sidebar');
		});
		
		//Hide Sidebar
		hiddenBarCloser.on('click', function () {
			hiddenBar.removeClass('visible-sidebar');
		});
	}
	
	
	//Hidden Bar Menu Config
	function hiddenBarMenuConfig() {
		var menuWrap = $('.hidden-bar .side-menu');
		// appending expander button
		menuWrap.find('.dropdown').children('a').append(function () {
			return '<button type="button" class="btn expander"><i class="icon fa fa-angle-right"></i></button>';
		});
		// hidding submenu
		menuWrap.find('.dropdown').children('ul').hide();
		// toggling child ul
		menuWrap.find('.btn.expander').each(function () {
			$(this).on('click', function () {
				$(this).parent() // return parent of .btn.expander (a)
					.parent() // return parent of a (li)
						.children('ul').slideToggle();

				// adding class to expander container
				$(this).parent().toggleClass('current');
				// toggling arrow of expander
				$(this).find('i').toggleClass('fa-angle-right fa-angle-down');

				return false;

			});
		});
	}

	hiddenBarMenuConfig();
	
	
	//Mobile Nav Hide Show
	if($('.mobile-menu').length){
		
		$('.mobile-menu .menu-box').mCustomScrollbar();
		
		var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
		$('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
		$('.sticky-header .main-menu').append(mobileMenuContent);
		
		//Dropdown Button
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).toggleClass('open');
			$(this).prev('ul').slideToggle(500);
		});
		//Menu Toggle Btn
		$('.mobile-nav-toggler').on('click', function() {
			$('body').addClass('mobile-menu-visible');
		});

		//Menu Toggle Btn
		$('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
		});
		
	}
	
	
	//Parallax Scene for Icons
	if($('.parallax-scene-1').length){
		var scene = $('.parallax-scene-1').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-2').length){
		var scene = $('.parallax-scene-2').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-3').length){
		var scene = $('.parallax-scene-3').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	
	
	
	//Fact Counter + Text Count
	if($('.count-box').length){
		$('.count-box').appear(function(){
	
			var $t = $(this),
				n = $t.find(".count-text").attr("data-stop"),
				r = parseInt($t.find(".count-text").attr("data-speed"), 10);
				
			if (!$t.hasClass("counted")) {
				$t.addClass("counted");
				$({
					countNum: $t.find(".count-text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".count-text").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".count-text").text(this.countNum);
					}
				});
			}
			
		},{accY: 0});
	}
	
	
	
	//Tabs Box
	if($('.tabs-box').length){
		$('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			
			if ($(target).is(':visible')){
				return false;
			}else{
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
				$(target).fadeIn(300);
				$(target).addClass('active-tab');
			}
		});
	}
	
	
	//Header Search
	if($('.search-box-outer').length) {
		$('.search-box-outer').on('click', function() {
			$('body').addClass('search-active');
		});
		$('.close-search').on('click', function() {
			$('body').removeClass('search-active');
		});
	}
	
	
	if($('.paroller').length){
		$('.paroller').paroller({
			  factor: 0.2,            // multiplier for scrolling speed and offset, +- values for direction control  
			  factorLg: 0.4,          // multiplier for scrolling speed and offset if window width is less than 1200px, +- values for direction control  
			  type: 'foreground',     // background, foreground  
			  direction: 'horizontal' // vertical, horizontal  
		});
	}
	
	
	
	// Testimonial Carousel
	if ($('.testimonial-carousel').length) {
		$('.testimonial-carousel').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			smartSpeed: 700,
			autoplay: 5000,
			navText: [ '<span class="flaticon-back-2"></span>', '<span class="flaticon-arrow"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:2
				},
				1024:{
					items:2
				},
				1200:{
					items:2
				},
				1400:{
					items:2
				},
				1600:{
					items:2
				}
			}
		});    		
	}
	
	
	
	//Product Carousel
	if ($('.project-carousel').length) {
		$('.project-carousel').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			smartSpeed: 700,
			autoplay: 5000,
			navText: [ '<span class="flaticon-back-2"></span>', '<span class="flaticon-arrow"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				800:{
					items:2
				},
				1024:{
					items:3
				},
				1200:{
					items:3
				},
				1400:{
					items:3
				},
				1600:{
					items:3
				}
			}
		});    		
	}
	
	
	//Product Tabs
	if($('.project-tab').length){
		$('.project-tab .product-tab-btns .p-tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			
			if ($(target).hasClass('actve-tab')){
				return false;
			}else{
				$('.project-tab .product-tab-btns .p-tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				$('.project-tab .p-tabs-content .p-tab').removeClass('active-tab');
				$(target).addClass('active-tab');
			}
		});
	}
	
	
	
	//Accordion Box
	if($('.accordion-box').length){
		$(".accordion-box").on('click', '.acc-btn', function() {
			
			var outerBox = $(this).parents('.accordion-box');
			var target = $(this).parents('.accordion');
			
			if($(this).hasClass('active')!==true){
				$(outerBox).find('.accordion .acc-btn').removeClass('active');
			}
			
			if ($(this).next('.acc-content').is(':visible')){
				return false;
			}else{
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);	
			}
		});	
	}
	
	
	
	// Main Slider Carousel
	if ($('.main-slider-carousel').length) {
		$('.main-slider-carousel').owlCarousel({
			//animateOut: 'fadeOut',
    		//animateIn: 'fadeIn',
			loop:true,
			margin:0,
			nav:true,
			smartSpeed: 500,
			autoplay: 6000,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:1
				},
				1024:{
					items:1
				},
				1200:{
					items:1
				},
				1500:{
					items:1
				}
			}
		});    		
	}
	
	
	
	
	// Sponsors Carousel
	if ($('.sponsors-carousel').length) {
		$('.sponsors-carousel').owlCarousel({
			//animateOut: 'fadeOut',
    		//animateIn: 'fadeIn',
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 500,
			autoplay: 6000,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				800:{
					items:3
				},
				1024:{
					items:4
				},
				1200:{
					items:4
				},
				1500:{
					items:4
				}
			}
		});    		
	}
	
	
	// Single Item Carousel
	if ($('.single-item-carousel').length) {
		$('.single-item-carousel').owlCarousel({
			//animateOut: 'fadeOut',
    		//animateIn: 'fadeIn',
			loop:true,
			margin:0,
			nav:true,
			smartSpeed: 500,
			autoplay: 6000,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:1
				},
				1024:{
					items:1
				},
				1200:{
					items:1
				},
				1500:{
					items:1
				}
			}
		});    		
	}
	
	
	
	//Event Countdown Timer
	if($('.time-countdown').length){  
		$('.time-countdown').each(function() {
		var $this = $(this), finalDate = $(this).data('countdown');
		$this.countdown(finalDate, function(event) {
			var $this = $(this).html(event.strftime('' + '<div class="counter-column"><span class="count">%D</span>Days</div> ' + '<div class="counter-column"><span class="count">%H</span>Hours</div>  ' + '<div class="counter-column"><span class="count">%M</span>Minutes</div>  ' + '<div class="counter-column"><span class="count">%S</span>Seconds</div>'));
		});
	 });
	}
	
	
	
	//Custom Seclect Box
	if($('.custom-select-box').length){
		$('.custom-select-box').selectmenu().selectmenu('menuWidget').addClass('overflow');
	}
	
	
	
	//Jquery Spinner / Quantity Spinner
	if($('.quantity-spinner').length){
		$("input.quantity-spinner").TouchSpin({
		  verticalbuttons: true
		});
	}
	
	
	
	//Gallery Filters
	if($('.filter-list').length){
		$('.filter-list').mixItUp({});
	}
	
	
	//LightBox / Fancybox
	if($('.lightbox-image').length) {
		$('.lightbox-image').fancybox({
			openEffect  : 'fade',
			closeEffect : 'fade',
			helpers : {
				media : {}
			}
		});
	}
	
	
	//Contact Form Validation
	if($('#contact-form').length){
		$('#contact-form').validate({
			rules: {
				username: {
					required: true
				},
				lastname: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				phone: {
					required: true
				},
				message: {
					required: true
				}
			}
		});
	}
	
	
	// Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
		   // animate
		   $('html, body').animate({
			   scrollTop: $(target).offset().top
			 }, 1500);
	
		});
	}
	
	
	// Elements Animation
	if($('.wow').length){
		var wow = new WOW(
		  {
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       true,       // trigger animations on mobile devices (default is true)
			live:         true       // act on asynchronously loaded content (default is true)
		  }
		);
		wow.init();
	}


/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */
	
	$(window).on('scroll', function() {
		headerStyle();
	});
	
/* ==========================================================================
   When document is loading, do
   ========================================================================== */
	
	$(window).on('load', function() {
		handlePreloader();
	});	

})(window.jQuery);