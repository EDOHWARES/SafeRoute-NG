import React, { useState, useEffect } from "react";
import axios from "axios";

// Transporter Card Component
const TransporterCard = ({
  name,
  vehicle,
  contact,
  status,
  onToggleStatus,
}) => {
  return (
    <div className="bg-[#1E2533] p-4 rounded-xl flex items-start space-x-4 mb-4">
      <div className="flex-1">
        <div className="text-sm text-gray-400">Vehicle: {vehicle}</div>
        <div className="text-lg font-semibold text-white">Name: {name}</div>
        <div className="mt-2 text-gray-300">Contact: {contact}</div>
        <div className="mt-4 flex justify-between items-center">
          <div
            className={`px-3 py-1 rounded-full text-sm ${
              status === "Active" ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            {status}
          </div>
          <button
            onClick={onToggleStatus}
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
  const apiUrl = import.meta.env.VITE_API_URL;

  const [name, setName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [contact, setContact] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [operatingArea, setOperatingArea] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [subscribeAlerts, setSubscribeAlerts] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [status, setStatus] = useState("Active");
  const [transporters, setTransporters] = useState([]);

  // Fetch registered transporters on page load
  useEffect(() => {
    const getRegisteredTransporters = async () => {
      try {
        const response = await axios.get(`${apiUrl}/admin/get-transporters`);
        setTransporters(response.data.data);
      } catch (error) {
        console.error("Error fetching transporters:", error);
      }
    };

    getRegisteredTransporters();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransporter = {
      name,
      vehicleType: vehicle,
      phone: contact,
      registrationNumber,
      operatingArea,
      licenseNumber,
      email,
      subscribeAlerts,
      agreeToTerms,
    };

    setTransporters([...transporters, newTransporter]);
    // Reset the form
    setName("");
    setVehicle("");
    setContact("");
    setRegistrationNumber("");
    setOperatingArea("");
    setLicenseNumber("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setSubscribeAlerts(false);
    setAgreeToTerms(false);
    setStatus("Active");
  };

  // Handler to toggle status
  const toggleTransporterStatus = (index) => {
    setTransporters((prevTransporters) =>
      prevTransporters.map((transporter, i) =>
        i === index
          ? { ...transporter, status: transporter.status === "Active" ? "Inactive" : "Active" }
          : transporter
      )
    );
  };

  return (
    <div className="bg-transparent p-6">
      <h1 className="text-3xl font-bold text-white">Transporter Management</h1>

      {/* Transporter Form */}
      <div className="mt-8 space-y-8">
        <div className="bg-[#2B3544] p-6 rounded-xl">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Register a Transporter
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-400 text-sm mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#3B4753] text-white p-2 rounded-lg outline-none border border-transparent focus:border-[#42BBFF]"
              />
            </div>

            <div>
              <label htmlFor="contact" className="block text-gray-400 text-sm mb-1">
                Phone Number
              </label>
              <input
                type="text"
                required
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full bg-[#3B4753] text-white p-2 rounded-lg outline-none border border-transparent focus:border-[#42BBFF]"
              />
            </div>

            <div>
              <label htmlFor="vehicle" className="block text-gray-400 text-sm mb-1">
                Vehicle Type
              </label>
              <input
                type="text"
                id="vehicle"
                required
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="w-full bg-[#3B4753] text-white p-2 rounded-lg outline-none border border-transparent focus:border-[#42BBFF]"
              />
            </div>

            <div>
              <label htmlFor="registrationNumber" className="block text-gray-400 text-sm mb-1">
                Vehicle Registration Number
              </label>
              <input
                type="text"
                id="registrationNumber"
                required
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                className="w-full bg-[#3B4753] text-white p-2 rounded-lg outline-none border border-transparent focus:border-[#42BBFF]"
              />
            </div>

            <div>
              <label htmlFor="operatingArea" className="block text-gray-400 text-sm mb-1">
                Primary Operating Area
              </label>
              <input
                type="text"
                id="operatingArea"
                required
                value={operatingArea}
                onChange={(e) => setOperatingArea(e.target.value)}
                className="w-full bg-[#3B4753] text-white p-2 rounded-lg outline-none border border-transparent focus:border-[#42BBFF]"
              />
            </div>

            <div>
              <label htmlFor="licenseNumber" className="block text-gray-400 text-sm mb-1">
                Driver's License Number
              </label>
              <input
                type="text"
                id="licenseNumber"
                required
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                className="w-full bg-[#3B4753] text-white p-2 rounded-lg outline-none border border-transparent focus:border-[#42BBFF]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-400 text-sm mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#3B4753] text-white p-2 rounded-lg outline-none border border-transparent focus:border-[#42BBFF]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-400 text-sm mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#3B4753] text-white p-2 rounded-lg outline-none border border-transparent focus:border-[#42BBFF]"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-gray-400 text-sm mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#3B4753] text-white p-2 rounded-lg outline-none border border-transparent focus:border-[#42BBFF]"
              />
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={subscribeAlerts}
                  onChange={(e) => setSubscribeAlerts(e.target.checked)}
                  className="mr-2"
                />
                Subscribe to Safety Alerts (SMS)
              </label>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  required
                  className="mr-2"
                />
                Agree to Terms of Service
              </label>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Register
            </button>
          </form>
        </div>

        {/* Registered Transporters */}
        <div className="bg-[#2B3544] p-6 rounded-xl">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Registered Transporters
          </h2>
          {transporters.map((transporter, index) => (
            <TransporterCard
              key={index}
              name={transporter.name}
              vehicle={transporter.vehicleType}
              contact={transporter.phone}
              status={transporter.status || status}
              onToggleStatus={() => toggleTransporterStatus(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransporterManagement;
