import { clerkMiddleware } from "@clerk/express";
import * as Sentry from "@sentry/node";
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import './config/instrument.js';
import { clerkWebhook } from './controllers/webHooks.js';
import CompanyRoutes from './routes/CompanyRoutes.js';
import JobRoutes from './routes/JobRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
const app = express();

// Connect to MongoDB
await connectDB();
// await connectCloudinary();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get('/', (req, res) => res.send('Hello World!'));
app.get("/debug-sentry",function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

app.post("/webhook",clerkWebhook);
app.use('/api/company', CompanyRoutes);
app.use('/api/jobs', JobRoutes);

app.use('/api/users', UserRoutes);
// app.use(express.static('uploads'));

const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

