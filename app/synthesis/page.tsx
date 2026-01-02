"use client"

import { useState } from "react"
import { mockSynthesisRuns } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/status-badge"
import { Sparkles, Calendar, BookOpen, Lightbulb } from "lucide-react"
import Link from "next/link"
import { Label } from "@/components/ui/label"

export default function SynthesisPage() {
  const [searchQuery, setSearchQuery] = useState<string>("")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Paper Synthesis & Research Directions</h1>
        <p className="text-muted-foreground mt-1">Discover new research opportunities and explore the literature</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Explore Research Area</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="query">Research Topic</Label>
                <Input
                  id="query"
                  placeholder="Enter a research area or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Example: "climate change coastal ecosystems" or "quantum computing cryptography"
                </p>
              </div>

              <Button className="w-full" size="lg" disabled={!searchQuery.trim()}>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Insights
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">What You'll Get</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border">
                <BookOpen className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-medium mb-1">Latest Papers</h3>
                <p className="text-sm text-muted-foreground">Recent publications from arXiv in your field</p>
              </div>
              <div className="p-4 rounded-lg border">
                <Lightbulb className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-medium mb-1">Research Directions</h3>
                <p className="text-sm text-muted-foreground">AI-generated ideas for novel research projects</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">How It Works</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-semibold text-xs">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Analyze Literature</p>
                  <p className="text-xs mt-1">We scan recent papers in your field</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-semibold text-xs">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Identify Gaps</p>
                  <p className="text-xs mt-1">AI finds unexplored research areas</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-semibold text-xs">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Generate Ideas</p>
                  <p className="text-xs mt-1">Get concrete research proposals</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Tips</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Be specific about your research interest</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Review papers are updated weekly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Directions rated by difficulty level</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Save interesting papers for later</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Previous Syntheses */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Previous Explorations</h2>
        {mockSynthesisRuns.length === 0 ? (
          <div className="text-center py-12">
            <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No explorations yet</h3>
            <p className="text-sm text-muted-foreground">Start exploring research areas to discover opportunities</p>
          </div>
        ) : (
          <div className="space-y-3">
            {mockSynthesisRuns.map((run) => (
              <div key={run.id} className="p-4 rounded-lg border hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{run.query}</h3>
                      <StatusBadge status={run.status} />
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(run.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        {run.papers.length} papers
                      </span>
                      <span className="flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5" />
                        {run.directions.length} directions
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/synthesis/${run.id}`}>View Results</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
