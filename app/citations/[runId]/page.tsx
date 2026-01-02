"use client"

import { use, useState } from "react"
import { mockCitationRuns, mockProjects } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { ChevronRight, BookOpen, ExternalLink, Copy, Check, ArrowLeft, Star } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export default function CitationResultPage({
  params,
}: {
  params: Promise<{ runId: string }>
}) {
  const { runId } = use(params)
  const run = mockCitationRuns.find((r) => r.id === runId)
  const project = run ? mockProjects.find((p) => p.id === run.projectId) : null
  const [copiedId, setCopiedId] = useState<string | null>(null)

  if (!run) {
    return (
      <Card className="p-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Search not found</h2>
          <p className="text-muted-foreground mb-4">The citation search you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/citations">Back to Citations</Link>
          </Button>
        </div>
      </Card>
    )
  }

  const foundationalPapers = run.papers.filter((p) => p.category === "foundational")
  const recentPapers = run.papers.filter((p) => p.category === "recent")
  const methodsPapers = run.papers.filter((p) => p.category === "methods")
  const relatedPapers = run.papers.filter((p) => p.category === "related")

  const handleCopyBibtex = (paperId: string, bibtex: string) => {
    navigator.clipboard.writeText(bibtex)
    setCopiedId(paperId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const PaperCard = ({ paper }: { paper: (typeof run.papers)[0] }) => (
    <div className="p-5 rounded-lg border hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-balance mb-2">{paper.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">
            {paper.authors.join(", ")} • {paper.venue} {paper.year}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{paper.abstract}</p>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{paper.citationCount.toLocaleString()} citations</span>
            </div>
            <Badge variant="secondary">Relevance: {paper.relevanceScore}/10</Badge>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Copy className="w-4 h-4 mr-2" />
                BibTeX
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>BibTeX Citation</DialogTitle>
                <DialogDescription>Copy this citation to your bibliography file</DialogDescription>
              </DialogHeader>
              <Textarea value={paper.bibtex} readOnly className="font-mono text-xs min-h-[200px]" />
              <Button onClick={() => handleCopyBibtex(paper.id, paper.bibtex)} className="w-full">
                {copiedId === paper.id ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy to Clipboard
                  </>
                )}
              </Button>
            </DialogContent>
          </Dialog>
          {paper.url && (
            <Button size="sm" variant="ghost" asChild>
              <a href={paper.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/citations">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Searches
          </Link>
        </Button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/citations" className="hover:text-foreground">
            Related Works
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span>{run.query}</span>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">Search Results</h1>
            <p className="text-muted-foreground mt-1">
              Found {run.papers.length} papers for "{run.query}"
            </p>
            {project && <p className="text-sm text-muted-foreground mt-1">Project: {project.title}</p>}
          </div>
          <StatusBadge status={run.status} />
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            <div>
              <div className="text-2xl font-bold">{foundationalPapers.length}</div>
              <div className="text-sm text-muted-foreground">Foundational</div>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            <div>
              <div className="text-2xl font-bold">{recentPapers.length}</div>
              <div className="text-sm text-muted-foreground">Recent Work</div>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            <div>
              <div className="text-2xl font-bold">{methodsPapers.length}</div>
              <div className="text-sm text-muted-foreground">Methods</div>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            <div>
              <div className="text-2xl font-bold">{relatedPapers.length}</div>
              <div className="text-sm text-muted-foreground">Related</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Papers by Category */}
      <Card className="p-6">
        <Tabs defaultValue="all">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Papers</h2>
            <TabsList>
              <TabsTrigger value="all">All ({run.papers.length})</TabsTrigger>
              <TabsTrigger value="foundational">Foundational ({foundationalPapers.length})</TabsTrigger>
              <TabsTrigger value="recent">Recent ({recentPapers.length})</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-4 mt-0">
            {run.papers.map((paper) => (
              <PaperCard key={paper.id} paper={paper} />
            ))}
          </TabsContent>

          <TabsContent value="foundational" className="space-y-4 mt-0">
            <div className="mb-4 p-4 rounded-lg bg-primary/10">
              <p className="text-sm text-primary">
                These are seminal works that established the field. Essential for background and motivation.
              </p>
            </div>
            {foundationalPapers.map((paper) => (
              <PaperCard key={paper.id} paper={paper} />
            ))}
          </TabsContent>

          <TabsContent value="recent" className="space-y-4 mt-0">
            <div className="mb-4 p-4 rounded-lg bg-primary/10">
              <p className="text-sm text-primary">
                Recent publications showing current state-of-the-art and emerging trends.
              </p>
            </div>
            {recentPapers.map((paper) => (
              <PaperCard key={paper.id} paper={paper} />
            ))}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
