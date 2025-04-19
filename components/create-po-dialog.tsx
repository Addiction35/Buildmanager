"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { usePurchaseOrders } from "@/hooks/use-purchase-orders"

// Define types for our estimate hierarchy
type SubSection = {
  id: string
  code: string
  description: string
  quantity: number
  unit: string
  rate: number
  total: number
  selected?: boolean
}

type Section = {
  id: string
  code: string
  description: string
  subsections: SubSection[]
  expanded: boolean
  total: number
}

type EstimateGroup = {
  id: string
  code: string
  description: string
  sections: Section[]
  expanded: boolean
  total: number
}

type Estimate = {
  id: string
  name: string
  client: string
  date: string
  status: string
  groups: EstimateGroup[]
  expanded: boolean
  total: number
}

interface CreatePODialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  estimate: Estimate | null
}

export function CreatePODialog({ open, onOpenChange, estimate }: CreatePODialogProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { createPurchaseOrder, isCreating } = usePurchaseOrders()

  const [vendor, setVendor] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [selectedItems, setSelectedItems] = useState<SubSection[]>([])

  // Flatten all subsections for selection
  const allSubsections =
    estimate?.groups.flatMap((group) =>
      group.sections.flatMap((section) =>
        section.subsections.map((subsection) => ({
          ...subsection,
          selected: false,
        })),
      ),
    ) || []

  // Toggle selection of an item
  const toggleItemSelection = (id: string) => {
    setSelectedItems((prev) => {
      const isSelected = prev.some((item) => item.id === id)

      if (isSelected) {
        return prev.filter((item) => item.id !== id)
      } else {
        const item = allSubsections.find((item) => item.id === id)
        if (item) {
          return [...prev, item]
        }
        return prev
      }
    })
  }

  // Calculate total for selected items
  const calculateTotal = () => {
    return selectedItems.reduce((sum, item) => sum + item.total, 0)
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (!estimate) return

    if (!vendor) {
      toast({
        title: "Vendor required",
        description: "Please select a vendor for this purchase order",
        variant: "destructive",
      })
      return
    }

    if (selectedItems.length === 0) {
      toast({
        title: "No items selected",
        description: "Please select at least one item for the purchase order",
        variant: "destructive",
      })
      return
    }

    try {
      // Create the purchase order
      await createPurchaseOrder({
        vendor,
        project: estimate.client,
        deliveryDate: deliveryDate || new Date().toISOString().split("T")[0],
        items: selectedItems.map((item) => ({
          description: item.description,
          quantity: item.quantity,
          unit: item.unit,
          unitPrice: item.rate,
        })),
        estimateId: estimate.id,
      })

      toast({
        title: "Purchase order created",
        description: "The purchase order has been created successfully",
      })

      // Close the dialog and redirect to purchase orders
      onOpenChange(false)
      router.push("/dashboard/purchase-orders")
    } catch (error) {
      toast({
        title: "Error creating purchase order",
        description: "There was an error creating the purchase order. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!estimate) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Purchase Order from Estimate</DialogTitle>
          <DialogDescription>Select items from the estimate to include in the purchase order</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="vendor">Vendor</Label>
              <Select onValueChange={setVendor}>
                <SelectTrigger id="vendor">
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ABC Building Supplies">ABC Building Supplies</SelectItem>
                  <SelectItem value="XYZ Electrical Wholesale">XYZ Electrical Wholesale</SelectItem>
                  <SelectItem value="Plumbing Plus">Plumbing Plus</SelectItem>
                  <SelectItem value="HVAC Systems Inc.">HVAC Systems Inc.</SelectItem>
                  <SelectItem value="Interior Designs Co.">Interior Designs Co.</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="delivery-date">Delivery Date</Label>
              <Input
                id="delivery-date"
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Select Items</Label>
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-2 w-12"></th>
                    <th className="px-4 py-2 text-left w-16">Code</th>
                    <th className="px-4 py-2 text-left">Description</th>
                    <th className="px-4 py-2 text-right">Quantity</th>
                    <th className="px-4 py-2 text-left">Unit</th>
                    <th className="px-4 py-2 text-right">Rate</th>
                    <th className="px-4 py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {allSubsections.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50">
                      <td className="px-4 py-2 text-center">
                        <Checkbox
                          checked={selectedItems.some((selected) => selected.id === item.id)}
                          onCheckedChange={() => toggleItemSelection(item.id)}
                        />
                      </td>
                      <td className="px-4 py-2 text-left">{item.code}</td>
                      <td className="px-4 py-2 text-left">{item.description}</td>
                      <td className="px-4 py-2 text-right">{item.quantity}</td>
                      <td className="px-4 py-2 text-left">{item.unit}</td>
                      <td className="px-4 py-2 text-right">${item.rate.toLocaleString()}</td>
                      <td className="px-4 py-2 text-right">${item.total.toLocaleString()}</td>
                    </tr>
                  ))}
                  {allSubsections.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-4 text-center text-muted-foreground">
                        No items available in this estimate
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="bg-muted/50">
                    <td colSpan={6} className="px-4 py-2 text-right font-medium">
                      Selected Items Total:
                    </td>
                    <td className="px-4 py-2 text-right font-medium">${calculateTotal().toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Input id="notes" placeholder="Additional notes for this purchase order" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isCreating}>
            {isCreating ? "Creating..." : "Create Purchase Order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

