"use client"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Copy, Download, Eye, MoreHorizontal, Pencil, ShoppingCart, Trash } from "lucide-react"
import { simulateApiDelay } from "@/lib/dummy-data"

export function PurchaseOrdersTable() {
  const router = useRouter()

  // Fetch purchase orders from dummy data
  const {
    data: purchaseOrders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["purchaseOrders"],
    queryFn: async () => {
      await simulateApiDelay()
      // Create dummy purchase orders since they're not in the dummy data yet
      return [
        {
          id: "PO-1001",
          vendor: "ABC Building Supplies",
          project: "Riverside Apartments",
          projectId: "PRJ-001",
          status: "Approved",
          amount: 12500,
          deliveryDate: "2023-12-15",
          items: [
            { description: "Lumber - 2x4", quantity: 500, unit: "pieces", unitPrice: 8.5 },
            { description: "Concrete (Ready Mix)", quantity: 20, unit: "cubic yards", unitPrice: 125 },
            { description: "Rebar #4", quantity: 100, unit: "pieces", unitPrice: 15.75 },
          ],
        },
        {
          id: "PO-1002",
          vendor: "Metro Electrical Wholesale",
          project: "Downtown Office Complex",
          projectId: "PRJ-002",
          status: "Pending",
          amount: 8750,
          deliveryDate: "2023-12-20",
          items: [
            { description: "Electrical Wire (12/2)", quantity: 1000, unit: "feet", unitPrice: 0.85 },
            { description: "Circuit Breakers", quantity: 25, unit: "each", unitPrice: 45 },
            { description: "LED Light Fixtures", quantity: 50, unit: "each", unitPrice: 125 },
          ],
        },
        {
          id: "PO-1003",
          vendor: "Quality Plumbing Supply",
          project: "Sunset Heights Condos",
          projectId: "PRJ-003",
          status: "Delivered",
          amount: 6250,
          deliveryDate: "2023-11-30",
          items: [
            { description: "PVC Pipe (1 inch)", quantity: 500, unit: "feet", unitPrice: 2.25 },
            { description: "Copper Pipe (1/2 inch)", quantity: 300, unit: "feet", unitPrice: 3.5 },
            { description: "Bathroom Fixtures", quantity: 15, unit: "sets", unitPrice: 275 },
          ],
        },
        {
          id: "PO-1004",
          vendor: "Greenfield Construction Materials",
          project: "Greenfield Shopping Mall",
          projectId: "PRJ-004",
          status: "Cancelled",
          amount: 18500,
          deliveryDate: "2023-12-10",
          items: [
            { description: "Roofing Shingles", quantity: 100, unit: "bundles", unitPrice: 45 },
            { description: "Insulation (R-19)", quantity: 5000, unit: "sq ft", unitPrice: 1.25 },
            { description: "Drywall (4x8 sheet)", quantity: 200, unit: "sheets", unitPrice: 12.5 },
          ],
        },
        {
          id: "PO-1005",
          vendor: "Coastal Building Products",
          project: "Harbor View Hotel",
          projectId: "PRJ-005",
          status: "Pending",
          amount: 22750,
          deliveryDate: "2023-12-22",
          items: [
            { description: "Windows (Standard)", quantity: 75, unit: "each", unitPrice: 175 },
            { description: "Door (Exterior)", quantity: 25, unit: "each", unitPrice: 225 },
            { description: "Paint (Exterior)", quantity: 100, unit: "gallons", unitPrice: 35 },
          ],
        },
      ]
    },
    enabled: typeof window !== "undefined", // Only run on client side
  })

  const handleViewPurchaseOrder = (poId: string) => {
    router.push(`/dashboard/purchase-orders/${poId}`)
  }

  const handleEditPurchaseOrder = (poId: string) => {
    router.push(`/dashboard/purchase-orders/${poId}/edit`)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 border border-destructive/50 rounded-md bg-destructive/10 text-destructive">
        <h3 className="font-medium">Error loading purchase orders</h3>
        <p className="text-sm">There was an error loading the purchase orders. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Purchase Order</TableHead>
            <TableHead className="hidden md:table-cell">Project</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="hidden md:table-cell">Delivery Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchaseOrders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                No purchase orders found
              </TableCell>
            </TableRow>
          ) : (
            purchaseOrders.map((po) => (
              <TableRow
                key={po.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleViewPurchaseOrder(po.id)}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{po.id}</div>
                      <div className="text-xs text-muted-foreground">{po.vendor}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{po.project}</TableCell>
                <TableCell>
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
                  >
                    {po.status}
                  </Badge>
                </TableCell>
                <TableCell>${po.amount.toLocaleString()}</TableCell>
                <TableCell className="hidden md:table-cell">{po.deliveryDate}</TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => window.open(`/api/purchase-orders/${po.id}/pdf`, "_blank")}>
                        <Eye className="mr-2 h-4 w-4" />
                        View as PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditPurchaseOrder(po.id)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

