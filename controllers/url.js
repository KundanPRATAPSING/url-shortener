const shortid = require('shortid'); 
const URL = require('../models/url');

async function handleGenerateShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });

    const generatedId = shortid(); 

    await URL.create({
        shortId: generatedId,
        redirectUrl: body.url,
        visitHistory: []
    });

    return res.json({ id: generatedId });
}

module.exports = {
    handleGenerateShortUrl, 
};