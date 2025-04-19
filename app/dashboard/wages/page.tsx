import { Button } from "@/components/ui/button"
import { WagesFilters } from "@/components/wages-filters"
import { WagesTable } from "@/components/wages-table"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function WagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Wages & Payroll</h1>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/wages/timesheets">
            <Button variant="outline">Timesheets</Button>
          </Link>
          <Link href="/dashboard/wages/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Payroll Entry
            </Button>
          </Link>
        </div>
      </div>
      <WagesFilters />
      <WagesTable />
    </div>
  )
}

