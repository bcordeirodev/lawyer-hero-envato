
import { LAWYER_CONFIG } from '@/config'

export const SEO_CONFIG = {
    siteName: `${LAWYER_CONFIG.lawyer.name} - Law Office`,
    siteUrl: 'https://johnsmithlaw.com',
    siteDescription: LAWYER_CONFIG.lawyer.description,
    siteImage: '/images/og-default.jpg',
    twitterHandle: '@johnsmithlaw',
    locale: 'en_US',
    type: 'website' as const,
}

export const generateCanonicalUrl = (path: string = '') => {
    return `${SEO_CONFIG.siteUrl}${path}`
}

export const generateServiceUrl = (serviceId: string) => {
    return `${SEO_CONFIG.siteUrl}/servicos/${serviceId}`
}

export const generateOpenGraphUrl = (path: string = '') => {
    return `${SEO_CONFIG.siteUrl}${path}`
}

export const generateTwitterCardUrl = (path: string = '') => {
    return `${SEO_CONFIG.siteUrl}${path}`
}

export const generateKeywords = (additionalKeywords: string[] = []) => {
    const baseKeywords = [
        'attorney',
        'civil law',
        'business law',
        'family law',
        'New York',
        'legal counsel',
        LAWYER_CONFIG.lawyer.name,
        LAWYER_CONFIG.lawyer.credentials.bar,
        ...LAWYER_CONFIG.services.map(service => service.title.toLowerCase()),
        ...additionalKeywords,
    ]

    return baseKeywords.join(', ')
}

export const generateServiceKeywords = (serviceId: string) => {
    const service = LAWYER_CONFIG.services.find(s => s.id === serviceId)
    if (!service) return generateKeywords()

    const serviceKeywords = [
        service.title.toLowerCase(),
        ...service.features.map(feature => feature.toLowerCase()),
        'law office',
        'attorney',
        'law',
        'legal',
        'consultation',
        'counsel',
    ]

    return generateKeywords(serviceKeywords)
} 