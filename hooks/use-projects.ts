"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// Define project types
export type ProjectStatus = "Planning" | "In Progress" | "On Hold" | "Completed" | "Cancelled"

export interface Project {
  id: string
  name: string
  client: string
  status: ProjectStatus
  budget: number
  completion: number
  dueDate: string
  description: string
  location: string
  manager: {
    id: string
    name: string
  }
  createdAt: string
  updatedAt: string
}

export interface CreateProjectInput {
  name: string
  client: string
  status: ProjectStatus
  budget: number
  completion: number
  dueDate: string
  description: string
  location: string
  manager: {
    id: string
    name: string
  }
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {
  id: string
}

// Mock API functions
const fetchProjects = async (): Promise<Project[]> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "PRJ-1234",
          name: "Riverside Apartments",
          client: "Riverside Development Corp",
          status: "In Progress",
          budget: 2400000,
          completion: 45,
          dueDate: "2023-12-15",
          description: "A luxury apartment complex with 120 units and premium amenities",
          location: "123 Riverside Drive, Metropolis",
          manager: {
            id: "USR-001",
            name: "John Doe",
          },
          createdAt: "2023-05-15T00:00:00Z",
          updatedAt: "2023-09-01T00:00:00Z",
        },
        {
          id: "PRJ-5678",
          name: "Oakwood Office Complex",
          client: "Oakwood Enterprises",
          status: "Planning",
          budget: 5100000,
          completion: 15,
          dueDate: "2024-03-30",
          description: "Modern office complex with 5 buildings and underground parking",
          location: "456 Oak Avenue, Metropolis",
          manager: {
            id: "USR-002",
            name: "Sarah Johnson",
          },
          createdAt: "2023-06-20T00:00:00Z",
          updatedAt: "2023-08-15T00:00:00Z",
        },
        {
          id: "PRJ-9012",
          name: "Sunset Heights Condos",
          client: "Sunset Properties LLC",
          status: "In Progress",
          budget: 3800000,
          completion: 60,
          dueDate: "2023-10-22",
          description: "Luxury condominium development with 45 units and rooftop amenities",
          location: "789 Sunset Boulevard, Metropolis",
          manager: {
            id: "USR-003",
            name: "Michael Scott",
          },
          createdAt: "2023-04-10T00:00:00Z",
          updatedAt: "2023-09-05T00:00:00Z",
        },
        {
          id: "PRJ-3456",
          name: "Greenfield Shopping Mall",
          client: "Greenfield Retail Group",
          status: "Completed",
          budget: 7200000,
          completion: 100,
          dueDate: "2023-08-01",
          description: "Large shopping mall with 120 retail spaces and food court",
          location: "101 Green Street, Metropolis",
          manager: {
            id: "USR-004",
            name: "Jim Halpert",
          },
          createdAt: "2022-09-15T00:00:00Z",
          updatedAt: "2023-08-01T00:00:00Z",
        },
        {
          id: "PRJ-7890",
          name: "Lakeside Medical Center",
          client: "Lakeside Healthcare",
          status: "On Hold",
          budget: 4500000,
          completion: 30,
          dueDate: "2024-01-15",
          description: "Modern medical facility with specialized treatment centers",
          location: "202 Lake Road, Metropolis",
          manager: {
            id: "USR-005",
            name: "Pam Beesly",
          },
          createdAt: "2023-03-01T00:00:00Z",
          updatedAt: "2023-07-20T00:00:00Z",
        },
      ])
    }, 500)
  })
}

const fetchProjectById = async (id: string): Promise<Project> => {
  // In a real app, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const projects = [
        {
          id: "PRJ-1234",
          name: "Riverside Apartments",
          client: "Riverside Development Corp",
          status: "In Progress",
          budget: 2400000,
          completion: 45,
          dueDate: "2023-12-15",
          description: "A luxury apartment complex with 120 units and premium amenities",
          location: "123 Riverside Drive, Metropolis",
          manager: {
            id: "USR-001",
            name: "John Doe",
          },
          createdAt: "2023-05-15T00:00:00Z",
          updatedAt: "2023-09-01T00:00:00Z",
        },
        {
          id: "PRJ-5678",
          name: "Oakwood Office Complex",
          client: "Oakwood Enterprises",
          status: "Planning",
          budget: 5100000,
          completion: 15,
          dueDate: "2024-03-30",
          description: "Modern office complex with 5 buildings and underground parking",
          location: "456 Oak Avenue, Metropolis",
          manager: {
            id: "USR-002",
            name: "Sarah Johnson",
          },
          createdAt: "2023-06-20T00:00:00Z",
          updatedAt: "2023-08-15T00:00:00Z",
        },
      ]

      const project = projects.find((p) => p.id === id)
      if (project) {
        resolve(project)
      } else {
        reject(new Error(`Project with ID ${id} not found`))
      }
    }, 500)
  })
}

const createProject = async (input: CreateProjectInput): Promise<Project> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const now = new Date().toISOString()
      resolve({
        id: `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
        ...input,
        createdAt: now,
        updatedAt: now,
      })
    }, 1000)
  })
}

const updateProject = async (input: UpdateProjectInput): Promise<Project> => {
  // In a real app, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate fetching the existing project
      fetchProjectById(input.id)
        .then((existingProject) => {
          const updatedProject = {
            ...existingProject,
            ...input,
            updatedAt: new Date().toISOString(),
          }
          resolve(updatedProject)
        })
        .catch((error) => reject(error))
    }, 1000)
  })
}

const deleteProject = async (id: string): Promise<{ id: string }> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id })
    }, 1000)
  })
}

// Hook for managing projects
export function useProjects() {
  const queryClient = useQueryClient()

  // Query for fetching all projects
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  })

  // Mutation for creating a project
  const { mutateAsync: createProjectMutation, isPending: isCreating } = useMutation({
    mutationFn: createProject,
    onSuccess: (newProject) => {
      queryClient.setQueryData(["projects"], (oldData: Project[] | undefined) => {
        if (!oldData) return [newProject]
        return [...oldData, newProject]
      })
      // Invalidate the projects query to refetch
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })

  // Mutation for updating a project
  const { mutateAsync: updateProjectMutation, isPending: isUpdating } = useMutation({
    mutationFn: updateProject,
    onSuccess: (updatedProject) => {
      queryClient.setQueryData(["projects"], (oldData: Project[] | undefined) => {
        if (!oldData) return [updatedProject]
        return oldData.map((project) => (project.id === updatedProject.id ? updatedProject : project))
      })
      // Update the individual project query
      queryClient.setQueryData(["project", updatedProject.id], updatedProject)
      // Invalidate the projects query to refetch
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })

  // Mutation for deleting a project
  const { mutateAsync: deleteProjectMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteProject,
    onSuccess: (result) => {
      queryClient.setQueryData(["projects"], (oldData: Project[] | undefined) => {
        if (!oldData) return []
        return oldData.filter((project) => project.id !== result.id)
      })
      // Remove the individual project query
      queryClient.removeQueries({ queryKey: ["project", result.id] })
      // Invalidate the projects query to refetch
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })

  return {
    projects: data,
    isLoading,
    isError,
    error,
    refetch,
    createProject: createProjectMutation,
    isCreating,
    updateProject: updateProjectMutation,
    isUpdating,
    deleteProject: deleteProjectMutation,
    isDeleting,
  }
}

// Hook for managing a single project
export function useProject(id: string) {
  // Query for fetching a single project
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["project", id],
    queryFn: () => fetchProjectById(id),
    enabled: !!id, // Only run the query if an ID is provided
  })

  return {
    project: data,
    isLoading,
    isError,
    error,
  }
}

