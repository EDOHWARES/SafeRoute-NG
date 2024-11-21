import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();
import AdminModel from '../models/AdminModel.js';
import connectDB from './db.js';

const seedAdmins = async () => {
  const password = 'magic-wand-XXX';
  const salt = bcryptjs.genSaltSync(10);
  const hashedPassword = bcryptjs.hashSync(password, salt);

  const admins = [
    {
      name: 'Adeniran Ayomide',
      password: hashedPassword,
    },
    {
      name: 'Edoh Emmanuel',
      password: hashedPassword,
    },
  ];

  try {
    // Insert the admins into the DB
    await AdminModel.insertMany(admins);
    console.log('Admins have been added to the database');
  } catch (error) {
    console.error('Error inserting admins', error);
  }
};

const runAdminSeed = async () => {
  await connectDB();
  await seedAdmins();
  mongoose.connection.close();
};

export default runAdminSeed;
