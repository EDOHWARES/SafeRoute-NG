import React from "react";

const Header = () => {

  const navItemStyle = 'cursor-pointer border rounded-t-2xl p-1 border-transparent hover:border-gray-600 duration-500';
  return (
    <header className="flex flex-row py-5 px-10 justify-between">
      <div className="logo font-bold text-[#424749] text-[1.3rem] cursor-pointer">
        <h1>SafeRoute-NG</h1>
      </div>
      <ul className="flex items-center gap-[1rem] text-[#424749]">
        <li className={navItemStyle}>Home</li>
        <li className={navItemStyle} >Route</li>
        <li className={navItemStyle}>About</li>
        <li className={navItemStyle}>Features</li>
      </ul>
      <ul className="flex items-center gap-[1rem] text-[#424749]">
        <li className={navItemStyle}>Sign In</li>
        <li className={navItemStyle}>Sign Up</li>
      </ul>
    </header>
  );
};

export default Header;
