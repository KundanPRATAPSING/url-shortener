import mongoose from "mongoose";

export async function connectToMongoDB(url: string) {
    
    return await mongoose.connect(url);
}
