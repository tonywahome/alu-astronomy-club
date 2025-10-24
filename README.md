# ALU Astronomy Club Website

Space-themed digital hub for the ALU Astronomy Club, combining storytelling, inspiration, and interactivity with a modern, secure, and scalable architecture.

## 📋 Quick Start

### Prerequisites

- Node.js 18+ (recommended: 20.x)
- npm or yarn
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/tonywahome/alu-astronomy-club.git
   cd alu-astronomy-club
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp apps/web/.env.local.example apps/web/.env.local
   cp apps/api/.env.local.example apps/api/.env.local
   ```

   Edit both `.env.local` files with your Firebase and API keys.

4. **Start development servers**
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

### Project Structure

```
root/
├── apps/
│   ├── web/                 # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/        # App router pages
│   │   │   ├── components/ # Reusable React components
│   │   │   ├── styles/     # Global styles (Tailwind)
│   │   │   └── lib/        # Utilities and helpers
│   │   ├── next.config.js
│   │   ├── tailwind.config.js
│   │   └── package.json
│   └── api/                # Express.js backend
│       ├── src/
│       │   ├── index.ts    # Server entry point
│       │   ├── routes/     # API endpoints
│       │   ├── middleware/ # Express middleware
│       │   └── services/   # Business logic
│       └── package.json
├── packages/
│   └── types/              # Shared TypeScript types
│       └── src/
│           └── index.ts    # Type definitions
├── docs/
│   └── design-spec.md      # Full design specification
├── .github/
│   └── workflows/
│       └── ci-cd.yml       # GitHub Actions CI/CD
├── package.json            # Monorepo config (Turbo)
└── tsconfig.json          # Root TypeScript config
```

## 🛠️ Development Commands

From the root directory:

```bash
# Development
npm run dev              # Start all servers
npm run dev -- web      # Start only frontend
npm run dev -- api      # Start only backend

# Build
npm run build            # Build all apps
npm run build -- web    # Build frontend only
npm run build -- api    # Build backend only

# Linting
npm run lint            # Lint all apps
npm run lint -- web    # Lint frontend only

# Type checking
npm run type-check     # Typecheck all apps

# Testing
npm run test           # Run tests in all apps
```

## 📄 Pages & Routes

### Frontend (Next.js)

- `/` - Home page with hero, mission/vision, and CTA
- `/about` - About page with timeline and quotes carousel
- `/projects` - Projects grid with filters and modal details
- `/leadership` - Leadership team and founder spotlight
- `/inspiration` - Media gallery (masonry, lightbox)
- `/apply` - Member application form
- `/api/apply` - Apply form submission endpoint

### Backend (Express)

- `GET /health` - Health check
- `POST /api/apply` - Submit member application
- `GET /api/projects` - Fetch projects list (with pagination/filtering)
- `GET /api/inspiration` - Fetch inspiration media

## 🎨 Design System

### Colors

- **Space Black**: `#0b0c10`
- **Navy**: `#1f2833`
- **Teal**: `#45a29e`
- **Cyan Glow**: `#66fcf1`

### Typography

- **Headings**: Orbitron (Google Fonts)
- **Body**: Inter (Google Fonts)

### Layout

- **Responsive**: Mobile-first, Tailwind CSS breakpoints
- **Animations**: Framer Motion for transitions and interactions
- **Theme**: Space/cosmic aesthetic with glassmorphism effects

## 🔐 Security

- **HTTPS**: Enforced on production
- **CSRF Protection**: Token-based validation
- **XSS Prevention**: Input sanitization + Helmet.js CSP
- **Rate Limiting**: Per-endpoint and per-IP limits
- **Firebase Security Rules**: Role-based access control
- **Environment Secrets**: Never committed; managed via hosting platform

## 📱 Performance

Target metrics (Lighthouse):

- Performance: ≥ 90
- Accessibility: ≥ 90
- Best Practices: ≥ 90
- SEO: ≥ 90

Optimizations:

- Image optimization (responsive, lazy-loading, CDN)
- Code splitting (dynamic imports for modals, 3D)
- HTTP caching headers
- Reduced motion support (accessibility)

## 🚀 Deployment

### Frontend (Vercel)

1. Connect GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Auto-deploy on push to `main` or `master`

### Backend (Render or Firebase Cloud Functions)

1. Deploy `apps/api` to Render or Firebase
2. Set environment variables in hosting platform
3. Update `NEXT_PUBLIC_API_URL` in frontend `.env.local`

### Database & Storage (Firebase)

1. Create Firebase project
2. Set up Firestore database
3. Configure Firebase Storage for media uploads
4. Update Firebase config in `.env.local` files

## 📚 Documentation

- **Design Spec**: `docs/design-spec.md` - Comprehensive wireframes, flows, API contracts
- **API Routes**: See `apps/api/src/index.ts` for endpoint details
- **Component Props**: See individual component files for TypeScript interfaces

## 🧪 Testing

```bash
# Unit and integration tests
npm run test

# E2E tests (when configured)
npm run test:e2e

# Coverage
npm run test:coverage
```

## 🤝 Contributing

1. Create a branch for your feature: `git checkout -b feature/my-feature`
2. Commit changes: `git commit -m "Add my feature"`
3. Push to branch: `git push origin feature/my-feature`
4. Open a pull request

## 📞 Support

For questions or issues:

- Email: alu.astronomy@club.edu
- Instagram: @aluastronomyclub
- WhatsApp: [Link](https://wa.me/yourwhatsappnumber)

## 📄 License

© 2025 ALU Astronomy Club. All Rights Reserved.

## Roadmap

### Sprint 1 (Weeks 1–2)

- [x] Monorepo bootstrap
- [x] Home page with hero and mission/vision
- [x] Apply form with validation
- [x] API setup with `/api/apply` endpoint

### Sprint 2 (Weeks 3–4)

- [ ] Projects page + grid + modal
- [ ] Inspiration board (masonry + lightbox)
- [ ] Leadership page with team grid
- [ ] About page with timeline carousel

### Sprint 3 (Weeks 5–6)

- [ ] Firebase Firestore integration
- [ ] Email confirmation function
- [ ] Admin dashboard (future)
- [ ] Lighthouse audit & optimization
- [ ] Accessibility audit
- [ ] Documentation & Storybook

### Future (Post-Launch)

- [ ] Mobile app (React Native or Flutter)
- [ ] Admin panel for content management
- [ ] Advanced analytics
- [ ] Community forum or Discord integration

---

**Created**: 2025-10-21
**Last Updated**: 2025-10-21
