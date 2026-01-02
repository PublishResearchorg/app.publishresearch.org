// Core domain types for PublishResearch platform

export type RunStatus = "pending" | "processing" | "completed" | "failed"
export type ProjectStage = "idea" | "draft" | "review" | "revision" | "submission" | "published"
export type UserRole = "student" | "mentor" | "admin"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  institution?: string
  department?: string
  createdAt: Date
}

export interface Project {
  id: string
  userId: string
  title: string
  description?: string
  stage: ProjectStage
  field: string
  versions: ProjectVersion[]
  createdAt: Date
  updatedAt: Date
}

export interface ProjectVersion {
  id: string
  projectId: string
  versionNumber: number
  name: string
  files: ProjectFile[]
  createdAt: Date
}

export interface ProjectFile {
  id: string
  name: string
  type: "pdf" | "tex" | "zip" | "doc"
  size: number
  url: string
  uploadedAt: Date
}

export interface ReviewRun {
  id: string
  projectId: string
  versionId: string
  status: RunStatus
  criteria: string[]
  overallScore: number
  scores: {
    clarity: number
    novelty: number
    methodology: number
    significance: number
    presentation: number
  }
  threads: ReviewThread[]
  createdAt: Date
  completedAt?: Date
}

export interface ReviewThread {
  id: string
  lineNumber?: number
  section?: string
  comment: string
  severity: "critical" | "major" | "minor" | "suggestion"
  author: "ai" | "mentor"
  replies: ReviewReply[]
  createdAt: Date
}

export interface ReviewReply {
  id: string
  comment: string
  author: "ai" | "user" | "mentor"
  createdAt: Date
}

export interface CitationRun {
  id: string
  projectId: string
  versionId: string
  status: RunStatus
  query: string
  papers: CitedPaper[]
  createdAt: Date
  completedAt?: Date
}

export interface CitedPaper {
  id: string
  title: string
  authors: string[]
  year: number
  venue: string
  abstract: string
  citationCount: number
  relevanceScore: number
  category: "foundational" | "recent" | "methods" | "related"
  bibtex: string
  url?: string
}

export interface SynthesisRun {
  id: string
  projectId: string
  query: string
  status: RunStatus
  papers: SynthesisPaper[]
  directions: ResearchDirection[]
  createdAt: Date
  completedAt?: Date
}

export interface SynthesisPaper {
  id: string
  arxivId: string
  title: string
  authors: string[]
  publishedDate: Date
  abstract: string
  categories: string[]
  pdfUrl: string
}

export interface ResearchDirection {
  id: string
  title: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  estimatedTime: string
  requiredBackground: string[]
  potentialImpact: number
}

export interface LatexTemplate {
  id: string
  name: string
  description: string
  venue?: string
  category: "conference" | "journal" | "thesis" | "report"
  previewImage: string
  downloadUrl: string
  featured: boolean
}

export interface Conference {
  id: string
  name: string
  acronym: string
  field: string
  deadline: Date
  notificationDate: Date
  conferenceDate: Date
  location: string
  type: "conference" | "workshop" | "journal"
  acceptanceRate?: number
  ranking?: "A*" | "A" | "B" | "C"
  website: string
}

export interface Activity {
  id: string
  type: "project_created" | "review_completed" | "citation_run" | "synthesis_run" | "file_uploaded"
  message: string
  projectId?: string
  timestamp: Date
}
