// Base API URL - in production, this would come from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.construction-management.com/v1"

// Helper function for API requests
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const defaultHeaders = {
    "Content-Type": "application/json",
    // In a real app, you would include authentication headers
    // 'Authorization': `Bearer ${getAuthToken()}`,
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  })

  if (!response.ok) {
    // Parse error response
    let errorData
    try {
      errorData = await response.json()
    } catch (e) {
      errorData = { message: "An unknown error occurred" }
    }

    throw new Error(errorData.message || `API error: ${response.status} ${response.statusText}`)
  }

  // For 204 No Content responses
  if (response.status === 204) {
    return {} as T
  }

  return response.json()
}

// Project types
export interface Project {
  id: string
  name: string
  client: {
    id: string
    name: string
  }
  status: string
  budget: {
    total: number
    spent: number
    remaining: number
  }
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

export interface Client {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  address: string
}

export interface Estimate {
  id: string
  projectId: string
  title: string
  status: string
  totalAmount: number
  createdAt: string
  updatedAt: string
  items: EstimateItem[]
}

export interface EstimateItem {
  id: string
  description: string
  quantity: number
  unit: string
  unitPrice: number
  totalPrice: number
}

export interface Budget {
  id: string
  projectId: string
  totalBudget: number
  allocatedBudget: number
  spentBudget: number
  remainingBudget: number
  categories: BudgetCategory[]
}

export interface BudgetCategory {
  id: string
  name: string
  allocation: number
  spent: number
  remaining: number
}

export interface Employee {
  id: string
  name: string
  position: string
  email: string
  phone: string
  hourlyRate: number
}

export interface Payroll {
  id: string
  period: {
    start: string
    end: string
  }
  status: string
  totalAmount: number
  employeeCount: number
  createdAt: string
  processedAt: string | null
}

export interface Wage {
  id: string
  employeeId: string
  projectId: string
  date: string
  hours: number
  rate: number
  amount: number
  description: string
}

// API functions for Projects
export const projectsApi = {
  getAll: () => fetchAPI<Project[]>("/projects"),
  getById: (id: string) => fetchAPI<Project>(`/projects/${id}`),
  create: (data: Omit<Project, "id" | "createdAt" | "updatedAt">) =>
    fetchAPI<Project>("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Project>) =>
    fetchAPI<Project>(`/projects/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchAPI<void>(`/projects/${id}`, {
      method: "DELETE",
    }),
}

// API functions for Clients
export const clientsApi = {
  getAll: () => fetchAPI<Client[]>("/clients"),
  getById: (id: string) => fetchAPI<Client>(`/clients/${id}`),
  create: (data: Omit<Client, "id">) =>
    fetchAPI<Client>("/clients", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Client>) =>
    fetchAPI<Client>(`/clients/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchAPI<void>(`/clients/${id}`, {
      method: "DELETE",
    }),
}

// API functions for Estimates
export const estimatesApi = {
  getAll: (projectId?: string) => fetchAPI<Estimate[]>(projectId ? `/projects/${projectId}/estimates` : "/estimates"),
  getById: (id: string) => fetchAPI<Estimate>(`/estimates/${id}`),
  create: (data: Omit<Estimate, "id" | "createdAt" | "updatedAt">) =>
    fetchAPI<Estimate>("/estimates", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Estimate>) =>
    fetchAPI<Estimate>(`/estimates/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchAPI<void>(`/estimates/${id}`, {
      method: "DELETE",
    }),
  exportPdf: (id: string) => `${API_BASE_URL}/estimates/${id}/export/pdf`,
  exportExcel: (id: string) => `${API_BASE_URL}/estimates/${id}/export/excel`,
}

// API functions for Budgets
export const budgetsApi = {
  getByProject: (projectId: string) => fetchAPI<Budget>(`/projects/${projectId}/budget`),
  update: (projectId: string, data: Partial<Budget>) =>
    fetchAPI<Budget>(`/projects/${projectId}/budget`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  addCategory: (projectId: string, data: Omit<BudgetCategory, "id">) =>
    fetchAPI<BudgetCategory>(`/projects/${projectId}/budget/categories`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateCategory: (projectId: string, categoryId: string, data: Partial<BudgetCategory>) =>
    fetchAPI<BudgetCategory>(`/projects/${projectId}/budget/categories/${categoryId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteCategory: (projectId: string, categoryId: string) =>
    fetchAPI<void>(`/projects/${projectId}/budget/categories/${categoryId}`, {
      method: "DELETE",
    }),
}

// API functions for Employees
export const employeesApi = {
  getAll: () => fetchAPI<Employee[]>("/employees"),
  getById: (id: string) => fetchAPI<Employee>(`/employees/${id}`),
  create: (data: Omit<Employee, "id">) =>
    fetchAPI<Employee>("/employees", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Employee>) =>
    fetchAPI<Employee>(`/employees/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchAPI<void>(`/employees/${id}`, {
      method: "DELETE",
    }),
}

// API functions for Payroll
export const payrollApi = {
  getAll: () => fetchAPI<Payroll[]>("/payrolls"),
  getById: (id: string) => fetchAPI<Payroll>(`/payrolls/${id}`),
  create: (data: Omit<Payroll, "id" | "createdAt" | "processedAt">) =>
    fetchAPI<Payroll>("/payrolls", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  process: (id: string) =>
    fetchAPI<Payroll>(`/payrolls/${id}/process`, {
      method: "POST",
    }),
  delete: (id: string) =>
    fetchAPI<void>(`/payrolls/${id}`, {
      method: "DELETE",
    }),
  exportPdf: (id: string) => `${API_BASE_URL}/payrolls/${id}/export/pdf`,
}

// API functions for Wages
export const wagesApi = {
  getAll: (projectId?: string) => fetchAPI<Wage[]>(projectId ? `/projects/${projectId}/wages` : "/wages"),
  getById: (id: string) => fetchAPI<Wage>(`/wages/${id}`),
  create: (data: Omit<Wage, "id">) =>
    fetchAPI<Wage>("/wages", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Wage>) =>
    fetchAPI<Wage>(`/wages/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchAPI<void>(`/wages/${id}`, {
      method: "DELETE",
    }),
}

