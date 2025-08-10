# 📧 EmailJS Guide - LawyerHero Template

## 🎯 **OVERVIEW**

**EmailJS** is a solution for sending emails directly from the frontend without the need for a backend. This guide explains how to configure and integrate EmailJS in the LawyerHero template for functional contact forms.

---

## 🚀 **QUICK SETUP**

### **1. Create EmailJS Account**

1. Visit [emailjs.com](https://emailjs.com)
2. Create a free account
3. Verify your email

### **2. Configure Email Service**

1. In the dashboard, go to **"Email Services"**
2. Click on **"Add New Service"**
3. Choose your provider (Gmail, Outlook, etc.)
4. Configure credentials
5. Note down the **Service ID**

### **3. Create Email Template**

1. Go to **"Email Templates"**
2. Click on **"Create New Template"**
3. Use the default template or create a custom one
4. Note down the **Template ID**

---

## ⚙️ **PROJECT CONFIGURATION**

### **1. Environment Variables**

Create a `.env.local` file in the project root:

```bash
# .env.local
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
```

### **2. Install Dependencies**

```bash
npm install @emailjs/browser
```

### **3. Configure EmailJS**

```typescript
// src/lib/email/emailjs.ts
import emailjs from "@emailjs/browser";

// Initialize EmailJS
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
        subject: `New contact from ${formData.name}`,
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

## 📝 **RECOMMENDED EMAIL TEMPLATE**

### **HTML Template**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>New Contact - LawyerHero</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2
        style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;"
      >
        🎯 New Contact Received
      </h2>

      <div
        style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;"
      >
        <h3 style="color: #1e3a8a; margin-top: 0;">📋 Contact Information</h3>

        <p><strong>👤 Name:</strong> {{from_name}}</p>
        <p><strong>📧 Email:</strong> {{from_email}}</p>
        <p><strong>📱 Phone:</strong> {{phone}}</p>
        <p><strong>📝 Subject:</strong> {{subject}}</p>
      </div>

      <div
        style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;"
      >
        <h3 style="color: #1e3a8a; margin-top: 0;">💬 Message</h3>
        <p style="white-space: pre-wrap;">{{message}}</p>
      </div>

      <div
        style="margin-top: 30px; padding: 20px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #3b82f6;"
      >
        <p style="margin: 0; color: #1e40af;">
          <strong>⏰ Received at:</strong> {{sent_date}}
        </p>
      </div>

      <hr
        style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;"
      />

      <p style="text-align: center; color: #64748b; font-size: 14px;">
        This email was sent through your website's contact form.
      </p>
    </div>
  </body>
</html>
```

### **Plain Text Template**

```text
🎯 NEW CONTACT RECEIVED

📋 CONTACT INFORMATION:
👤 Name: {{from_name}}
📧 Email: {{from_email}}
📱 Phone: {{phone}}
📝 Subject: {{subject}}

💬 MESSAGE:
{{message}}

⏰ Received at: {{sent_date}}

---
This email was sent through your website's contact form.
```

---

## 🔧 **COMPONENT INTEGRATION**

### **1. Custom Hook**

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
        setError("Error sending email. Please try again.");
        return false;
      }
    } catch (err) {
      setError("Unexpected error. Please try again.");
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

### **2. Form Component**

```typescript
// src/components/forms/ContactForm.tsx
import { useContactForm } from "@/hooks/useContactForm";

export const ContactForm = () => {
  const { isLoading, isSuccess, error, handleSubmit, reset } = useContactForm();

  const onSubmit = async (data: ContactFormData) => {
    const success = await handleSubmit(data);
    if (success) {
      // Clear form or show success
      reset();
    }
  };

  if (isSuccess) {
    return (
      <div className="success-message">
        <h3>✅ Message Sent!</h3>
        <p>Thank you for contacting us. We'll get back to you soon.</p>
        <button onClick={reset}>Send New Message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}

      {error && <div className="error-message">❌ {error}</div>}

      <button type="submit" disabled={isLoading} className="submit-button">
        {isLoading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};
```

---

## 🎨 **CSS STYLING**

### **Message Styles**

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

## 🔒 **SECURITY AND VALIDATION**

### **1. Frontend Validation**

```typescript
// src/lib/validation/contact-schema.ts
import * as yup from "yup";

export const contactSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),

  email: yup.string().required("Email is required").email("Invalid email"),

  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^[\d\s\-\+\(\)]+$/, "Invalid phone"),

  message: yup
    .string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be at most 1000 characters"),
});
```

### **2. Rate Limiting**

```typescript
// src/hooks/useContactForm.ts
const [lastSubmission, setLastSubmission] = useState<number>(0);

const handleSubmit = async (formData: ContactFormData) => {
  const now = Date.now();
  const timeSinceLastSubmission = now - lastSubmission;

  // Limit to 1 submission per minute
  if (timeSinceLastSubmission < 60000) {
    setError("Please wait 1 minute before sending another message.");
    return false;
  }

  // ... rest of the logic

  setLastSubmission(now);
};
```

---

## 🧪 **TESTING THE INTEGRATION**

### **1. Local Testing**

```bash
# 1. Configure environment variables
cp env.example .env.local

# 2. Edit .env.local with your credentials
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id

# 3. Run the project
npm run dev

# 4. Test the form at localhost:3000
```

### **2. Send Verification**

1. **Browser Console** - Check success/error logs
2. **EmailJS Dashboard** - Confirm received emails
3. **Inbox** - Check if emails arrived
4. **Spam** - Check spam folder

---

## 🚀 **DEPLOY AND PRODUCTION**

### **1. Production Variables**

```bash
# Vercel
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id

# Netlify
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
```

### **2. Post-Deploy Verification**

1. **Test the form** on production site
2. **Check error logs** in console
3. **Confirm emails** being received
4. **Test on different devices**

---

## 🔧 **TROUBLESHOOTING**

### **Common Issues**

#### **❌ "EmailJS is not defined"**

```typescript
// Solution: Check import
import emailjs from "@emailjs/browser";

// And initialization
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
```

#### **❌ "Service ID not found"**

1. Verify Service ID is correct
2. Confirm service is active in dashboard
3. Check environment variables

#### **❌ "Template ID not found"**

1. Verify Template ID is correct
2. Confirm template is published
3. Check environment variables

#### **❌ "Public Key invalid"**

1. Verify public key is correct
2. Confirm account is verified
3. Check for extra spaces

---

## 📊 **MONITORING AND ANALYTICS**

### **1. Send Tracking**

```typescript
// src/lib/email/emailjs.ts
export const sendEmail = async (formData: ContactFormData) => {
  try {
    // Google Analytics (if configured)
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "form_submit", {
        event_category: "Contact",
        event_label: "Contact Form",
      });
    }

    const result = await emailjs.send(/* ... */);

    // Success tracking
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "form_success", {
        event_category: "Contact",
        event_label: "Email Sent",
      });
    }

    return { success: true, result };
  } catch (error) {
    // Error tracking
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

### **2. EmailJS Dashboard**

- **Email Delivery Rate** - Delivery rate
- **Bounce Rate** - Bounce rate
- **Spam Reports** - Spam reports
- **Usage Analytics** - API usage

---

## 💡 **TIPS AND IMPROVEMENTS**

### **1. Advanced Customization**

```typescript
// Add custom fields
const emailParams = {
  from_name: formData.name,
  from_email: formData.email,
  message: formData.message,
  phone: formData.phone,
  subject: formData.subject,
  // Custom fields
  lawyer_name: LAWYER_CONFIG.lawyer.name,
  service_area: formData.serviceArea,
  urgency: formData.urgency,
  preferred_contact: formData.preferredContact,
};
```

### **2. Multiple Notifications**

```typescript
// Send to multiple emails
const emails = ["contact@youremail.com", "secretary@youremail.com"];

for (const email of emails) {
  await emailjs.send(serviceId, templateId, { ...params, to_email: email });
}
```

---

## 📚 **ADDITIONAL RESOURCES**

### **Official Documentation**

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [React Integration](https://www.emailjs.com/docs/react/)
- [Template Examples](https://www.emailjs.com/docs/templates/)

### **Alternatives**

- **Formspree** - Forms without backend
- **Netlify Forms** - Native Netlify forms
- **Getform** - Forms with webhooks

---

## 🎯 **NEXT STEPS**

1. **Configure** your EmailJS account
2. **Create** the email template
3. **Configure** environment variables
4. **Test** locally
5. **Deploy** and test in production
6. **Monitor** functionality

---

**💡 Tip**: Always test the form in production before considering the project finished.

**🚀 Good luck with your EmailJS integration!**
