"use client"

import { useEffect, useState } from "react"
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
import { DatePicker } from "@/components/ui/date-picker"
import { Card, CardContent } from "@/components/ui/card"
import { getData, simulateApiDelay } from "@/lib/dummy-data"
import { Skeleton } from "@/components/ui/skeleton"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  client: z.string().min(2, {
    message: "Client name is required.",
  }),
  projectId: z.string().min(2, {
    message: "Project is required.",
  }),
  expiryDate: z.date({
    required_error: "Expiry date is required.",
  }),
  clientAddress: z.string().min(2, {
    message: "Client address is required.",
  }),
  introduction: z.string().min(10, {
    message: "Introduction must be at least 10 characters.",
  }),
  scope: z.string().min(10, {
    message: "Scope of work must be at least 10 characters.",
  }),
  sections: z
    .array(
      z.object({
        title: z.string().min(2, {
          message: "Section title is required.",
        }),
        content: z.string().min(10, {
          message: "Section content must be at least 10 characters.",
        }),
      }),
    )
    .optional(),
  pricing: z
    .array(
      z.object({
        description: z.string().min(2, {
          message: "Description is required.",
        }),
        amount: z.coerce.number().min(0.01, {
          message: "Amount must be greater than 0.",
        }),
      }),
    )
    .min(1, {
      message: "At least one pricing item is required.",
    }),
})

interface ProposalFormProps {
  defaultValues?: any
}

export function ProposalForm({ defaultValues }: ProposalFormProps) {
  const [projects, setProjects] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        await simulateApiDelay()
        const projectsData = getData("projects")
        const clientsData = getData("clients")
        setProjects(projectsData)
        setClients(clientsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      title: "",
      client: "",
      projectId: "",
      clientAddress: "",
      introduction:
        "Thank you for the opportunity to submit this proposal. We are excited about the possibility of working with you on this project.",
      scope: "",
      sections: [
        { title: "Timeline", content: "" },
        { title: "Methodology", content: "" },
      ],
      pricing: [{ description: "", amount: 0 }],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // In a real app, you would send this to your API
    alert("Proposal saved successfully!")
  }

  function addSection() {
    const sections = form.getValues("sections") || []
    form.setValue("sections", [...sections, { title: "", content: "" }])
  }

  function removeSection(index: number) {
    const sections = form.getValues("sections") || []
    form.setValue(
      "sections",
      sections.filter((_, i) => i !== index),
    )
  }

  function addPricing() {
    const pricing = form.getValues("pricing")
    form.setValue("pricing", [...pricing, { description: "", amount: 0 }])
  }

  function removePricing(index: number) {
    const pricing = form.getValues("pricing")
    if (pricing.length > 1) {
      form.setValue(
        "pricing",
        pricing.filter((_, i) => i !== index),
      )
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-[600px] w-full" />
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proposal Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Riverside Apartments Development Proposal" {...field} />
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
                      <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                        <SelectContent>
                          {clients.map((client) => (
                            <SelectItem key={client.id} value={client.name}>
                              {client.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2 mt-6">
              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent>
                          {projects.map((project) => (
                            <SelectItem key={project.id} value={project.id}>
                              {project.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Expiry Date</FormLabel>
                    <DatePicker selected={field.value} onSelect={field.onChange} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-6">
              <FormField
                control={form.control}
                name="clientAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter client address" className="min-h-[80px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <FormField
              control={form.control}
              name="introduction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Introduction</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Introduce your company and the proposal"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-6">
              <FormField
                control={form.control}
                name="scope"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scope of Work</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the scope of work for this project"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Additional Sections</h3>
                <Button type="button" variant="outline" size="sm" onClick={addSection}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Section
                </Button>
              </div>

              {(form.getValues("sections") || []).map((_, index) => (
                <div key={index} className="grid gap-4 p-4 border rounded-md">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Section {index + 1}</h4>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeSection(index)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>

                  <FormField
                    control={form.control}
                    name={`sections.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Timeline, Methodology, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`sections.${index}.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Section content" className="min-h-[120px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Pricing</h3>
                <Button type="button" variant="outline" size="sm" onClick={addPricing}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </div>

              {form.getValues("pricing").map((_, index) => (
                <div key={index} className="grid gap-4 p-4 border rounded-md">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Item {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removePricing(index)}
                      disabled={form.getValues("pricing").length <= 1}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name={`pricing.${index}.description`}
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

                    <FormField
                      control={form.control}
                      name={`pricing.${index}.amount`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount ($)</FormLabel>
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
          </CardContent>
        </Card>

        <Tabs defaultValue="preview">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-4">Proposal Preview</h3>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold">{form.getValues("title") || "Untitled Proposal"}</h2>
                <p className="text-sm text-muted-foreground">
                  Prepared for: {form.getValues("client") || "Client Name"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Valid until: {form.getValues("expiryDate")?.toLocaleDateString() || "Not specified"}
                </p>
              </div>

              <div>
                <h3 className="text-md font-medium">Introduction</h3>
                <p className="text-sm mt-2">{form.getValues("introduction") || "No introduction provided"}</p>
              </div>

              <div>
                <h3 className="text-md font-medium">Scope of Work</h3>
                <p className="text-sm mt-2">{form.getValues("scope") || "No scope provided"}</p>
              </div>

              {(form.getValues("sections") || []).map((section, i) => (
                <div key={i}>
                  <h3 className="text-md font-medium">{section.title || `Section ${i + 1}`}</h3>
                  <p className="text-sm mt-2">{section.content || "No content provided"}</p>
                </div>
              ))}

              <div>
                <h3 className="text-md font-medium mb-2">Pricing</h3>
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left py-2">Description</th>
                      <th className="text-right py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.getValues("pricing").map((item, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-2">{item.description || "Not specified"}</td>
                        <td className="text-right py-2">${item.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="font-medium">
                      <td className="text-right py-2">Total:</td>
                      <td className="text-right py-2">
                        $
                        {form
                          .getValues("pricing")
                          .reduce((sum, item) => sum + item.amount, 0)
                          .toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="terms" className="p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-4">Terms & Conditions</h3>
            <div className="space-y-4">
              <div>
                <FormLabel>Payment Terms</FormLabel>
                <Select defaultValue="50-50">
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50-50">50% upfront, 50% upon completion</SelectItem>
                    <SelectItem value="30-40-30">30% upfront, 40% midway, 30% upon completion</SelectItem>
                    <SelectItem value="monthly">Monthly installments</SelectItem>
                    <SelectItem value="custom">Custom payment schedule</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <FormLabel>Terms & Conditions</FormLabel>
                <Textarea
                  className="min-h-[200px]"
                  defaultValue="1. This proposal is valid for 30 days from the date of issue.
2. Any changes to the scope of work may result in price adjustments.
3. The timeline provided is an estimate and may be subject to change based on unforeseen circumstances.
4. Payment terms are 50% deposit upon acceptance and 50% upon completion unless otherwise specified.
5. All materials and workmanship are guaranteed for a period of one year from the date of completion."
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit">Save Proposal</Button>
        </div>
      </form>
    </Form>
  )
}

