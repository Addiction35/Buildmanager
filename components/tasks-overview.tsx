import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface TasksOverviewProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TasksOverview({ className, ...props }: TasksOverviewProps) {
  const tasks = [
    {
      id: "TASK-8782",
      title: "Site preparation for Project Alpha",
      status: "In Progress",
      assignee: {
        name: "Michael Scott",
        avatar: "/placeholder-user.jpg",
        initials: "MS",
      },
      priority: "High",
    },
    {
      id: "TASK-7878",
      title: "Material delivery for Project Beta",
      status: "Pending",
      assignee: {
        name: "Jim Halpert",
        avatar: "/placeholder-user.jpg",
        initials: "JH",
      },
      priority: "Medium",
    },
    {
      id: "TASK-7839",
      title: "Foundation inspection for Project Gamma",
      status: "Completed",
      assignee: {
        name: "Pam Beesly",
        avatar: "/placeholder-user.jpg",
        initials: "PB",
      },
      priority: "Low",
    },
    {
      id: "TASK-7828",
      title: "Electrical wiring for Project Delta",
      status: "In Progress",
      assignee: {
        name: "Dwight Schrute",
        avatar: "/placeholder-user.jpg",
        initials: "DS",
      },
      priority: "High",
    },
    {
      id: "TASK-7820",
      title: "Plumbing installation for Project Epsilon",
      status: "Pending",
      assignee: {
        name: "Angela Martin",
        avatar: "/placeholder-user.jpg",
        initials: "AM",
      },
      priority: "Medium",
    },
  ]

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
        <CardDescription>Overview of tasks across all projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                  <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{task.title}</p>
                  <p className="text-sm text-muted-foreground">{task.id}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    task.status === "Completed" ? "outline" : task.status === "In Progress" ? "default" : "secondary"
                  }
                >
                  {task.status}
                </Badge>
                <Badge
                  variant="outline"
                  className={
                    task.priority === "High"
                      ? "border-red-500 text-red-500"
                      : task.priority === "Medium"
                        ? "border-yellow-500 text-yellow-500"
                        : "border-green-500 text-green-500"
                  }
                >
                  {task.priority}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

