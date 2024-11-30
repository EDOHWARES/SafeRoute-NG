import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import gradient from "../../assets/images/gradient.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    transporterName: "",
    transporterNumber: "",
    vehicleType: "Bus",
    reg: "",
    operatingArea: "",
    license: "",
    path: "Lagos to Ibadans",
    email: "",
    password: "",
    alerts: false,
    terms: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.terms) {
      toast.error("You must agree to the Terms of Service!");
      return;
    }

    try {
      toast.info("Registering transporter...");
      const response = await axios.post(`${apiUrl}/transporter/register`, {
        name: formData.transporterName,
        phone: formData.transporterNumber,
        vehicleType: formData.vehicleType,
        vehicleRegistrationNumber: formData.reg,
        primaryOperatingArea: formData.operatingArea,
        driversLicenseNumber: formData.license,
        path: formData.path,
        email: formData.email,
        password: formData.password,
        subscribeToSafetyAlerts: formData.alerts,
        agreeToTermsOfService: formData.terms,
      });

      if (response.data.success) {
        toast.success(response.data.message || "Registration successful!");
        setFormData({
          transporterName: "",
          transporterNumber: "",
          vehicleType: "bus",
          reg: "",
          operatingArea: "",
          license: "",
          path: "Lagos to Ibadan",
          email: "",
          password: "",
          alerts: false,
          terms: false,
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      const errorMsg = error.response?.data?.message || "Something went wrong!";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="register flex items-center justify-center w-full px-4 md:px-10 py-5 relative overflow-x-hidden">
      <ToastContainer />
      <img
        src={gradient}
        alt="gradient"
        className="absolute left-[-22rem] md:left-[-15rem] top-[-5rem] md:top-[-3rem] -z-10"
      />
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[70%] flex flex-col gap-[1rem]"
      >
        <h1 className="text-[#252B42] font-semibold md:font-bold text-xl md:text-3xl text-center mb-[1rem]">
          REGISTER AS A TRANSPORTER
        </h1>
        <div className="el">
          <label htmlFor="transporterName">Full Name</label>
          <input
            id="transporterName"
            type="text"
            value={formData.transporterName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="el">
          <label htmlFor="transporterNumber">Phone Number</label>
          <input
            id="transporterNumber"
            type="number"
            value={formData.transporterNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="el">
          <label htmlFor="vehicleType">Vehicle Type</label>
          <select
            id="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            required
          >
            <option value="bus">Bus</option>
            <option value="pickup">Pickup</option>
            <option value="truck">Truck</option>
            <option value="van">Van</option>
            <option value="taxi">Taxi</option>
            <option value="tanker">Tanker</option>
            <option value="motorbike">Motorbike</option>
          </select>
        </div>
        <div className="el">
          <label htmlFor="reg">Vehicle Registration number</label>
          <input
            id="reg"
            type="text"
            value={formData.reg}
            onChange={handleChange}
            required
          />
        </div>
        <div className="el">
          <label htmlFor="operatingArea">Primary Operating Area</label>
          <input
            type="text"
            id="operatingArea"
            value={formData.operatingArea}
            onChange={handleChange}
            required
          />
        </div>
        <div className="el">
          <label htmlFor="license">Driver's License Number</label>
          <input
            type="text"
            id="license"
            value={formData.license}
            onChange={handleChange}
            required
          />
        </div>
        <div className="el">
          <label htmlFor="path">Choose a preferred path</label>
          <select
            id="path"
            value={formData.path}
            onChange={handleChange}
            required
          >
            <option value="Lagos to Ibadan">Lagos to Ibadan</option>
            <option value="Ibadan to Ilorin">Ibadan to Ilorin</option>
            <option value="Ilorin to Jeba">Ilorin to Jebba</option>
            <option value="Jeba to Minna">Jebba to Minna</option>
            <option value="Minna to Abuja">Minna to Abuja</option>
            <option value="Abuja to Lokoja">Abuja to Lokoja</option>
          </select>
        </div>
        <div className="el">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="el">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p className="flex items-center gap-[1rem]">
            <input
              type="checkbox"
              id="alerts"
              checked={formData.alerts}
              onChange={handleChange}
            />
            <label htmlFor="alerts">Subscribe to Safety Alerts (SMS)</label>
          </p>
          <p className="flex items-center gap-[1rem]">
            <input
              type="checkbox"
              id="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
            />
            <label htmlFor="terms">Agree to Terms of Service</label>
          </p>
        </div>
        <img
          src={gradient}
          alt="gradient"
          className="absolute right-[-15rem] top-[20rem] -z-10"
        />
        <div className="w-full">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white border border-transparent font-semibold text-center text-xl p-5 hover:border-blue-600 hover:bg-transparent hover:text-blue-600 duration-500"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
