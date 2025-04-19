"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Estimate } from "@/lib/api-service"
import { useRouter } from "next/navigation"
import { ChevronRight, FolderOpen, Search } from "lucide-react"
import { EstimateSummaryDrawer } from "@/components/estimate-summary-drawer"

interface EstimateHierarchyProps {
  projectId?: string
  estimates: Estimate[]
}

export function EstimateHierarchy({ projectId, estimates = [] }: EstimateHierarchyProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEstimate, setSelectedEstimate] = useState<Estimate | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Filter estimates based on search query
  const filteredEstimates = estimates.filter(
    (estimate) =>
      estimate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      estimate.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Group estimates by status
  const groupedEstimates = {
    draft: filteredEstimates.filter((estimate) => estimate.status === "Draft"),
    pending: filteredEstimates.filter((estimate) => estimate.status === "Pending"),
    approved: filteredEstimates.filter((estimate) => estimate.status === "Approved"),
    rejected: filteredEstimates.filter((estimate) => estimate.status === "Rejected"),
  }

  const handleEstimateClick = (estimate: Estimate) => {
    if (projectId) {
      router.push(`/dashboard/projects/${projectId}/estimates/${estimate.id}`)
    } else {
      router.push(`/dashboard/estimates/${estimate.id}`)
    }
  }

  const handleEstimatePreview = (estimate: Estimate) => {
    setSelectedEstimate(estimate)
    setDrawerOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center relative">
        <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search estimates..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          {filteredEstimates.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No estimates found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {searchQuery ? "Try adjusting your search query" : "Create your first estimate to get started"}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredEstimates.map((estimate) => (
                <Card key={estimate.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={
                          estimate.status === "Approved"
                            ? "default"
                            : estimate.status === "Pending"
                              ? "secondary"
                              : estimate.status === "Rejected"
                                ? "destructive"
                                : "outline"
                        }
                      >
                        {estimate.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground">{estimate.id}</div>
                    </div>
                    <CardTitle className="text-lg mt-2">{estimate.title}</CardTitle>
                    <CardDescription>Created on {new Date(estimate.createdAt).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">${estimate.totalAmount.toLocaleString()}</div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEstimatePreview(estimate)
                          }}
                        >
                          Preview
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEstimateClick(estimate)}>
                          View <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="draft" className="mt-6">
          <RenderEstimateGroup
            estimates={groupedEstimates.draft}
            onEstimateClick={handleEstimateClick}
            onEstimatePreview={handleEstimatePreview}
          />
        </TabsContent>
        <TabsContent value="pending" className="mt-6">
          <RenderEstimateGroup
            estimates={groupedEstimates.pending}
            onEstimateClick={handleEstimateClick}
            onEstimatePreview={handleEstimatePreview}
          />
        </TabsContent>
        <TabsContent value="approved" className="mt-6">
          <RenderEstimateGroup
            estimates={groupedEstimates.approved}
            onEstimateClick={handleEstimateClick}
            onEstimatePreview={handleEstimatePreview}
          />
        </TabsContent>
        <TabsContent value="rejected" className="mt-6">
          <RenderEstimateGroup
            estimates={groupedEstimates.rejected}
            onEstimateClick={handleEstimateClick}
            onEstimatePreview={handleEstimatePreview}
          />
        </TabsContent>
      </Tabs>

      {selectedEstimate && (
        <EstimateSummaryDrawer estimate={selectedEstimate} open={drawerOpen} onOpenChange={setDrawerOpen} />
      )}
    </div>
  )
}

interface RenderEstimateGroupProps {
  estimates: Estimate[]
  onEstimateClick: (estimate: Estimate) => void
  onEstimatePreview: (estimate: Estimate) => void
}

function RenderEstimateGroup({ estimates, onEstimateClick, onEstimatePreview }: RenderEstimateGroupProps) {
  if (estimates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No estimates in this category</h3>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {estimates.map((estimate) => (
        <Card key={estimate.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Badge
                variant={
                  estimate.status === "Approved"
                    ? "default"
                    : estimate.status === "Pending"
                      ? "secondary"
                      : estimate.status === "Rejected"
                        ? "destructive"
                        : "outline"
                }
              >
                {estimate.status}
              </Badge>
              <div className="text-xs text-muted-foreground">{estimate.id}</div>
            </div>
            <CardTitle className="text-lg mt-2">{estimate.title}</CardTitle>
            <CardDescription>Created on {new Date(estimate.createdAt).toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">${estimate.totalAmount.toLocaleString()}</div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onEstimatePreview(estimate)
                  }}
                >
                  Preview
                </Button>
                <Button variant="outline" size="sm" onClick={() => onEstimateClick(estimate)}>
                  View <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

