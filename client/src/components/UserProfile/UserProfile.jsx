import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

// Profile Component
const UserProfile = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch the transporter profile
  const fetchProfile = async () => {
    const token = localStorage.getItem("transporterToken");

    if (!token) {
      setError("No token provided, authentication failed.");
      setLoading(false);
      console.log("Token is missing");
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}/transporter/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileData(response.data.data); // Set the profile data from the response
      setLoading(false);
    } catch (err) {
      console.error(err); // Log any error details for debugging
      setError("Error fetching profile. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (error) {
    return <div>{error}</div>;
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
    <div className=" p-8 rounded-xl max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
        User Profile
      </h2>
      <div className="flex flex-col space-y-6 text-center">
        {/* Name */}
        <div className="flex justify-between text-lg font-semibold text-gray-900 border p-2">
          <span>Name:</span>
          <span className="font-medium">{profileData.name}</span>
        </div>

        {/* Phone */}
        <div className="flex justify-between text-lg font-semibold text-gray-900 border p-2">
          <span>Phone:</span>
          <span className="font-medium">{profileData.phone}</span>
        </div>

        {/* Email */}
        <div className="flex justify-between text-lg font-semibold text-gray-900 border p-2">
          <span>Email:</span>
          <span className="font-medium">{profileData.email}</span>
        </div>

        {/* Vehicle Type */}
        <div className="flex justify-between text-lg font-semibold text-gray-900 border p-2">
          <span>Vehicle Type:</span>
          <span className="font-medium">{profileData.vehicleType}</span>
        </div>

        {/* Vehicle Registration Number */}
        <div className="flex justify-between text-lg font-semibold text-gray-900 border p-2">
          <span>Vehicle Reg. No:</span>
          <span className="font-medium">{profileData.vehicleRegistrationNumber}</span>
        </div>

        {/* Primary Operating Area */}
        <div className="flex justify-between text-lg font-semibold text-gray-900 border p-2">
          <span>Primary Operating Area:</span>
          <span className="font-medium">{profileData.primaryOperatingArea}</span>
        </div>

        {/* Driver's License Number */}
        <div className="flex justify-between text-lg font-semibold text-gray-900 border p-2">
          <span>Driver's License No:</span>
          <span className="font-medium">{profileData.driversLicenseNumber}</span>
        </div>

        {/* Path */}
        <div className="flex justify-between text-lg font-semibold text-gray-900 border p-2">
          <span>Most Frequent Path:</span>
          <span className="font-medium">{profileData.path}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
