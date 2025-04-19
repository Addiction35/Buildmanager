import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EstimateDetailView } from "@/components/estimate-detail-view"
import { ArrowLeft, Download, Edit, FileSpreadsheet, Send } from "lucide-react"
import Link from "next/link"

export default function EstimateDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/estimates">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Estimate {params.id}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            PDF
          </Button>
          <Button variant="outline">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Excel
          </Button>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button>
            <Send className="mr-2 h-4 w-4" />
            Send to Client
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Estimate Details</CardTitle>
          <CardDescription>View and manage the complete estimate</CardDescription>
        </CardHeader>
        <CardContent>
          <EstimateDetailView id={params.id} />
        </CardContent>
      </Card>
    </div>
  )
}

