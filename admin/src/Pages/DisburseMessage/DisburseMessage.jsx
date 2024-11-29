import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

// Message History Card Component
const MessageCard = ({ user, message, date, status }) => {
  return (
    <div className="bg-[#1E2533] p-4 rounded-xl flex items-start space-x-4 mb-4">
      <div className="flex-1">
        <div className="text-[10px] text-gray-400">{date}</div>
        <div className="text-lg font-semibold text-white">
          Transporter: {user}
        </div>
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
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const apiUrl = import.meta.env.VITE_API_URL;
  const [preferredPath, setPreferredPath] = useState("Lagos to Ibadan");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [transporters, setTransporters] = useState([]);

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
            const transporters = response.data.data;
            setTransporters(transporters);
          } else {
            console.error("Failed to fetch transporters");
          }
        } catch (error) {
          console.error("Error fetching transporters:", error.message);
        } finally {
          setIsLoading(false); // Stop loading once data is fetched
        }
      };
      fetchTransporters();
    } else {
      setIsLoading(false); // Stop loading if not authenticated
    }
  }, []);

  // Handle form submission
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    if (!preferredPath) {
      setStatus("Please pick preferred path");
      return;
    }

    setSending(true);
    setStatus("");

    try {
      const selectedPath = preferredPath;

      const response = await axios.post(`${apiUrl}/admin/send-sms`, {
        selectedPath,
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

  if (isAuthenticated === null) {
    // Show spinner while checking authentication
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#42BBFF" />
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate("/auth");
    return null;
  }

  if (isLoading) {
    // Show spinner while fetching data
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#42BBFF" />
      </div>
    );
  }

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
                required
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full bg-[#3B4753] border border-transparent focus:border-[#42BBFF] outline-none text-white p-2 rounded-lg h-28 resize-none"
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="preferredPath"
                className="block text-gray-400 text-sm mb-2"
              >
                Preferred Path
              </label>
              <select
                id="preferredPath"
                required
                value={preferredPath}
                onChange={(e) => setPreferredPath(e.target.value)}
                className="w-full bg-[#3B4753] border border-transparent focus:border-[#42BBFF] outline-none text-white p-2 rounded-lg"
              >
                <option value="Lagos to Ibadan">Lagos to Ibadan</option>
                <option value="Ibadan to Ilorin">Ibadan to Ilorin</option>
                <option value="Ilorin to Jebba">Ilorin to Jebba</option>
                <option value="Jebba to Mokwa">Jebba to Mokwa</option>
                <option value="Mokwa to Abuja">Mokwa to Abuja</option>
                <option value="Abuja to Lokoja">Abuja to Lokoja</option>
                <option value="Lokoja to Kano">Lokoja to Kano</option>
              </select>
            </div>

            <button
              type="submit"
              className={`w-full p-3 rounded-lg text-white ${
                sending ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
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
              <div key={index}>
                <h2 className="text-white text-base mb-2 ml-2">
                  Transporter: {transporter.name}
                </h2>
                {transporter.messagesReceived
                  .filter((msg) => msg.message !== "None") // Exclude the "None" message
                  .reverse()
                  .map((filteredMessage, messageIndex) => (
                    <MessageCard
                      key={messageIndex}
                      user={transporter.name}
                      message={filteredMessage.message}
                      date={new Date(
                        filteredMessage.receivedAt
                      ).toLocaleString()}
                      status="Delivered"
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisburseMessage;
