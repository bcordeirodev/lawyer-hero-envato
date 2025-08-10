import {
    Activity,
    Building,
    Heart,
    Scale,
    TrendingUp
} from 'lucide-react'

export interface LawyerCredentials {
    bar: string
    location: string
}

export interface LawyerStatistics {
    experience: string
    casesResolved: string
    successRate: string
}

export interface LawyerContact {
    email: string
    phone: string
    workingHours: string
}

export interface LawyerPhoto {
    src: string
    placeholder: string
    alt: string
}

export interface LawyerData {
    name: string
    fullName: string
    title: string
    description: string
    detailedDescription: string
    credentials: LawyerCredentials
    statistics: LawyerStatistics
    contact: LawyerContact
    photo: LawyerPhoto
}

import { LucideIcon } from 'lucide-react'

export interface ServiceFeature {
    id: string
    title: string
    description: string
    icon: LucideIcon
    features: string[]
    gradient: string
    category: 'civil' | 'business' | 'family' | 'real-estate' | 'labor' | 'digital'
}

export interface SocialMedia {
    whatsapp: string
    instagram?: string
    linkedin?: string
    facebook?: string
}

// ============================================================================
// FORM CONFIGURATION
// ============================================================================

export interface FormConfig {
    subjects: string[]
    placeholders: {
        name: string
        email: string
        phone: string
        subject: string
        message: string
    }
    labels: {
        name: string
        email: string
        phone: string
        subject: string
        message: string
        submit: string
        loading: string
    }
}

// ============================================================================
// ABOUT SECTION CONFIGURATION
// ============================================================================

export interface AboutConfig {
    highlights: string[]
    whyChooseUs: string[]
}

// ============================================================================
// MAIN LAWYER CONFIGURATION
// ============================================================================

export interface LawyerConfig {
    lawyer: LawyerData
    services: ServiceFeature[]
    socialMedia: SocialMedia
    form: FormConfig
    about: AboutConfig
}

export const LAWYER_CONFIG: LawyerConfig = {
    lawyer: {
        name: "Attorney John Smith",
        fullName: "John Michael Smith",
        title: "Attorney at Law - Civil, Business & Family Law",
        description: "Hello! I'm Attorney John Smith, a licensed attorney with over 15 years of experience. I believe every case is unique and deserves special attention. I practice with transparency, ethics, and dedication, always prioritizing my clients' interests.",
        detailedDescription: "Attorney with dedicated practice in providing legal services. I believe that every client is unique and that each case requires personalized attention, strategy, and commitment. I practice with ethics, transparency, and dedication, offering careful and professional legal representation.",
        credentials: {
            bar: "Bar Number: 123456",
            location: "New York, NY"
        },
        statistics: {
            experience: "Experience",
            casesResolved: "Cases",
            successRate: "Dedication"
        },
        contact: {
            email: "contact@johnsmithlaw.com",
            phone: "(555) 123-4567",
            workingHours: "Monday to Friday: 9AM to 6PM | Saturdays: 9AM to 12PM"
        },
        photo: {
            src: "/images/perfil.png",
            placeholder: "Attorney John Smith",
            alt: "Attorney John Smith - Attorney at Law"
        }
    },

    services: [
        {
            id: "civil-law",
            title: "Civil Law",
            description: "I protect your civil rights with complete and personalized legal counsel. From contracts to liability issues, I'm here to defend your interests with efficiency and commitment.",
            icon: Scale,
            features: [
                "Civil and commercial contracts",
                "Civil liability and compensation for moral and material damages",
                "Consumer law and consumer relations",
                "Property law and possessory actions",
                "Debt collection and civil executions"
            ],
            gradient: "from-yellow-500 to-orange-500",
            category: "civil"
        },
        {
            id: "business-law",
            title: "Business Law",
            description: "I support your company's growth with strategic legal counsel. From planning to conflict resolution, your business will always be well-protected.",
            icon: Building,
            features: [
                "Commercial and business contracts",
                "Corporate law and shareholder conflict resolution",
                "Judicial and extrajudicial business recovery",
                "Compliance, governance and legal adequacy",
                "Defense in tax executions and tax lawsuits"
            ],
            gradient: "from-yellow-500 to-orange-500",
            category: "business"
        },
        {
            id: "family-law",
            title: "Family Law",
            description: "I understand that family matters are delicate and personal. I offer counsel with sensitivity and respect, always prioritizing family well-being.",
            icon: Heart,
            features: [
                "Consensual and contested divorce",
                "Shared custody, sole custody and visitation regulations",
                "Child support, modifications and enforcement",
                "Estate administration, asset division and wills",
                "Paternity recognition and adoption proceedings",
                "Protective orders and domestic violence"
            ],
            gradient: "from-yellow-500 to-orange-500",
            category: "family"
        },
        {
            id: "health-law",
            title: "Health Law",
            description: "Defense of your rights regarding health insurance, medical care and access to essential treatments.",
            icon: Heart,
            features: [
                "Actions against health insurance coverage denials",
                "Medication provision through public health system",
                "Emergency hospitalizations and surgeries",
                "Treatments outside standard coverage",
                "Medical malpractice liability"
            ],
            gradient: "from-yellow-500 to-orange-500",
            category: "civil"
        },
        {
            id: "labor-law",
            title: "Labor Law",
            description: "Complete legal counsel for employees and employers, focusing on resolving workplace conflicts.",
            icon: Activity,
            features: [
                "Severance pay, unemployment benefits and overtime",
                "Employment relationship recognition",
                "Workplace harassment and sexual harassment",
                "Job security and reinstatement",
                "Defense in labor complaints"
            ],
            gradient: "from-yellow-500 to-orange-500",
            category: "labor"
        },
        {
            id: "tax-law",
            title: "Tax Law",
            description: "Legal support to face undue charges, regularize tax issues and plan efficiently.",
            icon: TrendingUp,
            features: [
                "Defense in tax executions",
                "Refund of unduly paid taxes",
                "Tax planning and consulting",
                "Challenge of violation notices",
                "Tax regularization and installment plans"
            ],
            gradient: "from-yellow-500 to-orange-500",
            category: "business"
        }
    ],

    socialMedia: {
        whatsapp: "https://wa.me/15551234567",
        instagram: "https://instagram.com/johnsmithlaw",
        linkedin: "https://linkedin.com/in/johnsmithlaw",
        facebook: "https://facebook.com/johnsmithlaw"
    },

    form: {
        subjects: [
            "Legal Consultation",
            "Civil Law",
            "Business Law",
            "Family Law",
            "Health Law",
            "Labor Law",
            "Tax Law",
            "Other"
        ],
        placeholders: {
            name: "Your full name",
            email: "your@email.com",
            phone: "(555) 123-4567",
            subject: "Select a subject",
            message: "Describe your situation or question..."
        },
        labels: {
            name: "Name",
            email: "Email",
            phone: "Phone",
            subject: "Subject",
            message: "Message",
            submit: "Send Message",
            loading: "Sending..."
        }
    },

    about: {
        highlights: [
            "Focus on Civil and Business Law",
            "Consolidated experience in legal practice",
            "Personalized and transparent service",
            "Commitment to ethics and dedication"
        ],
        whyChooseUs: [
            "Personalized and dedicated service",
            "Transparency in all processes",
            "Experience in various legal cases",
            "Commitment to ethics and responsibility"
        ]
    }
} 