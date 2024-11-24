import React from 'react';

const TransporterInfoCard = ({ label, value }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-gray-600 text-sm font-semibold">{label}</h3>
      <p className="text-lg font-bold text-gray-800">{value}</p>
    </div>
  );
};

export default TransporterInfoCard;
