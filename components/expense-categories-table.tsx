"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash } from "lucide-react"
import { useState } from "react"

export function ExpenseCategoriesTable() {
  const [categories, setCategories] = useState([
    { id: "materials", name: "Materials", description: "Building materials and supplies" },
    { id: "equipment", name: "Equipment", description: "Equipment rental and purchases" },
    { id: "labor", name: "Labor", description: "Subcontractor and labor costs" },
    { id: "administrative", name: "Administrative", description: "Permits, fees, and office expenses" },
    { id: "utilities", name: "Utilities", description: "Electricity, water, and other utilities" },
    { id: "travel", name: "Travel", description: "Transportation and lodging expenses" },
    { id: "meals", name: "Meals & Entertainment", description: "Client meals and entertainment" },
    { id: "other", name: "Other", description: "Miscellaneous expenses" },
  ])

  const handleDelete = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category Name</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell className="hidden md:table-cell">{category.description}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

