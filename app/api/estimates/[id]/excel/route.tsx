import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // In a real application, you would generate an Excel file here
  // For this example, we'll just return a placeholder response

  // Create a simple CSV as a placeholder for Excel
  const csvContent = `
Estimate ID,${params.id}
Date,September 15, 2023
Client,Riverside Development Corp
Project,Riverside Apartments - Foundation

Code,Description,Quantity,Unit,Rate,Total
A.1.1,Topsoil removal,1,Job,$15000.00,$15000.00
A.1.2,Basement excavation,1,Job,$30000.00,$30000.00
A.2.1,Rough grading,1,Job,$8750.00,$8750.00
A.2.2,Final grading,1,Job,$10000.00,$10000.00
B.1.1,Concrete footings,120,Cu. Yd.,$350.00,$42000.00
B.2.1,Concrete foundation walls,450,Sq. Ft.,$125.00,$56250.00
B.3.1,Foundation waterproofing,450,Sq. Ft.,$35.00,$15750.00
B.4.1,Drainage system installation,1,Job,$28500.00,$28500.00
B.5.1,Backfill and compaction,1,Job,$18750.00,$18750.00
B.5.2,Structural steel,25,Tons,$800.00,$20000.00

Subtotal,$245000.00
Tax (8.5%),$20825.00
Total,$265825.00
`

  return new NextResponse(csvContent, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="estimate-${params.id}.csv"`,
    },
  })
}

