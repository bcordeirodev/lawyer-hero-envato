
import { LAWYER_CONFIG } from '@/config'

export const SEO_CONFIG = {
    siteName: `${LAWYER_CONFIG.lawyer.name} - Advocacia`,
    siteUrl: 'https://geovannanery.com',
    siteDescription: LAWYER_CONFIG.lawyer.description,
    siteImage: '/images/og-default.jpg',
    twitterHandle: '@advocaciageovanna',
    locale: 'pt_BR',
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
        'advogada',
        'direito civil',
        'direito empresarial',
        'direito família',
        'São Paulo',
        'assessoria jurídica',
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
        'advocacia',
        'advogado',
        'direito',
        'jurídico',
        'consulta',
        'assessoria',
    ]

    return generateKeywords(serviceKeywords)
} 