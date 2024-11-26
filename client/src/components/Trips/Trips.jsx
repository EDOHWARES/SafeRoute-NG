import React from 'react';

const Trips = () => {
  // Dummy trip data
  const trips = [
    {
      id: 1,
      transporter: 'Fast Wheels Logistics',
      origin: 'Lagos',
      destination: 'Abuja',
      departureTime: '8:00 AM',
      arrivalTime: '4:00 PM',
      status: 'Completed',
      price: '₦15,000',
    },
    {
      id: 2,
      transporter: 'Swift Express',
      origin: 'Port Harcourt',
      destination: 'Enugu',
      departureTime: '9:30 AM',
      arrivalTime: '2:30 PM',
      status: 'Ongoing',
      price: '₦10,000',
    },
    {
      id: 3,
      transporter: 'Reliable Rides',
      origin: 'Kano',
      destination: 'Kaduna',
      departureTime: '7:00 AM',
      arrivalTime: '9:30 AM',
      status: 'Pending',
      price: '₦8,000',
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Transporter Trips</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="border border-gray-200 rounded-lg shadow-md p-4 bg-white"
          >
            <h2 className="text-lg font-semibold mb-2">{trip.transporter}</h2>
            <p className="text-gray-600">
              <strong>Origin:</strong> {trip.origin}
            </p>
            <p className="text-gray-600">
              <strong>Destination:</strong> {trip.destination}
            </p>
            <p className="text-gray-600">
              <strong>Departure Time:</strong> {trip.departureTime}
            </p>
            <p className="text-gray-600">
              <strong>Arrival Time:</strong> {trip.arrivalTime}
            </p>
            <p className="text-gray-600">
              <strong>Status:</strong>{' '}
              <span
                className={`${
                  trip.status === 'Completed'
                    ? 'text-green-600'
                    : trip.status === 'Ongoing'
                    ? 'text-blue-600'
                    : 'text-red-600'
                }`}
              >
                {trip.status}
              </span>
            </p>
            <p className="text-gray-600">
              <strong>Price:</strong> {trip.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trips;
