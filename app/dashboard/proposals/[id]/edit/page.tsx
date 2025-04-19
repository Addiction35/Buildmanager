"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Save, Trash } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { getItemById, simulateApiDelay } from "@/lib/dummy-data"
import { Skeleton } from "@/components/ui/skeleton"
import { ProposalForm } from "@/components/proposal-form"

export default function EditProposalPage() {
  const params = useParams()
  const router = useRouter()
  const proposalId = params.id as string
  const [proposal, setProposal] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchProposal = async () => {
      setIsLoading(true)
      setIsError(false)

      try {
        await simulateApiDelay()
        const proposalData = getItemById("proposals", proposalId)

        if (proposalData) {
          setProposal(proposalData)
        } else {
          setIsError(true)
        }
      } catch (error) {
        console.error("Error fetching proposal:", error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProposal()
  }, [proposalId])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" disabled>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Skeleton className="h-8 w-[300px]" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
        </div>
        <Skeleton className="h-[600px] w-full" />
      </div>
    )
  }

  if (isError || !proposal) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/proposals">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Proposal Not Found</h1>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Proposal Not Found</h3>
                <p className="text-muted-foreground">
                  The proposal you're trying to edit doesn't exist or you don't have access to it.
                </p>
              </div>
              <Button onClick={() => router.push("/dashboard/proposals")}>Return to Proposals</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSave = () => {
    // In a real app, this would save the proposal
    router.push(`/dashboard/proposals/${proposal.id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/proposals/${proposal.id}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Edit Proposal</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-destructive hover:bg-destructive/10">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <ProposalForm defaultValues={proposal} />
    </div>
  )
}

