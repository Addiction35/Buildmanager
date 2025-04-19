"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { FileSpreadsheet, Upload, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useEstimates } from "@/hooks/use-estimates"

interface ImportExcelDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ImportExcelDialog({ open, onOpenChange }: ImportExcelDialogProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [previewData, setPreviewData] = useState<any[] | null>(null)

  const { toast } = useToast()
  const { importFromExcel } = useEstimates()

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      validateAndSetFile(selectedFile)
    }
  }

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      validateAndSetFile(droppedFile)
    }
  }

  // Validate file type and set file
  const validateAndSetFile = (file: File) => {
    const validTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ]

    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an Excel or CSV file",
        variant: "destructive",
      })
      return
    }

    setFile(file)
    generatePreview(file)
  }

  // Generate preview of the Excel data
  const generatePreview = async (file: File) => {
    setIsProcessing(true)

    try {
      // In a real implementation, you would use a library like xlsx or papaparse
      // to parse the Excel/CSV file and generate a preview

      // Simulating preview generation
      setTimeout(() => {
        // Mock preview data
        setPreviewData([
          { code: "A.1.1", description: "Topsoil removal", quantity: 1, unit: "Job", rate: 15000 },
          { code: "A.1.2", description: "Basement excavation", quantity: 1, unit: "Job", rate: 30000 },
          { code: "A.2.1", description: "Rough grading", quantity: 1, unit: "Job", rate: 8750 },
          // More rows would be here in a real implementation
        ])
        setIsProcessing(false)
      }, 1000)
    } catch (error) {
      toast({
        title: "Error processing file",
        description: "There was an error processing the Excel file. Please try again.",
        variant: "destructive",
      })
      setIsProcessing(false)
    }
  }

  // Handle import
  const handleImport = async () => {
    if (!file || !previewData) return

    setIsProcessing(true)

    try {
      await importFromExcel(file)

      toast({
        title: "Import successful",
        description: "The Excel file has been imported successfully",
      })

      // Close the dialog
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Import failed",
        description: "There was an error importing the Excel file. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Clear selected file
  const clearFile = () => {
    setFile(null)
    setPreviewData(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import Estimate from Excel</DialogTitle>
          <DialogDescription>Upload an Excel file to import estimate data</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {!file ? (
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center py-4">
                <FileSpreadsheet className="h-10 w-10 text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">Drop your Excel file here</h3>
                <p className="text-sm text-muted-foreground mt-1">or click to browse</p>
                <input
                  type="file"
                  className="hidden"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileChange}
                  id="excel-upload"
                />
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => document.getElementById("excel-upload")?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Select File
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md bg-muted/30">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(2)} KB • {file.type}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={clearFile} disabled={isProcessing}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {isProcessing ? (
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : previewData ? (
                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="px-4 py-2 text-left">Code</th>
                          <th className="px-4 py-2 text-left">Description</th>
                          <th className="px-4 py-2 text-right">Quantity</th>
                          <th className="px-4 py-2 text-left">Unit</th>
                          <th className="px-4 py-2 text-right">Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {previewData.map((row, index) => (
                          <tr key={index} className="border-b">
                            <td className="px-4 py-2 text-left">{row.code}</td>
                            <td className="px-4 py-2 text-left">{row.description}</td>
                            <td className="px-4 py-2 text-right">{row.quantity}</td>
                            <td className="px-4 py-2 text-left">{row.unit}</td>
                            <td className="px-4 py-2 text-right">${row.rate.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Showing {previewData.length} rows from the Excel file. Import to see all data.
                  </p>
                </div>
              ) : null}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isProcessing}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={!file || !previewData || isProcessing}>
            {isProcessing ? "Importing..." : "Import Data"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

