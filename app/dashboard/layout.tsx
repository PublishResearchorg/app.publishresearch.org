import type React from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Sidebar is now handled at the root layout level
  return <>{children}</>
}
