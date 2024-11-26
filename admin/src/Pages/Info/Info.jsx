import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

// About Component
const Info = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token == null) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(token)
    }
  }, []);
  
  if (isAuthenticated === null) {
    // Optionally, show a loading spinner or wait until the token is checked
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="bg-transparent p-8 rounded-xl">
      {/* About Header */}
      <h1 className="text-3xl font-semibold text-white mb-6">About Our Platform</h1>

      {/* Mission Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white">Our Mission</h2>
        <p className="text-gray-400">
          Our platform is dedicated to providing seamless and efficient solutions for transport management, bringing transparency,
          reliability, and convenience to both transporters and customers. We aim to simplify the logistics industry with cutting-edge
          technology, ensuring a smooth and cost-effective experience for everyone involved.
        </p>
      </div>

      {/* Features Section */}
      <div className="space-y-6 mt-8">
        <h2 className="text-xl font-semibold text-white">Key Features</h2>
        <ul className="list-disc pl-6 text-gray-400 space-y-3">
          <li>Real-time vehicle tracking and monitoring</li>
          <li>Instant notifications and alerts for transport updates</li>
          <li>User-friendly transporter registration and management</li>
          <li>Efficient route planning and time estimation</li>
          <li>Secure payment and reward system integration</li>
        </ul>
      </div>

      {/* Vision Section */}
      <div className="space-y-6 mt-8">
        <h2 className="text-xl font-semibold text-white">Our Vision</h2>
        <p className="text-gray-400">
          We envision a world where logistics and transportation are made easier through innovative technology, fostering a more
          sustainable and efficient future. Our goal is to become a leading platform in the transport sector, connecting customers
          and transporters through an intuitive and reliable service.
        </p>
      </div>

      {/* Contact Info Section */}
      <div className="space-y-6 mt-8">
        <h2 className="text-xl font-semibold text-white">Contact Us</h2>
        <p className="text-gray-400">
          Have any questions or need assistance? Feel free to reach out to us:
        </p>
        <ul className="text-gray-400">
          <li>Email: support@ourplatform.com</li>
          <li>Phone: +1 (123) 456-7890</li>
        </ul>
      </div>
    </div>
  );
};

export default Info;
