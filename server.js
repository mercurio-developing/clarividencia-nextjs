const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
var nodemailer = require("nodemailer");
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const sgTransport = require('nodemailer-sendgrid-transport')

// configuration ===========================================
var smtpTransport = nodemailer.createTransport(sgTransport({
  auth: {
    api_key: process.env.SENDGRID_API
  }
}))


app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.json())
  /*
      Here we are configuring our SMTP Server details.
      STMP is mail server which is responsible for sending and recieving email.
  */

  /*------------------SMTP Over-----------------------------*/

  /*------------------Routing Started ------------------------*/

  server.post('/contact', function (req, res) {

    console.log(req.body,"caca")

    var mailOptions = {
      from: req.body.email,
      subject: 'CLARIVIDENCIA contact',
      html: '<h1>CLARIVIDENCIA CONTACT</h1></br><div><p><b>MESSAGE:</br></b>' + req.body.message + ' </div><div><b>Nombre de cliente:</b> ' + req.body.name + '</p></div><div><p><b>Email:</b> ' + req.body.email + '</p></div>', // html body
      to: 'clarividenciafotografia@gmail.com'
    }

    smtpTransport.sendMail(mailOptions, function (error, info) {
      console.log(error,info,"caca2")
      if (error) {
        emailMessage = "there was an error :-(, and it was this: " + error.message;
      } else {
        emailMessage = "Message sent: " + info.response;
      }
      return res.json({
        message: "success",
        email: emailMessage
      });
    });
  });

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Read on http://localhost:3000')
  })
})