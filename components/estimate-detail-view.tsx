"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, ChevronRight, Plus, Trash, Edit, Eye, Download, FileSpreadsheet } from "lucide-react"
import { EstimateSummaryDrawer } from "@/components/estimate-summary-drawer"
import { useEstimateExports } from "@/hooks/use-estimate-exports"

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

interface EstimateDetailViewProps {
  id: string
}

export function EstimateDetailView({ id }: EstimateDetailViewProps) {
  // State for the summary drawer
  const [summaryOpen, setSummaryOpen] = useState(false)
  const { exportToPdf, exportToExcel } = useEstimateExports()

  // Sample data for the estimate
  const [estimate, setEstimate] = useState<Estimate>({
    id: "EST-1234",
    name: "Riverside Apartments - Foundation",
    client: "Riverside Development Corp",
    date: "2023-09-15",
    status: "Draft",
    expanded: true,
    total: 245000,
    groups: [
      {
        id: "GRP-A",
        code: "A.0",
        description: "Site Preparation",
        expanded: true,
        total: 63750,
        sections: [
          {
            id: "SEC-A1",
            code: "A.1",
            description: "Excavation",
            expanded: true,
            total: 45000,
            subsections: [
              {
                id: "SUB-A11",
                code: "A.1.1",
                description: "Topsoil removal",
                quantity: 1,
                unit: "Job",
                rate: 15000,
                total: 15000,
              },
              {
                id: "SUB-A12",
                code: "A.1.2",
                description: "Basement excavation",
                quantity: 1,
                unit: "Job",
                rate: 30000,
                total: 30000,
              },
            ],
          },
          {
            id: "SEC-A2",
            code: "A.2",
            description: "Grading",
            expanded: true,
            total: 18750,
            subsections: [
              {
                id: "SUB-A21",
                code: "A.2.1",
                description: "Rough grading",
                quantity: 1,
                unit: "Job",
                rate: 8750,
                total: 8750,
              },
              {
                id: "SUB-A22",
                code: "A.2.2",
                description: "Final grading",
                quantity: 1,
                unit: "Job",
                rate: 10000,
                total: 10000,
              },
            ],
          },
        ],
      },
      {
        id: "GRP-B",
        code: "B.0",
        description: "Foundation",
        expanded: true,
        total: 181250,
        sections: [
          {
            id: "SEC-B1",
            code: "B.1",
            description: "Footings",
            expanded: true,
            total: 42000,
            subsections: [
              {
                id: "SUB-B11",
                code: "B.1.1",
                description: "Concrete footings",
                quantity: 120,
                unit: "Cu. Yd.",
                rate: 350,
                total: 42000,
              },
            ],
          },
          {
            id: "SEC-B2",
            code: "B.2",
            description: "Foundation Walls",
            expanded: true,
            total: 56250,
            subsections: [
              {
                id: "SUB-B21",
                code: "B.2.1",
                description: "Concrete foundation walls",
                quantity: 450,
                unit: "Sq. Ft.",
                rate: 125,
                total: 56250,
              },
            ],
          },
          {
            id: "SEC-B3",
            code: "B.3",
            description: "Waterproofing",
            expanded: true,
            total: 15750,
            subsections: [
              {
                id: "SUB-B31",
                code: "B.3.1",
                description: "Foundation waterproofing",
                quantity: 450,
                unit: "Sq. Ft.",
                rate: 35,
                total: 15750,
              },
            ],
          },
          {
            id: "SEC-B4",
            code: "B.4",
            description: "Drainage",
            expanded: true,
            total: 28500,
            subsections: [
              {
                id: "SUB-B41",
                code: "B.4.1",
                description: "Drainage system installation",
                quantity: 1,
                unit: "Job",
                rate: 28500,
                total: 28500,
              },
            ],
          },
          {
            id: "SEC-B5",
            code: "B.5",
            description: "Backfill",
            expanded: true,
            total: 38750,
            subsections: [
              {
                id: "SUB-B51",
                code: "B.5.1",
                description: "Backfill and compaction",
                quantity: 1,
                unit: "Job",
                rate: 18750,
                total: 18750,
              },
              {
                id: "SUB-B52",
                code: "B.5.2",
                description: "Structural steel",
                quantity: 25,
                unit: "Tons",
                rate: 800,
                total: 20000,
              },
            ],
          },
        ],
      },
    ],
  })

  // Toggle expansion of a group
  const toggleGroup = (groupId: string) => {
    setEstimate({
      ...estimate,
      groups: estimate.groups.map((group) => (group.id === groupId ? { ...group, expanded: !group.expanded } : group)),
    })
  }

  // Toggle expansion of a section
  const toggleSection = (groupId: string, sectionId: string) => {
    setEstimate({
      ...estimate,
      groups: estimate.groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              sections: group.sections.map((section) =>
                section.id === sectionId ? { ...section, expanded: !section.expanded } : section,
              ),
            }
          : group,
      ),
    })
  }

  // Calculate subtotals
  const subtotal = estimate.total
  const tax = subtotal * 0.085 // 8.5% tax
  const grandTotal = subtotal + tax

  // Handle PDF export
  const handleExportPdf = () => {
    exportToPdf(estimate.id)
  }

  // Handle Excel export
  const handleExportExcel = () => {
    exportToExcel(estimate.id)
  }

  return (
    <div className="space-y-6">
      {/* Estimate Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg">
        <div>
          <h2 className="text-xl font-bold">{estimate.name}</h2>
          <div className="text-sm text-muted-foreground mt-1">
            <div>Client: {estimate.client}</div>
            <div>Date: {estimate.date}</div>
            <div>Estimate #: {estimate.id}</div>
          </div>
        </div>
        <div className="flex flex-col md:items-end gap-2">
          <Badge
            className="w-fit"
            variant={estimate.status === "Approved" ? "outline" : estimate.status === "Sent" ? "default" : "secondary"}
          >
            {estimate.status}
          </Badge>
          <div className="text-xl font-bold">${estimate.total.toLocaleString()}</div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => setSummaryOpen(true)}>
              <Eye className="mr-2 h-4 w-4" />
              View Summary
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPdf}>
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportExcel}>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export Excel
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="items">
        <TabsList className="w-full flex overflow-x-auto">
          <TabsTrigger value="items">Line Items</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="space-y-4">
          {/* Groups */}
          {estimate.groups.map((group) => (
            <div key={group.id} className="border rounded-md overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-muted/50">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toggleGroup(group.id)}>
                    {group.expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                  <div className="flex items-center gap-3">
                    <div className="font-medium w-16">{group.code}</div>
                    <div>{group.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-medium">${group.total.toLocaleString()}</div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sections */}
              {group.expanded && (
                <div>
                  {group.sections.map((section) => (
                    <div key={section.id} className="border-t">
                      <div className="flex items-center justify-between p-4 pl-8 hover:bg-muted/30">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => toggleSection(group.id, section.id)}
                          >
                            {section.expanded ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                          <div className="flex items-center gap-3">
                            <div className="font-medium w-16">{section.code}</div>
                            <div>{section.description}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="font-medium">${section.total.toLocaleString()}</div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Subsections */}
                      {section.expanded && (
                        <div className="border-t">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b bg-muted/30">
                                  <th className="px-4 py-2 text-left w-16">Code</th>
                                  <th className="px-4 py-2 text-left">Description</th>
                                  <th className="px-4 py-2 text-right">Quantity</th>
                                  <th className="px-4 py-2 text-left">Unit</th>
                                  <th className="px-4 py-2 text-right">Rate</th>
                                  <th className="px-4 py-2 text-right">Total</th>
                                  <th className="px-4 py-2 text-right w-20">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {section.subsections.map((subsection) => (
                                  <tr key={subsection.id} className="border-b hover:bg-muted/20">
                                    <td className="px-4 py-2 text-left">{subsection.code}</td>
                                    <td className="px-4 py-2 text-left">{subsection.description}</td>
                                    <td className="px-4 py-2 text-right">{subsection.quantity}</td>
                                    <td className="px-4 py-2 text-left">{subsection.unit}</td>
                                    <td className="px-4 py-2 text-right">${subsection.rate.toLocaleString()}</td>
                                    <td className="px-4 py-2 text-right">${subsection.total.toLocaleString()}</td>
                                    <td className="px-4 py-2 text-right">
                                      <div className="flex justify-end gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                          <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                          <Trash className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                                <tr>
                                  <td colSpan={7} className="px-4 py-2">
                                    <Button variant="ghost" size="sm" className="w-full">
                                      <Plus className="mr-2 h-4 w-4" />
                                      Add Subsection
                                    </Button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="p-4 pl-8">
                    <Button variant="ghost" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Section
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}

          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Group
          </Button>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          {/* Summary Table */}
          <div className="border rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left">Code</th>
                    <th className="px-4 py-3 text-left">Description</th>
                    <th className="px-4 py-3 text-right">Amount</th>
                    <th className="px-4 py-3 text-right">%</th>
                  </tr>
                </thead>
                <tbody>
                  {estimate.groups.map((group) => (
                    <tr key={group.id} className="border-b">
                      <td className="px-4 py-3 text-left font-medium">{group.code}</td>
                      <td className="px-4 py-3 text-left">{group.description}</td>
                      <td className="px-4 py-3 text-right">${group.total.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">{((group.total / estimate.total) * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-b bg-muted/50">
                    <td colSpan={2} className="px-4 py-3 text-right font-medium">
                      Subtotal:
                    </td>
                    <td className="px-4 py-3 text-right font-medium">${subtotal.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">100%</td>
                  </tr>
                  <tr className="border-b">
                    <td colSpan={2} className="px-4 py-3 text-right">
                      Tax (8.5%):
                    </td>
                    <td className="px-4 py-3 text-right">${tax.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right"></td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td colSpan={2} className="px-4 py-3 text-right font-bold">
                      Grand Total:
                    </td>
                    <td className="px-4 py-3 text-right font-bold">${grandTotal.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Notes */}
          <div className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-2">Notes</h3>
            <p className="text-sm text-muted-foreground">
              This estimate is valid for 30 days from the date of issue. Any changes to the scope of work may result in
              price adjustments.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Payment terms: 50% deposit upon acceptance, 50% upon completion.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Tax Settings</h3>
              <div className="border rounded-md p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Apply Tax</span>
                    <span>Yes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tax Rate</span>
                    <span>8.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tax Method</span>
                    <span>Apply to total</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Estimate Settings</h3>
              <div className="border rounded-md p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Estimate Number</span>
                    <span>{estimate.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Expiration</span>
                    <span>30 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Currency</span>
                    <span>USD ($)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Terms & Conditions</h3>
            <div className="border rounded-md p-4">
              <p className="text-sm text-muted-foreground">
                This estimate is valid for 30 days from the date of issue. Any changes to the scope of work may result
                in price adjustments.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Payment terms: 50% deposit upon acceptance, 50% upon completion.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                All materials and workmanship are guaranteed for a period of one year from the date of completion.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Summary Drawer */}
      <EstimateSummaryDrawer open={summaryOpen} onOpenChange={setSummaryOpen} estimate={estimate} />
    </div>
  )
}

