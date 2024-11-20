import React from 'react';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import Footer from '../../components/Footer/Footer';
import Features from '../../components/Features/Features';


const Home = () => {
  return (
    <section className='flex flex-col'>
        <Header/>
        <Hero />
        <About />
        <Features />
        <Footer />
    </section>
  )
}

export default Home