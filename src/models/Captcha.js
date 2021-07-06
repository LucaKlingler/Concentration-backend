const mongoose = require('mongoose');

const { Schema } = mongoose;

// Inhalt der Captchas definieren
const captchaSchema = new Schema({
  userId: String,
  pictures: Array,
  failedCaptchas: Array,
  fails: Number,
  category: String,
  amount: Number,
  notificationTime: String,
  startTime: String,
  endTime: String,
  size: Number,
  challenge: Number,
});

const captcha = mongoose.model('captcha', captchaSchema);

module.exports = captcha;
