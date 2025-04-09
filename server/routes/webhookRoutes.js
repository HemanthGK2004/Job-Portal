import express from "express";
import { clerkWebhook } from "../controllers/webHooks.js"; // Adjust path if needed

const router = express.Router();

// NOTE: Must use raw body parser here
router.post("/clerk", express.raw({ type: "application/json" }), clerkWebhook);

export default router;
