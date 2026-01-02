import { mockProjects, mockActivities, mockReviewRuns, mockCitationRuns, mockUser } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { FolderOpen, FileText, BookOpen, TrendingUp, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const activeProjects = mockProjects.filter((p) => p.stage !== "published")
  const completedReviews = mockReviewRuns.filter((r) => r.status === "completed")
  const totalCitations = mockCitationRuns.reduce((sum, run) => sum + run.papers.length, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance">Welcome back, {mockUser.name.split(" ")[0]}</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with your research today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Projects</p>
              <p className="text-3xl font-bold mt-2">{activeProjects.length}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +1 this month
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FolderOpen className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Reviews Completed</p>
              <p className="text-3xl font-bold mt-2">{completedReviews.length}</p>
              <p className="text-xs text-muted-foreground mt-2">In the last 30 days</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Papers Found</p>
              <p className="text-3xl font-bold mt-2">{totalCitations}</p>
              <p className="text-xs text-muted-foreground mt-2">Across all searches</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Review Score</p>
              <p className="text-3xl font-bold mt-2">7.2</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">Strong quality</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Steps */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Next Steps</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/projects">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-4 p-4 rounded-lg border hover:border-primary/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm">Address peer review feedback</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Novel Approaches to Transformer Attention Mechanisms
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <StatusBadge status="review" />
                  <span className="text-xs text-muted-foreground">3 major issues to address</span>
                </div>
              </div>
              <Button size="sm" asChild>
                <Link href="/peer-review/review-1">Review</Link>
              </Button>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg border hover:border-primary/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm">Find related works for introduction</h3>
                <p className="text-sm text-muted-foreground mt-1">Climate Change Impact on Coastal Ecosystems</p>
                <div className="flex items-center gap-2 mt-2">
                  <StatusBadge status="draft" />
                  <span className="text-xs text-muted-foreground">Literature review needed</span>
                </div>
              </div>
              <Button size="sm" variant="outline" asChild>
                <Link href="/citations">Search</Link>
              </Button>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg border hover:border-primary/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FolderOpen className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm">Develop research plan</h3>
                <p className="text-sm text-muted-foreground mt-1">Quantum Computing Applications in Cryptography</p>
                <div className="flex items-center gap-2 mt-2">
                  <StatusBadge status="idea" />
                  <span className="text-xs text-muted-foreground">New project</span>
                </div>
              </div>
              <Button size="sm" variant="outline" asChild>
                <Link href="/synthesis">Explore</Link>
              </Button>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {mockActivities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-pretty">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatRelativeTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-auto py-6 flex-col gap-2 bg-transparent" asChild>
            <Link href="/projects">
              <FolderOpen className="w-6 h-6 text-primary" />
              <span className="font-medium">Create New Project</span>
              <span className="text-xs text-muted-foreground">Start your research journey</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto py-6 flex-col gap-2 bg-transparent" asChild>
            <Link href="/peer-review">
              <FileText className="w-6 h-6 text-primary" />
              <span className="font-medium">Run AI Peer Review</span>
              <span className="text-xs text-muted-foreground">Get feedback on your paper</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto py-6 flex-col gap-2 bg-transparent" asChild>
            <Link href="/templates">
              <FileText className="w-6 h-6 text-primary" />
              <span className="font-medium">Browse Templates</span>
              <span className="text-xs text-muted-foreground">Find the right format</span>
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}

function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return "Just now"
}
