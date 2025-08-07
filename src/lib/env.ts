/**
 * Environment Variables Loader
 * 
 * Utilitário para carregar variáveis de ambiente de forma tipada
 * e segura, com validação e valores padrão
 * 
 * @author Bruno Cordeiro
 * @version 1.0.0
 */

// ============================================================================
// ENVIRONMENT TYPES
// ============================================================================

export interface EnvironmentConfig {
    // App
    APP_NAME: string
    APP_VERSION: string
    APP_URL: string

    // Development
    NODE_ENV: string
    DEBUG_MODE: boolean

    // Feature Flags (apenas as que estão sendo usadas)
    ENABLE_WHATSAPP_INTEGRATION: boolean
    ENABLE_ANIMATIONS: boolean
    ENABLE_DARK_MODE: boolean
}

// ============================================================================
// ENVIRONMENT VALIDATION
// ============================================================================

/**
 * Valida se uma variável de ambiente está definida
 * @param name - Nome da variável
 * @param value - Valor da variável
 * @param required - Se a variável é obrigatória
 */
function validateEnvVar(name: string, value: string | undefined, required: boolean = false): string | undefined {
    if (required && !value) {
        console.warn(`⚠️  Variável de ambiente obrigatória não definida: ${name}`)
        return undefined
    }
    return value
}

/**
 * Converte string para boolean
 * @param value - Valor string
 * @param defaultValue - Valor padrão
 */
function parseBoolean(value: string | undefined, defaultValue: boolean = false): boolean {
    if (!value) return defaultValue
    return value.toLowerCase() === 'true'
}

/**
 * Converte string para number
 * @param value - Valor string
 * @param defaultValue - Valor padrão
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function parseNumber(value: string | undefined, defaultValue: number = 0): number {
    if (!value) return defaultValue
    const parsed = parseInt(value, 10)
    return isNaN(parsed) ? defaultValue : parsed
}

// ============================================================================
// ENVIRONMENT LOADER
// ============================================================================

/**
 * Carrega e valida as variáveis de ambiente
 * @returns Configuração de ambiente tipada
 */
export function loadEnvironmentConfig(): EnvironmentConfig {
    const config = {
        // App
        APP_NAME: validateEnvVar('NEXT_PUBLIC_APP_NAME', process.env.NEXT_PUBLIC_APP_NAME) || 'LawyerHero',
        APP_VERSION: validateEnvVar('NEXT_PUBLIC_APP_VERSION', process.env.NEXT_PUBLIC_APP_VERSION) || '1.0.0',
        APP_URL: validateEnvVar('NEXT_PUBLIC_APP_URL', process.env.NEXT_PUBLIC_APP_URL) || 'https://geovannanery.com',

        // Development
        NODE_ENV: validateEnvVar('NODE_ENV', process.env.NODE_ENV) || 'development',
        DEBUG_MODE: parseBoolean(process.env.NEXT_PUBLIC_DEBUG_MODE, false),

        // Feature Flags (apenas as que estão sendo usadas)
        ENABLE_WHATSAPP_INTEGRATION: parseBoolean(process.env.NEXT_PUBLIC_ENABLE_WHATSAPP_INTEGRATION, true),
        ENABLE_ANIMATIONS: parseBoolean(process.env.NEXT_PUBLIC_ENABLE_ANIMATIONS, true),
        ENABLE_DARK_MODE: parseBoolean(process.env.NEXT_PUBLIC_ENABLE_DARK_MODE, true)
    }

    // Log de debug para verificar carregamento
    if (typeof window !== 'undefined' && config.DEBUG_MODE) {
        console.log('🔧 Environment Config Loaded:', config)
        console.log('📱 WhatsApp Integration:', config.ENABLE_WHATSAPP_INTEGRATION)
        console.log('🎨 Animations:', config.ENABLE_ANIMATIONS)
        console.log('🌙 Dark Mode:', config.ENABLE_DARK_MODE)
    }

    return config
}

// ============================================================================
// ENVIRONMENT UTILITIES
// ============================================================================

/**
 * Verifica se está em modo de desenvolvimento
 */
export function isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development'
}

/**
 * Verifica se está em modo de produção
 */
export function isProduction(): boolean {
    return process.env.NODE_ENV === 'production'
}

/**
 * Verifica se o modo debug está ativado
 */
export function isDebugMode(): boolean {
    return parseBoolean(process.env.NEXT_PUBLIC_DEBUG_MODE, false)
}

/**
 * Obtém a configuração de ambiente
 */
export const env = loadEnvironmentConfig()

/**
 * Verifica se uma feature está habilitada
 * @param feature - Nome da feature
 */
export function isFeatureEnabled(feature: keyof Pick<EnvironmentConfig,
    | 'ENABLE_DARK_MODE'
    | 'ENABLE_ANIMATIONS'
    | 'ENABLE_WHATSAPP_INTEGRATION'
>): boolean {
    return env[feature] || false
} 