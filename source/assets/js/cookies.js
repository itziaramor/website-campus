window.cookieconsent.initialise({
  container: document.getElementById("content"),
  palette:{
    // popup: {background: "#105580"},
    button: {background: "transparent"},
  },
  content: {
    message: 'En esta web utilizamos cookies para analizar nuestro tráfico. Si continúas navegando, consideramos que aceptas nuestra',
    dismiss: 'Aceptar',
    link: 'política de cookies',
    href: '/politica-privacidad.html',
    close: '&#x274c;',
    policy: 'Política de privacidad',
    target: '_self',
  },
  revokable: true,
  onStatusChange: function(status) {
    console.log(this.hasConsented() ?
      'enable cookies' : 'disable cookies');
  },
  law: {
    regionalLaw: false,
  },
  location: true,
});