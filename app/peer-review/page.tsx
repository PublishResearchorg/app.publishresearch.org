"use client"

import { useState } from "react"
import { mockProjects, mockReviewRuns } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatusBadge } from "@/components/status-badge"
import { FileText, PlayCircle, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function PeerReviewPage() {
  const [selectedProject, setSelectedProject] = useState<string>("")
  const [selectedVersion, setSelectedVersion] = useState<string>("")
  const [criteria, setCriteria] = useState<string[]>([
    "clarity",
    "novelty",
    "methodology",
    "significance",
    "presentation",
  ])

  const availableCriteria = [
    { id: "clarity", label: "Clarity & Writing Quality" },
    { id: "novelty", label: "Novelty & Originality" },
    { id: "methodology", label: "Methodology & Rigor" },
    { id: "significance", label: "Significance & Impact" },
    { id: "presentation", label: "Presentation & Organization" },
  ]

  const selectedProjectData = mockProjects.find((p) => p.id === selectedProject)
  const projectVersions = selectedProjectData?.versions || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Peer Review</h1>
        <p className="text-muted-foreground mt-1">Get comprehensive feedback on your research paper</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Run New Review</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="project">Select Project</Label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger id="project">
                    <SelectValue placeholder="Choose a project" />
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

              {selectedProject && projectVersions.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="version">Select Version</Label>
                  <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                    <SelectTrigger id="version">
                      <SelectValue placeholder="Choose a version" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectVersions.map((version) => (
                        <SelectItem key={version.id} value={version.id}>
                          Version {version.versionNumber} - {version.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-3">
                <Label>Review Criteria</Label>
                <div className="space-y-3">
                  {availableCriteria.map((criterion) => (
                    <div key={criterion.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={criterion.id}
                        checked={criteria.includes(criterion.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setCriteria([...criteria, criterion.id])
                          } else {
                            setCriteria(criteria.filter((c) => c !== criterion.id))
                          }
                        }}
                      />
                      <label
                        htmlFor={criterion.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {criterion.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full" size="lg" disabled={!selectedProject || !selectedVersion}>
                <PlayCircle className="w-5 h-5 mr-2" />
                Run AI Peer Review
              </Button>

              {(!selectedProject || !selectedVersion) && (
                <p className="text-sm text-muted-foreground text-center">
                  Select a project and version to run the review
                </p>
              )}
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
                  <p className="font-medium text-foreground">Upload Your Paper</p>
                  <p className="text-xs mt-1">Select a project version to review</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-semibold text-xs">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">AI Analysis</p>
                  <p className="text-xs mt-1">Our AI reviews based on selected criteria</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-semibold text-xs">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Get Feedback</p>
                  <p className="text-xs mt-1">Receive detailed scores and comments</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Review Tips</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Ensure your paper is in PDF or LaTeX format</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Include all figures and tables</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Reviews typically take 2-3 minutes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>You can run multiple reviews for different versions</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Previous Reviews */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Previous Reviews</h2>
        {mockReviewRuns.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No reviews yet</h3>
            <p className="text-sm text-muted-foreground">Run your first AI peer review to see results here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {mockReviewRuns.map((review) => {
              const project = mockProjects.find((p) => p.id === review.projectId)
              return (
                <div key={review.id} className="p-4 rounded-lg border hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{project?.title}</h3>
                        <StatusBadge status={review.status} />
                      </div>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" />
                          Overall Score: {review.overallScore}/10
                        </span>
                        <span>{review.threads.length} comments</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/peer-review/${review.id}`}>View Details</Link>
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
