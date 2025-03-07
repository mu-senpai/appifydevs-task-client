import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../../firebase/firebase';
import { setUser } from '../../features/userSlice';
import axios from 'axios';
import { FaGoogle } from 'react-icons/fa';

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
      await axios.put('https://echogpt-server.vercel.app/users', userData);

      // Redirect to the Dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="w-full h-screen bg-[url('/login-bg.svg')] flex flex-col justify-center items-center">
      <div className="max-w-xs sm:max-w-md w-full text-center space-y-3 sm:space-y-4">
        <img
          src="/echogpt-logo.svg"
          alt="EchoGPT Logo"
          className="w-16 sm:w-20 h-16 sm:h-20 object-contain mx-auto"
        />
        <h3 className="text-2xl sm:text-3xl text-gray-900 font-semibold">EchoGPT</h3>
        <p className="text-gray-600 mt-4 text-base sm:text-lg leading-relaxed">
          Please sign in to continue. Enter your credentials to access your EchoGPT account and start interacting with our AI.
        </p>
        <button
          onClick={handleLogin}
          className="btn btn-outline rounded-2xl bg-white text-[#713cf4] border-gray-300 hover:text-white hover:border-[#713cf4] hover:bg-[#713cf4] w-full inline-flex items-center">
          <FaGoogle /> Sign in with Google
        </button>
      </div>
    </motion.div>
  );
};

export default Login;
