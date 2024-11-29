import React from "react";
import { RiDashboardFill, RiNotification3Fill } from "react-icons/ri";
import { MdFeedback, MdEmojiTransportation } from "react-icons/md";
import { FaGift } from "react-icons/fa";
import { IoSettings, IoLogOut } from "react-icons/io5";
import { BsInfoCircleFill } from "react-icons/bs";
import { BiSolidMessageDetail } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { SiGooglemaps } from "react-icons/si";

const Sidebar = () => {
  const location = useLocation(); // Tracks the current route
  const navItemStyle = (path) =>
    `flex items-center gap-[.5rem] text-[1rem] cursor-pointer pl-5 border-l-4 rounded-sm 
     ${
       location.pathname === path
         ? "text-[#42BBFF] border-l-[#42BBFF]" // Active styles
         : "border-l-transparent hover:text-[#42BBFF] hover:border-l-[#42BBFF]" // Default styles
     } duration-500`;

  return (
    <div className="border-r border-r-[#E1E4F2] md:pr-5 py-5 h-full fixed">
      {/* Logo */}
      <div className="logo font-bold mb-[4rem] text-xs sm:text-sm md:text-[1.3rem] cursor-pointer flex items-center justify-center md:justify-start w-full px-1 md:pl-6">
        <h1 className="text-[#42BBFF]">SafeRoute-NG</h1>
      </div>

      <div>
        {/* Main Menu */}
        <span className="text-[#55597D] text-[10px] pl-6 hidden md:block">
          Main Menu
        </span>
        <div className="flex flex-col gap-[1rem] mb-[4rem] mt-[.5rem]">
          <Link to="/" className={navItemStyle("/")}>
            <RiDashboardFill
              className="w-[20px] h-[20px]"
              aria-label="Dashboard"
            />
            <span className="hidden xl:block">Dashboard</span>
          </Link>
          <Link to="/notifications" className={navItemStyle("/notifications")}>
            <RiNotification3Fill
              className="w-[20px] h-[20px]"
              aria-label="Notifications"
            />
            <span className="hidden md:flex items-center justify-between w-full">
              <span className="hidden xl:block">Notifications</span>
              <span className="text-[#42BBFF] bg-[#0C3247] w-[48px] h-[20px] rounded-[26px] flex items-center justify-center">5+</span>
            </span>
          </Link>
          <Link to="/reports" className={navItemStyle("/reports")}>
            <MdFeedback aria-label="Reports and Feedbacks" />
            <span className="hidden md:flex items-center justify-between gap-[1rem]">
              <span className="hidden xl:block">Reports and Feedbacks</span>
              <span className="bg-[#F52D20] w-[35px] h-[20px] rounded-[26px] text-sm flex items-center justify-center text-white font-medium">3+</span>
            </span>
          </Link>
          <Link to="/messages" className={navItemStyle("/messages")}>
            <BiSolidMessageDetail aria-label="message transporter" />
            <span className="hidden xl:block">Disburse Message</span>
          </Link>
          <Link to="/rewards" className={navItemStyle("/rewards")}>
            <FaGift aria-label="Rewards System" />
            <span className="hidden xl:block">Rewards System</span>
          </Link>
          <Link
            to="/transport-management"
            className={navItemStyle("/transport-management")}
          >
            <MdEmojiTransportation aria-label="Transporter Management" className="text-2xl" />
            <span className="hidden xl:block">Transporter Management</span>
          </Link>
          <Link
            to="/route-conditions"
            className={navItemStyle("/route-conditions")}
          >
            <SiGooglemaps aria-label="Route Conditions" className="text-2xl" />
            <span className="hidden xl:block">Route Conditions</span>
          </Link>
        </div>

        {/* Options */}
        <span className="text-[#55597D] text-[10px] pl-6 hidden md:block">
          OPTIONS
        </span>
        <div className="flex flex-col gap-[1rem] mt-[.5rem]">
          <Link to="/settings" className={navItemStyle("/settings")}>
            <IoSettings aria-label="Settings" />
            <span className="hidden md:block">Settings</span>
          </Link>
          <Link to="/info" className={navItemStyle("/info")}>
            <BsInfoCircleFill aria-label="About" />
            <span className="hidden md:block">About</span>
          </Link>
          <Link to="/logout" className={navItemStyle("/logout")}>
            <IoLogOut aria-label="Logout" />
            <span className="hidden md:block">Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
