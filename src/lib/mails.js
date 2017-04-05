/**
 * @overview Various email template functions.
 */
'use strict';

import { transporter } from './../config/nodemailer';

const API_HOST = process.env.API_HOST;
const EMAIL_URI = process.env.EMAIL_URI;

/**
 * Sends the activation mail containing the URL to activate the account.
 *
 * @param {Object} user - The user's data.
 * @param {String} user.emal - The user's email.
 * @param {String} token - The token string.
 */
export async function sendActivationMail (user, token) {
  const activationURL = `${API_HOST}/api/v1/activation/${token}`;

  const mailOptions = {
    from: `"LetsMeet Team" <${EMAIL_URI}>`,
    to: user.email,
    subject: 'Verify email',
    text: `Verify your email by following this link: ${activationURL}.`,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}
