import { Button } from "@/components/ui/button"
import { ProposalsTable } from "@/components/proposals-table"
import { ProposalsFilters } from "@/components/proposals-filters"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function ProposalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Proposals</h1>
        <Link href="/dashboard/proposals/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Proposal
          </Button>
        </Link>
      </div>
      <ProposalsFilters />
      <ProposalsTable />
    </div>
  )
}

