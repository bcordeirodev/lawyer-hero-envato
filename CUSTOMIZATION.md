# 🎨 Guia de Customização - LawyerHero

Este guia ensina como personalizar completamente o template para qualquer advogado.

## 📝 Configuração Básica

### 1. Dados do Advogado

Edite `src/config/lawyer.ts`:

```typescript
export const LAWYER_CONFIG: LawyerConfig = {
  lawyer: {
    name: "Seu Nome",
    fullName: "Seu Nome Completo",
    title: "Advogado Especialista em...",
    description: "Sua descrição breve",
    detailedDescription: "Descrição detalhada sobre você",
    credentials: {
      bar: "OAB-XX 123456",
      location: "Sua Cidade, Estado",
    },
    statistics: {
      experience: "X+",
      casesResolved: "XXX+",
      successRate: "XX%",
    },
    contact: {
      email: "seu@email.com",
      phone: "(XX) XXXXX-XXXX",
      workingHours: "Segunda a Sexta: 9h às 18h",
    },
    photo: {
      src: "/images/sua-foto.jpg",
      placeholder: "Seu Nome",
      alt: "Sua descrição da foto",
    },
  },
};
```

### 2. Áreas de Atuação

Customize as especialidades:

```typescript
services: [
  {
    id: "area-1",
    title: "Direito Civil",
    description: "Descrição da área",
    icon: Scale, // Importe de lucide-react
    features: ["Serviço 1", "Serviço 2", "Serviço 3"],
    gradient: "from-blue-500 to-blue-600",
    category: "civil",
  },
];
```

### 3. Redes Sociais

Configure seus perfis:

```typescript
socialMedia: {
    whatsapp: "https://wa.me/5511999999999",
    instagram: "https://instagram.com/seuusuario",
    linkedin: "https://linkedin.com/in/seuusuario",
    facebook: "https://facebook.com/seuusuario"
}
```

## 🎨 Personalização Visual

### Cores e Tema

Edite `tailwind.config.ts`:

```typescript
colors: {
    // Sua paleta principal
    primary: {
        50: '#f0f9ff',
        500: '#3b82f6',
        900: '#1e3a8a'
    },
    secondary: {
        500: '#10b981',
        600: '#059669'
    }
}
```

### Design Tokens

Modifique `src/lib/design-tokens.ts`:

```typescript
export const GRADIENTS = {
  primary: "from-blue-500 to-blue-600",
  secondary: "from-green-500 to-green-600",
  // Seus gradientes personalizados
};
```

### Fontes

Altere no `src/app/layout.tsx`:

```typescript
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
```

## 🖼️ Imagens e Assets

### Foto do Advogado

1. Adicione sua foto em `public/images/`
2. Recomendações:
   - **Formato**: WebP ou JPG
   - **Tamanho**: 400x400px mínimo
   - **Peso**: Máximo 200KB
   - **Estilo**: Profissional, fundo neutro

### Favicon

Substitua `src/app/favicon.ico` ou use:

```typescript
// src/app/layout.tsx
export const metadata = {
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};
```

### Logo (Opcional)

Para adicionar logo:

```typescript
// src/components/layout/header.tsx
<div className="flex items-center">
  <Image src="/images/logo.png" alt="Logo" width={120} height={40} />
</div>
```

## 📝 Conteúdo

### Seção Hero

Edite `src/components/sections/hero.tsx`:

```typescript
// Customize o título principal
<h1 className="text-4xl font-bold">
    Seu título único aqui
</h1>

// Altere o subtítulo
<p className="text-xl">
    Sua proposta de valor
</p>
```

### Seção Sobre

Modifique `src/components/sections/about.tsx`:

```typescript
// Adicione seus diferenciais
const highlights = [
  "Seu diferencial 1",
  "Seu diferencial 2",
  "Seu diferencial 3",
];
```

### Formulário de Contato

Configure em `src/config/lawyer.ts`:

```typescript
form: {
    subjects: [
        "Consulta Jurídica",
        "Sua Área 1",
        "Sua Área 2",
        "Outro"
    ],
    placeholders: {
        name: "Seu nome completo",
        email: "seu@email.com",
        // ... outros campos
    }
}
```

## 📧 EmailJS Setup

### 1. Criar Conta

1. Acesse [EmailJS](https://emailjs.com)
2. Crie conta gratuita
3. Conecte seu email (Gmail, Outlook, etc.)

### 2. Configurar Template

Template de exemplo:

```html
Novo contato do site: Nome: {{name}} Email: {{email}} Telefone: {{phone}}
Assunto: {{subject}} Mensagem: {{message}} --- Enviado através do formulário de
contato
```

### 3. Configurar Ambiente

```env
# .env.local
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_xxxxxxxxxxxx
```

## 🔧 Componentes Customizáveis

### Botões

Customize em `src/components/ui/primitives/button.tsx`:

```typescript
const buttonVariants = cva("base-classes", {
  variants: {
    variant: {
      primary: "seu-estilo-primario",
      secondary: "seu-estilo-secundario",
    },
  },
});
```

### Cards

Modifique `src/components/ui/primitives/card.tsx`:

```typescript
// Adicione novos estilos de card
const cardVariants = {
  elegant: "bg-white shadow-2xl border-gold-200",
  modern: "bg-gradient-to-br from-gray-50 to-white",
};
```

## 📱 Layout e Responsividade

### Breakpoints Customizados

```typescript
// tailwind.config.ts
screens: {
    'xs': '475px',
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
    '3xl': '1792px', // Adicione se necessário
}
```

### Grid Personalizado

```typescript
// Modifique layouts em sections
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Seu conteúdo */}
</div>
```

## 🌟 Animações

### Framer Motion

Customize animações em `src/lib/animations/`:

```typescript
export const customFadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
};
```

### CSS Animations

Adicione no `src/app/globals.css`:

```css
@keyframes slideInUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-in-up {
  animation: slideInUp 0.6s ease-out;
}
```

## 🔍 SEO Customização

### Metadata

Edite `src/lib/seo/metadata.ts`:

```typescript
export function generateMetadata() {
  return {
    title: "Seu Nome - Advogado em Sua Cidade",
    description: "Sua descrição otimizada para SEO",
    keywords: ["advogado", "sua cidade", "suas especialidades"],
    authors: [{ name: "Seu Nome" }],
    openGraph: {
      title: "Seu Nome - Advogado",
      description: "Sua descrição",
      images: ["/images/og-image.jpg"],
    },
  };
}
```

### Structured Data

Modifique `src/components/common/StructuredData.tsx`:

```typescript
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Seu Nome",
  address: "Seu Endereço",
  telephone: "Seu Telefone",
};
```

## 🎯 Funcionalidades Extras

### Google Analytics

```typescript
// lib/gtag.js
export const GA_TRACKING_ID = 'G-XXXXXXXXXX'

// Adicione no layout.tsx
<Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
```

### WhatsApp Flutuante

Customize em `src/components/ui/floating-whatsapp.tsx`:

```typescript
const whatsappMessage = encodeURIComponent(
  "Olá! Gostaria de mais informações sobre seus serviços jurídicos."
);
```

### Chat Online

Para integrar chat (Tawk.to, Zendesk, etc.):

```typescript
// components/Chat.tsx
useEffect(() => {
  // Código do chat
  var Tawk_API = Tawk_API || {};
  // ... configuração
}, []);
```

## 📊 Performance

### Otimização de Imagens

```typescript
// next.config.js
images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
}
```

### Lazy Loading

```typescript
// Para componentes pesados
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <p>Carregando...</p>,
});
```

## ✅ Checklist de Customização

### Básico

- [ ] Nome e dados pessoais
- [ ] Áreas de atuação
- [ ] Informações de contato
- [ ] Foto profissional
- [ ] Cores da marca

### Avançado

- [ ] EmailJS configurado
- [ ] SEO otimizado
- [ ] Google Analytics
- [ ] Favicon personalizado
- [ ] Redes sociais

### Performance

- [ ] Imagens otimizadas
- [ ] Lighthouse 90+
- [ ] Core Web Vitals
- [ ] Mobile friendly

## 🆘 Dicas e Troubleshooting

### Cores não Aplicando

```bash
# Limpe cache do Tailwind
rm -rf .next
npm run dev
```

### Problemas de Build

```bash
# Verifique sintaxe TypeScript
npm run type-check

# Verifique linting
npm run lint
```

### Performance Lenta

1. Otimize imagens
2. Use next/image
3. Remova imports desnecessários
4. Use lazy loading

---

**💡 Dica**: Sempre teste em dispositivos móveis após customizações!
