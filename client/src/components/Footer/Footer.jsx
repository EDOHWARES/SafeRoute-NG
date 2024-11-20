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
    <footer className="footer flex flex-col justify-between items-center px-10 py-5 pt-16 font-semibold">
      <div className="text-white w-full">
        <div className="max-w-[1000px] w-full flex justify-between items-start mx-auto">
          <ul className="flex flex-col gap-[1rem]">
            <li className="mb-[1rem]">SafeRoute-NG</li>
            <li>Route</li>
            <li>About</li>
            <li>Features</li>
          </ul>
          <ul className="flex flex-col gap-[1rem]">
            <li className="mb-[1rem]">Socials & Media</li>
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
          <div className="flex flex-col gap-[2rem]">
            <div>
                <h2 className="mb-[2rem]">Registered organizations</h2>
                <ul className="grid grid-cols-2 gap-[1rem]">
                    <li>
                        <img src={bri} alt="bri institute" />
                    </li>
                    <li>
                        <img src={bca} alt="bca hall" />
                    </li>
                    <li>
                        <img src={bni} alt="bni and co" />
                    </li>
                    <li>
                        <img src={dana} alt="dana ways" />
                    </li>
                    <li>
                        <img src={ovo} alt="ovo transport" />
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="mb-[1rem]">Partners</h2>
                <ul className="flex items-center gap-[1rem]">
                    <li>
                        <img src={jt} alt="j&t co" />
                    </li>
                    <li>
                        <img src={sic} alt="sic co" />
                    </li>
                </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full items-center text-center justify-center text-white ">
        <small>Copyright © SafeRouter-NG All Right Reserved</small>
      </div>
    </footer>
  );
};

export default Footer;
