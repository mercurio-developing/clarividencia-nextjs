const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
var nodemailer = require("nodemailer");
import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD','POST'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

const oauth2Client = new OAuth2(
  process.env.clientId,
  process.env.clientSecret, // Client Secret
  process.env.redirectUrl // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.refreshToken
});

const accessToken = oauth2Client.getAccessToken()

// configuration ===========================================
let smtpTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: process.env.user,
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    refreshToken: process.env.refreshToken,
    accessToken: accessToken
  }
});

export default async function (req, res) {
  const mailOptions = {
    from: req.body.email,
    subject: 'CLARIVIDENCIA contact',
    html: '<h1>CLARIVIDENCIA CONTACT</h1></br><div><p><b>MESSAGE:</br></b>' + req.body.message + ' </div><div><b>Nombre de cliente:</b> ' + req.body.name + '</p></div><div><p><b>Email:</b> ' + req.body.email + '</p></div>', // html body
    to: 'clarividenciafotografia@gmail.com'
  }
  await runMiddleware(req, res, cors)


  if (req.method === 'POST') {
    let info = await smtpTransport.sendMail(mailOptions).then(data => data
    ).catch(err => err)
    if (info.messageId) {
      console.log('Message sent: %s', info.messageId);
      res.json({ message: 'Mail sent!' });
    } else {
      console.log('Message Not sent');
      res.json({ message: 'Mail not sent!' });
    }
  }
}
