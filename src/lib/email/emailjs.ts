/**
 * EmailJS Service
 * Handles email sending using EmailJS service
 */

import { LAWYER_CONFIG } from '@/config'
import { ContactFormData } from '@/lib/validation'
import emailjs from '@emailjs/browser'

// ============================================================================
// HELPER FUNCTIONS FOR ENHANCED DATA COLLECTION
// ============================================================================

/**
 * Determines urgency level based on consultation subject
 */
const getUrgencyLevel = (subject: string): string => {
    const urgentKeywords = ['urgent', 'emergency', 'arrest', 'deadline', 'tomorrow']
    const highKeywords = ['judicial', 'process', 'hearing', 'attorney']

    const lowerSubject = subject.toLowerCase()

    if (urgentKeywords.some(keyword => lowerSubject.includes(keyword))) {
        return 'URGENT'
    } else if (highKeywords.some(keyword => lowerSubject.includes(keyword))) {
        return 'HIGH'
    } else {
        return 'NORMAL'
    }
}

/**
 * Determines practice area based on consultation subject
 */
const getPracticeArea = (subject: string): string => {
    const lowerSubject = subject.toLowerCase()

    if (lowerSubject.includes('civil') || lowerSubject.includes('contract') || lowerSubject.includes('damages')) {
        return 'Civil Law'
    } else if (lowerSubject.includes('business') || lowerSubject.includes('commercial') || lowerSubject.includes('corporate')) {
        return 'Business Law'
    } else if (lowerSubject.includes('family') || lowerSubject.includes('divorce') || lowerSubject.includes('alimony')) {
        return 'Family Law'
    } else if (lowerSubject.includes('health') || lowerSubject.includes('insurance') || lowerSubject.includes('medical') || lowerSubject.includes('medicare')) {
        return 'Health Law'
    } else if (lowerSubject.includes('labor') || lowerSubject.includes('employment') || lowerSubject.includes('termination')) {
        return 'Labor Law'
    } else if (lowerSubject.includes('tax') || lowerSubject.includes('fiscal') || lowerSubject.includes('taxation') || lowerSubject.includes('tax execution')) {
        return 'Tax Law'
    } else {
        return 'General Consultation'
    }
}

// EmailJS Configuration
const EMAILJS_CONFIG = {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
}

/**
 * Initialize EmailJS with public key
 */
export const initEmailJS = (): void => {
    if (EMAILJS_CONFIG.publicKey) {
        emailjs.init(EMAILJS_CONFIG.publicKey)
    }
}

/**
 * Send contact form email using EmailJS
 * @param formData - Contact form data
 * @returns Promise that resolves when email is sent
 */
export const sendContactEmail = async (formData: ContactFormData): Promise<void> => {
    // Validate configuration
    if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId || !EMAILJS_CONFIG.publicKey) {
        throw new Error('EmailJS configuration is incomplete. Please check environment variables.')
    }

    // Prepare enhanced template parameters with better organization
    const now = new Date()
    const timestamp = now.toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })

    const templateParams = {
        // ============================================================================
        // CLIENT INFORMATION
        // ============================================================================
        client_name: formData.name.trim(),
        client_email: formData.email.trim().toLowerCase(),
        client_phone: formData.phone?.trim() || 'Not provided',

        // ============================================================================
        // CONSULTATION INFORMATION
        // ============================================================================
        consultation_subject: formData.subject,
        consultation_message: formData.message.trim(),
        consultation_type: formData.subject, // Repeated for easier categorization

        // ============================================================================
        // SYSTEM INFORMATION
        // ============================================================================
        to_email: LAWYER_CONFIG.lawyer.contact.email,
        timestamp: timestamp,
        date_only: now.toLocaleDateString('en-US'),
        time_only: now.toLocaleTimeString('en-US'),
        day_of_week: now.toLocaleDateString('en-US', { weekday: 'long' }),

        // ============================================================================
        // RESPONSE INFORMATION
        // ============================================================================
        reply_to: formData.email.trim().toLowerCase(),
        contact_preference: formData.phone ? 'Email or Phone' : 'Email',

        // ============================================================================
        // PRIORITY AND CATEGORY (based on subject)
        // ============================================================================
        urgency_level: getUrgencyLevel(formData.subject),
        practice_area: getPracticeArea(formData.subject),

        // ============================================================================
        // INFORMAÇÕES ADICIONAIS
        // ============================================================================
        source: 'Website - Contact Form',
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
        message_length: formData.message.length,
        has_phone: formData.phone ? 'Yes' : 'No'
    }

    try {
        // Send email using EmailJS
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams
        )

        if (response.status !== 200) {
            throw new Error(`EmailJS returned status: ${response.status}`)
        }

        console.log('Email sent successfully:', response)
    } catch (error) {
        console.error('Failed to send email:', error)

        // Provide user-friendly error messages
        if (error instanceof Error) {
            if (error.message.includes('configuration')) {
                throw new Error('Email configuration error. Please contact us by phone.')
            } else if (error.message.includes('network') || error.message.includes('fetch')) {
                throw new Error('Connection error. Please check your internet connection and try again.')
            } else {
                throw new Error('Error sending email. Please try again or contact us by phone.')
            }
        }

        throw new Error('Error sending email. Please try again or contact us by phone.')
    }
}

/**
 * Validate EmailJS configuration
 * @returns boolean indicating if configuration is valid
 */
export const isEmailJSConfigured = (): boolean => {
    return !!(EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.templateId && EMAILJS_CONFIG.publicKey)
}