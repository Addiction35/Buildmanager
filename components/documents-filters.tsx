"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { getData } from "@/lib/dummy-data"

export function DocumentsFilters() {
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    // Fetch projects for the filter
    const projectsData = getData("projects")
    setProjects(projectsData)
  }, [])

  const documentTypes = [
    { value: "all", label: "All Types" },
    { value: "Estimate", label: "Estimates" },
    { value: "Proposal", label: "Proposals" },
    { value: "Purchase Order", label: "Purchase Orders" },
    { value: "Blueprint", label: "Blueprints" },
    { value: "Schedule", label: "Schedules" },
    { value: "Report", label: "Reports" },
    { value: "Specifications", label: "Specifications" },
    { value: "Photo", label: "Photos" },
  ]

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search documents..." className="w-full pl-8" />
      </div>
      <Select defaultValue="all">
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Project" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Projects</SelectItem>
          {projects.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              {project.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select defaultValue="all">
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Document Type" />
        </SelectTrigger>
        <SelectContent>
          {documentTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select defaultValue="newest">
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
          <SelectItem value="name-asc">Name (A-Z)</SelectItem>
          <SelectItem value="name-desc">Name (Z-A)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

