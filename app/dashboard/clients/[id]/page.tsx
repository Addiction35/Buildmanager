import type { Metadata } from "next"
import { ClientDetails } from "@/components/client-details"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Pencil } from "lucide-react"

export const metadata: Metadata = {
  title: "Client Details | Construction Management",
  description: "View client details and related projects",
}

export default function ClientDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 md:gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/clients">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">Client Details</h1>
        </div>
        <Button asChild>
          <Link href={`/dashboard/clients/${params.id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Client
          </Link>
        </Button>
      </div>
      <ClientDetails id={params.id} />
    </div>
  )
}

