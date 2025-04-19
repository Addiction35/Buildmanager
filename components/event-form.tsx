"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

// Define the form schema
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Event title must be at least 2 characters.",
  }),
  type: z.enum(["Meeting", "Site Visit", "Delivery", "Inspection", "Other"]),
  date: z.string().min(1, {
    message: "Date is required.",
  }),
  startTime: z.string().min(1, {
    message: "Start time is required.",
  }),
  endTime: z.string().min(1, {
    message: "End time is required.",
  }),
  location: z.string().min(2, {
    message: "Location is required.",
  }),
  description: z.string().optional(),
  projectId: z.string().min(1, {
    message: "Project is required.",
  }),
  attendees: z.array(z.string()).min(1, {
    message: "At least one attendee is required.",
  }),
})

type FormValues = z.infer<typeof formSchema>

interface Event {
  id: string
  title: string
  type: "Meeting" | "Site Visit" | "Delivery" | "Inspection" | "Other"
  date: string
  startTime: string
  endTime: string
  location: string
  description?: string
  projectId: string
  attendees: string[]
}

interface EventFormProps {
  event?: Event
  mode: "create" | "edit"
}

export function EventForm({ event, mode }: EventFormProps) {
  const { toast } = useToast()
  const router = useRouter()

  // Initialize form with default values or existing event data
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: event
      ? {
          ...event,
        }
      : {
          title: "",
          type: "Meeting",
          date: new Date().toISOString().split("T")[0],
          startTime: "09:00",
          endTime: "10:00",
          location: "",
          description: "",
          projectId: "",
          attendees: [],
        },
  })

  // Update form values when event changes
  useEffect(() => {
    if (event && mode === "edit") {
      form.reset({
        ...event,
      })
    }
  }, [event, form, mode])

  // Handle form submission
  async function onSubmit(values: FormValues) {
    try {
      // In a real app, this would call an API
      console.log(values)

      toast({
        title: `Event ${mode === "create" ? "created" : "updated"}`,
        description: `The event has been ${mode === "create" ? "created" : "updated"} successfully`,
      })

      // Redirect to schedule page
      router.push("/dashboard/schedule")
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${mode === "create" ? "create" : "update"} the event. Please try again.`,
        variant: "destructive",
      })
    }
  }

  // Sample projects for dropdown
  const projects = [
    { id: "PRJ-1234", name: "Riverside Apartments" },
    { id: "PRJ-5678", name: "Oakwood Office Complex" },
    { id: "PRJ-9012", name: "Sunset Heights Condos" },
    { id: "PRJ-3456", name: "Greenfield Shopping Mall" },
    { id: "PRJ-7890", name: "Lakeside Medical Center" },
  ]

  // Sample team members for attendees
  const teamMembers = [
    { id: "USR-001", name: "John Doe" },
    { id: "USR-002", name: "Sarah Johnson" },
    { id: "USR-003", name: "Michael Scott" },
    { id: "USR-004", name: "Jim Halpert" },
    { id: "USR-005", name: "Pam Beesly" },
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Meeting">Meeting</SelectItem>
                    <SelectItem value="Site Visit">Site Visit</SelectItem>
                    <SelectItem value="Delivery">Delivery</SelectItem>
                    <SelectItem value="Inspection">Inspection</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Related Project</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a project" />
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
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter event description" className="min-h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="attendees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attendees</FormLabel>
              <div className="space-y-2">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`attendee-${member.id}`}
                      value={member.id}
                      checked={field.value.includes(member.id)}
                      onChange={(e) => {
                        const checked = e.target.checked
                        const value = e.target.value
                        const newValues = checked ? [...field.value, value] : field.value.filter((v) => v !== value)
                        field.onChange(newValues)
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor={`attendee-${member.id}`} className="text-sm">
                      {member.name}
                    </label>
                  </div>
                ))}
              </div>
              <FormDescription>Select team members who will attend this event</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/schedule")}>
            Cancel
          </Button>
          <Button type="submit">{mode === "create" ? "Create Event" : "Update Event"}</Button>
        </div>
      </form>
    </Form>
  )
}

