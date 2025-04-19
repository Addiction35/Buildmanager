"use client"

import { ProjectDetails } from "@/components/project-details"
import { ProjectTabs } from "@/components/project-tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, MoreHorizontal, Trash } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { DeleteProjectDialog } from "@/components/delete-project-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getItemById, simulateApiDelay } from "@/lib/dummy-data"

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const [project, setProject] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true)
      setIsError(false)

      try {
        await simulateApiDelay()
        const projectData = getItemById("projects", projectId)

        if (projectData) {
          setProject(projectData)
        } else {
          setIsError(true)
        }
      } catch (error) {
        console.error("Error fetching project:", error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProject()
  }, [projectId])

  // Handle edit project
  const handleEditProject = () => {
    router.push(`/dashboard/projects/${projectId}/edit`)
  }

  // Handle delete project
  const handleDeleteClick = () => {
    setShowDeleteDialog(true)
  }

  // Close delete dialog
  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/projects">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Loading Project...</h1>
          </div>
        </div>
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (isError || !project) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/projects">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Project Not Found</h1>
          </div>
        </div>
        <div className="p-6 border border-destructive/50 rounded-md bg-destructive/10 text-destructive">
          <h3 className="font-medium">Error loading project</h3>
          <p className="text-sm">The requested project could not be found or there was an error loading it.</p>
          <Button variant="outline" className="mt-4" onClick={() => router.push("/dashboard/projects")}>
            Return to Projects
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/projects">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleEditProject}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDeleteClick} className="text-destructive focus:text-destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <ProjectDetails project={project} />
      <ProjectTabs projectId={project.id} />

      {/* Delete Project Dialog */}
      {showDeleteDialog && <DeleteProjectDialog projectId={project.id} onClose={handleCloseDeleteDialog} />}
    </div>
  )
}

