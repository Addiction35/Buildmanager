"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal } from "lucide-react"

interface TasksTableProps {
  projectId?: string
}

export function TasksTable({ projectId }: TasksTableProps) {
  const tasks = [
    {
      id: "TASK-8782",
      title: "Site preparation",
      status: "In Progress",
      priority: "High",
      dueDate: "2023-09-15",
      assignee: {
        name: "Michael Scott",
        avatar: "/placeholder-user.jpg",
        initials: "MS",
      },
    },
    {
      id: "TASK-7878",
      title: "Foundation work",
      status: "Pending",
      priority: "Medium",
      dueDate: "2023-09-22",
      assignee: {
        name: "Jim Halpert",
        avatar: "/placeholder-user.jpg",
        initials: "JH",
      },
    },
    {
      id: "TASK-7839",
      title: "Electrical wiring planning",
      status: "Completed",
      priority: "Low",
      dueDate: "2023-09-10",
      assignee: {
        name: "Pam Beesly",
        avatar: "/placeholder-user.jpg",
        initials: "PB",
      },
    },
    {
      id: "TASK-7828",
      title: "Plumbing layout",
      status: "In Progress",
      priority: "High",
      dueDate: "2023-09-18",
      assignee: {
        name: "Dwight Schrute",
        avatar: "/placeholder-user.jpg",
        initials: "DS",
      },
    },
    {
      id: "TASK-7820",
      title: "Material procurement",
      status: "Pending",
      priority: "Medium",
      dueDate: "2023-09-25",
      assignee: {
        name: "Angela Martin",
        avatar: "/placeholder-user.jpg",
        initials: "AM",
      },
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Task</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Assignee</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="font-medium">
              <div>
                {task.title}
                <div className="text-xs text-muted-foreground">{task.id}</div>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  task.status === "Completed" ? "outline" : task.status === "In Progress" ? "default" : "secondary"
                }
              >
                {task.status}
              </Badge>
            </TableCell>
            <TableCell>
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
            </TableCell>
            <TableCell>{task.dueDate}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                  <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{task.assignee.name}</span>
              </div>
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

