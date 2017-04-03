/**
 * @overview Various email template functions.
 */
'use strict';

import { transporter } from './nodemailer';

const API_HOST = process.env.API_HOST;
const EMAIL_URI = process.env.EMAIL_URI;

/**
 * Sends the activation mail containing the URL to activate the account.
 *
 * @param {}
 */
export async function sendActivationMail (to, token) {
  const activationURL = `${API_HOST}/api/v1/activation/${token.token}`;

  const mailOptions = {
    from: `"LetsMeet Team" <${EMAIL_URI}>`,
    to,
    subject: 'Verify email',
    text: `Verify your email by following this link: ${activationURL}.`,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}
