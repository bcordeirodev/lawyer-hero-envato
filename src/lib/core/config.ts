/**
 * Main configuration file for the Lawyer Hero template
 * Follows SOLID principles and provides centralized configuration
 */

import { LAWYER_CONFIG } from '@/config'

// ============================================================================
// MAIN CONFIGURATION
// ============================================================================

export const appConfig = {
    lawyer: LAWYER_CONFIG.lawyer,
    services: LAWYER_CONFIG.services,
    contactInfo: LAWYER_CONFIG.lawyer.contact,
    statistics: LAWYER_CONFIG.lawyer.statistics,
    formSubjects: [
        "Legal Consultation",
        "Civil Law",
        "Business Law",
        "Family Law",
        "Real Estate Law",
        "Labor Law",
        "Digital Law",
        "Other"
    ],
    aboutHighlights: [
        "Specialization in Civil and Business Law",
        "More than 5 years of legal experience",
        "Personalized and transparent service",
        "Commitment to effective results"
    ],
    whyChooseUs: [
        "Personalized and dedicated service",
        "Transparency in all processes",
        "Experience in complex cases",
        "Commitment to deadlines and results"
    ]
}

// ============================================================================
// EXPORTED CONFIGURATIONS FOR EASY ACCESS
// ============================================================================

export const lawyerConfig = appConfig.lawyer
export const servicesConfig = appConfig.services
export const contactConfig = appConfig.contactInfo
export const statisticsConfig = appConfig.statistics
export const formSubjectsConfig = { subjects: appConfig.formSubjects }
export const aboutConfig = {
    highlights: appConfig.aboutHighlights,
    whyChooseUs: appConfig.whyChooseUs
}

// ============================================================================
// BREAKPOINTS (Centralizado)
// ============================================================================

export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
} as const

// ============================================================================
// ANIMATION CONFIGURATION (Centralizado)
// ============================================================================

export const coreAnimationConfig = {
    duration: {
        fast: 0.2,
        normal: 0.3,
        slow: 0.6,
        slower: 0.8
    },
    easing: {
        easeOut: 'easeOut',
        easeInOut: 'easeInOut',
        easeIn: 'easeIn'
    },
    delay: {
        none: 0,
        small: 0.1,
        medium: 0.2,
        large: 0.3
    }
} as const

// ============================================================================
// FORM VALIDATION CONFIGURATION (Centralizado)
// ============================================================================

export const formValidationConfig = {
    maxLength: {
        name: 50,
        email: 100,
        phone: 20,
        subject: 100,
        message: 1000
    },
    minLength: {
        name: 2,
        email: 5,
        subject: 1,
        message: 10
    },
    patterns: {
        name: /^[a-zA-ZÀ-ÿ\s]+$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^[\+]?[1-9][\d]{0,15}$/
    },
    requiredFields: ['name', 'email', 'subject', 'message'],
    optionalFields: ['phone'],
    autoComplete: {
        name: 'name',
        email: 'email',
        phone: 'tel',
        subject: 'off',
        message: 'off'
    }
} as const

// ============================================================================
// THEME CONFIGURATION (Centralizado)
// ============================================================================

export const themeConfig = {
    colors: {
        primary: {
            light: '#eab308',
            dark: '#b8860b'
        },
        secondary: {
            light: '#ca8a04',
            dark: '#daa520'
        },
        background: {
            primary: {
                light: '#f5f5f0',
                dark: '#0a0f1a'
            },
            secondary: {
                light: '#f0f0e8',
                dark: '#1e293b'
            }
        },
        text: {
            primary: {
                light: '#1a1a1a',
                dark: '#f8fafc'
            },
            secondary: {
                light: '#4a4a4a',
                dark: '#e2e8f0'
            }
        },
        border: {
            primary: {
                light: '#d1d5db',
                dark: '#334155'
            },
            secondary: {
                light: '#9ca3af',
                dark: '#475569'
            }
        }
    },
    gradients: {
        primary: 'from-blue-500 to-indigo-500',
        secondary: 'from-cyan-500 to-blue-500'
    },
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem'
    },
    borderRadius: {
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '9999px'
    }
} as const

// ============================================================================
// SEO CONFIGURATION (Centralizado)
// ============================================================================

export const seoConfig = {
    title: {
        default: `${lawyerConfig.name} - ${lawyerConfig.title}`,
        services: `Practice Areas - ${lawyerConfig.name}`,
        contact: `Contact - ${lawyerConfig.name}`,
        about: `About - ${lawyerConfig.name}`
    },
    description: {
        default: lawyerConfig.description,
        services: 'Discover our practice areas: civil, business and family law. Specialized legal counsel.',
        contact: `Contact ${lawyerConfig.name} for personalized legal counsel.`,
        about: `Meet ${lawyerConfig.name}, expert attorney with more than ${lawyerConfig.statistics.experience} years of experience.`
    },
    keywords: {
        default: 'attorney, civil law, business law, family law, legal counsel',
        services: 'civil law, business law, family law, law office',
        contact: 'contact attorney, legal counsel',
        about: 'attorney, legal experience, law expert'
    },
    author: lawyerConfig.name,
    ogImage: '/og-image.jpg',
    twitterHandle: '@johnsmithlaw'
} as const

// ============================================================================
// SOCIAL MEDIA CONFIGURATION (Centralizado)
// ============================================================================

export const socialConfig = {
    whatsapp: lawyerConfig.contact.phone,
    email: lawyerConfig.contact.email,
    phone: lawyerConfig.contact.phone,
    linkedin: 'https://linkedin.com/in/johnsmithlaw',
    instagram: 'https://instagram.com/johnsmithlaw'
} as const

// ============================================================================
// CONTACT DETAILS CONFIGURATION (Centralizado)
// ============================================================================

export const contactDetailsConfig = {
    address: {
        street: '123 Main Street',
        neighborhood: 'Manhattan',
        city: lawyerConfig.credentials.location.split(', ')[0],
        state: lawyerConfig.credentials.location.split(', ')[1],
        zipCode: '10001',
        country: 'United States'
    },
    hours: {
        weekdays: '09:00 - 18:00',
        saturday: '09:00 - 12:00',
        sunday: 'Closed'
    },
    emergency: {
        phone: lawyerConfig.contact.phone,
        available: '24/7'
    }
} as const

// ============================================================================
// NAVIGATION CONFIGURATION (Centralizado)
// ============================================================================

export const navigationConfig = {
    main: [
        { name: 'Home', href: '#home' },
        { name: 'Services', href: '#services' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' }
    ],
    services: [
        { name: 'Civil Law', href: '/servicos/civil-law' },
        { name: 'Business Law', href: '/servicos/business-law' },
        { name: 'Family Law', href: '/servicos/family-law' }
    ],
    legal: [
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms of Use', href: '/terms-of-use' },
        { name: 'Cookies', href: '/cookies' }
    ]
} as const

// ============================================================================
// EXPORT DEFAULT CONFIGURATION
// ============================================================================

export default appConfig