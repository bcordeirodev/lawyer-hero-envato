import { ServiceStructuredData } from '@/components/common/ServiceStructuredData'
import { LAWYER_CONFIG } from '@/config'
import { generateServiceMetadata } from '@/lib/seo/metadata'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface ServicePageProps {
    params: Promise<{
        service: string
    }>
}

export function generateStaticParams() {
    return LAWYER_CONFIG.services.map((service) => ({
        service: service.id,
    }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    const { service } = await params
    const serviceData = LAWYER_CONFIG.services.find(s => s.id === service)

    if (!serviceData) {
        return generateServiceMetadata('')
    }

    return generateServiceMetadata(service)
}

export default async function ServicePage({ params }: ServicePageProps) {
    const { service } = await params
    const serviceData = LAWYER_CONFIG.services.find(s => s.id === service)

    if (!serviceData) {
        notFound()
    }

    const { lawyer } = LAWYER_CONFIG

    return (
        <>
            <ServiceStructuredData serviceId={service} />
            <div className="min-h-screen bg-background-primary">
                <div className="container mx-auto px-4 py-16">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
                            {serviceData.title}
                        </h1>
                        <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
                            {serviceData.description}
                        </p>
                        <div className="flex items-center justify-center space-x-4 text-text-tertiary">
                            <span>⚖️ {lawyer.credentials.bar}</span>
                            <span>📍 {lawyer.credentials.location}</span>
                        </div>
                    </div>

                    {/* Service Details */}
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-card-primary rounded-lg p-8 mb-8">
                            <h2 className="text-2xl font-semibold text-text-primary mb-6">
                                What we offer in {serviceData.title}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {serviceData.features.map((feature: string, index: number) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-accent-primary rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-text-secondary">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact CTA */}
                        <div className="bg-gradient-to-r from-accent-primary to-accent-secondary rounded-lg p-8 text-center">
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                Need assistance with {serviceData.title}?
                            </h3>
                            <p className="text-white/90 mb-6">
                                Contact {lawyer.name} for a personalized consultation
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href={`${LAWYER_CONFIG.socialMedia.whatsapp}?text=Hello! I would like to schedule a consultation about ${serviceData.title}`}
                                    className="bg-white text-accent-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    📱 WhatsApp
                                </a>
                                <a
                                    href={`mailto:${lawyer.contact.email}?subject=Consulta - ${serviceData.title}`}
                                    className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-accent-primary transition-colors"
                                >
                                    📧 Email
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} 