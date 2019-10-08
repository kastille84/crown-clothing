import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const config =  {
  apiKey: "AIzaSyAHTfW9qXzlj7QYXqhsYfb51EfY9SP-6fk",
  authDomain: "crwn-db-99ec2.firebaseapp.com",
  databaseURL: "https://crwn-db-99ec2.firebaseio.com",
  projectId: "crwn-db-99ec2",
  storageBucket: "",
  messagingSenderId: "571592188829",
  appId: "1:571592188829:web:3c18324fb990076a200574",
  measurementId: "G-SWTERE7HW9"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//set up google authentication
const provider = new firebase.auth.GoogleAuthProvider();
// custom prarmeters
// propmpt menas we want to always trigger google popup whenever we use this 
provider.setCustomParameters({prompt: 'select_account'})
//signInWithPopup takes provider class but from many diff types of popup, we just want google
//but there's also twitter etc.
export const signInWithGoogle = () => auth.signInWithPopup(provider);

//in case we need the whole library
export default firebase;

//**also we need to configure our project to use google signin, in the firebase website*/
//**look for authentication tab, look for google, hit the edit pencil, provide email */
//**now we can use it in our app */