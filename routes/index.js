var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path');

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

  var template = new EmailTemplate(path.join(__dirname, '..', 'templates', 'alert'))

  var locals = {
      username: 'Node Mailer',
      password: '!"\'<>&some-thing'
  };

  template.render(locals, function(err, results) {
    if (err) {
      return console.error(err);
    }

    transporter.sendMail({
      from: 'Go <admin@gosponge.com>',
      to: 'harryworld@gmail.com',
      subject: 'Welcome to join GoSponge',
      html: results.html,
      text: results.text
    }, function(err, responseStatus) {
      if (err) {
        return console.error(err);
      } else {
        res.render('index', { title: 'Email Sent' });
      }
    })
  });

});

module.exports = router;
