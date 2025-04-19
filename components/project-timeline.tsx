"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectTimelineProps {
  projectId: string
}

export function ProjectTimeline({ projectId }: ProjectTimelineProps) {
  const milestones = [
    {
      id: "MS-001",
      title: "Project Kickoff",
      date: "2023-05-15",
      status: "Completed",
      description: "Initial project meeting and team assignment",
    },
    {
      id: "MS-002",
      title: "Site Preparation",
      date: "2023-06-01",
      status: "Completed",
      description: "Clearing the site and preparing for foundation work",
    },
    {
      id: "MS-003",
      title: "Foundation Completion",
      date: "2023-07-15",
      status: "Completed",
      description: "Completion of all foundation work",
    },
    {
      id: "MS-004",
      title: "Structural Framework",
      date: "2023-09-01",
      status: "In Progress",
      description: "Construction of the main structural framework",
    },
    {
      id: "MS-005",
      title: "Electrical & Plumbing",
      date: "2023-10-15",
      status: "Pending",
      description: "Installation of electrical wiring and plumbing systems",
    },
    {
      id: "MS-006",
      title: "Interior Work",
      date: "2023-11-15",
      status: "Pending",
      description: "Interior finishing work including walls, floors, and fixtures",
    },
    {
      id: "MS-007",
      title: "Final Inspection",
      date: "2023-12-01",
      status: "Pending",
      description: "Final inspection and quality assurance checks",
    },
    {
      id: "MS-008",
      title: "Project Handover",
      date: "2023-12-15",
      status: "Pending",
      description: "Final handover to the client",
    },
  ]

  return (
    <div className="relative space-y-4 p-4 before:absolute before:inset-y-0 before:left-[19px] before:border-l before:border-border">
      {milestones.map((milestone, index) => (
        <div key={milestone.id} className="relative grid grid-cols-[40px_1fr] gap-4">
          <div
            className={`absolute left-0 top-1 h-10 w-10 rounded-full border ${
              milestone.status === "Completed"
                ? "bg-primary border-primary"
                : milestone.status === "In Progress"
                  ? "bg-background border-primary"
                  : "bg-background border-muted-foreground"
            }`}
          >
            <span className="flex h-full w-full items-center justify-center text-xs font-bold">{index + 1}</span>
          </div>
          <div className="col-start-2">
            <Card>
              <CardContent className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium">{milestone.title}</h3>
                  <Badge
                    variant={
                      milestone.status === "Completed"
                        ? "outline"
                        : milestone.status === "In Progress"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {milestone.status}
                  </Badge>
                </div>
                <div className="mb-2 text-sm text-muted-foreground">{milestone.date}</div>
                <p className="text-sm">{milestone.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </div>
  )
}

