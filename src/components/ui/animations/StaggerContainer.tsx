"use client"

import { DESIGN_TOKENS } from "@/lib/design-tokens"
import { motion } from "framer-motion"
import { type ReactNode } from "react"

// ============================================================================
// TYPES
// ============================================================================

interface StaggerContainerProps {
    children: ReactNode
    className?: string
    staggerDelay?: number
    delayChildren?: number
    direction?: 'normal' | 'reverse'
}

interface StaggerItemProps {
    children: ReactNode
    className?: string
    index?: number
}

// ============================================================================
// STAGGER CONTAINER
// ============================================================================

/**
 * StaggerContainer Component
 * Provides staggered animations for child elements
 * 
 * @example
 * ```tsx
 * <StaggerContainer>
 *   <StaggerItem><Card /></StaggerItem>
 *   <StaggerItem><Card /></StaggerItem>
 * </StaggerContainer>
 * ```
 */
export function StaggerContainer({
    children,
    className,
    staggerDelay = 0.1,
    delayChildren = 0.1,
    direction = 'normal'
}: StaggerContainerProps) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: delayChildren,
                        staggerDirection: direction === 'reverse' ? -1 : 1
                    }
                }
            }}
        >
            {children}
        </motion.div>
    )
}

// ============================================================================
// STAGGER ITEM
// ============================================================================

/**
 * StaggerItem Component
 * Individual item that animates within a StaggerContainer
 */
export function StaggerItem({
    children,
    className,
    index: _index
}: StaggerItemProps) {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: {
                    opacity: 0,
                    y: 20,
                    scale: 0.95
                },
                visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                        duration: DESIGN_TOKENS.animations.duration.slower,
                        ease: DESIGN_TOKENS.animations.easing.default
                    }
                }
            }}
        >
            {children}
        </motion.div>
    )
}

// ============================================================================
// PRESET COMPONENTS
// ============================================================================

/**
 * CardGrid - Preset for card grids with stagger animation
 */
export function StaggeredCardGrid({
    children,
    className = "grid gap-6",
    ...props
}: StaggerContainerProps) {
    return (
        <StaggerContainer className={className} {...props}>
            {children}
        </StaggerContainer>
    )
}

/**
 * FeatureList - Preset for feature lists with stagger animation
 */
export function StaggeredList({
    children,
    className = "space-y-4",
    ...props
}: StaggerContainerProps) {
    return (
        <StaggerContainer className={className} {...props}>
            {children}
        </StaggerContainer>
    )
}