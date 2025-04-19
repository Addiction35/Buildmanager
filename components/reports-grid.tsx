"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Eye,
  FileText,
  FileSpreadsheet,
  BarChart,
  PieChart,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
} from "lucide-react"
import Link from "next/link"

// Dummy reports data inspired by Zoho Books and Buildern
const dummyReports = [
  {
    id: "REP-001",
    title: "Project Financial Summary",
    description: "Overview of financial performance across all projects",
    category: "Financial",
    status: "Published",
    updatedAt: "2023-09-15",
    icon: "bar-chart",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "REP-002",
    title: "Budget vs. Actual",
    description: "Comparison of budgeted costs against actual expenditures",
    category: "Financial",
    status: "Published",
    updatedAt: "2023-09-12",
    icon: "pie-chart",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "REP-003",
    title: "Resource Utilization",
    description: "Analysis of resource allocation and efficiency",
    category: "Operations",
    status: "Published",
    updatedAt: "2023-09-10",
    icon: "users",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "REP-004",
    title: "Cash Flow Forecast",
    description: "Projected cash flow based on current projects and expenses",
    category: "Financial",
    status: "Draft",
    updatedAt: "2023-09-08",
    icon: "trending-up",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "REP-005",
    title: "Project Timeline Analysis",
    description: "Evaluation of project schedules and milestone achievements",
    category: "Operations",
    status: "Published",
    updatedAt: "2023-09-05",
    icon: "calendar",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "REP-006",
    title: "Profit & Loss Statement",
    description: "Comprehensive P&L report for all construction activities",
    category: "Financial",
    status: "Published",
    updatedAt: "2023-09-01",
    icon: "dollar-sign",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
]

export function ReportsGrid() {
  const [isExporting, setIsExporting] = useState<Record<string, boolean>>({})

  // Fetch reports with dummy data fallback
  const { data: reports = dummyReports, isLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: () => Promise.resolve(dummyReports),
    enabled: typeof window !== "undefined", // Only run on client side
  })

  const handleExportPDF = async (reportId: string) => {
    setIsExporting({ ...isExporting, [reportId]: true })
    try {
      // Simulate PDF export
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(`Exporting report ${reportId} as PDF`)

      // In a real app, this would be an API call
      const a = document.createElement("a")
      a.href = "#"
      a.download = `report-${reportId}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error exporting PDF:", error)
    } finally {
      setIsExporting({ ...isExporting, [reportId]: false })
    }
  }

  const handleExportExcel = async (reportId: string) => {
    setIsExporting({ ...isExporting, [reportId]: true })
    try {
      // Simulate Excel export
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(`Exporting report ${reportId} as Excel`)

      // In a real app, this would be an API call
      const a = document.createElement("a")
      a.href = "#"
      a.download = `report-${reportId}.xlsx`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error exporting Excel:", error)
    } finally {
      setIsExporting({ ...isExporting, [reportId]: false })
    }
  }

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "bar-chart":
        return <BarChart className="h-10 w-10 text-primary" />
      case "pie-chart":
        return <PieChart className="h-10 w-10 text-primary" />
      case "trending-up":
        return <TrendingUp className="h-10 w-10 text-primary" />
      case "dollar-sign":
        return <DollarSign className="h-10 w-10 text-primary" />
      case "users":
        return <Users className="h-10 w-10 text-primary" />
      case "calendar":
        return <Calendar className="h-10 w-10 text-primary" />
      default:
        return <FileText className="h-10 w-10 text-primary" />
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
            </CardHeader>
            <CardContent>
              <div className="h-24 bg-muted rounded w-full"></div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="h-8 bg-muted rounded w-20"></div>
              <div className="h-8 bg-muted rounded w-20"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reports.map((report) => (
        <Card key={report.id} className="dashboard-card overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{report.title}</CardTitle>
              <Badge variant={report.status === "Published" ? "default" : "secondary"}>{report.status}</Badge>
            </div>
            <CardDescription>{report.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6 bg-muted/30 rounded-md">
              {getIcon(report.icon)}
              <p className="mt-2 text-sm font-medium">{report.category} Report</p>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Last updated: {new Date(report.updatedAt).toLocaleDateString()}</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between bg-muted/20 border-t">
            <Link href={`/dashboard/reports/${report.id}`}>
              <Button variant="ghost" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                View
              </Button>
            </Link>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleExportPDF(report.id)}
                disabled={isExporting[report.id]}
              >
                <FileText className="mr-2 h-4 w-4" />
                PDF
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleExportExcel(report.id)}
                disabled={isExporting[report.id]}
              >
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Excel
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

