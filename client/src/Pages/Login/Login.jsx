import React from 'react';;
import gradient from '../../assets/images/gradient.png';
import {Link} from 'react-router-dom';


const Login = () => {
  return (
    <div className='register flex items-center justify-center w-full px-10 py-5 relative overflow-x-hidden h-screen'>
    <img src={gradient} alt="gradient" className='-z-10 absolute left-[-15rem] top-[-3rem]' />
    <form action="" className='w-[70%] flex flex-col gap-[1rem]'>
        <h1 className='text-[#252B42] font-bold text-3xl text-center mb-[1rem]'>LOGIN AS A TRANSPORTER</h1>
        <div className='el'>
          <label htmlFor="email">Email</label>
          <input type="text" id='email' />
        </div>
        <div className='el'>
            <label htmlFor="transporterNumber">Password</label>
            <input id='transporterNumber' type="password" />
        </div>
        <div className='flex items-center gap-[.5rem] justify-center'>
          <span>Don't have an account ? </span>
          <Link to={'/register'} className='text-purple-600 font-semibold'>Sign up</Link>
        </div>
        <img src={gradient} alt="gradient" className='absolute right-[-15rem] top-[20rem]' />
        <div className='w-full'>
          <button className='w-full bg-blue-600 text-white border border-transparent font-semibold text-center text-xl p-5 hover:border-blue-600 hover:bg-transparent hover:text-blue-600 duration-500'>Continue</button>
        </div>
    </form>
</div>
  )
}

export default Login