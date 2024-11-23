import mongoose from 'mongoose';
import { envs } from './envs';

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(envs.MONGODB_URI);
    const url = `${connection.host}:${connection.port}`;
    console.log(`MongoDB connected: ${url}`);
  } catch (error) {
    console.log('MongoDB connection error:', error.message);
    process.exit(1);
  }
};
