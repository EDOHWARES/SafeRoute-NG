import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Notifications from "./Pages/Notifications/Notifications";
import ReportsAndFeedback from "./Pages/ReportsAndFeedback/ReportsAndFeedback";
import RewardsSystem from "./Pages/RewardsSystem/RewardsSystem";
import TransporterManagement from "./Pages/TransporterManagement/TransporterManagement";
import Settings from "./Pages/Settings/Settings";
import Logout from "./Pages/Logout/Logout";
import Info from "./Pages/Info/Info";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <section className="flex items-start h-full">
        {/* Sidebar */}
        <div className="sidebar-container w-1/5 h-[100%]">
          <Sidebar />
        </div>
        
        {/* Main Content */}
        <div className="content-container flex flex-col gap-[2rem] w-4/5 px-4 overflow-auto">
          {/* Header */}
          <div className="header-container">
            <Header />
          </div>
          
          {/* Routes */}
          <div className="routes-container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/reports" element={<ReportsAndFeedback />} />
              <Route path="/rewards" element={<RewardsSystem />} />
              <Route path="/transport-management" element={<TransporterManagement />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/info" element={<Info />} />
              <Route path="/logout" element={<Logout />} />
              {/* Catch-All Route */}
              <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
          </div>
        </div>
      </section>
    </BrowserRouter>
  );
}

export default App;
