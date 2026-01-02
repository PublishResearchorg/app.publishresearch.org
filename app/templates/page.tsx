"use client"

import { useState } from "react"
import { mockLatexTemplates } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Search, Star, FileCode } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")

  const filteredTemplates = mockLatexTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.venue?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || template.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const featuredTemplates = filteredTemplates.filter((t) => t.featured)
  const otherTemplates = filteredTemplates.filter((t) => !t.featured)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">LaTeX Templates</h1>
        <p className="text-muted-foreground mt-1">
          Download professional templates for conferences, journals, and theses
        </p>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search templates..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="conference">Conference</SelectItem>
              <SelectItem value="journal">Journal</SelectItem>
              <SelectItem value="thesis">Thesis</SelectItem>
              <SelectItem value="report">Report</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Featured Templates */}
      {featuredTemplates.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="text-xl font-semibold">Featured Templates</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden hover:border-primary/50 transition-colors">
                <div className="aspect-[3/4] bg-muted relative">
                  <img
                    src={template.previewImage || "/placeholder.svg?height=400&width=300"}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 right-3">
                    {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                  </Badge>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                    {template.venue && <p className="text-sm text-primary">{template.venue}</p>}
                    <p className="text-sm text-muted-foreground mt-2">{template.description}</p>
                  </div>
                  <Button className="w-full" asChild>
                    <a href={template.downloadUrl} download>
                      <Download className="w-4 h-4 mr-2" />
                      Download Template
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Other Templates */}
      {otherTemplates.length > 0 && (
        <div className="space-y-4">
          {featuredTemplates.length > 0 && <h2 className="text-xl font-semibold">More Templates</h2>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden hover:border-primary/50 transition-colors">
                <div className="aspect-[3/4] bg-muted relative">
                  <img
                    src={template.previewImage || "/placeholder.svg?height=400&width=300"}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 right-3">
                    {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                  </Badge>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                    {template.venue && <p className="text-sm text-primary">{template.venue}</p>}
                    <p className="text-sm text-muted-foreground mt-2">{template.description}</p>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <a href={template.downloadUrl} download>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {filteredTemplates.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <FileCode className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No templates found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        </Card>
      )}
    </div>
  )
}
