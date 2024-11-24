import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaMoneyBillWave, FaPhoneAlt, FaSms } from 'react-icons/fa';
import { FaTruck } from 'react-icons/fa';

const Dashboard = () => {
  // Example transporter data
  const [transporter, setTransporter] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    airtimeIncentives: 500, // Airtime incentives in Naira
    ussdReportCount: 5, // Number of USSD reports sent
    messages: [
      { id: 1, content: "Your road report has been received. Thank you for helping us improve road safety." },
      { id: 2, content: "Your incentive has been credited. Check your balance." }
    ]
  });

  // You can replace this part with an API call to get transporter data

  return (
    <div className="flex">
      <aside className="w-64 bg-[#424749] text-white flex flex-col min-h-screen p-6">
        <Link to={'/'}>
          <h2 className="text-xl font-bold mb-6">SafeRoute NG</h2>
        </Link>
        <nav className="flex flex-col gap-4">
          <Link
            to="/dashboard"
            className="flex items-center text-white hover:bg-gray-700 py-2 px-4 rounded-md"
          >
            <FaTachometerAlt className="mr-3 text-xl" />
            Dashboard
          </Link>
          <Link
            to="/trips"
            className="flex items-center text-white hover:bg-gray-700 py-2 px-4 rounded-md"
          >
            <FaTruck className="mr-3 text-xl" />
            Trips
          </Link>
          <Link
            to="/earnings"
            className="flex items-center text-white hover:bg-gray-700 py-2 px-4 rounded-md"
          >
            <FaMoneyBillWave className="mr-3 text-xl" />
            Earnings
          </Link>
          <Link
            to="/profile"
            className="flex items-center text-white hover:bg-gray-700 py-2 px-4 rounded-md"
          >
            <FaUser className="mr-3 text-xl" />
            Profile
          </Link>
        </nav>
      </aside>

      {/* Dashboard Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6">Welcome back, {transporter.name}!</h1>

        {/* Transporter Info */}
        <section className="bg-white p-6 rounded-md shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Transporter Info</h2>
          <p><strong>Name:</strong> {transporter.name}</p>
          <p><strong>Email:</strong> {transporter.email}</p>
        </section>

        {/* Airtime Incentives */}
        <section className="bg-white p-6 rounded-md shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Airtime Incentives</h2>
          <p>You have earned <strong>{transporter.airtimeIncentives} Naira</strong> in airtime incentives.</p>
        </section>

        {/* USSD Report Count */}
        <section className="bg-white p-6 rounded-md shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">USSD Report Count</h2>
          <p>You have reported road conditions via USSD <strong>{transporter.ussdReportCount}</strong> times.</p>
        </section>

        {/* Messages Sent */}
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
      </main>
    </div>
  );
};

export default Dashboard;
