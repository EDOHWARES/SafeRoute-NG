import mongoose from "mongoose";

const RoadConditionSchema = new mongoose.Schema({
    roadName: {type: String},
    location: { lat: Number, lng: Number },
    condition: {type: String}, 
    severity: {type: String}, 
    lastUpdated: { type: Date, default: Date.now },
});

const RoadConditionModel = mongoose.model('RoadCondition', RoadConditionSchema);
export default RoadConditionModel;