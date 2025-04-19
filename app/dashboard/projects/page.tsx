import { Button } from "@/components/ui/button"
import { ProjectsFilters } from "@/components/projects-filters"
import { ProjectsTable } from "@/components/projects-table"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <Link href="/dashboard/projects/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>
      <ProjectsFilters />
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading projects...</div>}>
        <ProjectsTable />
      </Suspense>
    </div>
  )
}

