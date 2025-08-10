"use client"

import { cn } from "@/lib/core/utils"
import { motion } from "framer-motion"
import { type ReactNode } from "react"

// ============================================================================
// TYPES
// ============================================================================

interface SectionBadgeProps {
    children: ReactNode
    className?: string
    animated?: boolean
    variant?: 'default' | 'outline' | 'solid'
}

// ============================================================================
// VARIANTS
// ============================================================================

const badgeVariants = {
    default: 'section-badge',
    outline: 'inline-flex items-center gap-2 border-2 border-gold-500 text-gold-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 bg-transparent',
    solid: 'inline-flex items-center gap-2 bg-gold-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg'
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * SectionBadge Component
 * Badge padronizado para identificar seções
 * 
 * @example
 * ```tsx
 * <SectionBadge animated>⚖️ Our Services</SectionBadge>
 * <SectionBadge variant="outline">📞 Contact</SectionBadge>
 * ```
 */
export function SectionBadge({
    children,
    className,
    animated = true,
    variant = 'default'
}: SectionBadgeProps) {
    if (animated) {
        return (
            <motion.div
                className={cn(badgeVariants[variant], className)}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.05, y: -2 }}
            >
                {children}
            </motion.div>
        )
    }

    return (
        <div className={cn(badgeVariants[variant], className)}>
            {children}
        </div>
    )
}

// ============================================================================
// PRESET COMPONENTS
// ============================================================================

/**
 * ServicesBadge - Preset for services section
 */
export function ServicesBadge() {
    return <SectionBadge>⚖️ Our Services</SectionBadge>
}

/**
 * AboutBadge - Preset for about section
 */
export function AboutBadge() {
    return <SectionBadge>👩‍💼 About the Attorney</SectionBadge>
}

/**
 * ContactBadge - Preset for contact section
 */
export function ContactBadge() {
    return <SectionBadge>📞 Get in Touch</SectionBadge>
}