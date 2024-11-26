import mongoose from "mongoose";

const TransporterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    vehicleType: { type: String, required: true },
    vehicleRegistrationNumber: { type: String, required: true, unique: true },
    primaryOperatingArea: { type: String, required: true },
    driversLicenseNumber: { type: String, required: true, unique: true },
    path: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscribeToSafetyAlerts: { type: Boolean, default: false },
    agreeToTermsOfService: { type: Boolean, required: true },
    messagesReceived: {
      type: [
        {
          message: { type: String, default: "None" },
          receivedAt: { type: Date, default: Date.now },
        },
      ],
      default: [
        {
          message: "None",
          receivedAt: Date.now(),
        },
      ],
    },
    airtimesReceived: {
      type: [
        {
          amount: { type: Number, default: 0 }, // Default amount is 0 Naira
          receivedAt: { type: Date, default: Date.now },
        },
      ],
      default: [
        {
          amount: 0,
          receivedAt: Date.now(),
        },
      ],
    },
  },
  { timestamps: true }
);

const TransporterModel = mongoose.model("Transporter", TransporterSchema);

export default TransporterModel;
