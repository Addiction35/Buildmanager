import { Button } from "@/components/ui/button"
import { EstimateHierarchy } from "@/components/estimate-hierarchy"
import { Plus, Upload } from "lucide-react"
import Link from "next/link"

export default function EstimatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Estimates</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Link href="/dashboard/estimates/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Estimate
            </Button>
          </Link>
        </div>
      </div>
      <EstimateHierarchy />
    </div>
  )
}

