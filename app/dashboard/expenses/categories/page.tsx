import { Button } from "@/components/ui/button"
import { ExpenseCategoriesTable } from "@/components/expense-categories-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExpenseCategoryForm } from "@/components/expense-category-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ExpenseCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/expenses">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Expense Categories</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Manage expense categories for better organization</CardDescription>
          </CardHeader>
          <CardContent>
            <ExpenseCategoriesTable />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add Category</CardTitle>
            <CardDescription>Create a new expense category</CardDescription>
          </CardHeader>
          <CardContent>
            <ExpenseCategoryForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

