/**
 * Centralized constants
 * Provides reusable constants following DRY principle
 * 
 * NOTE: Most configurations have been moved to @/lib/core/config.ts
 * This file now contains only unique constants not duplicated elsewhere
 */

import { lawyerConfig } from '@/lib/core/config'

// ============================================================================
// APP CONSTANTS
// ============================================================================

export const APP_CONFIG = {
    name: 'LawyerHero',
    version: '1.0.0',
    description: 'Professional lawyer landing page',
    author: lawyerConfig.name,
    url: 'https://johnsmithlaw.com'
} as const

// ============================================================================
// SERVICES CATEGORIES
// ============================================================================

export const SERVICE_CATEGORIES = {
    civil: 'Civil Law',
    business: 'Business Law',
    family: 'Family Law',
    labor: 'Labor Law',
    realEstate: 'Real Estate Law',
    consumer: 'Consumer Law',
    inheritance: 'Inheritance Law',
    contracts: 'Contracts',
    litigation: 'Litigation',
    consulting: 'Consulting'
} as const

// ============================================================================
// LEGAL DOCUMENTS
// ============================================================================

export const LEGAL_DOCUMENTS = {
    contracts: [
        'Purchase and Sale Contracts',
        'Lease Agreements',
        'Service Contracts',
        'Business Contracts',
        'Agreements and Conventions'
    ],
    family: [
        'Divorce',
        'Child Custody',
        'Child Support',
        'Estate Administration',
        'Wills',
        'Adoption'
    ],
    business: [
        'Business Formation',
        'Corporate Contracts',
        'Mergers and Acquisitions',
        'Compliance',
        'Judicial Recovery'
    ]
} as const

// ============================================================================
// TESTIMONIALS
// ============================================================================

export const TESTIMONIALS = [
    {
        id: 1,
        name: 'Sarah Johnson',
        rating: 5,
        text: 'Excellent attorney, very professional and attentive. Resolved my problem quickly.',
        service: 'Civil Law',
        date: '2024-01-15'
    },
    {
        id: 2,
        name: 'Michael Davis',
        rating: 5,
        text: `${lawyerConfig.name} is very competent and dedicated. I strongly recommend.`,
        service: 'Business Law',
        date: '2024-01-10'
    },
    {
        id: 3,
        name: 'Emily Wilson',
        rating: 5,
        text: 'Exceptional service and impeccable technical knowledge.',
        service: 'Family Law',
        date: '2024-01-05'
    }
] as const

// ============================================================================
// STATISTICS (Simplificado - usando dados do config)
// ============================================================================

export const STATISTICS = [
    {
        id: 1,
        label: 'Years of Experience',
        value: `${lawyerConfig.statistics.experience}+`,
        icon: 'briefcase'
    },
    {
        id: 2,
        label: 'Cases Resolved',
        value: `${lawyerConfig.statistics.casesResolved}+`,
        icon: 'check-circle'
    },
    {
        id: 3,
        label: 'Success Rate',
        value: `${lawyerConfig.statistics.successRate}`,
        icon: 'trending-up'
    },
    {
        id: 4,
        label: 'Satisfied Clients',
        value: '200+',
        icon: 'users'
    }
] as const

// ============================================================================
// RE-EXPORTS FROM CONFIG (Para manter compatibilidade)
// ============================================================================

// Re-export configurations from the centralized config
export {
    coreAnimationConfig as ANIMATION, breakpoints as BREAKPOINTS, contactDetailsConfig as CONTACT, formValidationConfig as FORM, navigationConfig as NAVIGATION, seoConfig as SEO,
    socialConfig as SOCIAL, themeConfig as THEME
} from '@/lib/core/config'
