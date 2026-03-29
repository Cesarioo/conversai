import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { Navbar } from "./components/Navbar"
import { cn } from "@/lib/utils"
import { ConversationsProvider } from "./contexts/ConversationsContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ConversAI",
  description: "Create and manage conversational AI agents",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-background")}>
        <ConversationsProvider>
          <div className="flex h-screen">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-6 bg-background">{children}</main>
          </div>
        </ConversationsProvider>
      </body>
    </html>
  )
}

