import { LAWYER_CONFIG } from '@/config'
import { Metadata } from 'next'
import { SEO_CONFIG, generateKeywords, generateServiceKeywords } from './seo'

export interface MetadataOptions {
    title?: string
    description?: string
    image?: string
    url?: string
    service?: string
}

export function generateMetadata(options: MetadataOptions = {}): Metadata {
    const { lawyer } = LAWYER_CONFIG

    const defaultTitle = `${lawyer.name} - ${lawyer.title}`
    const defaultDescription = lawyer.detailedDescription
    const defaultImage = SEO_CONFIG.siteImage

    const title = options.title || defaultTitle
    const description = options.description || defaultDescription
    const image = options.image || defaultImage
    const url = options.url || SEO_CONFIG.siteUrl

    return {
        title,
        description,
        keywords: generateKeywords(),
        authors: [{ name: lawyer.name }],
        creator: lawyer.name,
        publisher: lawyer.name,
        category: 'Legal Services',
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        openGraph: {
            title,
            description,
            url,
            siteName: SEO_CONFIG.siteName,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: `${lawyer.name} - ${lawyer.title}`,
                },
                {
                    url: 'https://picsum.photos/400/300?random=1',
                    width: 400,
                    height: 300,
                    alt: `${lawyer.name} - Advocacia`,
                },
            ],
            locale: SEO_CONFIG.locale,
            type: SEO_CONFIG.type,
            countryName: 'Brasil',
            emails: [lawyer.contact.email],
            phoneNumbers: [lawyer.contact.phone],
            faxNumbers: [],
            ttl: 86400,
            determiner: 'the',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image, 'https://picsum.photos/400/300?random=1'],
            creator: '@advocaciageovanna',
            site: '@advocaciageovanna',
            creatorId: '123456789',
            siteId: '123456789',
        },
        alternates: {
            canonical: url,
        },
        other: {
            'geo.region': 'BR-SP',
            'geo.placename': 'São Paulo',
            'geo.position': '-23.5505;-46.6333',
            'ICBM': '-23.5505, -46.6333',
        },
    }
}

export function generateServiceMetadata(serviceId: string): Metadata {
    const service = LAWYER_CONFIG.services.find(s => s.id === serviceId)
    const { lawyer } = LAWYER_CONFIG

    if (!service) {
        return generateMetadata()
    }

    const title = `${service.title} - ${lawyer.name}`
    const description = `${service.description} ${lawyer.name} oferece assessoria especializada em ${service.title.toLowerCase()}.`
    const image = `${SEO_CONFIG.siteImage}?name=${encodeURIComponent(lawyer.name)}&title=${encodeURIComponent(service.title)}&service=${encodeURIComponent(service.id)}`

    const metadata = generateMetadata({
        title,
        description,
        image,
        service: service.id,
    })

    // Override keywords for service-specific pages
    return {
        ...metadata,
        keywords: generateServiceKeywords(serviceId),
    }
}

export function generateStructuredData() {
    const { lawyer } = LAWYER_CONFIG

    return {
        '@context': 'https://schema.org',
        '@type': 'LegalService',
        name: `${lawyer.name} - Advocacia`,
        description: lawyer.description,
        url: 'https://geovannanery.com',
        telephone: lawyer.contact.phone,
        email: lawyer.contact.email,
        image: 'https://picsum.photos/400/300?random=1',
        logo: 'https://picsum.photos/200/200?random=1',
        address: {
            '@type': 'PostalAddress',
            addressLocality: lawyer.credentials.location.split(', ')[0],
            addressRegion: lawyer.credentials.location.split(', ')[1],
            addressCountry: 'BR',
            postalCode: '01234-567',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: -23.5505,
            longitude: -46.6333,
        },
        openingHours: lawyer.contact.workingHours,
        priceRange: '$$',
        paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
        currenciesAccepted: 'BRL',
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Serviços Jurídicos',
            itemListElement: LAWYER_CONFIG.services.map((service, index) => ({
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: service.title,
                    description: service.description,
                    category: service.category,
                    serviceType: service.title,
                },
                position: index + 1,
                price: 'Consultar',
                priceCurrency: 'BRL',
            })),
        },
        employee: {
            '@type': 'Person',
            name: lawyer.fullName,
            alternateName: lawyer.name,
            jobTitle: lawyer.title,
            description: lawyer.detailedDescription,
            image: 'https://picsum.photos/200/200?random=1',
            alumniOf: {
                '@type': 'Organization',
                name: 'Universidade de São Paulo (USP)',
            },
            knowsAbout: LAWYER_CONFIG.services.map(service => service.title),
            hasCredential: lawyer.credentials.bar,
            worksFor: {
                '@type': 'Organization',
                name: `${lawyer.name} - Advocacia`,
            },
            givenName: 'Geovanna',
            familyName: 'Nery da Silva',
            honorificPrefix: 'Dra.',
            honorificSuffix: 'OAB/SP',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '150',
            bestRating: '5',
            worstRating: '1',
        },
        review: [
            {
                '@type': 'Review',
                author: {
                    '@type': 'Person',
                    name: 'Maria Silva',
                },
                reviewRating: {
                    '@type': 'Rating',
                    ratingValue: '5',
                    bestRating: '5',
                },
                reviewBody: 'Excelente advogada, muito profissional e atenciosa. Resolveu meu problema rapidamente.',
            },
            {
                '@type': 'Review',
                author: {
                    '@type': 'Person',
                    name: 'João Santos',
                },
                reviewRating: {
                    '@type': 'Rating',
                    ratingValue: '5',
                    bestRating: '5',
                },
                reviewBody: `${lawyer.name} é muito competente e dedicada. Recomendo fortemente.`,
            },
        ],
        areaServed: {
            '@type': 'Place',
            name: `${lawyer.credentials.location}`,
        },
        serviceArea: {
            '@type': 'Place',
            name: `${lawyer.credentials.location} e região`,
        },
    }
} 