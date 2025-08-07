import { ErrorBoundary } from "@/components/common/ErrorBoundary"
import { StructuredData } from "@/components/common/StructuredData"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { ThemeWrapper } from "@/components/ui/theme"
import { LAYOUT_CONFIG } from "@/config"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { generateMetadata } from "@/lib/seo/metadata"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  ...generateMetadata(),
  metadataBase: new URL(LAYOUT_CONFIG.seo.siteUrl),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={LAYOUT_CONFIG.seo.defaultLanguage} className="scroll-smooth dark">
      <body className={`${inter.className} bg-background-primary text-text-primary dark:bg-background-primary dark:text-text-primary`}>
        <StructuredData />
        <ErrorBoundary>
          <ThemeProvider initialMode={LAYOUT_CONFIG.theme.defaultMode}>
            <ThemeWrapper>
              <div className="min-h-screen bg-background-primary dark:bg-background-primary">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
            </ThemeWrapper>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
