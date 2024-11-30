import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import ChristmasGreeting from './components/ChristmasGreeting/ChristmasGreeting';
import ErrorPage from './components/ErrorPage/ErrorPage';

function App() {
  const [showGreeting, setShowGreeting] = useState(true);

    // Check if the greeting has already been shown using localStorage
    useEffect(() => {
      const hasSeenGreeting = localStorage.getItem('hasSeenChristmasGreeting');
      if (hasSeenGreeting) {
        setShowGreeting(false); // Skip the greeting if the flag is set
      }
    }, []);

  // Handle continue button click
  const handleContinue = () => {
    setShowGreeting(false); // Hide the greeting
    localStorage.setItem('hasSeenChristmasGreeting', 'true'); // Set the flag in localStorage
  };

  return (
    <>
      {showGreeting ? (
        <ChristmasGreeting onContinue={handleContinue} />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
