import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PurchaseOrderForm } from "@/components/purchase-order-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewPurchaseOrderPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/purchase-orders">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create Purchase Order</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Purchase Order Details</CardTitle>
          <CardDescription>Create a new purchase order for materials or services</CardDescription>
        </CardHeader>
        <CardContent>
          <PurchaseOrderForm />
        </CardContent>
      </Card>
    </div>
  )
}

