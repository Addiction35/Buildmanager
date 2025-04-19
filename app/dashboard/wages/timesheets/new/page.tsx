import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TimesheetForm } from "@/components/timesheet-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewTimesheetPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/wages/timesheets">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create Timesheet</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Timesheet Details</CardTitle>
          <CardDescription>Record work hours for employees on projects</CardDescription>
        </CardHeader>
        <CardContent>
          <TimesheetForm />
        </CardContent>
      </Card>
    </div>
  )
}

