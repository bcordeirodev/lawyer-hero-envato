# 📋 Template Guide - LawyerHero

## 🎯 **OVERVIEW**

**LawyerHero** is a professional template for lawyer landing pages, developed with Next.js 15, TypeScript, and Tailwind CSS. This guide explains the original template structure and how to use it effectively.

---

## 🏗️ **PROJECT STRUCTURE**

### **📁 Main Directories**

```
src/
├── app/                 # Next.js 15 App Router
│   ├── layout.tsx      # Main layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/          # React components
│   ├── layout/         # Header, Footer
│   ├── sections/       # Page sections
│   └── ui/            # Base components
├── config/             # Configurations
│   └── lawyer.ts      # Lawyer data
├── hooks/              # Custom hooks
├── lib/                # Utilities and functions
└── types/              # TypeScript definitions
```

### **🔧 Configuration Files**

- **`next.config.js`** - Next.js configuration
- **`tailwind.config.ts`** - Tailwind CSS configuration
- **`tsconfig.json`** - TypeScript configuration
- **`package.json`** - Dependencies and scripts

---

## 🎨 **DESIGN SYSTEM**

### **🎨 Color Palette**

```typescript
// Main colors (configurable)
primary: {
  50: '#eff6ff',    // Light blue
  500: '#3b82f6',   // Main blue
  900: '#1e3a8a',   // Dark blue
},
secondary: {
  500: '#f59e0b',   // Gold
  600: '#d97706',   // Dark gold
}
```

### **📱 Responsiveness**

- **Mobile First** - Design optimized for mobile devices
- **Breakpoints** - Automatic adaptation for tablets and desktops
- **Touch Friendly** - Elements optimized for touch

---

## ⚡ **MAIN FEATURES**

### **🚀 Performance**

- **Lazy Loading** - On-demand loading
- **Image Optimization** - Automatic image optimization
- **Bundle Splitting** - Smart code splitting
- **Core Web Vitals** - Optimized performance metrics

### **🔍 SEO**

- **Meta Tags** - Automatic SEO configuration
- **Structured Data** - Structured data for search engines
- **Sitemap** - Automatic sitemap generation
- **Robots.txt** - Crawler configuration

### **📱 Accessibility**

- **ARIA Labels** - Complete screen reader support
- **Keyboard Navigation** - Keyboard navigation
- **Color Contrast** - Adequate contrast for reading
- **Semantic HTML** - Semantic and structured HTML

---

## 🛠️ **MAIN COMPONENTS**

### **🎯 Hero Section**

```typescript
// src/components/sections/hero.tsx
export const Hero = () => {
  return (
    <section className="hero-section">
      <h1>{lawyer.name}</h1>
      <p>{lawyer.title}</p>
      <CTAButton />
    </section>
  );
};
```

### **📋 Services Section**

```typescript
// src/components/sections/services.tsx
export const Services = () => {
  return (
    <section className="services-section">
      {services.map((service) => (
        <ServiceCard key={service.id} {...service} />
      ))}
    </section>
  );
};
```

### **📞 Contact Section**

```typescript
// src/components/sections/contact.tsx
export const Contact = () => {
  return (
    <section className="contact-section">
      <ContactForm />
      <ContactInfo />
    </section>
  );
};
```

---

## 🔧 **QUICK SETUP**

### **1. Lawyer Data**

```typescript
// src/config/lawyer.ts
export const LAWYER_CONFIG: LawyerConfig = {
  lawyer: {
    name: "Dr. Your Name",
    title: "Attorney - Civil Law",
    description: "SEO Description",
    credentials: {
      bar: "BAR-123456",
      location: "New York, NY",
    },
  },
};
```

### **2. Services**

```typescript
export const SERVICES = [
  {
    id: "civil",
    title: "Civil Law",
    description: "Contracts, civil liability...",
    icon: "scale",
  },
];
```

### **3. Contact Information**

```typescript
export const CONTACT_INFO = {
  phone: "+1 555-123-4567",
  email: "contact@youremail.com",
  address: "123 Example St - New York, NY",
};
```

---

## 🚀 **AVAILABLE SCRIPTS**

### **Development**

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # Code verification
npm run type-check   # Type checking
```

### **Analysis**

```bash
npm run analyze      # Bundle analysis
npm run lighthouse   # Performance test
npm run test         # Run tests
```

---

## 📱 **MOBILE ADAPTATION**

### **Breakpoints**

```css
/* Mobile First */
.section {
  padding: 2rem 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .section {
    padding: 3rem 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .section {
    padding: 4rem 3rem;
  }
}
```

### **Touch Optimization**

- **Buttons** - Minimum 44x44px for touch
- **Links** - Adequate spacing between elements
- **Scroll** - Smooth and responsive scroll

---

## 🔍 **PERFORMANCE OPTIMIZATION**

### **Lazy Loading**

```typescript
// On-demand loading
const LazyComponent = lazy(() => import("./Component"));

// Suspense for loading
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>;
```

### **Image Optimization**

```typescript
import Image from "next/image";

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={true} // For LCP
/>;
```

---

## 🛡️ **SECURITY AND VALIDATION**

### **Form Validation**

```typescript
// Robust form validation
const { register, handleSubmit, errors } = useForm({
  resolver: yupResolver(contactSchema),
});
```

### **Error Boundaries**

```typescript
// Error handling
<ErrorBoundary fallback={<ErrorFallback />}>
  <Component />
</ErrorBoundary>
```

---

## 📚 **ADDITIONAL RESOURCES**

### **Documentation**

- **CUSTOMIZATION.md** - Complete customization guide
- **DEPLOYMENT.md** - Deployment instructions
- **README.md** - Main documentation

### **Support**

- **TypeScript** - Complete typing
- **ESLint** - Code standards
- **Prettier** - Automatic formatting
- **Husky** - Git hooks

---

## 🎯 **NEXT STEPS**

1. **Configure** lawyer data
2. **Customize** colors and styles
3. **Add** your contact information
4. **Test** on different devices
5. **Deploy** to chosen platform

---

**💡 Tip**: Use the `CUSTOMIZATION.md` file for detailed customization instructions and `DEPLOYMENT.md` for deployment instructions.

**🚀 Good luck with your project!**
