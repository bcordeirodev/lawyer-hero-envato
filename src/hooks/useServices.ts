/**
 * useServices Hook
 * 
 * Hook to manage legal services with features:
 * - Category filtering
 * - Text search
 * - Sorting
 * - Pagination
 * 
 * @author Bruno Cordeiro
 * @version 1.0.0
 */

import { LAWYER_CONFIG } from '@/config'
import { useCallback, useMemo, useState } from 'react'

// ============================================================================
// TYPES
// ============================================================================

export type ServiceCategory = 'civil' | 'business' | 'family' | 'real-estate' | 'health' | 'tax'

export interface ServiceFilter {
    category?: ServiceCategory
    search?: string
    sortBy?: 'title' | 'id'
    sortOrder?: 'asc' | 'desc'
}

export interface UseServicesReturn {
    services: typeof LAWYER_CONFIG.services
    filteredServices: typeof LAWYER_CONFIG.services
    filter: ServiceFilter
    setFilter: (filter: Partial<ServiceFilter>) => void
    clearFilter: () => void
    getServiceById: (id: string) => typeof LAWYER_CONFIG.services[0] | undefined
    getServicesByCategory: (category: ServiceCategory) => typeof LAWYER_CONFIG.services
    categories: ServiceCategory[]
    activeCategory: ServiceCategory | null
    setActiveCategory: (category: ServiceCategory | null) => void
}

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialFilter: ServiceFilter = {
    category: undefined,
    search: '',
    sortBy: 'title',
    sortOrder: 'asc'
}

// ============================================================================
// USE SERVICES HOOK
// ============================================================================

/**
 * useServices - Hook to manage legal services
 * 
 * Provides filtering, search and sorting functionalities for services
 * 
 * @returns Object with services and filtering functionalities
 * 
 * @example
 * ```tsx
 * const {
 *   services,
 *   filteredServices,
 *   filter,
 *   setFilter,
 *   getServiceById
 * } = useServices()
 * ```
 */
export function useServices(): UseServicesReturn {
    // ============================================================================
    // STATE
    // ============================================================================

    const [filter, setFilterState] = useState<ServiceFilter>(initialFilter)
    const [activeCategory, setActiveCategoryState] = useState<ServiceCategory | null>(null)

    // ============================================================================
    // COMPUTED VALUES
    // ============================================================================

    const services = LAWYER_CONFIG.services
    const categories: ServiceCategory[] = ['civil', 'business', 'family', 'real-estate', 'health', 'tax']

    // ============================================================================
    // FILTERED SERVICES
    // ============================================================================

    const filteredServices = useMemo(() => {
        let result = [...services]

        // Filter by category
        if (filter.category) {
            result = result.filter(service => service.category === filter.category)
        }

        // Filter by search
        if (filter.search) {
            const searchLower = filter.search.toLowerCase()
            result = result.filter(service =>
                service.title.toLowerCase().includes(searchLower) ||
                service.description.toLowerCase().includes(searchLower) ||
                service.features.some(feature =>
                    feature.toLowerCase().includes(searchLower)
                )
            )
        }

        // Sort services
        if (filter.sortBy) {
            result.sort((a, b) => {
                const aValue = a[filter.sortBy!]
                const bValue = b[filter.sortBy!]

                if (filter.sortOrder === 'desc') {
                    return bValue.localeCompare(aValue)
                }
                return aValue.localeCompare(bValue)
            })
        }

        return result
    }, [services, filter])

    // ============================================================================
    // ACTIONS
    // ============================================================================

    /**
     * Updates the services filter
     * @param newFilter - New filter values
     */
    const setFilter = useCallback((newFilter: Partial<ServiceFilter>) => {
        setFilterState(prev => ({ ...prev, ...newFilter }))
    }, [])

    /**
     * Limpa todos os filtros
     */
    const clearFilter = useCallback(() => {
        setFilterState(initialFilter)
        setActiveCategoryState(null)
    }, [])

    /**
     * Busca um serviço pelo ID
     * @param id - ID do serviço
     * @returns Serviço encontrado ou undefined
     */
    const getServiceById = useCallback((id: string) => {
        return services.find(service => service.id === id)
    }, [services])

    /**
     * Search services by category
     * @param category - Service category
     * @returns Array of services in the category
     */
    const getServicesByCategory = useCallback((category: ServiceCategory) => {
        return services.filter(service => service.category === category)
    }, [services])

    /**
     * Sets the active category
     * @param category - Category to be set as active
     */
    const setActiveCategory = useCallback((category: ServiceCategory | null) => {
        setActiveCategoryState(category)
        setFilterState(prev => ({ ...prev, category: category || undefined }))
    }, [])

    // ============================================================================
    // RETURN
    // ============================================================================

    return {
        services,
        filteredServices,
        filter,
        setFilter,
        clearFilter,
        getServiceById,
        getServicesByCategory,
        categories,
        activeCategory,
        setActiveCategory
    }
} 