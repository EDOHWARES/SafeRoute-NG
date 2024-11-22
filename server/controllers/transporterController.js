import TransporterModel from "../models/TransporterModel.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

// Register a new transporter
export const registerTransporter = async (req, res) => {
    try {
        const {
            name,
            phone,
            vehicleType,
            vehicleRegistrationNumber,
            primaryOperatingArea,
            driversLicenseNumber,
            email,
            password,
            subscribeToSafetyAlerts,
            agreeToTermsOfService
        } = req.body;

        // Check if email or phone already exists
        const existingTransporter = await TransporterModel.findOne({
            $or: [{ email }, { phone }],
        });
        if (existingTransporter) {
            return res.status(400).json({
                success: false,
                message: "Email or phone number already exists.",
            });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new transporter
        const newTransporter = new TransporterModel({
            name,
            phone,
            vehicleType,
            vehicleRegistrationNumber,
            primaryOperatingArea,
            driversLicenseNumber,
            email,
            password: hashedPassword,
            subscribeToSafetyAlerts,
            agreeToTermsOfService
        });

        // Save transporter to database
        await newTransporter.save();

        // Respond with success
        res.status(201).json({
            success: true,
            message: "Transporter registered successfully.",
            transporter: {
                id: newTransporter._id,
                name: newTransporter.name,
                email: newTransporter.email,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error. Could not register transporter.",
            error: error.message,
        });
    }
};


// Login transporter
export const loginTransporter = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if both email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both email and password.",
            });
        }

        // Check if transporter exists
        const transporter = await TransporterModel.findOne({ email });
        if (!transporter) {
            return res.status(404).json({
                success: false,
                message: "Transporter not found. Please register.",
            });
        }

        // Verify password
        const isMatch = await bcryptjs.compare(password, transporter.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials. Please try again.",
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: transporter._id, email: transporter.email },
            process.env.JWT_SECRET, // Ensure you set this in your .env file
            { expiresIn: "1d" } // Token valid for 1 day
        );

        // Respond with success and token
        res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            transporter: {
                id: transporter._id,
                name: transporter.name,
                email: transporter.email,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error. Could not log in.",
            error: error.message,
        });
    }
};

