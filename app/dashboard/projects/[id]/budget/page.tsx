"use client"

import { useParams } from "next/navigation"
import { BudgetManagement } from "@/components/budget-management"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useProject } from "@/contexts/project-context"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectBudgetPage() {
  const params = useParams()
  const projectId = params.id as string
  const { selectedProject, isLoading } = useProject()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/projects/${projectId}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Budget Management</h1>
            {isLoading ? (
              <Skeleton className="h-5 w-48 mt-1" />
            ) : (
              <p className="text-muted-foreground">{selectedProject?.name || "Loading project..."}</p>
            )}
          </div>
        </div>
      </div>

      <BudgetManagement projectId={projectId} />
    </div>
  )
}

