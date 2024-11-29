import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { formatDistanceToNow } from "date-fns";

// Reward History Card Component
const AirtimeReward = ({ user, amount, date, status }) => {
  return (
    <div className="bg-[#1E2533] p-4 rounded-xl flex items-start space-x-4 mb-4">
      <div className="flex-1">
        <div className="text-sm text-gray-400">{date}</div>
        <div className="text-lg font-semibold text-white">User: {user}</div>
        <div className="mt-2 text-gray-300">Reward: {amount} Naira</div>
        <div className="mt-4 flex justify-between items-center">
          <div
            className={`px-3 py-1 rounded-full text-sm ${
              status === "Sent"
                ? "bg-green-500"
                : status === "Pending"
                ? "bg-yellow-500"
                : "bg-red-500"
            } text-white`}
          >
            {status}
          </div>
          <button className="text-blue-400 hover:text-blue-600">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

// Rewards System Component
const RewardsSystem = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [transporters, setTransporters] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    setIsAuthenticated(true);

    const fetchTransporters = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/admin/get-transporters`);
        if (response.data.success) {
          setTransporters(response.data.data);
        } else {
          console.error("Failed to fetch transporters");
        }
      } catch (error) {
        console.error("Error fetching transporters:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransporters();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !amount) {
      setStatus("Please select a user and enter a valid amount.");
      return;
    }

    const selectedUser = transporters.find((transporter) => transporter.name === user);
    const numbers = selectedUser ? [selectedUser.phone] : [];

    if (!numbers.length) {
      setStatus("User phone number not found.");
      return;
    }

    setStatus("Sending Reward...");
    try {
      const response = await axios.post(`${apiUrl}/admin/send-airtime`, { numbers, amount });
      setStatus(response.data.success ? "Reward Sent Successfully" : `Failed: ${response.data.message}`);
    } catch (error) {
      console.error("Error sending airtime:", error);
      setStatus("Failed to send reward. Please try again.");
    }
  };

  const filteredRewards = useMemo(() => {
    return transporters.flatMap((user) =>
      user.airtimesReceived.filter((reward) => reward.amount > 0).map((reward) => ({
        user: user.name,
        amount: reward.amount,
        date: formatDistanceToNow(new Date(reward.receivedAt)) + " " + 'ago',
        status: "Sent",
      }))
    );
  }, [transporters]);

  if (isAuthenticated === null) return <div>Loading...</div>;
  if (!isAuthenticated) {
    navigate("/auth");
    return null;
  }

  if (loading) {
    // Show spinner while fetching data
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#42BBFF" />
      </div>
    );
  }

  return (
    <div className="bg-transparent p-6">
      <h1 className="text-3xl font-bold text-white">Rewards System</h1>

      <div className="mt-8 space-y-8">
        {/* Airtime Reward Form */}
        <div className="bg-[#2B3544] p-6 rounded-xl">
          <h2 className="text-2xl font-semibold text-white mb-4">Send Airtime Reward</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="user" className="block text-gray-400 text-sm mb-1">
                Select User
              </label>
              <select
                id="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full bg-[#3B4753] text-white p-2 rounded-lg"
              >
                <option value="">Select User</option>
                {transporters.map((transporter, index) => (
                  <option key={index} value={transporter.name}>
                    {transporter.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="amount" className="block text-gray-400 text-sm mb-1">
                Enter Airtime Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount in Naira"
                className="w-full bg-[#3B4753] text-white p-2 rounded-lg outline-none border border-transparent focus:border-[#42BBFF]"
              />
            </div>

            <button type="submit" className="w-full bg-green-500 p-3 rounded-lg text-white">
              Send Reward
            </button>
          </form>
          {status && <div className="mt-4 text-center text-green-500">{status}</div>}
        </div>

        {/* Airtime Reward History */}
        <div>
          <h2 className="text-2xl font-semibold text-white">Airtime Reward History</h2>
          {loading ? (
            <div>Loading rewards...</div>
          ) : filteredRewards.length > 0 ? (
            <div className="mt-6 space-y-4">
              {filteredRewards.reverse().map((reward, index) => (
                <AirtimeReward key={index} {...reward} />
              ))}
            </div>
          ) : (
            <div className="mt-6 text-gray-400">No reward history available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardsSystem;
