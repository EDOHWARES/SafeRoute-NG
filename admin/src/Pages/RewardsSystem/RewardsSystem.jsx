import React, { useState } from 'react';

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
              status === 'Processed' ? 'bg-green-500' : status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
            } text-white`}
          >
            {status}
          </div>
          <button className="text-blue-400 hover:text-blue-600">View Details</button>
        </div>
      </div>
    </div>
  );
};

// Rewards System Component
const RewardsSystem = () => {
  // States for the form
  const [user, setUser] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  
  // Sample reward history data
  const rewardHistory = [
    { user: 'John Doe', amount: 500, date: '2 hours ago', status: 'Processed' },
    { user: 'Jane Smith', amount: 1000, date: '1 day ago', status: 'Pending' },
    { user: 'Ahmed Bello', amount: 200, date: '3 days ago', status: 'Processed' },
    { user: 'Chinonso Okafor', amount: 1500, date: '5 days ago', status: 'Failed' },
  ];

  // Handle form submission (mock logic)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally, send data to backend to process the reward
    setStatus('Reward Sent');
  };

  return (
    <div className="bg-[#181D2A] p-6">
      <h1 className="text-3xl font-bold text-white">Rewards System</h1>
      
      <div className="mt-8 space-y-8">
        {/* Airtime Reward Form */}
        <div className="bg-[#2B3544] p-6 rounded-xl">
          <h2 className="text-2xl font-semibold text-white mb-4">Send Airtime Reward</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="user" className="block text-gray-400 text-sm">Select User</label>
              <select
                id="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full bg-[#3B4753] text-white p-2 rounded-lg"
              >
                <option value="">Select User</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
                <option value="Ahmed Bello">Ahmed Bello</option>
                <option value="Chinonso Okafor">Chinonso Okafor</option>
              </select>
            </div>

            <div>
              <label htmlFor="amount" className="block text-gray-400 text-sm">Enter Airtime Amount</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount in Naira"
                className="w-full bg-[#3B4753] text-white p-2 rounded-lg"
              />
            </div>

            <button type="submit" className="w-full bg-green-500 p-3 rounded-lg text-white">
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
          <h2 className="text-2xl font-semibold text-white">Airtime Reward History</h2>
          <div className="mt-6 space-y-4">
            {rewardHistory.map((reward, index) => (
              <AirtimeReward
                key={index}
                user={reward.user}
                amount={reward.amount}
                date={reward.date}
                status={reward.status}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsSystem;
