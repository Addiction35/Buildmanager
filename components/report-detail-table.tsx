"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ReportDetailTableProps {
  reportId: string
}

export function ReportDetailTable({ reportId }: ReportDetailTableProps) {
  // Different dummy data based on report type
  const getTableData = () => {
    if (reportId === "REP-001") {
      // Project Progress data
      return [
        {
          name: "Riverside Apartments",
          manager: "John Smith",
          startDate: "2023-01-15",
          dueDate: "2023-09-30",
          status: "In Progress",
          completion: 65,
        },
        {
          name: "Oakwood Office Complex",
          manager: "Sarah Johnson",
          startDate: "2023-02-10",
          dueDate: "2023-11-15",
          status: "In Progress",
          completion: 80,
        },
        {
          name: "Sunset Heights Condos",
          manager: "Michael Scott",
          startDate: "2023-03-05",
          dueDate: "2023-10-20",
          status: "In Progress",
          completion: 45,
        },
        {
          name: "Greenfield Shopping Mall",
          manager: "Jim Halpert",
          startDate: "2023-01-20",
          dueDate: "2023-12-10",
          status: "In Progress",
          completion: 90,
        },
        {
          name: "Lakeside Medical Center",
          manager: "Pam Beesly",
          startDate: "2023-04-15",
          dueDate: "2024-02-28",
          status: "In Progress",
          completion: 30,
        },
      ]
    } else if (reportId === "REP-002") {
      // Budget Allocation data
      return [
        {
          category: "Labor",
          allocated: "$1,250,000",
          spent: "$875,000",
          remaining: "$375,000",
          projects: 12,
          utilization: 70,
        },
        {
          category: "Materials",
          allocated: "$950,000",
          spent: "$620,000",
          remaining: "$330,000",
          projects: 15,
          utilization: 65,
        },
        {
          category: "Equipment",
          allocated: "$450,000",
          spent: "$380,000",
          remaining: "$70,000",
          projects: 8,
          utilization: 84,
        },
        {
          category: "Subcontractors",
          allocated: "$850,000",
          spent: "$510,000",
          remaining: "$340,000",
          projects: 10,
          utilization: 60,
        },
        {
          category: "Overhead",
          allocated: "$350,000",
          spent: "$175,000",
          remaining: "$175,000",
          projects: 18,
          utilization: 50,
        },
      ]
    } else {
      // Default data
      return [
        {
          item: "Item 1",
          value1: "Value 1A",
          value2: "Value 1B",
          value3: "Value 1C",
          status: "Active",
          progress: 75,
        },
        {
          item: "Item 2",
          value1: "Value 2A",
          value2: "Value 2B",
          value3: "Value 2C",
          status: "Pending",
          progress: 45,
        },
        {
          item: "Item 3",
          value1: "Value 3A",
          value2: "Value 3B",
          value3: "Value 3C",
          status: "Completed",
          progress: 100,
        },
        {
          item: "Item 4",
          value1: "Value 4A",
          value2: "Value 4B",
          value3: "Value 4C",
          status: "Active",
          progress: 60,
        },
        {
          item: "Item 5",
          value1: "Value 5A",
          value2: "Value 5B",
          value3: "Value 5C",
          status: "On Hold",
          progress: 30,
        },
      ]
    }
  }

  const data = getTableData()

  // Render different table structures based on report type
  if (reportId === "REP-001") {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Project Manager</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Completion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: any, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.manager}</TableCell>
                <TableCell>{item.startDate}</TableCell>
                <TableCell>{item.dueDate}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={item.completion} className="h-2 w-20" />
                    <span className="text-xs">{item.completion}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  } else if (reportId === "REP-002") {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Budget Category</TableHead>
              <TableHead>Allocated</TableHead>
              <TableHead>Spent</TableHead>
              <TableHead>Remaining</TableHead>
              <TableHead>Projects</TableHead>
              <TableHead>Utilization</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: any, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.category}</TableCell>
                <TableCell>{item.allocated}</TableCell>
                <TableCell>{item.spent}</TableCell>
                <TableCell>{item.remaining}</TableCell>
                <TableCell>{item.projects}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={item.utilization} className="h-2 w-20" />
                    <span className="text-xs">{item.utilization}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  } else {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Value 1</TableHead>
              <TableHead>Value 2</TableHead>
              <TableHead>Value 3</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: any, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.item}</TableCell>
                <TableCell>{item.value1}</TableCell>
                <TableCell>{item.value2}</TableCell>
                <TableCell>{item.value3}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status === "Completed"
                        ? "outline"
                        : item.status === "Active"
                          ? "default"
                          : item.status === "On Hold"
                            ? "secondary"
                            : "default"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={item.progress} className="h-2 w-20" />
                    <span className="text-xs">{item.progress}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
}

