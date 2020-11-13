function validateTel(tel) {
    if (!tel) {
        return false;
    }
    const regex = /^[679]{1}[0-9]{8}$/g;
    return regex.test(tel);
}

function validateEmail(email) {
    if (!email) {
        return false;
    }

    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

function validateText(text) {
    if (!text) {
        return false;
    }
    const textWithoutSpaces = text.replace(/ /g,'');
    if (textWithoutSpaces.length > 2 && textWithoutSpaces.length < 50000) {
        return true;
    }
    return false;
}

function validateCheckbox(check) {
    return check === 'true';
}

function validateContact(body) {
    return validateEmail(body.email) && validateText(body.name) &&
     validateCheckbox(body.legal) && 
     validateText(body.phone) ;
}
function validateSubscription(body) {
    return validateEmail(body.email) && validateText(body.name) &&
     validateCheckbox(body.legal) && validateText(body.title) &&
     validateText(body.phone) && validateText(body.date) && validateText(body.know) ;
}
function validateDownload(body) {
    return validateEmail(body.email) && validateText(body.name) &&
     validateCheckbox(body.legal) ;
}

module.exports = {
    validateContact,
    validateSubscription,
    validateDownload
}