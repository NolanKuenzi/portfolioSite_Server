const router = require('express').Router();
const nodemailer = require('nodemailer');
const password = require('./nodemailerAuth.js');

router.post('/send/:host?', (req, res) => {
  if (req.body.name === '' || req.body.email === '' || req.body.message === '') {
    if (req.params.host === 'netlify') {
      res.redirect('https://pensive-swirles-801772.netlify.com/#/contact/');
      return;
    } else if (req.params.host === 'github') {
      res.redirect('https://nolankuenzi.github.io/#/contact/');
      return;      
    }
  }
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mr.nolank@gmail.com',
      pass: password.nodemailerPass,
    },
  });
  const mailOptions = {
    from: '',
    to: 'mr.nolank@gmail.com',
    subject: 'Message from website',
    text: `From: ${req.body.name}, Email: ${req.body.email}, Message: ${req.body.message}`,
  };
  transporter.sendMail(mailOptions);
  if (req.params.host === 'netlify') {
    res.redirect('https://pensive-swirles-801772.netlify.com/#/contact/');
    return;
  } else if (req.params.host === 'github') {
      res.redirect('https://nolankuenzi.github.io/#/contact/');
      return;      
  }
});

module.exports = router;
