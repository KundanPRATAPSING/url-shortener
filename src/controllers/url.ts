import { Request, Response } from "express";
import {
    createShortUrl as svcCreateShortUrl,
    getAnalytics as svcGetAnalytics,
} from "../services/urlService";

// Express handler: calls the service and sends the HTTP response
export async function handleGenerateShortUrl(req: Request, res: Response) {
    try {
        const body = req.body;

        if (!body || !body.url) {
            return res.status(400).json({ error: "url is required" });
        }

        const generatedId = await svcCreateShortUrl(body.url);

        return res.json({ id: generatedId });
    } catch (err) {
        console.error("Error generating short url", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Analytics handler: returns click count and visit history
export async function handleGetAnalytics(req: Request, res: Response) {
    try {
        const shortId = String(req.params.shortId);
        const result = await svcGetAnalytics(shortId);
        if (!result)
            return res.status(404).json({ error: "Short URL not found" });
        return res.json(result);
    } catch (err) {
        console.error("Error fetching analytics", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}
