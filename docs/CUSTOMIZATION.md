# 🎨 Customization Guide - LawyerHero Template

## 🚀 **QUICK START**

### 📋 **Minimum Requirements**

- **Node.js**: 18.17+ (recommended: 20.x LTS)
- **npm**: 9.x+ or **yarn**: 1.22+
- **Git**: For version control

### ⚡ **3-Step Installation**

```bash
# 1. Clone/download the template
git clone [REPOSITORY_URL]
cd lawyer-hero-envato

# 2. Install dependencies
npm install

# 3. Run in development
npm run dev
```

**🎯 Result**: Site running at `http://localhost:3000`

---

## 🔧 **MAIN CONFIGURATION**

### 📝 **1. Lawyer Data (`src/config/lawyer.ts`)**

#### **Basic Information**

```typescript
export const LAWYER_CONFIG: LawyerConfig = {
  lawyer: {
    name: "Dr. [YOUR_NAME]", // Full name
    fullName: "[FULL_NAME]", // Official full name
    title: "Attorney - [PRACTICE_AREAS]", // Professional title
    description: "[SHORT_DESCRIPTION]", // SEO description
    detailedDescription: "[DETAILED_DESCRIPTION]", // Complete description

    credentials: {
      bar: "BAR-[NUMBER]", // Bar registration
      location: "[CITY], [STATE]", // Location
    },
  },
};
```

#### **⚠️ IMPORTANT - Ethical Compliance**

- Do **NOT** use "specialist" without official certification
- Do **NOT** promise specific results
- Do **NOT** use unproven superlatives
- Do use neutral and professional language

**✅ Correct Example:**

```typescript
title: "Attorney - Civil and Business Law Practice";
description: "Attorney with experience in legal practice...";
```

**❌ Incorrect Example:**

```typescript
title: "Civil Law Specialist"; // Without certification
description: "Best lawyer in town"; // Superlative
```

### 🎨 **2. Colors and Theme (`tailwind.config.ts`)**

#### **Main Palette**

```typescript
colors: {
  primary: {
    50: '#eff6ff',    // Light blue
    500: '#3b82f6',   // Main blue
    900: '#1e3a8a',   // Dark blue
  },
  secondary: {
    500: '#f59e0b',   // Gold
    600: '#d97706',   // Dark gold
  }
}
```

#### **Custom Themes**

```typescript
// src/lib/design-tokens.ts
export const THEME_COLORS = {
  light: {
    background: "#ffffff",
    text: "#1f2937",
    accent: "#3b82f6",
  },
  dark: {
    background: "#111827",
    text: "#f9fafb",
    accent: "#60a5fa",
  },
};
```

### 📱 **3. Layout and Responsiveness**

#### **Tailwind Breakpoints**

```css
/* src/app/globals.css */
@screen sm {
  /* 640px+ */
}
@screen md {
  /* 768px+ */
}
@screen lg {
  /* 1024px+ */
}
@screen xl {
  /* 1280px+ */
}
@screen 2xl {
  /* 1536px+ */
}
```

#### **Responsive Components**

```tsx
// Example of responsive component
<div
  className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-4 
  md:gap-6 
  lg:gap-8
"
>
  {/* Content */}
</div>
```

---

## 🎯 **ADVANCED CUSTOMIZATION**

### 🧩 **1. Reusable Components**

#### **Create New Component**

```tsx
// src/components/sections/[new-component].tsx
import { motion } from "framer-motion";
import { SectionBadge } from "@/components/ui/design-system";

export function NewComponent() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <SectionBadge>New Feature</SectionBadge>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8"
        >
          Component Title
        </motion.h2>
        {/* Content */}
      </div>
    </section>
  );
}
```

#### **Register in Layout**

```tsx
// src/app/page.tsx
import { NewComponent } from "@/components/sections/new-component";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <NewComponent /> {/* Add here */}
      <About />
      <Contact />
    </main>
  );
}
```

### 🎭 **2. Animations with Framer Motion**

#### **Basic Animations**

```tsx
import { motion } from 'framer-motion'

// Simple fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Animated content
</motion.div>

// Slide in from left
<motion.div
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  Sliding content
</motion.div>
```

#### **Advanced Animations**

```tsx
// src/lib/animations/animations.ts
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const fadeInUp = {
  hidden: { y: 60, opacity: 0 },
  show: { y: 0, opacity: 1 },
};
```

### 🔍 **3. SEO and Metadata**

#### **Page Metadata**

```tsx
// src/app/[page]/page.tsx
import { Metadata } from "next";
import { generateMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Custom Title",
  description: "Custom page description",
  image: "/images/specific-page.jpg",
});
```

#### **Structured Data (Schema.org)**

```tsx
// src/components/common/StructuredData.tsx
export function LawyerStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: LAWYER_CONFIG.lawyer.name,
    description: LAWYER_CONFIG.lawyer.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "New York",
      addressRegion: "NY",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

---

## 🎨 **DESIGN SYSTEM**

### 🎯 **1. Base Components**

#### **Buttons**

```tsx
// src/components/ui/primitives/button.tsx
<Button variant="primary" size="lg">
  Primary Button
</Button>

<Button variant="secondary" size="md">
  Secondary Button
</Button>

<Button variant="outline" size="sm">
  Outline Button
</Button>
```

#### **Cards**

```tsx
// src/components/ui/primitives/card.tsx
<Card className="hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>Card content</CardContent>
</Card>
```

### 🌈 **2. Color System**

#### **CSS Variables**

```css
/* src/app/globals.css */
:root {
  --color-primary: 59 130 246; /* #3b82f6 */
  --color-secondary: 245 158 11; /* #f59e0b */
  --color-success: 34 197 94; /* #22c55e */
  --color-warning: 251 146 60; /* #fb923c */
  --color-error: 239 68 68; /* #ef4444 */
}

/* Usage with Tailwind */
.bg-primary {
  background-color: rgb(var(--color-primary));
}
.text-primary {
  color: rgb(var(--color-primary));
}
```

#### **Gradients**

```tsx
// src/components/ui/design-system/GradientIcon.tsx
<div className="bg-gradient-to-r from-primary-500 to-secondary-500">
  Content with gradient
</div>
```

---

## 📱 **RESPONSIVENESS**

### 📐 **1. Grid System**

#### **Responsive Layout**

```tsx
<div
  className="
  grid 
  grid-cols-1          /* Mobile: 1 column */
  sm:grid-cols-2       /* Small: 2 columns */
  md:grid-cols-3       /* Medium: 3 columns */
  lg:grid-cols-4       /* Large: 4 columns */
  gap-4                /* Base spacing */
  md:gap-6             /* Medium spacing */
  lg:gap-8             /* Large spacing */
"
>
  {/* Grid items */}
</div>
```

#### **Responsive Flexbox**

```tsx
<div
  className="
  flex 
  flex-col             /* Mobile: column */
  md:flex-row          /* Medium+: row */
  items-center         /* Center items */
  justify-between      /* Space between items */
  gap-4                /* Spacing */
  md:gap-8             /* Medium spacing */
"
>
  {/* Flexible content */}
</div>
```

### 🖼️ **2. Responsive Images**

#### **Next.js Image**

```tsx
import Image from "next/image";

<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  className="
    w-full 
    h-auto 
    object-cover
    rounded-lg
    shadow-lg
  "
  priority // For above-the-fold images
/>;
```

#### **Background Images**

```tsx
<div
  className="
    bg-cover 
    bg-center 
    bg-no-repeat
    h-64 
    md:h-96 
    lg:h-[500px]
  "
  style={{
    backgroundImage: "url('/images/background.jpg')",
  }}
>
  {/* Content over image */}
</div>
```

---

## 🚀 **PERFORMANCE**

### ⚡ **1. Image Optimizations**

#### **Modern Formats**

```tsx
// next.config.js
module.exports = {
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

#### **Lazy Loading**

```tsx
// src/lib/performance/lazy-loading.ts
export function useLazyLoad() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
```

### 📊 **2. Performance Monitoring**

#### **Web Vitals**

```tsx
// src/hooks/usePerformance.ts
export function usePerformance() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("web-vitals").then(
        ({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
          getCLS(console.log);
          getFID(console.log);
          getFCP(console.log);
          getLCP(console.log);
          getTTFB(console.log);
        }
      );
    }
  }, []);
}
```

---

## 🔧 **ADVANCED CONFIGURATIONS**

### ⚙️ **1. Environment Variables**

#### **File .env.local**

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
```

#### **Usage in Code**

```tsx
// src/lib/env.ts
export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  emailjs: {
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
    serviceId: process.env.EMAILJS_SERVICE_ID || "",
    templateId: process.env.EMAILJS_TEMPLATE_ID || "",
  },
};
```

### 🎨 **2. Dynamic Theme**

#### **Theme Context**

```tsx
// src/contexts/ThemeContext.tsx
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

---

## 📚 **ADDITIONAL RESOURCES**

### 🔗 **1. Useful Links**

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### 📖 **2. Reference Files**

- `src/config/lawyer.ts` - Main configuration
- `src/lib/design-tokens.ts` - Design tokens
- `src/components/ui/` - Base components
- `tailwind.config.ts` - Tailwind configuration

### 🎯 **3. Next Steps**

1. **Customize data** in `src/config/lawyer.ts`
2. **Adjust colors** in `tailwind.config.ts`
3. **Modify layout** in components
4. **Add specific** content
5. **Test responsiveness** on different devices
6. **Optimize performance** with Lighthouse

---

**🏆 With this guide, you have everything to customize the LawyerHero Template and create a unique professional website for your law practice!** ⚖️✨
