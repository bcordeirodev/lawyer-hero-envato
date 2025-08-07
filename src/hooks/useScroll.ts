/**
 * useScroll Hook
 * Manages scroll detection, intersection observer, and scroll-based animations
 */

import { useCallback, useEffect, useRef, useState } from 'react'

// ============================================================================
// SCROLL TYPES
// ============================================================================

export interface ScrollState {
    scrollY: number
    scrollX: number
    scrollDirection: 'up' | 'down' | null
    isScrolling: boolean
    scrollProgress: number
}

export interface IntersectionOptions {
    threshold?: number | number[]
    rootMargin?: string
    root?: Element | null
}

export interface IntersectionState {
    isIntersecting: boolean
    intersectionRatio: number
    entry?: IntersectionObserverEntry
}

// ============================================================================
// USE SCROLL HOOK
// ============================================================================

/**
 * useScroll - Scroll detection hook
 * 
 * Provides scroll state and utilities for scroll-based animations
 * 
 * @returns Object containing scroll state and utilities
 */
export function useScroll() {
    const [scrollState, setScrollState] = useState<ScrollState>({
        scrollY: 0,
        scrollX: 0,
        scrollDirection: null,
        isScrolling: false,
        scrollProgress: 0
    })

    const lastScrollY = useRef(0)
    const scrollTimeout = useRef<NodeJS.Timeout | undefined>(undefined)

    const updateScrollState = useCallback(() => {
        const currentScrollY = window.scrollY
        const currentScrollX = window.scrollX
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        const scrollProgress = maxScroll > 0 ? (currentScrollY / maxScroll) * 100 : 0

        setScrollState(_prev => ({
            scrollY: currentScrollY,
            scrollX: currentScrollX,
            scrollDirection: currentScrollY > lastScrollY.current ? 'down' : 'up',
            isScrolling: true,
            scrollProgress: Math.min(scrollProgress, 100)
        }))

        lastScrollY.current = currentScrollY

        // Clear scrolling state after delay
        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current)
        }

        scrollTimeout.current = setTimeout(() => {
            setScrollState(prev => ({ ...prev, isScrolling: false }))
        }, 150)
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', updateScrollState, { passive: true })

        return () => {
            window.removeEventListener('scroll', updateScrollState)
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current)
            }
        }
    }, [updateScrollState])

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    const scrollToElement = useCallback((elementId: string, offset: number = 0) => {
        const element = document.getElementById(elementId)
        if (element) {
            const elementTop = element.offsetTop - offset
            window.scrollTo({ top: elementTop, behavior: 'smooth' })
        }
    }, [])

    const scrollToSection = useCallback((sectionId: string) => {
        scrollToElement(sectionId, 80) // Account for header height
    }, [scrollToElement])

    return {
        ...scrollState,
        scrollToTop,
        scrollToElement,
        scrollToSection
    }
}

// ============================================================================
// USE INTERSECTION OBSERVER HOOK
// ============================================================================

/**
 * useIntersectionObserver - Intersection observer hook
 * 
 * Provides intersection observer functionality for scroll-based animations
 * 
 * @param options - Intersection observer options
 * @returns Object containing intersection state and ref
 */
export function useIntersectionObserver(options: IntersectionOptions = {}) {
    const [intersectionState, setIntersectionState] = useState<IntersectionState>({
        isIntersecting: false,
        intersectionRatio: 0
    })

    const elementRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]
                if (entry) {
                    setIntersectionState({
                        isIntersecting: entry.isIntersecting,
                        intersectionRatio: entry.intersectionRatio,
                        entry
                    })
                }
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '0px',
                root: options.root || null
            }
        )

        observer.observe(element)

        return () => {
            observer.unobserve(element)
        }
    }, [options.threshold, options.rootMargin, options.root])

    return {
        ...intersectionState,
        ref: elementRef
    }
}

// ============================================================================
// USE SCROLL PROGRESS HOOK
// ============================================================================

/**
 * useScrollProgress - Scroll progress hook
 * 
 * Provides scroll progress for specific elements or sections
 * 
 * @param elementId - Element ID to track
 * @returns Scroll progress percentage
 */
export function useScrollProgress(elementId: string) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const updateProgress = () => {
            const element = document.getElementById(elementId)
            if (!element) return

            // const rect = element.getBoundingClientRect()
            const windowHeight = window.innerHeight
            const elementHeight = element.offsetHeight

            // Calculate progress based on element visibility
            const visibleHeight = Math.min(windowHeight, elementHeight)
            const scrollTop = window.scrollY
            const elementTop = element.offsetTop
            const elementBottom = elementTop + elementHeight

            let currentProgress = 0

            if (scrollTop >= elementTop && scrollTop <= elementBottom) {
                currentProgress = ((scrollTop - elementTop) / (elementHeight - visibleHeight)) * 100
            } else if (scrollTop > elementBottom) {
                currentProgress = 100
            }

            setProgress(Math.max(0, Math.min(100, currentProgress)))
        }

        window.addEventListener('scroll', updateProgress, { passive: true })
        updateProgress() // Initial calculation

        return () => {
            window.removeEventListener('scroll', updateProgress)
        }
    }, [elementId])

    return progress
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Checks if element is in viewport
 * @param element - Element to check
 * @param threshold - Visibility threshold (0-1)
 * @returns Whether element is in viewport
 */
export function isInViewport(element: Element, threshold: number = 0.1): boolean {
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight

    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
    const elementHeight = rect.height

    return (visibleHeight / elementHeight) >= threshold
}

/**
 * Gets scroll direction
 * @param currentScroll - Current scroll position
 * @param lastScroll - Last scroll position
 * @returns Scroll direction
 */
export function getScrollDirection(currentScroll: number, lastScroll: number): 'up' | 'down' | null {
    if (currentScroll === lastScroll) return null
    return currentScroll > lastScroll ? 'down' : 'up'
} 