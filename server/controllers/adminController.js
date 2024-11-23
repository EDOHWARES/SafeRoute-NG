import AfricasTalking from "africastalking";
// import africastalking from 'africastalking';
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
import AdminModel from "../models/AdminModel.js";

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;

// @desc Login an admin
// @POST /api/admin/login
export const loginAdmin = async (req, res) => {
  const { name, password } = req.body;

  try {
    // Check if admin exists
    const admin = await AdminModel.findOne({ name });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Invalid username",
      });
    }

    //Compare passwords
    const isPasswordValid = await bcryptjs.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      id: admin._id,
      name: admin.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc Get admin profile
// @route GET /api/admin/profile
// @access Private
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await AdminModel.findById(req.user.id).select("-password");
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Initialize Africa's Talking
const africastalking = AfricasTalking({
  apiKey: process.env.AFRICASTALKING_API_KEY,
  username: "sandbox",
});

// @desc Send SMS
// @route GET /api/admin/send-sms
// @access PRIVATE
export const sendSMS = async (req, res) => {
  const { numbers, message } = req.body;
  if (!numbers || numbers.length === 0) {
    return res.json({
      success: false,
      message: "Recipient numbers are required",
    });
  }
  if (!message) {
    return res.json({
      success: false,
      message: "Message content is required",
    });
  }

  // Modify numbers to ensure they are in the correct international format
  const validNumbers = numbers
    .map((num) => {
      // If the number starts with '0', it's a local Nigerian number. Prepend '+234'.
      if (num.startsWith("0")) {
        return "+234" + num.substring(1); // Convert to Nigerian international format
      }
      // If the number already starts with '+', it's assumed to be in correct format
      return num;
    })
    .filter((num) => /^[\+]?[0-9]{10,15}$/.test(num)); // Ensure it's a valid number format

  if (validNumbers.length === 0) {
    return res.json({
      success: false,
      message: "No valid phone numbers provided.",
    });
  }

  try {
    const result = await africastalking.SMS.send({
      to: validNumbers,
      message: message,
      from: "86797",
    });
    res.json({
      success: true,
      message: "SMS sent successfully",
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Initialize Africa's Talking Airtime Function
const credentials = {
  apiKey:
    "atsk_3da9195408327908d647eff565a14073fbf0f357187ecbfe434feea4b103488d3ebfbd2b",
  username: "sandbox",
};

// @desc Send Airtime
// @route GET /api/admin/send-airtime
// @access PRIVATE
export const sendAirtime = async (req, res) => {
  try {
    const { numbers, amount } = req.body;

    // Validate input
    if (!Array.isArray(numbers) || numbers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Phone numbers must be provided as an array.",
      });
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "A valid airtime amount must be provided.",
      });
    }

    // Modify numbers to ensure they are in the correct international format
    const validNumbers = numbers
      .map((num) => {
        // Convert local Nigerian numbers to international format
        if (num.startsWith("0")) {
          return "+234" + num.substring(1); // Replace leading '0' with '+234'
        }
        // Return numbers that already have a '+' or are assumed valid
        return num;
      })
      .filter((num) => /^[\+]?[0-9]{10,15}$/.test(num)); // Validate number format

    if (validNumbers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid phone numbers provided.",
      });
    }

    // Africa's Talking credentials setup
    const credentials = {
      apiKey: process.env.AFRICASTALKING_API_KEY,
      username: "sandbox",
    };
    const AfricasTalkingClient = AfricasTalking(credentials);
    const airtime = AfricasTalkingClient.AIRTIME;

    // Airtime options
    const options = {
      recipients: validNumbers.map((phoneNumber) => ({
        phoneNumber,
        currencyCode: "NGN",
        amount: parseFloat(amount).toFixed(2), // Ensure amount is a valid number
      })),
    };

    // Send airtime
    const response = await airtime.send(options);

    // Handle successful response
    return res.status(200).json({
      success: true,
      message: "Airtime sent successfully.",
      data: response,
    });
  } catch (error) {
    // Log and handle error
    console.error("Error sending airtime:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to send airtime.",
      error: error.message,
    });
  }
};

