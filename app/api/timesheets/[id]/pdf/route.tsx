import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // In a real application, you would generate a PDF here
  // For this example, we'll just return a placeholder response

  return new NextResponse(
    `<html>
      <head>
        <title>Timesheet ${params.id} PDF View</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
          .logo { font-size: 24px; font-weight: bold; }
          .timesheet-info { margin-bottom: 30px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f8f9fa; }
          .text-right { text-align: right; }
          .total-row { font-weight: bold; }
          .footer { margin-top: 50px; font-size: 12px; color: #666; }
          .signature-area { margin-top: 40px; display: flex; justify-content: space-between; }
          .signature-line { border-top: 1px solid #000; width: 200px; padding-top: 5px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">BuildPro</div>
          <div>
            <h1>TIMESHEET</h1>
            <p>Timesheet #: ${params.id}</p>
            <p>Week: Sep 11-17, 2023</p>
          </div>
        </div>
        
        <div class="timesheet-info">
          <p><strong>Employee:</strong> John Smith</p>
          <p><strong>Position:</strong> Project Manager</p>
          <p><strong>Project:</strong> Riverside Apartments</p>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Date</th>
              <th>Regular Hours</th>
              <th>Overtime Hours</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Monday</td>
              <td>Sep 11, 2023</td>
              <td>8.0</td>
              <td>0.0</td>
              <td>Project planning meeting</td>
            </tr>
            <tr>
              <td>Tuesday</td>
              <td>Sep 12, 2023</td>
              <td>8.0</td>
              <td>0.0</td>
              <td>Site inspection</td>
            </tr>
            <tr>
              <td>Wednesday</td>
              <td>Sep 13, 2023</td>
              <td>8.0</td>
              <td>1.5</td>
              <td>Contractor coordination</td>
            </tr>
            <tr>
              <td>Thursday</td>
              <td>Sep 14, 2023</td>
              <td>8.0</td>
              <td>2.0</td>
              <td>Permit issue resolution</td>
            </tr>
            <tr>
              <td>Friday</td>
              <td>Sep 15, 2023</td>
              <td>8.0</td>
              <td>1.0</td>
              <td>Client meeting</td>
            </tr>
            <tr>
              <td>Saturday</td>
              <td>Sep 16, 2023</td>
              <td>2.5</td>
              <td>0.0</td>
              <td>Documentation</td>
            </tr>
            <tr>
              <td>Sunday</td>
              <td>Sep 17, 2023</td>
              <td>0.0</td>
              <td>0.0</td>
              <td>Off</td>
            </tr>
            <tr class="total-row">
              <td colspan="2" class="text-right">Total Hours:</td>
              <td>42.5</td>
              <td>4.5</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        
        <div>
          <p><strong>Additional Notes:</strong></p>
          <p>Overtime on Wednesday through Friday was required to address permit issues and prepare for client presentation.</p>
        </div>
        
        <div class="signature-area">
          <div>
            <p>Employee Signature:</p>
            <div class="signature-line">John Smith</div>
          </div>
          <div>
            <p>Supervisor Approval:</p>
            <div class="signature-line">Robert Johnson</div>
          </div>
        </div>
        
        <div class="footer">
          <p>BuildPro Construction Management | 456 Business Ave, Metropolis, NY 10001 | (555) 123-4567 | hr@buildpro.com</p>
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

