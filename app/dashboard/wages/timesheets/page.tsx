import { Button } from "@/components/ui/button"
import { TimesheetsFilters } from "@/components/timesheets-filters"
import { TimesheetsTable } from "@/components/timesheets-table"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function TimesheetsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Timesheets</h1>
        <Link href="/dashboard/wages/timesheets/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Timesheet
          </Button>
        </Link>
      </div>
      <TimesheetsFilters />
      <TimesheetsTable />
    </div>
  )
}

