"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectForm } from "@/components/project-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useProject } from "@/hooks/use-projects"
import { useParams } from "next/navigation"

export default function EditProjectPage() {
  const params = useParams()
  const projectId = params.id as string
  const { project, isLoading, isError } = useProject(projectId)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/projects/${projectId}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>Update the details for your construction project</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : isError ? (
            <div className="p-4 border border-destructive/50 rounded-md bg-destructive/10 text-destructive">
              <h3 className="font-medium">Error loading project</h3>
              <p className="text-sm">Failed to load project details. Please try again.</p>
            </div>
          ) : project ? (
            <ProjectForm project={project} mode="edit" />
          ) : (
            <div className="p-4 border border-muted rounded-md bg-muted/10">
              <h3 className="font-medium">Project not found</h3>
              <p className="text-sm">The requested project could not be found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

