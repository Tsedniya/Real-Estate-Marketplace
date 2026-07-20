import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const dispatch = useDispatch();   
  const navigate = useNavigate();  

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log("Backend URL:", import.meta.env.VITE_API_URL);
      // use relative URL so Vite dev proxy includes cookies correctly
      const res = await fetch(`/api/auth/google`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL
        }),
      });

      const text = await res.text();
      console.log('Google auth response status:', res.status);
      console.log('Google auth response text:', text);

      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseErr) {
        console.error('Failed to parse response:', parseErr);
        dispatch(signInFailure('Server error: invalid response'));
        return;
      }

      if (!res.ok || data.success === false) {
        dispatch(signInFailure(data.message || 'Failed to sign in with Google'));
        return;
      }

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.error('Google sign-in error:', error);
      dispatch(signInFailure(error.message || 'Could not sign in with Google'));
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="border p-3 rounded-lg w-full bg-white text-[#022222] hover:bg-[#191970] hover:text-white uppercase opacity-95"
    >
      CONTINUE WITH GOOGLE
    </button>
  );
};

export default OAuth;
