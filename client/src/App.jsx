import {Routes, Route} from 'react-router-dom';
import { useState } from 'react'
import './App.css';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
