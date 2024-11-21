import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();
import AdminModel from '../models/AdminModel.js';

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;

// @desc Login an admin
// @POST /api/admin/login
export const loginAdmin = async (req, res) => {
    const {name, password} = req.body;

    try {
        // Check if admin exists
        const admin = await AdminModel.findOne({name});
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Invalid username'
            })
        }

        //Compare passwords
        const isPasswordValid = await bcryptjs.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'Invalid password'
            })
        }

        // Generate JWT token
        const token = jwt.sign({id: admin._id}, JWT_SECRET, {expiresIn: '1d'});

        res.status(200).json({
            id: admin._id,
            name: admin.name,
            token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        })
    };
};

// @desc Get admin profile
// @route GET /api/admin/profile
// @access Private
export const getAdminProfile = async (req, res) => {
    try {
        const admin = await AdminModel.findById(req.user.id).select('-password');
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found',
            })
        }

        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        })
    };
}