import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../../firebase/firebase';
import { setUser } from '../../features/userSlice';
import axios from 'axios';

const Login = () => {
  const dispatch = useDispatch();  // Get the dispatch function
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithGoogle();  // Sign in with Google
      const user = result.user;

      // Dispatch setUser to store the user data in Redux
      dispatch(setUser({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      }));

      // Send the user data to backend (to update in MongoDB)
      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        createdAt: new Date(),
        uid: user.uid,
      };
      await axios.put('http://localhost:5000/users', userData);  

      // Redirect to the Dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <button onClick={handleLogin} className="p-4 bg-blue-500 text-white rounded">
        Login with Google
      </button>
    </div>
  );
};

export default Login;
