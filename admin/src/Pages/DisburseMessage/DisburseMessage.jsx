import React, { useState } from 'react';

// Message History Card Component
const MessageCard = ({ user, message, date, status }) => {
  return (
    <div className="bg-[#1E2533] p-4 rounded-xl flex items-start space-x-4 mb-4">
      <div className="flex-1">
        <div className="text-sm text-gray-400">{date}</div>
        <div className="text-lg font-semibold text-white">Transporter: {user}</div>
        <div className="mt-2 text-gray-300">Message: {message}</div>
        <div className="mt-4 flex justify-between items-center">
          <div
            className={`px-3 py-1 rounded-full text-sm ${
              status === 'Delivered' ? 'bg-green-500' : status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
            } text-white`}
          >
            {status}
          </div>
        </div>
      </div>
    </div>
  );
};

// Messaging Transporters Component
const DisburseMessage = () => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  // Sample registered transporters
  const transporters = ['John Doe', 'Jane Smith', 'Ahmed Bello', 'Chinonso Okafor'];

  // Sample message history data
  const messageHistory = [
    { user: 'John Doe', message: 'Please update your schedule.', date: '2 hours ago', status: 'Delivered' },
    { user: 'Jane Smith', message: 'Urgent: Check your assigned routes.', date: '1 day ago', status: 'Pending' },
    { user: 'Ahmed Bello', message: 'Reminder: Submit your logs.', date: '3 days ago', status: 'Failed' },
    { user: 'Chinonso Okafor', message: 'Weekly update required.', date: '5 days ago', status: 'Delivered' },
  ];

  // Handle form submission
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Simulate sending message
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setStatus('Message Sent to All Transporters');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="bg-transparent p-6">
      <h1 className="text-3xl font-bold text-white">Messaging Transporters</h1>

      <div className="mt-8 space-y-8">
        {/* Send Message Form */}
        <div className="bg-[#2B3544] p-6 rounded-xl">
          <h2 className="text-2xl font-semibold text-white mb-4">Send Message to All</h2>
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div>
              <label htmlFor="message" className="block text-gray-400 text-sm mb-2">Enter Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full bg-[#3B4753] border border-transparent focus:border-[#42BBFF] outline-none text-white p-2 rounded-lg h-28 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className={`w-full p-3 rounded-lg text-white ${
                sending ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
              }`}
              disabled={sending}
            >
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {status && (
            <div className="mt-4 text-center text-green-500">
              <span>{status}</span>
            </div>
          )}
        </div>

        {/* Message History */}
        <div>
          <h2 className="text-2xl font-semibold text-white">Message History</h2>
          <div className="mt-6 space-y-4">
            {messageHistory.map((msg, index) => (
              <MessageCard
                key={index}
                user={msg.user}
                message={msg.message}
                date={msg.date}
                status={msg.status}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisburseMessage;
