# 🚀 Guia de Deploy - LawyerHero

Este guia detalha como fazer o deploy do template LawyerHero em diferentes plataformas.

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta na plataforma de deploy escolhida
- Dados do advogado configurados em `src/config/lawyer.ts`
- EmailJS configurado (opcional, para formulário de contato)

## ⚡ Vercel (Recomendado)

### Deploy Automático via GitHub

1. **Faça fork do repositório** ou crie um novo repo com o código
2. **Conecte à Vercel**:

   - Acesse [vercel.com](https://vercel.com)
   - Clique em "Import Project"
   - Conecte sua conta GitHub
   - Selecione o repositório

3. **Configurações de Deploy**:

   ```bash
   # Build Command
   npm run build

   # Output Directory
   .next

   # Install Command
   npm install
   ```

4. **Variáveis de Ambiente** (opcional):
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=seu_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=seu_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_public_key
   ```

### Deploy Manual via CLI

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Faça login
vercel login

# Deploy
vercel

# Deploy de produção
vercel --prod
```

## 🔷 Netlify

### Via Git (Automático)

1. **Conecte o repositório**:

   - Acesse [netlify.com](https://netlify.com)
   - "New site from Git"
   - Conecte GitHub/GitLab

2. **Configurações de Build**:

   ```bash
   # Build command
   npm run build

   # Publish directory
   out
   ```

3. **Arquivo `netlify.toml`** (criar na raiz):

   ```toml
   [build]
     command = "npm run build"
     publish = "out"

   [build.environment]
     NODE_VERSION = "18"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### Deploy Manual

```bash
# Instale a CLI do Netlify
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=out
```

## ☁️ AWS S3 + CloudFront

### 1. Preparação

```bash
# Configure export estático no next.config.js
output: 'export',
trailingSlash: true,
images: {
  unoptimized: true
}

# Build
npm run build
```

### 2. S3 Setup

```bash
# Crie bucket S3
aws s3 mb s3://seu-site-advogado

# Configure hosting estático
aws s3 website s3://seu-site-advogado --index-document index.html

# Upload files
aws s3 sync out/ s3://seu-site-advogado --delete
```

### 3. CloudFront (opcional)

- Crie distribuição CloudFront
- Origin: seu bucket S3
- Configure SSL/TLS

## 🐳 Docker

### Dockerfile

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Deploy

```bash
# Build
docker build -t lawyer-hero .

# Run local
docker run -p 3000:3000 lawyer-hero

# Deploy para container registry
docker tag lawyer-hero:latest your-registry/lawyer-hero:latest
docker push your-registry/lawyer-hero:latest
```

## 📱 Configuração de Domínio

### DNS Configuration

```
# Para www e root domain
A    @      192.0.2.1    (IP do servidor)
CNAME www    @

# Para Vercel/Netlify
CNAME @      your-app.vercel.app
CNAME www    your-app.vercel.app
```

### SSL/HTTPS

- **Vercel/Netlify**: SSL automático
- **Cloudflare**: SSL gratuito + optimizações
- **Let's Encrypt**: SSL gratuito para VPS

## 🔧 Otimizações Pós-Deploy

### 1. Performance

```bash
# Análise de bundle
npm run analyze

# Lighthouse
npx lighthouse https://seusite.com

# Core Web Vitals
# Use Google PageSpeed Insights
```

### 2. SEO

- **Google Search Console**: Submita sitemap
- **Google Analytics**: Adicione tracking
- **Meta Tags**: Verifique og:image, description
- **Schema.org**: Dados estruturados incluídos

### 3. Monitoring

```javascript
// Web Vitals (adicionar ao _app.js)
export function reportWebVitals(metric) {
  console.log(metric);
  // Envie para analytics
}
```

## 🔐 Segurança

### Headers de Segurança

```javascript
// next.config.js - já configurado
headers: [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
];
```

### Variáveis de Ambiente

```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://seusite.com
NEXT_PUBLIC_EMAILJS_SERVICE_ID=seu_service_id

# Não committar .env.local
# Usar secrets da plataforma para produção
```

## 📊 Analytics e Tracking

### Google Analytics 4

```javascript
// lib/gtag.js
export const GA_TRACKING_ID = "G-XXXXXXXXXX";

export const pageview = (url) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};
```

### EmailJS Setup

1. **Crie conta** em [EmailJS](https://emailjs.com)
2. **Configure service** (Gmail, Outlook, etc.)
3. **Crie template** de email
4. **Adicione keys** nas env vars

## ✅ Checklist de Deploy

- [ ] Dados do advogado configurados
- [ ] EmailJS configurado (opcional)
- [ ] Meta tags e SEO otimizados
- [ ] Imagens otimizadas (WebP/AVIF)
- [ ] SSL configurado
- [ ] Domínio configurado
- [ ] Analytics configurado
- [ ] Lighthouse score 90+
- [ ] Teste em mobile
- [ ] Google Search Console configurado

## 🆘 Troubleshooting

### Build Errors

```bash
# Limpe cache
rm -rf .next node_modules
npm install
npm run build
```

### Performance Issues

```bash
# Analise bundle
npm run analyze

# Verifique imagens grandes
# Use next/image para otimização automática
```

### SEO Issues

```bash
# Verifique robots.txt
# Teste structured data
# Valide meta tags
```

## 📞 Suporte

- **Documentação**: [Next.js Docs](https://nextjs.org/docs)
- **Deploy Issues**: Verifique logs da plataforma
- **Performance**: Use Chrome DevTools
- **SEO**: Google Search Console

---

**Desenvolvido com ❤️ para advogados profissionais**
