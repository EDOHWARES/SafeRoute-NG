import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Notifications from "./Pages/Notifications/Notifications";
import ReportsAndFeedback from "./Pages/ReportsAndFeedback/ReportsAndFeedback";
import DisburseMessage from "./Pages/DisburseMessage/DisburseMessage";
import RewardsSystem from "./Pages/RewardsSystem/RewardsSystem";
import TransporterManagement from "./Pages/TransporterManagement/TransporterManagement";
import Settings from "./Pages/Settings/Settings";
import Logout from "./Pages/Logout/Logout";
import Info from "./Pages/Info/Info";
import "./App.css";
import Auth from "./Pages/Auth/Auth";
import RouteCondition from "./Pages/RouteConditions/RouteCondition";
import {HashLoader} from 'react-spinners';

const App = () => {
  const location = useLocation();

  // Determine if the current path is '/auth'
  const isAuthPage = location.pathname === "/auth";

  return (
    <section className="flex items-start h-full">
      {/* Sidebar */}
      {!isAuthPage && (
        <div className="sidebar-container w-1/5 h-[100%]">
          <Sidebar />
        </div>
      )}

      {/* Main Content */}
      <div
        className={`content-container flex flex-col  2xl:-ml-[4.5rem] gap-[2rem] ${
          isAuthPage ? "w-full" : "w-4/5"
        } px-4 overflow-auto`}
      >
        {/* Header */}
        {!isAuthPage && (
          <div className="header-container w-full relative">
            <Header />
          </div>
        )}

        {/* Routes */}
        <div className="routes-container mt-[-1rem]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/reports" element={<ReportsAndFeedback />} />
            <Route path="/messages" element={<DisburseMessage />} />
            <Route path="/rewards" element={<RewardsSystem />} />
            <Route path="/transport-management" element={<TransporterManagement />} />
            <Route path="/route-conditions" element={<RouteCondition />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/info" element={<Info />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/logout" element={<Logout />} />
            {/* Catch-All Route */}
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </div>
      </div>
    </section>
  );
};

const MainApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default MainApp;
