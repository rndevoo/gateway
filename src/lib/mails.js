// @flow

/**
 * @overview Various email template sender functions.
 */
'use strict';

import { transporter } from './../config/nodemailer';

const API_HOST: string = process.env.API_HOST || 'http://localhost:8080';
const EMAIL_URI: string = process.env.EMAIL_URI || 'example@example.com';

/**
 * @name sendActivationMail
 * @function
 *
 * @description
 * Sends the activation mail containing the URL to activate the account.
 *
 * @param {string} username - The user's username.
 * @param {string} email - The user's email.
 * @param {string} token - The token string.
 */
export async function sendActivationMail (
  { username, email }: { username: string, email: string },
  token: string,
) {
  const activationURL = `${API_HOST}/api/v1/activation?activation_token=${token}`;

  const emailText = `
  Hi, ${username}

  Thank you for registering in LetsMeet!

  Complete your registration by following this link: ${activationURL}


  LetsMeet Team.
  `;

  const mailOptions = {
    from: `"LetsMeet Team" <${EMAIL_URI}>`,
    to: email,
    subject: 'Confirm your LetsMeet email address!',
    text: emailText,
  };

  await transporter.sendMail(mailOptions);
}
