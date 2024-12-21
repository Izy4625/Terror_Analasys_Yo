import mongoose from 'mongoose';
import { AttackModel } from '../models/attackModle';
import { createSeed } from './seed';
const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://yisroelgold3:KDl5gerHaHl1DowG@izyg.7q5uv.mongodb.net/globalterrorist123" );
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        const attacks = await AttackModel.findOne({});
        if(!attacks){
            await createSeed();
            console.log('[Settings] seed created')
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;
