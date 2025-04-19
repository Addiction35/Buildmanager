import { type NextRequest, NextResponse } from "next/server"
import { reportsData } from "@/lib/reports-service"

export async function GET(request: NextRequest) {
  try {
    // In a real application, you would generate a PDF with all reports here
    // For this example, we'll just return a simple PDF-like response
    const pdfContent = reportsData
      .map(
        (report) => `
      Report ID: ${report.id}
      Title: ${report.title}
      Description: ${report.description}
      Category: ${report.category}
      Created: ${report.createdAt}
      Updated: ${report.updatedAt}
      Author: ${report.author}
      Status: ${report.status}
      -------------------
    `,
      )
      .join("\n")

    // Return a text response that simulates a PDF
    return new NextResponse(pdfContent, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=all-reports.pdf",
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return new NextResponse(JSON.stringify({ error: "Failed to generate PDF" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}

