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
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getData, simulateApiDelay } from "@/lib/dummy-data"

interface WagesTableProps {
  projectId: string
}

export function WagesTable({ projectId }: WagesTableProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // Fetch wages data
  const {
    data: wages = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wages", projectId],
    queryFn: async () => {
      await simulateApiDelay()
      return getData("wages", { projectId })
    },
  })

  // Delete wage mutation
  const { mutate: deleteWage } = useMutation({
    mutationFn: async (id: string) => {
      await simulateApiDelay()
      // In a real app, this would call an API
      return { success: true }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wages", projectId] })
      toast({
        title: "Wage entry deleted",
        description: "The wage entry has been deleted successfully.",
      })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete the wage entry. Please try again.",
        variant: "destructive",
      })
    },
  })

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this wage entry?")) {
      deleteWage(id)
    }
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
        <h3 className="font-medium">Error loading wages data</h3>
        <p className="text-sm">There was an error loading the wages data. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="hidden md:table-cell">Hours</TableHead>
              <TableHead className="hidden md:table-cell">Rate</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No wage entries found
                </TableCell>
              </TableRow>
            ) : (
              wages.map((wage) => (
                <TableRow key={wage.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium">{wage.employeeName}</div>
                      <div className="text-xs text-muted-foreground">{wage.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(wage.date).toLocaleDateString()}</TableCell>
                  <TableCell className="hidden md:table-cell">{wage.hours}</TableCell>
                  <TableCell className="hidden md:table-cell">${wage.rate.toFixed(2)}/hr</TableCell>
                  <TableCell>${wage.amount.toFixed(2)}</TableCell>
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
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(wage.id)}>
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

