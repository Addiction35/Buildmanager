"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { useState } from "react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  employee: z.string({
    required_error: "Please select an employee.",
  }),
  project: z.string({
    required_error: "Please select a project.",
  }),
  weekStarting: z.date({
    required_error: "Week starting date is required.",
  }),
  days: z
    .array(
      z.object({
        date: z.date(),
        regularHours: z.coerce.number().min(0, {
          message: "Regular hours must be a positive number.",
        }),
        overtimeHours: z.coerce.number().min(0, {
          message: "Overtime hours must be a positive number.",
        }),
        notes: z.string().optional(),
      }),
    )
    .length(7, {
      message: "All days of the week must be filled out.",
    }),
  notes: z.string().optional(),
})

export function TimesheetForm() {
  const router = useRouter()
  const [employees, setEmployees] = useState([
    { id: "EMP-001", name: "John Smith" },
    { id: "EMP-002", name: "Sarah Johnson" },
    { id: "EMP-003", name: "Michael Scott" },
    { id: "EMP-004", name: "Jim Halpert" },
    { id: "EMP-005", name: "Pam Beesly" },
  ])

  const [projects, setProjects] = useState([
    { id: "PRJ-1234", name: "Riverside Apartments" },
    { id: "PRJ-5678", name: "Oakwood Office Complex" },
    { id: "PRJ-9012", name: "Sunset Heights Condos" },
    { id: "PRJ-3456", name: "Greenfield Shopping Mall" },
    { id: "PRJ-7890", name: "Lakeside Medical Center" },
  ])

  // Generate 7 days from the selected week starting date
  const generateWeekDays = (startDate: Date) => {
    const days = []
    const currentDate = new Date(startDate)

    for (let i = 0; i < 7; i++) {
      days.push({
        date: new Date(currentDate),
        regularHours: 8,
        overtimeHours: 0,
        notes: "",
      })
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return days
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee: "",
      project: "",
      notes: "",
    },
  })

  // When week starting date changes, update the days array
  const onWeekStartingChange = (date: Date) => {
    form.setValue("weekStarting", date)
    form.setValue("days", generateWeekDays(date))
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // In a real app, you would send this to your API
    alert("Timesheet created successfully!")
    router.push("/dashboard/wages/timesheets")
  }

  // Format date to display day of week
  const formatDay = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  // Calculate totals
  const calculateTotals = () => {
    const days = form.getValues("days") || []

    const regularTotal = days.reduce((sum, day) => sum + (day.regularHours || 0), 0)
    const overtimeTotal = days.reduce((sum, day) => sum + (day.overtimeHours || 0), 0)
    const totalHours = regularTotal + overtimeTotal

    return {
      regularTotal,
      overtimeTotal,
      totalHours,
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-3">
          <FormField
            control={form.control}
            name="employee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="project"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weekStarting"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Week Starting</FormLabel>
                <DatePicker selected={field.value} onSelect={(date) => date && onWeekStartingChange(date)} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {form.getValues("days") && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Daily Hours</h3>

            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Day</th>
                    <th className="text-center p-2">Regular Hours</th>
                    <th className="text-center p-2">Overtime Hours</th>
                    <th className="text-left p-2">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {form.getValues("days")?.map((_, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">
                        {form.getValues(`days.${index}.date`) && formatDay(form.getValues(`days.${index}.date`))}
                      </td>
                      <td className="p-2">
                        <FormField
                          control={form.control}
                          name={`days.${index}.regularHours`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input type="number" min="0" max="24" step="0.5" className="text-center" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </td>
                      <td className="p-2">
                        <FormField
                          control={form.control}
                          name={`days.${index}.overtimeHours`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input type="number" min="0" max="24" step="0.5" className="text-center" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </td>
                      <td className="p-2">
                        <FormField
                          control={form.control}
                          name={`days.${index}.notes`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Optional notes" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </td>
                    </tr>
                  ))}
                  <tr className="font-medium">
                    <td className="p-2">Totals</td>
                    <td className="p-2 text-center">{calculateTotals().regularTotal}</td>
                    <td className="p-2 text-center">{calculateTotals().overtimeTotal}</td>
                    <td className="p-2">Total Hours: {calculateTotals().totalHours}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any additional information about this timesheet"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit">Submit Timesheet</Button>
        </div>
      </form>
    </Form>
  )
}

