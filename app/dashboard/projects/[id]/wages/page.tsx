"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { WagesTable } from "@/components/wages-table"
import { WagesFilters } from "@/components/wages-filters"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useProject } from "@/contexts/project-context"
import { useQuery } from "@tanstack/react-query"
import { wagesApi } from "@/lib/api-service"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProjectWagesPage() {
  const params = useParams()
  const projectId = params.id as string
  const { selectedProject, isLoading: isProjectLoading } = useProject()

  // Fetch wages for this project
  const { data: wages, isLoading: isWagesLoading } = useQuery({
    queryKey: ["wages", projectId],
    queryFn: () => wagesApi.getAll(projectId),
    enabled: !!projectId,
  })

  const isLoading = isProjectLoading || isWagesLoading

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Wages</h1>
          {isProjectLoading ? (
            <Skeleton className="h-5 w-48 mt-1" />
          ) : (
            <p className="text-muted-foreground">{selectedProject?.name || "Loading project..."}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/projects/${projectId}/timesheets`}>
            <Button variant="outline">Timesheets</Button>
          </Link>
          <Link href={`/dashboard/projects/${projectId}/wages/new`}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Wage Entry
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Labor Costs</CardTitle>
          <CardDescription>Track and manage labor costs specific to this project</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Use this section to record wages for workers on this specific project. For company-wide payroll, please use
            the Payroll section in the main navigation.
          </p>
        </CardContent>
      </Card>

      <WagesFilters />
      <WagesTable projectId={projectId} wages={wages || []} isLoading={isLoading} />
    </div>
  )
}

