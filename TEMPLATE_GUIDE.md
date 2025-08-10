# 📋 Guia do Template - LawyerHero

## 🎯 **VISÃO GERAL**

O **LawyerHero** é um template profissional para landing pages de advogados, desenvolvido com Next.js 15, TypeScript e Tailwind CSS. Este guia explica a estrutura original do template e como utilizá-lo de forma eficaz.

---

## 🏗️ **ESTRUTURA DO PROJETO**

### **📁 Diretórios Principais**

```
src/
├── app/                 # App Router do Next.js 15
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Página inicial
│   └── globals.css     # Estilos globais
├── components/          # Componentes React
│   ├── layout/         # Header, Footer
│   ├── sections/       # Seções da página
│   └── ui/            # Componentes base
├── config/             # Configurações
│   └── lawyer.ts      # Dados do advogado
├── hooks/              # Hooks customizados
├── lib/                # Utilitários e funções
└── types/              # Definições TypeScript
```

### **🔧 Arquivos de Configuração**

- **`next.config.js`** - Configuração do Next.js
- **`tailwind.config.ts`** - Configuração do Tailwind CSS
- **`tsconfig.json`** - Configuração do TypeScript
- **`package.json`** - Dependências e scripts

---

## 🎨 **SISTEMA DE DESIGN**

### **🎨 Paleta de Cores**

```typescript
// Cores principais (configuráveis)
primary: {
  50: '#eff6ff',    // Azul claro
  500: '#3b82f6',   // Azul principal
  900: '#1e3a8a',   // Azul escuro
},
secondary: {
  500: '#f59e0b',   // Dourado
  600: '#d97706',   // Dourado escuro
}
```

### **📱 Responsividade**

- **Mobile First** - Design otimizado para dispositivos móveis
- **Breakpoints** - Adaptação automática para tablets e desktops
- **Touch Friendly** - Elementos otimizados para toque

---

## ⚡ **FUNCIONALIDADES PRINCIPAIS**

### **🚀 Performance**

- **Lazy Loading** - Carregamento sob demanda
- **Image Optimization** - Otimização automática de imagens
- **Bundle Splitting** - Divisão inteligente do código
- **Core Web Vitals** - Métricas de performance otimizadas

### **🔍 SEO**

- **Meta Tags** - Configuração automática para SEO
- **Structured Data** - Dados estruturados para motores de busca
- **Sitemap** - Geração automática de sitemap
- **Robots.txt** - Configuração para crawlers

### **📱 Acessibilidade**

- **ARIA Labels** - Suporte completo para leitores de tela
- **Keyboard Navigation** - Navegação por teclado
- **Color Contrast** - Contraste adequado para leitura
- **Semantic HTML** - HTML semântico e estruturado

---

## 🛠️ **COMPONENTES PRINCIPAIS**

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

## 🔧 **CONFIGURAÇÃO RÁPIDA**

### **1. Dados do Advogado**

```typescript
// src/config/lawyer.ts
export const LAWYER_CONFIG: LawyerConfig = {
  lawyer: {
    name: "Dr. Seu Nome",
    title: "Advogado - Direito Civil",
    description: "Descrição para SEO",
    credentials: {
      bar: "OAB-SP 123456",
      location: "São Paulo, SP",
    },
  },
};
```

### **2. Serviços**

```typescript
export const SERVICES = [
  {
    id: "civil",
    title: "Direito Civil",
    description: "Contratos, responsabilidade civil...",
    icon: "scale",
  },
];
```

### **3. Informações de Contato**

```typescript
export const CONTACT_INFO = {
  phone: "+55 11 99999-9999",
  email: "contato@seuemail.com",
  address: "Rua Exemplo, 123 - São Paulo, SP",
};
```

---

## 🚀 **SCRIPTS DISPONÍVEIS**

### **Desenvolvimento**

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Verificação de código
npm run type-check   # Verificação de tipos
```

### **Análise**

```bash
npm run analyze      # Análise do bundle
npm run lighthouse   # Teste de performance
npm run test         # Executar testes
```

---

## 📱 **ADAPTAÇÃO PARA MOBILE**

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

- **Botões** - Mínimo 44x44px para toque
- **Links** - Espaçamento adequado entre elementos
- **Scroll** - Scroll suave e responsivo

---

## 🔍 **OTIMIZAÇÃO DE PERFORMANCE**

### **Lazy Loading**

```typescript
// Carregamento sob demanda
const LazyComponent = lazy(() => import("./Component"));

// Suspense para loading
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>;
```

### **Image Optimization**

```typescript
import Image from "next/image";

<Image
  src="/image.jpg"
  alt="Descrição"
  width={800}
  height={600}
  priority={true} // Para LCP
/>;
```

---

## 🛡️ **SEGURANÇA E VALIDAÇÃO**

### **Form Validation**

```typescript
// Validação robusta de formulários
const { register, handleSubmit, errors } = useForm({
  resolver: yupResolver(contactSchema),
});
```

### **Error Boundaries**

```typescript
// Tratamento de erros
<ErrorBoundary fallback={<ErrorFallback />}>
  <Component />
</ErrorBoundary>
```

---

## 📚 **RECURSOS ADICIONAIS**

### **Documentação**

- **CUSTOMIZATION.md** - Guia completo de personalização
- **DEPLOYMENT.md** - Instruções de deploy
- **README.md** - Documentação principal

### **Suporte**

- **TypeScript** - Tipagem completa
- **ESLint** - Padrões de código
- **Prettier** - Formatação automática
- **Husky** - Git hooks

---

## 🎯 **PRÓXIMOS PASSOS**

1. **Configure** os dados do advogado
2. **Personalize** cores e estilos
3. **Adicione** suas informações de contato
4. **Teste** em diferentes dispositivos
5. **Faça deploy** na plataforma escolhida

---

**💡 Dica**: Use o arquivo `CUSTOMIZATION.md` para instruções detalhadas de personalização e `DEPLOYMENT.md` para instruções de deploy.

**🚀 Boa sorte com seu projeto!**
