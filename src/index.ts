import express, { Application, Request, Response } from "express";
import urlRouter from "./routes/url";
import { connectToMongoDB } from "./connect";
import URL from "./models/url"; // Make sure this matches your export in models/url.ts

const app: Application = express();
const PORT: number = 8001;

// Middleware
app.use(express.json());

// Routes
app.use("/url", urlRouter);

app.get('/:shortId', async (req: Request, res: Response): Promise<any> => {
    const shortId = req.params.shortId;
    
    // Find the entry and update the visit history
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { 
            $push: { 
                visitHistory: { timestamp: Date.now() } 
            } 
        }
    );

    // If no entry found, return 404
    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    // Redirect to the original URL
    res.redirect(entry.redirectUrl); // Changed 'redirectURL' to match your schema (likely 'redirectUrl' or 'redirectURL')
});

// Database Connection & Server Start
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

export default app;