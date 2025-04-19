"use client"

import { useQuery } from "@tanstack/react-query"
import { projectsApi } from "@/lib/api-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Eye } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface TeamMemberProjectsProps {
  memberId: string
}

export function TeamMemberProjects({ memberId }: TeamMemberProjectsProps) {
  // In a real app, you would filter projects by team member ID
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: projectsApi.getAll,
  })

  // Filter projects by team member ID (in a real app, this would be done on the server)
  // For now, just show the first 3 projects as a demo
  const memberProjects = projects?.slice(0, 3)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assigned Projects</CardTitle>
        <CardDescription>Projects assigned to this team member</CardDescription>
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
        ) : memberProjects && memberProjects.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Due Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {memberProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        project.status === "completed"
                          ? "success"
                          : project.status === "in-progress"
                            ? "default"
                            : "outline"
                      }
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(project.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/projects/${project.id}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View project</span>
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-muted-foreground">No projects assigned to this team member.</p>
        )}
      </CardContent>
    </Card>
  )
}

