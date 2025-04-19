// Dummy data for reports
export const reportsData = [
  {
    id: "REP-001",
    title: "Monthly Project Progress",
    description: "Overview of all project progress for the current month",
    category: "Progress",
    createdAt: "2023-11-01",
    updatedAt: "2023-11-05",
    author: "John Smith",
    status: "Published",
    thumbnail: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "REP-002",
    title: "Budget Analysis Q4",
    description: "Detailed analysis of budget allocation and spending for Q4",
    category: "Financial",
    createdAt: "2023-10-15",
    updatedAt: "2023-10-20",
    author: "Sarah Johnson",
    status: "Draft",
    thumbnail: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "REP-003",
    title: "Resource Utilization",
    description: "Analysis of resource allocation and utilization across projects",
    category: "Resources",
    createdAt: "2023-09-28",
    updatedAt: "2023-10-05",
    author: "Michael Brown",
    status: "Published",
    thumbnail: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "REP-004",
    title: "Safety Compliance Audit",
    description: "Results of the quarterly safety compliance audit",
    category: "Safety",
    createdAt: "2023-10-10",
    updatedAt: "2023-10-12",
    author: "Emily Davis",
    status: "Published",
    thumbnail: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "REP-005",
    title: "Vendor Performance Review",
    description: "Evaluation of vendor performance and reliability",
    category: "Procurement",
    createdAt: "2023-09-15",
    updatedAt: "2023-09-20",
    author: "Robert Wilson",
    status: "Draft",
    thumbnail: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "REP-006",
    title: "Client Satisfaction Survey",
    description: "Results of the annual client satisfaction survey",
    category: "Client Relations",
    createdAt: "2023-08-01",
    updatedAt: "2023-08-15",
    author: "Jennifer Lee",
    status: "Published",
    thumbnail: "/placeholder.svg?height=100&width=200",
  },
]

export const getReports = async () => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return reportsData
}

export const getReportById = async (id: string) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  const report = reportsData.find((report) => report.id === id)

  if (!report) {
    throw new Error(`Report with ID ${id} not found`)
  }

  return {
    ...report,
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Budget",
          data: [65, 59, 80, 81, 56, 55],
        },
        {
          label: "Actual",
          data: [28, 48, 40, 19, 86, 27],
        },
      ],
    },
    tableData: [
      { id: 1, name: "Project A", budget: 120000, actual: 115000, variance: -5000 },
      { id: 2, name: "Project B", budget: 85000, actual: 92000, variance: 7000 },
      { id: 3, name: "Project C", budget: 65000, actual: 61000, variance: -4000 },
      { id: 4, name: "Project D", budget: 175000, actual: 168000, variance: -7000 },
      { id: 5, name: "Project E", budget: 95000, actual: 103000, variance: 8000 },
    ],
  }
}

