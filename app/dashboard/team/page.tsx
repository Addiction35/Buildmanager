import type { Metadata } from "next"
import { TeamTable } from "@/components/team-table"
import { TeamFilters } from "@/components/team-filters"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Team | Construction Management",
  description: "Manage your team members and their roles",
}

export default function TeamPage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 md:gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Team</h1>
          <p className="text-sm text-muted-foreground">Manage your team members and their roles</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/team/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Team Member
          </Link>
        </Button>
      </div>
      <TeamFilters />
      <TeamTable />
    </div>
  )
}

