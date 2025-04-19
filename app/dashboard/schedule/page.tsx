import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ScheduleView } from "@/components/schedule-view"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import Link from "next/link"

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
        <Link href="/dashboard/schedule/new-event">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Button>
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Calendar</h2>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Calendar mode="single" className="rounded-md border" />
        </div>
        <ScheduleView />
      </div>
    </div>
  )
}

