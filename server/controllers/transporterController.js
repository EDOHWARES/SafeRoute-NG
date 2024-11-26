import TransporterModel from "../models/TransporterModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// @desc Register a new transporter
// @route POST /api/transporter/register
// @access public
export const registerTransporter = async (req, res) => {
  try {
    const {
      name,
      phone,
      vehicleType,
      vehicleRegistrationNumber,
      primaryOperatingArea,
      driversLicenseNumber,
      path,
      email,
      password,
      subscribeToSafetyAlerts,
      agreeToTermsOfService,
    } = req.body;

    // Check if email or phone already exists
    const existingTransporter = await TransporterModel.findOne({
      $or: [
        { email },
        { phone },
        { vehicleRegistrationNumber },
        { driversLicenseNumber },
      ],
    });
    if (existingTransporter) {
      return res.status(400).json({
        success: false,
        message: "One of these credentials already exists, edit it.",
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
      path,
      email,
      password: hashedPassword,
      subscribeToSafetyAlerts,
      agreeToTermsOfService,
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

// @desc Login transporter
// @route POST /api/transporter/login
// @access public
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


// @desc fetch transporter profile
// @route GET /api/transporter/profile
// @access public
export const fetchTransporterProfile = async (req, res) => {
  // Extract the token from the Authorization header (Bearer token)
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided, authentication failed.",
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the transporter using the user ID from the decoded token
    const transporter = await TransporterModel.findById(decoded.id);

    if (!transporter) {
      return res.status(404).json({
        success: false,
        message: "Transporter not found",
      });
    }

    // Return the transporter profile
    res.status(200).json({
      success: true,
      data: transporter,
    });
  } catch (error) {
    console.error("Error fetching transporter profile:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
