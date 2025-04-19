"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { projectsApi, clientsApi } from "@/lib/api-service"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  projectId: z.string().min(1, {
    message: "Project is required.",
  }),
  clientId: z.string().min(1, {
    message: "Client is required.",
  }),
  category: z.string().min(2, {
    message: "Please select a category.",
  }),
  description: z.string().optional(),
  items: z
    .array(
      z.object({
        description: z.string().min(2, {
          message: "Description is required.",
        }),
        quantity: z.coerce.number().min(1, {
          message: "Quantity must be at least 1.",
        }),
        unit: z.string().min(1, {
          message: "Unit is required.",
        }),
        unitPrice: z.coerce.number().min(0.01, {
          message: "Unit price must be greater than 0.",
        }),
      }),
    )
    .min(1, {
      message: "At least one item is required.",
    }),
})

interface EstimateFormProps {
  projectId?: string
}

export function EstimateForm({ projectId }: EstimateFormProps) {
  const { toast } = useToast()
  const router = useRouter()

  // Fetch projects for dropdown
  const { data: projects = [], isLoading: isProjectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: projectsApi.getAll,
  })

  // Fetch clients for dropdown
  const { data: clients = [], isLoading: isClientsLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: clientsApi.getAll,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      projectId: projectId || "",
      clientId: "",
      category: "",
      description: "",
      items: [{ description: "", quantity: 1, unit: "", unitPrice: 0 }],
    },
  })

  // If projectId is provided, set the client automatically when project data is loaded
  const selectedProjectId = form.watch("projectId")

  // When project changes, update client if possible
  const { data: selectedProject } = useQuery({
    queryKey: ["project", selectedProjectId],
    queryFn: () => (selectedProjectId ? projectsApi.getById(selectedProjectId) : null),
    enabled: !!selectedProjectId,
    onSuccess: (data) => {
      if (data && data.client) {
        form.setValue("clientId", data.client.id)
      }
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // In a real app, you would send this to your API
    toast({
      title: "Estimate created",
      description: "Your estimate has been created successfully.",
    })

    // Navigate back to the project estimates page or estimates list
    if (values.projectId) {
      router.push(`/dashboard/projects/${values.projectId}/estimates`)
    } else {
      router.push("/dashboard/estimates")
    }
  }

  function addItem() {
    const items = form.getValues("items")
    form.setValue("items", [...items, { description: "", quantity: 1, unit: "", unitPrice: 0 }])
  }

  function removeItem(index: number) {
    const items = form.getValues("items")
    if (items.length > 1) {
      form.setValue(
        "items",
        items.filter((_, i) => i !== index),
      )
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimate Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Riverside Apartments - Foundation Work" {...field} />
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
                <FormLabel>Project</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isProjectsLoading ? (
                      <SelectItem value="loading" disabled>
                        Loading projects...
                      </SelectItem>
                    ) : projects.length === 0 ? (
                      <SelectItem value="none" disabled>
                        No projects available
                      </SelectItem>
                    ) : (
                      projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isClientsLoading ? (
                      <SelectItem value="loading" disabled>
                        Loading clients...
                      </SelectItem>
                    ) : clients.length === 0 ? (
                      <SelectItem value="none" disabled>
                        No clients available
                      </SelectItem>
                    ) : (
                      clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="residential-new-single">
                      Residential - New Construction - Single Family
                    </SelectItem>
                    <SelectItem value="residential-new-multi">Residential - New Construction - Multi Family</SelectItem>
                    <SelectItem value="residential-renovation">Residential - Renovation</SelectItem>
                    <SelectItem value="commercial-office">Commercial - Office Buildings</SelectItem>
                    <SelectItem value="commercial-retail">Commercial - Retail</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
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
                <Textarea
                  placeholder="Provide a detailed description of the estimate"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Line Items</h3>
            <Button type="button" variant="outline" size="sm" onClick={addItem}>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>

          {form.getValues("items").map((_, index) => (
            <div key={index} className="grid gap-4 p-4 border rounded-md">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Item {index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(index)}
                  disabled={form.getValues("items").length <= 1}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>

              <FormField
                control={form.control}
                name={`items.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Item description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name={`items.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`items.${index}.unit`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. hours, sq ft, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`items.${index}.unitPrice`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit Price ($)</FormLabel>
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

        <Tabs defaultValue="preview">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-4">Estimate Preview</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Title:</p>
                  <p className="text-sm">{form.getValues("title") || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Project:</p>
                  <p className="text-sm">
                    {projects.find((p) => p.id === form.getValues("projectId"))?.name || "Not specified"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium">Description:</p>
                <p className="text-sm">{form.getValues("description") || "No description provided"}</p>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Items:</p>
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left py-2">Description</th>
                      <th className="text-right py-2">Quantity</th>
                      <th className="text-right py-2">Unit</th>
                      <th className="text-right py-2">Unit Price</th>
                      <th className="text-right py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.getValues("items").map((item, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-2">{item.description || "Not specified"}</td>
                        <td className="text-right py-2">{item.quantity}</td>
                        <td className="text-right py-2">{item.unit || "N/A"}</td>
                        <td className="text-right py-2">${item.unitPrice.toFixed(2)}</td>
                        <td className="text-right py-2">${(item.quantity * item.unitPrice).toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="font-medium">
                      <td colSpan={4} className="text-right py-2">
                        Total:
                      </td>
                      <td className="text-right py-2">
                        $
                        {form
                          .getValues("items")
                          .reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
                          .toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="settings" className="p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-4">Estimate Settings</h3>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <FormLabel>Tax Rate (%)</FormLabel>
                  <Input type="number" min="0" max="100" step="0.01" defaultValue="8.5" />
                </div>
                <div>
                  <FormLabel>Discount (%)</FormLabel>
                  <Input type="number" min="0" max="100" step="0.01" defaultValue="0" />
                </div>
              </div>
              <div>
                <FormLabel>Terms & Conditions</FormLabel>
                <Textarea
                  className="min-h-[120px]"
                  defaultValue="This estimate is valid for 30 days from the date of issue. Payment terms are 50% deposit upon acceptance and 50% upon completion."
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit">Create Estimate</Button>
        </div>
      </form>
    </Form>
  )
}

