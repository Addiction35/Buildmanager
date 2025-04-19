import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Clock, DollarSign, FileText, HardHat, Receipt, ShoppingCart } from "lucide-react"
import Link from "next/link"

export function DashboardCards() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Project Metrics</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Building className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
            <div className="mt-4 h-1 w-full rounded-full bg-muted">
              <div className="h-1 w-[75%] rounded-full bg-primary"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.2M</div>
            <p className="text-xs text-muted-foreground">68% of total budget</p>
            <div className="mt-4 h-1 w-full rounded-full bg-muted">
              <div className="h-1 w-[68%] rounded-full bg-primary"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resources Assigned</CardTitle>
            <HardHat className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">+5 from last week</p>
            <div className="mt-4 h-1 w-full rounded-full bg-muted">
              <div className="h-1 w-[85%] rounded-full bg-primary"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Timeline Progress</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <p className="text-xs text-muted-foreground">On track for completion</p>
            <div className="mt-4 h-1 w-full rounded-full bg-muted">
              <div className="h-1 w-[72%] rounded-full bg-primary"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Estimates</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/dashboard/estimates" className="text-primary hover:underline">
                View all estimates
              </Link>
            </p>
            <div className="mt-4 h-1 w-full rounded-full bg-muted">
              <div className="h-1 w-[60%] rounded-full bg-primary"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Purchase Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/dashboard/purchase-orders" className="text-primary hover:underline">
                View all purchase orders
              </Link>
            </p>
            <div className="mt-4 h-1 w-full rounded-full bg-muted">
              <div className="h-1 w-[45%] rounded-full bg-primary"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Labor Costs</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42,850</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/dashboard/wages" className="text-primary hover:underline">
                View payroll details
              </Link>
            </p>
            <div className="mt-4 h-1 w-full rounded-full bg-muted">
              <div className="h-1 w-[65%] rounded-full bg-primary"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <Receipt className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$28,750</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/dashboard/expenses" className="text-primary hover:underline">
                View expense details
              </Link>
            </p>
            <div className="mt-4 h-1 w-full rounded-full bg-muted">
              <div className="h-1 w-[55%] rounded-full bg-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

