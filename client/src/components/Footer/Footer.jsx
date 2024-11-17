import React from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { FaSquareXTwitter, FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className='footer flex justify-between items-center px-10 py-5'>
        <div className='text-white max-w-[1000px] w-full'>
            <div className='flex justify-between items-start'>
            <ul>
                <li>SafeRoute-NG</li>
                <li>Route</li>
                <li>About</li>
                <li>Features</li>
            </ul>
            <ul>
                <li>Socials & Media</li>
                <li>
                    <span>
                        <LuInstagram/>
                    </span>
                    <span>Instagram</span>
                </li>
                <li>
                    <span>
                        <FaWhatsapp />
                    </span>
                    <span>Whatsapp</span>
                </li>
                <li>
                    <span>
                        <FaFacebookF/>
                    </span>
                    <span>Facebook</span>
                </li>
                <li>
                    <span>
                        <FaXTwitter/>
                    </span>
                    <span>X</span>
                </li>
            </ul>
            <ul>
                
            </ul>
            </div>
            <div>
                <small>Copyright © SafeRouter-NG All Right Reserved</small>
            </div>
        </div>
    </footer>
  )
}

export default Footer