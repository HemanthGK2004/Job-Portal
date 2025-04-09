import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
// 👇 import the MongoDB/Mongoose integration this way
// import { mongooseIntegration } from "@sentry/mongoose";

Sentry.init({
  dsn: "https://4eeffb76590771235f696ec22f8ae7b6@o4509118991040512.ingest.us.sentry.io/4509118997463040",
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration(), // ✅ Correct integration method for mongoose
  ],
//   tracesSampleRate: 1.0,
  profileSessionSampleRate: 1.0,
  profileLifecycle: 'trace',
});

// Optional: Custom startup span (for profiling app startup)
Sentry.startSpan({ name: "Custom Startup Span" }, () => {
  // Your bootstrapping logic (optional)
});
