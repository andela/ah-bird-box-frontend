import * as firebase from 'firebase';

const firebaseConfiguration = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
};
firebase.initializeApp(firebaseConfiguration);

export const auth = firebase.auth();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const FacebookProvider = new firebase.auth.FacebookAuthProvider();
