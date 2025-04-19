import { Button } from "@/components/ui/button"
import { ResourcesFilters } from "@/components/resources-filters"
import { ResourcesTable } from "@/components/resources-table"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
        <Link href="/dashboard/resources/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Resource
          </Button>
        </Link>
      </div>
      <ResourcesFilters />
      <ResourcesTable />
    </div>
  )
}

