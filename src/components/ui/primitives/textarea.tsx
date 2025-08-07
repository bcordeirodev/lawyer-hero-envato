"use client"

import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'onBlur'> {
    label?: string
    error?: string | null
    required?: boolean
    showCharCount?: boolean
    maxLength?: number
    minHeight?: number
    maxHeight?: number
    autoResize?: boolean
    onChange?: (value: string) => void
    onBlur?: (value: string) => void
}

export interface TextareaRef {
    focus: () => void
    blur: () => void
    getValue: () => string
    setValue: (value: string) => void
}

/**
 * Enhanced Textarea Component
 * Features: auto-resize, character count, better validation display
 */
export const Textarea = forwardRef<TextareaRef, TextareaProps>(({
    label,
    error,
    required = false,
    showCharCount = false,
    maxLength,
    minHeight = 100,
    maxHeight = 300,
    autoResize = true,
    onChange,
    onBlur,
    className = '',
    value = '',
    placeholder,
    disabled = false,
    id,
    name,
    ...props
}, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [isFocused, setIsFocused] = useState(false)
    const [internalValue, setInternalValue] = useState(value?.toString() || '')

    // Expose ref methods
    useImperativeHandle(ref, () => ({
        focus: () => textareaRef.current?.focus(),
        blur: () => textareaRef.current?.blur(),
        getValue: () => internalValue,
        setValue: (newValue: string) => {
            setInternalValue(newValue)
            if (onChange) onChange(newValue)
        }
    }))

    // Auto-resize functionality
    const adjustHeight = React.useCallback(() => {
        if (autoResize && textareaRef.current) {
            const textarea = textareaRef.current
            textarea.style.height = 'auto'
            const scrollHeight = textarea.scrollHeight
            const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight)
            textarea.style.height = `${newHeight}px`
        }
    }, [autoResize, minHeight, maxHeight])

    // Handle value changes
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value

        // Apply maxLength if specified
        if (maxLength && newValue.length > maxLength) {
            return
        }

        setInternalValue(newValue)
        if (onChange) onChange(newValue)

        // Auto-resize after content change
        setTimeout(adjustHeight, 0)
    }

    // Handle focus
    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(true)
        if (props.onFocus) props.onFocus(e)
    }

    // Handle blur
    const handleBlur = (_e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(false)
        if (onBlur) onBlur(internalValue)
    }

    // Calculate character count
    const charCount = internalValue.length
    const isOverLimit = maxLength ? charCount > maxLength : false

    // Generate unique ID
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`

    // Dynamic classes
    const baseClasses = `
        w-full px-3 py-2.5 sm:px-4 sm:py-3 
        border rounded-lg 
        focus:ring-2 focus:border-transparent 
        transition-all duration-200 
        bg-background-secondary text-text-primary 
        placeholder-text-muted resize-none
        outline-none
    `.replace(/\s+/g, ' ').trim()

    const borderClasses = error
        ? 'border-error focus:ring-error'
        : isFocused
            ? 'border-secondary-500 focus:ring-secondary-500'
            : 'border-border-secondary hover:border-border-primary'

    const disabledClasses = disabled
        ? 'opacity-50 cursor-not-allowed bg-background-tertiary'
        : ''

    const textareaClasses = `${baseClasses} ${borderClasses} ${disabledClasses} ${className}`.trim()

    // Auto-resize on mount and value change
    React.useEffect(() => {
        if (autoResize) {
            adjustHeight()
        }
    }, [internalValue, autoResize, adjustHeight])

    return (
        <div className="space-y-2">
            {/* Label */}
            {label && (
                <label
                    htmlFor={textareaId}
                    className="block text-sm font-medium text-text-primary"
                >
                    {label}
                    {required && <span className="text-error ml-1">*</span>}
                </label>
            )}

            {/* Textarea Container */}
            <div className="relative">
                <textarea
                    ref={textareaRef}
                    id={textareaId}
                    name={name}
                    value={internalValue}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={textareaClasses}
                    style={{
                        minHeight: `${minHeight}px`,
                        maxHeight: autoResize ? `${maxHeight}px` : undefined,
                        overflowY: autoResize ? 'auto' : 'scroll'
                    }}
                    {...props}
                />

                {/* Character Count */}
                {showCharCount && maxLength && (
                    <div className="absolute bottom-2 right-2 text-xs text-text-muted">
                        <span className={isOverLimit ? 'text-error' : ''}>
                            {charCount}/{maxLength}
                        </span>
                    </div>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-error text-xs mt-1 flex items-center gap-1"
                >
                    <AlertCircle className="h-3 w-3 flex-shrink-0" />
                    {error}
                </motion.div>
            )}

            {/* Help Text for Character Count */}
            {showCharCount && maxLength && !error && (
                <div className="text-xs text-text-muted">
                    {charCount > maxLength * 0.8 && (
                        <span className={charCount > maxLength * 0.9 ? 'text-warning' : ''}>
                            {maxLength - charCount} caracteres restantes
                        </span>
                    )}
                </div>
            )}
        </div>
    )
})

Textarea.displayName = 'Textarea'