# Implementation Guide

A step-by-step guide for finishing the ALU Astronomy Club website from Sprint 1 → Sprint 3.

## Current Status (Sprint 1 - 50% Complete)

✅ **Completed:**

- Monorepo structure with Turbo
- Design system (Tailwind colors, typography)
- Home page with hero, mission/vision, stats
- Apply page with form validation (React Hook Form + Zod)
- Express API server with rate limiting and error handling
- Shared types package
- GitHub Actions CI/CD workflow
- Documentation (design-spec, README)

⏳ **Next: Wire API to Firestore + Email**

---

## Sprint 1 (Weeks 1–2): Foundation & Apply Feature

### Task 1.1: Firebase Setup (Est. 2–3 hours)

**Objective:** Configure Firebase project and security rules.

**Steps:**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing: `alu-astronomy-club`
3. Enable Firestore Database:
   - Start in **test mode** (allow all reads/writes for dev)
   - Region: `us-central1` (or closest to your audience)
4. Enable Firebase Storage
5. Enable Authentication (Email/Password for future admin panel)
6. Get Firebase config:
   - Project Settings → Service Accounts → Generate new private key (JSON)
   - Project Settings → General → Config object
7. Store configs in `.env.local` files

**Firebase Rules (Firestore):**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Applications (write-once, read-restricted)
    match /applications/{id} {
      allow read: if false;
      allow create: if true;
      allow update, delete: if false;
    }
    // Projects (read-public, write-admin)
    match /projects/{id} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    // Inspiration media (read-public, write-admin)
    match /inspiration/{id} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

---

### Task 1.2: Firestore Integration in API (Est. 4–6 hours)

**Objective:** Wire `/api/apply` endpoint to persist applications to Firestore.

**File:** `apps/api/src/index.ts`

**Update:**

```typescript
import * as admin from "firebase-admin";

// Initialize Firebase
const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount),
});

const db = admin.firestore();
const storage = admin.storage();

// Updated POST /api/apply handler
app.post("/api/apply", applyLimiter, async (req, res) => {
  try {
    const { fullName, email, phone, department, reason, skills, consent } =
      req.body;

    // Validation
    if (!fullName || !email || !reason || !consent) {
      return res.status(400).json({
        code: "VALIDATION_ERROR",
        message: "Missing required fields.",
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        code: "VALIDATION_ERROR",
        message: "Invalid email format.",
      });
    }

    // Check for duplicates (optional: prevent same email from applying twice)
    const existing = await db
      .collection("applications")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (!existing.empty) {
      return res.status(400).json({
        code: "DUPLICATE_APPLICATION",
        message: "An application from this email already exists.",
      });
    }

    // Handle file upload (if provided)
    let cvUrl: string | undefined;
    if (req.files?.cv) {
      const file = req.files.cv as any;
      const bucket = storage.bucket();
      const blob = bucket.file(`applications/${email}/cv-${Date.now()}`);

      await blob.save(file.data, {
        metadata: { contentType: file.mimetype },
      });

      const [url] = await blob.getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year
      });

      cvUrl = url;
    }

    // Save to Firestore
    const appRef = db.collection("applications").doc();
    await appRef.set({
      id: appRef.id,
      fullName,
      email,
      phone: phone || null,
      department: department || null,
      reason,
      skills: skills || null,
      cvUrl: cvUrl || null,
      consent,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: "pending", // For future admin dashboard
    });

    // Trigger email via Cloud Function or SendGrid (next task)
    // For now, just log
    console.log(`✉️ Application received from ${email}. ID: ${appRef.id}`);

    return res.status(201).json({
      id: appRef.id,
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
```

**Dependencies to add:**

```bash
npm install --workspace=@alu/api firebase-admin express-fileupload
npm install --workspace=@alu/api --save-dev @types/express-fileupload
```

---

### Task 1.3: Email Confirmation (Est. 3–4 hours)

**Objective:** Send confirmation emails after application submission.

**Option A: Firebase Cloud Functions** (recommended)

```typescript
// Deploy as Firebase Cloud Function
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendApplicationConfirmation = functions.firestore
  .document("applications/{docId}")
  .onCreate(async (snap) => {
    const app = snap.data();
    const { email, fullName } = app;

    const mailOptions = {
      from: "alu.astronomy@club.edu",
      to: email,
      subject: "Welcome to ALU Astronomy Club!",
      html: `
        <h1>Thank You, ${fullName}!</h1>
        <p>We've received your application to join the ALU Astronomy Club.</p>
        <p>Our leadership team will review your application and get back to you within 3-5 business days.</p>
        <p>In the meantime, explore our projects and inspiration board!</p>
        <p>Best regards,<br/>The ALU Astronomy Club</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  });
```

**Option B: SendGrid (simpler for Express)**

```typescript
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// In POST /api/apply, after Firestore save:
await sgMail.send({
  to: email,
  from: "alu.astronomy@club.edu",
  subject: "Welcome to ALU Astronomy Club!",
  html: `...`,
});
```

**Dependencies:**

```bash
npm install --workspace=@alu/api @sendgrid/mail
```

---

### Task 1.4: Connect Frontend Form to API (Est. 2 hours)

**Objective:** Update Apply page form to POST to backend and handle responses.

**File:** `apps/web/src/app/apply/page.tsx`

**Update `onSubmit` function:**

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const onSubmit = async (data: any) => {
  setIsSubmitting(true);
  try {
    const formData = new FormData();

    // Add form fields
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "cv") {
        formData.append(key, String(value));
      }
    });

    // Add file if present
    if (file) {
      formData.append("cv", file);
    }

    // Fetch CSRF token (to be implemented on backend)
    // const csrfRes = await fetch(`${API_URL}/api/csrf-token`);
    // const { token } = await csrfRes.json();
    // formData.append('csrfToken', token);

    // Submit
    const response = await fetch(`${API_URL}/api/apply`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const result = await response.json();
    setSubmitStatus("success");
    reset();
    setFile(null);

    setTimeout(() => setSubmitStatus("idle"), 5000);
  } catch (error) {
    console.error("Submission error:", error);
    setSubmitStatus("error");
    setTimeout(() => setSubmitStatus("idle"), 5000);
  } finally {
    setIsSubmitting(false);
  }
};
```

**Add CORS and multipart support to API:**

```typescript
import fileUpload from "express-fileupload";

app.use(fileUpload()); // Before routes
```

---

## Sprint 2 (Weeks 3–4): Projects & Inspiration

### Task 2.1: Projects Page (Est. 8–10 hours)

**Objectives:**

- Fetch projects from Firestore
- Implement grid with filters
- Create modal for details
- Seed sample data

**Components to create:**

```
apps/web/src/
├── components/
│   ├── ProjectCard.tsx        # Individual project card
│   ├── ProjectGrid.tsx        # Grid layout with sorting
│   ├── ProjectModal.tsx       # Detail modal
│   └── ProjectFilters.tsx     # Year/type/status filters
└── app/
    └── projects/
        └── page.tsx           # Projects page
```

**Example ProjectCard:**

```tsx
"use client";

import { Project } from "@types/index";
import { useState } from "react";
import ProjectModal from "./ProjectModal";

export default function ProjectCard({ project }: { project: Project }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="glass p-4 rounded-xl cursor-pointer hover:scale-105 transition-transform"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="font-orbitron font-bold text-[#66fcf1] mb-2">
          {project.title}
        </h3>
        <p className="text-white/70 text-sm mb-4">{project.summary}</p>
        <div className="flex justify-between items-center">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              project.status === "ongoing" ? "bg-[#45a29e]" : "bg-white/10"
            }`}
          >
            {project.status}
          </span>
          <span className="text-white/50 text-sm">{project.year}</span>
        </div>
      </div>

      {showModal && (
        <ProjectModal project={project} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
```

**Seed Firestore with sample data:**

```typescript
// Run once to populate projects
const projects = [
  {
    title: "ALU Stargazing Initiative",
    summary: "Monthly stargazing events at campus observatory",
    description: "A series of monthly stargazing events...",
    image: "https://via.placeholder.com/400x300",
    status: "ongoing",
    year: 2024,
    type: "event",
    tags: ["observing", "community"],
  },
  // ... more projects
];

for (const project of projects) {
  await db.collection("projects").add({
    ...project,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
```

### Task 2.2: Inspiration Board (Est. 6–8 hours)

**Objectives:**

- Create masonry grid (use react-masonry-css)
- Lightbox viewer with navigation
- Lazy loading images
- Responsive thumbnails

**Components:**

```
apps/web/src/components/
├── MediaGrid.tsx          # Masonry grid
├── MediaCard.tsx          # Individual media card
├── Lightbox.tsx           # Full-screen viewer
└── FilterChips.tsx        # kind filters
```

**Dependencies:**

```bash
npm install --workspace=@alu/web react-masonry-css
```

---

## Sprint 3 (Weeks 5–6): Polish & Launch

### Task 3.1: About & Leadership Pages (Est. 6–8 hours)

Create remaining pages with similar component patterns.

### Task 3.2: Performance & Accessibility Audit (Est. 6–8 hours)

```bash
# Lighthouse audit
npm run build -- web
npm i -g @lhci/cli@latest
lhci autorun

# Accessibility testing
npm install --workspace=@alu/web jest-axe
# Add axe tests in Jest
```

### Task 3.3: Firebase Deployment (Est. 2–3 hours)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## Testing Checklist

### Unit Tests (Jest + React Testing Library)

- [ ] Form validation logic
- [ ] Component rendering
- [ ] Button/link navigation

### Integration Tests

- [ ] Form submission to API
- [ ] Firestore read/write
- [ ] Email sending

### E2E Tests (Playwright/Cypress)

- [ ] Visitor flow: Home → Projects → Apply → Success
- [ ] Form validation errors
- [ ] Mobile responsiveness

### Accessibility (axe, manual)

- [ ] Keyboard navigation (Tab, Enter, ESC)
- [ ] Screen reader labels (aria-label, role)
- [ ] Color contrast ≥ AA
- [ ] Focus indicators visible

### Performance

- [ ] LCP < 2.5s
- [ ] TBT < 200ms
- [ ] CLS < 0.1
- [ ] Lighthouse ≥ 90

---

## Deployment Steps

### 1. Vercel (Frontend)

```bash
npm i -g vercel
vercel --prod
```

### 2. Render (Backend)

- Create Render account
- Connect GitHub repo
- Set environment variables
- Deploy

### 3. Firebase (Database + Storage)

- Already set up in Task 1.1
- Monitor usage in console

---

## Known Issues & TODOs

- [ ] CSRF token endpoint (Task 1.2)
- [ ] File upload to Storage (Task 1.2)
- [ ] Email confirmation (Task 1.3)
- [ ] Admin authentication panel (future)
- [ ] Database indexing for filters (when data grows)
- [ ] CDN for images (Firebase Storage CDN or CloudFlare)

---

## Useful Resources

- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Express.js Middleware](https://expressjs.com/en/guide/using-middleware.html)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Utilities](https://tailwindcss.com/docs/utility-first)
- [React Hook Form](https://react-hook-form.com/)

---

**Owner**: ALU Astronomy Club Dev Team
**Last Updated**: 2025-10-21
