"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TasksTable } from "@/components/tasks-table"
import { ResourcesTable } from "@/components/resources-table"
import { ProjectTimeline } from "@/components/project-timeline"

interface ProjectTabsProps {
  id: string
}

export function ProjectTabs({ id }: ProjectTabsProps) {
  return (
    <Tabs defaultValue="tasks" className="space-y-4">
      <TabsList>
        <TabsTrigger value="tasks">Tasks</TabsTrigger>
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
        <TabsTrigger value="resources">Resources</TabsTrigger>
        <TabsTrigger value="issues">Issues</TabsTrigger>
      </TabsList>
      <TabsContent value="tasks">
        <Card>
          <CardHeader>
            <CardTitle>Project Tasks</CardTitle>
            <CardDescription>Manage and track tasks for this project</CardDescription>
          </CardHeader>
          <CardContent>
            <TasksTable projectId={id} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="timeline">
        <Card>
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
            <CardDescription>View the project schedule and milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <ProjectTimeline projectId={id} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="resources">
        <Card>
          <CardHeader>
            <CardTitle>Project Resources</CardTitle>
            <CardDescription>Manage resources assigned to this project</CardDescription>
          </CardHeader>
          <CardContent>
            <ResourcesTable />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="issues">
        <Card>
          <CardHeader>
            <CardTitle>Issues & Risks</CardTitle>
            <CardDescription>Track and manage project issues and risks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border p-8 text-center">
              <h3 className="text-lg font-medium">No issues reported</h3>
              <p className="text-sm text-muted-foreground mt-1">
                There are currently no issues or risks reported for this project.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

