import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import "./Notifications.css";
import { formatDistanceToNow } from "date-fns";


const AirtimeCard = ({ ddate, transporter, amount }) => {
  return (
    <div className="w-full bgShadow p-5 rounded-md md:max-h-[12rem]">
      <small className="text-gray-500">{ddate}</small>
      <p className="mb-[1rem] text-xl font-semibold text-gray-800">
        Transporter: {transporter}
      </p>
      <p className="mb-[1rem] text-base text-gray-700">
        Reward: {amount} Naira
      </p>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <p className="bg-green-600 rounded-full px-2 py-1 text-white text-sm">
          Received
        </p>
        <p className="text-blue-600 underline">View Details</p>
      </div>
    </div>
  );
};

const MessageCard = ({ ddate, transporter, message }) => {
  return (
    <div className="w-full bgShadow p-5 rounded-md md:max-h-[12rem]">
      <small className="text-gray-500">{ddate}</small>
      <p className="mb-[1rem] text-xl font-semibold text-gray-800">
        Transporter: {transporter}
      </p>
      <p className="mb-[1rem] text-base text-gray-700">Message: {message}</p>
      <div className="flex items-center justify-between">
        <p className="bg-green-600 rounded-full px-2 py-1 text-white text-sm">
          Received
        </p>
        <p className="text-blue-600 underline">View Details</p>
      </div>
    </div>
  );
};

const Notifications = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [profileData, setProfileData] = useState(null);
  console.log(profileData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(profileData);

  // Fetching the transporter profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${apiUrl}/transporter/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("transporterToken")}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setProfileData(data.data);
        } else {
          setError(data.message || "Error fetching data");
        }
      } catch (err) {
        setError("Network error, please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    // Show spinner while loading
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#8353E2FF" size={60} />
      </div>
    );
  }
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex flex-row w-full items-start justify-center gap-[2rem]">
        <div className=" w-1/2">
          {profileData.airtimesReceived.length > 0 ? (
            <div className="space-y-[1rem]">
              <h1 className="ml-2">Airtime Incentives</h1>
              {profileData.airtimesReceived
              .filter((airtime) => airtime.amount !== 0)
              .map((reward, index) => (
                <AirtimeCard
                  key={index}
                  ddate={formatDistanceToNow(new Date(reward.receivedAt)) + ' ' + 'ago'}
                  transporter={profileData.name}
                  amount={reward.amount}
                />
              ))}
            </div>
          ) : (
            <div>No airtime received</div>
          )}
        </div>

        <div className="space-y-[1rem] w-1/2">
          <h1 className="ml-2">Messages Received</h1>
          {profileData.messagesReceived
            .filter((msg) => msg.message !== "None") // Exclude the "None" message
            .reverse()
            .map((filteredMessage, messageIndex) => (
              <MessageCard
                key={messageIndex}
                transporter={profileData.name}
                message={filteredMessage.message}
                ddate={formatDistanceToNow(new Date(filteredMessage.receivedAt)) + ' ' + 'ago'}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
