/**
 * AppContext - Global application state management
 * Manages lawyer data, UI state, and application configuration
 */

"use client"

import { LAWYER_CONFIG } from '@/config'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react'

// ============================================================================
// APP STATE TYPES
// ============================================================================

export interface AppState {
    // Lawyer data
    lawyer: typeof LAWYER_CONFIG.lawyer
    services: typeof LAWYER_CONFIG.services
    contactInfo: typeof LAWYER_CONFIG.lawyer.contact
    statistics: typeof LAWYER_CONFIG.lawyer.statistics

    // UI State
    isMenuOpen: boolean
    activeSection: string
    isLoading: boolean
    notifications: Notification[]

    // User preferences
    preferredContact: 'whatsapp' | 'email' | 'phone'
    lastVisit: string
    visitCount: number
}

export interface Notification {
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message: string
    duration?: number
    timestamp: Date
}

export interface AppActions {
    // UI Actions
    toggleMenu: () => void
    setActiveSection: (section: string) => void
    setLoading: (loading: boolean) => void

    // Notification Actions
    addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void
    removeNotification: (id: string) => void
    clearNotifications: () => void

    // User Preferences
    setPreferredContact: (method: 'whatsapp' | 'email' | 'phone') => void
    updateVisitCount: () => void

    // Data Actions
    updateLawyerData: (data: Partial<typeof LAWYER_CONFIG.lawyer>) => void
    updateServices: (services: typeof LAWYER_CONFIG.services) => void
}

export interface AppContextType extends AppState, AppActions { }

// ============================================================================
// INITIAL STATE
// ============================================================================

// const initialState: AppState = {
//     // Lawyer data
//     lawyer: LAWYER_CONFIG.lawyer,
//     services: LAWYER_CONFIG.services,
//     contactInfo: LAWYER_CONFIG.lawyer.contact,
//     statistics: LAWYER_CONFIG.lawyer.statistics,
//
//     // UI State
//     isMenuOpen: false,
//     activeSection: 'home',
//     isLoading: false,
//     notifications: [],
//
//     // User preferences
//     preferredContact: 'whatsapp',
//     lastVisit: new Date().toISOString(),
//     visitCount: 0
// }

// ============================================================================
// APP CONTEXT
// ============================================================================

const AppContext = createContext<AppContextType | undefined>(undefined)

// ============================================================================
// APP PROVIDER
// ============================================================================

interface AppProviderProps {
    children: ReactNode
    initialData?: Partial<AppState>
}

export const AppProvider: React.FC<AppProviderProps> = ({
    children,
    initialData: _initialData = {}
}) => {
    // Local storage hooks for persistent data
    const [preferredContact, setPreferredContactStorage] = useLocalStorage<'whatsapp' | 'email' | 'phone'>(
        'preferred-contact',
        'whatsapp'
    )

    const [lastVisit, setLastVisit] = useLocalStorage<string>(
        'last-visit',
        new Date().toISOString()
    )

    const [visitCount, setVisitCount] = useLocalStorage<number>(
        'visit-count',
        0
    )

    // State management
    const [lawyer, setLawyer] = useState(LAWYER_CONFIG.lawyer)
    const [services, setServices] = useState(LAWYER_CONFIG.services)
    const [contactInfo] = useState(LAWYER_CONFIG.lawyer.contact)
    const [statistics] = useState(LAWYER_CONFIG.lawyer.statistics)

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('home')
    const [isLoading, setIsLoading] = useState(false)
    const [notifications, setNotifications] = useState<Notification[]>([])

    // ============================================================================
    // ACTIONS
    // ============================================================================

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev)
    }, [])

    const setActiveSectionHandler = useCallback((section: string) => {
        setActiveSection(section)
    }, [])

    const setLoading = useCallback((loading: boolean) => {
        setIsLoading(loading)
    }, [])

    const removeNotification = useCallback((id: string) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id))
    }, [])

    const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp'>) => {
        const newNotification: Notification = {
            ...notification,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date()
        }

        setNotifications(prev => [...prev, newNotification])

        // Auto-remove notification after duration
        if (notification.duration !== undefined) {
            setTimeout(() => {
                removeNotification(newNotification.id)
            }, notification.duration)
        }
    }, [removeNotification])

    const clearNotifications = useCallback(() => {
        setNotifications([])
    }, [])

    const setPreferredContactHandler = useCallback((method: 'whatsapp' | 'email' | 'phone') => {
        setPreferredContactStorage(method)
    }, [setPreferredContactStorage])

    const updateVisitCount = useCallback(() => {
        setVisitCount(prev => prev + 1)
        setLastVisit(new Date().toISOString())
    }, [setVisitCount, setLastVisit])

    const updateLawyerData = useCallback((data: Partial<typeof LAWYER_CONFIG.lawyer>) => {
        setLawyer(prev => ({ ...prev, ...data }))
    }, [])

    const updateServices = useCallback((newServices: typeof LAWYER_CONFIG.services) => {
        setServices(newServices)
    }, [])

    // ============================================================================
    // CONTEXT VALUE
    // ============================================================================

    const value: AppContextType = {
        // State
        lawyer,
        services,
        contactInfo,
        statistics,
        isMenuOpen,
        activeSection,
        isLoading,
        notifications,
        preferredContact,
        lastVisit,
        visitCount,

        // Actions
        toggleMenu,
        setActiveSection: setActiveSectionHandler,
        setLoading,
        addNotification,
        removeNotification,
        clearNotifications,
        setPreferredContact: setPreferredContactHandler,
        updateVisitCount,
        updateLawyerData,
        updateServices
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

// ============================================================================
// USE APP HOOK
// ============================================================================

export const useApp = (): AppContextType => {
    const context = useContext(AppContext)
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider')
    }
    return context
}

// ============================================================================
// SPECIALIZED HOOKS
// ============================================================================

/**
 * Hook for accessing lawyer data
 */
export const useLawyer = () => {
    const { lawyer, updateLawyerData } = useApp()
    return { lawyer, updateLawyerData }
}

/**
 * Hook for accessing services
 */
export const useServices = () => {
    const { services, updateServices } = useApp()
    return { services, updateServices }
}

/**
 * Hook for accessing contact information
 */
export const useContactInfo = () => {
    const { contactInfo } = useApp()
    return { contactInfo }
}

/**
 * Hook for accessing statistics
 */
export const useStatistics = () => {
    const { statistics } = useApp()
    return { statistics }
}

/**
 * Hook for managing notifications
 */
export const useNotifications = () => {
    const { notifications, addNotification, removeNotification, clearNotifications } = useApp()
    return { notifications, addNotification, removeNotification, clearNotifications }
}

/**
 * Hook for managing UI state
 */
export const useUI = () => {
    const {
        isMenuOpen,
        activeSection,
        isLoading,
        toggleMenu,
        setActiveSection,
        setLoading
    } = useApp()

    return {
        isMenuOpen,
        activeSection,
        isLoading,
        toggleMenu,
        setActiveSection,
        setLoading
    }
} 