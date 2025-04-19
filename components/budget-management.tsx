"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { budgetsApi, type BudgetCategory } from "@/lib/api-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface BudgetManagementProps {
  projectId: string
}

export function BudgetManagement({ projectId }: BudgetManagementProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false)
  const [categoryToEdit, setCategoryToEdit] = useState<BudgetCategory | null>(null)
  const [newCategory, setNewCategory] = useState({
    name: "",
    allocation: 0,
  })

  // Fetch budget data
  const {
    data: budget,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["budget", projectId],
    queryFn: () => budgetsApi.getByProject(projectId),
    enabled: !!projectId,
  })

  // Add category mutation
  const addCategoryMutation = useMutation({
    mutationFn: (data: Omit<BudgetCategory, "id">) => budgetsApi.addCategory(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget", projectId] })
      setIsAddCategoryOpen(false)
      setNewCategory({ name: "", allocation: 0 })
      toast({
        title: "Category added",
        description: "Budget category has been added successfully.",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add budget category. Please try again.",
        variant: "destructive",
      })
    },
  })

  // Update category mutation
  const updateCategoryMutation = useMutation({
    mutationFn: (data: { categoryId: string; updates: Partial<BudgetCategory> }) =>
      budgetsApi.updateCategory(projectId, data.categoryId, data.updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget", projectId] })
      setIsEditCategoryOpen(false)
      setCategoryToEdit(null)
      toast({
        title: "Category updated",
        description: "Budget category has been updated successfully.",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update budget category. Please try again.",
        variant: "destructive",
      })
    },
  })

  // Delete category mutation
  const deleteCategoryMutation = useMutation({
    mutationFn: (categoryId: string) => budgetsApi.deleteCategory(projectId, categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget", projectId] })
      toast({
        title: "Category deleted",
        description: "Budget category has been deleted successfully.",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete budget category. Please try again.",
        variant: "destructive",
      })
    },
  })

  const handleAddCategory = () => {
    if (!newCategory.name) {
      toast({
        title: "Validation Error",
        description: "Category name is required.",
        variant: "destructive",
      })
      return
    }

    addCategoryMutation.mutate({
      name: newCategory.name,
      allocation: newCategory.allocation,
      spent: 0,
      remaining: newCategory.allocation,
    })
  }

  const handleUpdateCategory = () => {
    if (!categoryToEdit) return

    updateCategoryMutation.mutate({
      categoryId: categoryToEdit.id,
      updates: {
        name: categoryToEdit.name,
        allocation: categoryToEdit.allocation,
      },
    })
  }

  const handleDeleteCategory = (categoryId: string) => {
    if (confirm("Are you sure you want to delete this budget category?")) {
      deleteCategoryMutation.mutate(categoryId)
    }
  }

  const openEditDialog = (category: BudgetCategory) => {
    setCategoryToEdit({ ...category })
    setIsEditCategoryOpen(true)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !budget) {
    return (
      <div className="p-6 border border-destructive/50 rounded-md bg-destructive/10 text-destructive">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <h3 className="font-medium">Error loading budget</h3>
        </div>
        <p className="text-sm mt-2">There was an error loading the budget information. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Budget</CardTitle>
            <CardDescription>Project allocated funds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${budget.totalBudget.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Spent</CardTitle>
            <CardDescription>Total expenses to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${budget.spentBudget.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {Math.round((budget.spentBudget / budget.totalBudget) * 100)}% of total budget
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Remaining</CardTitle>
            <CardDescription>Available funds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${budget.remainingBudget.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {Math.round((budget.remainingBudget / budget.totalBudget) * 100)}% of total budget
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Categories */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Budget Categories</CardTitle>
            <CardDescription>Allocation of funds by category</CardDescription>
          </div>
          <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Budget Category</DialogTitle>
                <DialogDescription>Create a new budget category to track specific expenses.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input
                    id="name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    placeholder="e.g., Materials, Labor, Equipment"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="allocation">Allocation ($)</Label>
                  <Input
                    id="allocation"
                    type="number"
                    value={newCategory.allocation}
                    onChange={(e) => setNewCategory({ ...newCategory, allocation: Number.parseFloat(e.target.value) })}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCategory} disabled={addCategoryMutation.isPending}>
                  {addCategoryMutation.isPending ? "Adding..." : "Add Category"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budget.categories.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No budget categories defined. Add a category to start tracking your budget.
              </div>
            ) : (
              budget.categories.map((category) => (
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{category.name}</div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(category)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category.id)}>
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-muted-foreground">Spent: </span>
                      <span>${category.spent.toLocaleString()}</span>
                      <span className="text-muted-foreground"> of </span>
                      <span>${category.allocation.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Remaining: </span>
                      <span>${category.remaining.toLocaleString()}</span>
                    </div>
                  </div>
                  <Progress value={(category.spent / category.allocation) * 100} className="h-2" />
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Category Dialog */}
      <Dialog open={isEditCategoryOpen} onOpenChange={setIsEditCategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Budget Category</DialogTitle>
            <DialogDescription>Update the details of this budget category.</DialogDescription>
          </DialogHeader>
          {categoryToEdit && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Category Name</Label>
                <Input
                  id="edit-name"
                  value={categoryToEdit.name}
                  onChange={(e) => setCategoryToEdit({ ...categoryToEdit, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-allocation">Allocation ($)</Label>
                <Input
                  id="edit-allocation"
                  type="number"
                  value={categoryToEdit.allocation}
                  onChange={(e) =>
                    setCategoryToEdit({ ...categoryToEdit, allocation: Number.parseFloat(e.target.value) })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Current Spent</Label>
                <div className="px-3 py-2 border rounded-md bg-muted/50">${categoryToEdit.spent.toLocaleString()}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCategoryOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateCategory} disabled={updateCategoryMutation.isPending}>
              {updateCategoryMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

