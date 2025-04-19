"use client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

// Define types for our estimate hierarchy
type SubSection = {
  id: string
  code: string
  description: string
  quantity: number
  unit: string
  rate: number
  total: number
}

type Section = {
  id: string
  code: string
  description: string
  subsections: SubSection[]
  expanded: boolean
  total: number
}

type EstimateGroup = {
  id: string
  code: string
  description: string
  sections: Section[]
  expanded: boolean
  total: number
}

type Estimate = {
  id: string
  name: string
  client: string
  date: string
  status: string
  groups: EstimateGroup[]
  expanded: boolean
  total: number
}

// Mock API functions
const fetchEstimates = async (): Promise<Estimate[]> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "EST-1234",
          name: "Riverside Apartments - Foundation",
          client: "Riverside Development Corp",
          date: "2023-09-15",
          status: "Draft",
          expanded: false,
          total: 245000,
          groups: [
            {
              id: "GRP-A",
              code: "A.0",
              description: "Site Preparation",
              expanded: false,
              total: 63750,
              sections: [
                {
                  id: "SEC-A1",
                  code: "A.1",
                  description: "Excavation",
                  expanded: false,
                  total: 45000,
                  subsections: [
                    {
                      id: "SUB-A11",
                      code: "A.1.1",
                      description: "Topsoil removal",
                      quantity: 1,
                      unit: "Job",
                      rate: 15000,
                      total: 15000,
                    },
                    {
                      id: "SUB-A12",
                      code: "A.1.2",
                      description: "Basement excavation",
                      quantity: 1,
                      unit: "Job",
                      rate: 30000,
                      total: 30000,
                    },
                  ],
                },
                {
                  id: "SEC-A2",
                  code: "A.2",
                  description: "Grading",
                  expanded: false,
                  total: 18750,
                  subsections: [
                    {
                      id: "SUB-A21",
                      code: "A.2.1",
                      description: "Rough grading",
                      quantity: 1,
                      unit: "Job",
                      rate: 8750,
                      total: 8750,
                    },
                    {
                      id: "SUB-A22",
                      code: "A.2.2",
                      description: "Final grading",
                      quantity: 1,
                      unit: "Job",
                      rate: 10000,
                      total: 10000,
                    },
                  ],
                },
              ],
            },
            {
              id: "GRP-B",
              code: "B.0",
              description: "Foundation",
              expanded: false,
              total: 181250,
              sections: [
                {
                  id: "SEC-B1",
                  code: "B.1",
                  description: "Footings",
                  expanded: false,
                  total: 42000,
                  subsections: [
                    {
                      id: "SUB-B11",
                      code: "B.1.1",
                      description: "Concrete footings",
                      quantity: 120,
                      unit: "Cu. Yd.",
                      rate: 350,
                      total: 42000,
                    },
                  ],
                },
                {
                  id: "SEC-B2",
                  code: "B.2",
                  description: "Foundation Walls",
                  expanded: false,
                  total: 56250,
                  subsections: [
                    {
                      id: "SUB-B21",
                      code: "B.2.1",
                      description: "Concrete foundation walls",
                      quantity: 450,
                      unit: "Sq. Ft.",
                      rate: 125,
                      total: 56250,
                    },
                  ],
                },
                {
                  id: "SEC-B3",
                  code: "B.3",
                  description: "Waterproofing",
                  expanded: false,
                  total: 15750,
                  subsections: [
                    {
                      id: "SUB-B31",
                      code: "B.3.1",
                      description: "Foundation waterproofing",
                      quantity: 450,
                      unit: "Sq. Ft.",
                      rate: 35,
                      total: 15750,
                    },
                  ],
                },
                {
                  id: "SEC-B4",
                  code: "B.4",
                  description: "Drainage",
                  expanded: false,
                  total: 28500,
                  subsections: [
                    {
                      id: "SUB-B41",
                      code: "B.4.1",
                      description: "Drainage system installation",
                      quantity: 1,
                      unit: "Job",
                      rate: 28500,
                      total: 28500,
                    },
                  ],
                },
                {
                  id: "SEC-B5",
                  code: "B.5",
                  description: "Backfill",
                  expanded: false,
                  total: 38750,
                  subsections: [
                    {
                      id: "SUB-B51",
                      code: "B.5.1",
                      description: "Backfill and compaction",
                      quantity: 1,
                      unit: "Job",
                      rate: 18750,
                      total: 18750,
                    },
                    {
                      id: "SUB-B52",
                      code: "B.5.2",
                      description: "Structural steel",
                      quantity: 25,
                      unit: "Tons",
                      rate: 800,
                      total: 20000,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "EST-1235",
          name: "Oakwood Office Complex - Electrical",
          client: "Oakwood Enterprises",
          date: "2023-09-12",
          status: "Sent",
          expanded: false,
          total: 178500,
          groups: [
            {
              id: "GRP-A",
              code: "A.0",
              description: "Electrical Systems",
              expanded: false,
              total: 178500,
              sections: [
                {
                  id: "SEC-A1",
                  code: "A.1",
                  description: "Main Service",
                  expanded: false,
                  total: 45000,
                  subsections: [
                    {
                      id: "SUB-A11",
                      code: "A.1.1",
                      description: "Main electrical service",
                      quantity: 1,
                      unit: "Job",
                      rate: 45000,
                      total: 45000,
                    },
                  ],
                },
                {
                  id: "SEC-A2",
                  code: "A.2",
                  description: "Distribution",
                  expanded: false,
                  total: 65000,
                  subsections: [
                    {
                      id: "SUB-A21",
                      code: "A.2.1",
                      description: "Electrical distribution panels",
                      quantity: 10,
                      unit: "Each",
                      rate: 6500,
                      total: 65000,
                    },
                  ],
                },
                {
                  id: "SEC-A3",
                  code: "A.3",
                  description: "Wiring",
                  expanded: false,
                  total: 68500,
                  subsections: [
                    {
                      id: "SUB-A31",
                      code: "A.3.1",
                      description: "Conduit and wiring",
                      quantity: 1,
                      unit: "Job",
                      rate: 68500,
                      total: 68500,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ])
    }, 500)
  })
}

const updateEstimate = async (estimate: Estimate): Promise<Estimate> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(estimate)
    }, 500)
  })
}

const importEstimateFromExcel = async (file: File): Promise<Estimate> => {
  // In a real app, this would process the Excel file and create an estimate
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `EST-${Math.floor(1000 + Math.random() * 9000)}`,
        name: "Imported Estimate",
        client: "Imported Client",
        date: new Date().toISOString().split("T")[0],
        status: "Draft",
        expanded: false,
        total: 150000,
        groups: [
          {
            id: "GRP-A",
            code: "A.0",
            description: "Imported Group",
            expanded: false,
            total: 150000,
            sections: [
              {
                id: "SEC-A1",
                code: "A.1",
                description: "Imported Section",
                expanded: false,
                total: 150000,
                subsections: [
                  {
                    id: "SUB-A11",
                    code: "A.1.1",
                    description: "Imported Item 1",
                    quantity: 1,
                    unit: "Job",
                    rate: 75000,
                    total: 75000,
                  },
                  {
                    id: "SUB-A12",
                    code: "A.1.2",
                    description: "Imported Item 2",
                    quantity: 1,
                    unit: "Job",
                    rate: 75000,
                    total: 75000,
                  },
                ],
              },
            ],
          },
        ],
      })
    }, 1000)
  })
}

export function useEstimates() {
  const queryClient = useQueryClient()

  // Query for fetching estimates
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["estimates"],
    queryFn: fetchEstimates,
  })

  // Mutation for updating an estimate
  const { mutateAsync: updateEstimateMutation } = useMutation({
    mutationFn: updateEstimate,
    onSuccess: (updatedEstimate) => {
      queryClient.setQueryData(["estimates"], (oldData: Estimate[] | undefined) => {
        if (!oldData) return [updatedEstimate]

        return oldData.map((estimate) => (estimate.id === updatedEstimate.id ? updatedEstimate : estimate))
      })
    },
  })

  // Mutation for importing from Excel
  const { mutateAsync: importFromExcelMutation } = useMutation({
    mutationFn: importEstimateFromExcel,
    onSuccess: (newEstimate) => {
      queryClient.setQueryData(["estimates"], (oldData: Estimate[] | undefined) => {
        if (!oldData) return [newEstimate]
        return [...oldData, newEstimate]
      })
    },
  })

  // Toggle expansion of an estimate
  const toggleEstimate = async (estimateId: string) => {
    const currentEstimates = data || []
    const updatedEstimates = currentEstimates.map((estimate) =>
      estimate.id === estimateId ? { ...estimate, expanded: !estimate.expanded } : estimate,
    )

    const estimateToUpdate = updatedEstimates.find((e) => e.id === estimateId)
    if (estimateToUpdate) {
      await updateEstimateMutation(estimateToUpdate)
    }
  }

  // Toggle expansion of a group
  const toggleGroup = async (estimateId: string, groupId: string) => {
    const currentEstimates = data || []
    const updatedEstimates = currentEstimates.map((estimate) =>
      estimate.id === estimateId
        ? {
            ...estimate,
            groups: estimate.groups.map((group) =>
              group.id === groupId ? { ...group, expanded: !group.expanded } : group,
            ),
          }
        : estimate,
    )

    const estimateToUpdate = updatedEstimates.find((e) => e.id === estimateId)
    if (estimateToUpdate) {
      await updateEstimateMutation(estimateToUpdate)
    }
  }

  // Toggle expansion of a section
  const toggleSection = async (estimateId: string, groupId: string, sectionId: string) => {
    const currentEstimates = data || []
    const updatedEstimates = currentEstimates.map((estimate) =>
      estimate.id === estimateId
        ? {
            ...estimate,
            groups: estimate.groups.map((group) =>
              group.id === groupId
                ? {
                    ...group,
                    sections: group.sections.map((section) =>
                      section.id === sectionId ? { ...section, expanded: !section.expanded } : section,
                    ),
                  }
                : group,
            ),
          }
        : estimate,
    )

    const estimateToUpdate = updatedEstimates.find((e) => e.id === estimateId)
    if (estimateToUpdate) {
      await updateEstimateMutation(estimateToUpdate)
    }
  }

  // Export to Excel
  const exportToExcel = (estimateId: string) => {
    // In a real app, this would generate and download an Excel file
    console.log(`Exporting estimate ${estimateId} to Excel`)

    // Mock implementation - in a real app, you would use a library like xlsx
    // to generate the Excel file and trigger a download
    const estimate = data?.find((e) => e.id === estimateId)
    if (estimate) {
      const mockExcelData = {
        SheetNames: ["Estimate"],
        Sheets: {
          Estimate: {
            // Excel data would go here
          },
        },
      }

      // Mock download
      console.log("Excel data:", mockExcelData)
    }
  }

  // Import from Excel
  const importFromExcel = async (file: File) => {
    return await importFromExcelMutation(file)
  }

  return {
    data,
    isLoading,
    isError,
    error,
    toggleEstimate,
    toggleGroup,
    toggleSection,
    exportToExcel,
    importFromExcel,
  }
}

