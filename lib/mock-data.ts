import type { User, Project, ReviewRun, CitationRun, SynthesisRun, LatexTemplate, Conference, Activity } from "./types"

// Mock current user
export const mockUser: User = {
  id: "user-1",
  name: "Alex Chen",
  email: "alex.chen@university.edu",
  avatar: "/diverse-student-portraits.png",
  role: "student",
  institution: "MIT",
  department: "Computer Science",
  createdAt: new Date("2024-01-15"),
}

// Mock projects
export const mockProjects: Project[] = [
  {
    id: "proj-1",
    userId: "user-1",
    title: "Novel Approaches to Transformer Attention Mechanisms",
    description: "Exploring efficiency improvements in attention mechanisms for large language models",
    stage: "review",
    field: "Machine Learning",
    versions: [
      {
        id: "ver-1-1",
        projectId: "proj-1",
        versionNumber: 1,
        name: "Initial Draft",
        files: [
          {
            id: "file-1",
            name: "paper_v1.pdf",
            type: "pdf",
            size: 2456789,
            url: "/mock/paper_v1.pdf",
            uploadedAt: new Date("2024-11-20"),
          },
        ],
        createdAt: new Date("2024-11-20"),
      },
      {
        id: "ver-1-2",
        projectId: "proj-1",
        versionNumber: 2,
        name: "Post-Review Revision",
        files: [
          {
            id: "file-2",
            name: "paper_v2.pdf",
            type: "pdf",
            size: 2567890,
            url: "/mock/paper_v2.pdf",
            uploadedAt: new Date("2024-12-15"),
          },
        ],
        createdAt: new Date("2024-12-15"),
      },
    ],
    createdAt: new Date("2024-11-20"),
    updatedAt: new Date("2024-12-15"),
  },
  {
    id: "proj-2",
    userId: "user-1",
    title: "Climate Change Impact on Coastal Ecosystems",
    description: "A comprehensive study on biodiversity changes in coastal regions",
    stage: "draft",
    field: "Environmental Science",
    versions: [
      {
        id: "ver-2-1",
        projectId: "proj-2",
        versionNumber: 1,
        name: "Draft v1",
        files: [
          {
            id: "file-3",
            name: "climate_paper.tex",
            type: "tex",
            size: 156789,
            url: "/mock/climate_paper.tex",
            uploadedAt: new Date("2024-12-01"),
          },
        ],
        createdAt: new Date("2024-12-01"),
      },
    ],
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2024-12-05"),
  },
  {
    id: "proj-3",
    userId: "user-1",
    title: "Quantum Computing Applications in Cryptography",
    description: "Investigating post-quantum cryptographic algorithms",
    stage: "idea",
    field: "Quantum Computing",
    versions: [],
    createdAt: new Date("2024-12-20"),
    updatedAt: new Date("2024-12-20"),
  },
]

// Mock review runs
export const mockReviewRuns: ReviewRun[] = [
  {
    id: "review-1",
    projectId: "proj-1",
    versionId: "ver-1-2",
    status: "completed",
    criteria: ["Clarity", "Novelty", "Methodology", "Significance", "Presentation"],
    overallScore: 7.2,
    scores: {
      clarity: 7.5,
      novelty: 8.0,
      methodology: 6.8,
      significance: 7.5,
      presentation: 6.2,
    },
    threads: [
      {
        id: "thread-1",
        section: "Introduction",
        lineNumber: 15,
        comment:
          "The motivation for this work could be stated more clearly. Consider adding specific examples of current limitations in transformer attention mechanisms.",
        severity: "major",
        author: "ai",
        replies: [
          {
            id: "reply-1",
            comment: "Thanks for the feedback. I'll add examples from GPT-3 and BERT showing attention bottlenecks.",
            author: "user",
            createdAt: new Date("2024-12-16"),
          },
        ],
        createdAt: new Date("2024-12-15"),
      },
      {
        id: "thread-2",
        section: "Methodology",
        lineNumber: 142,
        comment:
          "The experimental setup is well-designed. However, consider adding ablation studies to isolate the contribution of each component.",
        severity: "minor",
        author: "ai",
        replies: [],
        createdAt: new Date("2024-12-15"),
      },
      {
        id: "thread-3",
        section: "Results",
        lineNumber: 203,
        comment:
          "Table 2 shows impressive results, but error bars or confidence intervals should be included to assess statistical significance.",
        severity: "major",
        author: "ai",
        replies: [],
        createdAt: new Date("2024-12-15"),
      },
    ],
    createdAt: new Date("2024-12-15"),
    completedAt: new Date("2024-12-15"),
  },
]

// Mock citation runs
export const mockCitationRuns: CitationRun[] = [
  {
    id: "cite-1",
    projectId: "proj-1",
    versionId: "ver-1-2",
    status: "completed",
    query: "transformer attention mechanisms efficiency",
    papers: [
      {
        id: "paper-1",
        title: "Attention Is All You Need",
        authors: ["Vaswani, A.", "Shazeer, N.", "Parmar, N.", "et al."],
        year: 2017,
        venue: "NeurIPS",
        abstract:
          "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks...",
        citationCount: 78456,
        relevanceScore: 9.8,
        category: "foundational",
        bibtex:
          "@inproceedings{vaswani2017attention,\n  title={Attention is all you need},\n  author={Vaswani, Ashish and Shazeer, Noam},\n  booktitle={NeurIPS},\n  year={2017}\n}",
        url: "https://arxiv.org/abs/1706.03762",
      },
      {
        id: "paper-2",
        title: "Efficient Transformers: A Survey",
        authors: ["Tay, Y.", "Dehghani, M.", "Bahri, D.", "Metzler, D."],
        year: 2022,
        venue: "ACM Computing Surveys",
        abstract:
          "Transformer models have become ubiquitous in natural language processing. However, their quadratic complexity...",
        citationCount: 1234,
        relevanceScore: 9.5,
        category: "recent",
        bibtex:
          "@article{tay2022efficient,\n  title={Efficient transformers: A survey},\n  author={Tay, Yi and Dehghani, Mostafa},\n  journal={ACM Computing Surveys},\n  year={2022}\n}",
        url: "https://arxiv.org/abs/2009.06732",
      },
    ],
    createdAt: new Date("2024-12-10"),
    completedAt: new Date("2024-12-10"),
  },
]

// Mock synthesis runs
export const mockSynthesisRuns: SynthesisRun[] = [
  {
    id: "synth-1",
    projectId: "proj-2",
    query: "climate change coastal ecosystems",
    status: "completed",
    papers: [
      {
        id: "arxiv-1",
        arxivId: "2312.12345",
        title: "Long-term Monitoring of Coral Reef Degradation Under Climate Stress",
        authors: ["Smith, J.", "Johnson, K."],
        publishedDate: new Date("2023-12-15"),
        abstract: "This study presents a comprehensive analysis of coral reef health across 50 sites...",
        categories: ["Environmental Science", "Marine Biology"],
        pdfUrl: "https://arxiv.org/pdf/2312.12345",
      },
    ],
    directions: [
      {
        id: "dir-1",
        title: "Investigate Microplastic Impact on Marine Food Chains",
        description: "Examine how microplastic accumulation affects various trophic levels in coastal ecosystems",
        difficulty: "intermediate",
        estimatedTime: "6-9 months",
        requiredBackground: ["Marine biology", "Chemistry", "Statistical analysis"],
        potentialImpact: 8,
      },
      {
        id: "dir-2",
        title: "Model Sea Level Rise Effects on Wetland Migration",
        description: "Create predictive models for wetland habitat shifts under various sea level rise scenarios",
        difficulty: "advanced",
        estimatedTime: "12-18 months",
        requiredBackground: ["GIS", "Climate modeling", "Ecology"],
        potentialImpact: 9,
      },
    ],
    createdAt: new Date("2024-12-05"),
    completedAt: new Date("2024-12-05"),
  },
]

// Mock LaTeX templates
export const mockLatexTemplates: LatexTemplate[] = [
  {
    id: "tmpl-1",
    name: "NeurIPS 2024",
    description: "Official template for Neural Information Processing Systems conference",
    venue: "NeurIPS 2024",
    category: "conference",
    previewImage: "/latex-template-preview.jpg",
    downloadUrl: "/templates/neurips2024.zip",
    featured: true,
  },
  {
    id: "tmpl-2",
    name: "IEEE Conference Template",
    description: "Standard IEEE two-column conference format",
    venue: "IEEE",
    category: "conference",
    previewImage: "/ieee-template-preview.jpg",
    downloadUrl: "/templates/ieee-conf.zip",
    featured: true,
  },
  {
    id: "tmpl-3",
    name: "ACM SIGCHI",
    description: "Template for ACM SIGCHI conference on Human Factors in Computing",
    venue: "CHI 2024",
    category: "conference",
    previewImage: "/acm-template-preview.jpg",
    downloadUrl: "/templates/acm-sigchi.zip",
    featured: false,
  },
  {
    id: "tmpl-4",
    name: "Nature Journal",
    description: "Submission template for Nature journals",
    venue: "Nature",
    category: "journal",
    previewImage: "/nature-journal-template.jpg",
    downloadUrl: "/templates/nature.zip",
    featured: true,
  },
]

// Mock conferences
export const mockConferences: Conference[] = [
  {
    id: "conf-1",
    name: "Conference on Neural Information Processing Systems",
    acronym: "NeurIPS",
    field: "Machine Learning",
    deadline: new Date("2025-05-15"),
    notificationDate: new Date("2025-09-15"),
    conferenceDate: new Date("2025-12-10"),
    location: "New Orleans, USA",
    type: "conference",
    acceptanceRate: 21,
    ranking: "A*",
    website: "https://neurips.cc",
  },
  {
    id: "conf-2",
    name: "International Conference on Machine Learning",
    acronym: "ICML",
    field: "Machine Learning",
    deadline: new Date("2025-02-01"),
    notificationDate: new Date("2025-05-10"),
    conferenceDate: new Date("2025-07-21"),
    location: "Vienna, Austria",
    type: "conference",
    acceptanceRate: 22,
    ranking: "A*",
    website: "https://icml.cc",
  },
  {
    id: "conf-3",
    name: "CHI Conference on Human Factors in Computing Systems",
    acronym: "CHI",
    field: "Human-Computer Interaction",
    deadline: new Date("2025-09-15"),
    notificationDate: new Date("2025-12-15"),
    conferenceDate: new Date("2026-04-27"),
    location: "Seattle, USA",
    type: "conference",
    acceptanceRate: 23,
    ranking: "A*",
    website: "https://chi2026.acm.org",
  },
]

// Mock activity feed
export const mockActivities: Activity[] = [
  {
    id: "act-1",
    type: "review_completed",
    message: 'AI Peer Review completed for "Novel Approaches to Transformer Attention Mechanisms"',
    projectId: "proj-1",
    timestamp: new Date("2024-12-15"),
  },
  {
    id: "act-2",
    type: "file_uploaded",
    message: 'Uploaded paper_v2.pdf to "Novel Approaches to Transformer Attention Mechanisms"',
    projectId: "proj-1",
    timestamp: new Date("2024-12-15"),
  },
  {
    id: "act-3",
    type: "citation_run",
    message: "Found 42 related papers for your research",
    projectId: "proj-1",
    timestamp: new Date("2024-12-10"),
  },
  {
    id: "act-4",
    type: "synthesis_run",
    message: 'Generated 5 research directions for "Climate Change Impact on Coastal Ecosystems"',
    projectId: "proj-2",
    timestamp: new Date("2024-12-05"),
  },
  {
    id: "act-5",
    type: "project_created",
    message: 'Created new project: "Quantum Computing Applications in Cryptography"',
    projectId: "proj-3",
    timestamp: new Date("2024-12-20"),
  },
]
