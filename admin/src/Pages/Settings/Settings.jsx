import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Input Field Component
const InputField = ({ label, value, onChange, type = 'text' }) => (
  <div className="space-y-2">
    <label className="text-gray-400 text-sm">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full p-3 bg-[#3B4753] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);

// Settings Component
const Settings = () => {
  // const navigate = useNavigate();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   // Check if the token exists in localStorage (or sessionStorage)
  //   const token = localStorage.getItem("adminToken"); // Replace with your key for storing the token
  //   setIsAuthenticated(token);

  //   // If authentication state is still being checked, you can render a loading spinner or null
  //   if (!isAuthenticated) {
  //     return navigate("/auth"); // Optional loading state
  //   }
  // }, []);

  const [username, setUsername] = useState('Edoh Emmanuel');
  const [email, setEmail] = useState('edohemmanuel4real@gmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notifications, setNotifications] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle settings update here (API call)
    console.log('Settings updated:', { username, email, password, notifications });
  };

  return (
    <div className="bg-transparent p-8 rounded-xl">
      <h1 className="text-3xl font-semibold text-white mb-6">Account Settings</h1>

      {/* Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username */}
        <InputField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Email */}
        <InputField
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />

        {/* Password */}
        <InputField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />

        {/* Confirm Password */}
        <InputField
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
        />

        {/* Notifications */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-gray-400 text-sm">Enable Notifications</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 focus:outline-none"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
