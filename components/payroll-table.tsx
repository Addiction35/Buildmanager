"use client"

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
import { Copy, Download, Eye, MoreHorizontal, Pencil, Trash } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getData, simulateApiDelay } from "@/lib/dummy-data"

export function PayrollTable() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const {
    data: payrolls = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payrolls"],
    queryFn: async () => {
      await simulateApiDelay()
      return getData("payrolls")
    },
  })

  // Delete payroll mutation
  const { mutate: deletePayroll } = useMutation({
    mutationFn: async (id: string) => {
      await simulateApiDelay()
      // In a real app, this would call an API
      return { success: true }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payrolls"] })
      toast({
        title: "Payroll deleted",
        description: "The payroll has been deleted successfully.",
      })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete the payroll. Please try again.",
        variant: "destructive",
      })
    },
  })

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this payroll?")) {
      deletePayroll(id)
    }
  }

  const handleViewPdf = (id: string) => {
    window.open(`/api/payroll/${id}/pdf`, "_blank")
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
        <h3 className="font-medium">Error loading payroll data</h3>
        <p className="text-sm">There was an error loading the payroll data. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payroll Period</TableHead>
              <TableHead className="hidden md:table-cell">Employees</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payrolls.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No payroll records found
                </TableCell>
              </TableRow>
            ) : (
              payrolls.map((payroll) => (
                <TableRow key={payroll.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium">
                        {new Date(payroll.period.start).toLocaleDateString()} -{" "}
                        {new Date(payroll.period.end).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground">{payroll.id}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{payroll.employeeCount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        payroll.status === "Paid"
                          ? "outline"
                          : payroll.status === "Processing"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {payroll.status}
                    </Badge>
                  </TableCell>
                  <TableCell>${payroll.totalAmount.toLocaleString()}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {payroll.processedAt ? new Date(payroll.processedAt).toLocaleDateString() : "Not processed"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewPdf(payroll.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View as PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(payroll.id)}>
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
    </div>
  )
}

