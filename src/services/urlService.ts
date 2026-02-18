import shortid from "shortid";
import URL from "../models/url";

export async function createShortUrl(originalUrl: string): Promise<string> {
  const generatedId = typeof shortid.generate === "function" ? shortid.generate() : shortid();

  await URL.create({
    shortId: generatedId,
    redirectUrl: originalUrl,
    visitHistory: [],
  });

  return generatedId;
}

export async function recordVisit(shortId: string) {
  // update visit history and return the updated document
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
    { new: true }
  );  //add this new item to the end of the array

  return entry;
}

export async function getAnalytics(shortId: string) {
  const result = await URL.findOne({ shortId });
  if (!result) return null;
  return {
    totalClicks: result.visitHistory.length,
    visitHistory: result.visitHistory,
  };
}
