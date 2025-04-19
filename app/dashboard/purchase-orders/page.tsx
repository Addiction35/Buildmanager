import { Button } from "@/components/ui/button"
import { PurchaseOrdersFilters } from "@/components/purchase-orders-filters"
import { PurchaseOrdersTable } from "@/components/purchase-orders-table"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

export default function PurchaseOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Purchase Orders</h1>
        <Link href="/dashboard/purchase-orders/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Purchase Order
          </Button>
        </Link>
      </div>
      <PurchaseOrdersFilters />
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading purchase orders...</div>}>
        <PurchaseOrdersTable />
      </Suspense>
    </div>
  )
}

