/**
 * Performance Utilities Index
 * Central exports for performance optimization utilities
 */

export * from './lazy-loading'

// Basic performance tracking utilities
export function trackWebVitals() {
    if (typeof window === 'undefined') return

    // Track basic performance metrics using Performance API
    window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

        if (navigation) {
            const metrics = {
                loadTime: navigation.loadEventEnd - navigation.loadEventStart,
                domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                ttfb: navigation.responseStart - navigation.requestStart,
                dns: navigation.domainLookupEnd - navigation.domainLookupStart,
                tcp: navigation.connectEnd - navigation.connectStart
            }

            // Log metrics in development
            if (process.env.NODE_ENV === 'development') {
                console.log('Performance Metrics:', metrics)
            }
        }
    })
}

// Memory usage monitoring
export function monitorMemoryUsage() {
    if (typeof window === 'undefined' || !('memory' in performance)) return null

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const memory = (performance as any).memory

    return {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
        usage: ((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100).toFixed(2)
    }
}

// Performance marks and measures
export function createPerformanceMark(name: string) {
    if (typeof window === 'undefined') return
    performance.mark(name)
}

export function measurePerformance(name: string, startMark: string, endMark: string) {
    if (typeof window === 'undefined') return

    try {
        performance.measure(name, startMark, endMark)
        const measure = performance.getEntriesByName(name, 'measure')[0]
        return measure.duration
    } catch (error) {
        console.warn('Performance measurement failed:', error)
        return null
    }
}

// Resource hints utilities
export function addResourceHint(href: string, rel: 'preload' | 'prefetch' | 'preconnect', as?: string) {
    if (typeof document === 'undefined') return

    const link = document.createElement('link')
    link.rel = rel
    link.href = href

    if (as) link.as = as
    if (rel === 'preconnect') link.crossOrigin = 'anonymous'

    document.head.appendChild(link)
}