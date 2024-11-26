import React, { useEffect } from "react";
import L from "leaflet"; 

// Import Leaflet CSS
import "leaflet/dist/leaflet.css";

const Map = () => {

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Initialize the map
    const map = L.map("map").setView([9.0765, 7.3986], 12); // Abuja coordinates

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Fetch road conditions from the backend
    async function fetchConditions() {
      try {
        const response = await fetch(`${apiUrl}/road/conditions`);
        const conditions = await response.json();

        // Add markers for each road condition
        conditions.forEach((condition) => {
          const marker = L.marker([condition.location.lat, condition.location.lng]).addTo(map);

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
    }

    // Load road conditions
    fetchConditions();

    // Cleanup function to remove the map when the component is unmounted
    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: "100vh", width: "100%" }}></div>;
};

export default Map;
