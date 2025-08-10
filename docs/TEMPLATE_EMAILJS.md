# 📧 Guia EmailJS - LawyerHero Template

## 🎯 **VISÃO GERAL**

O **EmailJS** é uma solução para enviar emails diretamente do frontend sem necessidade de backend. Este guia explica como configurar e integrar o EmailJS no template LawyerHero para formulários de contato funcionais.

---

## 🚀 **CONFIGURAÇÃO RÁPIDA**

### **1. Criar Conta EmailJS**

1. Acesse [emailjs.com](https://emailjs.com)
2. Crie uma conta gratuita
3. Verifique seu email

### **2. Configurar Serviço de Email**

1. No dashboard, vá em **"Email Services"**
2. Clique em **"Add New Service"**
3. Escolha seu provedor (Gmail, Outlook, etc.)
4. Configure as credenciais
5. Anote o **Service ID**

### **3. Criar Template de Email**

1. Vá em **"Email Templates"**
2. Clique em **"Create New Template"**
3. Use o template padrão ou crie um personalizado
4. Anote o **Template ID**

---

## ⚙️ **CONFIGURAÇÃO NO PROJETO**

### **1. Variáveis de Ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# .env.local
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_chave_publica
NEXT_PUBLIC_EMAILJS_SERVICE_ID=seu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=seu_template_id
```

### **2. Instalar Dependências**

```bash
npm install @emailjs/browser
```

### **3. Configurar EmailJS**

```typescript
// src/lib/email/emailjs.ts
import emailjs from "@emailjs/browser";

// Inicializar EmailJS
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

export const sendEmail = async (formData: ContactFormData) => {
  try {
    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        phone: formData.phone,
        subject: `Novo contato de ${formData.name}`,
      }
    );

    return { success: true, result };
  } catch (error) {
    console.error("EmailJS error:", error);
    return { success: false, error };
  }
};
```

---

## 📝 **TEMPLATE DE EMAIL RECOMENDADO**

### **Template HTML**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Novo Contato - LawyerHero</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2
        style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;"
      >
        🎯 Novo Contato Recebido
      </h2>

      <div
        style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;"
      >
        <h3 style="color: #1e3a8a; margin-top: 0;">
          📋 Informações do Contato
        </h3>

        <p><strong>👤 Nome:</strong> {{from_name}}</p>
        <p><strong>📧 Email:</strong> {{from_email}}</p>
        <p><strong>📱 Telefone:</strong> {{phone}}</p>
        <p><strong>📝 Assunto:</strong> {{subject}}</p>
      </div>

      <div
        style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;"
      >
        <h3 style="color: #1e3a8a; margin-top: 0;">💬 Mensagem</h3>
        <p style="white-space: pre-wrap;">{{message}}</p>
      </div>

      <div
        style="margin-top: 30px; padding: 20px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #3b82f6;"
      >
        <p style="margin: 0; color: #1e40af;">
          <strong>⏰ Recebido em:</strong> {{sent_date}}
        </p>
      </div>

      <hr
        style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;"
      />

      <p style="text-align: center; color: #64748b; font-size: 14px;">
        Este email foi enviado através do formulário de contato do seu site.
      </p>
    </div>
  </body>
</html>
```

### **Template de Texto Simples**

```text
🎯 NOVO CONTATO RECEBIDO

📋 INFORMAÇÕES DO CONTATO:
👤 Nome: {{from_name}}
📧 Email: {{from_email}}
📱 Telefone: {{phone}}
📝 Assunto: {{subject}}

💬 MENSAGEM:
{{message}}

⏰ Recebido em: {{sent_date}}

---
Este email foi enviado através do formulário de contato do seu site.
```

---

## 🔧 **INTEGRAÇÃO NO COMPONENTE**

### **1. Hook Personalizado**

```typescript
// src/hooks/useContactForm.ts
import { useState } from "react";
import { sendEmail } from "@/lib/email/emailjs";

export const useContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: ContactFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await sendEmail(formData);

      if (result.success) {
        setIsSuccess(true);
        return true;
      } else {
        setError("Erro ao enviar email. Tente novamente.");
        return false;
      }
    } catch (err) {
      setError("Erro inesperado. Tente novamente.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isSuccess,
    error,
    handleSubmit,
    reset: () => {
      setIsSuccess(false);
      setError(null);
    },
  };
};
```

### **2. Componente do Formulário**

```typescript
// src/components/forms/ContactForm.tsx
import { useContactForm } from "@/hooks/useContactForm";

export const ContactForm = () => {
  const { isLoading, isSuccess, error, handleSubmit, reset } = useContactForm();

  const onSubmit = async (data: ContactFormData) => {
    const success = await handleSubmit(data);
    if (success) {
      // Limpar formulário ou mostrar sucesso
      reset();
    }
  };

  if (isSuccess) {
    return (
      <div className="success-message">
        <h3>✅ Mensagem Enviada!</h3>
        <p>Obrigado pelo contato. Retornaremos em breve.</p>
        <button onClick={reset}>Enviar Nova Mensagem</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos do formulário */}

      {error && <div className="error-message">❌ {error}</div>}

      <button type="submit" disabled={isLoading} className="submit-button">
        {isLoading ? "Enviando..." : "Enviar Mensagem"}
      </button>
    </form>
  );
};
```

---

## 🎨 **ESTILIZAÇÃO CSS**

### **Estilos para Mensagens**

```css
/* src/styles/components.css */

.success-message {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
}

.success-message h3 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.success-message button {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.success-message button:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}

.error-message {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  text-align: center;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.submit-button {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
```

---

## 🔒 **SEGURANÇA E VALIDAÇÃO**

### **1. Validação do Frontend**

```typescript
// src/lib/validation/contact-schema.ts
import * as yup from "yup";

export const contactSchema = yup.object({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),

  email: yup.string().required("Email é obrigatório").email("Email inválido"),

  phone: yup
    .string()
    .required("Telefone é obrigatório")
    .matches(/^[\d\s\-\+\(\)]+$/, "Telefone inválido"),

  message: yup
    .string()
    .required("Mensagem é obrigatória")
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(1000, "Mensagem deve ter no máximo 1000 caracteres"),
});
```

### **2. Rate Limiting**

```typescript
// src/hooks/useContactForm.ts
const [lastSubmission, setLastSubmission] = useState<number>(0);

const handleSubmit = async (formData: ContactFormData) => {
  const now = Date.now();
  const timeSinceLastSubmission = now - lastSubmission;

  // Limitar a 1 envio por minuto
  if (timeSinceLastSubmission < 60000) {
    setError("Aguarde 1 minuto antes de enviar outra mensagem.");
    return false;
  }

  // ... resto da lógica

  setLastSubmission(now);
};
```

---

## 🧪 **TESTANDO A INTEGRAÇÃO**

### **1. Teste Local**

```bash
# 1. Configure as variáveis de ambiente
cp env.example .env.local

# 2. Edite .env.local com suas credenciais
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_chave
NEXT_PUBLIC_EMAILJS_SERVICE_ID=seu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=seu_template_id

# 3. Execute o projeto
npm run dev

# 4. Teste o formulário em localhost:3000
```

### **2. Verificação de Envio**

1. **Console do Navegador** - Verifique logs de sucesso/erro
2. **Dashboard EmailJS** - Confirme emails recebidos
3. **Caixa de Entrada** - Verifique se emails chegaram
4. **Spam** - Verifique pasta de spam

---

## 🚀 **DEPLOY E PRODUÇÃO**

### **1. Variáveis de Produção**

```bash
# Vercel
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_chave
NEXT_PUBLIC_EMAILJS_SERVICE_ID=seu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=seu_template_id

# Netlify
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_chave
NEXT_PUBLIC_EMAILJS_SERVICE_ID=seu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=seu_template_id
```

### **2. Verificação Pós-Deploy**

1. **Teste o formulário** no site em produção
2. **Verifique logs** de erro no console
3. **Confirme emails** sendo recebidos
4. **Teste em diferentes dispositivos**

---

## 🔧 **TROUBLESHOOTING**

### **Problemas Comuns**

#### **❌ "EmailJS is not defined"**

```typescript
// Solução: Verificar importação
import emailjs from "@emailjs/browser";

// E inicialização
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
```

#### **❌ "Service ID not found"**

1. Verificar se o Service ID está correto
2. Confirmar se o serviço está ativo no dashboard
3. Verificar variáveis de ambiente

#### **❌ "Template ID not found"**

1. Verificar se o Template ID está correto
2. Confirmar se o template está publicado
3. Verificar variáveis de ambiente

#### **❌ "Public Key invalid"**

1. Verificar se a chave pública está correta
2. Confirmar se a conta está verificada
3. Verificar se não há espaços extras

---

## 📊 **MONITORAMENTO E ANALYTICS**

### **1. Tracking de Envios**

```typescript
// src/lib/email/emailjs.ts
export const sendEmail = async (formData: ContactFormData) => {
  try {
    // Google Analytics (se configurado)
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "form_submit", {
        event_category: "Contact",
        event_label: "Contact Form",
      });
    }

    const result = await emailjs.send(/* ... */);

    // Tracking de sucesso
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "form_success", {
        event_category: "Contact",
        event_label: "Email Sent",
      });
    }

    return { success: true, result };
  } catch (error) {
    // Tracking de erro
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "form_error", {
        event_category: "Contact",
        event_label: "Email Failed",
      });
    }

    throw error;
  }
};
```

### **2. Dashboard EmailJS**

- **Email Delivery Rate** - Taxa de entrega
- **Bounce Rate** - Taxa de retorno
- **Spam Reports** - Relatórios de spam
- **Usage Analytics** - Uso da API

---

## 💡 **DICAS E MELHORIAS**

### **1. Personalização Avançada**

```typescript
// Adicionar campos customizados
const emailParams = {
  from_name: formData.name,
  from_email: formData.email,
  message: formData.message,
  phone: formData.phone,
  subject: formData.subject,
  // Campos customizados
  lawyer_name: LAWYER_CONFIG.lawyer.name,
  service_area: formData.serviceArea,
  urgency: formData.urgency,
  preferred_contact: formData.preferredContact,
};
```

### **2. Notificações Múltiplas**

```typescript
// Enviar para múltiplos emails
const emails = ["contato@seuemail.com", "secretaria@seuemail.com"];

for (const email of emails) {
  await emailjs.send(serviceId, templateId, { ...params, to_email: email });
}
```

---

## 📚 **RECURSOS ADICIONAIS**

### **Documentação Oficial**

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [React Integration](https://www.emailjs.com/docs/react/)
- [Template Examples](https://www.emailjs.com/docs/templates/)

### **Alternativas**

- **Formspree** - Formulários sem backend
- **Netlify Forms** - Formulários nativos do Netlify
- **Getform** - Formulários com webhooks

---

## 🎯 **PRÓXIMOS PASSOS**

1. **Configure** sua conta EmailJS
2. **Crie** o template de email
3. **Configure** as variáveis de ambiente
4. **Teste** localmente
5. **Faça deploy** e teste em produção
6. **Monitore** o funcionamento

---

**💡 Dica**: Sempre teste o formulário em produção antes de considerar o projeto finalizado.

**🚀 Boa sorte com sua integração EmailJS!**
