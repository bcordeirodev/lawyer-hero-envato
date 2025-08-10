"use client"

/**
 * Contact Form Component
 * Reusable form component with validation and state management
 */

import { Textarea } from '@/components/ui/primitives/textarea'
import { LAWYER_CONFIG } from '@/config'
import { useContactForm } from '@/hooks/useContactForm'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, Send } from 'lucide-react'
import React from 'react'

interface ContactFormProps {
    className?: string
    onSuccess?: () => void
    onError?: (error: string) => void
}

/**
 * Contact Form Component
 * Handles form submission, validation, and user feedback
 */
export const ContactForm: React.FC<ContactFormProps> = ({
    className = '',
    onSuccess,
    onError
}) => {
    const {
        formData,
        errors,
        isLoading,
        isSubmitted,
        submitError,
        handleChange,
        handleBlur: hookHandleBlur,
        handleSubmit,
        resetForm
    } = useContactForm(onSuccess, onError)

    const { form } = LAWYER_CONFIG
    const formSubjects = form.subjects

    /**
     * Handles field blur events for real-time validation
     * @param field - The field name
     * @param value - The field value
     */
    const handleBlur = (field: keyof typeof formData, value: string) => {
        hookHandleBlur(field, value)
    }

    /**
     * Renders form field with proper styling and error handling
     * @param field - The field name
     * @param label - The field label
     * @param type - The input type
     * @param placeholder - The placeholder text
     * @param required - Whether the field is required
     */
    const renderField = (
        field: keyof typeof formData,
        label: string,
        type: string = 'text',
        placeholder: string = '',
        required: boolean = false
    ) => (
        <div className="space-y-2">
            <label htmlFor={field} className="block text-sm font-medium text-text-primary mb-2">
                {label}
                {required && <span className="text-error ml-1">*</span>}
            </label>
            <input
                id={field}
                type={type}
                name={field}
                value={formData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                onBlur={(e) => handleBlur(field, e.target.value)}
                placeholder={placeholder}
                required={required}
                className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-border-secondary rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200 bg-background-secondary text-text-primary placeholder-text-muted ${errors[field] ? 'border-error focus:ring-error' : ''}`}
                autoComplete="off"
                disabled={isLoading}
            />
            {errors[field] && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-error text-xs mt-1 flex items-center gap-1"
                >
                    <AlertCircle className="h-3 w-3" />
                    {errors[field]}
                </motion.div>
            )}
        </div>
    )

    /**
     * Renders success message after form submission
     */
    const renderSuccessMessage = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-success/10 border border-success/20 rounded-lg p-6 text-center space-y-4"
        >
            <div className="flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
                Message Sent!
            </h3>
            <p className="text-text-secondary mb-4">
                Thank you for contacting us. I&apos;ll get back to you soon.
            </p>
            <motion.button
                onClick={resetForm}
                className="px-4 py-2 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Send New Message
            </motion.button>
        </motion.div>
    )

    /**
     * Renders the main form
     */
    const renderForm = () => (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {renderField('name', form.labels.name, 'text', form.placeholders.name, true)}
                {renderField('email', form.labels.email, 'email', form.placeholders.email, true)}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {renderField('phone', form.labels.phone, 'tel', form.placeholders.phone)}
                <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
                        {form.labels.subject} <span className="text-error ml-1">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={(e) => handleChange('subject', e.target.value)}
                            onBlur={(e) => handleBlur('subject', e.target.value)}
                            placeholder={form.placeholders.subject}
                            required
                            className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-border-secondary rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200 bg-background-secondary text-text-primary placeholder-text-muted ${errors.subject ? 'border-error focus:ring-error' : ''}`}
                            autoComplete="off"
                            disabled={isLoading}
                            list="subject-suggestions"
                        />
                        <datalist id="subject-suggestions">
                            {formSubjects.map((subject) => (
                                <option key={subject} value={subject} />
                            ))}
                        </datalist>
                    </div>
                    {errors.subject && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-error text-xs mt-1 flex items-center gap-1"
                        >
                            <AlertCircle className="h-3 w-3" />
                            {errors.subject}
                        </motion.div>
                    )}
                </div>
            </div>

            <Textarea
                id="message"
                name="message"
                label={form.labels.message}
                value={formData.message}
                onChange={(value) => handleChange('message', value)}
                onBlur={(value) => handleBlur('message', value)}
                placeholder={form.placeholders.message}
                required={true}
                error={errors.message}
                disabled={isLoading}
                showCharCount={true}
                maxLength={1000}
                minHeight={100}
                maxHeight={200}
                autoResize={true}
            />

            {submitError && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-error text-sm p-3 bg-error/10 border border-error/20 rounded-lg flex items-center gap-2"
                >
                    <AlertCircle className="h-4 w-4" />
                    {submitError}
                </motion.div>
            )}

            <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {isLoading ? (
                    <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        {form.labels.loading}
                    </>
                ) : (
                    <>
                        <Send className="h-4 w-4" />
                        {form.labels.submit}
                    </>
                )}
            </motion.button>
        </form>
    )

    return (
        <div className={`bg-background-secondary border border-border-secondary rounded-lg p-6 lg:p-8 hover:shadow-lg transition-all duration-300 ${className}`}>
            {isSubmitted ? renderSuccessMessage() : renderForm()}
        </div>
    )
} 