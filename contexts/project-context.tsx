"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getItemById, simulateApiDelay } from "@/lib/dummy-data"
import type { Project } from "@/lib/api-service"

interface ProjectContextType {
  selectedProject: Project | null
  selectProject: (projectId: string) => void
  clearSelectedProject: () => void
  isLoading: boolean
  error: Error | null
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Extract project ID from URL if present
  useEffect(() => {
    const extractProjectId = () => {
      const match = pathname.match(/\/projects\/([^/]+)/)
      return match ? match[1] : null
    }

    const projectId = extractProjectId()

    if (projectId && (!selectedProject || selectedProject.id !== projectId)) {
      fetchProject(projectId)
    }
  }, [pathname, selectedProject])

  const fetchProject = async (projectId: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API delay
      await simulateApiDelay()

      // Get project from dummy data
      const project = getItemById("projects", projectId) as Project | undefined

      if (project) {
        setSelectedProject(project)
      } else {
        throw new Error("Project not found")
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch project"))
      console.error("Error fetching project:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const selectProject = (projectId: string) => {
    // If already selected, do nothing
    if (selectedProject && selectedProject.id === projectId) return

    fetchProject(projectId)

    // Navigate to the project page if not already there
    if (!pathname.includes(`/projects/${projectId}`)) {
      router.push(`/dashboard/projects/${projectId}`)
    }
  }

  const clearSelectedProject = () => {
    setSelectedProject(null)
    router.push("/dashboard")
  }

  return (
    <ProjectContext.Provider
      value={{
        selectedProject,
        selectProject,
        clearSelectedProject,
        isLoading,
        error,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider")
  }
  return context
}

