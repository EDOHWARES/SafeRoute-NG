import React, { useState, useEffect } from "react";
import axios from "axios";

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
      console.log(response); // Log to ensure you're getting the expected response
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
        User Profile
      </h2>
      <div className="flex flex-col space-y-6">
        {/* Name */}
        <div className="flex justify-between text-lg font-semibold text-gray-900">
          <span>Name:</span>
          <span>{profileData.name}</span>
        </div>

        {/* Phone */}
        <div className="flex justify-between text-lg font-semibold text-gray-900">
          <span>Phone:</span>
          <span>{profileData.phone}</span>
        </div>

        {/* Email */}
        <div className="flex justify-between text-lg font-semibold text-gray-900">
          <span>Email:</span>
          <span>{profileData.email}</span>
        </div>

        {/* Vehicle Type */}
        <div className="flex justify-between text-lg font-semibold text-gray-900">
          <span>Vehicle Type:</span>
          <span>{profileData.vehicleType}</span>
        </div>

        {/* Vehicle Registration Number */}
        <div className="flex justify-between text-lg font-semibold text-gray-900">
          <span>Vehicle Reg. No:</span>
          <span>{profileData.vehicleRegistrationNumber}</span>
        </div>

        {/* Primary Operating Area */}
        <div className="flex justify-between text-lg font-semibold text-gray-900">
          <span>Primary Operating Area:</span>
          <span>{profileData.primaryOperatingArea}</span>
        </div>

        {/* Driver's License Number */}
        <div className="flex justify-between text-lg font-semibold text-gray-900">
          <span>Driver's License No:</span>
          <span>{profileData.driversLicenseNumber}</span>
        </div>

        {/* Path */}
        <div className="flex justify-between text-lg font-semibold text-gray-900">
          <span>Path:</span>
          <span>{profileData.path}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
