/**
 * Animation configurations and utilities
 * Provides reusable animation patterns following DRY principle
 */

import { Variants } from 'framer-motion'

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

/**
 * Fade in animation variant
 */
export const fadeIn: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
}

/**
 * Slide in from left animation variant
 */
export const slideInLeft: Variants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
}

/**
 * Slide in from right animation variant
 */
export const slideInRight: Variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
}

/**
 * Slide in from top animation variant
 */
export const slideInTop: Variants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
}

/**
 * Slide in from bottom animation variant
 */
export const slideInBottom: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
}

/**
 * Scale in animation variant
 */
export const scaleIn: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
}

/**
 * Stagger animation for lists
 */
export const staggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

/**
 * Stagger item animation
 */
export const staggerItem: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
}

// ============================================================================
// ANIMATION CONFIGURATIONS
// ============================================================================

/**
 * Standard animation configurations
 */
export const animationConfig = {
    duration: {
        fast: 0.15,
        normal: 0.2,
        slow: 0.4,
        slower: 0.6
    },
    easing: {
        easeOut: [0.16, 1, 0.3, 1], // Custom easing curve for smoother animations
        easeInOut: [0.65, 0, 0.35, 1],
        easeIn: [0.32, 0, 0.67, 0]
    },
    delay: {
        none: 0,
        small: 0.05,
        medium: 0.1,
        large: 0.2
    }
}

/**
 * Floating animation for decorative elements
 */
export const floatingAnimation = {
    animate: {
        y: [0, -20, 0],
        rotate: [0, 5, 0],
    },
    transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
    }
}

/**
 * Floating animation with delay
 */
export const floatingAnimationDelayed = {
    animate: {
        y: [0, 20, 0],
        rotate: [0, -5, 0],
    },
    transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2,
    }
}

// ============================================================================
// ANIMATION UTILITIES
// ============================================================================

/**
 * Creates a staggered animation with custom delay
 * @param delay - Delay between items in seconds
 * @returns Staggered animation configuration
 */
export const createStaggerAnimation = (delay: number = 0.1) => ({
    initial: {},
    animate: {
        transition: {
            staggerChildren: delay
        }
    }
})

/**
 * Creates a fade in animation with custom duration
 * @param duration - Animation duration in seconds
 * @param delay - Animation delay in seconds
 * @returns Fade in animation configuration
 */
export const createFadeInAnimation = (duration: number = 0.6, delay: number = 0) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration, delay }
})

/**
 * Creates a slide in animation with custom direction and duration
 * @param direction - Slide direction ('left', 'right', 'top', 'bottom')
 * @param duration - Animation duration in seconds
 * @param delay - Animation delay in seconds
 * @returns Slide in animation configuration
 */
export const createSlideInAnimation = (
    direction: 'left' | 'right' | 'top' | 'bottom' = 'left',
    duration: number = 0.6,
    delay: number = 0
) => {
    const variants = {
        left: { x: -20 },
        right: { x: 20 },
        top: { y: -20 },
        bottom: { y: 20 }
    }

    return {
        initial: { opacity: 0, ...variants[direction] },
        animate: { opacity: 1, x: 0, y: 0 },
        transition: { duration, delay }
    }
}

// ============================================================================
// HOOK ANIMATIONS
// ============================================================================

/**
 * Hover animations for interactive elements
 */
export const hoverAnimations = {
    scale: {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 }
    },
    lift: {
        whileHover: { y: -2, scale: 1.02 },
        whileTap: { y: 0, scale: 0.98 }
    },
    glow: {
        whileHover: {
            boxShadow: "0 0 20px rgba(234, 179, 8, 0.3)",
            scale: 1.02
        }
    }
}

/**
 * Viewport animations for scroll-triggered animations
 */
export const viewportAnimations = {
    once: true,
    amount: 0.2, // Reduced threshold for better performance
    margin: "-50px", // Reduced margin for smoother triggering
    rootMargin: "-50px", // Added root margin for better control
    threshold: [0, 0.2, 1] // Added thresholds for more precise control
} 