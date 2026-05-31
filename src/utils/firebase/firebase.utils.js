import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { 
  getFirestore,
  doc,
  getDoc,
  setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDerWgZcTQK05RXbUjAyxeWDyd391u8fbE",
  authDomain: "crown-clothing-db-1b506.firebaseapp.com",
  projectId: "crown-clothing-db-1b506",
  storageBucket: "crown-clothing-db-1b506.firebasestorage.app",
  messagingSenderId: "866861544545",
  appId: "1:866861544545:web:8a0ce51120ac51db39e620"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) =>{
  const userDocRef = doc(db, "users", userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if(!userSnapshot.exists()) {
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error){
console.log('error creating the user', error.message);
    }
  
  
} 
return userDocRef
  
}

