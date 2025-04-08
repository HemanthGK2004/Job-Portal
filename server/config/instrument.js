import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://4eeffb76590771235f696ec22f8ae7b6@o4509118991040512.ingest.us.sentry.io/4509118997463040",
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration(), // <- MongoDB integration
  ],
  // Performance Tracing
  //tracesSampleRate: 1.0,              // Collect 100% traces — reduce in production
  profileSessionSampleRate: 1.0,      // Collect 100% profiling sessions
  profileLifecycle: 'trace',          // Automatically profile during active traces
});

// Optional: Start a custom span (useful for profiling something specific)
Sentry.startSpan({ name: "Custom Startup Span" }, () => {
  // This code will be traced and profiled
});
