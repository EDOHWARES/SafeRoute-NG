import React from 'react';
import sadEmoji from '../../assets/images/sademoji.png';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='w-screen h-screen flex flex-col gap-[1rem] my-auto items-center justify-center'>
        <div className='w-[10rem]'>
            <img src={sadEmoji} alt="sad emoji" />
        </div>
        <h1 className='text-9xl text-gray-600'>404</h1>
        <p className='text-gray-400'>Page Not Found</p>
        <p className='text-gray-500'>
            The page you're looking for does <br /> not exist or other error occurred.
        </p>
        <Link to='/'>
            <button className='bg-transparent border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white duration-500'>Go back</button>
        </Link>
    </div>
  )
}

export default ErrorPage;