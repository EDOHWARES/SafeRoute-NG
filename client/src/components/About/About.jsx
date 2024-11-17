import React from 'react';
import './About.css';
import aboutImg from '../../assets/images/aboutimg.png';

const About = () => {
  return (
    <div className='about flex items-center justify-center px-10 py-5'>
        <div className=' max-w-[1000px] flex items-start justify-between gap-[5rem]'>
        <div className='flex flex-col items-start'>
            <h2 className='text-[40px] font-bold text-[#2E3339]'>About us</h2>
            <p className='text-black'>At SafeRoute Nigeria, our mission is to enhance road safety and transportation efficiency for travelers and transporters across Nigeria. Focusing on the Lagos-Kano route, we provide real-time road updates, safety alerts, and feedback collection tools to ensure smoother and safer journeys.</p>
            <button className='bg-[#2A2E35] text-white py-2 px-4 mt-4 rounded-md'>Take a look</button>
        </div>

        <div className='w-2/5'>
            <img src={aboutImg} alt="about image" />
        </div>
        </div>
    </div>
  )
}

export default About