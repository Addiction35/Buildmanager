"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useProject } from "@/contexts/project-context"
import type { Project } from "@/lib/api-service"

// Dummy project data for when API is not available
const dummyProjects: Project[] = [
  {
    id: "PRJ-001",
    name: "Riverside Apartments",
    client: {
      id: "CLT-001",
      name: "Riverside Development Corp",
    },
    status: "In Progress",
    budget: {
      total: 2450000,
      spent: 1568000,
      remaining: 882000,
    },
    completion: 65,
    dueDate: "2023-09-30",
    description: "Construction of a 120-unit apartment complex near the riverside area.",
    location: "123 River Road, Riverside, CA",
    manager: {
      id: "EMP-001",
      name: "John Smith",
    },
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2023-08-10T00:00:00Z",
  },
  {
    id: "PRJ-002",
    name: "Oakwood Office Complex",
    client: {
      id: "CLT-002",
      name: "Oakwood Enterprises",
    },
    status: "In Progress",
    budget: {
      total: 5178500,
      spent: 3625000,
      remaining: 1553500,
    },
    completion: 70,
    dueDate: "2023-11-15",
    description: "Development of a modern office complex with 5 buildings and underground parking.",
    location: "456 Oak Street, Downtown, CA",
    manager: {
      id: "EMP-002",
      name: "Sarah Johnson",
    },
    createdAt: "2023-02-10T00:00:00Z",
    updatedAt: "2023-08-05T00:00:00Z",
  },
  {
    id: "PRJ-003",
    name: "Sunset Heights Condos",
    client: {
      id: "CLT-003",
      name: "Sunset Properties LLC",
    },
    status: "In Progress",
    budget: {
      total: 3892750,
      spent: 1750000,
      remaining: 2142750,
    },
    completion: 45,
    dueDate: "2023-10-20",
    description: "Construction of luxury condominiums with ocean views and premium amenities.",
    location: "789 Sunset Blvd, Coastal City, CA",
    manager: {
      id: "EMP-003",
      name: "Michael Scott",
    },
    createdAt: "2023-03-05T00:00:00Z",
    updatedAt: "2023-08-01T00:00:00Z",
  },
]

export function ProjectSelector() {
  const [open, setOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { selectedProject, selectProject } = useProject()

  useEffect(() => {
    // In a real app, this would be an API call
    // const fetchProjects = async () => {
    //   try {
    //     const data = await projectsApi.getAll()
    //     setProjects(data)
    //   } catch (error) {
    //     console.error("Error fetching projects:", error)
    //   } finally {
    //     setIsLoading(false)
    //   }
    // }
    // fetchProjects()

    // Using dummy data for now
    setProjects(dummyProjects)
    setIsLoading(false)
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between md:w-[250px]">
          {selectedProject ? selectedProject.name : "Select a project..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 md:w-[250px]">
        <Command>
          <CommandInput placeholder="Search projects..." />
          <CommandList>
            <CommandEmpty>{isLoading ? "Loading..." : "No projects found."}</CommandEmpty>
            <CommandGroup>
              {projects.map((project) => (
                <CommandItem
                  key={project.id}
                  value={project.id}
                  onSelect={() => {
                    selectProject(project.id)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn("mr-2 h-4 w-4", selectedProject?.id === project.id ? "opacity-100" : "opacity-0")}
                  />
                  {project.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

