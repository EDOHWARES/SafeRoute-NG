import { useState } from 'react'
import './App.css';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <>
      <Header/>
      <Hero />
      <About />
      <Features />
      <Footer />
    </>
  )
}

export default App
