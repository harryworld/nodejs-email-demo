var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/mail', function(req, res, next) {

  var transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
      user: 'postmaster@sandbox1e7780edf89c4a9c9bb9e1b58b8c1369.mailgun.org',
      pass: '88c0e851f5513c8cc5689c9838dc1869'
    }
  });

  var mailOptions = {
    from: '"GoSponge 👥" <admin@gosponge.com>', // sender address
    to: 'harryworld@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    res.render('index', { title: 'Email Sent' });
  });

});

module.exports = router;
