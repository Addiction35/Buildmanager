import { Button } from "@/components/ui/button"
import { DocumentsFilters } from "@/components/documents-filters"
import { DocumentsGrid } from "@/components/documents-grid"
import { Plus, Upload } from "lucide-react"

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
        </div>
      </div>
      <DocumentsFilters />
      <DocumentsGrid />
    </div>
  )
}

