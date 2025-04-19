import type { Metadata } from "next"
import { TeamMemberForm } from "@/components/team-member-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "New Team Member | Construction Management",
  description: "Add a new team member to your organization",
}

export default function NewTeamMemberPage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 md:gap-8">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/team">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight">New Team Member</h1>
      </div>
      <TeamMemberForm />
    </div>
  )
}

