# ALU Astronomy Club Website — Production Design Specification

Version: 1.0
Date: 2025-10-21
Owner: ALU Astronomy Club

## 1. Overview
Purpose: Design and build a space-themed digital hub for the ALU Astronomy Club, combining storytelling, inspiration, and interactivity with a modern, secure, and scalable architecture.

Primary outcomes:
- Inspire and inform visitors with compelling content and interactive visuals.
- Collect member applications reliably with validation and confirmation email.
- Publish projects and an inspiration media board with room for future admin features.

KPIs (success indicators):
- Avg session duration > 3 minutes
- 30+ member applications in first month
- Bounce rate < 35%
- Lighthouse (mobile) ≥ 90 for Performance, Accessibility, Best Practices, SEO

## 2. Site Map
- Home
  - About (Mission, Vision, Journey)
  - Projects
  - Leadership
    - Founder
    - Executive Team
    - Inspiration Board
  - Member Application
  - Contact (Footer links)

Navigation labels: Home, About, Projects, Leadership, Inspiration, Apply, Contact

## 3. Global Design System

### 3.1 Layout, Grid, and Breakpoints (Tailwind CSS)
- Container: `max-w-screen-xl` centered with `px-4 sm:px-6 lg:px-8`.
- Breakpoints: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`, `2xl:1536px`.
- Grid utilities: CSS Grid + Flexbox. Use 12-column responsive grid on `md+`.
- Spacing scale: Tailwind default (4px base) with occasional custom utilities for large hero spacing.
- Elevation: Subtle shadows with “glow” variants for space theme.

### 3.2 Color & Typography
- Primary Colors: `#0B0C10` (space black), `#1F2833` (navy), `#45A29E` (teal), `#66FCF1` (cyan glow)
- Gradients: navy → teal diagonal; use sparingly behind cards and banners.
- Fonts: Orbitron (Headings), Inter (Body). Load via next/font or self-hosted with `font-display: swap`.
- Contrast: Maintain WCAG AA. Adjust glow effects to avoid reducing contrast.

### 3.3 Icons & Imagery
- Icons: Lucide or Heroicons (outline) with white neon hover glow.
- Imagery: High-res space photography. Use CDNs and responsive images (`<Image>` optimization if using Next.js).

### 3.4 Motion & Interactions
- Motion library: Framer Motion for component transitions and scroll reveals.
- 3D/animation: Optional Three.js or Lottie in hero; must provide reduced-motion fallbacks.
- Reduce motion: Respect `prefers-reduced-motion`; disable parallax and heavy animations.

### 3.5 Accessibility Baseline
- Keyboard navigable: Skip link, focus outlines, logical tab order.
- ARIA roles/labels for interactive components (modals, carousels, disclosures).
- Color contrast ≥ AA; large text ≥ 3:1.
- Forms: Associate labels, inline error messages, aria-live for async status.

### 3.6 State System
- Loading: Skeletons for lists; shimmer placeholders for cards.
- Empty states: Friendly microcopy with CTA (e.g., no projects yet → suggest contacting club).
- Error states: Clear message, retry action; log client errors to console and server errors via API.

---

## 4. Page-by-Page Wireframes & Layouts

Each section includes: purpose, layout anatomy, responsive rules, interactions, states, and component list.

### 4.1 Home Page
Purpose: Introduce the club, set tone, and invite exploration.

Anatomy (top-to-bottom):
1) Navbar (fixed):
   - Left: Logo/wordmark “ALU Astronomy Club”.
   - Right: Links: Home, About, Projects, Leadership, Inspiration, Apply; Mobile: hamburger → slide-in menu.
   - Visual: Transparent over hero; on scroll past hero, transitions to `bg-[#0B0C10]/70` with backdrop-blur.
2) Hero Section (fullscreen):
   - Background: Animated starfield/parallax; optional Three.js galaxy; fallback static gradient image.
   - Center content: Tagline “Exploring Beyond the Horizon” (H1), subtitle, CTA “Join the Mission” (primary), secondary “Explore Projects”.
   - Micro-interactions: Subtle glow on CTA hover; down-arrow scroll hint.
3) Mission & Vision:
   - Two glassmorphism cards side-by-side on `md+`, stacked on `sm`.
   - Animated icons (telescope, galaxy). Hover: glow + slight zoom.
4) Journey Timeline (horizontal scroll):
   - Milestones (chips/cards) with year, title, short text, image tooltip.
   - Smooth scroll with arrow buttons; keyboard accessible.
5) Footer preview:
   - Mini invite strip: “Connect with us” + social icons.
   - Click/scroll jumps to global footer.

Responsive:
- `sm`: stack sections; hero text centered; buttons full-width.
- `md+`: two-column mission/vision; timeline shows 3-5 items in viewport.

States:
- Loading: hero loads background; timeline skeleton chips.
- Error: if timeline fetch fails, show fallback static milestones.

Components:
- `Navbar`, `MobileMenu`, `Hero`, `Card`, `Timeline`, `FooterPreview`.

### 4.2 About Page
Purpose: Showcase club’s purpose and growth.

Anatomy:
1) Banner: Space gradient with large “About Us”.
2) Mission & Vision: Two cards/columns with large icons.
3) Journey (interactive timeline): Horizontal scroll with milestones:
   - “Founded in 2023”, “First Stargazing Event”, “NASA Open Data Initiative partnership”.
4) Quotes Carousel: Famous astronomer quotes (Sagan, Rubin); auto-advance with pause on hover, keyboard/aria controls.

Responsive: grid collapses to single column on `sm`.

States: Skeleton for timeline; empty fallback quotes.

Components:
- `PageBanner`, `Card`, `Timeline`, `QuoteCarousel`.

### 4.3 Projects Page
Purpose: Highlight completed and ongoing projects.

Anatomy:
1) Header: Title + brief intro; optional stats (count, filters active).
2) Search/Filter Bar: Text search; Filters by Year / Type / Status (Ongoing/Completed). Chips with clear-all.
3) Grid (3-col responsive): Project cards with image, title, short description, tags, status pill.
4) Modal: Project detail with full description, media gallery, team members (avatars), links.

Responsive:
- `sm`: 1 column; modal fullscreen with close button reachable and ESC key support.
- `md`: 2 columns; `lg+`: 3 columns.

States:
- Loading: 6-9 skeleton cards; filters disabled until data load.
- Empty: “No projects match your filters” with clear filters action.
- Error: Toast + retry button.

Components:
- `ProjectFilters`, `ProjectGrid`, `ProjectCard`, `ProjectModal`, `AvatarGroup`, `Tag`, `StatusPill`.

### 4.4 Leadership Page
Purpose: Highlight the people and vision behind the club.

Anatomy:
1) Founder Section (full-width): Left portrait, right story. Subtle moving cosmic background (slow pan). CTA to Inspiration Board.
2) Leadership Team Grid: 2–3 per row; circular portraits; names, roles, social links.
3) Values Strip: Animated glowing keywords: Curiosity, Discovery, Wonder.

Responsive: Founder layout stacks on small screens; team grid adjusts columns at `sm/md/lg`.

Components:
- `FounderSpotlight`, `TeamGrid`, `ProfileCard`, `ValuesMarquee`.

### 4.5 Inspiration Board
Purpose: Emotional and visual heart — gallery of space media.

Anatomy:
1) Header: Title + filter chips (Images, GIFs, Videos, All).
2) Masonry Grid: High-res images/GIFs/embedded short videos; lazy-loaded.
3) Lightbox Viewer: Fullscreen viewer with caption, author, left/right navigation, zoom for images.
4) Upload Button (Admin only – future): Hidden by role; opens upload modal.

Performance: Lazy loading; responsive resizing; CDN delivery; pre-sized thumbnails.

Components:
- `MediaGrid` (Masonry), `MediaCard`, `Lightbox`, `UploadButton` (gated), `FilterChips`.

### 4.6 Member Application Page
Purpose: Allow interested students to apply for membership.

Anatomy:
1) Header: “Join the ALU Astronomy Club” over Earth-from-space background.
2) Application Form (React Hook Form + Zod):
   - Fields: Full Name, Email, Phone Number, Department, Reason for Joining (textarea), Skills/Experience (textarea), CV Upload (optional, PDF/doc ≤ 5MB).
   - Validation: Client-side + server-side.
   - Consent checkbox: Accept privacy & terms.
3) Submit Action: POST to `/api/apply` → store in Firestore; trigger confirmation email via Firebase Function.
4) Success Page/State: “Application Received — Welcome to the Stars!” animation with next steps.

States:
- Loading: Submit button shows spinner; disabled during request.
- Validation errors inline; aria-live for form status.
- File errors: size/type limits with clear messages.

Components:
- `PageHeader`, `ApplicationForm`, `FormField`, `FileUpload`, `SuccessPanel`.

### 4.7 Global Footer (Layout)
- Quick Links: Home, Projects, Apply, Leadership, Inspiration.
- Contact: WhatsApp link, email `alu.astronomy@club.edu`, Instagram `@aluastronomyclub`.
- Copyright: © 2025 ALU Astronomy Club. All Rights Reserved.
- Visuals: Animated starscape with subtle glow; respects reduced motion.

Components:
- `Footer`, `SocialLinks`, `ContactList`.

---

## 5. Component Library (React + Tailwind + Framer Motion)

Each component includes suggested props and a11y notes.

- `Navbar`
  - Props: `links: {label:string, href:string}[]`, `onApplyClick?()`, `scrolled?: boolean`.
  - Behavior: Fixed; blur on scroll; mobile menu toggles with focus trap.

- `Hero`
  - Props: `title:string`, `subtitle?:string`, `primaryCta:{label:string, href:string}`, `secondaryCta?:{label:string, href:string}`, `animated?:boolean`.
  - A11y: Ensure readable contrast over backgrounds; provide static background when `prefers-reduced-motion`.

- `Card`
  - Props: `title`, `icon?`, `children`, `variant:"glass"|"solid"`.

- `Timeline`
  - Props: `items: {id:string, year:string, title:string, text:string, imageUrl?:string}[]`.
  - Behavior: Horizontal scroll with buttons and keyboard support; roving tabindex.

- `QuoteCarousel`
  - Props: `items: {quote:string, author:string}[]`, `autoPlay?:boolean`.
  - A11y: `aria-roledescription="carousel"`, controls labeled, pause on hover.

- `ProjectCard`
  - Props: `{ id:string; title:string; description:string; image:string; status:"ongoing"|"completed"; year:number; tags:string[] }` + callbacks.

- `ProjectModal`
  - Props: `project: Project`, `open:boolean`, `onClose()`.
  - A11y: Focus trap; close on ESC; `aria-modal`.

- `MediaGrid`
  - Props: `items: InspirationMedia[]`, `filter:"all"|"image"|"gif"|"video"`.

- `Lightbox`
  - Props: `item: InspirationMedia`, `index:number`, `onPrev()`, `onNext()`, `onClose()`.
  - A11y: Fullscreen dialog, ESC close, arrow-key nav.

- `ApplicationForm`
  - Controlled by React Hook Form + Zod resolver; shows inline errors; submits to API.

---

## 6. User Flows

### 6.1 Visitor Flow
1) Land on Home → Animated hero + mission.
2) Navigate to Projects → Browse grid, open modal/details.
3) View Leadership → Read founder story and team.
4) Visit Inspiration Board → Open media in lightbox.
5) Click Apply → Complete form.
6) Receive confirmation email → Optional share or follow on Instagram.

Edge cases:
- Slow network → skeletons and toasts guiding patience.
- No JS → core content still readable; form progressively enhances (server validation still required).

### 6.2 Admin Flow (Future Scope)
- Login with Firebase Auth (admin role claims).
- Upload new Inspiration media or edit Projects via protected UI.
- Review applications in Firebase console or a future admin dashboard.

---

## 7. API Contracts & Data Models

Conventions:
- JSON; status codes 2xx/4xx/5xx; errors include `code`, `message`, and optional `details`.
- Validation with Zod/Joi on server; sanitize inputs; rate-limit.
- Auth: Public GETs; POST /apply public with CSRF token; admin endpoints future.

### 7.1 Models (TypeScript types)
```ts
type Project = {
  id: string;
  title: string;
  summary: string;
  description: string;
  image: string; // cover URL
  gallery?: string[];
  status: "ongoing" | "completed";
  year: number;
  type?: "research" | "event" | "software" | "other";
  tags: string[];
  team?: { name: string; role?: string; avatar?: string; social?: string }[];
  links?: { label: string; url: string }[];
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

type InspirationMedia = {
  id: string;
  kind: "image" | "gif" | "video";
  src: string; // CDN URL
  thumb?: string; // thumbnail URL
  caption?: string;
  author?: string;
  width?: number;
  height?: number;
  createdAt: string; // ISO
};

type Application = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  department?: string;
  reason: string;
  skills?: string;
  cvUrl?: string; // Firebase Storage URL
  consent: boolean;
  createdAt: string; // ISO
};
```

### 7.2 Endpoints
- POST `/api/apply`
  - Body:
    ```json
    {
      "fullName": "string",
      "email": "string",
      "phone": "string",
      "department": "string",
      "reason": "string",
      "skills": "string",
      "cv": "base64 or multipart file",
      "consent": true,
      "csrfToken": "string"
    }
    ```
  - Responses:
    - 201 Created: `{ "id": "app_xxx", "message": "Application received" }`
    - 400: `{ "code": "VALIDATION_ERROR", "message": "..." }`
    - 429: `{ "code": "RATE_LIMITED", "message": "Too many requests" }`
    - 500: `{ "code": "SERVER_ERROR", "message": "..." }`

- GET `/api/projects` (optional query: `q`, `year`, `type`, `status`, `page`, `pageSize`)
  - Response 200:
    ```json
    {
      "items": [ /* Project[] */ ],
      "page": 1,
      "pageSize": 12,
      "total": 42
    }
    ```

- GET `/api/inspiration` (optional `kind`, pagination)
  - Response 200: `{ "items": [ /* InspirationMedia[] */ ], "page": 1, "pageSize": 24, "total": 100 }`

Notes:
- Use Firebase Firestore for persistence; Inspiration media assets in Firebase Storage; serve via Storage CDN.
- For file uploads, prefer signed upload URLs or multipart to server → server uploads to Firebase Storage.

---

## 8. Security & Privacy

Mitigations:
- XSS: Escape outputs; sanitize inbound strings (DOMPurify on client for any rendered HTML; server sanitization); set `Helmet` with sensible CSP.
- CSRF: Issue CSRF token for forms; validate on POST `/api/apply`; SameSite=Lax cookies if cookies are used; double-submit token pattern if not using sessions.
- Rate limiting: `express-rate-limit` e.g., 10 req/min per IP on `/api/apply`.
- HTTPS: Enforce TLS via hosting; redirect HTTP → HTTPS.
- CORS: Restrict origins to prod/stage domains.
- Firebase Rules (sketch):
  ```js
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /applications/{id} {
        allow read: if false; // private
        allow create: if true; // public write
        allow update, delete: if request.auth != null && request.auth.token.admin == true;
      }
      match /projects/{id} {
        allow read: if true;
        allow write: if request.auth != null && request.auth.token.admin == true;
      }
      match /inspiration/{id} {
        allow read: if true;
        allow write: if request.auth != null && request.auth.token.admin == true;
      }
    }
  }
  ```
- Dependency safety: Dependabot or Renovate; `npm audit` in CI.
- Secrets: Store in hosting env vars (Vercel/Render/Firebase); never in repo.

---

## 9. Performance & Reliability
- Targets: LCP < 2.5s, TBT < 200ms, CLS < 0.1 on mid-range mobile.
- Images: Use responsive sizes, AVIF/WebP; pre-generate thumbnails for Inspiration; lazy-load below-the-fold.
- Code splitting: Lazy-load modals, carousels, Three.js; use dynamic imports.
- Caching: HTTP cache headers for static assets; SWR caching for lists.
- CDN: Serve images via Firebase Storage CDN.
- Prefetch: Link prefetch on hover for inner routes.
- Resilience: Retries with backoff for GETs; idempotency key optional for POST /apply.

---

## 10. Implementation Plan & Tech Mapping

Stack:
- Frontend: React + Tailwind + Framer Motion. Assumption: Next.js (App Router) on Vercel for built-in image optimization and routing.
- Backend: Express.js on Render (or Firebase Cloud Functions) as API facade to Firestore/Storage.
- Data: Firebase Firestore; Storage for media; Auth for future admin.

Suggested repo structure:
```
root/
  apps/
    web/              # Next.js app (frontend)
    api/              # Express server (backend)
  packages/
    ui/               # Shared UI components (optional)
  docs/
    design-spec.md
```

Next.js (apps/web) key routes:
- `/` Home
- `/about` About
- `/projects` Projects
- `/leadership` Leadership
- `/inspiration` Inspiration Board
- `/apply` Member Application

Express (apps/api) routes:
- `POST /api/apply`
- `GET /api/projects`
- `GET /api/inspiration`

CI/CD:
- GitHub Actions: lint, typecheck, test, build per app; deploy web → Vercel; api → Render.
- Env management: `.env.local` for dev; Vercel/Render secrets for prod.

---

## 11. Testing & QA

Acceptance criteria (per page) — highlights:
- Home: Hero loads with reduced-motion respected; CTA scrolls/links work; timeline keyboard-accessible.
- About: Timeline renders ≥ 3 milestones; carousel pausable and keyboard operable.
- Projects: Filters update grid; modal opens/closes with ESC and focus returns to trigger; empty state shown for no results.
- Leadership: Founder section responsive; team grid accessible; values marquee pauses on hover and respects reduced motion.
- Inspiration: Masonry lazy loads; lightbox navigable with arrow keys; videos don’t autoplay with sound.
- Apply: Client and server validation; success page shows after 201; duplicate fast submissions rate-limited; file type/size enforced.
- Footer: Links work; contact methods open correctly.

Testing plan:
- Unit: Component logic with Jest/RTL (filters, form validation, modal open/close).
- Integration: API handlers with supertest; Firestore mocks for data.
- E2E: Playwright or Cypress covering key flows (visitor + apply submission).
- Accessibility: axe automated checks + manual keyboard testing.
- Performance: Lighthouse CI against preview deploy; budgets enforced.

---

## 12. Content & Assets
- Fonts: Orbitron (headings), Inter (body) — include fallback stacks.
- Icons: Lucide/Heroicons set with 20/24px sizes.
- Images/videos: Curated space images; ensure rights/attribution; generate thumbnails.
- Copy: Tagline, mission, vision, founder story, project summaries, quotes.

Microcopy examples:
- Apply success: “Application received — welcome to the stars! We’ll reach out soon.”
- Empty projects: “No projects match your filters. Try clearing filters or check back later.”

---

## 13. Risks & Assumptions
- Assumption: Next.js on Vercel for frontend to leverage image optimization; Express hosted separately.
- Risk: Heavy animations may impact performance → strict reduced-motion support and progressive enhancement.
- Risk: High-res media bandwidth → thumbnails + lazy loading + CDN.

---

## 14. Next Steps & Handoff
- Sprint 1 (1–2 weeks):
  - Implement Home, Footer, and Navbar; set up Tailwind, fonts, theme, and motion utilities.
  - Implement Apply page with form validation and POST /api/apply backend.
  - Deploy frontend (Vercel) + backend (Render); wire Firestore; enable email function.
- Sprint 2:
  - Projects grid + modal; seed sample data.
  - Inspiration masonry + lightbox with optimized thumbnails.
  - Leadership and About content.
- Sprint 3:
  - Polish animations; a11y audit; Lighthouse ≥ 90; documentation and Storybook (optional).

Handoff artifacts:
- This spec (`docs/design-spec.md`)
- Component inventory and props
- API contracts and sample payloads
- Test plan and acceptance criteria

---

## Appendix: Visual Layout Notes (Text Wireframes)

Home (desktop)
```
┌────────────────────────────────────────────────────────┐
│ NAV (transparent → blur on scroll)                     │
├────────────────────────────────────────────────────────┤
│ HERO: background (stars/parallax)                      │
│  [H1 Exploring Beyond the Horizon] [CTA Join] [Explore]│
├────────────────────────────────────────────────────────┤
│ Mission [Card]   Vision [Card]                         │
├────────────────────────────────────────────────────────┤
│  ←  Timeline  →  (horizontal scroll)                   │
├────────────────────────────────────────────────────────┤
│ Footer preview: Connect with us                        │
└────────────────────────────────────────────────────────┘
```

Projects (desktop)
```
┌ Header + Filters                                      ┐
│ [Search][Year][Type][Status] [Clear]                  │
├───────────────────────────────────────────────────────┤
│ [Card][Card][Card]                                    │
│ [Card][Card][Card]    (responsive 1–3 cols)           │
└───────────────────────────────────────────────────────┘
   Modal (on click): image, details, team, links
```

Apply (mobile-first)
```
[Header]
[Full Name]
[Email]
[Phone]
[Department]
[Reason]
[Skills]
[Upload CV]
[Consent Checkbox]
[Submit]
```
