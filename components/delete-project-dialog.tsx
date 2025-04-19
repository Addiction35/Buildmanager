"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useProjects } from "@/hooks/use-projects"
import { useToast } from "@/hooks/use-toast"

interface DeleteProjectDialogProps {
  projectId: string | null
  onClose: () => void
}

export function DeleteProjectDialog({ projectId, onClose }: DeleteProjectDialogProps) {
  const { deleteProject, isDeleting } = useProjects()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(true)

  // Handle delete confirmation
  const handleDelete = async () => {
    if (!projectId) return

    try {
      await deleteProject(projectId)

      toast({
        title: "Project deleted",
        description: "The project has been successfully deleted",
      })

      setIsOpen(false)
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the project. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle dialog close
  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  return (
    <AlertDialog open={!!projectId && isOpen} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this project?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the project and all associated data including
            estimates, purchase orders, and documents.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete Project"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

