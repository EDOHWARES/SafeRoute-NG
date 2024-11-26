import RoadConditionModel from "../models/RoadCondition.js";
import { initialData, conditions } from "../config/data.js";

// Fetch all road conditions
export const fetchAllRoadConditions = async (req, res) => {
  try {
    const conditions = await RoadConditionModel.find();
    res.json(conditions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new road condition
export const addRoadCondition = async (req, res) => {
    const { roadName, location, condition, severity } = req.body;

  try {
    const newCondition = new RoadConditionModel({
      roadName,
      location,
      condition,
      severity,
    });
    await newCondition.save();
    res.status(201).json(newCondition);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

  // Function to insert initial data
export const insertInitialData = async (req, res) => {
    try {
        await RoadConditionModel.deleteMany(); // Clear existing data
        await RoadConditionModel.insertMany(initialData);
        return res.json({
            success: true,
            message: 'Successfully inserted'
        })
      } catch (err) {
        return res.json({
            success: false,
            message: 'Server Error',
            error: err.message,
        })
      }
};

// Function to update data dynamically
export const updateRoadConditions = async (req, res) => {
    try {
        const roads = await RoadConditionModel.find(); // Fetch all roads
    
        for (const road of roads) {
          // Randomly pick a new condition
          const newCondition = conditions[Math.floor(Math.random() * conditions.length)];
          road.condition = newCondition.condition;
          road.severity = newCondition.severity;
          road.lastUpdated = new Date();
          await road.save(); // Save the updated road condition
        }
    
        console.log("Road conditions updated dynamically at", new Date());
      } catch (err) {
        console.error("Error updating road conditions:", err);
      }
};
