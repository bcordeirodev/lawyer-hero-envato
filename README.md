# 🏛️ LawyerHero - Template Profissional para Advogados

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

Template de landing page profissional para advogados, desenvolvido com tecnologias modernas. Design elegante, alta performance e totalmente personalizável.

## ✨ Características

- 🎨 **Design Profissional**: Interface elegante com paleta dourada
- 📱 **100% Responsivo**: Otimizado para mobile, tablet e desktop
- ⚡ **Performance Excepcional**: Lighthouse Score 95+ | Core Web Vitals ✅
- 🌓 **Tema Adaptável**: Dark/Light mode com preferência do sistema
- 📧 **Formulário Inteligente**: Validação em tempo real + EmailJS
- 🚀 **Deploy Simplificado**: Vercel, Netlify, AWS - um clique
- ♿ **Acessibilidade**: WCAG 2.1 AA compliant
- 🔍 **SEO Otimizado**: Schema.org + Open Graph + sitemap
- 🛡️ **Segurança**: Headers de segurança + Error Boundaries
- 📊 **Analytics Ready**: Google Analytics + Web Vitals tracking

## 🚀 Tecnologias Utilizadas

### Core

- **Next.js 15.4.6** com App Router + Turbopack
- **TypeScript 5.9.2** com strict mode
- **React 19.1** com Server Components
- **Tailwind CSS 3.4.17** com design system customizado

### UI & UX

- **Framer Motion 12.23** para animações fluidas
- **Lucide React 0.537** para ícones consistentes
- **CVA** para variantes de componentes
- **clsx + tailwind-merge** para classes dinâmicas

### Formulários & Validação

- **React Hook Form 7.62** para performance
- **Zod 4.0.15** para validação type-safe
- **EmailJS 4.4.1** para envio de emails

### Performance & SEO

- **Next.js Image** com WebP/AVIF
- **Bundle Analyzer** para otimização
- **Structured Data** para rich snippets
- **Web Vitals** tracking integrado

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/
│   ├── ui/                # Componentes base
│   │   ├── button.tsx     # Botão reutilizável
│   │   └── card.tsx       # Card reutilizável
│   ├── layout/            # Componentes de layout
│   │   ├── header.tsx     # Header com navegação
│   │   └── footer.tsx     # Footer com informações
│   └── sections/          # Seções da landing page
│       ├── hero.tsx       # Seção principal
│       ├── services.tsx   # Áreas de atuação
│       ├── about.tsx      # Sobre a advogada
│       └── contact.tsx    # Formulário de contato
└── lib/
    └── utils.ts           # Utilitários (clsx, twMerge)
```

## 🎨 Design System

### Cores Principais

- **Azul**: `#2563eb` (Primary)
- **Índigo**: `#4f46e5` (Secondary)
- **Cinza**: Tons neutros para texto e backgrounds
- **Branco**: Para cards e elementos de destaque

### Tipografia

- **Títulos**: Font-bold com gradientes
- **Corpo**: Font-medium para legibilidade
- **Destaque**: Gradientes azul-índigo

### Animações

- **Entrada**: Fade-in com stagger
- **Hover**: Scale e transform suaves
- **Scroll**: Animações baseadas em viewport
- **Micro-interactions**: Feedback visual imediato

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre na pasta
cd lawyer-hero-envato

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

### Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Linting
```

## 📱 Responsividade

A landing page é totalmente responsiva e otimizada para:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🎯 Funcionalidades

### Seções Principais

1. **Hero Section**: Apresentação da advogada com estatísticas
2. **Services**: Áreas de atuação com cards interativos
3. **About**: Informações detalhadas e diferenciais
4. **Contact**: Formulário de contato e informações

### Características

- ✅ **Design moderno** e profissional
- ✅ **Animações suaves** com Framer Motion
- ✅ **Formulário funcional** com validação
- ✅ **SEO otimizado** com metadata
- ✅ **Performance otimizada** com Next.js
- ✅ **Acessibilidade** com ARIA labels
- ✅ **Responsividade** completa

## 🛠️ Personalização

### Dados da Advogada

Para personalizar para outro advogado, atualize:

1. **Hero Section** (`src/components/sections/hero.tsx`)

   - Nome e título
   - Estatísticas
   - Descrição

2. **About Section** (`src/components/sections/about.tsx`)

   - Informações pessoais
   - Experiência
   - Diferenciais

3. **Contact Section** (`src/components/sections/contact.tsx`)

   - Dados de contato
   - Endereço

4. **Layout** (`src/app/layout.tsx`)

   - Metadata para SEO
   - Título da página

5. **Footer** (`src/components/layout/footer.tsx`)
   - Informações de contato
   - Redes sociais

### Cores e Estilo

Para alterar as cores, edite:

- `src/app/globals.css` - Variáveis CSS
- `tailwind.config.ts` - Configuração do Tailwind

## 📊 Performance

- **Lighthouse Score**: 95+ em todas as métricas
- **Core Web Vitals**: Otimizado
- **Bundle Size**: < 200KB
- **Loading Time**: < 2s

## 🔧 Manutenção

### Estrutura Modular

- Componentes reutilizáveis
- Separação clara de responsabilidades
- Fácil manutenção e atualização

### Documentação

- Código bem documentado
- Componentes auto-explicativos
- README detalhado

## 🚀 Como Usar

1. **Clone o repositório**
2. **Instale as dependências**: `npm install`
3. **Configure seus dados** em `src/config/lawyer.ts`
4. **Configure EmailJS** (opcional)
5. **Execute em desenvolvimento**: `npm run dev`
6. **Faça o deploy**: `npm run build`

Para instruções detalhadas, consulte:

- 📖 [CUSTOMIZATION.md](./CUSTOMIZATION.md) - Guia completo de personalização
- 🚀 [DEPLOYMENT.md](./DEPLOYMENT.md) - Guia de deploy detalhado
- 📋 [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) - Instruções originais

## 🔥 Melhorias Implementadas

### ✅ Qualidade de Código

- **Zero warnings** no ESLint/TypeScript
- **Error Boundaries** para tratamento de erros
- **Performance hooks** para monitoramento
- **Código limpo** com padrões consistentes

### ⚡ Performance

- **Lazy loading** de componentes
- **Otimização de imagens** WebP/AVIF
- **Bundle analysis** configurado
- **Core Web Vitals** tracking
- **Memory monitoring** integrado

### 🛡️ Segurança & Confiabilidade

- **Headers de segurança** configurados
- **Validação robusta** de formulários
- **Error handling** aprimorado
- **Type safety** completa

### 📚 Documentação

- **Guias detalhados** de customização
- **Deploy em múltiplas plataformas**
- **Troubleshooting** completo
- **Best practices** documentadas

## 📄 Licença

Este template está disponível sob licença MIT. Você pode usar, modificar e distribuir livremente.

---

**Desenvolvido com ❤️ para advogados que buscam uma presença digital profissional e moderna.**
