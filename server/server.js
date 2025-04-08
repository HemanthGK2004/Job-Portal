// Import Sentry first to capture all errors including during initialization
import './config/instrument.js';

import * as Sentry from "@sentry/node";
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import { clerkWebhook } from './controllers/webHooks.js';

const app = express();

// Connect to the database before anything else
await connectDB();
// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send("API is running..."));

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

app.post('/webhooks', clerkWebhook);


// Optional fallbacks (to handle unhandled routes/errors)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
