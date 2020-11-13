$(document).ready(function() {
  var send = false;

  function closeModal() {
    if (send) {
      window.history.back();
    } else {
      window.history.back();
    }
  }

  function checkPromotion() {
    /*
      @param1 {String}
      @param2 {Object} 

      @return {}
    */
    function attachStuff(className, image, text) {
      var image =
        '<img src="assets/images/promotions/' +
        image.src +
        '" alt="' +
        image.alt +
        '" class="image-promotion"/>';
      $('body').addClass('subscription__page--' + className);
      $('main').prepend(image);
      $('#subscription button').text(text);
    }

    function updateFormAction(newAction) {
      $('form').attr('action', newAction);
    }

    function updateLegalDocument(text, url) {
      $('#legalDocument')
        .attr('href', url)
        .text(text);
    }

    var search = document.location.search;

    if (search.indexOf('promotion') === -1) return false;

    var promotion = search.substr(search.lastIndexOf('=') + 1);

    // Attach promotion stuff
    attachStuff(
      promotion,
      {
        src: 'grant/header-grant-shield.svg',
        alt: 'Beca Boream Bootcamp FullStack 2020',
      },
      'Solicitar beca'
    );
    updateFormAction('/form/grant');
    updateLegalDocument('las bases de la beca', 'beca-bootcamp-fullstack.html');
  }

  $('.navbar__close').on('click', closeModal);
  $('#close').on('click', closeModal);

  var slug = qs('course');
  var date = qs('date');
  var data = window.database;

  checkPromotion();


  $('.btn-js-parameter').on('click', function () {
    
        var urlLandingParam = new URLSearchParams(window.location.search);
        var landingParam = urlLandingParam.get('tipo');

        if (landingParam) {
          // Guardando los datos en LocalStorage
          localStorage.setItem('btnJsParam', landingParam);
        } else {
          localStorage.setItem('btnJsParam', '');
        } 


  })

  if( !$('.training__page.Bootcamp').length ) {

    for (var j = 0; j < data.length; j++) {
      if (data[j].slug === slug) {
        $('.subscription__header__inner i').addClass('icon-' + data[j].icon);
        $('.subscription__header__inner .subscription__heading').html(
          data[j].title + data[j].year
        );
        var convocatoria = $('#cboConvocatoria');
        $('#title').val(data[j].title);
        $('#year').val(data[j].year);
        $('#landing').val(localStorage.getItem('btnJsParam'));
        $('#hrefFaqs').val(window.location.origin + data[j].faqs);
        $('#icon').val(
          window.location.origin +
            '/assets/images/email/' +
            data[j].icon +
            '-email.png'
        );
        for (var i = 0; i < data[j].dates.length; i++) {
          convocatoria.append(
            $('<option>', {
              value: data[j].dates[i],
              text: data[j].dates[i],
              selected: date === data[j].dates[i],
            })
          );
        }
        break;
      }
    }

  }

  $('#subscription').submit(function(event) {
    event.preventDefault(); // Para que el formulario no se envie por HTML.
    var form = $(this);
    var inputs = form.find('input');
    if (
      !validateInputs(inputs) &
      !validateSelects(form.find('select')) &
      !validateRecaptcha()
    ) {
      form.find(':submit').prop('disabled', true);
      const body = form.serializeArray().reduce(function(obj, el) {
        obj[el.name] = el.value;
        return obj;
      }, {});
      body['g-recaptcha-response'] = grecaptcha.getResponse();

      $.ajax(form.attr('action'), {
        data: JSON.stringify(body),
        contentType: 'application/json',
        type: form.attr('method'),
        beforeSend: function(){
          $('.form-btn .btn__text').hide();
          $('.form-btn .spinner').css('display', 'flex');
        },
        complete: function(){
            $('.form-btn .btn__text').show();
            $('.form-btn .spinner').css('display', 'none');
        }
      })
        .done(function(data) {
          console.log('ok');
          send = true;
          $('.form-btn .btn__text').hide();
          $('.form-btn .spinner').show();
          $('.subscription__form__input .subscription__header__inner').hide();
          $('.subscription__form__input .subscription__form__wrapper').hide();
          $('.navbar__nav__icon').hide();
          $('.subscription__form__response').show();
        })
        .fail(function(err) {
          console.error(err);
        });
    }

    var _gaq = _gaq || [];
    var tempA = window.location.href.split('=');
    var tempB = tempA[1].split('&');
    _gaq.push(['_trackEvent', 'Formulario', 'Enviar', tempB[0]]);
  });
});
