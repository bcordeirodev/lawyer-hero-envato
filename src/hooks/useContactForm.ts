/**
 * useContactForm Hook
 * Enhanced contact form hook with validation and state management
 * Follows SOLID principles and uses the new validation system
 */

import { initEmailJS, isEmailJSConfigured, sendContactEmail } from '@/lib/email'
import {
    ContactFormData,
    hasErrors,
    sanitizeField,
    sanitizeFormData,
    validateField,
    validateForm
} from '@/lib/validation'
import { useCallback, useEffect, useState } from 'react'

// ============================================================================
// HOOK STATE INTERFACE
// ============================================================================

export interface ContactFormState {
    formData: ContactFormData
    errors: Record<keyof ContactFormData, string | null>
    isLoading: boolean
    isSubmitted: boolean
    submitError: string | null
}

export interface ContactFormActions {
    handleChange: (field: keyof ContactFormData, value: string) => void
    handleBlur: (field: keyof ContactFormData, value: string) => void
    handleSubmit: (e: React.FormEvent) => Promise<void>
    validateField: (field: keyof ContactFormData, value: string) => string | null
    resetForm: () => void
}

export type UseContactFormReturn = ContactFormState & ContactFormActions

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialFormData: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
}

const initialErrors: Record<keyof ContactFormData, string | null> = {
    name: null,
    email: null,
    phone: null,
    subject: null,
    message: null
}

// ============================================================================
// USE CONTACT FORM HOOK
// ============================================================================

/**
 * useContactForm - Enhanced contact form hook
 * 
 * Provides form state management, validation, and submission handling
 * 
 * @param onSuccess - Callback function called when form is successfully submitted
 * @param onError - Callback function called when form submission fails
 * @returns Object containing form state and actions
 * 
 * @example
 * ```tsx
 * const {
 *   formData,
 *   errors,
 *   isLoading,
 *   handleChange,
 *   handleSubmit
 * } = useContactForm()
 * ```
 */
export function useContactForm(
    onSuccess?: () => void,
    onError?: (error: string) => void
): UseContactFormReturn {
    // ============================================================================
    // STATE MANAGEMENT
    // ============================================================================

    const [formData, setFormData] = useState<ContactFormData>(initialFormData)
    const [errors, setErrors] = useState<Record<keyof ContactFormData, string | null>>(initialErrors)
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

    // ============================================================================
    // INITIALIZATION
    // ============================================================================

    useEffect(() => {
        // Initialize EmailJS on component mount
        initEmailJS()
    }, [])

    // ============================================================================
    // FORM ACTIONS
    // ============================================================================

    /**
     * Handles form field changes
     * @param field - Field name
     * @param value - New field value
     */
    const handleChange = useCallback((field: keyof ContactFormData, value: string) => {
        const sanitizedValue = sanitizeField(field, value)

        setFormData(prev => ({
            ...prev,
            [field]: sanitizedValue
        }))

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: null
            }))
        }

        // Clear submit error when user makes changes
        if (submitError) {
            setSubmitError(null)
        }
    }, [errors, submitError])

    /**
     * Handles form field blur events for validation
     * @param field - Field name
     * @param value - Field value
     */
    const handleBlur = useCallback((field: keyof ContactFormData, value: string) => {
        const error = validateField(field, value)

        setErrors(prev => ({
            ...prev,
            [field]: error
        }))
    }, [])

    /**
     * Validates a single field
     * @param field - Field name
     * @param value - Field value
     * @returns Error message or null
     */
    const validateFieldHandler = useCallback((field: keyof ContactFormData, value: string): string | null => {
        return validateField(field, value)
    }, [])

    /**
     * Resets form to initial state
     */
    const resetForm = useCallback(() => {
        setFormData(initialFormData)
        setErrors(initialErrors)
        setIsLoading(false)
        setIsSubmitted(false)
        setSubmitError(null)
    }, [])

    /**
     * Handles form submission
     * @param e - Form event
     */
    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault()

        // Validate all fields
        const validationErrors = validateForm(formData)
        setErrors(validationErrors)

        // Check if form has errors
        if (hasErrors(validationErrors)) {
            setSubmitError('Por favor, corrija os erros no formulário')
            return
        }

        setIsLoading(true)
        setSubmitError(null)

        try {
            // Sanitize form data
            const sanitizedData = sanitizeFormData(formData)

            // Simulate API call
            await submitFormData(sanitizedData)

            setIsSubmitted(true)
            setFormData(initialFormData)
            setErrors(initialErrors)

        } catch (error) {
            console.error('Form submission error:', error)

            const errorMessage = error instanceof Error ? error.message : 'Erro ao enviar formulário. Tente novamente.'
            setSubmitError(errorMessage)

            // Call onError callback if provided
            if (onError) {
                onError(errorMessage)
            }
        } finally {
            setIsLoading(false)
        }
    }, [formData, onError])

    // ============================================================================
    // SUBMISSION LOGIC
    // ============================================================================

    /**
     * Submits form data using EmailJS
     * @param data - Sanitized form data
     */
    const submitFormData = async (data: ContactFormData): Promise<void> => {
        // Check if EmailJS is configured
        if (!isEmailJSConfigured()) {
            throw new Error('Serviço de email não configurado. Entre em contato por telefone: (61) 99999-9999')
        }

        try {
            // Log attempt for analytics (in development)
            if (process.env.NODE_ENV === 'development') {
                console.log('Enviando dados do formulário:', {
                    name: data.name,
                    email: data.email,
                    hasPhone: !!data.phone,
                    subject: data.subject,
                    messageLength: data.message.length,
                    timestamp: new Date().toISOString()
                })
            }

            // Send email using EmailJS
            await sendContactEmail(data)

            // Log success for analytics (in development)
            if (process.env.NODE_ENV === 'development') {
                console.log('✅ Email enviado com sucesso!')
            }
        } catch (error) {
            console.error('❌ Email submission error:', error)

            // Re-throw the error to be handled by the calling function
            if (error instanceof Error) {
                throw error
            }

            throw new Error('Erro ao enviar email. Tente novamente ou entre em contato por telefone.')
        }
    }

    // ============================================================================
    // RETURN HOOK STATE AND ACTIONS
    // ============================================================================

    return {
        // State
        formData,
        errors,
        isLoading,
        isSubmitted,
        submitError,

        // Actions
        handleChange,
        handleBlur,
        handleSubmit,
        validateField: validateFieldHandler,
        resetForm
    }
} 