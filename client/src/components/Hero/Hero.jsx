import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className='hero flex flex-col items-center justify-center'>
        <h3 className='atkinson text-white'>WELCOME TO</h3>
        <h1 className='allerta text-[128px] text-white'>SafeRoute-NG</h1>
        <button className='bg-transparent text-white border border-white py-4 px-8 rounded-xl font-semibold text-xl hover:bg-white hover:text-black hover:border-white duration-500'>Take a look</button>
    </section>
  )
}

export default Hero