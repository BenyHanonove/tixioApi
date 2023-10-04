import mongoose from "mongoose";
import { config } from "dotenv";

config();

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<typeof mongoose> => {
            try {
                await mongoose.connect(process.env.MONGO);
                console.log('MongoDB connected successfully');
                return mongoose;
            } catch (error) {
                console.error('Error connecting to MongoDB:', error);
                throw error;
            }
        }
    },
];