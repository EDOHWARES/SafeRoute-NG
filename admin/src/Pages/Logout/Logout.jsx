import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the token exists in localStorage (or sessionStorage)
    const token = localStorage.getItem('adminToken');  // Replace with your key for storing the token
    setIsAuthenticated(token);
  }, []);

  // If authentication state is still being checked, you can render a loading spinner or null
  if (!isAuthenticated) {
    return navigate('/auth'); // Optional loading state
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken'); 
    
    // Redirect the user to the login page (or homepage)
    navigate('/auth');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <div className="bg-[#1E2533] p-8 rounded-xl text-center w-full max-w-xs">
        <h1 className="text-2xl font-semibold text-white mb-6">Are you sure you want to logout?</h1>
        <div className="space-x-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
          <button
            onClick={() => navigate(-1)} // Go back to the previous page
            className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
