"use client"

import { useState } from "react"
import { mockConferences } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar, MapPin, ExternalLink, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ConferenceFinderPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterField, setFilterField] = useState<string>("all")
  const [filterType, setFilterType] = useState<string>("all")

  const filteredConferences = mockConferences.filter((conf) => {
    const matchesSearch =
      conf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conf.acronym.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conf.field.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesField = filterField === "all" || conf.field === filterField
    const matchesType = filterType === "all" || conf.type === filterType
    return matchesSearch && matchesField && matchesType
  })

  const sortedConferences = [...filteredConferences].sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
  )

  const getDaysUntilDeadline = (deadline: Date) => {
    const now = new Date()
    const diff = new Date(deadline).getTime() - now.getTime()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return days
  }

  const getRankingColor = (ranking?: string) => {
    switch (ranking) {
      case "A*":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
      case "A":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "B":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Conference Finder</h1>
        <p className="text-muted-foreground mt-1">Discover upcoming conferences and submission deadlines</p>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search conferences..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterField} onValueChange={setFilterField}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by field" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Fields</SelectItem>
              <SelectItem value="Machine Learning">Machine Learning</SelectItem>
              <SelectItem value="Human-Computer Interaction">HCI</SelectItem>
              <SelectItem value="Computer Vision">Computer Vision</SelectItem>
              <SelectItem value="NLP">NLP</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="conference">Conference</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="journal">Journal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Conferences List */}
      <div className="space-y-4">
        {sortedConferences.map((conf) => {
          const daysUntil = getDaysUntilDeadline(conf.deadline)
          const isUrgent = daysUntil <= 30 && daysUntil >= 0

          return (
            <Card
              key={conf.id}
              className={`p-6 hover:border-primary/50 transition-colors ${isUrgent ? "border-amber-500/50" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-xl">{conf.acronym}</h3>
                      {conf.ranking && <Badge className={getRankingColor(conf.ranking)}>Rank: {conf.ranking}</Badge>}
                      {isUrgent && <Badge variant="destructive">Deadline Soon</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{conf.name}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Deadline</p>
                        <p className="font-medium">{new Date(conf.deadline).toLocaleDateString()}</p>
                        {daysUntil >= 0 && (
                          <p
                            className={`text-xs ${isUrgent ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"}`}
                          >
                            {daysUntil} days left
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Conference Date</p>
                        <p className="font-medium">{new Date(conf.conferenceDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="font-medium">{conf.location}</p>
                      </div>
                    </div>

                    {conf.acceptanceRate && (
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Acceptance Rate</p>
                          <p className="font-medium">{conf.acceptanceRate}%</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{conf.field}</Badge>
                    <Badge variant="secondary">{conf.type.charAt(0).toUpperCase() + conf.type.slice(1)}</Badge>
                  </div>
                </div>

                <Button variant="outline" size="sm" asChild>
                  <a href={conf.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Website
                  </a>
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {sortedConferences.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No conferences found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        </Card>
      )}
    </div>
  )
}
