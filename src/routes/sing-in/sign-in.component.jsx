import { getRedirectResult } from 'firebase/auth';
import {
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocumentFromAuth,} from '../../utils/firebase/firebase.utils';
import { useEffect } from 'react';


const SignIn = () =>{

 useEffect(async () =>{
    const response = await getRedirectResult(auth)
    if(response){
        const userDocRef = await createUserDocumentFromAuth(response.user)
    }
    
 }, []) 

 

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
    }
     const logGoogleRedirect = async () => {
     const {user} = await signInWithGoogleRedirect();
     createUserDocumentFromAuth(user);
     }
    return (
    <div>
        <h1>I am the sign in page</h1>
        <button onClick={logGoogleUser}>Sign in with Google</button>
         <button onClick={logGoogleUser}>Sign in with Redrect</button> 
    </div>
);
}

export default SignIn;