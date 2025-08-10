"use client"

import { cn } from "@/lib/core/utils"
import { DESIGN_TOKENS } from "@/lib/design-tokens"
import { motion } from "framer-motion"
import { type ReactNode } from "react"
import { FadeInUp, FadeInView } from "../animations"

// ============================================================================
// TYPES
// ============================================================================

interface StandardSectionProps {
    id: string
    badge?: string
    title: string
    description?: string
    children: ReactNode
    className?: string
    containerClassName?: string
    headerClassName?: string
    background?: 'primary' | 'secondary' | 'tertiary' | 'transparent'
    size?: 'sm' | 'md' | 'lg' | 'xl'
    centerContent?: boolean
    pattern?: boolean
}

// ============================================================================
// BACKGROUND VARIANTS
// ============================================================================

const backgroundVariants = {
    primary: 'bg-background-primary',
    secondary: 'bg-background-secondary',
    tertiary: 'bg-background-tertiary',
    transparent: 'bg-transparent'
}

const sizeVariants = {
    sm: DESIGN_TOKENS.spacing.section.paddingSmall,
    md: DESIGN_TOKENS.spacing.section.padding,
    lg: DESIGN_TOKENS.spacing.section.paddingLarge,
    xl: 'py-16 sm:py-20 lg:py-32 xl:py-40'
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * StandardSection Component
 * Padroniza todas as seções com header, badge e animações consistentes
 * 
 * @example
 * ```tsx
 * <StandardSection
 *   id="services"
 *   badge="⚖️ Our Services"
 *   title="Practice Areas"
*   description="Legal specialties with personalized service"
 * >
 *   <ServiceGrid />
 * </StandardSection>
 * ```
 */
export function StandardSection({
    id,
    badge,
    title,
    description,
    children,
    className,
    containerClassName,
    headerClassName,
    background = 'primary',
    size = 'md',
    centerContent = true,
    pattern = false
}: StandardSectionProps) {
    return (
        <section
            id={id}
            className={cn(
                'relative',
                sizeVariants[size],
                backgroundVariants[background],
                pattern && 'section--with-pattern',
                className
            )}
        >
            {/* Background Pattern */}
            {pattern && (
                <div className="absolute inset-0 opacity-5">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23eab308' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}
                    />
                </div>
            )}

            <div className={cn(
                DESIGN_TOKENS.spacing.container.maxWidth,
                DESIGN_TOKENS.spacing.container.padding,
                'relative z-10',
                containerClassName
            )}>

                {/* Section Header */}
                {(badge || title || description) && (
                    <div className={cn(
                        centerContent ? 'text-center' : '',
                        'mb-12 sm:mb-16',
                        headerClassName
                    )}>

                        {/* Badge */}
                        {badge && (
                            <FadeInView delay={0.1}>
                                <motion.div
                                    className="section-badge"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {badge}
                                </motion.div>
                            </FadeInView>
                        )}

                        {/* Title */}
                        <FadeInView delay={0.2}>
                            <motion.h2
                                className="section-title"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                {title}
                            </motion.h2>
                        </FadeInView>

                        {/* Description */}
                        {description && (
                            <FadeInUp delay={0.3}>
                                <p className="section-description">
                                    {description}
                                </p>
                            </FadeInUp>
                        )}
                    </div>
                )}

                {/* Section Content */}
                <FadeInView delay={0.4}>
                    {children}
                </FadeInView>
            </div>
        </section>
    )
}

// ============================================================================
// PRESET COMPONENTS
// ============================================================================

/**
 * HeroSection - Preset para seções hero
 */
export function HeroSection(props: Omit<StandardSectionProps, 'size' | 'background'>) {
    return (
        <StandardSection
            {...props}
            size="xl"
            background="primary"
            pattern={true}
        />
    )
}

/**
 * ContentSection - Preset para seções de conteúdo
 */
export function ContentSection(props: Omit<StandardSectionProps, 'size'>) {
    return (
        <StandardSection
            {...props}
            size="md"
        />
    )
}

/**
 * CompactSection - Preset para seções compactas
 */
export function CompactSection(props: Omit<StandardSectionProps, 'size'>) {
    return (
        <StandardSection
            {...props}
            size="sm"
        />
    )
}