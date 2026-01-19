import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { favicons } from '@/lib/favicons'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Portare', template: '%s | Portare' },
  description: 'TMS — Sistema de Gerenciamento de Transporte',
  icons: favicons,
  creator: 'Nicolas Baldoino',
  authors: [
    { name: 'Nicolas Baldoino', url: 'github.com/nicolasbaldoino' },
    { name: 'Daniel Baldoino', url: 'github.com/srbaldoino' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          'h-full min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
