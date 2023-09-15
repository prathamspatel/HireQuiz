// pages\auth.js
// Created by: Parita
// Last Updated by: Parita on June 21
import { Amplify, Auth } from 'aws-amplify';
import dotenv from 'dotenv';

dotenv.config();

Amplify.configure({
  Auth: {
    region: 'us-east-1',

    //userPoolId: process.env.AWS_COGNITO_POOL_ID,
    userPoolId: 'us-east-1_3Jbtr8x7V',
    //userPoolWebClientId: process.env.AWS_COGNITO_CLIENT_ID,
    userPoolWebClientId: '5geij0ere3a8qgqkqho28khd0c',

    oauth: {
      //domain: process.env.AWS_COGNITO_HOSTED_UI_DOMAIN,
      domain: 'hire-quiz.auth.us-east-1.amazoncognito.com',
      scope: ['email', 'profile', 'openid'],
      // redirectSignIn: process.env.OAUTH_SIGN_IN_REDIRECT_URL,
      redirectSignIn: 'https://hire-quiz.vercel.app/jobform',

      // redirectSignOut: process.env.OAUTH_SIGN_OUT_REDIRECT_URL,
      redirectSignOut: 'https://hire-quiz.vercel.app',

      responseType: 'code',
    },
  },
});

/**
 * Get the authenticated user
 * @returns Promise<user>
 */
async function getUser() {
  try {
    const currentAuthenticatedUser = await Auth.currentAuthenticatedUser();
    const username = currentAuthenticatedUser.username;
    const idToken = currentAuthenticatedUser.signInUserSession.idToken.jwtToken;
    const accessToken = currentAuthenticatedUser.signInUserSession.accessToken.jwtToken;
    const displayArrayToken = { "idToken": idToken };
    console.log('The user is authenticated', displayArrayToken);

    return {
      username,
      idToken,
      accessToken,
      authorizationHeaders: (type = 'application/json') => {
        const headers = { 'Content-Type': type };
        headers['Authorization'] = `Bearer ${idToken}`;
        return headers;
      },
    };
  } catch (err) {
    console.log(err);
    return null;
  }
}

export { Auth, getUser };