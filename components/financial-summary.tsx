"use client"

import { Badge } from "@/components/ui/badge"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useQuery } from "@tanstack/react-query"
import { getData, simulateApiDelay } from "@/lib/dummy-data"
import { DollarSign, TrendingUp, TrendingDown, Clock } from "lucide-react"

export function FinancialSummary() {
  const { data: invoices = [] } = useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      await simulateApiDelay()
      return getData("invoices")
    },
  })

  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      await simulateApiDelay()
      return getData("expenses")
    },
  })

  // Calculate financial metrics
  const totalInvoiced = invoices.reduce((sum, invoice) => sum + invoice.amount, 0)
  const totalPaid = invoices
    .filter((invoice) => invoice.status === "Paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0)
  const totalOverdue = invoices
    .filter((invoice) => invoice.status === "Overdue")
    .reduce((sum, invoice) => sum + invoice.amount, 0)
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const netIncome = totalPaid - totalExpenses

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Financial Overview</TabsTrigger>
        <TabsTrigger value="invoices">Invoices</TabsTrigger>
        <TabsTrigger value="expenses">Expenses</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalPaid.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${netIncome.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+18.2% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalOverdue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {invoices.filter((i) => i.status === "Overdue").length} overdue invoices
              </p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="invoices" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Invoice Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Invoiced</p>
                  <p className="text-2xl font-bold">${totalInvoiced.toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Paid</p>
                  <p className="text-2xl font-bold">${totalPaid.toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">${(totalInvoiced - totalPaid - totalOverdue).toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                  <p className="text-2xl font-bold">${totalOverdue.toLocaleString()}</p>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="text-sm font-medium mb-2">Recent Invoices</h4>
                <div className="space-y-2">
                  {invoices.slice(0, 3).map((invoice) => (
                    <div key={invoice.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{invoice.id}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(invoice.issueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${invoice.amount.toLocaleString()}</p>
                        <p className="text-xs">
                          <Badge
                            variant={
                              invoice.status === "Paid"
                                ? "outline"
                                : invoice.status === "Overdue"
                                  ? "destructive"
                                  : "default"
                            }
                          >
                            {invoice.status}
                          </Badge>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="expenses" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Expense Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold">${totalExpenses.toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold">
                    $
                    {expenses
                      .filter((expense) => expense.status === "Approved")
                      .reduce((sum, expense) => sum + expense.amount, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">
                    $
                    {expenses
                      .filter((expense) => expense.status === "Pending")
                      .reduce((sum, expense) => sum + expense.amount, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                  <p className="text-2xl font-bold">
                    $
                    {expenses
                      .filter((expense) => expense.status === "Rejected")
                      .reduce((sum, expense) => sum + expense.amount, 0)
                      .toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="text-sm font-medium mb-2">Recent Expenses</h4>
                <div className="space-y-2">
                  {expenses.slice(0, 3).map((expense) => (
                    <div key={expense.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{expense.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(expense.date).toLocaleDateString()} - {expense.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${expense.amount.toLocaleString()}</p>
                        <p className="text-xs">
                          <Badge
                            variant={
                              expense.status === "Approved"
                                ? "outline"
                                : expense.status === "Rejected"
                                  ? "destructive"
                                  : "default"
                            }
                          >
                            {expense.status}
                          </Badge>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

