/**
 * Environment Info Component
 * 
 * Componente para exibir informações do ambiente (apenas em desenvolvimento)
 * 
 * @author Bruno Cordeiro
 * @version 1.0.0
 */

"use client"

import { getEnvironmentSummary } from '@/lib/env-checker'
import { useEffect } from 'react'

/**
 * Componente Environment Info
 * Displays information about the current environment (development only)
 */
export function EnvironmentInfo() {
    const summary = getEnvironmentSummary()

    // Log de debug para verificar carregamento das variáveis
    useEffect(() => {
        if (summary.environment === 'development') {
            console.log('🔧 Environment Info:', summary)
            console.log('📱 WhatsApp Integration:', summary.features.whatsapp)
            console.log('🎨 Animations:', summary.features.animations)
            console.log('🌙 Dark Mode:', summary.features.darkMode)
        }
    }, [summary])

    // Só renderiza quando debug mode estiver ativo
    if (!summary.debug) {
        console.log('🔧 EnvironmentInfo: Debug mode disabled, hiding component')
        return null
    }

    console.log('🔧 EnvironmentInfo: Rendering component with debug mode enabled')

    return (
        <div className="fixed top-20 left-4 z-50 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-xs">
            <div className="text-xs space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">Environment:</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${summary.environment === 'development'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                        }`}>
                        {summary.environment}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-gray-600">App:</span>
                    <span className="text-gray-900 font-medium">
                        {summary.appName} v{summary.appVersion}
                    </span>
                </div>

                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">WhatsApp:</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${summary.features.whatsapp
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}>
                            {summary.features.whatsapp ? 'ON' : 'OFF'}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Animations:</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${summary.features.animations
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}>
                            {summary.features.animations ? 'ON' : 'OFF'}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Dark Mode:</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${summary.features.darkMode
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}>
                            {summary.features.darkMode ? 'ON' : 'OFF'}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-gray-600">Debug:</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${summary.debug
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}>
                        {summary.debug ? 'ON' : 'OFF'}
                    </span>
                </div>
            </div>
        </div>
    )
} 