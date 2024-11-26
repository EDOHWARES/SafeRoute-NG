import React, { useState, useEffect } from 'react';
import { RiNotification3Fill } from "react-icons/ri";
import avatar from '../../assets/images/avatar.png';
import { FaSortDown, FaBars } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import axios from 'axios';

const Header = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [admin, setAdmin] = useState(null);
  
  // Fetch admin profile data
  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await axios.get(`${apiUrl}/admin/profile`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          }
        });
        setAdmin(response.data);
      } catch (error) {
        console.error("Error fetching admin profile:", error);
      }
    };
    
    fetchAdminProfile();
  }, []);

  return (
    <header className="w-full shadow-md">
      <div className="flex flex-wrap py-5 items-center justify-between px-4 md:px-8">
        {/* Search Bar */}
        <div className="bg-[#1D2032] w-full md:w-[373px] h-[39px] rounded-[8px] px-4 text-[#50556A] flex items-center py-2 text-[14px]">
          <input
            type="search"
            className="bg-transparent border-none outline-none w-full h-full"
            placeholder="Search..."
          />
          <IoSearchOutline className="text-xl" />
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center text-[#55597D] text-[14px] gap-[2rem] mt-4 md:mt-0">
          <li className="cursor-pointer hover:text-[#888eb6] duration-500">Analytics</li>
          <li className="cursor-pointer hover:text-[#888eb6] duration-500">Earnings</li>
          <li className="cursor-pointer hover:text-[#888eb6] duration-500">Ad Experiments</li>
        </ul>

        {/* Mobile Menu Icon */}
        <FaBars className="text-xl cursor-pointer md:hidden block mt-4 md:mt-0" />

        {/* Profile and Notifications */}
        <div className="flex items-center gap-[1rem] cursor-pointer mt-4 md:mt-0">
          <RiNotification3Fill className="text-xl cursor-pointer" />
          <div className="flex items-center gap-[.8rem]">
            <img
              src={avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <ul className="flex flex-col">
              <li className="text-[10px] text-[#55597D]">Welcome</li>
              <li className="flex items-start gap-[.2rem]">
                <span className="text-[16px] font-semibold">
                  {admin ? admin.name : 'Unknown'}
                </span>
                <FaSortDown />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
