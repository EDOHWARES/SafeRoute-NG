import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

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
              status === 'Resolved' ? 'bg-green-500' : 'bg-yellow-500'
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

const ReportsAndFeedback = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the token exists in localStorage (or sessionStorage)
    const token = localStorage.getItem('adminToken');  // Replace with your key for storing the token
    setIsAuthenticated(token);
  }, []);

  // If authentication state is still being checked, you can render a loading spinner or null
  if (!isAuthenticated) {
    return navigate('/auth'); // Optional loading state
  }
  return (
    <div className="bg-transparent p-6">
      <h1 className="text-3xl font-bold text-white">Reports</h1>
      <div className="mt-6 space-y-4">
        <Report
          title="Pothole on Lekki Road"
          description="There is a large pothole on the Lekki road near the 3rd roundabout, causing traffic."
          date="2 hours ago"
          status="Unresolved"
        />
        <Report
          title="Accident on Murtala Mohammed Highway"
          description="A minor accident occurred on Murtala Mohammed Highway. No casualties reported."
          date="1 day ago"
          status="Resolved"
        />
        <Report
          title="Blocked Drainage on Ajah Road"
          description="The drainage system near Ajah is blocked, leading to possible flooding."
          date="3 days ago"
          status="Unresolved"
        />
        <Report
          title="Overturned Truck on Eko Bridge"
          description="An overturned truck caused a significant delay on Eko Bridge. The situation is under control."
          date="5 days ago"
          status="Resolved"
        />
      </div>
    </div>
  );
};

export default ReportsAndFeedback;
