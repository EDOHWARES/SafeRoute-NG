import React from 'react';
import aboutImg from '../../assets/images/aboutimg.png';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div id='about' className='about flex items-center justify-center px-5 sm:px-10 py-5'>
        <div className='max-w-[1200px] w-full flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-[5rem]'>
            {/* Text Section */}
            <div className='flex flex-col items-center sm:items-start text-center sm:text-left'>
                <h2 className='text-[32px] sm:text-[40px] font-bold text-[#2E3339]'>
                    About us
                </h2>
                <p className='text-black sm:text-lg text-sm mt-4'>
                    At SafeRoute Nigeria, our mission is to enhance road safety and transportation efficiency for travelers, transporters and logistics movements across Nigeria. Focusing on the Lagos-Kano route, we provide real-time road updates, safety alerts, and feedback collection tools to ensure smoother and safer journeys.
                </p>
                <Link to={'/dashboard'} >
                    <button className='bg-[#2A2E35] text-white py-2 px-4 mt-4 rounded-md hover:bg-[#424749] duration-500'>
                        Take a look
                    </button>
                </Link>
            </div>

            {/* Image Section */}
            <div className='w-full sm:w-2/5 mt-6 sm:mt-0'>
                <img src={aboutImg} alt="about image" className='w-full h-auto object-cover rounded-lg'/>
            </div>
        </div>
    </div>
  );
};

export default About;
