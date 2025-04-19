import { type NextRequest, NextResponse } from "next/server"
import { reportsData } from "@/lib/reports-service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Find the report by ID
    const report = reportsData.find((r) => r.id === params.id)

    if (!report) {
      return new NextResponse(JSON.stringify({ error: "Report not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    // In a real application, you would generate a PDF here
    // For this example, we'll just return a simple PDF-like response
    const pdfContent = `
      Report ID: ${report.id}
      Title: ${report.title}
      Description: ${report.description}
      Category: ${report.category}
      Created: ${report.createdAt}
      Updated: ${report.updatedAt}
      Author: ${report.author}
      Status: ${report.status}
    `

    // Return a text response that simulates a PDF
    return new NextResponse(pdfContent, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="report-${report.id}.pdf"`,
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

