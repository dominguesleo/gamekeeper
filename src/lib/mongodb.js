"use server"
import mongoose from 'mongoose';

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return;
    }
    await mongoose.connect('mongodb://localhost:27017/gamekeeper');
};

export { connectDB };