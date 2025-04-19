"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Copy, Download, Eye, MoreHorizontal, Pencil, Trash } from "lucide-react"
import { useState } from "react"

export function TimesheetsTable() {
  const [timesheets, setTimesheets] = useState([
    {
      id: "TS-1234",
      employee: {
        name: "John Smith",
        avatar: "/placeholder-user.jpg",
        initials: "JS",
      },
      project: "Riverside Apartments",
      week: "Sep 11-17, 2023",
      status: "Approved",
      hours: 42.5,
    },
    {
      id: "TS-1235",
      employee: {
        name: "Sarah Johnson",
        avatar: "/placeholder-user.jpg",
        initials: "SJ",
      },
      project: "Oakwood Office Complex",
      week: "Sep 11-17, 2023",
      status: "Pending",
      hours: 40,
    },
    {
      id: "TS-1236",
      employee: {
        name: "Michael Scott",
        avatar: "/placeholder-user.jpg",
        initials: "MS",
      },
      project: "Sunset Heights Condos",
      week: "Sep 11-17, 2023",
      status: "Approved",
      hours: 45,
    },
    {
      id: "TS-1237",
      employee: {
        name: "Jim Halpert",
        avatar: "/placeholder-user.jpg",
        initials: "JH",
      },
      project: "Greenfield Shopping Mall",
      week: "Sep 11-17, 2023",
      status: "Rejected",
      hours: 38,
    },
    {
      id: "TS-1238",
      employee: {
        name: "Pam Beesly",
        avatar: "/placeholder-user.jpg",
        initials: "PB",
      },
      project: "Lakeside Medical Center",
      week: "Sep 11-17, 2023",
      status: "Pending",
      hours: 40,
    },
  ])

  const handleDelete = (id: string) => {
    setTimesheets(timesheets.filter((timesheet) => timesheet.id !== id))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead className="hidden md:table-cell">Project</TableHead>
            <TableHead>Week</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Hours</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {timesheets.map((timesheet) => (
            <TableRow key={timesheet.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={timesheet.employee.avatar} alt={timesheet.employee.name} />
                    <AvatarFallback>{timesheet.employee.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{timesheet.employee.name}</div>
                    <div className="text-xs text-muted-foreground">{timesheet.id}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{timesheet.project}</TableCell>
              <TableCell>{timesheet.week}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    timesheet.status === "Approved"
                      ? "outline"
                      : timesheet.status === "Pending"
                        ? "default"
                        : "destructive"
                  }
                >
                  {timesheet.status}
                </Badge>
              </TableCell>
              <TableCell>{timesheet.hours}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => window.open(`/api/timesheets/${timesheet.id}/pdf`, "_blank")}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(timesheet.id)}>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

