# 🎨 Guia de Personalização - LawyerHero Template

## 🚀 **INÍCIO RÁPIDO**

### 📋 **Requisitos Mínimos**

- **Node.js**: 18.17+ (recomendado: 20.x LTS)
- **npm**: 9.x+ ou **yarn**: 1.22+
- **Git**: Para controle de versão

### ⚡ **Instalação em 3 Passos**

```bash
# 1. Clonar/baixar o template
git clone [URL_DO_REPOSITORIO]
cd lawyer-hero-envato

# 2. Instalar dependências
npm install

# 3. Rodar em desenvolvimento
npm run dev
```

**🎯 Resultado**: Site rodando em `http://localhost:3000`

---

## 🔧 **CONFIGURAÇÃO PRINCIPAL**

### 📝 **1. Dados do Advogado (`src/config/lawyer.ts`)**

#### **Informações Básicas**

```typescript
export const LAWYER_CONFIG: LawyerConfig = {
  lawyer: {
    name: "Dr. [SEU_NOME]", // Nome completo
    fullName: "[NOME_COMPLETO]", // Nome completo oficial
    title: "Advogado - [AREAS_ATUACAO]", // Título profissional
    description: "[DESCRICAO_CURTA]", // Descrição para SEO
    detailedDescription: "[DESCRICAO_DETALHADA]", // Descrição completa

    credentials: {
      bar: "OAB-[ESTADO] [NUMERO]", // Inscrição OAB
      location: "[CIDADE], [ESTADO]", // Localização
    },
  },
};
```

#### **⚠️ IMPORTANTE - Conformidade Ética**

- **NÃO** use "especialista" sem certificação oficial
- **NÃO** prometa resultados específicos
- **NÃO** use superlativos não comprovados
- **SIM** use linguagem neutra e profissional

**✅ Exemplo Correto:**

```typescript
title: "Advogado - Atuação em Direito Civil e Empresarial";
description: "Advogado com experiência na área jurídica...";
```

**❌ Exemplo Incorreto:**

```typescript
title: "Especialista em Direito Civil"; // Sem certificação
description: "Melhor advogado da cidade"; // Superlativo
```

### 🎨 **2. Cores e Tema (`tailwind.config.ts`)**

#### **Paleta Principal**

```typescript
colors: {
  primary: {
    50: '#eff6ff',    // Azul claro
    500: '#3b82f6',   // Azul principal
    900: '#1e3a8a',   // Azul escuro
  },
  secondary: {
    500: '#f59e0b',   // Dourado
    600: '#d97706',   // Dourado escuro
  }
}
```

#### **Temas Personalizados**

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

### 📱 **3. Layout e Responsividade**

#### **Breakpoints Tailwind**

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

#### **Componentes Responsivos**

```tsx
// Exemplo de componente responsivo
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
  {/* Conteúdo */}
</div>
```

---

## 🎯 **PERSONALIZAÇÃO AVANÇADA**

### 🧩 **1. Componentes Reutilizáveis**

#### **Criar Novo Componente**

```tsx
// src/components/sections/[novo-componente].tsx
import { motion } from "framer-motion";
import { SectionBadge } from "@/components/ui/design-system";

export function NovoComponente() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <SectionBadge>Novo Recurso</SectionBadge>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8"
        >
          Título do Componente
        </motion.h2>
        {/* Conteúdo */}
      </div>
    </section>
  );
}
```

#### **Registrar no Layout**

```tsx
// src/app/page.tsx
import { NovoComponente } from "@/components/sections/novo-componente";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <NovoComponente /> {/* Adicionar aqui */}
      <About />
      <Contact />
    </main>
  );
}
```

### 🎭 **2. Animações com Framer Motion**

#### **Animações Básicas**

```tsx
import { motion } from 'framer-motion'

// Fade in simples
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Conteúdo animado
</motion.div>

// Slide in da esquerda
<motion.div
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  Conteúdo deslizante
</motion.div>
```

#### **Animações Avançadas**

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

### 🔍 **3. SEO e Metadados**

#### **Metadados de Página**

```tsx
// src/app/[pagina]/page.tsx
import { Metadata } from "next";
import { generateMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Título Personalizado",
  description: "Descrição personalizada da página",
  image: "/images/pagina-especifica.jpg",
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
      addressLocality: "São Paulo",
      addressRegion: "SP",
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

### 🎯 **1. Componentes Base**

#### **Botões**

```tsx
// src/components/ui/primitives/button.tsx
<Button variant="primary" size="lg">
  Botão Principal
</Button>

<Button variant="secondary" size="md">
  Botão Secundário
</Button>

<Button variant="outline" size="sm">
  Botão Outline
</Button>
```

#### **Cards**

```tsx
// src/components/ui/primitives/card.tsx
<Card className="hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle>Título do Card</CardTitle>
    <CardDescription>Descrição do card</CardDescription>
  </CardHeader>
  <CardContent>Conteúdo do card</CardContent>
</Card>
```

### 🌈 **2. Sistema de Cores**

#### **Variáveis CSS**

```css
/* src/app/globals.css */
:root {
  --color-primary: 59 130 246; /* #3b82f6 */
  --color-secondary: 245 158 11; /* #f59e0b */
  --color-success: 34 197 94; /* #22c55e */
  --color-warning: 251 146 60; /* #fb923c */
  --color-error: 239 68 68; /* #ef4444 */
}

/* Uso com Tailwind */
.bg-primary {
  background-color: rgb(var(--color-primary));
}
.text-primary {
  color: rgb(var(--color-primary));
}
```

#### **Gradientes**

```tsx
// src/components/ui/design-system/GradientIcon.tsx
<div className="bg-gradient-to-r from-primary-500 to-secondary-500">
  Conteúdo com gradiente
</div>
```

---

## 📱 **RESPONSIVIDADE**

### 📐 **1. Grid System**

#### **Layout Responsivo**

```tsx
<div
  className="
  grid 
  grid-cols-1          /* Mobile: 1 coluna */
  sm:grid-cols-2       /* Small: 2 colunas */
  md:grid-cols-3       /* Medium: 3 colunas */
  lg:grid-cols-4       /* Large: 4 colunas */
  gap-4                /* Espaçamento base */
  md:gap-6             /* Espaçamento medium */
  lg:gap-8             /* Espaçamento large */
"
>
  {/* Itens do grid */}
</div>
```

#### **Flexbox Responsivo**

```tsx
<div
  className="
  flex 
  flex-col             /* Mobile: coluna */
  md:flex-row          /* Medium+: linha */
  items-center         /* Centralizar itens */
  justify-between      /* Espaçar entre itens */
  gap-4                /* Espaçamento */
  md:gap-8             /* Espaçamento medium */
"
>
  {/* Conteúdo flexível */}
</div>
```

### 🖼️ **2. Imagens Responsivas**

#### **Next.js Image**

```tsx
import Image from "next/image";

<Image
  src="/images/hero.jpg"
  alt="Imagem hero"
  width={1200}
  height={600}
  className="
    w-full 
    h-auto 
    object-cover
    rounded-lg
    shadow-lg
  "
  priority // Para imagens acima da dobra
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
  {/* Conteúdo sobre a imagem */}
</div>
```

---

## 🚀 **PERFORMANCE**

### ⚡ **1. Otimizações de Imagem**

#### **Formatos Modernos**

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

### 📊 **2. Monitoramento de Performance**

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

## 🔧 **CONFIGURAÇÕES AVANÇADAS**

### ⚙️ **1. Environment Variables**

#### **Arquivo .env.local**

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://seusite.com
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_chave_publica
EMAILJS_SERVICE_ID=seu_service_id
EMAILJS_TEMPLATE_ID=seu_template_id
```

#### **Uso no Código**

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

### 🎨 **2. Tema Dinâmico**

#### **Context de Tema**

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

## 📚 **RECURSOS ADICIONAIS**

### 🔗 **1. Links Úteis**

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### 📖 **2. Arquivos de Referência**

- `src/config/lawyer.ts` - Configuração principal
- `src/lib/design-tokens.ts` - Tokens de design
- `src/components/ui/` - Componentes base
- `tailwind.config.ts` - Configuração Tailwind

### 🎯 **3. Próximos Passos**

1. **Personalizar dados** em `src/config/lawyer.ts`
2. **Ajustar cores** em `tailwind.config.ts`
3. **Modificar layout** nos componentes
4. **Adicionar conteúdo** específico
5. **Testar responsividade** em diferentes dispositivos
6. **Otimizar performance** com Lighthouse

---

**🏆 Com este guia, você tem tudo para personalizar o LawyerHero Template e criar um site profissional único para sua advocacia!** ⚖️✨
