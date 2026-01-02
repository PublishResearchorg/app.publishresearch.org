"use client"

import { use } from "react"
import { mockProjects } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { FileText, Upload, BookOpen, Sparkles, ChevronRight, Download, Calendar } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = use(params)
  const project = mockProjects.find((p) => p.id === projectId)

  if (!project) {
    return (
      <Card className="p-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Project not found</h2>
          <p className="text-muted-foreground mb-4">The project you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/projects">Back to Projects</Link>
          </Button>
        </div>
      </Card>
    )
  }

  const stageSteps = [
    { id: "idea", label: "Idea" },
    { id: "draft", label: "Draft" },
    { id: "review", label: "Review" },
    { id: "revision", label: "Revision" },
    { id: "submission", label: "Submission" },
    { id: "published", label: "Published" },
  ]

  const currentStepIndex = stageSteps.findIndex((step) => step.id === project.stage)

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/projects" className="hover:text-foreground">
            Projects
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span>{project.title}</span>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">{project.title}</h1>
            <p className="text-muted-foreground mt-1">{project.field}</p>
          </div>
          <StatusBadge status={project.stage} />
        </div>
        {project.description && <p className="text-muted-foreground mt-4">{project.description}</p>}
      </div>

      {/* Progress Stepper */}
      <Card className="p-6">
        <h2 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">Project Progress</h2>
        <div className="flex items-center justify-between">
          {stageSteps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    index <= currentStepIndex ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`text-xs mt-2 font-medium ${
                    index <= currentStepIndex ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < stageSteps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 rounded transition-colors ${
                    index < currentStepIndex ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="versions" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="versions" className="flex-1">
                Versions
              </TabsTrigger>
              <TabsTrigger value="overview" className="flex-1">
                Overview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="versions" className="space-y-4 mt-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Paper Versions</h2>
                  <Button size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload New Version
                  </Button>
                </div>

                {project.versions.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No versions yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">Upload your first draft to get started</p>
                    <Button>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Paper
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {project.versions.map((version) => (
                      <div key={version.id} className="p-4 rounded-lg border">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-medium">Version {version.versionNumber}</h3>
                              <span className="text-xs text-muted-foreground">{version.name}</span>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(version.createdAt).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <FileText className="w-3.5 h-3.5" />
                                {version.files.length} files
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {version.files.map((file) => (
                                <div
                                  key={file.id}
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted text-xs"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  {file.name}
                                </div>
                              ))}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="overview" className="mt-4">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Project Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Field</label>
                    <p className="mt-1">{project.field}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Created</label>
                    <p className="mt-1 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                    <p className="mt-1 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-4">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">AI Tools</h2>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/peer-review">
                  <FileText className="w-4 h-4 mr-3" />
                  Run Peer Review
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/citations">
                  <BookOpen className="w-4 h-4 mr-3" />
                  Find Related Works
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/synthesis">
                  <Sparkles className="w-4 h-4 mr-3" />
                  Generate Directions
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/latex-tool">
                  <FileText className="w-4 h-4 mr-3" />
                  LaTeX Assistant
                </Link>
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Next Steps</h2>
            <div className="space-y-3 text-sm">
              {currentStepIndex < stageSteps.length - 1 && (
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <p className="font-medium mb-1">Ready to move to {stageSteps[currentStepIndex + 1].label}?</p>
                  <p className="text-xs opacity-90">Complete current stage tasks first</p>
                </div>
              )}
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Upload latest draft version</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Run AI peer review</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Update references section</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
