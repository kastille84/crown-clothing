import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const config =  {
  apiKey: "AIzaSyAoDls6Qr4QMWsvBeacGeNgaABRMXjg9to",
  authDomain: "crwn-db-d2efc.firebaseapp.com",
  databaseURL: "https://crwn-db-d2efc.firebaseio.com",
  projectId: "crwn-db-d2efc",
  storageBucket: "",
  messagingSenderId: "569777474464",
  appId: "1:569777474464:web:7538afb4a29154b0d6b2c5"
};

//take userauth from firebase and store it in db
//userAuth, is what we get back from the authentication library
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  //query in firestore for the document to see if it already exists
  const userRef= firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    //if doens't exist then we can create it
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef;
}

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