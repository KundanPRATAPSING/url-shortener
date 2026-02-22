import mongoose from "mongoose";

export async function connectToMongoDB(url: string) {
    // await so connection errors are thrown here
    return await mongoose.connect(url);
}
