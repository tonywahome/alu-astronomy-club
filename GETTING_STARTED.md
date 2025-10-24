# 🚀 Getting Started - ALU Astronomy Club Website

Welcome! This document walks you through the initial setup and first steps to run the project locally.

## 1️⃣ Install Node & Dependencies

### Prerequisites

- Node.js 18+ (test with `node --version`)
- npm (comes with Node; test with `npm --version`)
- Git

### Install Dependencies

```bash
# From project root
npm install
```

This installs dependencies for:

- Root workspace (Turbo CLI)
- `apps/web` (Next.js frontend)
- `apps/api` (Express backend)
- `packages/types` (Shared types)

---

## 2️⃣ Set Up Environment Variables

Copy example files and fill in your own values:

```bash
# Frontend env
cp apps/web/.env.local.example apps/web/.env.local

# Backend env
cp apps/api/.env.local.example apps/api/.env.local
```

### What to fill in:

**`apps/web/.env.local`** (Firebase client config — find in Firebase Console):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=alu-astronomy-club.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=alu-astronomy-club
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=alu-astronomy-club.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc...

NEXT_PUBLIC_API_URL=http://localhost:3001
```

**`apps/api/.env.local`** (Firebase server config — from Service Account JSON):

```env
PORT=3001
NODE_ENV=development

FIREBASE_PROJECT_ID=alu-astronomy-club
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@alu-astronomy-club.iam.gserviceaccount.com

CORS_ORIGIN=http://localhost:3000
SENDGRID_API_KEY=SG.abc...  # (optional, for later)
```

---

## 3️⃣ Start Development Servers

From project root:

```bash
npm run dev
```

This starts both:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

### Individual starts:

```bash
npm run dev -- web      # Frontend only
npm run dev -- api      # Backend only
```

---

## 4️⃣ Verify Everything Works

### Frontend (http://localhost:3000)

- [ ] Home page loads
- [ ] Hero animation visible (respects reduced-motion preference)
- [ ] Navigation links clickable
- [ ] "Join the Mission" button links to `/apply`

### Backend API (http://localhost:3001)

```bash
curl http://localhost:3001/health
# Expected: { "status": "ok", "timestamp": "2025-10-21T..." }
```

### Apply Form

- [ ] Navigate to `/apply`
- [ ] Fill form, check validation errors
- [ ] Submit (should show success/error based on backend response)

---

## 5️⃣ Project Structure Overview

```
aah_1/                           # Project root
│
├── apps/
│   ├── web/                      # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/             # App Router (pages: /, /apply, /projects, etc.)
│   │   │   │   ├── layout.tsx   # Root layout with fonts/styles
│   │   │   │   ├── page.tsx     # Home page
│   │   │   │   └── apply/
│   │   │   │       └── page.tsx # Apply page
│   │   │   └── components/
│   │   │       ├── Navbar.tsx
│   │   │       └── Footer.tsx
│   │   ├── globals.css          # Tailwind directives + custom styles
│   │   ├── tailwind.config.js   # Colors, fonts, animations
│   │   └── package.json
│   │
│   └── api/                      # Express backend
│       ├── src/
│       │   └── index.ts         # Server with /api/apply, /health endpoints
│       └── package.json
│
├── packages/
│   └── types/
│       └── src/
│           └── index.ts         # Zod schemas: Project, InspirationMedia, Application
│
├── docs/
│   ├── design-spec.md           # Wireframes, layouts, user flows, API contracts
│   └── IMPLEMENTATION_GUIDE.md  # Step-by-step build instructions (Sprint 1–3)
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml            # GitHub Actions CI/CD (lint, test, build, deploy)
│
├── package.json                 # Monorepo config (workspaces, Turbo scripts)
├── tsconfig.json                # Root TypeScript config
├── .gitignore
├── README.md                    # Project overview & commands
└── GETTING_STARTED.md           # This file

```

---

## 6️⃣ Common Commands

From **project root**:

```bash
# Development
npm run dev                 # Start all servers
npm run dev -- web        # Start frontend only
npm run dev -- api        # Start backend only

# Build
npm run build              # Build all
npm run build -- web      # Build frontend
npm run build -- api      # Build backend

# Lint & Type Check
npm run lint               # Lint all
npm run type-check         # Type-check all

# Testing (when configured)
npm run test              # Run tests
```

---

## 7️⃣ Next Steps After Setup

### Immediate (1–2 hours):

1. Explore the Home page design
2. Test the Apply form validation
3. Understand the component structure (Navbar, Footer)

### Short-term (Implement Sprint 1):

1. **Firebase Setup** (IMPLEMENTATION_GUIDE.md, Task 1.1)
   - Create Firebase project
   - Set up Firestore + Storage
   - Add security rules
2. **Wire Apply to Firestore** (Task 1.2)
   - Update API to save applications
   - Add email confirmation (Task 1.3)
3. **Test end-to-end** (form → API → Firestore → email)

### Medium-term (Implement Sprint 2):

1. Create Projects page with Firestore integration
2. Create Inspiration board with media gallery
3. Build Leadership page

### Long-term (Implement Sprint 3):

1. Performance audit (Lighthouse ≥ 90)
2. Accessibility audit
3. Deploy to Vercel (frontend) + Render (API)

---

## 🆘 Troubleshooting

### "Cannot find module 'react'" error

**Cause:** Dependencies not installed
**Fix:** `npm install` from root

### Frontend won't start

```bash
cd apps/web
npm run dev
```

Check for errors. Common issues: port 3000 in use, or missing `.env.local`.

### Backend API returns 500 errors

- Check `apps/api/.env.local` has correct Firebase credentials
- Check Firebase project exists and Firestore is enabled
- View logs: `npm run dev -- api` shows console output

### Form submission fails

1. Check backend is running: `curl http://localhost:3001/health`
2. Check frontend `.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:3001`
3. Check browser console (F12) for network errors

### "Port 3000 already in use"

```bash
# Find and kill process on port 3000
# On Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force

# Or just use different port:
npm run dev -- --port 3001
```

---

## 📚 Documentation Map

| Document                  | Purpose                                              |
| ------------------------- | ---------------------------------------------------- |
| `README.md`               | Project overview, quick start, roadmap               |
| `docs/design-spec.md`     | Design system, wireframes, user flows, API contracts |
| `IMPLEMENTATION_GUIDE.md` | Sprint-by-sprint build instructions                  |
| `GETTING_STARTED.md`      | This file—local setup & first steps                  |

---

## 🎯 Success Checklist

After setup, you should be able to:

- [ ] Run `npm run dev` and both servers start without errors
- [ ] Visit http://localhost:3000 and see the Home page
- [ ] Click navigation links and see page transitions
- [ ] Fill out the Apply form and see validation feedback
- [ ] See API health check: `curl http://localhost:3001/health`
- [ ] Understand the monorepo structure (apps/web, apps/api, packages/types)
- [ ] Open design-spec.md and review wireframes for other pages
- [ ] Know where to find next implementation tasks (IMPLEMENTATION_GUIDE.md)

---

## 🤝 Need Help?

- **Project Questions**: See `docs/design-spec.md` for full requirements
- **Build Issues**: Check `IMPLEMENTATION_GUIDE.md` for detailed tasks
- **Code Structure**: Explore `apps/web/src/app/page.tsx` and `apps/api/src/index.ts`
- **Styling**: Check `apps/web/tailwind.config.js` and `apps/web/src/globals.css`

---

**Happy coding! 🚀✨**

Last updated: 2025-10-21
