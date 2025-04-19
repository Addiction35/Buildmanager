import { clients, simulateApiDelay } from "@/lib/dummy-data"

export interface Client {
  id: string
  name: string
  company: string
  email: string
  phone: string
  address: string
  status: string
  projectCount: number
  contactPerson: string
  createdAt: string
  totalSpent: number
}

export async function getClients(): Promise<Client[]> {
  // Simulate API call delay
  await simulateApiDelay()
  return clients
}

export async function getClientById(id: string): Promise<Client | undefined> {
  await simulateApiDelay()
  return clients.find((client) => client.id === id)
}

export async function createClient(client: Omit<Client, "id">): Promise<Client> {
  await simulateApiDelay()
  const newClient = {
    ...client,
    id: `CLT-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString(),
    projectCount: 0,
    totalSpent: 0,
  }

  // In a real app, this would be saved to a database
  // For now, we'll just return the new client
  return newClient
}

export async function updateClient(id: string, client: Partial<Client>): Promise<Client> {
  await simulateApiDelay()
  const existingClient = clients.find((c) => c.id === id)

  if (!existingClient) {
    throw new Error(`Client with ID ${id} not found`)
  }

  const updatedClient = {
    ...existingClient,
    ...client,
  }

  // In a real app, this would update the database
  return updatedClient
}

export async function deleteClient(id: string): Promise<void> {
  await simulateApiDelay()
  // In a real app, this would delete from the database
  return
}

