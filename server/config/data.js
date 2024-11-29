// Initial detailed data

export const initialData = [
  // Lagos to Ibadan
  {
    roadName: "Lagos to Magboro",
    location: { lat: 6.6299, lng: 3.4267 },
    condition: "Traffic Jam",
    severity: "High",
    details: "Heavily congested, especially during peak hours.",
  },
  {
    roadName: "Magboro to Ibafo",
    location: { lat: 6.7025, lng: 3.3401 },
    condition: "Smooth Traffic",
    severity: "Low",
    details: "Flowing traffic, but expect occasional potholes.",
  },
  {
    roadName: "Ibafo to Mowe",
    location: { lat: 6.9407, lng: 3.3586 },
    condition: "Under Repair",
    severity: "Moderate",
    details: "Multiple road repairs causing temporary slowdowns.",
  },
  {
    roadName: "Mowe to Ijebu-Ode",
    location: { lat: 6.8743, lng: 3.8699 },
    condition: "Potholes",
    severity: "Moderate",
    details: "Frequent potholes, causing discomfort for drivers.",
  },
  {
    roadName: "Ijebu-Ode to Ijebu-Igbo",
    location: { lat: 6.8641, lng: 4.0559 },
    condition: "Accident",
    severity: "High",
    details: "Recent accidents in the area, proceed with caution.",
  },
  {
    roadName: "Ibadan to Iwo Road",
    location: { lat: 7.3752, lng: 3.9078 },
    condition: "Congestion",
    severity: "High",
    details: "Heavy traffic congestion during rush hours.",
  },

  // Ibadan to Ilorin
  {
    roadName: "Ibadan to Oyo",
    location: { lat: 7.8768, lng: 4.2639 },
    condition: "Flood-prone",
    severity: "Severe",
    details: "Flooded sections after heavy rain, risk of road closure.",
  },
  {
    roadName: "Oyo to Ogbomoso",
    location: { lat: 8.0876, lng: 4.2356 },
    condition: "Smooth Traffic",
    severity: "Low",
    details: "Clear and smooth road with very little congestion.",
  },
  {
    roadName: "Ogbomoso to Ilorin",
    location: { lat: 8.5206, lng: 4.6916 },
    condition: "Potholes",
    severity: "Moderate",
    details: "Multiple potholes, driving cautiously is recommended.",
  },
  {
    roadName: "Ilorin to Tanke",
    location: { lat: 8.5184, lng: 4.5906 },
    condition: "Traffic Jam",
    severity: "High",
    details: "Congestion in the area due to construction work.",
  },

  // Ilorin to Jebba
  {
    roadName: "Ilorin to Oke-Ose",
    location: { lat: 8.4802, lng: 4.6013 },
    condition: "Flood-prone",
    severity: "Severe",
    details: "Road is frequently flooded during the rainy season.",
  },
  {
    roadName: "Oke-Ose to Jebba",
    location: { lat: 9.1725, lng: 4.9299 },
    condition: "Under Repair",
    severity: "Moderate",
    details: "Continuous road work; slow traffic is expected.",
  },
  {
    roadName: "Jebba to Mokwa",
    location: { lat: 9.6836, lng: 5.0629 },
    condition: "Smooth Traffic",
    severity: "Low",
    details: "A generally good road; few vehicles on this route.",
  },

  // Jebba to Minna
  {
    roadName: "Mokwa to Kainji",
    location: { lat: 9.7867, lng: 5.2701 },
    condition: "Congestion",
    severity: "High",
    details: "Frequent vehicle buildup in the mornings.",
  },
  {
    roadName: "Kainji Dam to Minna",
    location: { lat: 9.5253, lng: 5.5762 },
    condition: "Accident",
    severity: "High",
    details: "Recent accidents in this section; drive cautiously.",
  },

  // Minna to Abuja
  {
    roadName: "Minna to Suleja",
    location: { lat: 9.5439, lng: 6.4285 },
    condition: "Heavy Traffic",
    severity: "High",
    details: "Heavy traffic build-up near Suleja.",
  },
  {
    roadName: "Suleja to Zuba",
    location: { lat: 9.0691, lng: 7.0814 },
    condition: "Potholes",
    severity: "Moderate",
    details: "Multiple potholes after recent rains.",
  },
  {
    roadName: "Zuba to Gwagwalada",
    location: { lat: 8.9465, lng: 7.1574 },
    condition: "Flood-prone",
    severity: "Severe",
    details: "Risk of flooding during heavy rains.",
  },

  // Abuja to Lokoja
  {
    roadName: "Abuja to Kwali",
    location: { lat: 8.8901, lng: 7.0633 },
    condition: "Congestion",
    severity: "Moderate",
    details: "Traffic congestion due to construction activities.",
  },
  {
    roadName: "Kwali to Koton Karfe",
    location: { lat: 8.1516, lng: 6.7487 },
    condition: "Smooth Traffic",
    severity: "Low",
    details: "Well-maintained road with no significant issues.",
  },
  {
    roadName: "Koton Karfe to Lokoja",
    location: { lat: 7.8013, lng: 6.7480 },
    condition: "Heavy Traffic",
    severity: "High",
    details: "Traffic congestion during rush hours.",
  },

  // Lagos to Kaduna
  {
    roadName: "Lagos to Ijebu-Ode",
    location: { lat: 6.8689, lng: 3.8807 },
    condition: "Congestion",
    severity: "High",
    details: "Heavy traffic due to local markets and construction work.",
  },
  {
    roadName: "Ijebu-Ode to Abeokuta",
    location: { lat: 7.1507, lng: 3.3541 },
    condition: "Under Repair",
    severity: "Moderate",
    details: "Frequent repairs along this road; slow down.",
  },
  {
    roadName: "Abeokuta to Ibadan",
    location: { lat: 7.3783, lng: 3.9331 },
    condition: "Accident-prone",
    severity: "High",
    details: "Recent accidents make this road dangerous.",
  },

  // Kano to Abuja
  {
    roadName: "Kano to Zaria",
    location: { lat: 11.0661, lng: 7.7111 },
    condition: "Smooth Traffic",
    severity: "Low",
    details: "A relatively smooth road with minimal disruptions.",
  },
  {
    roadName: "Zaria to Kaduna",
    location: { lat: 10.4665, lng: 7.5062 },
    condition: "Potholes",
    severity: "Moderate",
    details: "Potholed sections causing bumpy rides.",
  },
  {
    roadName: "Kaduna to Kachia",
    location: { lat: 10.0083, lng: 7.2095 },
    condition: "Congested",
    severity: "Moderate",
    details: "Congestion in this route due to local markets.",
  },
  {
    roadName: "Kachia to Abuja",
    location: { lat: 9.1882, lng: 7.3003 },
    condition: "Under Repair",
    severity: "Moderate",
    details: "Ongoing repairs; temporary diversions in place.",
  },
  {
    roadName: "Abuja to Gwagwalada",
    location: { lat: 8.9927, lng: 7.2056 },
    condition: "Accident-prone",
    severity: "High",
    details: "Accidents are common in this section; proceed with caution.",
  },
];
  
// Possible conditions for updates
export const conditions = [
  { condition: "Smooth Traffic", severity: "Low" },
  { condition: "Traffic Jam", severity: "High" },
  { condition: "Potholes", severity: "Moderate" },
  { condition: "Flooded Road", severity: "Severe" },
  { condition: "Under Repair", severity: "Moderate" },
  { condition: "Accident", severity: "High" },
  { condition: "Road Construction", severity: "Moderate" },
  { condition: "Speed Bumps", severity: "Low" },
  { condition: "Congestion near Market", severity: "High" },
  { condition: "Blocked Road", severity: "Severe" },
  { condition: "Slippery Road", severity: "Moderate" },
  { condition: "Fallen Tree", severity: "Moderate" },
  { condition: "Checkpoint Delays", severity: "Moderate" },
  { condition: "Animal Crossing", severity: "Low" },
  { condition: "Landslide", severity: "Severe" },
  { condition: "Bridge Out", severity: "Severe" },
  { condition: "Wrong-Way Driving", severity: "High" },
  { condition: "Low Visibility (Fog)", severity: "High" },
  { condition: "Debris on Road", severity: "Moderate" },
  { condition: "Overloaded Vehicles", severity: "Moderate" },
  { condition: "Vehicle Breakdown", severity: "Moderate" },
  { condition: "Fuel Shortage", severity: "High" },
  { condition: "Construction Equipment on Road", severity: "Moderate" },
  { condition: "Narrow Road", severity: "Moderate" },
];

