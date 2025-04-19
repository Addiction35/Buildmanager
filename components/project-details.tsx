"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, DollarSign, Users, Clock, MapPin, FileText } from "lucide-react"
import { ProjectDocuments } from "@/components/project-documents"

interface ProjectDetailsProps {
  project: any
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
          <CardDescription>Key information about this project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Status</p>
                <Badge
                  variant={
                    project.status === "Completed"
                      ? "outline"
                      : project.status === "In Progress"
                        ? "default"
                        : project.status === "On Hold"
                          ? "secondary"
                          : "destructive"
                  }
                >
                  {project.status}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Completion</p>
                <div className="flex items-center gap-2">
                  <Progress value={project.completion} className="w-[80px]" />
                  <span className="text-sm text-muted-foreground">{project.completion}%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Client</p>
                <p className="text-sm text-muted-foreground">{project.client.name}</p>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-sm font-medium mb-2">Description</p>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Start Date</p>
                  <p className="text-sm text-muted-foreground">{formatDate(project.startDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Due Date</p>
                  <p className="text-sm text-muted-foreground">{formatDate(project.dueDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Budget</p>
                  <p className="text-sm text-muted-foreground">{formatCurrency(project.budget.total)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Team Size</p>
                  <p className="text-sm text-muted-foreground">{project.team.length} members</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Created</p>
                  <p className="text-sm text-muted-foreground">{formatDate(project.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Location</p>
                  <p className="text-sm text-muted-foreground truncate max-w-[200px]">{project.location}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Budget Overview</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Total Budget</p>
              <p className="text-2xl font-bold">{formatCurrency(project.budget.total)}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Spent</p>
                <p className="text-xl font-semibold text-destructive">{formatCurrency(project.budget.spent)}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Remaining</p>
                <p className="text-xl font-semibold text-primary">{formatCurrency(project.budget.remaining)}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Budget Utilization</span>
                <span>{Math.round((project.budget.spent / project.budget.total) * 100)}%</span>
              </div>
              <Progress value={(project.budget.spent / project.budget.total) * 100} />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Project Documents</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ProjectDocuments projectId={project.id} />
        </CardContent>
      </Card>
    </div>
  )
}

