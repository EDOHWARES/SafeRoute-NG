import React, { useState } from 'react';
import axios from 'axios'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from 'react-router-dom';


const Auth = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Send a POST request to the backend login API
      const response = await axios.post(`${apiUrl}/admin/login`, {
        name: formData.username,
        password: formData.password,
      });

      // Handle successful login
      const { token } = response.data;
      localStorage.setItem('adminToken', token);
      toast.success('Login successful!'); 
      navigate('/');

      

    } catch (error) {
      // Handle error (e.g., incorrect username or password)
      console.log(error)
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#181D2A]">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-[#1E2533] p-8 rounded-xl shadow-lg w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Admin Login
        </h1>

        {error && (
          <div className="bg-red-500 text-white text-sm p-2 rounded-md mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-400 text-sm mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
            className="w-full p-3 rounded-lg bg-[#2A2F3E] text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-400 text-sm mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className="w-full p-3 rounded-lg bg-[#2A2F3E] text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
        >
          Login
        </button>
      </form>
     
    </div>
  );
};

export default Auth;
