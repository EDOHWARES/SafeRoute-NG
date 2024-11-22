import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className='hero flex flex-col items-center justify-center text-center bg-cover bg-bottom bg-no-repeat h-[90vh] w-full mt-[-1rem]'>
        <h3 className='atkinson text-white text-xl sm:text-2xl md:text-3xl'>WELCOME TO</h3>
        <h1 className='allerta text-[64px] sm:text-[96px] md:text-[128px] text-white'>SafeRoute-NG</h1>
        <p className='text-white text-center mb-[2rem] px-4 sm:px-8 md:px-12 text-sm sm:text-lg md:text-xl'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis sit pariatur, 
          <br /> minus sed illum doloribus molestias voluptas laborum voluptates consequatur, 
          <br /> eos harum quis quas nobis neque? Ullam fugit inventore perspiciatis!
        </p>
        <Link to='/login'>
          <button className='bg-transparent text-white border border-white py-4 px-8 rounded-xl font-semibold text-xl hover:bg-white hover:text-black hover:border-white duration-500'>
            Take a look
          </button>
        </Link>
    </section>
  );
};

export default Hero;
