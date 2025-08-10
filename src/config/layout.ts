export interface LayoutConfig {
    theme: {
        defaultMode: 'light' | 'dark'
        enableSystemPreference: boolean
    }
    navigation: {
        enableStickyHeader: boolean
        enableScrollToTop: boolean
    }
    contact: {
        enableFloatingWhatsApp: boolean
        enableContactForm: boolean
        enableMap: boolean
    }
    seo: {
        siteName: string
        siteDescription: string
        siteUrl: string
        defaultLanguage: string
        enableStructuredData: boolean
    }
    animations: {
        enableScrollAnimations: boolean
        enableHoverEffects: boolean
        enablePageTransitions: boolean
    }
    features: {
        enableEnvironmentInfo: boolean
        enableLanguageSelector: boolean
        enableThemeToggle: boolean
    }
}

export const LAYOUT_CONFIG: LayoutConfig = {
    theme: {
        defaultMode: 'dark',
        enableSystemPreference: true
    },
    navigation: {
        enableStickyHeader: true,
        enableScrollToTop: true
    },
    contact: {
        enableFloatingWhatsApp: true,
        enableContactForm: true,
        enableMap: true
    },
    seo: {
        siteName: "Attorney John Smith - Law Office",
        siteDescription: "Specialized law practice in Civil, Business and Family Law in New York, NY. Personalized service and effective legal solutions.",
        siteUrl: "https://johnsmithlaw.com",
        defaultLanguage: "en-US",
        enableStructuredData: true
    },
    animations: {
        enableScrollAnimations: true,
        enableHoverEffects: true,
        enablePageTransitions: true
    },
    features: {
        enableEnvironmentInfo: true,
        enableLanguageSelector: false, // Disabled after rollback
        enableThemeToggle: true
    }
}

export interface ContactConfig {
    form: {
        enableNameField: boolean
        enablePhoneField: boolean
        enableSubjectField: boolean
        enableMessageField: boolean
        requiredFields: string[]
    }
    map: {
        latitude: number
        longitude: number
        zoom: number
        address: string
    }
}

export const CONTACT_CONFIG: ContactConfig = {
    form: {
        enableNameField: true,
        enablePhoneField: true,
        enableSubjectField: true,
        enableMessageField: true,
        requiredFields: ['name', 'email', 'message']
    },
    map: {
        latitude: 40.7128,
        longitude: -74.0060,
        zoom: 15,
        address: "New York, NY, USA"
    }
}

export interface AnimationConfig {
    scroll: {
        threshold: number
        rootMargin: string
        triggerOnce: boolean
    }
    hover: {
        scale: number
        duration: number
    }
}

export const ANIMATION_CONFIG: AnimationConfig = {
    scroll: {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
        triggerOnce: true
    },
    hover: {
        scale: 1.05,
        duration: 0.2
    }
} 