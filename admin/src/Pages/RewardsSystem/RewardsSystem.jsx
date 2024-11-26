import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch registered transporters from the backend
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token == null) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(token);
    }

    if (token) {
      const fetchTransporters = async () => {
        try {
          const response = await axios.get(`${apiUrl}/admin/get-transporters`);
          if (response.data.success) {
            setTransporters(response.data.data);
          } else {
            console.error("Failed to fetch transporters");
          }
        } catch (error) {
          console.error("Error fetching transporters:", error.message);
        }
      };

      fetchTransporters();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !amount) {
      setStatus("Please select a user and enter a valid amount.");
      return;
    }

    // Prepare numbers (assuming transporters have phone numbers as part of data)
    const selectedUser = transporters.find(
      (transporter) => transporter.name === user
    );
    const numbers = selectedUser ? [selectedUser.phone] : [];

    if (numbers.length === 0) {
      setStatus("User phone number not found.");
      return;
    }

    setStatus("Sending Reward...");

    try {
      const response = await axios.post(`${apiUrl}/admin/send-airtime`, {
        numbers,
        amount,
      });

      if (response.data.success) {
        setStatus("Reward Sent Successfully");
      } else {
        setStatus(`Failed to send reward: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error sending airtime:", error);
      setStatus("Failed to send reward. Please try again.");
    }
  };

  if (isAuthenticated === null) {
    // Optionally, show a loading spinner or wait until the token is checked
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="bg-transparent p-6">
      <h1 className="text-3xl font-bold text-white">Rewards System</h1>

      <div className="mt-8 space-y-8">
        {/* Airtime Reward Form */}
        <div className="bg-[#2B3544] p-6 rounded-xl">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Send Airtime Reward
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="user"
                className="block text-gray-400 text-sm mb-1"
              >
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
              <label
                htmlFor="amount"
                className="block text-gray-400 text-sm mb-1"
              >
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

            <button
              type="submit"
              className="w-full bg-green-500 p-3 rounded-lg text-white"
            >
              Send Reward
            </button>
          </form>

          {status && (
            <div className="mt-4 text-center text-green-500">
              <span>{status}</span>
            </div>
          )}
        </div>

        {/* Airtime Reward History */}
        <div>
          <h2 className="text-2xl font-semibold text-white">
            Airtime Reward History
          </h2>
          <div className="mt-6 space-y-4">
            {transporters.map((user, index) =>
              user.airtimesReceived
                .filter((reward) => reward.amount > 0) // Filter out rewards with amount 0
                .map((reward, rewardIndex) => (
                  <AirtimeReward
                    key={`${index}-${rewardIndex}`}
                    user={user.name}
                    amount={reward.amount}
                    date={new Date(reward.receivedAt).toLocaleString()} // Format the date
                    status={"Sent"} // Assuming the status is "Sent" for now
                  />
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsSystem;
