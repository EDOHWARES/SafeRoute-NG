import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";

import bri from '../../assets/icons/bri.png';
import bca from '../../assets/icons/bca.png';
import bni from '../../assets/icons/bni.png';
import dana from '../../assets/icons/dana.png';
import jt from '../../assets/icons/jt.png';
import ovo from '../../assets/icons/OVO.png';
import sic from '../../assets/icons/sic.png';

import "./Footer.css";

const Footer = () => {
  const iconStyle =
    "bg-white rounded-full w-[30px] h-[30px] flex items-center justify-center z-0 text-black";
  const listStyle = "flex items-center gap-[.7rem]";
  return (
    <footer id="footer" className="footer flex flex-col justify-between items-center px-5 sm:px-10 py-5 pt-16 font-semibold">
      <div className="text-white w-full">
        <div className="w-full max-w-[1200px] mx-auto flex flex-row flex-wrap justify-between gap-[2rem]">
          {/* Column 1 */}
          <ul className="flex flex-col gap-[1rem] mb-[2rem] sm:mb-0">
            <li className="font-bold text-lg">SafeRoute-NG</li>
            <li>Route</li>
            <li>About</li>
            <li>Features</li>
          </ul>
          {/* Column 2 */}
          <ul className="flex flex-col gap-[1rem] mb-[2rem] sm:mb-0">
            <li className="font-bold text-lg">Socials & Media</li>
            <li className={listStyle}>
              <span className={iconStyle}>
                <LuInstagram />
              </span>
              <span>Instagram</span>
            </li>
            <li className={listStyle}>
              <span className={iconStyle}>
                <FaWhatsapp />
              </span>
              <span>Whatsapp</span>
            </li>
            <li className={listStyle}>
              <span className={iconStyle}>
                <FaFacebookF />
              </span>
              <span>Facebook</span>
            </li>
            <li className={listStyle}>
              <span className={iconStyle}>
                <FaXTwitter />
              </span>
              <span>X</span>
            </li>
          </ul>
          {/* Column 3 */}
          <div className="flex flex-col gap-[2rem]">
            <div>
              <h2 className="font-bold text-lg mb-[2rem]">Registered Organizations</h2>
              <ul className="grid grid-cols-3 gap-[1rem]">
                <li>
                  <img src={bri} alt="bri institute" className="max-w-[100px] mx-auto" />
                </li>
                <li>
                  <img src={bca} alt="bca hall" className="max-w-[100px] mx-auto" />
                </li>
                <li>
                  <img src={bni} alt="bni and co" className="max-w-[100px] mx-auto" />
                </li>
                <li>
                  <img src={dana} alt="dana ways" className="max-w-[100px] mx-auto" />
                </li>
                <li>
                  <img src={ovo} alt="ovo transport" className="max-w-[100px] mx-auto" />
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-lg mb-[1rem]">Partners</h2>
              <ul className="flex items-center gap-[1rem]">
                <li>
                  <img src={jt} alt="j&t co" className="max-w-[100px]" />
                </li>
                <li>
                  <img src={sic} alt="sic co" className="max-w-[100px]" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-left sm:text-center text-white mt-5">
        <small>Copyright © SafeRouter-NG All Right Reserved</small>
      </div>
    </footer>
  );
};

export default Footer;
