import { Button } from "@/components/ui/button"
import { ExpensesFilters } from "@/components/expenses-filters"
import { ExpensesTable } from "@/components/expenses-table"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/expenses/categories">
            <Button variant="outline">Categories</Button>
          </Link>
          <Link href="/dashboard/expenses/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Expense
            </Button>
          </Link>
        </div>
      </div>
      <ExpensesFilters />
      <ExpensesTable />
    </div>
  )
}

