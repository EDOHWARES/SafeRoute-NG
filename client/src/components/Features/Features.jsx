import React from 'react';
import notification from '../../assets/icons/notification.png';
import airtime from '../../assets/icons/airtime.png';
import alert from '../../assets/icons/alert.png';
import feedback from '../../assets/icons/feedback.png';
import './Features.css';

const Feature = ({icon, title, details}) => {
    return (
        <div className='shadow flex flex-col items-center justify-center gap-4 w-full sm:w-[250px] h-[300px] rounded-[10px] p-5 hover:scale-105 duration-500'>
            <img src={icon} alt={title} className='w-[100px] mb-4' />
            <h1 className='font-semibold text-xl text-center'>{title}</h1>
            <p className='text-sm text-center'>{details}</p>
        </div>
    )
}

const Features = () => {
  return (
    <div id='features' className='px-5 sm:px-10 py-5 flex flex-col gap-10 mb-[4rem]'>
        <h1 className='w-full text-center text-[32px] sm:text-[40px] font-bold'>Features</h1>
        <div className='flex flex-col w-full max-w-[1440px] mx-auto sm:flex-row items-center justify-between gap-6 sm:gap-10 flex-wrap'>
            <Feature 
                icon={notification}
                title={'Real-Time Notifications'}
                details={'Receive updates on road conditions and safety alerts.'}
            />

            <Feature 
                icon={feedback} 
                title={'Feedback Collection via USSD'}
                details={'Provide feedback to improve road safety and efficiency.'}
            />

            <Feature 
                icon={alert}
                title={'Automated Alerts'}
                details={'Stay on top of maintenance schedules and potential roadblocks.'}
            />

            <Feature 
                icon={airtime}  
                title={'Airtime Rewards'}
                details={'Earn airtime for participating in feedback.'}
            />
        </div>
    </div>
  )
}

export default Features;
