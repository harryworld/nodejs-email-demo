var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path');

var MailDev = require('maildev');

var maildev = new MailDev();
maildev.listen();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/mail', function(req, res, next) {

  var transporter = nodemailer.createTransport({
    port: 1025,
    ignoreTLS: true
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
