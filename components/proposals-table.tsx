"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { Copy, Download, Eye, FileText, MoreHorizontal, Pencil, Send, Trash, Link } from "lucide-react"
import { useRouter } from "next/navigation"
import { getData, simulateApiDelay } from "@/lib/dummy-data"
import { Skeleton } from "@/components/ui/skeleton"

export function ProposalsTable() {
  const router = useRouter()
  const [proposals, setProposals] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProposals = async () => {
      setIsLoading(true)
      try {
        await simulateApiDelay()
        const proposalsData = getData("proposals")
        setProposals(proposalsData)
      } catch (error) {
        console.error("Error fetching proposals:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProposals()
  }, [])

  const handleRowClick = (id: string) => {
    router.push(`/dashboard/proposals/${id}`)
  }

  const handleViewProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/dashboard/projects/${projectId}`)
  }

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Proposal</TableHead>
              <TableHead className="hidden md:table-cell">Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="hidden md:table-cell">Expiry Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-3 w-[100px] mt-1" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-4 w-[150px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-[80px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (proposals.length === 0) {
    return (
      <div className="rounded-md border p-8 text-center">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No proposals found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          You haven't created any proposals yet. Get started by creating your first proposal.
        </p>
        <Button className="mt-4" onClick={() => router.push("/dashboard/proposals/new")}>
          Create New Proposal
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Proposal</TableHead>
            <TableHead className="hidden md:table-cell">Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="hidden md:table-cell">Expiry Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proposals.map((proposal) => (
            <TableRow
              key={proposal.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleRowClick(proposal.id)}
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{proposal.name}</div>
                    <div className="text-xs text-muted-foreground">{proposal.id}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{proposal.client}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    proposal.status === "Accepted"
                      ? "outline"
                      : proposal.status === "Sent"
                        ? "default"
                        : proposal.status === "Rejected"
                          ? "destructive"
                          : "secondary"
                  }
                >
                  {proposal.status}
                </Badge>
              </TableCell>
              <TableCell>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(proposal.amount)}
              </TableCell>
              <TableCell className="hidden md:table-cell">{proposal.expiryDate}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => window.open(`/api/proposals/${proposal.id}/pdf`, "_blank")}>
                      <Eye className="mr-2 h-4 w-4" />
                      View as PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/dashboard/proposals/${proposal.id}/edit`)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={(e) => handleViewProject(proposal.projectId, e)}>
                      <Link className="mr-2 h-4 w-4" />
                      View Project
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Send className="mr-2 h-4 w-4" />
                      Send to Client
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
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

