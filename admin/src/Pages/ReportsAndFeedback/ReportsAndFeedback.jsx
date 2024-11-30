import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ClipLoader } from "react-spinners"; // React Spinners

// Individual Report Component
const Report = ({ title, description, date, status }) => {
  return (
    <div className="bg-[#1E2533] p-4 rounded-xl flex items-start space-x-4 mb-4">
      <div className="flex-1">
        <div className="text-sm text-gray-400">{date}</div>
        <div className="text-lg font-semibold text-white">{title}</div>
        <div className="mt-2 text-gray-300">{description}</div>
        <div className="mt-4 flex justify-between items-center">
          <div
            className={`px-3 py-1 rounded-full text-sm ${
              status === "Resolved" ? "bg-green-500" : "bg-yellow-500"
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

// Main Reports and Feedback Component
const ReportsAndFeedback = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy reports
  const dummyReports = [
    {
      title: "Accident at Lagos-Ibadan Expressway",
      description:
        "A multiple-vehicle collision occurred on Lagos-Ibadan Expressway, causing a major delay.",
      date: "2 hours ago",
      status: "Unresolved",
    },
    {
      title: "Roadblock on Abuja-Kano Highway",
      description:
        "A roadblock due to ongoing repairs near Zaria is causing significant traffic on Abuja-Kano Highway.",
      date: "about 10 hours ago",
      status: "Unresolved",
    },
    {
      title: "Flooding near Jebba Bridge",
      description:
        "Flooding at Jebba Bridge has disrupted traffic, making the Lagos-Kano route difficult to navigate.",
      date: "about 7 hours ago",
      status: "Unresolved",
    },
    {
      title: "Potholes on Minna-Suleja Road",
      description:
        "Numerous potholes have been reported on the Minna-Suleja section, making travel dangerous.",
      date: "about 5 hours ago",
      status: "Unresolved",
    },
    {
      title: "Truck Breakdown at Lokoja Junction",
      description:
        "A broken-down truck is blocking the Lokoja junction, affecting traffic on the Lagos-Kano route.",
      date: "about 3 hours ago",
      status: "Resolved",
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    // Redirect to login if no token
    if (!token) {
      setIsAuthenticated(false);
      navigate("/auth");
      return;
    }

    // Fetch reports from API
    const fetchFeedbacks = async () => {
      try {
        setLoading(true); // Show spinner during fetch
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/getFeedbacks`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const feedbacks = response.data.data.map((feedback) => ({
          title:
            feedback.feedbackType +
              " " +
              "between Kano Expressway and Kaduna" || "No Title",
          description:
            feedback.details + " " + "lies between ..." || "No Description",
          date: formatDistanceToNow(new Date(feedback.createdAt), {
            addSuffix: true,
          }),
          status: feedback.status || "Unresolved",
        }));

        console.log(feedbacks);

        // Merge and reverse API feedbacks with dummy reports
        setReports([...dummyReports, ...feedbacks].reverse());
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        // If API fails, fallback to reversed dummy reports
        setReports(dummyReports.reverse());
      } finally {
        setLoading(false); // Hide spinner after fetch
      }
    };

    setIsAuthenticated(true);
    fetchFeedbacks();
  }, [navigate]);

  if (loading) {
    // Show spinner while loading
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#8353E2FF" size={60} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // User is redirected; no need to render anything here
  }

  return (
    <div className="bg-transparent p-6">
      <h1 className="text-3xl font-bold text-white">Real-time Reports</h1>
      <div className="mt-6 space-y-4">
        {reports.map((report, index) => (
          <Report
            key={index}
            title={report.title}
            description={report.description}
            date={report.date}
            status={report.status}
          />
        ))}
      </div>
    </div>
  );
};

export default ReportsAndFeedback;
