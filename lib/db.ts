import mongoose from 'mongoose';

export  const connectDB = async () => {
    try {
        const dbUrl = process.env.URL;
        if (!dbUrl) {
            throw new Error('MongoDB connection URL is not defined');
        }
        await mongoose.connect(dbUrl);
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); 
    }
};



