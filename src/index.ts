import express, { Application, Request, Response } from "express";
import urlRouter from "./routes/url";
import { connectToMongoDB } from "./connect";

const app: Application = express();
const PORT: number = 8001;

// Middleware
app.use(express.json());

// Routes
app.use("/url", urlRouter);

import { recordVisit } from './services/urlService';

app.get('/:shortId', async (req: Request, res: Response) => {
    const shortId = String(req.params.shortId);

    // Delegate DB logic to service layer
    const entry = await recordVisit(shortId);

    if (!entry) {
        return res.status(404).json({ error: 'Short URL not found' });
    }

    // Return redirect target instead of performing an HTTP redirect (API contract)
    return res.json({ shortId: entry.shortId, redirectTo: entry.redirectUrl });
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

startServer().catch(err => {
    console.error('Failed to start server', err);
    process.exit(1);
});

export default app;