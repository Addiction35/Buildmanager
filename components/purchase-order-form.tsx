"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker } from "@/components/ui/date-picker"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { getData, simulateApiDelay } from "@/lib/dummy-data"
import { useQuery } from "@tanstack/react-query"

const formSchema = z.object({
  vendor: z.string().min(2, {
    message: "Vendor name is required.",
  }),
  projectId: z.string().min(2, {
    message: "Project is required.",
  }),
  deliveryDate: z.date({
    required_error: "Delivery date is required.",
  }),
  shippingAddress: z.string().min(2, {
    message: "Shipping address is required.",
  }),
  billingAddress: z.string().min(2, {
    message: "Billing address is required.",
  }),
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
  paymentTerms: z.string().optional(),
  notes: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

// List of common units for construction materials
const commonUnits = [
  { label: "Each", value: "each" },
  { label: "Box", value: "box" },
  { label: "Pallet", value: "pallet" },
  { label: "Square Foot", value: "sq ft" },
  { label: "Linear Foot", value: "ln ft" },
  { label: "Cubic Yard", value: "cu yd" },
  { label: "Ton", value: "ton" },
  { label: "Gallon", value: "gal" },
  { label: "Pound", value: "lb" },
  { label: "Bag", value: "bag" },
  { label: "Bundle", value: "bundle" },
  { label: "Roll", value: "roll" },
  { label: "Sheet", value: "sheet" },
  { label: "Hour", value: "hour" },
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
]

// Common construction materials
const commonMaterials = [
  { label: "Concrete (Ready Mix)", value: "Concrete (Ready Mix)" },
  { label: "Lumber - 2x4", value: "Lumber - 2x4" },
  { label: "Lumber - 2x6", value: "Lumber - 2x6" },
  { label: "Lumber - 4x4", value: "Lumber - 4x4" },
  { label: "Plywood (4x8 sheet)", value: "Plywood (4x8 sheet)" },
  { label: "Drywall (4x8 sheet)", value: "Drywall (4x8 sheet)" },
  { label: "Rebar #3", value: "Rebar #3" },
  { label: "Rebar #4", value: "Rebar #4" },
  { label: "Insulation (R-19)", value: "Insulation (R-19)" },
  { label: "Roofing Shingles", value: "Roofing Shingles" },
  { label: "Paint (Interior)", value: "Paint (Interior)" },
  { label: "Paint (Exterior)", value: "Paint (Exterior)" },
  { label: "Nails (Common)", value: "Nails (Common)" },
  { label: "Screws (Drywall)", value: "Screws (Drywall)" },
  { label: "Electrical Wire (12/2)", value: "Electrical Wire (12/2)" },
  { label: "PVC Pipe (1 inch)", value: "PVC Pipe (1 inch)" },
  { label: "Copper Pipe (1/2 inch)", value: "Copper Pipe (1/2 inch)" },
  { label: "Door (Interior)", value: "Door (Interior)" },
  { label: "Door (Exterior)", value: "Door (Exterior)" },
  { label: "Window (Standard)", value: "Window (Standard)" },
]

export function PurchaseOrderForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [sameAddress, setSameAddress] = useState(false)
  const [customMaterial, setCustomMaterial] = useState("")

  // Fetch projects for dropdown
  const { data: projects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      await simulateApiDelay()
      return getData("projects")
    },
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vendor: "",
      projectId: "",
      shippingAddress: "",
      billingAddress: "",
      deliveryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
      items: [{ description: "", quantity: 1, unit: "each", unitPrice: 0 }],
      paymentTerms: "net30",
      notes: "",
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  })

  // Update billing address when shipping address changes if "same address" is checked
  useEffect(() => {
    if (sameAddress) {
      const shippingAddress = form.getValues("shippingAddress")
      form.setValue("billingAddress", shippingAddress)
    }
  }, [sameAddress, form])

  // Handle shipping address change
  const handleShippingAddressChange = (value: string) => {
    form.setValue("shippingAddress", value)
    if (sameAddress) {
      form.setValue("billingAddress", value)
    }
  }

  function onSubmit(values: FormValues) {
    console.log(values)
    // In a real app, you would send this to your API
    toast({
      title: "Purchase order created",
      description: "Your purchase order has been created successfully.",
    })

    // Navigate back to purchase orders list
    setTimeout(() => {
      router.push("/dashboard/purchase-orders")
    }, 1500)
  }

  function addItem() {
    append({ description: "", quantity: 1, unit: "each", unitPrice: 0 })
  }

  function removeItem(index: number) {
    if (fields.length > 1) {
      remove(index)
    }
  }

  // Calculate subtotal
  const subtotal = form.watch("items").reduce((sum, item) => {
    return sum + (item.quantity || 0) * (item.unitPrice || 0)
  }, 0)

  // Calculate tax (8.5%)
  const tax = subtotal * 0.085

  // Calculate total
  const total = subtotal + tax

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="vendor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vendor</FormLabel>
                <FormControl>
                  <Input placeholder="Vendor name" {...field} />
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

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="deliveryDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Delivery Date</FormLabel>
                <DatePicker selected={field.value} onSelect={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-end">
            <Checkbox
              id="same-address"
              checked={sameAddress}
              onCheckedChange={(checked) => setSameAddress(checked === true)}
            />
            <label
              htmlFor="same-address"
              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Billing address same as shipping
            </label>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="shippingAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shipping Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter shipping address"
                    className="min-h-[80px]"
                    {...field}
                    onChange={(e) => handleShippingAddressChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="billingAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billing Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter billing address"
                    className="min-h-[80px]"
                    {...field}
                    disabled={sameAddress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Order Items</h3>
            <Button type="button" variant="outline" size="sm" onClick={addItem}>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="grid gap-4 p-4 border rounded-md">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Item {index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(index)}
                  disabled={fields.length <= 1}
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
                    <div className="flex gap-2">
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            if (value === "custom") {
                              // If custom is selected, don't update the field yet
                              setCustomMaterial("")
                            } else {
                              field.onChange(value)
                              setCustomMaterial("")
                            }
                          }}
                          value={commonMaterials.some((m) => m.value === field.value) ? field.value : "custom"}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select material or enter custom" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="custom">Enter Custom Material</SelectItem>
                            {commonMaterials.map((material) => (
                              <SelectItem key={material.value} value={material.value}>
                                {material.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      {(!commonMaterials.some((m) => m.value === field.value) || customMaterial) && (
                        <FormControl>
                          <Input
                            placeholder="Enter custom material"
                            value={customMaterial || field.value}
                            onChange={(e) => {
                              setCustomMaterial(e.target.value)
                              field.onChange(e.target.value)
                            }}
                          />
                        </FormControl>
                      )}
                    </div>
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
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {commonUnits.map((unit) => (
                            <SelectItem key={unit.value} value={unit.value}>
                              {unit.label}
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
            <TabsTrigger value="terms">Terms & Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-4">Purchase Order Preview</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Vendor:</p>
                  <p className="text-sm">{form.getValues("vendor") || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Project:</p>
                  <p className="text-sm">
                    {projects.find((p) => p.id === form.getValues("projectId"))?.name || "Not specified"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Delivery Date:</p>
                  <p className="text-sm">{form.getValues("deliveryDate")?.toLocaleDateString() || "Not specified"}</p>
                </div>
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
                        Subtotal:
                      </td>
                      <td className="text-right py-2">${subtotal.toFixed(2)}</td>
                    </tr>
                    <tr className="font-medium">
                      <td colSpan={4} className="text-right py-2">
                        Tax (8.5%):
                      </td>
                      <td className="text-right py-2">${tax.toFixed(2)}</td>
                    </tr>
                    <tr className="font-medium">
                      <td colSpan={4} className="text-right py-2">
                        Total:
                      </td>
                      <td className="text-right py-2">${total.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="terms" className="p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-4">Terms & Notes</h3>
            <div className="space-y-4">
              <div>
                <FormField
                  control={form.control}
                  name="paymentTerms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Terms</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment terms" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="net15">Net 15</SelectItem>
                          <SelectItem value="net30">Net 30</SelectItem>
                          <SelectItem value="net45">Net 45</SelectItem>
                          <SelectItem value="net60">Net 60</SelectItem>
                          <SelectItem value="cod">COD (Cash on Delivery)</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-[120px]"
                          placeholder="Add any additional notes or instructions for the vendor"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/purchase-orders")}>
            Cancel
          </Button>
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit">Create Purchase Order</Button>
        </div>
      </form>
    </Form>
  )
}

