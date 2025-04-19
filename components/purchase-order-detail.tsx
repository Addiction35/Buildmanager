"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { simulateApiDelay } from "@/lib/dummy-data"

interface PurchaseOrderDetailProps {
  id: string
}

export function PurchaseOrderDetail({ id }: PurchaseOrderDetailProps) {
  // Fetch purchase order details
  const {
    data: po,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["purchaseOrder", id],
    queryFn: async () => {
      await simulateApiDelay()
      // This would normally fetch from an API
      // For now, return dummy data
      return {
        id,
        number: id,
        vendor: "ABC Building Supplies",
        project: "Riverside Apartments",
        projectId: "PRJ-001",
        status: "Approved",
        amount: 12500,
        deliveryDate: "2023-12-15",
        createdAt: "2023-11-15",
        shippingAddress: "123 River Lane, Riverside, CA 92501",
        billingAddress: "123 River Lane, Riverside, CA 92501",
        paymentTerms: "Net 30",
        notes: "Please deliver to the north entrance of the construction site.",
        items: [
          { description: "Lumber - 2x4", quantity: 500, unit: "pieces", unitPrice: 8.5, total: 4250 },
          { description: "Concrete (Ready Mix)", quantity: 20, unit: "cubic yards", unitPrice: 125, total: 2500 },
          { description: "Rebar #4", quantity: 100, unit: "pieces", unitPrice: 15.75, total: 1575 },
        ],
        subtotal: 8325,
        tax: 707.63,
        total: 9032.63,
      }
    },
  })

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !po) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>Failed to load purchase order details</CardDescription>
        </CardHeader>
        <CardContent>
          <p>There was an error loading the purchase order details. Please try again later.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>Purchase Order {po.id}</CardTitle>
            <CardDescription>Created on {new Date(po.createdAt).toLocaleDateString()}</CardDescription>
          </div>
          <Badge
            variant={
              po.status === "Delivered"
                ? "outline"
                : po.status === "Approved"
                  ? "default"
                  : po.status === "Cancelled"
                    ? "destructive"
                    : "secondary"
            }
            className="ml-auto"
          >
            {po.status}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Vendor</h3>
              <p className="text-sm">{po.vendor}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Project</h3>
              <p className="text-sm">{po.project}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Delivery Date</h3>
              <p className="text-sm">{po.deliveryDate}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Payment Terms</h3>
              <p className="text-sm">{po.paymentTerms}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Addresses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Shipping Address</h3>
              <p className="text-sm whitespace-pre-line">{po.shippingAddress}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Billing Address</h3>
              <p className="text-sm whitespace-pre-line">{po.billingAddress}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Description</th>
                  <th className="text-right py-3 px-2">Quantity</th>
                  <th className="text-right py-3 px-2">Unit</th>
                  <th className="text-right py-3 px-2">Unit Price</th>
                  <th className="text-right py-3 px-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {po.items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-2">{item.description}</td>
                    <td className="text-right py-3 px-2">{item.quantity}</td>
                    <td className="text-right py-3 px-2">{item.unit}</td>
                    <td className="text-right py-3 px-2">${item.unitPrice.toFixed(2)}</td>
                    <td className="text-right py-3 px-2">${item.total.toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={4} className="text-right py-3 px-2 font-medium">
                    Subtotal
                  </td>
                  <td className="text-right py-3 px-2 font-medium">${po.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={4} className="text-right py-3 px-2 font-medium">
                    Tax (8.5%)
                  </td>
                  <td className="text-right py-3 px-2 font-medium">${po.tax.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={4} className="text-right py-3 px-2 font-medium">
                    Total
                  </td>
                  <td className="text-right py-3 px-2 font-medium">${po.total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {po.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-line">{po.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

