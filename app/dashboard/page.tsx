import { DashboardCards } from "@/components/dashboard-cards"
import { DashboardCharts } from "@/components/dashboard-charts"
import { ProjectsTable } from "@/components/projects-table"
import { FinancialSummary } from "@/components/financial-summary"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="section-header">
        <h1 className="section-title">Dashboard</h1>
        <p className="section-description">
          Welcome to BuildManager. View your construction projects and financial overview.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Card className="w-full md:w-3/4">
          <CardHeader className="pb-2">
            <CardTitle>Welcome to BuildManager</CardTitle>
            <CardDescription>Your construction management solution</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Select a project from the sidebar or create a new one to get started.</p>
            <Button asChild>
              <Link href="/dashboard/projects/new">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="w-full md:w-1/4 bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/dashboard/estimates/new">
                <Plus className="mr-2 h-4 w-4" />
                New Estimate
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/dashboard/invoices/new">
                <Plus className="mr-2 h-4 w-4" />
                New Invoice
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/dashboard/expenses/new">
                <Plus className="mr-2 h-4 w-4" />
                New Expense
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <FinancialSummary />

      <DashboardCards />

      <div className="grid gap-6 md:grid-cols-2">
        <DashboardCharts />
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across your projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start gap-4 pb-2 border-b last:border-0">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary"></div>
                  <div>
                    <p className="text-sm font-medium">
                      {
                        [
                          "Estimate approved",
                          "Invoice paid",
                          "New expense added",
                          "Project status updated",
                          "New document uploaded",
                        ][i - 1]
                      }
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {["2 hours ago", "Yesterday", "2 days ago", "3 days ago", "1 week ago"][i - 1]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Projects</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/projects">View All</Link>
          </Button>
        </div>
        <ProjectsTable />
      </div>
    </div>
  )
}

