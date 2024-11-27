import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    phoneNumber: {type: String},
    feedbackType: {type: String},
    details: {type: String},
    createdAt: { type: Date, default: Date.now }
});

const feedbackModel = mongoose.model('feedback', feedbackSchema);
export default feedbackModel;