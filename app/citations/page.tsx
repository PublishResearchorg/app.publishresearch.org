"use client"

import { useState } from "react"
import { mockCitationRuns, mockProjects } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatusBadge } from "@/components/status-badge"
import { Search, Calendar, BookOpen } from "lucide-react"
import Link from "next/link"
import { Label } from "@/components/ui/label"

export default function CitationsPage() {
  const [selectedProject, setSelectedProject] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Related Works Finder</h1>
        <p className="text-muted-foreground mt-1">Discover relevant papers for your literature review</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Find Related Papers</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="project">Link to Project (Optional)</Label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger id="project">
                    <SelectValue placeholder="Choose a project or search independently" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProjects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="query">Search Query</Label>
                <Input
                  id="query"
                  placeholder="Enter keywords, topics, or research questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Example: "transformer attention mechanisms efficiency" or "climate change coastal ecosystems"
                </p>
              </div>

              <Button className="w-full" size="lg" disabled={!searchQuery.trim()}>
                <Search className="w-5 h-5 mr-2" />
                Find Related Papers
              </Button>
            </div>
          </Card>
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">What We Search</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Academic Papers</p>
                  <p className="text-xs mt-1">Major conferences and journals</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">arXiv Preprints</p>
                  <p className="text-xs mt-1">Latest research from arXiv</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Citation Networks</p>
                  <p className="text-xs mt-1">Papers cited by key works</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Search Tips</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Use specific technical terms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Include field or domain keywords</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Results are grouped by relevance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Export BibTeX for easy citation</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Previous Searches */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Searches</h2>
        {mockCitationRuns.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No searches yet</h3>
            <p className="text-sm text-muted-foreground">Run your first search to find related papers</p>
          </div>
        ) : (
          <div className="space-y-3">
            {mockCitationRuns.map((run) => {
              const project = mockProjects.find((p) => p.id === run.projectId)
              return (
                <div key={run.id} className="p-4 rounded-lg border hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{run.query}</h3>
                        <StatusBadge status={run.status} />
                      </div>
                      {project && <p className="text-sm text-muted-foreground mb-2">{project.title}</p>}
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(run.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          {run.papers.length} papers found
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/citations/${run.id}`}>View Results</Link>
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Card>
    </div>
  )
}
