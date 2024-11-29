import React from 'react';
import Snowfall from 'react-snowfall'; // Import Snowfall component
import './ChristmasGreeting.css';

const ChristmasGreeting = ({ onContinue }) => {
  return (
    <div 
      className="christmas fixed inset-0 bg-cover bg-center flex flex-col items-center justify-center z-50"
    >
      {/* Snowfall effect */}
      <Snowfall 
        snowflakeCount={600}        
        snowflakeOpacity={0.9}      // Slightly more opaque snowflakes
        snowColor="rgba(255, 255, 255, 0.9)" 
      />

      <div className="text-center relative z-10 px-4 text-white">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-xl">Merry Christmas in Advance!</h1>
        <p className="mb-6 text-xl drop-shadow-xl">Wishing you a joyful holiday season. Click below to continue to SafeRoute-NG!</p>
        <button
          onClick={onContinue}
          className="bg-white text-red-600 px-6 py-3 rounded-lg text-xl font-semibold hover:bg-gray-100 transition duration-300 drop-shadow-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ChristmasGreeting;
