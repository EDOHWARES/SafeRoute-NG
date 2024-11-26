import React from "react";
import { Link } from "react-router-dom";
import sLogo from '../../assets/images/sLogo.png';

const Header = () => {

  const navItemStyle = 'cursor-pointer border rounded-t-2xl p-1 border-transparent hover:bg-black hover:text-white hover:border-gray-600 duration-500';
  const buttonStyle = 'cursor-pointer border p-1 px-4 py-2 font-semibold hover:bg-black hover:text-white border-gray-600 duration-500';
  const activeButtonStyle = 'cursor-pointer bg-black text-white border border-gray-600 px-4 py-2 font-semibold hover:bg-transparent hover:text-[#424749] duration-500';
  
  return (
    <header className="flex flex-col sm:flex-row py-5 px-4 sm:px-10 mb-4 md:mb-0 justify-between items-center">
      {/* Logo */}
      <div className="logo font-bold text-[#424749] text-[1.3rem] cursor-pointer flex items-center mb-4 sm:mb-0">
        <img src={sLogo} className="w-[4rem]" alt="logo" />
        <h1 className="ml-2">SafeRoute-NG</h1>
      </div>

      {/* Navigation Links */}
      <ul className="flex flex-wrap sm:flex-nowrap items-center gap-[1rem] text-[#424749] mb-4 sm:mb-0">
        <Link to={'/'} className={navItemStyle}>Home</Link>
        <a href="#about" className={navItemStyle}>About</a>
        <a href="#features" className={navItemStyle}>Features</a>
        <a href="#footer" className={navItemStyle}>Partners</a>
      </ul>

      {/* Sign In / Sign Up Buttons */}
      <ul className="flex flex-wrap items-center gap-[1rem] text-[#424749]">
        <Link to={'/login'} className={activeButtonStyle}>Sign In</Link>
        <Link to={'/register'} className={buttonStyle}>Sign Up</Link>
      </ul>
    </header>
  );
};

export default Header;
