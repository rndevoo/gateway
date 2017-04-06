/**
 * @overview Various email template sender functions.
 */
'use strict';

import { transporter } from './../config/nodemailer';

const API_HOST = process.env.API_HOST;
const EMAIL_URI = process.env.EMAIL_URI;

/**
 * @name sendActivationMail
 * @function
 *
 * @description
 * Sends the activation mail containing the URL to activate the account.
 *
 * @param {Object} user - The user's data.
 * @param {String} user.username - The user's username.
 * @param {String} user.emal - The user's email.
 * @param {String} token - The token string.
 */
export async function sendActivationMail (user, token) {
  const activationURL = `${API_HOST}/api/v1/activation?activation_token=${token}`;

  const emailText = `
  Hi, ${user.username}

  Thank you for registering in LetsMeet!

  Complete your registration by following this link: ${activationURL}


  LetsMeet Team.
  `;

  const mailOptions = {
    from: `"LetsMeet Team" <${EMAIL_URI}>`,
    to: user.email,
    subject: 'Confirm your LetsMeet email address!',
    text: emailText,
  };

  await transporter.sendMail(mailOptions);
}
