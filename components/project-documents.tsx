"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, FileImage, FileSpreadsheet, File, Eye, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getData, simulateApiDelay } from "@/lib/dummy-data"
import { Skeleton } from "@/components/ui/skeleton"

interface ProjectDocumentsProps {
  projectId: string
}

export function ProjectDocuments({ projectId }: ProjectDocumentsProps) {
  const [documents, setDocuments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true)
      try {
        await simulateApiDelay()

        // Get all documents from various sources
        const allDocuments = getAllDocuments()

        // Filter documents for this project
        const projectDocuments = allDocuments.filter((doc) => doc.projectId === projectId)
        setDocuments(projectDocuments)
      } catch (error) {
        console.error("Error fetching documents:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDocuments()
  }, [projectId])

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
        id: "DOC-004",
        name: "Project_Alpha_Blueprint.pdf",
        type: "pdf",
        documentType: "Blueprint",
        size: "4.2 MB",
        updatedAt: "2023-11-14",
        projectId: "PRJ-001",
        projectName: "Riverside Apartments",
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
      },
    ]

    // Combine all documents
    return [...projectDocuments, ...estimateDocuments, ...proposalDocuments, ...poDocuments]
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />
      case "document":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "spreadsheet":
        return <FileSpreadsheet className="h-5 w-5 text-green-500" />
      case "image":
        return <FileImage className="h-5 w-5 text-purple-500" />
      default:
        return <File className="h-5 w-5 text-gray-500" />
    }
  }

  const handleViewDocument = (doc: any) => {
    if (doc.viewPath) {
      window.open(doc.viewPath, "_blank")
    } else {
      // Handle other document types
      console.log("View document:", doc.id)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex items-center p-2 rounded-md border">
              <Skeleton className="h-5 w-5 mr-2" />
              <Skeleton className="h-4 w-full max-w-[200px]" />
              <div className="ml-auto flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          ))}
      </div>
    )
  }

  if (documents.length === 0) {
    return (
      <Card className="p-6 text-center">
        <h3 className="text-lg font-medium">No documents found</h3>
        <p className="text-sm text-muted-foreground mt-1">There are no documents associated with this project.</p>
        <Button className="mt-4" onClick={() => window.open("/dashboard/documents", "_self")}>
          Browse All Documents
        </Button>
      </Card>
    )
  }

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <div key={doc.id} className="flex items-center p-2 rounded-md border hover:bg-muted/50">
          {getIcon(doc.type)}
          <span className="ml-2 text-sm font-medium truncate max-w-[200px]">{doc.name}</span>
          <Badge variant="outline" className="ml-2">
            {doc.documentType}
          </Badge>
          <span className="ml-2 text-xs text-muted-foreground">{doc.updatedAt}</span>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleViewDocument(doc)}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <div className="pt-2">
        <Button variant="outline" className="w-full" onClick={() => window.open("/dashboard/documents", "_self")}>
          View All Documents
        </Button>
      </div>
    </div>
  )
}

