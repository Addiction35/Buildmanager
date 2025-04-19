import type { Metadata } from "next"
import { ClientsTable } from "@/components/clients-table"
import { ClientsFilters } from "@/components/clients-filters"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Clients | Construction Management",
  description: "Manage your clients and their projects",
}

export default function ClientsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 md:gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
          <p className="text-sm text-muted-foreground">Manage your clients and their projects</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/clients/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Client
          </Link>
        </Button>
      </div>
      <ClientsFilters />
      <ClientsTable />
    </div>
  )
}

