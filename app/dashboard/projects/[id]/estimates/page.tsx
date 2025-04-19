"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus, Upload } from "lucide-react"
import Link from "next/link"
import { useProject } from "@/contexts/project-context"
import { useQuery } from "@tanstack/react-query"
import { estimatesApi } from "@/lib/api-service"
import { EstimateHierarchy } from "@/components/estimate-hierarchy"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectEstimatesPage() {
  const params = useParams()
  const projectId = params.id as string
  const { selectedProject, isLoading: isProjectLoading } = useProject()

  // Fetch estimates for this project
  const { data: estimates, isLoading: isEstimatesLoading } = useQuery({
    queryKey: ["estimates", projectId],
    queryFn: () => estimatesApi.getAll(projectId),
    enabled: !!projectId,
  })

  const isLoading = isProjectLoading || isEstimatesLoading

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Estimates</h1>
          {isProjectLoading ? (
            <Skeleton className="h-5 w-48 mt-1" />
          ) : (
            <p className="text-muted-foreground">{selectedProject?.name || "Loading project..."}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Link href={`/dashboard/projects/${projectId}/estimates/new`}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Estimate
            </Button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        <EstimateHierarchy projectId={projectId} estimates={estimates || []} />
      )}
    </div>
  )
}

