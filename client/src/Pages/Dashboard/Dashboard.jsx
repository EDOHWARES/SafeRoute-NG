import React, { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaMoneyBillWave,
  FaCar,
  FaInfoCircle,
  FaComments,
  FaSearch,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FaRoute } from "react-icons/fa6";
import { MdNotificationsActive } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ChatComponent from "../../components/Chat/Chat";
import { Link } from "react-router-dom";
import avatar from "../../assets/images/avatarprofile.png";
import Map from "../../components/Map/Map";
import sLogo from '../../assets/images/sLogo.png';
import Trips from "../../components/Trips/Trips";
import UserProfile from "../../components/UserProfile/UserProfile";
import Notifications from "../../components/Notifications/Notifications";
// Bar Chart Data
const barChartData = [
  { name: "Monday", Trips: 10, Earnings: 200 },
  { name: "Tuesday", Trips: 15, Earnings: 300 },
  { name: "Wednesday", Trips: 8, Earnings: 150 },
  { name: "Thursday", Trips: 12, Earnings: 250 },
  { name: "Friday", Trips: 18, Earnings: 400 },
  { name: "Saturday", Trips: 20, Earnings: 500 },
  { name: "Sunday", Trips: 5, Earnings: 100 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [selectedNav, setSelectedNav] = useState("dashboard");
  const [clickedProfile, setClickedProfile] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("transporterToken");
    setIsAuthenticated(token != null);
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  const renderContent = () => {
    switch (selectedNav) {
      case "dashboard":
        return (
          <div>
            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="p-6 bg-blue-500 text-white rounded-lg shadow-md">
                <h3 className="text-lg font-bold">Total Earnings</h3>
                <p className="text-2xl font-semibold">₦1,000</p>
              </div>
              <div className="p-6 bg-green-500 text-white rounded-lg shadow-md">
                <h3 className="text-lg font-bold">Active Trips</h3>
                <p className="text-2xl font-semibold">12</p>
              </div>
              <div className="p-6 bg-orange-500 text-white rounded-lg shadow-md">
                <h3 className="text-lg font-bold">Total Trips</h3>
                <p className="text-2xl font-semibold">150</p>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4">
                Trips and Earnings Overview
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={barChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Trips" fill="#82ca9d" />
                  <Bar dataKey="Earnings" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      case "profile":
        return <UserProfile />;
      case "earnings":
        return <Map />;
      case "trips":
        return <Trips />;
      case "notifications":
        return <Notifications />;
      case "chat":
        return <ChatComponent />;
      default:
        return <div>Content not found.</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="w-full bg-white shadow-md py-4 px-6 flex items-center justify-between relative">
        <div className="flex items-center gap-10">
          <Link to={'/'} className="logo font-bold text-[#424749] text-[1.3rem] cursor-pointer flex items-center mb-4 sm:mb-0">
            <img src={sLogo} className="w-[4rem]" alt="logo" />
            <h1 className="ml-2">SafeRoute-NG</h1>
          </Link>
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-full text-sm text-gray-600"
            />
          </div>
        </div>
        <div className="flex items-center gap-32">
          <nav className="hidden md:flex gap-4">
            <Link
              to={"/"}
              className="text-gray-700 hover:text-blue-500 transition"
            >
              Home
            </Link>
            <button className="text-gray-700 hover:text-blue-500 transition">
              Notifications
            </button>
            <button className="text-gray-700 hover:text-blue-500 transition">
              Settings
            </button>
          </nav>
          <div className="relative">
            <img
              src={avatar}
              alt="Profile Avatar"
              className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
            />
          </div>
        </div>
        {clickedProfile && (
          <div
            onClick={() => setClickedProfile(!clickedProfile)}
            className="absolute right-0 bg-white shadow-2xl rounded-b-[5px] cursor-pointer hover:bg-gray-400 duration-500 w-[8rem] top-[4.5rem] flex items-center justify-center p-2 text-gray-800"
          >
            <p>Logout</p>
          </div>
        )}
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-fit md:w-64 bg-[#2A2D34] text-white flex flex-col p-6 shadow-lg">
          <nav className="flex flex-col gap-4">
            <button
              className={`flex items-center text-white hover:bg-gray-700 py-2 px-4 rounded-md transition duration-300 ${
                selectedNav === "dashboard" && "bg-gray-700"
              }`}
              onClick={() => setSelectedNav("dashboard")}
            >
              <FaTachometerAlt className="mr-3 text-xl" />
              <span className="hidden md:block">Dashboard</span>
            </button>
            <button
              className={`flex items-center text-white hover:bg-gray-700 py-2 px-4 rounded-md transition duration-300 ${
                selectedNav === "earnings" && "bg-gray-700"
              }`}
              onClick={() => setSelectedNav("earnings")}
            >
              <FaRoute className="mr-3 text-xl" />
              <span className="hidden md:block">Route Conditions</span>
            </button>
            <button
              className={`flex items-center text-white hover:bg-gray-700 py-2 px-4 rounded-md transition duration-300 ${
                selectedNav === "notifications" && "bg-gray-700"
              }`}
              onClick={() => setSelectedNav("notifications")}
            >
              <MdNotificationsActive className="mr-3 text-xl" />
              <span className="hidden md:block">Notifications</span>
            </button>
            <button
              className={`flex items-center text-white hover:bg-gray-700 py-2 px-4 rounded-md transition duration-300 ${
                selectedNav === "chat" && "bg-gray-700"
              }`}
              onClick={() => setSelectedNav("chat")}
            >
              <FaComments className="mr-3 text-xl" />
              <span className="hidden md:block">Customer care</span>
            </button>
            <button
              className={`flex items-center text-white hover:bg-gray-700 py-2 px-4 rounded-md transition duration-300 ${
                selectedNav === "trips" && "bg-gray-700"
              }`}
              onClick={() => setSelectedNav("trips")}
            >
              <FaCar className="mr-3 text-xl" />
              <span className="hidden md:block">Trips</span>
            </button>
            <button
              className={`flex items-center text-white hover:bg-gray-700 py-2 px-4 rounded-md transition duration-300 ${
                selectedNav === "profile" && "bg-gray-700"
              }`}
              onClick={() => setSelectedNav("profile")}
            >
              <FaUser className="mr-3 text-xl" />
              <span className="hidden md:block">Profile</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
