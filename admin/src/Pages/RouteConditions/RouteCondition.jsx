import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Conditions from "./Conditions";

const RouteCondition = () => {

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Initialize the map
    const map = L.map("map").setView([9.0765, 7.3986], 12); // Abuja coordinates

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Define a custom blue icon
    const blueIcon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png", // Example blue icon URL
      iconSize: [30, 40], // Size of the icon
      iconAnchor: [15, 40], // Point of the icon that is anchored to the marker's location
      popupAnchor: [0, -40], // Point where the popup opens relative to the icon anchor
    });

    // Fetch road conditions from the backend
    const fetchConditions = async () => {
      try {
        const response = await fetch(`${apiUrl}/road/conditions`);
        const conditions = await response.json();

        // Add markers for each road condition
        conditions.forEach((condition) => {
          const marker = L.marker([condition.location.lat, condition.location.lng], { icon: blueIcon }).addTo(map);

          // Create popup content
          const popupContent = `
            <div class="info-popup">
              <h3>${condition.roadName}</h3>
              <p><strong>Condition:</strong> ${condition.condition}</p>
              <p><strong>Severity:</strong> ${condition.severity}</p>
              <p><small>Last Updated: ${new Date(condition.lastUpdated).toLocaleString()}</small></p>
            </div>
          `;

          // Attach the popup to the marker
          marker.bindPopup(popupContent);
        });
      } catch (error) {
        console.error("Failed to fetch road conditions:", error);
      }
    };

    // Load road conditions
    fetchConditions();

    // Cleanup function to remove the map instance on component unmount
    return () => {
      map.remove();
    };
  }, []);

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold text-white mb-8 -mt-8">
        Real-time Route Conditions
      </h1>
      <div id="map" style={{ height: "100vh", width: "100%" }}></div>
      <div>
        <Conditions />
      </div>
    </section>
  );
};

export default RouteCondition;

