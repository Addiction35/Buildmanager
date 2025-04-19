import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // In a real application, you would generate a PDF here
  // For this example, we'll just return a placeholder response

  return new NextResponse(
    `<html>
      <head>
        <title>Payroll ${params.id} PDF View</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
          .logo { font-size: 24px; font-weight: bold; }
          .payroll-info { margin-bottom: 30px; }
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
            <h1>PAYROLL REPORT</h1>
            <p>Payroll #: ${params.id}</p>
            <p>Period: Sep 1-15, 2023</p>
            <p>Payment Date: September 15, 2023</p>
          </div>
        </div>
        
        <div class="payroll-info">
          <p><strong>Total Employees:</strong> 12</p>
          <p><strong>Total Hours:</strong> 960 Regular, 45 Overtime</p>
          <p><strong>Total Gross Pay:</strong> $24,850.00</p>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Position</th>
              <th>Regular Hours</th>
              <th>Overtime Hours</th>
              <th>Hourly Rate</th>
              <th class="text-right">Gross Pay</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Smith</td>
              <td>Project Manager</td>
              <td>80</td>
              <td>5</td>
              <td>$45.00</td>
              <td class="text-right">$3,937.50</td>
            </tr>
            <tr>
              <td>Sarah Johnson</td>
              <td>Site Engineer</td>
              <td>80</td>
              <td>0</td>
              <td>$38.00</td>
              <td class="text-right">$3,040.00</td>
            </tr>
            <tr>
              <td>Michael Scott</td>
              <td>Foreman</td>
              <td>80</td>
              <td>8</td>
              <td>$32.00</td>
              <td class="text-right">$2,944.00</td>
            </tr>
            <tr>
              <td>Jim Halpert</td>
              <td>Safety Officer</td>
              <td>80</td>
              <td>0</td>
              <td>$30.00</td>
              <td class="text-right">$2,400.00</td>
            </tr>
            <tr>
              <td>Pam Beesly</td>
              <td>Architect</td>
              <td>80</td>
              <td>0</td>
              <td>$40.00</td>
              <td class="text-right">$3,200.00</td>
            </tr>
            <tr class="total-row">
              <td colspan="5" class="text-right">Total Gross Pay:</td>
              <td class="text-right">$24,850.00</td>
            </tr>
          </tbody>
        </table>
        
        <div>
          <h2>Deductions Summary</h2>
          <table>
            <thead>
              <tr>
                <th>Deduction Type</th>
                <th class="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Federal Income Tax</td>
                <td class="text-right">$3,727.50</td>
              </tr>
              <tr>
                <td>State Income Tax</td>
                <td class="text-right">$1,242.50</td>
              </tr>
              <tr>
                <td>Social Security</td>
                <td class="text-right">$1,540.70</td>
              </tr>
              <tr>
                <td>Medicare</td>
                <td class="text-right">$360.33</td>
              </tr>
              <tr>
                <td>Health Insurance</td>
                <td class="text-right">$850.00</td>
              </tr>
              <tr>
                <td>401(k) Contributions</td>
                <td class="text-right">$1,242.50</td>
              </tr>
              <tr class="total-row">
                <td class="text-right">Total Deductions:</td>
                <td class="text-right">$8,963.53</td>
              </tr>
              <tr class="total-row">
                <td class="text-right">Total Net Pay:</td>
                <td class="text-right">$15,886.47</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="footer">
          <p>BuildPro Construction Management | 456 Business Ave, Metropolis, NY 10001 | (555) 123-4567 | payroll@buildpro.com</p>
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

