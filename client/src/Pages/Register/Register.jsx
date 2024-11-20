import React from 'react';
import './Register.css';
import gradient from '../../assets/images/gradient.png';

const Register = () => {
  return (
    <div className='register flex items-center justify-center w-full px-10 py-5 relative'>
        <img src={gradient} alt="gradient" className='-z-10 absolute left-[-15rem] top-[-3rem]' />
        <form action="" className='w-[70%] flex flex-col gap-[1rem]'>
            <h1 className='text-[#252B42] font-bold text-3xl text-center mb-[1rem]'>REGISTER AS A TRANSPORTER</h1>
            <div className='el'>
                <label htmlFor="transporterName">Full Name</label>
                <input id='transporterName' type="text" />
            </div>
            <div className='el'>
                <label htmlFor="transporterNumber">Phone Number</label>
                <input id='transporterNumber' type="number" />
            </div>
            <div className='el'>
              <label htmlFor="vehicleType">Vehicle Type</label>
              <select name="" id="vehicleType">
                <option value="bus">Bus</option>
                <option value="pickup">Pickup</option>
              </select>
            </div>
            <div className='el'>
              <label htmlFor="reg">Vehicle Registration number</label>
              <input id='reg' type="text" />
            </div>
            <div className='el'>
              <label htmlFor="operatingArea">Primary Operating Area</label>
              <input type="text" id='operatingArea' />
            </div>
            <div className='el'>
              <label htmlFor="license">Driver's License Number</label>
              <input type="text" id='license' />
            </div>
            <div className='el'>
              <label htmlFor="email">Email</label>
              <input type="text" id='email' />
            </div>
            <div className='el'>
              <label htmlFor="password">Password</label>
              <input type="text" id='password' />
            </div>
            <div className='el'>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="text" id='confirmPassword' />
            </div>
            <img src={gradient} alt="gradient" className='absolute right-[-15rem] top-[20rem]' />
            <div className='w-full'>
              <button className='w-full bg-blue-600 text-white border border-transparent font-semibold text-center text-xl p-5 hover:border-blue-600 hover:bg-transparent hover:text-blue-600 duration-500'>Continue</button>
            </div>
        </form>
    </div>
  )
}

export default Register