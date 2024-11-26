import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token == null) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(token)
    }
  }, []);
  
  if (isAuthenticated === null) {
    // Optionally, show a loading spinner or wait until the token is checked
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    navigate("/auth");
    return null;
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
