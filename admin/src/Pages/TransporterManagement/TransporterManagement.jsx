import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

// Transporter Card Component
const TransporterCard = ({ name, vehicle, contact, status, onToggleStatus }) => (
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

// Main Component
const TransporterManagement = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [formFields, setFormFields] = useState({
    name: "",
    vehicle: "",
    contact: "",
    registrationNumber: "",
    operatingArea: "",
    licenseNumber: "",
    path: "Lagos to Ibadan",
    email: "",
    password: "",
    subscribeAlerts: false,
    agreeToTerms: false,
  });
  const [status, setStatus] = useState("Active");
  const [transporters, setTransporters] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch registered transporters and validate authentication
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    setIsAuthenticated(true);

    const fetchTransporters = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${apiUrl}/admin/get-transporters`);
        setTransporters(data.data);
      } catch (error) {
        console.error("Error fetching transporters:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchTransporters();
  }, [apiUrl]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${apiUrl}/transporter/register`, {
        name: formFields.name,
        phone: formFields.contact,
        vehicleType: formFields.vehicle,
        vehicleRegistrationNumber: formFields.registrationNumber,
        primaryOperatingArea: formFields.operatingArea,
        driversLicenseNumber: formFields.licenseNumber,
        path: formFields.path,
        email: formFields.email,
        password: formFields.password,
        subscribeToSafetyAlerts: formFields.subscribeAlerts,
        agreeToTermsOfService: formFields.agreeToTerms,
      });

      if (data.success) {
        toast.success("Transporter registered successfully!");
        setTransporters((prev) => [...prev, data.transporter]);
        setFormFields({
          name: "",
          vehicle: "",
          contact: "",
          registrationNumber: "",
          operatingArea: "",
          licenseNumber: "",
          path: "",
          email: "",
          password: "",
          subscribeAlerts: false,
          agreeToTerms: false,
        });
        setStatus("Active");
      }
    } catch (error) {
      toast.error("Error registering transporter. Please try again.");
      console.error("Registration Error:", error);
    }
  };

  const toggleTransporterStatus = (index) => {
    setTransporters((prev) =>
      prev.map((transporter, i) =>
        i === index
          ? { ...transporter, status: transporter.status === "Active" ? "Inactive" : "Active" }
          : transporter
      )
    );
  };

  if (isAuthenticated === null) return <div>Loading...</div>;
  if (!isAuthenticated) {
    navigate("/auth");
    return null;
  }

  if (loading) {
    // Show spinner while fetching data
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#42BBFF" />
      </div>
    );
  }

  return (
    <div className="bg-transparent p-6">
      <h1 className="text-3xl font-bold text-white">Transporter Management</h1>

      {/* Transporter Form */}
      <div className="mt-8 space-y-8">
        <div className="bg-[#2B3544] p-6 rounded-xl">
          <h2 className="text-2xl font-semibold text-white mb-4">Register a Transporter</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Full Name", name: "name", type: "text" },
              { label: "Phone Number", name: "contact", type: "text" },
              { label: "Vehicle Type", name: "vehicle", type: "text" },
              { label: "Vehicle Registration Number", name: "registrationNumber", type: "text" },
              { label: "Primary Operating Area", name: "operatingArea", type: "text" },
              { label: "Driver's License Number", name: "licenseNumber", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Password", name: "password", type: "password" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-gray-400 text-sm mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  id={name}
                  name={name}
                  value={formFields[name]}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#3B4753] text-white p-2 rounded-lg outline-none border border-transparent focus:border-[#42BBFF]"
                />
              </div>
            ))}

            <div>
              <label htmlFor="path" className="block text-gray-400 text-sm mb-1">
                Choose a preferred path
              </label>
              <select
                id="path"
                name="path"
                value={formFields.path}
                onChange={handleChange}
                required
                className="w-full bg-[#3B4753] text-white p-2 rounded-lg outline-none border border-transparent focus:border-[#42BBFF]"
              >
                {["Lagos to Ibadan", "Ibadan to Ilorin", "Ilorin to Jebba", "Jebba to Minna", "Minna to Abuja", "Abuja to Lokoja"].map((path) => (
                  <option key={path} value={path.toLowerCase().replace(" ", "-")}>
                    {path}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-4">
              {[
                { label: "Subscribe to Safety Alerts", name: "subscribeAlerts" },
                { label: "Agree to Terms of Service", name: "agreeToTerms" },
              ].map(({ label, name }) => (
                <label key={name} htmlFor={name} className="inline-flex items-center text-gray-400">
                  <input
                    type="checkbox"
                    id={name}
                    name={name}
                    checked={formFields[name]}
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2 text-sm">{label}</span>
                </label>
              ))}
            </div>

            <button type="submit" className="bg-[#42BBFF] px-6 py-2 text-white rounded-lg">
              Register Transporter
            </button>
          </form>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center mt-8">
          <ClipLoader color="#42BBFF" loading={loading} size={50} />
        </div>
      )}

      {/* Transporter List */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Registered Transporters</h2>
        {transporters.length === 0 ? (
          <p className="text-gray-400">No transporters registered yet.</p>
        ) : (
          transporters
          .map((transporter, index) => (
            <TransporterCard
              key={transporter._id}
              name={transporter.name}
              vehicle={transporter.vehicleType}
              contact={transporter.phone}
              status={status}
              onToggleStatus={() => toggleTransporterStatus(index)}
            />
          ))
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default TransporterManagement;
