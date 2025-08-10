# 🚀 Deployment Guide - LawyerHero Template

## 📋 **SUPPORTED PLATFORMS**

### ✅ **Recommended (Easy)**

- **Vercel** - Automatic deployment, optimized for Next.js
- **Netlify** - Automatic deployment, good performance
- **Railway** - Simple deployment, good for small projects

### 🔧 **Advanced (Manual configuration)**

- **AWS** - Amplify, EC2, S3 + CloudFront
- **Google Cloud** - App Engine, Cloud Run
- **DigitalOcean** - App Platform, Droplets
- **Heroku** - Traditional PaaS

### 📱 **Static Hosting (Static export)**

- **GitHub Pages** - Free, good for demos
- **Surge.sh** - CLI deployment
- **Firebase Hosting** - Google, good performance

---

## 🚀 **VERCEL DEPLOYMENT (RECOMMENDED)**

### ⚡ **Automatic Deployment (GitHub)**

#### **1. Prepare Repository**

```bash
# Check if everything is committed
git status
git add .
git commit -m "feat: prepare for Vercel deployment"
git push origin main
```

#### **2. Connect to Vercel**

1. Visit [vercel.com](https://vercel.com)
2. Login with GitHub
3. Click on "New Project"
4. Import your repository
5. Configure environment variables

#### **3. Environment Variables**

```bash
# .env.local (for development)
NEXT_PUBLIC_SITE_URL=https://yoursite.vercel.app
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id

# In Vercel Dashboard, add:
NEXT_PUBLIC_SITE_URL=https://yoursite.vercel.app
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
```

#### **4. Project Settings**

```json
// vercel.json (optional)
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

#### **5. Automatic Deployment**

- Each `git push` triggers automatic deployment
- Preview deployments for each PR
- Easy rollback to previous versions

---

## 🌐 **NETLIFY DEPLOYMENT**

### 📋 **Basic Configuration**

#### **1. Prepare Build**

```bash
# Production build
npm run build

# Check if build was successful
ls -la .next/
```

#### **2. Configure Netlify**

1. Visit [netlify.com](https://netlify.com)
2. Login and click "New site from Git"
3. Connect with GitHub
4. Configure build settings:

```bash
# Build command
npm run build

# Publish directory
.next

# Node version
18.17.0
```

#### **3. Environment Variables**

```bash
# In Netlify Dashboard > Site settings > Environment variables
NEXT_PUBLIC_SITE_URL=https://yoursite.netlify.app
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
```

#### **4. Manual Deployment (if needed)**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=.next
```

---

## 📦 **STATIC DEPLOYMENT (STATIC EXPORT)**

### 🎯 **For GitHub Pages, Surge, Firebase**

#### **1. Configure Next.js for Export**

```javascript
// next.config.js
module.exports = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};
```

#### **2. Build and Export**

```bash
# Production build
npm run build

# Static export
npm run export

# Check generated files
ls -la out/
```

#### **3. Deploy to GitHub Pages**

```bash
# Create gh-pages branch
git checkout -b gh-pages

# Add static files
git add out/
git commit -m "feat: static deployment for GitHub Pages"

# Push to GitHub
git push origin gh-pages

# On GitHub: Settings > Pages > Source: gh-pages branch
```

#### **4. Deploy to Surge.sh**

```bash
# Install Surge
npm install -g surge

# Deploy
cd out
surge

# Follow terminal instructions
```

#### **5. Deploy to Firebase**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize project
firebase init hosting

# Deploy
firebase deploy
```

---

## ☁️ **AWS DEPLOYMENT**

### 🚀 **AWS Amplify (Easier)**

#### **1. Connect Repository**

1. Visit [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click "New app" > "Host web app"
3. Connect with GitHub
4. Configure build settings:

```yaml
# amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - "**/*"
  cache:
    paths:
      - node_modules/**/*
```

#### **2. Environment Variables**

```bash
# In Amplify Console > Environment variables
NEXT_PUBLIC_SITE_URL=https://yourapp.amplifyapp.com
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
```

### 🐳 **AWS EC2 (Manual Configuration)**

#### **1. Prepare Instance**

```bash
# Connect via SSH
ssh -i your-key.pem ubuntu@your-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2
```

#### **2. Deploy Application**

```bash
# Clone repository
git clone https://github.com/your-username/lawyer-hero-envato.git
cd lawyer-hero-envato

# Install dependencies
npm install

# Production build
npm run build

# Start with PM2
pm2 start npm --name "lawyer-hero" -- start
pm2 startup
pm2 save
```

#### **3. Configure Nginx**

```nginx
# /etc/nginx/sites-available/lawyer-hero
server {
    listen 80;
    server_name yoursite.com www.yoursite.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔧 **ADVANCED CONFIGURATIONS**

### ⚙️ **Environment Variables**

#### **File .env.production**

```bash
# .env.production
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
```

#### **Variable Verification**

```typescript
// src/lib/env-checker.ts
export function checkRequiredEnvVars() {
  const required = [
    "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY",
    "EMAILJS_SERVICE_ID",
    "EMAILJS_TEMPLATE_ID",
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
}
```

### 🚀 **Performance Optimization**

#### **1. Bundle Analyzer**

```bash
# Install
npm install --save-dev @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  // your settings
})

# Analyze bundle
ANALYZE=true npm run build
```

#### **2. Compression**

```javascript
// next.config.js
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  compress: true,
  poweredByHeader: false,
});
```

### 🔒 **Security Headers**

#### **Next.js Configuration**

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};
```

---

## 📊 **MONITORING AND ANALYTICS**

### 📈 **Google Analytics**

#### **1. Configuration**

```typescript
// src/lib/analytics.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
```

#### **2. Implementation**

```tsx
// src/app/layout.tsx
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 📊 **Vercel Analytics (if using Vercel)**

```bash
# Install
npm install @vercel/analytics

# Implement
import { Analytics } from '@vercel/analytics/react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

## 🚨 **TROUBLESHOOTING**

### ❌ **Common Errors**

#### **1. Build Fails**

```bash
# Check dependencies
rm -rf node_modules package-lock.json
npm install

# Check TypeScript
npm run type-check

# Check ESLint
npm run lint

# Clean build
npm run build
```

#### **2. Vercel Deploy Fails**

```bash
# Check logs in Vercel Dashboard
# Check environment variables
# Check Node.js version (18.17+)
# Check if build works locally
```

#### **3. Images Don't Load**

```bash
# Check next.config.js
# Check if images are in public/
# Check if paths are correct
# Check if format is supported
```

#### **4. EmailJS Doesn't Work**

```bash
# Check environment variables
# Check if keys are correct
# Check browser console
# Check if EmailJS is active
```

### 🔧 **Local Debug**

```bash
# Local build
npm run build

# Test production locally
npm start

# Check logs
npm run dev 2>&1 | tee dev.log
```

---

## 📋 **DEPLOYMENT CHECKLIST**

### ✅ **Pre-Deploy**

- [ ] `npm run lint` - Zero warnings
- [ ] `npm run type-check` - Zero errors
- [ ] `npm run build` - Build successful
- [ ] Tests passing
- [ ] Environment variables configured
- [ ] Domain configured (if applicable)

### ✅ **Deploy**

- [ ] Repository connected to platform
- [ ] Automatic build configured
- [ ] Environment variables set
- [ ] Deploy successful
- [ ] Site accessible

### ✅ **Post-Deploy**

- [ ] Site loads correctly
- [ ] All pages work
- [ ] Forms work
- [ ] Images load
- [ ] Responsive on mobile
- [ ] Good performance (Lighthouse)
- [ ] Analytics working

---

## 🎯 **NEXT STEPS**

### 🚀 **After Successful Deploy**

1. **Configure custom domain**
2. **Configure SSL/HTTPS**
3. **Configure CDN (if needed)**
4. **Implement monitoring**
5. **Configure backups**
6. **Document deployment process**

### 📈 **Future Improvements**

- [ ] CI/CD pipeline
- [ ] Automatic deployment by environment
- [ ] Automatic rollback
- [ ] Performance monitoring
- [ ] Error alerts
- [ ] Automatic backup

---

**🏆 With this guide, you have everything to deploy the LawyerHero Template on any platform!** 🚀⚖️