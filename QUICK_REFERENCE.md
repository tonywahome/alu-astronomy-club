# Quick Reference — ALU Astronomy Club Dev

A cheat sheet for common tasks and configurations.

## 🚀 Quick Start

```bash
git clone https://github.com/tonywahome/alu-astronomy-club.git
cd alu-astronomy-club
npm install
cp apps/web/.env.local.example apps/web/.env.local
cp apps/api/.env.local.example apps/api/.env.local
# Fill in Firebase config in .env.local files
npm run dev
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

---

## 📁 Key Files & Where to Edit

| Task                   | File(s)                                     |
| ---------------------- | ------------------------------------------- |
| **Add a new page**     | `apps/web/src/app/[page]/page.tsx`          |
| **Create a component** | `apps/web/src/components/ComponentName.tsx` |
| **Add an API route**   | `apps/api/src/index.ts`                     |
| **Update types**       | `packages/types/src/index.ts`               |
| **Global styles**      | `apps/web/src/globals.css`                  |
| **Tailwind config**    | `apps/web/tailwind.config.js`               |
| **Next.js config**     | `apps/web/next.config.js`                   |
| **API error handler**  | `apps/api/src/index.ts` (error middleware)  |

---

## 🎨 Color Palette

Add to any Tailwind class:

```
text-[#0b0c10]   // Space black (bg)
text-[#1f2833]   // Navy (cards)
text-[#45a29e]   // Teal (accents)
text-[#66fcf1]   // Cyan glow (highlights)
```

Or use Tailwind theme colors (pre-configured):

```
bg-space-black, text-teal, text-cyan-glow
```

---

## 📝 Component Template

```tsx
"use client"; // If using hooks/browser APIs

import { ReactNode } from "react";

interface ComponentProps {
  title: string;
  children?: ReactNode;
}

export default function Component({ title, children }: ComponentProps) {
  return (
    <div className="p-4 rounded-lg bg-white/10">
      <h1 className="font-orbitron font-bold text-[#66fcf1]">{title}</h1>
      {children}
    </div>
  );
}
```

---

## 🔗 Form Validation Example

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "At least 10 chars"),
});

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      <button type="submit">Send</button>
    </form>
  );
}
```

---

## ✨ Framer Motion Snippets

### Fade in on scroll

```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  Content
</motion.div>;
```

### Hover scale

```tsx
<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  Click me
</motion.button>
```

### Stagger children

```tsx
<motion.div
  initial="initial"
  animate="animate"
  variants={{
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }}
>
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.name}
    </motion.div>
  ))}
</motion.div>
```

---

## 🛠️ API Endpoint Template

```typescript
app.post("/api/my-endpoint", async (req, res) => {
  try {
    const { field1, field2 } = req.body;

    // Validate
    if (!field1) {
      return res.status(400).json({
        code: "VALIDATION_ERROR",
        message: "field1 is required",
      });
    }

    // Business logic
    const result = await db.collection("items").add({ field1, field2 });

    return res.status(201).json({
      id: result.id,
      message: "Success",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      code: "SERVER_ERROR",
      message: "Something went wrong",
    });
  }
});
```

---

## 🔐 Environment Variables

### Frontend (`apps/web/.env.local`)

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (`apps/api/.env.local`)

```env
PORT=3001
FIREBASE_PROJECT_ID=...
FIREBASE_PRIVATE_KEY=...
```

---

## 📦 Installing Packages

```bash
# Add to frontend
npm install --workspace=@alu/web package-name

# Add to backend
npm install --workspace=@alu/api package-name

# Add to types
npm install --workspace=@alu/types package-name

# Add to root (dev only)
npm install --workspace=. --save-dev package-name
```

---

## 🧪 Running Tests

```bash
# All
npm run test

# Specific workspace
npm run test -- web
npm run test -- api
```

---

## 🚢 Deployment Checklist

### Before deployment:

- [ ] All tests pass: `npm run test`
- [ ] No lint errors: `npm run lint`
- [ ] Build succeeds: `npm run build`
- [ ] Lighthouse score ≥ 90
- [ ] Environment vars set in hosting platform
- [ ] Firebase security rules reviewed
- [ ] Rate limiting configured

### Deploy frontend (Vercel):

```bash
vercel --prod
```

### Deploy backend (Render):

```bash
# Push to GitHub, Render auto-deploys on push
git push origin main
```

---

## 🐛 Debug Mode

### Frontend

Open browser DevTools (F12):

- Network: Check API calls
- Console: See client errors
- Application: Check localStorage, cookies

### Backend

```bash
DEBUG=* npm run dev -- api
```

### Database

Visit Firebase Console:

- Firestore: View documents
- Storage: Check file uploads
- Authentication: Manage users

---

## 📊 Performance Tips

- Use `<Image>` from Next.js (auto optimization)
- Lazy-load modals and heavy components
- Enable gzip compression in Express
- Cache static assets with headers
- Monitor Lighthouse scores

---

## 🔍 Common Errors & Fixes

| Error                        | Cause                | Fix                                 |
| ---------------------------- | -------------------- | ----------------------------------- |
| `Cannot find module 'react'` | Missing deps         | `npm install`                       |
| `EADDRINUSE` port 3000       | Port in use          | Change port or kill process         |
| `Firebase not initialized`   | No credentials       | Check `.env.local`                  |
| `CORS error`                 | Cross-origin blocked | Check `CORS_ORIGIN` in `.env.local` |
| `Module not found '@/...'`   | Path alias           | Check `tsconfig.json` `paths`       |

---

## 📚 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Firebase Console](https://console.firebase.google.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod Docs](https://zod.dev)

---

**Last updated**: 2025-10-21
