import { cn } from "@/lib/utils"
import type { RunStatus, ProjectStage } from "@/lib/types"
import { Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react"

interface StatusBadgeProps {
  status: RunStatus | ProjectStage
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "pending":
        return {
          icon: Clock,
          label: "Pending",
          className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
        }
      case "processing":
        return {
          icon: Loader2,
          label: "Processing",
          className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
          animated: true,
        }
      case "completed":
        return {
          icon: CheckCircle2,
          label: "Completed",
          className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
        }
      case "failed":
        return {
          icon: XCircle,
          label: "Failed",
          className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        }
      case "idea":
        return {
          icon: Clock,
          label: "Idea",
          className: "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400",
        }
      case "draft":
        return {
          icon: Clock,
          label: "Draft",
          className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        }
      case "review":
        return {
          icon: Loader2,
          label: "In Review",
          className: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
        }
      case "revision":
        return {
          icon: Clock,
          label: "Revision",
          className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
        }
      case "submission":
        return {
          icon: Loader2,
          label: "Submitted",
          className: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
        }
      case "published":
        return {
          icon: CheckCircle2,
          label: "Published",
          className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
        }
      default:
        return {
          icon: Clock,
          label: status,
          className: "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400",
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        config.className,
        className,
      )}
    >
      <Icon className={cn("w-3.5 h-3.5", config.animated && "animate-spin")} />
      {config.label}
    </div>
  )
}
