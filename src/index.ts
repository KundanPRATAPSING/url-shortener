import express, { Application } from "express";
import urlRouter from "./routes/url";
import { connectToMongoDB } from "./connect";

const app: Application = express();
const PORT: number = 8001;

// Middleware
app.use(express.json());

// Routes
app.use("/url", urlRouter);

// Database Connection & Server Start — use async/await for clarity
async function startServer() {
    try {
        await connectToMongoDB("mongodb://localhost:27017/url-shortener");
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    }
}

startServer();

export default app; // Export for testing purposes
