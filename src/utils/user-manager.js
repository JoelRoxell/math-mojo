// @flow
import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyAUdZAI9sudxBXjJY5D8LfROI1R3JmXND4',
  authDomain: 'math-mojo.firebaseapp.com',
  databaseURL: 'https://math-mojo.firebaseio.com',
  storageBucket: 'math-mojo.appspot.com',
  messagingSenderId: '684606710990'
});

/**
 * Used to authenticate users.
 */
class UserMAnager {
  user: any;
  token: string;

  /**
   * Signs a user in to a selected social media(google, facebook).
   * @param {string} type
   */
  signIn(type: string): void {
    // Using a redirect.
    firebase.auth().getRedirectResult().then(result => {
      if (result.credential) {
        // This gives you a Google Access Token.
        this.token = result.credential.accessToken;
      }
      this.user = result.user;
      console.log(this.user);
    });

    // Start a sign in process for an unauthenticated user.
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithRedirect(provider);

    // FB provider is currently broker.
    // Start a sign in process for an unauthenticated user.
    // var provider = new firebase.auth.FacebookAuthProvider();
    // provider.addScope('user_birthday');
    // firebase.auth().signInWithRedirect(provider);
  }

  /**
   * Keeps track of authentication state changes.
   */
  onAuthStateChanged(): void {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  }
}

export default UserMAnager;
