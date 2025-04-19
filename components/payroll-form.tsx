"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash } from "lucide-react"
import { DatePicker } from "@/components/ui/date-picker"
import { useState } from "react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  payPeriodStart: z.date({
    required_error: "Pay period start date is required.",
  }),
  payPeriodEnd: z.date({
    required_error: "Pay period end date is required.",
  }),
  paymentDate: z.date({
    required_error: "Payment date is required.",
  }),
  employees: z
    .array(
      z.object({
        id: z.string(),
        name: z.string().min(2, {
          message: "Employee name is required.",
        }),
        position: z.string().min(2, {
          message: "Position is required.",
        }),
        regularHours: z.coerce.number().min(0, {
          message: "Regular hours must be a positive number.",
        }),
        overtimeHours: z.coerce.number().min(0, {
          message: "Overtime hours must be a positive number.",
        }),
        hourlyRate: z.coerce.number().min(0.01, {
          message: "Hourly rate must be greater than 0.",
        }),
      }),
    )
    .min(1, {
      message: "At least one employee is required.",
    }),
})

export function PayrollForm() {
  const router = useRouter()
  const [employees, setEmployees] = useState([
    { id: "EMP-001", name: "John Smith", position: "Project Manager" },
    { id: "EMP-002", name: "Sarah Johnson", position: "Site Engineer" },
    { id: "EMP-003", name: "Michael Scott", position: "Foreman" },
    { id: "EMP-004", name: "Jim Halpert", position: "Safety Officer" },
    { id: "EMP-005", name: "Pam Beesly", position: "Architect" },
  ])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employees: [
        {
          id: "EMP-001",
          name: "John Smith",
          position: "Project Manager",
          regularHours: 80,
          overtimeHours: 5,
          hourlyRate: 45,
        },
        {
          id: "EMP-002",
          name: "Sarah Johnson",
          position: "Site Engineer",
          regularHours: 80,
          overtimeHours: 0,
          hourlyRate: 38,
        },
      ],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // In a real app, you would send this to your API
    alert("Payroll created successfully!")
    router.push("/dashboard/wages")
  }

  function addEmployee() {
    const currentEmployees = form.getValues("employees") || []
    const availableEmployees = employees.filter((emp) => !currentEmployees.some((current) => current.id === emp.id))

    if (availableEmployees.length > 0) {
      const newEmployee = availableEmployees[0]
      form.setValue("employees", [
        ...currentEmployees,
        {
          id: newEmployee.id,
          name: newEmployee.name,
          position: newEmployee.position,
          regularHours: 0,
          overtimeHours: 0,
          hourlyRate: 0,
        },
      ])
    }
  }

  function removeEmployee(index: number) {
    const employees = form.getValues("employees")
    if (employees.length > 1) {
      form.setValue(
        "employees",
        employees.filter((_, i) => i !== index),
      )
    }
  }

  // Calculate totals
  const calculateTotals = () => {
    const employees = form.getValues("employees") || []

    const regularTotal = employees.reduce((sum, emp) => sum + emp.regularHours * emp.hourlyRate, 0)

    const overtimeTotal = employees.reduce((sum, emp) => sum + emp.overtimeHours * emp.hourlyRate * 1.5, 0)

    const grossTotal = regularTotal + overtimeTotal

    // Estimated taxes (simplified)
    const taxesTotal = grossTotal * 0.2

    const netTotal = grossTotal - taxesTotal

    return {
      regularTotal,
      overtimeTotal,
      grossTotal,
      taxesTotal,
      netTotal,
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-3">
          <FormField
            control={form.control}
            name="payPeriodStart"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Pay Period Start</FormLabel>
                <DatePicker selected={field.value} onSelect={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="payPeriodEnd"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Pay Period End</FormLabel>
                <DatePicker selected={field.value} onSelect={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Payment Date</FormLabel>
                <DatePicker selected={field.value} onSelect={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Employees</h3>
            <Button type="button" variant="outline" size="sm" onClick={addEmployee}>
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </div>

          {form.getValues("employees")?.map((_, index) => (
            <div key={index} className="grid gap-4 p-4 border rounded-md">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Employee {index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeEmployee(index)}
                  disabled={form.getValues("employees")?.length <= 1}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name={`employees.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`employees.${index}.position`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name={`employees.${index}.regularHours`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Regular Hours</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`employees.${index}.overtimeHours`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Overtime Hours</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`employees.${index}.hourlyRate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hourly Rate ($)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        <Tabs defaultValue="summary">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="deductions">Deductions & Taxes</TabsTrigger>
          </TabsList>
          <TabsContent value="summary" className="p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-4">Payroll Summary</h3>
            <div className="space-y-4">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-2">Employee</th>
                    <th className="text-right py-2">Regular Pay</th>
                    <th className="text-right py-2">Overtime Pay</th>
                    <th className="text-right py-2">Gross Pay</th>
                  </tr>
                </thead>
                <tbody>
                  {form.getValues("employees")?.map((employee, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2">{employee.name}</td>
                      <td className="text-right py-2">${(employee.regularHours * employee.hourlyRate).toFixed(2)}</td>
                      <td className="text-right py-2">
                        ${(employee.overtimeHours * employee.hourlyRate * 1.5).toFixed(2)}
                      </td>
                      <td className="text-right py-2">
                        $
                        {(
                          employee.regularHours * employee.hourlyRate +
                          employee.overtimeHours * employee.hourlyRate * 1.5
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="font-medium">
                    <td className="text-right py-2" colSpan={3}>
                      Total Gross Pay:
                    </td>
                    <td className="text-right py-2">${calculateTotals().grossTotal.toFixed(2)}</td>
                  </tr>
                  <tr className="font-medium">
                    <td className="text-right py-2" colSpan={3}>
                      Estimated Taxes & Deductions:
                    </td>
                    <td className="text-right py-2">${calculateTotals().taxesTotal.toFixed(2)}</td>
                  </tr>
                  <tr className="font-medium">
                    <td className="text-right py-2" colSpan={3}>
                      Total Net Pay:
                    </td>
                    <td className="text-right py-2">${calculateTotals().netTotal.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="deductions" className="p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-4">Deductions & Taxes</h3>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <FormLabel>Federal Income Tax Rate (%)</FormLabel>
                  <Input type="number" min="0" max="100" step="0.01" defaultValue="15" />
                </div>
                <div>
                  <FormLabel>State Income Tax Rate (%)</FormLabel>
                  <Input type="number" min="0" max="100" step="0.01" defaultValue="5" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <FormLabel>Social Security Rate (%)</FormLabel>
                  <Input type="number" min="0" max="100" step="0.01" defaultValue="6.2" />
                </div>
                <div>
                  <FormLabel>Medicare Rate (%)</FormLabel>
                  <Input type="number" min="0" max="100" step="0.01" defaultValue="1.45" />
                </div>
              </div>
              <div>
                <FormLabel>Additional Deductions</FormLabel>
                <Select defaultValue="none">
                  <SelectTrigger>
                    <SelectValue placeholder="Select deduction type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="401k">401(k)</SelectItem>
                    <SelectItem value="health">Health Insurance</SelectItem>
                    <SelectItem value="dental">Dental Insurance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit">Create Payroll</Button>
        </div>
      </form>
    </Form>
  )
}

