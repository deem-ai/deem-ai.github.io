require('dotenv').config()
const express = require('express')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const app = express()

app.use('/scripts', express.static(__dirname + '/node_modules/'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

app.listen(3000, () => console.log('Server running on port 3000'))

//https://codeburst.io/sending-an-email-using-nodemailer-gmail-7cfa0712a799
app.post('/contact', function (req, res) {
    console.log(GMAIL_USER);
    console.log(GMAIL_PASS);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: GMAIL_USER,
          pass: GMAIL_PASS
        }
    });
    const mailOptions = {
        from: req.body.name + ' &lt;' + req.body.email + '&gt;',
        to: GMAIL_USER,
        subject: 'New message from contact form at deem-ai.com.co',
        text: `${req.body.name} ${req.body.lastName} (${req.body.email}, ${req.body.phone}) says: ${req.body.message}`
    };
    console.log(mailOptions)
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            res.render('contact-failure');
            console.log(err);
        }else{
            res.render('contact-success');
            console.log(info);
        }
    });
    return;
});