/**
 * Environment Checker
 * 
 * Utilitário para verificar se as variáveis de ambiente estão configuradas corretamente
 * 
 * @author Bruno Cordeiro
 * @version 1.0.0
 */

import { env, isDevelopment, isProduction } from './env'

// ============================================================================
// ENVIRONMENT VALIDATION
// ============================================================================

/**
 * Verifica se todas as variáveis obrigatórias estão configuradas
 */
export function validateEnvironment(): {
    isValid: boolean
    errors: string[]
    warnings: string[]
    info: Record<string, unknown>
} {
    const errors: string[] = []
    const warnings: string[] = []
    const info: Record<string, unknown> = {}

    // ============================================================================
    // REQUIRED VARIABLES
    // ============================================================================

    // App configuration
    const appName = env.APP_NAME
    const appVersion = env.APP_VERSION
    const appUrl = env.APP_URL

    if (!appName) {
        errors.push('NEXT_PUBLIC_APP_NAME is required')
    } else {
        info.appName = appName
    }

    if (!appVersion) {
        errors.push('NEXT_PUBLIC_APP_VERSION is required')
    } else {
        info.appVersion = appVersion
    }

    if (!appUrl) {
        errors.push('NEXT_PUBLIC_APP_URL is required')
    } else {
        info.appUrl = appUrl
    }

    // ============================================================================
    // FEATURE FLAGS
    // ============================================================================

    info.features = {
        darkMode: env.ENABLE_DARK_MODE,
        animations: env.ENABLE_ANIMATIONS,
        whatsapp: env.ENABLE_WHATSAPP_INTEGRATION
    }

    // ============================================================================
    // ENVIRONMENT INFO
    // ============================================================================

    info.environment = {
        nodeEnv: env.NODE_ENV,
        isDevelopment: isDevelopment(),
        isProduction: isProduction(),
        debugMode: env.DEBUG_MODE
    }

    // ============================================================================
    // WARNINGS
    // ============================================================================

    if (isDevelopment() && !env.DEBUG_MODE) {
        warnings.push('DEBUG_MODE is disabled in development - consider enabling for better debugging')
    }

    if (isProduction() && env.DEBUG_MODE) {
        warnings.push('DEBUG_MODE is enabled in production - consider disabling for security')
    }

    if (!env.ENABLE_WHATSAPP_INTEGRATION) {
        warnings.push('WhatsApp integration is disabled - FloatingWhatsApp component will not render')
    }

    if (!env.ENABLE_ANIMATIONS) {
        warnings.push('Animations are disabled - some UI components may not animate')
    }

    // ============================================================================
    // RETURN
    // ============================================================================

    return {
        isValid: errors.length === 0,
        errors,
        warnings,
        info
    }
}

/**
 * Logs information about the current environment
 */
export function logEnvironmentInfo(): void {
    const validation = validateEnvironment()

    console.group('🌍 Environment Configuration')

    if (validation.isValid) {
        console.log('✅ Environment is valid')
    } else {
        console.error('❌ Environment has errors:')
        validation.errors.forEach(error => console.error(`  - ${error}`))
    }

    if (validation.warnings.length > 0) {
        console.warn('⚠️  Environment warnings:')
        validation.warnings.forEach(warning => console.warn(`  - ${warning}`))
    }

    console.log('📊 Environment Info:', validation.info)
    console.groupEnd()
}

/**
 * Verifica se o ambiente está pronto para produção
 */
export function isProductionReady(): boolean {
    const validation = validateEnvironment()

    if (!validation.isValid) {
        return false
    }

    if (isDevelopment()) {
        return true // Development is always ready
    }

    // Production checks
    if (env.DEBUG_MODE) {
        console.warn('⚠️  Production warning: DEBUG_MODE is enabled')
        return false
    }

    if (!env.APP_URL.includes('https://')) {
        console.warn('⚠️  Production warning: APP_URL should use HTTPS')
        return false
    }

    return true
}

/**
 * Obtém informações resumidas do ambiente
 */
export function getEnvironmentSummary(): {
    environment: string
    appName: string
    appVersion: string
    features: {
        darkMode: boolean
        animations: boolean
        whatsapp: boolean
    }
    debug: boolean
} {
    return {
        environment: isDevelopment() ? 'development' : 'production',
        appName: env.APP_NAME,
        appVersion: env.APP_VERSION,
        features: {
            darkMode: env.ENABLE_DARK_MODE,
            animations: env.ENABLE_ANIMATIONS,
            whatsapp: env.ENABLE_WHATSAPP_INTEGRATION
        },
        debug: env.DEBUG_MODE
    }
} 