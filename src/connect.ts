import mongoose from "mongoose";

export async function connectToMongoDB(url: string) {
    // explicitly await to surface connection errors here
    return await mongoose.connect(url);
}
