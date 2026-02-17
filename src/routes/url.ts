import express from "express";
import { handleGenerateShortUrl } from "../controllers/url";

const router = express.Router();
router.post("/", handleGenerateShortUrl);

export default router;
