import mongoose from "mongoose";

const TransporterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    vehicleType: { type: String, required: true },
    vehicleRegistrationNumber: { type: String, required: true, unique: true },
    primaryOperatingArea: { type: String, required: true },
    driversLicenseNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscribeToSafetyAlerts: { type: Boolean, default: false },
    agreeToTermsOfService: { type: Boolean, required: true },
}, { timestamps: true });

const TransporterModel = mongoose.model('Transporter', TransporterSchema);

export default TransporterModel;
