import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EstimateForm } from "@/components/estimate-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewEstimatePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/estimates">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create New Estimate</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Estimate Details</CardTitle>
          <CardDescription>Create a detailed cost estimate for your construction project</CardDescription>
        </CardHeader>
        <CardContent>
          <EstimateForm />
        </CardContent>
      </Card>
    </div>
  )
}

