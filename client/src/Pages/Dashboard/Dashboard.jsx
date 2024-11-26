import React, { useState, useEffect } from 'react';
import { FaTachometerAlt, FaUser, FaMoneyBillWave, FaPhoneAlt, FaSms, FaTruck, FaRoute } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

// Example Map component for "Route conditions"
const MapComponent = () => {
  return (
    <div className="w-full h-96 bg-gray-200">
      <h2>Map Component</h2>
      {/* Add your map implementation here */}
    </div>
  );
};

// Dummy component for Trips
const TripsComponent = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Trips</h2>
      <ul>
        <li>Trip 1: Lagos to Ibadan - Completed</li>
        <li>Trip 2: Abuja to Kano - In Progress</li>
        <li>Trip 3: Enugu to Port Harcourt - Pending</li>
      </ul>
    </div>
  );
};

// Dummy component for Earnings
const EarningsComponent = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Earnings</h2>
      <p>You have earned <strong>5000 Naira</strong> this month.</p>
      <p>Your total earnings: <strong>15000 Naira</strong></p>
    </div>
  );
};

// Dummy component for Profile
const ProfileComponent = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
      <p><strong>Name:</strong> John Doe</p>
      <p><strong>Email:</strong> johndoe@example.com</p>
      <p><strong>Phone:</strong> +234 123 456 7890</p>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [selectedNav, setSelectedNav] = useState('dashboard'); // Default is 'dashboard'
  const [transporter, setTransporter] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    airtimeIncentives: 500,
    ussdReportCount: 5,
    messages: [
      { id: 1, content: "Your road report has been received. Thank you for helping us improve road safety." },
      { id: 2, content: "Your incentive has been credited. Check your balance." }
    ]
  });

  // Check if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("transporterToken");
    if (token == null) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Loading state while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // Render content based on the selected nav option
  const renderContent = () => {
    switch (selectedNav) {
      case 'dashboard':
        return (
          <div>
            <h1 className="text-2xl font-semibold mb-6">Welcome back, {transporter.name}!</h1>
            <section className="bg-white p-6 rounded-md shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Transporter Info</h2>
              <p><strong>Name:</strong> {transporter.name}</p>
              <p><strong>Email:</strong> {transporter.email}</p>
            </section>
            <section className="bg-white p-6 rounded-md shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Airtime Incentives</h2>
              <p>You have earned <strong>{transporter.airtimeIncentives} Naira</strong> in airtime incentives.</p>
            </section>
            <section className="bg-white p-6 rounded-md shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">USSD Report Count</h2>
              <p>You have reported road conditions via USSD <strong>{transporter.ussdReportCount}</strong> times.</p>
            </section>
            <section className="bg-white p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4">Messages Sent</h2>
              {transporter.messages.length > 0 ? (
                <ul>
                  {transporter.messages.map((msg) => (
                    <li key={msg.id} className="mb-2">
                      <div className="flex items-center">
                        <FaSms className="mr-3 text-xl text-[#424749]" />
                        <p>{msg.content}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No messages available.</p>
              )}
            </section>
          </div>
        );
      case 'routeConditions':
        return <MapComponent />;
      case 'trips':
        return <TripsComponent />;
      case 'earnings':
        return <EarningsComponent />;
      case 'profile':
        return <ProfileComponent />;
      default:
        return <div>Content not found.</div>;
    }
  };

  return (
    <div className="flex">
      <aside className="w-64 bg-[#424749] text-white flex flex-col min-h-screen p-6">
        <Link to={'/'}>
          <h2 className="text-xl font-bold mb-6">SafeRoute NG</h2>
        </Link>
        <nav className="flex flex-col gap-4">
          <button
            className="flex items-center text-white hover:bg-gray-700 py-2 px-4 rounded-md"
            onClick={() => setSelectedNav('dashboard')}
          >
            <FaTachometerAlt className="mr-3 text-xl" />
            Dashboard
          </button>
          <button
            className="flex items-center text-white hover:bg-gray-700 py-2 px-4 rounded-md"
            onClick={() => setSelectedNav('routeConditions')}
          >
            <FaRoute className="mr-3 text-xl" />
            Route conditions
          </button>
          <button
            className="flex items-center text-white hover:bg-gray-700 py-2 px-4 rounded-md"
            onClick={() => setSelectedNav('trips')}
          >
            <FaTruck className="mr-3 text-xl" />
            Trips
          </button>
          <button
            className="flex items-center text-white hover:bg-gray-700 py-2 px-4 rounded-md"
            onClick={() => setSelectedNav('earnings')}
          >
            <FaMoneyBillWave className="mr-3 text-xl" />
            Earnings
          </button>
          <button
            className="flex items-center text-white hover:bg-gray-700 py-2 px-4 rounded-md"
            onClick={() => setSelectedNav('profile')}
          >
            <FaUser className="mr-3 text-xl" />
            Profile
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
