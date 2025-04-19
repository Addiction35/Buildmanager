"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { getTeamMemberById, createTeamMember, updateTeamMember } from "@/services/team-service"
import { Loader2 } from "lucide-react"

const teamMemberFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  role: z.string().min(2, "Role must be at least 2 characters"),
  department: z.string().min(2, "Department is required"),
  status: z.enum(["active", "inactive"]),
})

type TeamMemberFormValues = z.infer<typeof teamMemberFormSchema>

interface TeamMemberFormProps {
  id?: string
}

export function TeamMemberForm({ id }: TeamMemberFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data: teamMember, isLoading } = useQuery({
    queryKey: ["team-member", id],
    queryFn: () => (id ? getTeamMemberById(id) : null),
    enabled: !!id,
  })

  const form = useForm<TeamMemberFormValues>({
    resolver: zodResolver(teamMemberFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      status: "active",
    },
  })

  // Update form values when team member data is loaded
  React.useEffect(() => {
    if (teamMember) {
      form.reset({
        name: teamMember.name,
        email: teamMember.email,
        phone: teamMember.phone,
        role: teamMember.role,
        department: teamMember.department,
        status: teamMember.status,
      })
    }
  }, [teamMember, form])

  const createTeamMemberMutation = useMutation({
    mutationFn: createTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team"] })
      toast({
        title: "Team member created",
        description: "The team member has been created successfully.",
      })
      router.push("/dashboard/team")
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create team member",
        variant: "destructive",
      })
    },
  })

  const updateTeamMemberMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TeamMemberFormValues> }) => updateTeamMember(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team"] })
      queryClient.invalidateQueries({ queryKey: ["team-member", id] })
      toast({
        title: "Team member updated",
        description: "The team member has been updated successfully.",
      })
      router.push(`/dashboard/team/${id}`)
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update team member",
        variant: "destructive",
      })
    },
  })

  async function onSubmit(data: TeamMemberFormValues) {
    setIsSubmitting(true)
    try {
      if (id) {
        await updateTeamMemberMutation.mutateAsync({ id, data })
      } else {
        await createTeamMemberMutation.mutateAsync({
          ...data,
          avatar: "/placeholder.svg?height=40&width=40",
          joinDate: new Date().toISOString().split("T")[0],
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (id && isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input placeholder="Project Manager" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Management">Management</SelectItem>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Construction">Construction</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Safety">Safety</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {id ? "Update Team Member" : "Create Team Member"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

