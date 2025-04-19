"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal } from "lucide-react"

export function ResourcesTable() {
  const resources = [
    {
      id: "RES-001",
      name: "John Smith",
      type: "Labor",
      role: "Project Manager",
      status: "Available",
      project: "Riverside Apartments",
      contact: "john.smith@example.com",
    },
    {
      id: "RES-002",
      name: "Sarah Johnson",
      type: "Labor",
      role: "Site Engineer",
      status: "Assigned",
      project: "Oakwood Office Complex",
      contact: "sarah.johnson@example.com",
    },
    {
      id: "RES-003",
      name: "Excavator XL-5000",
      type: "Equipment",
      role: "Heavy Machinery",
      status: "In Use",
      project: "Sunset Heights Condos",
      contact: "equipment@example.com",
    },
    {
      id: "RES-004",
      name: "Concrete Mixer C-2000",
      type: "Equipment",
      role: "Concrete Work",
      status: "Available",
      project: "-",
      contact: "equipment@example.com",
    },
    {
      id: "RES-005",
      name: "Premium Lumber",
      type: "Material",
      role: "Construction Material",
      status: "In Stock",
      project: "Multiple",
      contact: "inventory@example.com",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resources</CardTitle>
        <CardDescription>Manage your labor, equipment, and materials</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Resource</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resources.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    {resource.type === "Labor" ? (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-user.jpg" alt={resource.name} />
                        <AvatarFallback>
                          {resource.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ) : null}
                    <div>
                      {resource.name}
                      <div className="text-xs text-muted-foreground">{resource.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{resource.type}</TableCell>
                <TableCell>{resource.role}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      resource.status === "Available" || resource.status === "In Stock"
                        ? "outline"
                        : resource.status === "Assigned" || resource.status === "In Use"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {resource.status}
                  </Badge>
                </TableCell>
                <TableCell>{resource.project}</TableCell>
                <TableCell>{resource.contact}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

