/**
 * Lazy Loading Utilities
 * Utilities for dynamic imports and component lazy loading
 */

import { ComponentType, lazy } from 'react'

/**
 * Creates a lazy-loaded component with loading fallback
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createLazyComponent<T extends ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>,
    fallback?: React.ComponentType
) {
    const LazyComponent = lazy(importFunc)

    if (fallback) {
        return {
            Component: LazyComponent,
            Fallback: fallback
        }
    }

    return LazyComponent
}

/**
 * Preload a dynamic import
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function preloadComponent(importFunc: () => Promise<any>) {
    const componentImport = importFunc()
    return componentImport
}

/**
 * Create an intersection observer for lazy loading
 */
export function createLazyObserver(
    callback: (entries: IntersectionObserverEntry[]) => void,
    options?: IntersectionObserverInit
) {
    if (typeof window === 'undefined') return null

    return new IntersectionObserver(callback, {
        rootMargin: '50px',
        threshold: 0.1,
        ...options
    })
}

/**
 * Lazy load images with intersection observer
 */
export function lazyLoadImage(img: HTMLImageElement, src: string) {
    const observer = createLazyObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const image = entry.target as HTMLImageElement
                image.src = src
                image.classList.remove('lazy')
                observer?.unobserve(image)
            }
        })
    })

    if (observer) {
        img.classList.add('lazy')
        observer.observe(img)
    }
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources() {
    if (typeof window === 'undefined') return

    // Preload fonts
    const fonts = [
        '/fonts/inter-var.woff2',
    ]

    fonts.forEach(font => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'font'
        link.type = 'font/woff2'
        link.crossOrigin = 'anonymous'
        link.href = font
        document.head.appendChild(link)
    })

    // Preload critical images
    const criticalImages = [
        '/images/perfil.png',
    ]

    criticalImages.forEach(src => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = src
        document.head.appendChild(link)
    })
}