"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// Define types
type PurchaseOrderItem = {
  description: string
  quantity: number
  unit: string
  unitPrice: number
}

type PurchaseOrder = {
  id: string
  vendor: string
  project: string
  status: string
  amount: number
  date: string
  deliveryDate: string
  items: PurchaseOrderItem[]
  estimateId?: string
}

type CreatePurchaseOrderInput = {
  vendor: string
  project: string
  deliveryDate: string
  items: PurchaseOrderItem[]
  estimateId?: string
}

// Mock API functions
const fetchPurchaseOrders = async (): Promise<PurchaseOrder[]> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "PO-1234",
          vendor: "ABC Building Supplies",
          project: "Riverside Apartments",
          status: "Pending",
          amount: 24500,
          date: "2023-09-15",
          deliveryDate: "2023-09-30",
          items: [
            {
              description: "Concrete Mix Type II",
              quantity: 150,
              unit: "Bags",
              unitPrice: 12.5,
            },
            {
              description: 'Rebar #5 (5/8")',
              quantity: 500,
              unit: "Ft.",
              unitPrice: 2.75,
            },
          ],
        },
        {
          id: "PO-1235",
          vendor: "XYZ Electrical Wholesale",
          project: "Oakwood Office Complex",
          status: "Approved",
          amount: 18750,
          date: "2023-09-12",
          deliveryDate: "2023-09-25",
          items: [
            {
              description: "Electrical distribution panels",
              quantity: 3,
              unit: "Each",
              unitPrice: 6250,
            },
          ],
        },
      ])
    }, 500)
  })
}

const createPurchaseOrder = async (input: CreatePurchaseOrderInput): Promise<PurchaseOrder> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Calculate total amount
      const amount = input.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)

      resolve({
        id: `PO-${Math.floor(1000 + Math.random() * 9000)}`,
        vendor: input.vendor,
        project: input.project,
        status: "Pending",
        amount,
        date: new Date().toISOString().split("T")[0],
        deliveryDate: input.deliveryDate,
        items: input.items,
        estimateId: input.estimateId,
      })
    }, 1000)
  })
}

export function usePurchaseOrders() {
  const queryClient = useQueryClient()

  // Query for fetching purchase orders
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["purchaseOrders"],
    queryFn: fetchPurchaseOrders,
  })

  // Mutation for creating a purchase order
  const { mutateAsync: createPurchaseOrderMutation, isPending: isCreating } = useMutation({
    mutationFn: createPurchaseOrder,
    onSuccess: (newPO) => {
      queryClient.setQueryData(["purchaseOrders"], (oldData: PurchaseOrder[] | undefined) => {
        if (!oldData) return [newPO]
        return [...oldData, newPO]
      })
    },
  })

  return {
    data,
    isLoading,
    isError,
    error,
    createPurchaseOrder: createPurchaseOrderMutation,
    isCreating,
  }
}

