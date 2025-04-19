import { type NextRequest, NextResponse } from "next/server"
import { reportsData } from "@/lib/reports-service"

export async function GET(request: NextRequest) {
  try {
    // In a real application, you would generate an Excel file here
    // For this example, we'll just return a simple CSV-like response
    const headers = "ID,Title,Description,Category,Created,Updated,Author,Status"
    const rows = reportsData.map(
      (report) =>
        `${report.id},${report.title},${report.description},${report.category},${report.createdAt},${report.updatedAt},${report.author},${report.status}`,
    )
    const csvContent = [headers, ...rows].join("\n")

    // Return a text response that simulates an Excel file
    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=all-reports.xlsx",
      },
    })
  } catch (error) {
    console.error("Error generating Excel:", error)
    return new NextResponse(JSON.stringify({ error: "Failed to generate Excel file" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}

