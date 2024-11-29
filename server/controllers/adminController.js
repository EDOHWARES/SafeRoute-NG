import AfricasTalking from "africastalking";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
import AdminModel from "../models/AdminModel.js";
import TransporterModel from "../models/TransporterModel.js";
import feedbackModel from "../models/FeedbackModel.js";

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
  const { selectedPath, message } = req.body;
  console.log(selectedPath, message)

  if (!selectedPath) {
    return res.json({
      success: false,
      message: "Path is required.",
    });
  }

  if (!message) {
    return res.json({
      success: false,
      message: "Message content is required.",
    });
  }

  try {
    // Fetch transporters with the selected path
    const transporters = await TransporterModel.find({ path: selectedPath });

    if (!transporters || transporters.length === 0) {
      return res.json({
        success: false,
        message: "No transporters found for the selected path.",
      });
    }

    // Extract phone numbers of transporters
    const numbers = transporters.map((transporter) => transporter.phone);

    // Format numbers to ensure they are in the correct international format
    const validNumbers = numbers
      .map((num) => {
        if (num.startsWith("0")) {
          return "+234" + num.substring(1); // Convert to Nigerian international format
        }
        return num; // Assume already in international format
      })
      .filter((num) => /^[\+]?[0-9]{10,15}$/.test(num)); // Validate the number format

    if (validNumbers.length === 0) {
      return res.json({
        success: false,
        message: "No valid phone numbers provided.",
      });
    }

    // Send the SMS via Africa's Talking
    const result = await africastalking.SMS.send({
      to: validNumbers,
      message: message,
      from: "86797",
    });

    // Update each transporter in the database
    const updatePromises = validNumbers.map(async (phone) => {
      // Convert international format back to local for database lookup
      const localPhone = phone.startsWith("+234")
        ? "0" + phone.substring(4)
        : phone;

      await TransporterModel.findOneAndUpdate(
        { phone: localPhone },
        {
          $push: {
            messagesReceived: { message, receivedAt: new Date() },
          },
        }
      );
    });

    await Promise.all(updatePromises); // Ensure all updates are completed

    res.json({
      success: true,
      message: "SMS sent successfully, and transporters updated.",
      result,
    });
  } catch (error) {
    console.error("Error sending SMS or updating database:", error.message);
    res.json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


// @desc Send Airtime
// @route POST /api/admin/send-airtime
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
      username: "sandbox", // Replace with actual username if needed
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

    // Save airtime details to each transporter
    for (let phoneNumber of numbers) { // Use the original local numbers
      const transporter = await TransporterModel.findOne({ phone: phoneNumber });

      if (transporter) {
        transporter.airtimesReceived.push({
          amount: parseFloat(amount),
          receivedAt: new Date(),
        });

        await transporter.save(); // Save the updated transporter record
      }
    }

    // Handle successful response
    return res.status(200).json({
      success: true,
      message: "Airtime sent successfully and recorded.",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send airtime.",
      error: error.message,
    });
  }
};



// @desc Get Registered Transporters
// @route GET /api/admin/get-transporters
// @access PRIVATE
export const getRegisteredTransporters = async (req, res) => {
    try {
        // Fetch all transporters from the database
        const transporters = await TransporterModel.find();
    
        // Return the list of transporters as a response
        res.status(200).json({
          success: true,
          message: 'List of registered transporters fetched successfully.',
          data: transporters,
        });
      } catch (error) {
        // Handle errors and send an error response
        console.error('Error fetching transporters:', error.message);
        res.status(500).json({
          success: false,
          message: 'An error occurred while fetching transporters.',
          error: error.message,
        });
      }
    
};


// @Desc Controller to fetch all feedbacks from the database
// @Route GET /api/admin/getFeedbacks
export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await feedbackModel.find();

    // If there are no feedbacks
    if (!feedbacks || feedbacks.length === 0) {
      return res.status(404).json({ message: "No feedbacks found." });
    }

    return res.status(200).json({
      message: "Feedbacks fetched successfully",
      data: feedbacks,
    });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
