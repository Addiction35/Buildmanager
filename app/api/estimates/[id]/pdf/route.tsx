import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // In a real application, you would generate a PDF here
  // For this example, we'll just return a placeholder response

  return new NextResponse(
    `<html>
      <head>
        <title>Estimate ${params.id} PDF View</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
          .logo { font-size: 24px; font-weight: bold; }
          .estimate-info { margin-bottom: 30px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f8f9fa; }
          .text-right { text-align: right; }
          .total-row { font-weight: bold; }
          .footer { margin-top: 50px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">BuildPro</div>
          <div>
            <h1>ESTIMATE</h1>
            <p>Estimate #: ${params.id}</p>
            <p>Date: September 15, 2023</p>
          </div>
        </div>
        
        <div class="estimate-info">
          <div>
            <strong>Client:</strong><br>
            Riverside Development Corp<br>
            123 Main Street<br>
            Metropolis, NY 10001
          </div>
          <div style="margin-top: 20px;">
            <strong>Project:</strong><br>
            Riverside Apartments - Foundation
          </div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Unit Price</th>
              <th class="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Site Preparation and Excavation</td>
              <td>1</td>
              <td>Job</td>
              <td>$45,000.00</td>
              <td class="text-right">$45,000.00</td>
            </tr>
            <tr>
              <td>Concrete Footings</td>
              <td>120</td>
              <td>Cu. Yd.</td>
              <td>$350.00</td>
              <td class="text-right">$42,000.00</td>
            </tr>
            <tr>
              <td>Foundation Walls</td>
              <td>450</td>
              <td>Sq. Ft.</td>
              <td>$125.00</td>
              <td class="text-right">$56,250.00</td>
            </tr>
            <tr>
              <td>Waterproofing</td>
              <td>450</td>
              <td>Sq. Ft.</td>
              <td>$35.00</td>
              <td class="text-right">$15,750.00</td>
            </tr>
            <tr>
              <td>Drainage System</td>
              <td>1</td>
              <td>Job</td>
              <td>$28,500.00</td>
              <td class="text-right">$28,500.00</td>
            </tr>
            <tr>
              <td>Backfill and Compaction</td>
              <td>1</td>
              <td>Job</td>
              <td>$18,750.00</td>
              <td class="text-right">$18,750.00</td>
            </tr>
            <tr>
              <td>Structural Steel</td>
              <td>25</td>
              <td>Tons</td>
              <td>$1,550.00</td>
              <td class="text-right">$38,750.00</td>
            </tr>
            <tr class="total-row">
              <td colspan="4" class="text-right">Subtotal:</td>
              <td class="text-right">$245,000.00</td>
            </tr>
          </tbody>
        </table>
        
        <div>
          <p><strong>Notes:</strong></p>
          <p>This estimate is valid for 30 days from the date of issue. Any changes to the scope of work may result in price adjustments.</p>
          <p>Payment terms: 50% deposit upon acceptance, 50% upon completion.</p>
        </div>
        
        <div class="footer">
          <p>BuildPro Construction Management | 456 Business Ave, Metropolis, NY 10001 | (555) 123-4567 | info@buildpro.com</p>
        </div>
      </body>
    </html>`,
    {
      headers: {
        "Content-Type": "text/html",
      },
    },
  )
}

