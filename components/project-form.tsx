"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useProjects, type Project, type ProjectStatus } from "@/hooks/use-projects"
import { useEffect } from "react"

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  client: z.string().min(2, {
    message: "Client name is required.",
  }),
  status: z.enum(["Planning", "In Progress", "On Hold", "Completed", "Cancelled"] as const),
  budget: z.coerce.number().min(0, {
    message: "Budget must be a positive number.",
  }),
  completion: z.coerce.number().min(0).max(100, {
    message: "Completion must be between 0 and 100.",
  }),
  dueDate: z.string().min(1, {
    message: "Due date is required.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  location: z.string().min(2, {
    message: "Location is required.",
  }),
  manager: z.object({
    id: z.string(),
    name: z.string(),
  }),
})

type FormValues = z.infer<typeof formSchema>

interface ProjectFormProps {
  project?: Project
  mode: "create" | "edit"
}

export function ProjectForm({ project, mode }: ProjectFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const { createProject, isCreating, updateProject, isUpdating } = useProjects()

  // Initialize form with default values or existing project data
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: project
      ? {
          ...project,
        }
      : {
          name: "",
          client: "",
          status: "Planning" as ProjectStatus,
          budget: 0,
          completion: 0,
          dueDate: new Date().toISOString().split("T")[0],
          description: "",
          location: "",
          manager: {
            id: "USR-001",
            name: "John Doe",
          },
        },
  })

  // Update form values when project changes
  useEffect(() => {
    if (project && mode === "edit") {
      form.reset({
        ...project,
      })
    }
  }, [project, form, mode])

  // Handle form submission
  async function onSubmit(values: FormValues) {
    try {
      if (mode === "create") {
        // Create new project
        await createProject(values)
        toast({
          title: "Project created",
          description: "The project has been created successfully",
        })
      } else {
        // Update existing project
        if (!project) return

        await updateProject({
          id: project.id,
          ...values,
        })
        toast({
          title: "Project updated",
          description: "The project has been updated successfully",
        })
      }

      // Redirect to projects page
      router.push("/dashboard/projects")
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${mode === "create" ? "create" : "update"} the project. Please try again.`,
        variant: "destructive",
      })
    }
  }

  // List of project managers (would come from API in a real app)
  const projectManagers = [
    { id: "USR-001", name: "John Doe" },
    { id: "USR-002", name: "Sarah Johnson" },
    { id: "USR-003", name: "Michael Scott" },
    { id: "USR-004", name: "Jim Halpert" },
    { id: "USR-005", name: "Pam Beesly" },
  ]

  const isSubmitting = isCreating || isUpdating

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter project name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="client"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client</FormLabel>
                <FormControl>
                  <Input placeholder="Enter client name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Planning">Planning</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget ($)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="1000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="completion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Completion ({field.value}%)</FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    defaultValue={[field.value]}
                    onValueChange={(values) => field.onChange(values[0])}
                    className="py-4"
                  />
                </FormControl>
                <FormDescription>Drag the slider to set the project completion percentage</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
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
                <Textarea placeholder="Enter project description" className="min-h-[120px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter project location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="manager"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Manager</FormLabel>
                <Select
                  onValueChange={(value) => {
                    const manager = projectManagers.find((m) => m.id === value)
                    if (manager) {
                      field.onChange(manager)
                    }
                  }}
                  defaultValue={field.value.id}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project manager" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {projectManagers.map((manager) => (
                      <SelectItem key={manager.id} value={manager.id}>
                        {manager.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/projects")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>{mode === "create" ? "Creating..." : "Updating..."}</>
            ) : (
              <>{mode === "create" ? "Create Project" : "Update Project"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

