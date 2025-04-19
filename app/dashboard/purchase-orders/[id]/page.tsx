import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Edit, Printer } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import { PurchaseOrderDetail } from "@/components/purchase-order-detail"

export default function PurchaseOrderPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/purchase-orders">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Purchase Order Details</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Link href={`/dashboard/purchase-orders/${params.id}/edit`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
        </div>
      </div>

      <Suspense
        fallback={<div className="h-96 flex items-center justify-center">Loading purchase order details...</div>}
      >
        <PurchaseOrderDetail id={params.id} />
      </Suspense>
    </div>
  )
}

