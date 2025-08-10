"use client"

import { ServiceIcon, StaggerContainer, StaggerItem, StandardSection } from "@/components/ui"
import { LAWYER_CONFIG } from "@/config"
import { motion } from "framer-motion"

/**
 * Services Component - Legal specialties section
 * Displays the services offered by the attorney
 * Refactored to use standardized components
 */
export function Services() {
    const allServices = LAWYER_CONFIG.services

    return (
        <StandardSection
            id="services"
            badge="⚖️ Our Services"
            title="Our Services"
            description="Legal specialties with personalized service and effective solutions"
        >
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {allServices.map((service, _index) => (
                    <StaggerItem key={service.title}>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="group bg-background-secondary border border-border-secondary rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-300 h-full"
                        >
                            <div className="mb-4">
                                <ServiceIcon
                                    icon={service.icon}
                                    className="mb-4"
                                />
                                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-text-primary group-hover:text-secondary-500 transition-colors duration-300 mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-text-secondary text-xs sm:text-sm md:text-base mb-4">
                                    {service.description}
                                </p>
                            </div>
                            <ul className="space-y-2 sm:space-y-3">
                                {service.features.map((feature: string) => (
                                    <li
                                        key={feature}
                                        className="service-feature-item"
                                    >
                                        <div className="service-feature-bullet" />
                                        <span className="text-xs sm:text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </StandardSection>
    )
} 