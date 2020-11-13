require('dotenv').config();
const Koa = require('koa');
const body = require('koa-body');
const cors = require('koa-cors');
const static = require('koa-static');
const Router = require('koa-router');
const GoogleRecaptcha = require('google-recaptcha');
const nodemailer = require('nodemailer');
const {
  validateContact,
  validateSubscription,
  validateDownload,
} = require('./validations');

const googleRecaptcha = new GoogleRecaptcha({
  secret: process.env.GOOGLE_RECAPTCHA,
});

const router = new Router();

const validateRecaptcha = async (ctx, next) => {
  try {
    const promise = await new Promise((resolve, reject) => {
      googleRecaptcha.verify(
        {
          response: ctx.request.body['g-recaptcha-response'],
        },
        error => {
          if (error) {
            console.error(error);
            reject(error);
            return;
          }
          resolve();
        }
      );
    });
  } catch (err) {
    console.error(err);
    ctx.throw(400, 'Error captcha');
    return;
  }
  await next();
};

async function sendMail(content, email, subject) {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    tls: { rejectUnauthorized: false },
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.FROM, // sender address
    to: process.env.TO, // list of receivers
    subject, // Subject line
    text: content, // plain text body
    // html: content // html body
    replyTo: email,
  };

  await transporter.sendMail(mailOptions);
}

async function sendMailReceived(content, email, subject) {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    tls: { rejectUnauthorized: false },
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.FROM, // sender address
    to: email, // list of receivers
    subject, // Subject line
    text: content, // plain text body
    html: content, // html body
  };

  await transporter.sendMail(mailOptions);
}

router.post('/form/contact', validateRecaptcha, async ctx => {
  const body = ctx.request.body;
  if (!ctx.request.body || !validateContact(ctx.request.body)) {
    ctx.throw(400, 'Error in body');
    return;
  }
  const content = `
    Email: ${body.email} </br>
    Name: ${body.name}</br>
    Phone: ${body.phone}</br>
    ${
      body.subscribe === 'true'
        ? 'El usuario quiere subscribirse </br>'
        : 'No quiere subscribirse </br>'
    }
    El usuario ha aceptado la politica de privacidad</br>
    </br>
    Mensaje:

    ${body.comments}
    `;
  console.log('send mail');
  await sendMail(content, body.email, 'Contacto');
  await sendMailReceived(
    require('./email-contact'),
    body.email,
    'Contacto Recibido'
  );
  console.log('Mail sended!!!');

  ctx.body = '';
});

router.post('/form/download', validateRecaptcha, async ctx => {
  const body = ctx.request.body;
  if (!ctx.request.body || !validateDownload(ctx.request.body)) {
    ctx.throw(400, 'Error in body');
    return;
  }
  const content = `
    Email: ${body.email} 
    Name: ${body.name}
    ${
      body.subscribe === 'true'
        ? 'El usuario quiere subscribirse '
        : 'No quiere subscribirse '
    }
    El usuario ha aceptado la politica de privacidad
    `;
  console.log('send mail');
  await sendMail(content, body.email, 'Bootcamp: Descarga temario');
  await sendMailReceived(
    require('./email-download'),
    body.email,
    'Temario Bootcamp Campus Boream'
  );
  console.log('Mail sended!!!');

  ctx.body = '';
});

router.post('/form/grant', validateRecaptcha, async ctx => {
  const body = ctx.request.body;
  console.log(body);
  if (!ctx.request.body || !validateDownload(ctx.request.body)) {
    ctx.throw(400, 'Error in body');
    return;
  }
  const content = `
    Email: ${body.email} 
    Name: ${body.name}
    Phone: ${body.phone}
    ${
      body.subscribe === 'true'
        ? 'El usuario quiere subscribirse '
        : 'No quiere subscribirse '
    }
    El usuario ha aceptado la politica de privacidad y las bases de la beca
    `;
  console.log('send mail');
  await sendMail(content, body.email, 'Bootcamp: Solicitud de beca');
  await sendMailReceived(
    require('./email-grant'),
    body.email,
    'Beca 50% Bootcamp Full Stack Developer'
  );
  console.log('Mail sended!!!');

  ctx.body = '';
});

router.post('/form/subscription', validateRecaptcha, async ctx => {
  const body = ctx.request.body;
  if (!ctx.request.body || !validateSubscription(ctx.request.body)) {
    ctx.throw(400, 'Error in body');
    return;
  }
  const content = `
    Landing: ${body.landing}</br>
    Email: ${body.email}</br>
    Name: ${body.name}</br>
    Phone: ${body.phone}</br>
    Course: ${body.title}</br>
    Date: ${body.date}</br>
    Know: ${body.know}</br>
    ${
      body.subscribe === 'true'
        ? 'El usuario quiere subscribirse'
        : 'No quiere subscribirse</br>'
    }
    El usuario ha aceptado la politica de privacidad

    Mensaje:

    ${body.comments}
    `;

  console.log('send mail');

  if (body.title === 'Full Stack developer ') {  
    await sendMail(
    content,
    body.email,
    'Solicitud de información de Bootcamp Full Stack Developer');
    await sendMailReceived(
      require('./email-bootcamp'),
      body.email,
      'Solicitud de información de Bootcamp Full Stack Developer');

  } else {
    await sendMail(
    content,
    body.email,
    'Solicitud de información de Curso: ' + body.title
    );
    await sendMailReceived(
      require('./email-courses')(
        body.title,
        body.icon,
        body.hrefFaqs
      ),
      body.email,
      'Solicitud de información de Curso ' + body.title
    );
  }

  console.log('Mail sended!!!');

  ctx.body = '';
});

const app = new Koa();
app.use(cors());
app.use(body());
app.use(static(__dirname + '/build'));

app.use(router.middleware());

app.listen(3050, '0.0.0.0', err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Server started in port 3050');
});
