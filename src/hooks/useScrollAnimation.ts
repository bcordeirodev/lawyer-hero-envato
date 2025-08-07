/**
 * useScrollAnimation Hook
 * 
 * Hook para gerenciar animações de scroll de forma centralizada:
 * - Detecção de elementos visíveis
 * - Animações baseadas em scroll
 * - Configurações de animação reutilizáveis
 * - Performance otimizada
 * 
 * @author Bruno Cordeiro
 * @version 1.0.0
 */

import { useCallback, useEffect, useRef, useState } from 'react'
// import { useAnimation } from './useAnimation' // Removido temporariamente

// ============================================================================
// TYPES
// ============================================================================

export interface ScrollAnimationConfig {
    threshold?: number
    rootMargin?: string
    triggerOnce?: boolean
    delay?: number
    duration?: number
    stagger?: number
}

export interface ScrollAnimationState {
    isVisible: boolean
    hasAnimated: boolean
    progress: number
}

export interface UseScrollAnimationReturn {
    ref: React.RefObject<HTMLElement | null>
    isVisible: boolean
    hasAnimated: boolean
    progress: number
    triggerAnimation: () => void
    resetAnimation: () => void
    animationProps: Record<string, unknown>
}

// ============================================================================
// USE SCROLL ANIMATION HOOK
// ============================================================================

/**
 * useScrollAnimation - Hook para animações baseadas em scroll
 * 
 * Fornece funcionalidades para detectar quando elementos entram na viewport
 * e aplicar animações de forma otimizada
 * 
 * @param config - Configurações da animação
 * @returns Objeto com estado da animação e refs
 * 
 * @example
 * ```tsx
 * const { ref, isVisible, animationProps } = useScrollAnimation({
 *   threshold: 0.1,
 *   triggerOnce: true
 * })
 * 
 * return (
 *   <motion.div ref={ref} {...animationProps}>
 *     Conteúdo animado
 *   </motion.div>
 * )
 * ```
 */
export function useScrollAnimation(config: ScrollAnimationConfig = {}): UseScrollAnimationReturn {
    // ============================================================================
    // CONFIGURATION
    // ============================================================================

    const {
        threshold = 0.1,
        rootMargin = '0px',
        triggerOnce = true,
        delay = 0,
        duration = 0.6,
        // stagger: _stagger = 0  // Removido temporariamente
    } = config

    // ============================================================================
    // STATE
    // ============================================================================

    const [state, setState] = useState<ScrollAnimationState>({
        isVisible: false,
        hasAnimated: false,
        progress: 0
    })

    const ref = useRef<HTMLElement>(null)
    // const { fadeIn, scaleIn, slideInLeft, slideInRight } = useAnimation() // Removido temporariamente

    // ============================================================================
    // INTERSECTION OBSERVER
    // ============================================================================

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                const isIntersecting = entry.isIntersecting
                const progress = entry.intersectionRatio

                setState(prev => ({
                    ...prev,
                    isVisible: isIntersecting,
                    progress,
                    hasAnimated: prev.hasAnimated || (isIntersecting && triggerOnce)
                }))
            },
            {
                threshold,
                rootMargin
            }
        )

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [threshold, rootMargin, triggerOnce])

    // ============================================================================
    // ANIMATION PROPS
    // ============================================================================

    const animationProps = {
        initial: { opacity: 0, y: 20 },
        animate: state.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
        transition: {
            duration,
            delay,
            ease: "easeOut"
        }
    }

    // ============================================================================
    // ACTIONS
    // ============================================================================

    /**
     * Força o trigger da animação
     */
    const triggerAnimation = useCallback(() => {
        setState(prev => ({
            ...prev,
            isVisible: true,
            hasAnimated: true
        }))
    }, [])

    /**
     * Reseta a animação
     */
    const resetAnimation = useCallback(() => {
        setState({
            isVisible: false,
            hasAnimated: false,
            progress: 0
        })
    }, [])

    // ============================================================================
    // RETURN
    // ============================================================================

    return {
        ref,
        isVisible: state.isVisible,
        hasAnimated: state.hasAnimated,
        progress: state.progress,
        triggerAnimation,
        resetAnimation,
        animationProps
    }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Cria animação com stagger para múltiplos elementos
 * @param items - Array de itens
 * @param staggerDelay - Delay entre cada item
 * @returns Array de configurações de animação
 */
export function createStaggerAnimation(
    items: unknown[],
    staggerDelay: number = 0.1
) {
    return items.map((_, index) => ({
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: {
            duration: 0.6,
            delay: index * staggerDelay,
            ease: "easeOut"
        }
    }))
}

/**
 * Cria animação de entrada com fade
 * @param delay - Delay da animação
 * @param duration - Duração da animação
 * @returns Configuração de animação
 */
export function createFadeInAnimation(
    delay: number = 0,
    duration: number = 0.6
) {
    return {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: {
            duration,
            delay,
            ease: "easeOut"
        }
    }
}

/**
 * Cria animação de entrada com scale
 * @param delay - Delay da animação
 * @param duration - Duração da animação
 * @returns Configuração de animação
 */
export function createScaleInAnimation(
    delay: number = 0,
    duration: number = 0.6
) {
    return {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: {
            duration,
            delay,
            ease: "easeOut"
        }
    }
} 