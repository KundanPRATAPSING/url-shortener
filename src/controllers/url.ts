import { Request, Response } from "express";
import shortid from "shortid";
import URL from "../models/url";

export async function handleGenerateShortUrl(req: Request, res: Response) {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: "url is required" });
    }

    const generatedId = shortid();

    await URL.create({
        shortId: generatedId,
        redirectUrl: body.url,
        visitHistory: [],
    });

    return res.json({ id: generatedId });
}
