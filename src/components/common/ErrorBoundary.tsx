"use client"

import { AlertTriangle, RefreshCw } from "lucide-react"
import { Component, ErrorInfo, ReactNode } from "react"

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    }

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: null })
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-background-primary">
                    <div className="max-w-md w-full mx-4">
                        <div className="bg-background-secondary border border-border-secondary rounded-lg p-6 text-center">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-error/10 rounded-full">
                                    <AlertTriangle className="h-8 w-8 text-error" />
                                </div>
                            </div>

                            <h2 className="text-xl font-semibold text-text-primary mb-2">
                                Algo deu errado
                            </h2>

                            <p className="text-text-secondary mb-6">
                                Ocorreu um erro inesperado. Nossa equipe foi notificada e está trabalhando para resolver o problema.
                            </p>

                            <button
                                onClick={this.handleReset}
                                className="inline-flex items-center space-x-2 px-4 py-2 bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg transition-colors"
                            >
                                <RefreshCw className="h-4 w-4" />
                                <span>Tentar novamente</span>
                            </button>

                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <details className="mt-4 text-left">
                                    <summary className="cursor-pointer text-text-secondary text-sm">
                                        Detalhes do erro (desenvolvimento)
                                    </summary>
                                    <pre className="mt-2 text-xs bg-background-tertiary p-3 rounded border overflow-auto">
                                        {this.state.error.stack}
                                    </pre>
                                </details>
                            )}
                        </div>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}