import React from 'react';

const Notification = ({ title, message, time }) => {
  return (
    <div className="bg-[#1E2533] p-4 rounded-xl flex items-start space-x-4 mb-4">
      <div className="flex-shrink-0">
        {/* Icon for the notification */}
        <div className="bg-blue-500 text-white p-2 rounded-full">
          <i className="fas fa-bell"></i>
        </div>
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-400">{time}</div>
        <div className="text-lg font-semibold text-white">{title}</div>
        <div className="mt-2 text-gray-300">{message}</div>
      </div>
    </div>
  );
};

const Notifications = () => {
  return (
    <div className="bg-transparent p-6">
      <h1 className="text-3xl font-bold text-white">Notifications</h1>
      <div className="mt-6 space-y-4">
        <Notification
          title="New Transporter Registered"
          message="A new transporter has registered for SafeRoute Nigeria. Please review their details."
          time="2 hours ago"
        />
        <Notification
          title="Road Safety Alert"
          message="There is a reported pothole on Lekki-Epe Expressway. Please take caution."
          time="1 day ago"
        />
        <Notification
          title="Milestone Achieved"
          message="Transporter John Doe has achieved a safety milestone and is eligible for a reward."
          time="3 days ago"
        />
        <Notification
          title="System Update"
          message="SafeRoute Nigeria has been updated. Please check the new features."
          time="5 days ago"
        />
      </div>
    </div>
  );
};

export default Notifications;
