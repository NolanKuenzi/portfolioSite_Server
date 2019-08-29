const router = require('express').Router();
const nodemailer = require('nodemailer');
const { body, sanitizeBody, validationResult } = require('express-validator');
require('dotenv').config();

router.post('/send', [
  body('name')
    .not().isEmpty().withMessage('Please fill out Name field')
    .trim()
    .isLength({max: 140}).withMessage('Name length of 140 characters has been exceeded'),
  sanitizeBody('name')
    .escape(),
  body('email')
    .not().isEmpty().withMessage('Please fill out Email field')
    .trim()
    .isLength({max: 140}).withMessage('Email length of 140 characters has been exceeded'),
  sanitizeBody('email')
    .escape(),
  body('message')
    .not().isEmpty().withMessage('Please fill out Message field')
    .trim()
    .isLength({max: 1000}).withMessage('Message length of 1000 characters has been exceeded'),
  sanitizeBody('message')
    .escape()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors.array()[0].msg);
    return;
  }
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mr.nolank@gmail.com',
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    from: '',
    to: 'mr.nolank@gmail.com',
    subject: 'Message from website',
    text: `From: ${req.body.name}, Email: ${req.body.email}, Message: ${req.body.message}`,
  };
  transporter.sendMail(mailOptions);
  res.sendStatus(200);
});

module.exports = router;
