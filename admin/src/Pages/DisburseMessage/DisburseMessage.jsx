import React, { useState, useEffect } from "react";
import axios from "axios";

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
              status === "Delivered"
                ? "bg-green-500"
                : status === "Pending"
                ? "bg-yellow-500"
                : "bg-red-500"
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
  const apiUrl = import.meta.env.VITE_API_URL;
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [transporters, setTransporters] = useState([]);

  // Fetch registered transporters from the backend
  useEffect(() => {
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
  }, []);

  // Handle form submission
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);
    setStatus("");

    try {
      const numbers = transporters.map((transporter) => transporter.phone);

      const response = await axios.post(`${apiUrl}/admin/send-sms`, {
        numbers,
        message,
      });

      if (response.data.success) {
        setStatus("Message sent successfully!");
      } else {
        setStatus(response.data.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error.message);
      setStatus("Error sending message. Please try again.");
    } finally {
      setSending(false);
      setMessage("");
    }
  };

  return (
    <div className="bg-transparent p-6">
      <h1 className="text-3xl font-bold text-white">Messaging Transporters</h1>

      <div className="mt-8 space-y-8">
        {/* Send Message Form */}
        <div className="bg-[#2B3544] p-6 rounded-xl">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Send Message to All Transporters
          </h2>
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div>
              <label
                htmlFor="message"
                className="block text-gray-400 text-sm mb-2"
              >
                Enter Message
              </label>
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
                sending
                  ? "bg-gray-400"
                  : "bg-green-500 hover:bg-green-600"
              }`}
              disabled={sending}
            >
              {sending ? "Sending..." : "Send Message"}
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
            {transporters.map((transporter, index) => (
              <MessageCard
                key={index}
                user={transporter.name} // Assumes transporters have a 'name' field
                message={message}
                date={new Date().toLocaleString()}
                status="Pending"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisburseMessage;
