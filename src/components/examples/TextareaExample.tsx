"use client"

import { Textarea } from '@/components/ui/primitives/textarea'
import React, { useState } from 'react'

/**
 * Textarea Example Component
 * Demonstrates the capabilities of the enhanced Textarea component
 */
export const TextareaExample: React.FC = () => {
    const [message, setMessage] = useState('')
    const [feedback, setFeedback] = useState('')
    const [notes, setNotes] = useState('')
    const [messageError, setMessageError] = useState<string | null>(null)
    const [feedbackError, setFeedbackError] = useState<string | null>(null)

    const validateMessage = (value: string) => {
        if (value.length < 10) {
            setMessageError('Mensagem deve ter pelo menos 10 caracteres')
        } else if (value.length > 500) {
            setMessageError('Mensagem deve ter no máximo 500 caracteres')
        } else {
            setMessageError(null)
        }
    }

    const validateFeedback = (value: string) => {
        if (value.trim() === '') {
            setFeedbackError('Feedback é obrigatório')
        } else if (value.length < 20) {
            setFeedbackError('Feedback deve ter pelo menos 20 caracteres')
        } else {
            setFeedbackError(null)
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                    Demonstração do Textarea Avançado
                </h2>
                <p className="text-text-secondary">
                    Veja os recursos do nosso componente Textarea melhorado
                </p>
            </div>

            <div className="space-y-6">
                {/* Exemplo 1: Textarea com contador e validação */}
                <div className="bg-background-secondary border border-border-secondary rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                        1. Textarea com contador de caracteres e validação
                    </h3>

                    <Textarea
                        label="Mensagem"
                        value={message}
                        onChange={setMessage}
                        onBlur={validateMessage}
                        placeholder="Digite sua mensagem aqui..."
                        error={messageError}
                        required
                        showCharCount
                        maxLength={500}
                        minHeight={100}
                        maxHeight={200}
                        autoResize
                    />

                    <div className="mt-4 text-sm text-text-muted">
                        <strong>Recursos:</strong> Auto-resize, contador de caracteres, validação em tempo real
                    </div>
                </div>

                {/* Exemplo 2: Feedback com validação mais complexa */}
                <div className="bg-background-secondary border border-border-secondary rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                        2. Textarea para feedback (obrigatório)
                    </h3>

                    <Textarea
                        label="Feedback"
                        value={feedback}
                        onChange={setFeedback}
                        onBlur={validateFeedback}
                        placeholder="Compartilhe seu feedback conosco..."
                        error={feedbackError}
                        required
                        showCharCount
                        maxLength={1000}
                        minHeight={120}
                        maxHeight={300}
                        autoResize
                    />

                    <div className="mt-4 text-sm text-text-muted">
                        <strong>Recursos:</strong> Campo obrigatório, validação customizada, limite maior
                    </div>
                </div>

                {/* Exemplo 3: Textarea simples sem auto-resize */}
                <div className="bg-background-secondary border border-border-secondary rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                        3. Textarea simples (sem auto-resize)
                    </h3>

                    <Textarea
                        label="Observações"
                        value={notes}
                        onChange={setNotes}
                        placeholder="Digite suas observações..."
                        autoResize={false}
                        minHeight={150}
                        showCharCount={false}
                    />

                    <div className="mt-4 text-sm text-text-muted">
                        <strong>Recursos:</strong> Altura fixa, sem contador, sem validação
                    </div>
                </div>

                {/* Exemplo 4: Estado desabilitado */}
                <div className="bg-background-secondary border border-border-secondary rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                        4. Textarea desabilitado
                    </h3>

                    <Textarea
                        label="Campo Desabilitado"
                        value="This field is disabled and cannot be edited."
                        onChange={() => { }}
                        disabled
                        minHeight={80}
                    />

                    <div className="mt-4 text-sm text-text-muted">
                        <strong>Recursos:</strong> Estado desabilitado com estilo adequado
                    </div>
                </div>
            </div>

            {/* Status dos valores */}
            <div className="bg-background-tertiary border border-border-secondary rounded-lg p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Status Atual dos Valores
                </h3>

                <div className="space-y-2 text-sm font-mono">
                    <div><strong>Mensagem:</strong> {message.length} caracteres</div>
                    <div><strong>Feedback:</strong> {feedback.length} caracteres</div>
                    <div><strong>Observações:</strong> {notes.length} caracteres</div>
                </div>

                {(messageError || feedbackError) && (
                    <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-lg">
                        <strong className="text-error">Erros encontrados:</strong>
                        <ul className="mt-1 text-sm">
                            {messageError && <li className="text-error">• {messageError}</li>}
                            {feedbackError && <li className="text-error">• {feedbackError}</li>}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}