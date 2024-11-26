import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  const [name, setName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [contact, setContact] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [operatingArea, setOperatingArea] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [path, setPath] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subscribeAlerts, setSubscribeAlerts] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [status, setStatus] = useState("Active");
  const [transporters, setTransporters] = useState([]);

  // Fetch registered transporters on page load
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token == null) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(token);
    }

    if (token) {
      const getRegisteredTransporters = async () => {
        try {
          const response = await axios.get(`${apiUrl}/admin/get-transporters`);
          setTransporters(response.data.data);
        } catch (error) {
          console.error("Error fetching transporters:", error);
        }
      };

      getRegisteredTransporters();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API request to register the new transporter
      const response = await axios.post(`${apiUrl}/transporter/register`, {
        name,
        phone: contact,
        vehicleType: vehicle,
        vehicleRegistrationNumber: registrationNumber,
        primaryOperatingArea: operatingArea,
        driversLicenseNumber: licenseNumber,
        email,
        password,
        subscribeToSafetyAlerts: subscribeAlerts,
        agreeToTermsOfService: agreeToTerms,
      });

      if (response.data.success) {
        // Show success toast
        toast.success("Transporter registered successfully!");

        // If successful, add the new transporter to the list
        setTransporters((prevTransporters) => [
          ...prevTransporters,
          response.data.transporter,
        ]);

        // Reset form after successful registration
        setName("");
        setVehicle("");
        setContact("");
        setRegistrationNumber("");
        setOperatingArea("");
        setLicenseNumber("");
        setEmail("");
        setPassword("");
        setSubscribeAlerts(false);
        setAgreeToTerms(false);
        setStatus("Active");
      }
    } catch (error) {
      // Show error toast
      toast.error("Error registering transporter. Please try again.");
      console.error("Error registering transporter:", error);
    }
  };

  // Handler to toggle status
  const toggleTransporterStatus = (index) => {
    setTransporters((prevTransporters) =>
      prevTransporters.map((transporter, i) =>
        i === index
          ? {
              ...transporter,
              status: transporter.status === "Active" ? "Inactive" : "Active",
            }
          : transporter
      )
    );
  };

  if (isAuthenticated === null) {
    // Optionally, show a loading spinner or wait until the token is checked
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    navigate("/auth");
    return null;
  }

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
              <label
                htmlFor="name"
                className="block text-gray-400 text-sm mb-1"
              >
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
              <label
                htmlFor="contact"
                className="block text-gray-400 text-sm mb-1"
              >
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
              <label
                htmlFor="vehicle"
                className="block text-gray-400 text-sm mb-1"
              >
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
              <label
                htmlFor="registrationNumber"
                className="block text-gray-400 text-sm mb-1"
              >
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
              <label
                htmlFor="operatingArea"
                className="block text-gray-400 text-sm mb-1"
              >
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
              <label
                htmlFor="licenseNumber"
                className="block text-gray-400 text-sm mb-1"
              >
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
              <label
                htmlFor="licenseNumber"
                className="block text-gray-400 text-sm mb-1"
              >
                Choose a preferred path
              </label>
              <select
                id="preferredPath"
                required
                value={path}
                onChange={(e) => setPath(e.target.value)}
                className="w-full bg-[#3B4753] text-white p-2 rounded-lg outline-none border border-transparent focus:border-[#42BBFF]"
              >
                <option value="lagos-to-ibadan">Lagos to Ibadan</option>
                <option value="ibadan-to-ilorin">Ibadan to Ilorin</option>
                <option value="ilorin-to-jebba">Ilorin to Jebba</option>
                <option value="jebba-to-minna">Jebba to Minna</option>
                <option value="minna-to-abuja">Minna to Abuja</option>
                <option value="abuja-to-lokoja">Abuja to Lokoja</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-400 text-sm mb-1"
              >
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
              <label
                htmlFor="password"
                className="block text-gray-400 text-sm mb-1"
              >
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
              <label
                htmlFor="subscribeAlerts"
                className="inline-flex items-center text-gray-400"
              >
                <input
                  type="checkbox"
                  id="subscribeAlerts"
                  checked={subscribeAlerts}
                  onChange={() => setSubscribeAlerts(!subscribeAlerts)}
                  className="form-checkbox"
                />
                <span className="ml-2 text-sm">Subscribe to Safety Alerts</span>
              </label>
            </div>

            <div>
              <label
                htmlFor="agreeToTerms"
                className="inline-flex items-center text-gray-400"
              >
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  checked={agreeToTerms}
                  onChange={() => setAgreeToTerms(!agreeToTerms)}
                  className="form-checkbox"
                />
                <span className="ml-2 text-sm">Agree to Terms of Service</span>
              </label>
            </div>

            <div className="flex justify-center items-center mt-4">
              <button
                type="submit"
                className="bg-[#42BBFF] px-6 py-2 text-white rounded-lg"
              >
                Register Transporter
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Transporter List */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Registered Transporters
        </h2>
        <div className="space-y-4">
          {transporters.map((transporter, index) => (
            <TransporterCard
              key={index}
              name={transporter.name}
              vehicle={transporter.vehicleType}
              contact={transporter.phone}
              status={status}
              onToggleStatus={() => toggleTransporterStatus(index)}
            />
          ))}
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default TransporterManagement;
