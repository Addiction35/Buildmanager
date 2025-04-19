import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // In a real application, you would generate a PDF here
  // For this example, we'll just return a placeholder response

  return new NextResponse(
    `<html>
      <head>
        <title>Expense ${params.id} PDF View</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
          .logo { font-size: 24px; font-weight: bold; }
          .expense-info { margin-bottom: 30px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f8f9fa; }
          .text-right { text-align: right; }
          .receipt-image { width: 100%; max-width: 600px; border: 1px solid #ddd; padding: 10px; margin: 20px 0; }
          .footer { margin-top: 50px; font-size: 12px; color: #666; }
          .signature-area { margin-top: 40px; display: flex; justify-content: space-between; }
          .signature-line { border-top: 1px solid #000; width: 200px; padding-top: 5px; margin-top: 20px; }
          .status-approved { color: green; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">BuildPro</div>
          <div>
            <h1>EXPENSE RECEIPT</h1>
            <p>Expense #: ${params.id}</p>
            <p>Date: September 15, 2023</p>
            <p>Status: <span class="status-approved">Approved</span></p>
          </div>
        </div>
        
        <div class="expense-info">
          <p><strong>Description:</strong> Building Materials</p>
          <p><strong>Category:</strong> Materials</p>
          <p><strong>Project:</strong> Riverside Apartments</p>
          <p><strong>Amount:</strong> $2,450.00</p>
          <p><strong>Payment Method:</strong> Company Credit Card</p>
          <p><strong>Submitted By:</strong> John Smith</p>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th class="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Concrete Mix (80lb bags)</td>
              <td>50</td>
              <td>$12.50</td>
              <td class="text-right">$625.00</td>
            </tr>
            <tr>
              <td>Rebar #5 (20ft lengths)</td>
              <td>30</td>
              <td>$18.75</td>
              <td class="text-right">$562.50</td>
            </tr>
            <tr>
              <td>Lumber 2x4x8</td>
              <td>100</td>
              <td>$5.85</td>
              <td class="text-right">$585.00</td>
            </tr>
            <tr>
              <td>Plywood Sheets 4x8</td>
              <td>25</td>
              <td>$27.10</td>
              <td class="text-right">$677.50</td>
            </tr>
            <tr class="total-row">
              <td colspan="3" class="text-right">Total:</td>
              <td class="text-right">$2,450.00</td>
            </tr>
          </tbody>
        </table>
        
        <div>
          <p><strong>Notes:</strong></p>
          <p>Materials purchased for foundation work on Building B of the Riverside Apartments project.</p>
        </div>
        
        <div>
          <p><strong>Receipt Image:</strong></p>
          <div class="receipt-image">
            [Receipt Image Placeholder]
          </div>
        </div>
        
        <div class="signature-area">
          <div>
            <p>Submitted By:</p>
            <div class="signature-line">John Smith</div>
          </div>
          <div>
            <p>Approved By:</p>
            <div class="signature-line">Michael Scott</div>
          </div>
        </div>
        
        <div class="footer">
          <p>BuildPro Construction Management | 456 Business Ave, Metropolis, NY 10001 | (555) 123-4567 | accounting@buildpro.com</p>
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

