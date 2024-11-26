import React, { useState } from 'react';
import gradient from '../../assets/images/gradient.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const Login = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Start loading
    try {
      const response = await axios.post(`${apiUrl}/transporter/login`, { email, password });
      const { success, token } = response.data;

      if (success) {
        // Save token to localStorage or context
        localStorage.setItem('transporterToken', token);

        // Success notification
        toast.success('Login successful! Redirecting to dashboard...', {
          position: 'top-right',
        });

        // Redirect to the dashboard after a short delay
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (error) {
      // Error notification
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || 'Invalid login details', {
          position: 'top-right',
        });
      } else {
        toast.error('Something went wrong. Please try again.', {
          position: 'top-right',
        });
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="register flex mt-[3rem] md:mt-0 md:items-center justify-center w-full px-4 md:px-10 py-2 md:py-5 relative overflow-x-hidden h-screen">
      <img src={gradient} alt="gradient" className="-z-10 absolute left-[-22rem] md:left-[-15rem] top-[-6rem] md:top-[-3rem]" />
      <form onSubmit={handleSubmit} className="w-full md:w-[70%] flex flex-col gap-[1rem]">
        <h1 className="text-[#252B42] font-semibold md:font-bold text-xl md:text-3xl text-center mb-[1rem]">LOGIN AS A TRANSPORTER</h1>
        <div className="el">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="el">
          <label htmlFor="transporterNumber">Password</label>
          <input
            id="transporterNumber"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center gap-[.5rem] justify-center">
          <span>Not registered yet ?</span>
          <Link to={'/register'} className="text-purple-600 font-semibold">
            Register
          </Link>
        </div>
        <img src={gradient} alt="gradient" className="absolute right-[-22rem] md:right-[-15rem] top-[20rem]" />
        <div className="w-full">
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? 'bg-gray-400' : 'bg-blue-600'
            } text-white border border-transparent font-semibold text-center text-xl p-5 hover:border-blue-600 hover:bg-transparent hover:text-blue-600 duration-500`}
          >
            {loading ? 'Loading...' : 'Continue'}
          </button>
        </div>
      </form>

      {/* ToastContainer will render the toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default Login;
