import React from 'react';
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';

const OAuth = () => {
    const handleGoogleClick = async()=>{

     try{
        const provider = new GoogleAuthProvider()
        const auth = getAuth(app)

        const result = await signInWithPopup(auth,provider)

        const res = await fetch('/api/auth/google',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({name:result.user.displayName, email:result.user.email,photo:result.user.photoURL}),
        });
        const data = await res.json();
        dispatch(signInSuccess(data));
        } catch(error){
            console.log('could not sign in with google', error);
        }
    }
  return (
    <button onClick={handleGoogleClick} type='button' className="border p-3 rounded-lg w-full bg-white text-[#022222] hover:bg-[#022222] hover:text-white uppercase opacity-95">CONTINUE WITH GOOGLE</button>
  )
}

export default OAuth;