"use client"

import { useQuery } from "@tanstack/react-query"
import { wagesApi } from "@/lib/api-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

interface TeamMemberTimesheetsProps {
  memberId: string
}

export function TeamMemberTimesheets({ memberId }: TeamMemberTimesheetsProps) {
  // In a real app, you would filter timesheets by team member ID
  const { data: wages, isLoading } = useQuery({
    queryKey: ["wages"],
    queryFn: () => wagesApi.getAll(),
    enabled: false, // Disabled for now since we're using dummy data
  })

  // Dummy timesheet data
  const dummyTimesheets = [
    {
      id: "1",
      date: "2023-03-15",
      project: "Office Building Renovation",
      hours: 8,
      description: "Electrical wiring installation",
    },
    {
      id: "2",
      date: "2023-03-16",
      project: "Office Building Renovation",
      hours: 7.5,
      description: "Lighting fixtures installation",
    },
    {
      id: "3",
      date: "2023-03-17",
      project: "Residential Complex",
      hours: 8,
      description: "Site inspection and planning",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Timesheets</CardTitle>
        <CardDescription>Recent time entries for this team member</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} className="h-12 w-full" />
              ))}
          </div>
        ) : dummyTimesheets.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyTimesheets.map((timesheet) => (
                <TableRow key={timesheet.id}>
                  <TableCell>{new Date(timesheet.date).toLocaleDateString()}</TableCell>
                  <TableCell>{timesheet.project}</TableCell>
                  <TableCell>{timesheet.hours}</TableCell>
                  <TableCell className="hidden md:table-cell">{timesheet.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-muted-foreground">No timesheet entries found for this team member.</p>
        )}
      </CardContent>
    </Card>
  )
}

