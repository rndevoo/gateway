/**
 * @overview Export the transporter with credentials and promisified.
 */
'use strict';

import nodemailer from 'nodemailer';

const EMAIL_SERVICE = process.env.EMAIL_SERVICE;
const EMAIL_URI = process.env.EMAIL_URI;
const EMAIL_PASS = process.env.EMAIL_PASS;

let transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_URI,
    pass: EMAIL_PASS,
  },
});

transporter._sendMail = transporter.sendMail;

// Wrap .sendEmail() in a promise.
transporter.sendMail = (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter._sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};

export { transporter };
