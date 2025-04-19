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
import { Edit, FileText, MoreHorizontal, Trash } from "lucide-react"
import { getData, simulateApiDelay } from "@/lib/dummy-data"

export function EstimatesTable({ projectId }: { projectId?: string }) {
  const router = useRouter()

  // Fetch estimates from dummy data
  const {
    data: estimates = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["estimates", projectId],
    queryFn: async () => {
      await simulateApiDelay()
      return projectId ? getData("estimates", { projectId }) : getData("estimates")
    },
    enabled: typeof window !== "undefined", // Only run on client side
  })

  const handleViewEstimate = (estimateId: string) => {
    router.push(`/dashboard/estimates/${estimateId}`)
  }

  const handleEditEstimate = (estimateId: string) => {
    router.push(`/dashboard/estimates/${estimateId}/edit`)
  }

  const handleDeleteEstimate = (estimateId: string) => {
    // In a real app, this would call an API to delete the estimate
    console.log(`Delete estimate ${estimateId}`)
  }

  const handleExportPdf = (estimateId: string) => {
    // In a real app, this would call an API to export the estimate as PDF
    console.log(`Export estimate ${estimateId} as PDF`)
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
        <h3 className="font-medium">Error loading estimates</h3>
        <p className="text-sm">There was an error loading the estimates. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Estimate</TableHead>
            <TableHead className="hidden md:table-cell">Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Amount</TableHead>
            <TableHead className="hidden lg:table-cell">Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {estimates.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                No estimates found
              </TableCell>
            </TableRow>
          ) : (
            estimates.map((estimate) => (
              <TableRow
                key={estimate.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleViewEstimate(estimate.id)}
              >
                <TableCell className="font-medium">
                  <div>
                    <div className="font-medium">{estimate.name}</div>
                    <div className="text-xs text-muted-foreground">{estimate.id}</div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{estimate.client}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      estimate.status === "Approved"
                        ? "default"
                        : estimate.status === "Draft"
                          ? "outline"
                          : estimate.status === "Sent"
                            ? "secondary"
                            : estimate.status === "Rejected"
                              ? "destructive"
                              : "outline"
                    }
                  >
                    {estimate.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">${estimate.amount.toLocaleString()}</TableCell>
                <TableCell className="hidden lg:table-cell">{new Date(estimate.date).toLocaleDateString()}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleEditEstimate(estimate.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExportPdf(estimate.id)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Export PDF
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDeleteEstimate(estimate.id)}
                      >
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

