import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // In a real application, you would generate a PDF here
  // For this example, we'll just return a placeholder response

  return new NextResponse(
    `<html>
      <head>
        <title>Purchase Order ${params.id} PDF View</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
          .logo { font-size: 24px; font-weight: bold; }
          .po-info { margin-bottom: 30px; }
          .addresses { display: flex; justify-content: space-between; margin-bottom: 30px; }
          .address-block { width: 45%; }
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
            <h1>PURCHASE ORDER</h1>
            <p>PO #: ${params.id}</p>
            <p>Date: September 15, 2023</p>
          </div>
        </div>
        
        <div class="po-info">
          <p><strong>Project:</strong> Riverside Apartments</p>
          <p><strong>Delivery Date:</strong> September 30, 2023</p>
        </div>
        
        <div class="addresses">
          <div class="address-block">
            <strong>Vendor:</strong><br>
            ABC Building Supplies<br>
            789 Vendor Street<br>
            Metropolis, NY 10001<br>
            Phone: (555) 987-6543
          </div>
          
          <div class="address-block">
            <strong>Ship To:</strong><br>
            Riverside Apartments Construction Site<br>
            123 Riverside Drive<br>
            Metropolis, NY 10001<br>
            Attn: John Smith, Site Manager
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
              <td>Concrete Mix Type II</td>
              <td>150</td>
              <td>Bags</td>
              <td>$12.50</td>
              <td class="text-right">$1,875.00</td>
            </tr>
            <tr>
              <td>Rebar #5 (5/8")</td>
              <td>500</td>
              <td>Ft.</td>
              <td>$2.75</td>
              <td class="text-right">$1,375.00</td>
            </tr>
            <tr>
              <td>Waterproofing Membrane</td>
              <td>20</td>
              <td>Rolls</td>
              <td>$185.00</td>
              <td class="text-right">$3,700.00</td>
            </tr>
            <tr>
              <td>Foundation Drain Pipe (4")</td>
              <td>300</td>
              <td>Ft.</td>
              <td>$4.25</td>
              <td class="text-right">$1,275.00</td>
            </tr>
            <tr>
              <td>Structural Steel Beams</td>
              <td>15</td>
              <td>Pieces</td>
              <td>$950.00</td>
              <td class="text-right">$14,250.00</td>
            </tr>
            <tr>
              <td>Anchor Bolts Kit</td>
              <td>25</td>
              <td>Sets</td>
              <td>$45.00</td>
              <td class="text-right">$1,125.00</td>
            </tr>
            <tr>
              <td>Delivery Fee</td>
              <td>1</td>
              <td>Service</td>
              <td>$900.00</td>
              <td class="text-right">$900.00</td>
            </tr>
            <tr class="total-row">
              <td colspan="4" class="text-right">Subtotal:</td>
              <td class="text-right">$24,500.00</td>
            </tr>
          </tbody>
        </table>
        
        <div>
          <p><strong>Terms and Conditions:</strong></p>
          <p>1. Please reference PO number on all invoices and correspondence.</p>
          <p>2. Payment terms: Net 30 days from receipt of goods.</p>
          <p>3. All materials must meet specifications as outlined in project documents.</p>
          <p>4. Delivery must be scheduled 24 hours in advance with site manager.</p>
        </div>
        
        <div style="margin-top: 40px;">
          <p><strong>Authorized by:</strong> ________________________</p>
          <p><strong>Date:</strong> ________________________</p>
        </div>
        
        <div class="footer">
          <p>BuildPro Construction Management | 456 Business Ave, Metropolis, NY 10001 | (555) 123-4567 | procurement@buildpro.com</p>
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

