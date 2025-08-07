"use client"

import { LAWYER_CONFIG } from "@/config"
// import { useTheme } from "@/contexts/ThemeContext" // Removido temporariamente
import { motion } from "framer-motion"

/**
 * About Section Component
 * Displays information about the lawyer and their expertise
 */
export function About() {
    // const { theme } = useTheme() // Removido temporariamente até implementação do tema
    const { lawyer, about } = LAWYER_CONFIG

    return (
        <section id="about" className="relative py-8 sm:py-12 lg:py-16 xl:py-20 bg-background-primary">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="text-center mb-12 sm:mb-16">
                    <motion.div
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500/20 to-gold-600/20 text-gold-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-gold-500/30 shadow-lg backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        whileHover={{ scale: 1.05, y: -2 }}
                    >
                        <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Sobre
                    </motion.div>
                    <motion.h2
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-text-primary via-gold-500 to-text-primary bg-clip-text text-transparent mb-4 drop-shadow-sm hover:scale-105 transition-transform duration-300 cursor-default"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        whileHover={{ scale: 1.02 }}
                    >
                        Sobre Mim
                    </motion.h2>
                    <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                        Conheça minha trajetória e especialidades jurídicas
                    </p>
                </div>

                <div className="mx-auto max-w-6xl lg:max-w-7xl">
                    <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                            className="space-y-6 sm:space-y-8"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2 text-sm font-medium text-secondary-600 bg-secondary-500/10 px-3 py-1 rounded-full">
                                    <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    Sobre
                                </div>
                            </div>

                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-text-primary lg:text-4xl xl:text-5xl">
                                {lawyer.name}
                            </h3>
                            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg leading-7 sm:leading-8 text-text-secondary">
                                {lawyer.description}
                            </p>
                            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-7 sm:leading-8 text-text-secondary">
                                Minha missão é fornecer soluções jurídicas eficazes, sempre priorizando a ética,
                                transparência e compromisso com meus clientes. Acredito que cada caso é único e
                                merece atenção especial, independentemente da complexidade.
                            </p>

                            <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                                {about.highlights.map((highlight, index) => (
                                    <motion.div
                                        key={highlight}
                                        className="flex items-center space-x-3 p-3 bg-background-secondary border border-border-secondary rounded-lg"
                                        whileHover={{ scale: 1.02 }}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.2, delay: index * 0.1 }}
                                    >
                                        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                        <span className="text-sm sm:text-base text-text-primary font-medium">{highlight}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="space-y-6 sm:space-y-8"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="bg-background-secondary rounded-xl p-4 sm:p-6 shadow-lg border border-border-secondary"
                            >
                                <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-3 sm:mb-4 flex items-center">
                                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Por que escolher meus serviços?
                                </h3>
                                <ul className="space-y-2 sm:space-y-3">
                                    {about.whyChooseUs.map((item, index) => (
                                        <motion.li
                                            key={item}
                                            className="flex items-start space-x-3"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div className="flex-shrink-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-secondary-500 rounded-full mt-1.5 sm:mt-2" />
                                            <span className="text-sm sm:text-base text-text-secondary">{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="bg-background-secondary rounded-xl p-4 sm:p-6 shadow-lg border border-border-secondary"
                            >
                                <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-3 sm:mb-4 flex items-center">
                                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    Credenciais e Experiência
                                </h3>
                                <div className="space-y-2 sm:space-y-3">
                                    <motion.div
                                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-background-tertiary/50 transition-colors"
                                        whileHover={{ x: 5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                        <span className="text-sm sm:text-base text-text-primary font-medium">{lawyer.credentials.bar}</span>
                                    </motion.div>
                                    <motion.div
                                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-background-tertiary/50 transition-colors"
                                        whileHover={{ x: 5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm sm:text-base text-text-primary font-medium">{lawyer.statistics.experience} anos de experiência</span>
                                    </motion.div>
                                    <motion.div
                                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-background-tertiary/50 transition-colors"
                                        whileHover={{ x: 5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm sm:text-base text-text-primary font-medium">{lawyer.statistics.casesResolved} casos resolvidos</span>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
} 