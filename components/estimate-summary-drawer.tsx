"use client"

import React from "react"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Printer, Share2 } from "lucide-react"

// Define types for our estimate hierarchy
type SubSection = {
  id: string
  code: string
  description: string
  quantity: number
  unit: string
  rate: number
  total: number
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

interface EstimateSummaryDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  estimate: Estimate | null
}

export function EstimateSummaryDrawer({ open, onOpenChange, estimate }: EstimateSummaryDrawerProps) {
  if (!estimate) return null

  // Calculate subtotals
  const subtotal = estimate.total
  const tax = subtotal * 0.085 // 8.5% tax
  const grandTotal = subtotal + tax

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Estimate Summary</SheetTitle>
          <SheetDescription>Complete breakdown of estimate costs</SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          {/* Estimate Header */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold">{estimate.name}</h2>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <div>Client: {estimate.client}</div>
                <div>Date: {estimate.date}</div>
                <div>Estimate #: {estimate.id}</div>
              </div>
              <Badge
                variant={
                  estimate.status === "Approved" ? "outline" : estimate.status === "Sent" ? "default" : "secondary"
                }
              >
                {estimate.status}
              </Badge>
            </div>
          </div>

          {/* Summary Table */}
          <div className="border rounded-md">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2 text-left">Code</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                  <th className="px-4 py-2 text-right">%</th>
                </tr>
              </thead>
              <tbody>
                {estimate.groups.map((group) => (
                  <tr key={group.id} className="border-b font-medium">
                    <td className="px-4 py-2 text-left">{group.code}</td>
                    <td className="px-4 py-2 text-left">{group.description}</td>
                    <td className="px-4 py-2 text-right">${group.total.toLocaleString()}</td>
                    <td className="px-4 py-2 text-right">{((group.total / estimate.total) * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-b bg-muted/50">
                  <td colSpan={2} className="px-4 py-2 text-right font-medium">
                    Subtotal:
                  </td>
                  <td className="px-4 py-2 text-right font-medium">${subtotal.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">100%</td>
                </tr>
                <tr className="border-b">
                  <td colSpan={2} className="px-4 py-2 text-right">
                    Tax (8.5%):
                  </td>
                  <td className="px-4 py-2 text-right">${tax.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right"></td>
                </tr>
                <tr className="bg-muted/50">
                  <td colSpan={2} className="px-4 py-2 text-right font-bold">
                    Grand Total:
                  </td>
                  <td className="px-4 py-2 text-right font-bold">${grandTotal.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Detailed Breakdown */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Detailed Breakdown</h3>

            {estimate.groups.map((group) => (
              <div key={group.id} className="space-y-3">
                <h4 className="font-medium">
                  {group.code} {group.description}
                </h4>

                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="px-3 py-1.5 text-left text-xs">Code</th>
                        <th className="px-3 py-1.5 text-left text-xs">Description</th>
                        <th className="px-3 py-1.5 text-right text-xs">Quantity</th>
                        <th className="px-3 py-1.5 text-left text-xs">Unit</th>
                        <th className="px-3 py-1.5 text-right text-xs">Rate</th>
                        <th className="px-3 py-1.5 text-right text-xs">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.sections.map((section) => (
                        <React.Fragment key={section.id}>
                          <tr className="border-b bg-muted/30">
                            <td className="px-3 py-1.5 text-left text-xs font-medium">{section.code}</td>
                            <td className="px-3 py-1.5 text-left text-xs font-medium" colSpan={4}>
                              {section.description}
                            </td>
                            <td className="px-3 py-1.5 text-right text-xs font-medium">
                              ${section.total.toLocaleString()}
                            </td>
                          </tr>
                          {section.subsections.map((subsection) => (
                            <tr key={subsection.id} className="border-b text-xs">
                              <td className="px-3 py-1.5 text-left">{subsection.code}</td>
                              <td className="px-3 py-1.5 text-left">{subsection.description}</td>
                              <td className="px-3 py-1.5 text-right">{subsection.quantity}</td>
                              <td className="px-3 py-1.5 text-left">{subsection.unit}</td>
                              <td className="px-3 py-1.5 text-right">${subsection.rate.toLocaleString()}</td>
                              <td className="px-3 py-1.5 text-right">${subsection.total.toLocaleString()}</td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-muted/30">
                        <td colSpan={5} className="px-3 py-1.5 text-right text-xs font-medium">
                          Group Total:
                        </td>
                        <td className="px-3 py-1.5 text-right text-xs font-medium">${group.total.toLocaleString()}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Notes</h3>
            <div className="border rounded-md p-3 text-sm text-muted-foreground">
              <p>
                This estimate is valid for 30 days from the date of issue. Any changes to the scope of work may result
                in price adjustments.
              </p>
              <p>Payment terms: 50% deposit upon acceptance, 50% upon completion.</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

