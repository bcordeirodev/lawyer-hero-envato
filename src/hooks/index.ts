/**
 * Hooks Index
 * Centralized exports for all custom hooks
 */

// ============================================================================
// FORM HOOKS
// ============================================================================

export { useContactForm } from './useContactForm'
export type {
    ContactFormActions, ContactFormState, UseContactFormReturn
} from './useContactForm'

// ============================================================================
// ANIMATION HOOKS
// ============================================================================

export { createHoverAnimation, useAnimation } from './useAnimation'
export type {
    AnimationConfig,
    HoverAnimationConfig
} from './useAnimation'

// ============================================================================
// CONTACT HOOKS
// ============================================================================

// export { useContact } from './useContact' // Removido - hook problemático
// export type {
//     ContactMethod,
//     ContactInfo,
//     ContactPreferences,
//     UseContactReturn,
//     ContactHistory
// } from './useContact'

// ============================================================================
// SERVICES HOOKS
// ============================================================================

export { useServices } from './useServices'
export type {
    ServiceCategory,
    ServiceFilter,
    UseServicesReturn
} from './useServices'

// ============================================================================
// SCROLL ANIMATION HOOKS
// ============================================================================

export {
    createFadeInAnimation,
    createScaleInAnimation, createStaggerAnimation, useScrollAnimation
} from './useScrollAnimation'
export type {
    ScrollAnimationConfig,
    ScrollAnimationState,
    UseScrollAnimationReturn
} from './useScrollAnimation'

// ============================================================================
// FORM VALIDATION HOOKS
// ============================================================================

export {
    createCNPJRules, createCPFRules, createEmailRules,
    createPhoneRules, useFormValidation
} from './useFormValidation'
export type {
    FormErrors,
    UseFormValidationReturn, ValidationRule,
    ValidationRules
} from './useFormValidation'

// ============================================================================
// SCROLL HOOKS
// ============================================================================

export { getScrollDirection, isInViewport, useIntersectionObserver, useScroll, useScrollProgress } from './useScroll'
export type {
    IntersectionOptions,
    IntersectionState, ScrollState
} from './useScroll'

// ============================================================================
// STORAGE HOOKS
// ============================================================================

export {
    clearLocalStorage,
    getLocalStorageKeys,
    isLocalStorageAvailable, removeFromLocalStorage, useLocalStorage, useLocalStorageBoolean,
    useLocalStorageNumber, useLocalStorageString
} from './useLocalStorage'
export type { LocalStorageOptions } from './useLocalStorage'

// ============================================================================
// PERFORMANCE HOOKS
// ============================================================================

export {
    useMemoryMonitoring, usePagePerformance, usePerformance
} from './usePerformance'
export type { PerformanceMetrics } from './usePerformance'

// ============================================================================
// ALL HOOKS (for convenience)
// ============================================================================

// Import all hooks for the convenience object
import { useAnimation } from './useAnimation'
import { useContactForm } from './useContactForm'
// import { useContact } from './useContact' // Removido
import { useFormValidation } from './useFormValidation'
import { useLocalStorage, useLocalStorageBoolean, useLocalStorageNumber, useLocalStorageString } from './useLocalStorage'
import { useIntersectionObserver, useScroll, useScrollProgress } from './useScroll'
import { useScrollAnimation } from './useScrollAnimation'
import { useServices } from './useServices'

export const hooks = {
    // Form hooks
    useContactForm,
    useFormValidation,

    // Animation hooks
    useAnimation,
    useScrollAnimation,

    // Contact hooks
    // useContact, // Removido

    // Services hooks
    useServices,

    // Scroll hooks
    useScroll,
    useIntersectionObserver,
    useScrollProgress,

    // Storage hooks
    useLocalStorage,
    useLocalStorageString,
    useLocalStorageBoolean,
    useLocalStorageNumber
} as const 