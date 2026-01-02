"use client"

import { use } from "react"
import { mockSynthesisRuns } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { ChevronRight, ExternalLink, ArrowLeft, Lightbulb, Clock, TrendingUp, Star } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function SynthesisResultPage({
  params,
}: {
  params: Promise<{ runId: string }>
}) {
  const { runId } = use(params)
  const run = mockSynthesisRuns.find((r) => r.id === runId)

  if (!run) {
    return (
      <Card className="p-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Synthesis not found</h2>
          <p className="text-muted-foreground mb-4">The synthesis you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/synthesis">Back to Synthesis</Link>
          </Button>
        </div>
      </Card>
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
      case "intermediate":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/synthesis">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Synthesis
          </Link>
        </Button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/synthesis" className="hover:text-foreground">
            Paper Synthesis
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span>{run.query}</span>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">{run.query}</h1>
            <p className="text-muted-foreground mt-1">Generated on {new Date(run.createdAt).toLocaleDateString()}</p>
          </div>
          <StatusBadge status={run.status} />
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="directions" className="w-full">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="directions" className="flex-1">
            Research Directions ({run.directions.length})
          </TabsTrigger>
          <TabsTrigger value="papers" className="flex-1">
            Papers ({run.papers.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="directions" className="space-y-4 mt-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recommended Research Directions</h2>
            <p className="text-muted-foreground mb-6">
              AI-generated research ideas based on current literature and identified gaps
            </p>

            <div className="space-y-6">
              {run.directions.map((direction) => (
                <div key={direction.id} className="p-6 rounded-lg border">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Lightbulb className="w-5 h-5 text-primary flex-shrink-0" />
                        <h3 className="font-semibold text-lg text-balance">{direction.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground text-pretty">{direction.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${getDifficultyColor(direction.difficulty)}`}
                      >
                        {direction.difficulty.charAt(0).toUpperCase() + direction.difficulty.slice(1)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {direction.estimatedTime}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="w-4 h-4" />
                      Impact: {direction.potentialImpact}/10
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="w-4 h-4" />
                      {direction.requiredBackground.length} prerequisites
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Required Background:</h4>
                    <div className="flex flex-wrap gap-2">
                      {direction.requiredBackground.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="papers" className="space-y-4 mt-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Papers from arXiv</h2>
            <p className="text-muted-foreground mb-6">Latest publications related to your research area</p>

            <div className="space-y-4">
              {run.papers.map((paper) => (
                <div key={paper.id} className="p-5 rounded-lg border hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-balance mb-2">{paper.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{paper.authors.join(", ")}</p>
                      <p className="text-sm text-muted-foreground mb-3">{paper.abstract}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">{paper.arxivId}</Badge>
                        {paper.categories.map((cat) => (
                          <Badge key={cat} variant="outline">
                            {cat}
                          </Badge>
                        ))}
                        <span className="text-xs text-muted-foreground ml-auto">
                          {new Date(paper.publishedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        PDF
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
