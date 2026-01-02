"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  BookOpen,
  Sparkles,
  FileCode,
  Calendar,
  DollarSign,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: FolderOpen },
  { name: "AI Peer Review", href: "/peer-review", icon: FileText },
  { name: "Related Works", href: "/citations", icon: BookOpen },
  { name: "Paper Synthesis", href: "/synthesis", icon: Sparkles },
  { name: "LaTeX Templates", href: "/templates", icon: FileCode },
  { name: "AI LaTeX Tool", href: "/latex-tool", icon: FileCode },
  { name: "Conference Finder", href: "/conference-finder", icon: Calendar },
  { name: "Upgrade", href: "/upsells", icon: DollarSign },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-background border-r z-40">
      <div className="flex h-16 items-center px-4 border-b">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg">PublishResearch</span>
        </Link>
      </div>

      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground",
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
