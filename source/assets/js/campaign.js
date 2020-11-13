$(document).ready(function () {
    

    $('#campaignForm').submit(function (event) {
        event.preventDefault(); // Para que el formulario no se envie por HTML.
        var form = $(this);
        var inputs = form.find('input');
        
        if (!validateInputs(inputs) & !validateSelects(form.find('select'))) {
            form.find(':submit').prop('disabled', true);
            const body = form.serializeArray().reduce((obj, el) => {
                obj[el.name] = el.value;
                return obj
            }, {});
            //body['g-recaptcha-response'] = grecaptcha.getResponse();
            $.ajax(form.attr('action'), {
                    data: JSON.stringify(body),
                    contentType: 'application/json',
                    type: form.attr('method')
                })
                .done(function (data) {
                    console.log('ok');
                    var url = "https://campus.boream.com/mensaje-gracias.html";
                    window.location = url;
                    // $('.contact__form__wrapper').hide();
                    // $('.contact__form__response').show();
                }).fail(function (err) {
                    console.error(err);
                });
        }
    });

    // $('.js-check-link').on('click', function () {
    //     hrefLink = window.location.href;
    //     var checkLegal = hrefLink;

    //     // Guardando los datos en el LocalStorage
    //     localStorage.setItem("idCheckLegal", checkLegal);

    // })

    // $('.default-page-campaign .navbar__close').on('click', function () {
    //     // Recoge los datos del LocalStorage en una variable
    //     var backToUrl = localStorage.getItem("idCheckLegal");
    //     window.location.href = backToUrl;
 
    // })

    
    
});