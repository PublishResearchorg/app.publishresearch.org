# PublishResearch Platform

A comprehensive research publication platform that empowers young researchers to publish real science through mentorship, AI tools, and resources.

## Features

### Core Platform
- **Dashboard**: Overview of projects, activity, and next steps
- **Projects Management**: Create and organize research projects with version control
- **Authentication**: Sign in/up with email or Google OAuth

### AI-Powered Tools
- **AI Peer Review**: Get comprehensive feedback with OpenReview-style threaded discussions
- **Related Works Finder**: Discover relevant papers categorized by relevance
- **Paper Synthesis**: Generate research directions and explore arXiv papers
- **AI LaTeX Assistant**: Get help writing, debugging, and formatting LaTeX documents

### Resources
- **LaTeX Templates**: Download professional templates for conferences and journals
- **Conference Finder**: Search upcoming deadlines with rankings and acceptance rates

### Monetization
- **Pricing Plans**: Free, Pro ($29/mo), and Premium ($99/mo) tiers
- **Feature Gates**: Usage limits for free tier with upgrade prompts

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Type Safety**: TypeScript
- **State Management**: React hooks with mock data layer

## Design System

### Colors
- Primary: Teal (#17919C)
- Background: Cream (#FAF8F5)
- Text: Dark gray
- Accents: Teal variants

### Typography
- Sans: Geist
- Mono: Geist Mono

## Project Structure

```
app/
├── (auth)
│   ├── sign-in/          # Authentication pages
│   └── sign-up/
├── dashboard/            # Main dashboard with layout
├── projects/             # Project management
│   └── [projectId]/      # Project detail with versions
├── peer-review/          # AI peer review tool
│   └── [reviewId]/       # Review results
├── citations/            # Related works finder
│   └── [runId]/          # Citation results
├── synthesis/            # Paper synthesis tool
│   └── [runId]/          # Synthesis results
├── templates/            # LaTeX templates library
├── latex-tool/           # AI LaTeX assistant
├── conference-finder/    # Conference database
├── settings/             # User settings
└── upsells/              # Pricing page

components/
├── ui/                   # shadcn/ui components
├── sidebar.tsx           # Navigation sidebar
├── top-bar.tsx          # Header with search
├── breadcrumbs.tsx      # Navigation breadcrumbs
├── status-badge.tsx     # Status indicators
└── empty-state.tsx      # Empty state component

lib/
├── types.ts             # TypeScript type definitions
├── mock-data.ts         # Mock data for development
└── utils.ts             # Utility functions
```

## Getting Started

1. Clone the repository
2. Install dependencies: \`npm install\`
3. Run the development server: \`npm run dev\`
4. Open [http://localhost:3000](http://localhost:3000)

## Mock Data

The platform uses comprehensive mock data to simulate a fully functional research workflow:
- 3 sample projects in different stages
- Completed peer reviews with threaded comments
- Citation runs with categorized papers
- Synthesis runs with research directions
- LaTeX templates and conference listings

## Future Enhancements

- Database integration (Supabase/Neon)
- Real authentication with NextAuth
- File upload and storage
- Real-time collaboration
- Mentor matching system
- API integrations for paper databases
- LaTeX compilation preview
- Team workspace features
