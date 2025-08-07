/**
 * Performance Monitoring Hook
 * Hook for tracking performance metrics and web vitals
 */

import { useEffect, useState } from 'react'

export interface PerformanceMetrics {
    cls: number | null
    fid: number | null
    fcp: number | null
    lcp: number | null
    ttfb: number | null
    isLoading: boolean
}

export function usePerformance() {
    const [metrics, setMetrics] = useState<PerformanceMetrics>({
        cls: null,
        fid: null,
        fcp: null,
        lcp: null,
        ttfb: null,
        isLoading: true
    })

    useEffect(() => {
        let mounted = true

        // Basic performance tracking without web-vitals dependency
        const trackBasicMetrics = () => {
            if (!mounted) return

            // Use basic Performance API
            const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

            if (navigation) {
                const fcp = performance.getEntriesByName('first-contentful-paint')[0]
                const lcp = performance.getEntriesByType('largest-contentful-paint')[0]

                setMetrics(prev => ({
                    ...prev,
                    fcp: fcp?.startTime || null,
                    lcp: lcp?.startTime || null,
                    ttfb: navigation.responseStart - navigation.requestStart,
                    isLoading: false
                }))
            } else {
                setMetrics(prev => ({ ...prev, isLoading: false }))
            }
        }

        // Only run on client side
        if (typeof window !== 'undefined') {
            // Wait for page load to get accurate metrics
            if (document.readyState === 'complete') {
                trackBasicMetrics()
            } else {
                window.addEventListener('load', trackBasicMetrics)
            }
        } else {
            setMetrics(prev => ({ ...prev, isLoading: false }))
        }

        return () => {
            mounted = false
        }
    }, [])

    return metrics
}

/**
 * Hook for tracking page performance
 */
export function usePagePerformance(pageName: string) {
    useEffect(() => {
        if (typeof window === 'undefined') return

        // const startTime = performance.now() // Removido temporariamente
        const startMark = `${pageName}-start`

        performance.mark(startMark)

        // Track page load time
        const handleLoad = () => {
            const endMark = `${pageName}-end`
            performance.mark(endMark)

            try {
                performance.measure(`${pageName}-load`, startMark, endMark)
                const measure = performance.getEntriesByName(`${pageName}-load`, 'measure')[0]

                // Log performance data (in production, send to analytics)
                if (process.env.NODE_ENV === 'development') {
                    console.log(`${pageName} load time:`, measure.duration.toFixed(2), 'ms')
                }
            } catch (error) {
                console.warn('Performance measurement failed:', error)
            }
        }

        // Use requestIdleCallback for non-critical performance tracking
        if ('requestIdleCallback' in window) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).requestIdleCallback(handleLoad)
        } else {
            setTimeout(handleLoad, 0)
        }

        return () => {
            // Cleanup performance entries
            try {
                performance.clearMarks(startMark)
                performance.clearMarks(`${pageName}-end`)
                performance.clearMeasures(`${pageName}-load`)
            } catch {
                // Ignore cleanup errors
            }
        }
    }, [pageName])
}

/**
 * Hook for monitoring memory usage
 */
export function useMemoryMonitoring() {
    const [memoryInfo, setMemoryInfo] = useState<{
        used: number
        total: number
        limit: number
        percentage: number
    } | null>(null)

    useEffect(() => {
        if (typeof window === 'undefined' || !('memory' in performance)) {
            return
        }

        const updateMemoryInfo = () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const memory = (performance as any).memory

            setMemoryInfo({
                used: memory.usedJSHeapSize,
                total: memory.totalJSHeapSize,
                limit: memory.jsHeapSizeLimit,
                percentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
            })
        }

        updateMemoryInfo()

        // Update memory info every 10 seconds
        const interval = setInterval(updateMemoryInfo, 10000)

        return () => clearInterval(interval)
    }, [])

    return memoryInfo
}