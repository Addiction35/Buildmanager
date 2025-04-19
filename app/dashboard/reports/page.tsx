import { ReportsGrid } from "@/components/reports-grid"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileSpreadsheet, FileText } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="section-header mb-0">
          <h1 className="section-title">Reports</h1>
          <p className="section-description">Access and export detailed reports for your construction business</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export All as PDF
          </Button>
          <Button variant="outline">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export All as Excel
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reports Overview</CardTitle>
          <CardDescription>
            Generate and view reports to gain insights into your construction projects and finances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Reports</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="pt-4">
              <ReportsGrid />
            </TabsContent>
            <TabsContent value="financial" className="pt-4">
              <ReportsGrid />
            </TabsContent>
            <TabsContent value="operations" className="pt-4">
              <ReportsGrid />
            </TabsContent>
            <TabsContent value="custom" className="pt-4">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Custom Reports</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md">
                  You haven't created any custom reports yet. Custom reports allow you to tailor data to your specific
                  needs.
                </p>
                <Button className="mt-4">Create Custom Report</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

