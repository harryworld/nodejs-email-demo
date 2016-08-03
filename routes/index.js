var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path');

var templateDir = path.join(__dirname, '..', 'templates', 'welcome-email');

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

  var sendWelcomeReminder = transporter.templateSender(new EmailTemplate(templateDir), {
    from: 'admin@gosponge.com',
  });

  sendWelcomeReminder({
    to: 'harryworld@gmail.com',
    // EmailTemplate renders html and text but no subject so we need to
    // set it manually either here or in the defaults section of templateSender()
    subject: 'Password reminder'
  }, {
      username: 'Node Mailer',
      password: '!"\'<>&some-thing'
  }, function(err, info){
      if(err){
        console.log(err);
      }else{
        console.log('Welcome email sent');
        res.render('index', { title: 'Email Sent' });
      }
  });

});

module.exports = router;
