$(document).ready(function() {
  $('.bootcamp-form').submit(function(event) {
    event.preventDefault(); // Para que el formulario no se envie por HTML.
    var form = $(this);
    var inputs = form.find('input');

    if (
      !validateInputs(inputs) &
      !validateSelects(form.find('select')) &
      !validateRecaptcha()
    ) {
      form.find(':submit').prop('disabled', true);
      const body = form.serializeArray().reduce((obj, el) => {
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
          console.log(data);
          form
            .parent()
            .find('.thanks_message')
            .removeClass('hide');
          form.addClass('hide');
        })
        .fail(function(err) {
          console.error(err);
        });
    }
  });

});
