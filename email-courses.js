module.exports = (title, icon, href) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>[ASUNTO]</title>

    <style type="text/css">
      <!--
      html {
        margin: 0;
      }

      body {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
        margin: 0 !important;
        width: 100% !important;
        font-family: 'Trebuchet MS', helvetica, arial, sans-serif;
        -webkit-text-size-adjust: 100% !important;
        -ms-text-size-adjust: 100% !important;
        -webkit-font-smoothing: antialiased !important;
        background-color: #ffffff;
      }

      a {
        color: #0091FF;
      }

      p,
      h1,
      h2,
      div,
      li {
        margin: 0;
        padding: 0;
        mso-line-height-rule: exactly;
      }

      ul,
      ol {
        margin-top: 0;
        margin-bottom: 0;
        line-height: 1.7;
      }

      p+ul,
      p+ol,
      ul+p,
      ol+p {
        margin-top: 1rem;
      }


      h1,
      h2 {
        font-weight: normal;
        background: transparent !important;
        border: none !important;
      }

      table {
        mso-table-lspace: 0;
        mso-table-rspace: 0;
      }

      p {
        font-size: 16px;
        line-height: 1.7;
        color: #323232;
      }

      img {
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
        width: auto;
        max-width: 100%;
        clear: both;
        display: block;
        float: none;
      }
      -->
    </style>

    <!--[if gte mso 9]>
      <style type="text/css">
        td {
          padding-top: 0 !important;
        }
      </style>
    <![endif]-->
  </head>

  <body
    paddingwidth="0"
    paddingheight="0"
    bgcolor="#ffffff"
    style="padding-top: 0; padding-bottom: 0;width: 100% !important;max-width:600px!important;margin:0 auto!important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased;"
    offset="0"
    toppadding="0"
    leftpadding="0"
  >
    <table
      width="100%"
      border="0"
      cellspacing="0"
      cellpadding="0"
      style="max-width:100%; width:100%; margin:auto;"
    >
      <thead>
        <tr>
          <td width="33" height="33" style="min-width:33px">&nbsp;</td>
          <td width="" height="33"></td>
          <td width="33" height="33" style="min-width:33px">&nbsp;</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td width="33" height="63" style="min-width:33px">&nbsp;</td>
          <td width="" height="63">
            <a
              href="https://campus.boream.com/"
              title="Campus Boream"
              target="_blank"
            >
              <img
                src="https://campus.boream.com/assets/images/email/logo-campus-boream.png"
                alt="Campus Boream"
                width="160"
                style="max-width:160px;height:auto;width:100%;border:0;display:block"
              />
            </a>
          </td>
          <td width="33" height="63" style="min-width:33px">&nbsp;</td>
        </tr>
        <tr>
          <td width="33" height="40" style="min-width:33px">&nbsp;</td>
          <td width="" height="40">&nbsp;</td>
          <td width="33" height="40" style="min-width:33px">&nbsp;</td>
        </tr>
        <tr>
          <td width="33" style="min-width:33px">&nbsp;</td>
          <td width="" style="padding-bottom:35px">
            <span style="font-size:24px; font-weight:bold"
              >Solicitud de información recibida!</span
            >
          </td>
          <td width="33" style="min-width:33px">&nbsp;</td>
        </tr>
        <tr>
          <td width="33" style="min-width:33px">&nbsp;</td>
          <td
            width=""
            style="background-image:url(https://campus.boream.com/assets/images/email/campaing.jpg);background-size:cover"
          >
            <table width="" cellspacing="0" cellpadding="0">
              <tbody>
                <tr>
                  <td width="24">&nbsp;</td>
                  <td width="" style="padding-top:72px;padding-bottom:64px">
                    <img
                      src="${icon}"
                      alt="Logo ${title}"
                      width="44"
                      style="max-width:44px;height:auto;width:100%;border:0;display:block"
                    />
                    <p
                      style="color:#ffffff;font-size:30px;font-weight:bold;line-height: 1.25;padding-top: 10px;"
                    >
                      Curso<br />
                      <span style="font-weight:lighter;">${title}</span>
                    </p>
                  </td>
                  <td width="24">&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </td>
          <td width="33" style="min-width:33px">&nbsp;</td>
        </tr>
        <tr>
          <td width="33" style="min-width:33px">&nbsp;</td>
          <td width="" style="padding-top:24px; padding-bottom:28px">
            <p>
              Muchas gracias por solicitar información sobre nuestro
              <span style="color:#01C3B2">${title}</span>.
            </p>
          </td>
          <td width="33" style="min-width:33px">&nbsp;</td>
        </tr>
        <tr>
          <td width="33" style="min-width:33px">&nbsp;</td>
          <td width="" style="padding-bottom:28px">
            <p>
              <span style="color:#01C3B2"
                >En breve nos pondremos en contacto contigo</span
              >
              para resolver posibles dudas y darte toda la información que
              necesites.
            </p>
          </td>
          <td width="33" style="min-width:33px">&nbsp;</td>
        </tr>
        <tr>
          <td width="33" style="min-width:33px">&nbsp;</td>
          <td width="" style="padding-bottom:54px">
            <p>
              Mientras tanto puedes echar
              <a href="${href}" target="_blank">un vistazo a las FAQs</a>
            </p>
          </td>
          <td width="33" style="min-width:33px">&nbsp;</td>
        </tr>
        <tr>
          <td width="33" style="min-width:33px">&nbsp;</td>
          <td
            width=""
            style="border-top:1px solid #979797; border-bottom:1px solid #979797; padding-top: 32px; padding-bottom: 32px"
          >
            <table width="" cellspacing="0" cellpadding="0" align="center">
              <tbody>
                <tr>
                  <td width="44" valign="bottom">
                    <a
                      href="https://www.linkedin.com/company/boream/"
                      target="_blank"
                      style="display:block"
                      title="Sigue a Boream en Linkedin"
                    >
                      <img
                        width="34"
                        src="https://campus.boream.com/assets/images/email/linkedin.png"
                        alt="Boream en Linkedin"
                        style="max-width: 34px;height:auto;width:100%;border:0;display:block"
                      />
                    </a>
                  </td>
                  <td width="44" valign="bottom">
                    <a
                      href="https://twitter.com/boreamoficial"
                      target="_blank"
                      style="display:block"
                      title="Sigue a Boream en Twitter"
                    >
                      <img
                        width="34"
                        src="https://campus.boream.com/assets/images/email/twitter.png"
                        alt="Boream en Twitter"
                        style="max-width: 34px;height:auto;width:100%;border:0;display:block"
                      />
                    </a>
                  </td>
                  <td width="44" valign="bottom">
                    <a
                      href="https://www.facebook.com/BoreamOficial/"
                      target="_blank"
                      style="display:block"
                      title="Sigue a Boream en Facebook"
                    >
                      <img
                        width="34"
                        src="https://campus.boream.com/assets/images/email/facebook.png"
                        alt="Boream en Facebook"
                        style="max-width: 34px;height:auto;width:100%;border:0;display:block"
                      />
                    </a>
                  </td>
                  <td width="44" valign="bottom">
                    <a
                      href="https://www.instagram.com/boreamoficial/"
                      target="_blank"
                      style="display:block"
                      title="Sigue a Boream en Instagram"
                    >
                      <img
                        width="34"
                        src="https://campus.boream.com/assets/images/email/instagram.png"
                        alt="Boream en Instagram"
                        style="max-width: 34px;height:auto;width:100%;border:0;display:block"
                      />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <td width="33" style="min-width:33px">&nbsp;</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td width="33" style="min-width:33px">&nbsp;</td>
          <td width="" style="text-align:center; padding:22px 0 29px">
            <p>
              <small
                >Boream Digital | C/ Teniente Coronel Noreña, 11 - 2ª | 28045 -
                Madrid<br />
                telf: 911 841 934 | email:
                <a
                  href="mailto:campus@boream.com"
                  target="_blank"
                  style="color: #0091FF;text-decoration:none;"
                  >campus@boream.com</a
                ><br />
                Whatsapp:
                <a
                  href="https://wa.me/34608281214"
                  target="_blank"
                  style="color: #0091FF;text-decoration:none;"
                  >608 281 214</a
                ></small
              >
            </p>
          </td>
          <td width="33" style="min-width:33px">&nbsp;</td>
        </tr>
      </tfoot>
    </table>
  </body>
</html>
`;
