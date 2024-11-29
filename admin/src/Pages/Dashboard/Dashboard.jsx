import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/auth");
    }
  }, [navigate]);

  const token = localStorage.getItem("adminToken");
  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-transparent text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-sm text-gray-400">Last updated: 2 mins ago</div>
      </div>

      {/* Site Performance Section */}
      <div className="mt-8 grid sm:grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1E2533] p-6 rounded-xl">
          <h2 className="text-lg">Visitors</h2>
          <div className="text-4xl font-semibold mt-2">2,560</div>
          <div className="mt-2 text-green-500">+240 (+10.34%)</div>
        </div>
        <div className="bg-[#1E2533] p-6 rounded-xl">
          <h2 className="text-lg">Page Views</h2>
          <div className="text-4xl font-semibold mt-2">18.5K</div>
          <div className="mt-2 text-green-500">+5.2K (+39.35%)</div>
        </div>
        <div className="bg-[#1E2533] p-6 rounded-xl">
          <h2 className="text-lg">Bounce Rates</h2>
          <div className="text-4xl font-semibold mt-2">24.43%</div>
          <div className="mt-2 text-red-500">-1.2 (-4.70%)</div>
        </div>
      </div>

      {/* Users Statistics Section */}
      <div className="mt-8 grid sm:grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1E2533] p-6 rounded-xl">
          <h2 className="text-lg">Unique Visitors</h2>
          <div className="text-4xl font-semibold mt-2">1,450</div>
          <div className="mt-2 text-gray-500">-15% today</div>
        </div>
        <div className="bg-[#1E2533] p-6 rounded-xl">
          <h2 className="text-lg">New Users</h2>
          <div className="text-4xl font-semibold mt-2">320</div>
          <div className="mt-2 text-green-500">+50 (+18.53%)</div>
        </div>
        <div className="bg-[#1E2533] p-6 rounded-xl">
          <h2 className="text-lg">Online Users</h2>
          <div className="text-4xl font-semibold mt-2">52</div>
          <div className="mt-2 text-green-500">+15 (+40.38%)</div>
        </div>
      </div>

      {/* Top Referring Sites Section */}
      <div className="mt-8 bg-[#1E2533] p-6 rounded-xl">
        <h2 className="text-lg">Top Referring Sites</h2>
        <div className="mt-4">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="text-left py-2 px-4">Site Title</th>
                <th className="text-left py-2 px-4">Link</th>
                <th className="text-left py-2 px-4">Total Clicks</th>
                <th className="text-left py-2 px-4">Referrer Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4">Guo Transport</td>
                <td className="py-2 px-4">
                  <a href="https://stackoverflow.com">guotransport.com</a>
                </td>
                <td className="py-2 px-4">12</td>
                <td className="py-2 px-4">nofollow, noopener</td>
              </tr>
              <tr>
                <td className="py-2 px-4">ABC Transport PLC</td>
                <td className="py-2 px-4">
                  <a href="https://www.youtube.com">abctransport.com</a>
                </td>
                <td className="py-2 px-4">35</td>
                <td className="py-2 px-4">nofollow</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Github</td>
                <td className="py-2 px-4">
                  <a href="https://github.com">github.com</a>
                </td>
                <td className="py-2 px-4">9</td>
                <td className="py-2 px-4">nofollow</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Chisco Transport</td>
                <td className="py-2 px-4">
                  <a href="https://goshwilliam.com">chiscotransport.com.ng</a>
                </td>
                <td className="py-2 px-4">17</td>
                <td className="py-2 px-4">ugc</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
