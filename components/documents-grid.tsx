"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  FileText,
  FileImage,
  FileSpreadsheet,
  File,
  Folder,
  MoreHorizontal,
  Download,
  Eye,
  Trash,
  Edit,
  Link,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { getData, simulateApiDelay } from "@/lib/dummy-data"
import { Skeleton } from "@/components/ui/skeleton"

export function DocumentsGrid() {
  const router = useRouter()
  const [documents, setDocuments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true)
      try {
        await simulateApiDelay()
        setDocuments(getAllDocuments())
      } catch (error) {
        console.error("Error fetching documents:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  // Function to get all documents from various sources
  const getAllDocuments = () => {
    // Get all projects
    const projects = getData("projects")

    // Get all estimates, proposals, purchase orders
    const estimates = getData("estimates")
    const proposals = getData("proposals") || []
    const purchaseOrders = getData("purchaseOrders")

    // Create document objects for each type
    const estimateDocuments = estimates.map((est) => ({
      id: `DOC-EST-${est.id}`,
      name: est.name,
      type: "pdf",
      documentType: "Estimate",
      size: "2.4 MB",
      updatedAt: est.date,
      projectId: est.projectId,
      projectName: projects.find((p) => p.id === est.projectId)?.name || "Unknown Project",
      relatedId: est.id,
      viewPath: `/api/estimates/${est.id}/pdf`,
    }))

    const proposalDocuments = proposals.map((prop) => ({
      id: `DOC-PROP-${prop.id}`,
      name: prop.name,
      type: "pdf",
      documentType: "Proposal",
      size: "3.1 MB",
      updatedAt: prop.date,
      projectId: prop.projectId,
      projectName: projects.find((p) => p.id === prop.projectId)?.name || "Unknown Project",
      relatedId: prop.id,
      viewPath: `/api/proposals/${prop.id}/pdf`,
    }))

    const poDocuments = purchaseOrders.map((po) => ({
      id: `DOC-PO-${po.id}`,
      name: `Purchase Order - ${po.vendor}`,
      type: "pdf",
      documentType: "Purchase Order",
      size: "1.8 MB",
      updatedAt: po.createdAt,
      projectId: po.projectId,
      projectName: po.project,
      relatedId: po.id,
      viewPath: `/api/purchase-orders/${po.id}/pdf`,
    }))

    // Add some general project documents
    const projectDocuments = [
      {
        id: "DOC-001",
        name: "Project Plans",
        type: "folder",
        documentType: "Folder",
        items: 12,
        updatedAt: "2023-11-15",
        projectId: null,
        projectName: null,
      },
      {
        id: "DOC-002",
        name: "Contracts",
        type: "folder",
        documentType: "Folder",
        items: 8,
        updatedAt: "2023-11-10",
        projectId: null,
        projectName: null,
      },
      {
        id: "DOC-003",
        name: "Site Photos",
        type: "folder",
        documentType: "Folder",
        items: 24,
        updatedAt: "2023-11-12",
        projectId: null,
        projectName: null,
      },
      {
        id: "DOC-004",
        name: "Project_Alpha_Blueprint.pdf",
        type: "pdf",
        documentType: "Blueprint",
        size: "4.2 MB",
        updatedAt: "2023-11-14",
        projectId: "PRJ-001",
        projectName: "Riverside Apartments",
        viewPath: "/placeholder.svg?height=800&width=600",
      },
      {
        id: "DOC-005",
        name: "Construction_Schedule.xlsx",
        type: "spreadsheet",
        documentType: "Schedule",
        size: "1.8 MB",
        updatedAt: "2023-11-10",
        projectId: "PRJ-002",
        projectName: "Downtown Office Complex",
        viewPath: null,
      },
      {
        id: "DOC-006",
        name: "Site_Inspection_Report.docx",
        type: "document",
        documentType: "Report",
        size: "2.3 MB",
        updatedAt: "2023-11-13",
        projectId: "PRJ-001",
        projectName: "Riverside Apartments",
        viewPath: null,
      },
      {
        id: "DOC-007",
        name: "Aerial_View.jpg",
        type: "image",
        documentType: "Photo",
        size: "5.7 MB",
        updatedAt: "2023-11-08",
        projectId: "PRJ-003",
        projectName: "Sunset Heights Residential",
        viewPath: "/placeholder.svg?height=800&width=600",
      },
      {
        id: "DOC-008",
        name: "Material_Specifications.pdf",
        type: "pdf",
        documentType: "Specifications",
        size: "3.1 MB",
        updatedAt: "2023-11-12",
        projectId: "PRJ-004",
        projectName: "Greenfield Shopping Mall",
        viewPath: "/placeholder.svg?height=800&width=600",
      },
    ]

    // Combine all documents
    return [...projectDocuments, ...estimateDocuments, ...proposalDocuments, ...poDocuments]
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "folder":
        return <Folder className="h-8 w-8 text-blue-500" />
      case "pdf":
        return <FileText className="h-8 w-8 text-red-500" />
      case "document":
        return <FileText className="h-8 w-8 text-blue-500" />
      case "spreadsheet":
        return <FileSpreadsheet className="h-8 w-8 text-green-500" />
      case "image":
        return <FileImage className="h-8 w-8 text-purple-500" />
      default:
        return <File className="h-8 w-8 text-gray-500" />
    }
  }

  const handleViewDocument = (doc: any) => {
    if (doc.viewPath) {
      window.open(doc.viewPath, "_blank")
    } else if (doc.type === "folder") {
      // Handle folder navigation
      console.log("Navigate to folder:", doc.id)
    } else {
      // Handle other document types
      console.log("View document:", doc.id)
    }
  }

  const handleNavigateToProject = (projectId: string) => {
    if (projectId) {
      router.push(`/dashboard/projects/${projectId}`)
    }
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex flex-col items-center justify-center py-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="mt-2 h-4 w-3/4" />
                  <Skeleton className="mt-1 h-3 w-1/2" />
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between p-4 pt-0">
                <Skeleton className="h-3 w-1/3" />
                <div className="flex gap-1">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {documents.map((doc) => (
        <Card key={doc.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex flex-col items-center justify-center py-4">
              {getIcon(doc.type)}
              <h3 className="mt-2 text-sm font-medium text-center truncate w-full">{doc.name}</h3>
              <div className="mt-1 text-xs text-muted-foreground">
                {doc.type === "folder" ? <span>{doc.items} items</span> : <span>{doc.size}</span>}
              </div>
              {doc.documentType && (
                <Badge variant="outline" className="mt-2">
                  {doc.documentType}
                </Badge>
              )}
              {doc.projectName && (
                <div
                  className="mt-2 text-xs text-primary cursor-pointer hover:underline"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNavigateToProject(doc.projectId)
                  }}
                >
                  {doc.projectName}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between p-4 pt-0">
            <div className="text-xs text-muted-foreground">{doc.updatedAt}</div>
            <div className="flex gap-1">
              {doc.type !== "folder" && (
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleViewDocument(doc)}>
                  <Eye className="h-4 w-4" />
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => handleViewDocument(doc)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </DropdownMenuItem>
                  {doc.type !== "folder" && (
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                  )}
                  {doc.projectId && (
                    <DropdownMenuItem onClick={() => handleNavigateToProject(doc.projectId)}>
                      <Link className="mr-2 h-4 w-4" />
                      Go to Project
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

