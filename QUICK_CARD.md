# 📇 Quick Reference Card — ALU Astronomy Club

## 🚀 Quick Start (5 minutes)

```bash
npm install
cp apps/web/.env.local.example apps/web/.env.local
cp apps/api/.env.local.example apps/api/.env.local
# Edit .env.local files with Firebase credentials
npm run dev
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

---

## 📂 Key Directories

```
apps/web/src/
  ├── app/
  │   ├── layout.tsx          ← Root layout (fonts, styles)
  │   ├── page.tsx            ← Home page
  │   └── apply/page.tsx      ← Apply form
  └── components/
      ├── Navbar.tsx          ← Fixed navbar
      └── Footer.tsx          ← Global footer

apps/api/src/
  └── index.ts                ← Express server + /api/apply

packages/types/src/
  └── index.ts                ← Zod schemas
```

---

## 🎨 Colors (Use in Tailwind)

```
text-[#0b0c10]    Space black
text-[#1f2833]    Navy
text-[#45a29e]    Teal (primary)
text-[#66fcf1]    Cyan glow (highlight)

Or use theme colors:
text-space-black, text-teal, text-cyan-glow
```

---

## 📝 Common Commands

```bash
npm run dev              # Start all
npm run dev -- web      # Frontend only
npm run dev -- api      # Backend only
npm run build            # Build all
npm run lint             # Lint all
npm run type-check       # Type check all
npm run test             # Test all
```

---

## 🔗 Documentation Map

| Read | For |
|------|-----|
| `00_START_HERE.md` | Quick overview (2 min) |
| `GETTING_STARTED.md` | Local setup (15 min) |
| `PROJECT_SUMMARY.md` | What was built (20 min) |
| `docs/design-spec.md` | Full design (45 min) |
| `IMPLEMENTATION_GUIDE.md` | Build tasks (30 min) |
| `QUICK_REFERENCE.md` | Code snippets (10 min) |
| `INDEX.md` | Navigation (2 min) |
| `README.md` | Overview (20 min) |

---

## 🛠️ Add a New Page

1. Create `apps/web/src/app/pagename/page.tsx`
2. Use component template from QUICK_REFERENCE.md
3. Add navigation link in Navbar
4. Run `npm run dev`

---

## 🔌 Add an API Endpoint

1. Edit `apps/api/src/index.ts`
2. Use endpoint template from QUICK_REFERENCE.md
3. Add validation with Zod (from packages/types)
4. Test with curl or Postman

---

## 💾 Install Packages

```bash
# Frontend
npm install --workspace=@alu/web package-name

# Backend
npm install --workspace=@alu/api package-name

# Types (shared)
npm install --workspace=@alu/types package-name
```

---

## 🎨 Component Snippet

```tsx
'use client';

export default function Component() {
  return (
    <div className="p-4 rounded-lg bg-white/10 border border-white/20">
      <h1 className="font-orbitron font-bold text-[#66fcf1] mb-4">
        Title
      </h1>
      <p className="text-white/70">Content</p>
    </div>
  );
}
```

---

## ✨ Framer Motion Snippet

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  whileHover={{ scale: 1.05 }}
>
  Content
</motion.div>
```

---

## 🔐 Form Validation Snippet

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApplicationSchema } from '@types/index';

const { register, formState: { errors } } = useForm({
  resolver: zodResolver(ApplicationSchema),
});

// Use register() on inputs, check errors for display
```

---

## 🌐 Environment Variables

**Frontend** (`apps/web/.env.local`):
```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Backend** (`apps/api/.env.local`):
```env
FIREBASE_PROJECT_ID=...
FIREBASE_PRIVATE_KEY=...
PORT=3001
```

---

## 🚀 Deploy Commands

```bash
# Frontend (Vercel)
vercel --prod

# Backend (Render)
# Push to GitHub, Render auto-deploys

# Database (Firebase)
firebase deploy --functions
```

---

## 🐛 Troubleshooting

| Issue | Fix |
|-------|-----|
| Port 3000 in use | `npm run dev -- --port 3001` |
| Cannot find module | `npm install` |
| Firebase error | Check `.env.local` credentials |
| CORS error | Check `CORS_ORIGIN` in backend .env |

---

## 📚 Tech Stack

- **Frontend**: Next.js, React, Tailwind, Framer Motion
- **Backend**: Express, Node.js, Firebase
- **Database**: Firestore + Storage
- **DevOps**: GitHub Actions, Vercel, Render

---

## 🎯 Next Steps

1. **Setup**: [GETTING_STARTED.md](./GETTING_STARTED.md)
2. **Firebase**: Task 1.1 in [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)
3. **Build**: Follow remaining tasks in guide
4. **Deploy**: Use deploy commands above

---

## ✅ Before Commit

```bash
npm run lint          # Fix errors
npm run type-check    # Check types
npm run build         # Test build
# Then: git add, commit, push
```

---

## 📞 Need Help?

- **Setup**: See GETTING_STARTED.md → Troubleshooting
- **Code**: See QUICK_REFERENCE.md → Code snippets
- **Tasks**: See IMPLEMENTATION_GUIDE.md → Your sprint
- **Design**: See docs/design-spec.md
- **Navigation**: See INDEX.md

---

**Print this card. Keep it handy. Happy coding! 🌌✨**

Last updated: 2025-10-21
