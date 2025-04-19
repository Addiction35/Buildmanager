import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PayrollForm } from "@/components/payroll-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewPayrollPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/wages">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create Payroll Entry</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Payroll Details</CardTitle>
          <CardDescription>Create a new payroll entry for employees</CardDescription>
        </CardHeader>
        <CardContent>
          <PayrollForm />
        </CardContent>
      </Card>
    </div>
  )
}

