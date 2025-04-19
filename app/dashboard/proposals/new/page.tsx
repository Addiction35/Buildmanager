"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ProposalForm } from "@/components/proposal-form"

export default function NewProposalPage() {
  const router = useRouter()

  const handleSave = () => {
    // In a real app, this would save the proposal
    router.push("/dashboard/proposals")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/proposals">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">New Proposal</h1>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Proposal
        </Button>
      </div>

      <ProposalForm />
    </div>
  )
}

