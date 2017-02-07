$(function(){
  // Hide .navbar first
  $(".navbar").css('opacity',.4);
	$(".navbar").css('transition','opacity 1s');

	// Fade in .navbar
	$(function () {
		$(window).scroll(function () {

            // set distance user needs to scroll before we fadeIn navbar
			if ($(this).scrollTop() > 200) {
				//$('.navbar').fadeIn();
        $(".navbar").css('opacity',1);

			} else {
        $(".navbar").css('opacity',.4);

				//$('.navbar').fadeOut();
			}
		});


	});



  	// Preloader */
  	  	$(window).load(function() {

     	// will first fade out the loading animation
      	$("#status").fadeOut("slow");

      	// will fade out the whole DIV that covers the website.
      	$("#preloader").delay(500).fadeOut("slow").remove();

    	});

     // Page scroll
    	$('a.page-scroll').click(function() {
          if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
              $('html,body').animate({
                scrollTop: target.offset().top - 40
              }, 900);
              return false;
            }
          }
        });




      // Show Menu on Book
      $(window).bind('scroll', function() {

          var navHeight = $(window).height() - 100;
          if ($(window).scrollTop() > navHeight) {
              $('.navbar-default').addClass('on');
          } else {
              $('.navbar-default').removeClass('on');
          }
      });

      $('body').scrollspy({
          target: '.navbar-default',
          offset: 80
      });



    	// Portfolio Isotope Filter
      $(window).load(function() {
          var $container = $('.portfolio-items');
          $container.isotope({
              filter: '*',
              animationOptions: {
                  duration: 750,
                  easing: 'linear',
                  queue: false
              }
          });
          $('.cat a').click(function() {
              $('.cat .active').removeClass('active');
              $(this).addClass('active');
              var selector = $(this).attr('data-filter');
              $container.isotope({
                  filter: selector,
                  animationOptions: {
                      duration: 750,
                      easing: 'linear',
                      queue: false
                  }
              });
              return false;
          });

      });






      //timeline


    // define variables
    var items = document.querySelectorAll(".timeline li");

    // check if an element is in viewport
    // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    function callbackFunc() {
      for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
          items[i].classList.add("in-view");
        }
      }
    }

    // listen for events
    window.addEventListener("load", callbackFunc);
    window.addEventListener("resize", callbackFunc);
    window.addEventListener("scroll", callbackFunc);




    // jQuery Parallax
    function initParallax() {
      $('#intro').parallax("100%", 0.3);
      $('#services').parallax("100%", 0.3);
      $('#aboutimg').parallax("100%", 0.3);
      $('#testimonials').parallax("100%", 0.1);

    }
    initParallax();

    	// Pretty Photo
  	$("a[rel^='prettyPhoto']").prettyPhoto({
  		social_tools: false
  	});
})
