# 🚀 Guia de Deploy - LawyerHero Template

## 📋 **PLATAFORMAS SUPORTADAS**

### ✅ **Recomendadas (Fácil)**

- **Vercel** - Deploy automático, otimizado para Next.js
- **Netlify** - Deploy automático, boa performance
- **Railway** - Deploy simples, bom para projetos pequenos

### 🔧 **Avançadas (Configuração manual)**

- **AWS** - Amplify, EC2, S3 + CloudFront
- **Google Cloud** - App Engine, Cloud Run
- **DigitalOcean** - App Platform, Droplets
- **Heroku** - PaaS tradicional

### 📱 **Static Hosting (Export estático)**

- **GitHub Pages** - Gratuito, bom para demos
- **Surge.sh** - Deploy via CLI
- **Firebase Hosting** - Google, boa performance

---

## 🚀 **DEPLOY NO VERCEL (RECOMENDADO)**

### ⚡ **Deploy Automático (GitHub)**

#### **1. Preparar Repositório**

```bash
# Verificar se está tudo commitado
git status
git add .
git commit -m "feat: preparar para deploy Vercel"
git push origin main
```

#### **2. Conectar no Vercel**

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Clique em "New Project"
4. Importe seu repositório
5. Configure as variáveis de ambiente

#### **3. Variáveis de Ambiente**

```bash
# .env.local (para desenvolvimento)
NEXT_PUBLIC_SITE_URL=https://seusite.vercel.app
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_chave_publica
EMAILJS_SERVICE_ID=seu_service_id
EMAILJS_TEMPLATE_ID=seu_template_id

# No Vercel Dashboard, adicione:
NEXT_PUBLIC_SITE_URL=https://seusite.vercel.app
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_chave_publica
EMAILJS_SERVICE_ID=seu_service_id
EMAILJS_TEMPLATE_ID=seu_template_id
```

#### **4. Configurações do Projeto**

```json
// vercel.json (opcional)
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

#### **5. Deploy Automático**

- A cada `git push`, o Vercel faz deploy automático
- Preview deployments para cada PR
- Rollback fácil para versões anteriores

---

## 🌐 **DEPLOY NO NETLIFY**

### 📋 **Configuração Básica**

#### **1. Preparar Build**

```bash
# Build para produção
npm run build

# Verificar se build foi bem-sucedido
ls -la .next/
```

#### **2. Configurar Netlify**

1. Acesse [netlify.com](https://netlify.com)
2. Faça login e clique em "New site from Git"
3. Conecte com GitHub
4. Configure build settings:

```bash
# Build command
npm run build

# Publish directory
.next

# Node version
18.17.0
```

#### **3. Variáveis de Ambiente**

```bash
# No Netlify Dashboard > Site settings > Environment variables
NEXT_PUBLIC_SITE_URL=https://seusite.netlify.app
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_chave_publica
EMAILJS_SERVICE_ID=seu_service_id
EMAILJS_TEMPLATE_ID=seu_template_id
```

#### **4. Deploy Manual (se necessário)**

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=.next
```

---

## 📦 **DEPLOY ESTÁTICO (STATIC EXPORT)**

### 🎯 **Para GitHub Pages, Surge, Firebase**

#### **1. Configurar Next.js para Export**

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

#### **2. Build e Export**

```bash
# Build para produção
npm run build

# Export estático
npm run export

# Verificar arquivos gerados
ls -la out/
```

#### **3. Deploy no GitHub Pages**

```bash
# Criar branch gh-pages
git checkout -b gh-pages

# Adicionar arquivos estáticos
git add out/
git commit -m "feat: deploy estático para GitHub Pages"

# Push para GitHub
git push origin gh-pages

# No GitHub: Settings > Pages > Source: gh-pages branch
```

#### **4. Deploy no Surge.sh**

```bash
# Instalar Surge
npm install -g surge

# Deploy
cd out
surge

# Seguir instruções no terminal
```

#### **5. Deploy no Firebase**

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Inicializar projeto
firebase init hosting

# Deploy
firebase deploy
```

---

## ☁️ **DEPLOY NO AWS**

### 🚀 **AWS Amplify (Mais Fácil)**

#### **1. Conectar Repositório**

1. Acesse [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Clique em "New app" > "Host web app"
3. Conecte com GitHub
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

#### **2. Variáveis de Ambiente**

```bash
# No Amplify Console > Environment variables
NEXT_PUBLIC_SITE_URL=https://seuapp.amplifyapp.com
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_chave_publica
EMAILJS_SERVICE_ID=seu_service_id
EMAILJS_TEMPLATE_ID=seu_template_id
```

### 🐳 **AWS EC2 (Configuração Manual)**

#### **1. Preparar Instância**

```bash
# Conectar via SSH
ssh -i sua-chave.pem ubuntu@seu-ip

# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2
sudo npm install -g pm2
```

#### **2. Deploy da Aplicação**

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/lawyer-hero-envato.git
cd lawyer-hero-envato

# Instalar dependências
npm install

# Build para produção
npm run build

# Iniciar com PM2
pm2 start npm --name "lawyer-hero" -- start
pm2 startup
pm2 save
```

#### **3. Configurar Nginx**

```nginx
# /etc/nginx/sites-available/lawyer-hero
server {
    listen 80;
    server_name seusite.com www.seusite.com;

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

## 🔧 **CONFIGURAÇÕES AVANÇADAS**

### ⚙️ **Environment Variables**

#### **Arquivo .env.production**

```bash
# .env.production
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://seusite.com
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_chave_publica
EMAILJS_SERVICE_ID=seu_service_id
EMAILJS_TEMPLATE_ID=seu_template_id
```

#### **Verificação de Variáveis**

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
# Instalar
npm install --save-dev @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  // suas configurações
})

# Analisar bundle
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

#### **Configuração no Next.js**

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

## 📊 **MONITORAMENTO E ANALYTICS**

### 📈 **Google Analytics**

#### **1. Configuração**

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

#### **2. Implementação**

```tsx
// src/app/layout.tsx
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
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

### 📊 **Vercel Analytics (se usar Vercel)**

```bash
# Instalar
npm install @vercel/analytics

# Implementar
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

## 🚨 **SOLUÇÃO DE PROBLEMAS**

### ❌ **Erros Comuns**

#### **1. Build Falha**

```bash
# Verificar dependências
rm -rf node_modules package-lock.json
npm install

# Verificar TypeScript
npm run type-check

# Verificar ESLint
npm run lint

# Build limpo
npm run build
```

#### **2. Deploy Falha no Vercel**

```bash
# Verificar logs no Vercel Dashboard
# Verificar variáveis de ambiente
# Verificar versão do Node.js (18.17+)
# Verificar se build funciona localmente
```

#### **3. Imagens Não Carregam**

```bash
# Verificar next.config.js
# Verificar se imagens estão em public/
# Verificar se paths estão corretos
# Verificar se formato é suportado
```

#### **4. EmailJS Não Funciona**

```bash
# Verificar variáveis de ambiente
# Verificar se chaves estão corretas
# Verificar console do navegador
# Verificar se EmailJS está ativo
```

### 🔧 **Debug Local**

```bash
# Build local
npm run build

# Testar produção localmente
npm start

# Verificar logs
npm run dev 2>&1 | tee dev.log
```

---

## 📋 **CHECKLIST DE DEPLOY**

### ✅ **Pré-Deploy**

- [ ] `npm run lint` - Zero warnings
- [ ] `npm run type-check` - Zero errors
- [ ] `npm run build` - Build successful
- [ ] Testes passando
- [ ] Variáveis de ambiente configuradas
- [ ] Domínio configurado (se aplicável)

### ✅ **Deploy**

- [ ] Repositório conectado à plataforma
- [ ] Build automático configurado
- [ ] Variáveis de ambiente definidas
- [ ] Deploy bem-sucedido
- [ ] Site acessível

### ✅ **Pós-Deploy**

- [ ] Site carrega corretamente
- [ ] Todas as páginas funcionam
- [ ] Formulários funcionam
- [ ] Imagens carregam
- [ ] Responsivo em mobile
- [ ] Performance boa (Lighthouse)
- [ ] Analytics funcionando

---

## 🎯 **PRÓXIMOS PASSOS**

### 🚀 **Após Deploy Bem-Sucedido**

1. **Configurar domínio personalizado**
2. **Configurar SSL/HTTPS**
3. **Configurar CDN (se necessário)**
4. **Implementar monitoramento**
5. **Configurar backups**
6. **Documentar processo de deploy**

### 📈 **Melhorias Futuras**

- [ ] CI/CD pipeline
- [ ] Deploy automático por ambiente
- [ ] Rollback automático
- [ ] Monitoramento de performance
- [ ] Alertas de erro
- [ ] Backup automático

---

**🏆 Com este guia, você tem tudo para fazer deploy do LawyerHero Template em qualquer plataforma!** 🚀⚖️
