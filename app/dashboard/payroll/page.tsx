"use client"

import { Button } from "@/components/ui/button"
import { PayrollTable } from "@/components/payroll-table"
import { PayrollFilters } from "@/components/payroll-filters"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { payrollApi } from "@/lib/api-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PayrollPage() {
  // Fetch payroll data
  const {
    data: payrolls,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payrolls"],
    queryFn: payrollApi.getAll,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Company Payroll</h1>
          <p className="text-muted-foreground">Manage company-wide payroll processing</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/payroll/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Payroll
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payroll Management</CardTitle>
          <CardDescription>Process and manage payroll for all employees across all projects</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Use this section to create and manage company-wide payroll. For project-specific wages, please select a
            project and navigate to the Wages section.
          </p>
        </CardContent>
      </Card>

      <PayrollFilters />
      <PayrollTable payrolls={payrolls || []} isLoading={isLoading} error={error as Error | null} />
    </div>
  )
}

