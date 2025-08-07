"use client"

import { LAWYER_CONFIG } from "@/config"
// import { useTheme } from "@/contexts/ThemeContext" // Removido temporariamente
import { motion } from "framer-motion"
import Image from "next/image"

/**
 * Componente Hero - Seção principal da página
 * Exibe informações do advogado, call-to-action e estatísticas
 */
export function Hero() {
    // const { theme } = useTheme() // Removido temporariamente até implementação do tema
    const { lawyer } = LAWYER_CONFIG

    const statistics = [
        {
            label: "Anos de Experiência",
            value: lawyer.statistics.experience,
            icon: "⚖️"
        },
        {
            label: "Casos Resolvidos",
            value: lawyer.statistics.casesResolved,
            icon: "✅"
        },
        {
            label: "Taxa de Sucesso",
            value: lawyer.statistics.successRate,
            icon: "📈"
        }
    ]

    return (
        <section id="home" className="relative overflow-hidden pt-12 sm:pt-16 lg:pt-20 bg-background-tertiary">
            {/* Background decoration */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-secondary-500 to-secondary-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>

            {/* Floating elements - hidden on mobile */}
            <div className="absolute inset-0 overflow-hidden hidden sm:block">
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-20 right-10 w-20 h-20 bg-secondary-500/20 rounded-full"
                />
                <motion.div
                    animate={{
                        y: [0, 20, 0],
                        rotate: [0, -5, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                    className="absolute bottom-20 left-10 w-16 h-16 bg-secondary-600/20 rounded-full"
                />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="mx-auto max-w-6xl lg:max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Coluna da Esquerda - Informações */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-center lg:text-left"
                        >
                            <motion.div
                                className="flex items-center justify-center lg:justify-start mb-4 sm:mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            >
                                <motion.div
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500/20 to-gold-600/20 text-gold-600 px-4 py-2 rounded-full text-sm font-semibold border border-gold-500/30 shadow-lg backdrop-blur-sm"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg className="h-3 w-3 sm:h-4 sm:w-4 text-gold-500 fill-current" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <span className="text-xs sm:text-sm font-medium">
                                        Advogada Especialista
                                    </span>
                                </motion.div>
                            </motion.div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-text-primary via-gold-500 to-text-primary bg-clip-text text-transparent drop-shadow-sm text-center lg:text-left">
                                {lawyer.name}
                            </h1>
                            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold bg-gradient-to-r from-secondary-600 to-secondary-500 bg-clip-text text-transparent text-center lg:text-left">
                                {lawyer.title}
                            </p>
                            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
                                {lawyer.description}
                            </p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                                className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8 justify-center lg:justify-start"
                            >
                                <motion.a
                                    href={LAWYER_CONFIG.socialMedia.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                    </svg>
                                    Agendar Consulta
                                </motion.a>
                                <motion.a
                                    href="#contact"
                                    className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-500 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Enviar Email
                                </motion.a>
                            </motion.div>
                        </motion.div>

                        {/* Coluna da Direita - Foto de Perfil da Advogada */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="flex justify-center lg:justify-end"
                        >
                            <div className="relative">
                                <motion.div
                                    className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-gold-500/40 shadow-2xl bg-gradient-to-br from-gold-100 to-gold-200"
                                    whileHover={{ scale: 1.05, rotateY: 5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Image
                                        src={lawyer.photo.src}
                                        alt={lawyer.photo.alt}
                                        fill
                                        className="object-cover object-center"
                                        sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gold-900/10 via-transparent to-transparent" />
                                </motion.div>
                                {/* Anel decorativo animado */}
                                <motion.div
                                    className="absolute -inset-3 rounded-full border-2 border-gold-400/30"
                                    animate={{
                                        scale: [1, 1.05, 1],
                                        opacity: [0.3, 0.6, 0.3],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                                {/* Segundo anel decorativo */}
                                <motion.div
                                    className="absolute -inset-6 rounded-full border border-gold-500/20"
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.2, 0.4, 0.2],
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 1
                                    }}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Estatísticas na parte inferior */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                        className="mt-16 sm:mt-20 lg:mt-24"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                            {statistics.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                                    className="bg-background-secondary border border-border-secondary rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-300"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-gold-500 to-gold-600 shadow-lg">
                                                <span className="text-2xl">{stat.icon}</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-2xl sm:text-3xl font-bold text-text-primary">
                                                {stat.value}
                                            </p>
                                            <p className="text-sm sm:text-base text-text-secondary">
                                                {stat.label}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
} 