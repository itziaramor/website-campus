/* 

1) IMPORTANTE

Para que la maqueta funcione correctamente en drupal
necesitamos envolver `main.js` en una fn anónima y pasarle la
referencia a jQuery pero la maqueta no funciona porque desde
`subscription.js` se hace llama a qs() y no estaría disponible

(function ($) { 

*/

// GLOBAL
var CB = {};

// IE 11
// -----------------------------------------------------------------------------
function checkIfIE11() {
  CB.isIE11 = !window.ActiveXObject && 'ActiveXObject' in window;

  if (CB.isIE11) {
    document.documentElement.classList.add('ie11-browser');
  }
}

checkIfIE11();

// CB Numbers
// -----------------------------------------------------------------------------
$('.cb-numbers__list').scrollLeft($('.cb-numbers__list').width() / 2);

// Navbar: dropdown
// -----------------------------------------------------------------------------

$('.nav__item__dropdown').click(function() {
  $('.nav__item__dropdown .dropdown').toggleClass('dropdown--show');

  var $parent = $(this).closest('.nav__item__dropdown');
  var $dropdownButton = $parent.find('[data-toggle="dropdown"]');

  if ($dropdownButton.attr('aria-expanded') === 'true') {
    $dropdownButton.attr('aria-expanded', false);
  } else {
    $dropdownButton.attr('aria-expanded', true);
  }
});

// Para cerrar el dropdown de los cursos al hacer clic en el resto de la pantalla
var clickMenu = true;
$('.navbar').click(function() {
  clickMenu = true;
});

$('body').click(function() {
  if (!clickMenu) {
    $('.nav__item__dropdown .dropdown').removeClass('dropdown--show');
    $('.nav__item__dropdown [data-toggle="dropdown"]').attr(
      'aria-expanded',
      false
    );
  }
  if ($('.nav__item__dropdown .dropdown').hasClass('dropdown--show')) {
    clickMenu = false;
  }
});

// Scroll-based animation
// -----------------------------------------------------------------------------
// Cache reference to window and animation items
var $animation_elements = $('.scroll-animation');
var $window = $(window);
var $body = $('body');

// Scroll Position Detection
function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = window_top_position + window_height;

  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = element_top_position + element_height;

    //check to see if this current container is within viewport
    if (
      element_bottom_position >= window_top_position &&
      element_top_position <= window_bottom_position
    ) {
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
  });
}

// Handling Resizing
$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');

$dropdownMenu = $('.nav__item__dropdown .dropdown');

// Sticky header
// -----------------------------------------------------------------------------
$(window).scroll(function() {
  if ($(window).scrollTop() >= 100) {
    $('.navbar').addClass('navbar--show');
  } else {
    if ($dropdownMenu.hasClass('dropdown--show') && $body.hasClass('home')) {
      $dropdownMenu.removeClass('dropdown--show');
      $('.nav__item__dropdown button[data-toggle="dropdown"]').attr(
        'aria-expanded',
        false
      );
    }
    $('.navbar').removeClass('navbar--show');
  }
});

// Training tab
// -----------------------------------------------------------------------------
$('.tab-training__item a')
  .mouseover(function() {
    $(".tab-training__item a[aria-selected='true']").addClass('hide');
  })
  .mouseout(function() {
    $(".tab-training__item a[aria-selected='true']").removeClass('hide');
  });

$('.tab-training__item a').on('click', function(event) {
  event.preventDefault();
  $('.tab-training__item a').attr('aria-selected', 'false');
  $(this).attr('aria-selected', 'true');
  $('.tab-training__item a').removeClass('hide');
  $('.tab-training__pane').removeClass('show');
  var tab_id = '#' + $(this).attr('arial-controls');
  $(tab_id).addClass('show');
});

// Toggle navbar (mobile device)
// -----------------------------------------------------------------------------
$('.navbar__toggler').click(function() {
  if ($(this).attr('aria-expanded') === 'true') {
    $(this).attr('aria-expanded', false);
  } else {
    $(this).attr('aria-expanded', true);
  }

  $('body').toggleClass('navbar--open');
  $('.navbar__nav__container').toggleClass('show');
});

// Setting Custom Property
// Capture w JS the SRC of the image in use
// Concatenate the method url() to the string
// Assign it to --bg-image
// Use it as background-image
// -----------------------------------------------------------------------------

/*

2) IMPORTANTE

Para que funcione el efecto de desenfoque en la maqueta hay que
reconstruir la URL de la imagen por eso tenemos que coger el origen
y la url de la imagen. En el drupal no hace falta porque los enlaces
a los recursos ya es absoluta

*/

function settingCustomProperty(array, prop) {
  // DEVELOPMENT MODE
  var BASE_URL = document.location.origin;

  array.each(function() {
    var imagePath = $(this).attr('src');

    // DEVELOPMENT MODE
    imagePath = 'url(' + BASE_URL + '/' + imagePath + ')';

    // DRUPAL MODE
    // imagePath = 'url(' + imagePath + ')';
    $(this)
      .parent()[0]
      .style.setProperty(prop, imagePath);
  });
}

var mainSliderImages = $('.main-slider__fig img');

if (mainSliderImages.length > 0) {
  if (navigator.userAgent.indexOf('Edge') === -1) {
    settingCustomProperty(mainSliderImages, '--bg-image');
  }
  // msEdgeBlur();
}

// Slick carousel
// -----------------------------------------------------------------------------
$(document).ready(function() {
  $('.slider').slick({
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });

  $('.slider-bootcamp').slick({
    dots: false,
    infinite: true,
    speed: 600,
    autoplay: false,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    // adaptiveHeight: true,
  });

  // SLIDER HOME
  var $slick_home = $('.main-slider__content');

  $slick_home.slick({
    dots: true,
    arrows: false,
    // infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  $slick_home.on('init', function(event, slick) {
    $slick_home.find('.slick-current').removeClass('slick-active');

    setTimeout(function() {
      $slick_home.find('.slick-current').addClass('slick-active');
    }, 1);
  });

  $slick_home.on('beforeChange', function(
    event,
    slick,
    currentSlide,
    nextSlide
  ) {
    $('.main-slider__content .slick-dots li').removeClass('slick-active');
    $('.main-slider__content .slick-dots li button')
      .attr('aria-pressed', 'false')
      .focus(function() {
        this.blur();
      });
  });
});

// Smooth scroll
// -----------------------------------------------------------------------------
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')

  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') ==
        this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        
        if( $('.btn-followme-js').length ) {
          var targetOffset = target.offset().top - 0;
        } else {
          var targetOffset = target.offset().top - 140;
          
        }
        $('html, body').animate(
          {
            scrollTop: targetOffset,
          },
          1000,
          function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(':focus')) {
              // Checking if the target was focused
              return false;
            } else {
              //$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            }
          }
        );
      }
    }
  });

$(document).ready(function() {
  $('.accordion .accordion__btn').on('click', function(event) {
    var item = $(this).closest('.accordion__item');
    if (item.hasClass('accordion__item--show')) {
      item.removeClass('accordion__item--show');
    } else {
      item.addClass('accordion__item--show');
    }
  });

  $('.accordion_type2 .accordion__button').on('click', function(event) {
    var item = $(this)
      .closest('.accordion_type2')
      .find('.accordion__pane');

    if (item.hasClass('show')) {
      item.removeClass('show');
      $(this).attr('aria-expanded', 'false');
    } else {
      item.addClass('show');
      $(this).attr('aria-expanded', 'true');
    }
  });

  // bootcamp-timeline__tabs
  // -----------------------------------------------------------------------------

  $('.bootcamp-timeline__item a').on('click', function(event) {
    event.preventDefault();
    $('.bootcamp-timeline__item a').attr('aria-selected', 'false');
    $(this).attr('aria-selected', 'true');
    $('.bootcamp-timeline__pane').removeClass('show');
    var tad_id = '#' + $(this).attr('arial-controls');
    $(tad_id).addClass('show');
  });
});

// For cb-numbers__list and bootcamp-sheet__details__logos
// ------------------------------------------------------------------------------
$(window).on('load resize orientationchange', function() {
  var $carousel = $('#cb-numbers__list');
  // Initializes a slick carousel only on mobile screens
  // slick on mobile
  if ($(window).width() >= 768) {
    if ($carousel.hasClass('slick-initialized')) {
      $carousel.slick('unslick');
    }
  } else {
    if (!$carousel.hasClass('slick-initialized')) {
      $carousel.slick({
        infinite: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
      });
    }
  }

  var $carousel2 = $('#bootcamp-sheet__details__logos');
  if ($(window).width() >= 768) {
    if ($carousel2.hasClass('slick-initialized')) {
      $carousel2.slick('unslick');
    }
  } else {
    if (!$carousel2.hasClass('slick-initialized')) {
      $carousel2.slick({
        infinite: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
      });
    }
  }
});

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function showError(input, add) {
  if (add) {
    input.closest('.form-group').addClass('error');
  } else {
    input.closest('.form-group').removeClass('error');
  }
}

function validateInputs(inputs) {
  var errors = false;
  for (var i = 0; i < inputs.length; i++) {
    var input = $(inputs[i]);
    showError(input, false);
    switch (input.attr('type')) {
      case 'text':
        if (input.attr('required') && !input.val()) {
          errors = true;
          showError(input, true);
        }
        break;
      case 'select':
        if (input.attr('required') && !input.val()) {
          errors = true;
          showError(input, true);
        }
        break;
      case 'email':
        if (input.attr('required') && !validateEmail(input.val())) {
          errors = true;
          showError(input, true);
        }
        break;
      case 'checkbox':
        if (input.attr('required') && !input.is(':checked')) {
          errors = true;
          showError(input, true);
        }
        break;
    }
  }
  return errors;
}
function validateSelects(selects) {
  var errors = false;
  for (var i = 0; i < selects.length; i++) {
    var select = $(selects[i]);
    showError(select, false);
    if (!select.val()) {
      showError(select, true);
      errors = true;
    }
  }
  return errors;
}

function qs(key) {
  key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, '\\$&'); // escape RegEx meta chars
  var match = location.search.match(new RegExp('[?&]' + key + '=([^&]+)(&|$)'));
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function validateRecaptcha() {
  if (!grecaptcha.getResponse()) {
    showError($('#recaptcha'), true);
    return true;
  } else {
    showError($('#recaptcha'), false);
    return false;
  }
}

// Descarga temario
// -----------------------------------------------------------------------------
$('.btn-download-topic').click(function() {
  $(this).addClass('hide');
  $('.training-syllabus__download__form--wrapper').removeClass('hide');
});

// Solicitar Beca
// -----------------------------------------------------------------------------
$('.js-grant').on('click', function() {
  $(this).addClass('hide');
  $('.grant-form').removeClass('hide');
});

// Followme
// -----------------------------------------------------------------------------
if($(document).width() >= 1024) {
  if($('.campaign').length) {
    var followme = $('.campaign-followme');
    var followmeTop = $('.campaign-followme').offset().top;
    //var followmeRight = ($(window).width() - (followme.offset().left + followme.outerWidth()));
    $(window).scroll(function() {
      var currentScroll = $(window).scrollTop();
      if (currentScroll >= followmeTop) {
        $('.campaign-followme').css({
          position: 'fixed',
          top: '40px',
          right: '30px'
        });
      } else {
        $('.campaign-followme').css({
          position: 'fixed',
          top: '98px',
          right: '30px'
        });
      }
    });
  }
}


// Followme
// -----------------------------------------------------------------------------
if($(document).width() < 1024) {
  if($('.campaign:not(.campaign--info)').length) {
    var followme = $('.campaign-followme');
    var followmeTop = $('.campaign-followme').offset().top;
    var followmeRight = ($(window).width() - (followme.offset().left + followme.outerWidth()));
    $(window).scroll(function() {
      var currentScroll = $(window).scrollTop();
      if (currentScroll >= followmeTop) {
        $('.campaign-header__button').css({
          display: 'none'
        });
      } else {
        $('.campaign-header__button').css({
          display: 'block'
        });
      }
    });
  }
}


/*

}) (jQuery);

1) IMPORTANTE

Para que la maqueta funcione correctamente en drupal
necesitamos envolver `main.js` en una fn anónima y pasarle la
referencia a jQuery pero la maqueta no funciona porque desde
`subscription.js` se hace llama a qs() y no estaría disponible

*/
