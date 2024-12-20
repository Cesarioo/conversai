"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, PhoneCall, Settings, HeadsetIcon } from 'lucide-react'

const navItems = [
  { name: "Agent Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Call History", href: "/call-history", icon: PhoneCall },
  { name: "Agent Settings", href: "/agent-settings", icon: Settings },
  { name: "Live Support", href: "/live-support", icon: HeadsetIcon },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="flex w-64 flex-col space-y-2 border-r bg-blue-50 p-4 pt-6">
      <div className="mb-6 flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="https://pub-ec409c78c9ae4f9dad3ed1d5dbf6b44c.r2.dev/conversai.png" 
          alt="ConversAI Logo" 
          className="w-full"
        />
      </div>
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link key={item.name} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start transition-colors duration-200",
                isActive 
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "btn-ghost"
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          </Link>
        )
      })}
    </nav>
  )
}

