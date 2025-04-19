import { Suspense } from "react"
import { ReportDetail } from "@/components/report-detail"
import { Button } from "@/components/ui/button"
import { ChevronLeft, FileText, FileSpreadsheet } from "lucide-react"
import Link from "next/link"

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/reports">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Report Details</h1>
        </div>
        <div className="flex gap-2">
          <Link href={`/api/reports/${params.id}/pdf`} target="_blank">
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </Link>
          <Link href={`/api/reports/${params.id}/excel`} target="_blank">
            <Button variant="outline">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export Excel
            </Button>
          </Link>
        </div>
      </div>
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading report...</div>}>
        <ReportDetail id={params.id} />
      </Suspense>
    </div>
  )
}

