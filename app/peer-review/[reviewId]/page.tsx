"use client"

import { use, useState } from "react"
import { mockReviewRuns, mockProjects } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { ChevronRight, MessageSquare, AlertCircle, CheckCircle2, Info, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"

export default function ReviewDetailPage({
  params,
}: {
  params: Promise<{ reviewId: string }>
}) {
  const { reviewId } = use(params)
  const review = mockReviewRuns.find((r) => r.id === reviewId)
  const project = review ? mockProjects.find((p) => p.id === review.projectId) : null
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({})

  if (!review || !project) {
    return (
      <Card className="p-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Review not found</h2>
          <p className="text-muted-foreground mb-4">The review you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/peer-review">Back to Peer Review</Link>
          </Button>
        </div>
      </Card>
    )
  }

  const criticalThreads = review.threads.filter((t) => t.severity === "critical")
  const majorThreads = review.threads.filter((t) => t.severity === "major")
  const minorThreads = review.threads.filter((t) => t.severity === "minor")

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "major":
        return <AlertCircle className="w-4 h-4 text-amber-500" />
      case "minor":
        return <Info className="w-4 h-4 text-blue-500" />
      default:
        return <Info className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-l-red-500"
      case "major":
        return "border-l-amber-500"
      case "minor":
        return "border-l-blue-500"
      default:
        return "border-l-muted"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/peer-review">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Reviews
          </Link>
        </Button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/peer-review" className="hover:text-foreground">
            AI Peer Review
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span>{project.title}</span>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">{project.title}</h1>
            <p className="text-muted-foreground mt-1">
              Review completed on {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
          <StatusBadge status={review.status} />
        </div>
      </div>

      {/* Overall Score Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-1">Overall Score</h2>
            <p className="text-sm text-muted-foreground">Based on {review.criteria.length} criteria</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-primary">{review.overallScore}</div>
            <div className="text-sm text-muted-foreground">out of 10</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Clarity</span>
              <span className="font-semibold">{review.scores.clarity}</span>
            </div>
            <Progress value={review.scores.clarity * 10} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Novelty</span>
              <span className="font-semibold">{review.scores.novelty}</span>
            </div>
            <Progress value={review.scores.novelty * 10} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Methodology</span>
              <span className="font-semibold">{review.scores.methodology}</span>
            </div>
            <Progress value={review.scores.methodology * 10} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Significance</span>
              <span className="font-semibold">{review.scores.significance}</span>
            </div>
            <Progress value={review.scores.significance * 10} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Presentation</span>
              <span className="font-semibold">{review.scores.presentation}</span>
            </div>
            <Progress value={review.scores.presentation * 10} className="h-2" />
          </div>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">{criticalThreads.length}</div>
              <div className="text-sm text-muted-foreground">Critical Issues</div>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">{majorThreads.length}</div>
              <div className="text-sm text-muted-foreground">Major Issues</div>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">{minorThreads.length}</div>
              <div className="text-sm text-muted-foreground">Minor Issues</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Comments */}
      <Card className="p-6">
        <Tabs defaultValue="all">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Review Comments</h2>
            <TabsList>
              <TabsTrigger value="all">All ({review.threads.length})</TabsTrigger>
              <TabsTrigger value="critical">Critical ({criticalThreads.length})</TabsTrigger>
              <TabsTrigger value="major">Major ({majorThreads.length})</TabsTrigger>
              <TabsTrigger value="minor">Minor ({minorThreads.length})</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-4 mt-0">
            {review.threads.map((thread) => (
              <div
                key={thread.id}
                className={`p-4 rounded-lg border-l-4 ${getSeverityColor(thread.severity)} bg-muted/30`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getSeverityIcon(thread.severity)}</div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {thread.section && (
                          <span className="text-xs font-semibold px-2 py-1 rounded bg-background">
                            {thread.section}
                          </span>
                        )}
                        {thread.lineNumber && (
                          <span className="text-xs text-muted-foreground">Line {thread.lineNumber}</span>
                        )}
                      </div>
                      <p className="text-sm text-pretty">{thread.comment}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <span>AI Reviewer</span>
                        <span>•</span>
                        <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Replies */}
                    {thread.replies.length > 0 && (
                      <div className="space-y-3 ml-4 pl-4 border-l-2">
                        {thread.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-sm">{reply.comment}</p>
                              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                <span>You</span>
                                <span>•</span>
                                <span>{new Date(reply.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Form */}
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Add a response..."
                        className="min-h-[60px]"
                        value={replyText[thread.id] || ""}
                        onChange={(e) => setReplyText({ ...replyText, [thread.id]: e.target.value })}
                      />
                      <Button size="sm" className="self-end">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="critical" className="space-y-4 mt-0">
            {criticalThreads.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-emerald-500" />
                <p>No critical issues found</p>
              </div>
            ) : (
              criticalThreads.map((thread) => (
                <div
                  key={thread.id}
                  className={`p-4 rounded-lg border-l-4 ${getSeverityColor(thread.severity)} bg-muted/30`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getSeverityIcon(thread.severity)}</div>
                    <div className="flex-1">
                      <div>
                        {thread.section && (
                          <span className="text-xs font-semibold px-2 py-1 rounded bg-background">
                            {thread.section}
                          </span>
                        )}
                        <p className="text-sm mt-2">{thread.comment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="major" className="space-y-4 mt-0">
            {majorThreads.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-emerald-500" />
                <p>No major issues found</p>
              </div>
            ) : (
              majorThreads.map((thread) => (
                <div
                  key={thread.id}
                  className={`p-4 rounded-lg border-l-4 ${getSeverityColor(thread.severity)} bg-muted/30`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getSeverityIcon(thread.severity)}</div>
                    <div className="flex-1">
                      <div>
                        {thread.section && (
                          <span className="text-xs font-semibold px-2 py-1 rounded bg-background">
                            {thread.section}
                          </span>
                        )}
                        <p className="text-sm mt-2">{thread.comment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="minor" className="space-y-4 mt-0">
            {minorThreads.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-emerald-500" />
                <p>No minor issues found</p>
              </div>
            ) : (
              minorThreads.map((thread) => (
                <div
                  key={thread.id}
                  className={`p-4 rounded-lg border-l-4 ${getSeverityColor(thread.severity)} bg-muted/30`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getSeverityIcon(thread.severity)}</div>
                    <div className="flex-1">
                      <div>
                        {thread.section && (
                          <span className="text-xs font-semibold px-2 py-1 rounded bg-background">
                            {thread.section}
                          </span>
                        )}
                        <p className="text-sm mt-2">{thread.comment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
