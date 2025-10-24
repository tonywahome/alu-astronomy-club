import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Rate limiting
const applyLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per windowMs
  message: "Too many applications submitted, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Apply endpoint (placeholder - to be implemented with Firebase)
app.post("/api/apply", applyLimiter, async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      department,
      reason,
      skills,
      consent,
      csrfToken,
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !reason || !consent) {
      return res.status(400).json({
        code: "VALIDATION_ERROR",
        message: "Missing required fields.",
      });
    }

    // TODO: Validate email format
    // TODO: Validate CSRF token
    // TODO: Sanitize inputs
    // TODO: Upload CV to Firebase Storage
    // TODO: Save application to Firestore
    // TODO: Trigger email confirmation via Firebase Function

    // For now, return mock success
    console.log("Application received:", {
      fullName,
      email,
      phone,
      department,
    });

    return res.status(201).json({
      id: `app_${Date.now()}`,
      message: "Application received successfully.",
    });
  } catch (error) {
    console.error("Apply endpoint error:", error);
    return res.status(500).json({
      code: "SERVER_ERROR",
      message: "Failed to process application.",
    });
  }
});

// Projects endpoint (placeholder)
app.get("/api/projects", (req, res) => {
  res.json({
    items: [],
    page: 1,
    pageSize: 12,
    total: 0,
  });
});

// Inspiration endpoint (placeholder)
app.get("/api/inspiration", (req, res) => {
  res.json({
    items: [],
    page: 1,
    pageSize: 24,
    total: 0,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    code: "NOT_FOUND",
    message: "Endpoint not found.",
  });
});

// Error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Unhandled error:", err);
    res.status(err.status || 500).json({
      code: "SERVER_ERROR",
      message: err.message || "An unexpected error occurred.",
    });
  }
);

app.listen(PORT, () => {
  console.log(`✨ ALU Astronomy API running on http://localhost:${PORT}`);
});

export default app;
