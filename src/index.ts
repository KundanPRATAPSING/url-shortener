import express, { Application, Request, Response } from "express";
import urlRoute from "./routes/url";
import { connectToMongoDB } from "./connect";

const app: Application = express();
const PORT: number = 8001;

// Middleware
app.use(express.json());

// Routes
app.use("/url", urlRoute);

// Database Connection & Server Start
connectToMongoDB("mongodb://localhost:27017/url-shortener")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err: Error) => {
        console.error("Failed to connect to MongoDB", err);
    });

export default app; // Export for testing purposes