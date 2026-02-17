import { Request, Response } from 'express';
import shortid from "shortid";
import URL from "../models/url";

// Service: create a short URL and return the generated id (no res handling)
export async function createShortUrl(originalUrl: string): Promise<string> {
    const generatedId = typeof shortid.generate === 'function' ? shortid.generate() : shortid();

    await URL.create({
        shortId: generatedId,
        redirectUrl: originalUrl,
        visitHistory: [],
    });

    return generatedId;
}

// Express handler: calls the service and sends the HTTP response
export async function handleGenerateShortUrl(req: Request, res: Response) {
    try {
        const body = req.body;

        if (!body || !body.url) {
            return res.status(400).json({ error: "url is required" });
        }

        const generatedId = await createShortUrl(body.url);

        return res.json({ id: generatedId });
    } catch (err) {
        console.error('Error generating short url', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
