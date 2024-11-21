import React, { useState } from 'react';

// Transporter Card Component
const TransporterCard = ({ name, vehicle, contact, status, onStatusChange }) => {
  return (
    <div className="bg-[#1E2533] p-4 rounded-xl flex items-start space-x-4 mb-4">
      <div className="flex-1">
        <div className="text-sm text-gray-400">Vehicle: {vehicle}</div>
        <div className="text-lg font-semibold text-white">Name: {name}</div>
        <div className="mt-2 text-gray-300">Contact: {contact}</div>
        <div className="mt-4 flex justify-between items-center">
          <div
            className={`px-3 py-1 rounded-full text-sm ${
              status === 'Active' ? 'bg-green-500' : 'bg-red-500'
            } text-white`}
          >
            {status}
          </div>
          <button
            onClick={() => onStatusChange(name)}
            className="text-blue-400 hover:text-blue-600"
          >
            Toggle Status
          </button>
        </div>
      </div>
    </div>
  );
};

// Transporter Management Component
const TransporterManagement = () => {
  const [name, setName] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState('Active');

  const [transporters, setTransporters] = useState([
    { name: 'John Doe', vehicle: 'Truck', contact: '08012345678', status: 'Active' },
    { name: 'Jane Smith', vehicle: 'Van', contact: '08087654321', status: 'Inactive' },
    { name: 'Ahmed Bello', vehicle: 'Bus', contact: '08023456789', status: 'Active' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransporter = { name, vehicle, contact, status };
    setTransporters([...transporters, newTransporter]);
    setName('');
    setVehicle('');
    setContact('');
    setStatus('Active');
  };

  const handleStatusChange = (name) => {
    setTransporters(
      transporters.map((transporter) =>
        transporter.name === name
          ? { ...transporter, status: transporter.status === 'Active' ? 'Inactive' : 'Active' }
          : transporter
      )
    );
  };

  return (
    <div className="bg-[#181D2A] p-6">
      <h1 className="text-3xl font-bold text-white">Transporter Management</h1>

      {/* Transporter Form */}
      <div className="mt-8 space-y-8">
        <div className="bg-[#2B3544] p-6 rounded-xl">
          <h2 className="text-2xl font-semibold text-white mb-4">Add New Transporter</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-400 text-sm">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Transporter's Name"
                className="w-full bg-[#3B4753] text-white p-2 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="vehicle" className="block text-gray-400 text-sm">Vehicle Type</label>
              <input
                type="text"
                id="vehicle"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                placeholder="Vehicle Type"
                className="w-full bg-[#3B4753] text-white p-2 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="contact" className="block text-gray-400 text-sm">Contact Number</label>
              <input
                type="text"
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Contact Number"
                className="w-full bg-[#3B4753] text-white p-2 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-gray-400 text-sm">Status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#3B4753] text-white p-2 rounded-lg"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-green-500 p-3 rounded-lg text-white">
              Add Transporter
            </button>
          </form>
        </div>

        {/* Transporter List */}
        <div>
          <h2 className="text-2xl font-semibold text-white">Transporter List</h2>
          <div className="mt-6 space-y-4">
            {transporters.map((transporter, index) => (
              <TransporterCard
                key={index}
                name={transporter.name}
                vehicle={transporter.vehicle}
                contact={transporter.contact}
                status={transporter.status}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransporterManagement;
