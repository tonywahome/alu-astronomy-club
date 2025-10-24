import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import multer from "multer";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { ApplicationSchema } from "@alu/types";
import { z } from "zod";

// Initialize Firebase Admin (works both locally with GOOGLE_APPLICATION_CREDENTIALS
// set and in Cloud Functions environment where credentials are provided)
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();
const bucket = admin.storage().bucket();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", true);
app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 60,
  })
);

// Multer memory storage for small CV files
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Unsupported file type"), false);
  },
});

// Helper to coerce form values into expected shapes
function coerceBody(body: Record<string, any>) {
  return {
    fullName: body.fullName,
    email: body.email,
    phone: body.phone || undefined,
    department: body.department || undefined,
    reason: body.reason,
    skills: body.skills || undefined,
    consent:
      body.consent === true ||
      body.consent === "true" ||
      body.consent === "on" ||
      body.consent === "1",
  };
}

app.post(
  "/apply",
  upload.single("cv"),
  async (req: express.Request, res: express.Response) => {
    try {
      const incoming = coerceBody(req.body || {});

      // Validate main fields server-side using the shared schema
      const parsed = ApplicationSchema.parse(incoming);

      // If file present, upload to Firebase Storage
      let cvPath: string | null = null;
      if (req.file) {
        const file = req.file;
        const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
        const dest = `applications/${Date.now()}_${safeName}`;
        const fileRef = bucket.file(dest);

        await fileRef.save(file.buffer, {
          metadata: { contentType: file.mimetype },
        });

        cvPath = dest;
      }

      const docRef = await db.collection("applications").add({
        ...parsed,
        cvPath,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return res
        .status(200)
        .json({ id: docRef.id, message: "Application received" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.errors });
      }
      console.error(err);
      return res
        .status(500)
        .json({ error: (err as Error).message || "Internal error" });
    }
  }
);

// Export express app as default for local usage and tests
export default app;

// Export a Firebase HTTPS function named `api` so this file can be deployed to Cloud Functions
export const api = functions.https.onRequest(app);

// If running standalone (not as a Cloud Function), start HTTP server
if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () =>
    console.log(`API listening on http://localhost:${PORT}`)
  );
}
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
