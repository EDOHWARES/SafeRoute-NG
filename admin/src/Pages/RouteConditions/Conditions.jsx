import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {formatDistanceToNow} from 'date-fns';

const Conditions = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

  const [roads, setRoads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/road/conditions`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch road data");
        }
        const data = await response.json();
        setRoads(data);
      } catch (error) {
        console.error("Error fetching road data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#276100" size={50} />
      </div>
    );
  }

  return (
    <div className="p-4">
      {roads.length > 0 ? (
        <ul className="space-y-4">
          {roads.map((road) => (
            <li
              key={road._id}
              className="p-4 border rounded-lg shadow-sm bg-[#1E2533]"
            >
              <h2 className="text-xl font-semibold">{road.roadName}</h2>
              <p>Condition: {road.condition}</p>
              <p>Severity: {road.severity}</p>
              <p>
                Last Updated:{" "}
                {formatDistanceToNow(new Date(road.lastUpdated))}
              </p>
              <p>
                Location: Lat {road.location.lat}, Lng {road.location.lng}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No road data available.</p>
      )}
    </div>
  );
};

export default Conditions;
