export interface TeamMember {
  id: string
  name: string
  email: string
  phone: string
  role: string
  department: string
  avatar?: string
  status: "active" | "inactive"
  joinDate: string
}

// Dummy data for team members
const dummyTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Michael Johnson",
    email: "michael@construction.com",
    phone: "(555) 123-4567",
    role: "Project Manager",
    department: "Management",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "2020-01-15",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah@construction.com",
    phone: "(555) 234-5678",
    role: "Site Engineer",
    department: "Engineering",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "2020-03-10",
  },
  {
    id: "3",
    name: "David Brown",
    email: "david@construction.com",
    phone: "(555) 345-6789",
    role: "Foreman",
    department: "Construction",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "2019-11-05",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@construction.com",
    phone: "(555) 456-7890",
    role: "Architect",
    department: "Design",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "2021-02-20",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert@construction.com",
    phone: "(555) 567-8901",
    role: "Estimator",
    department: "Finance",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "inactive",
    joinDate: "2020-06-15",
  },
  {
    id: "6",
    name: "Jennifer Taylor",
    email: "jennifer@construction.com",
    phone: "(555) 678-9012",
    role: "Safety Officer",
    department: "Safety",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "2021-04-10",
  },
]

// Get all team members
export const getTeamMembers = async (): Promise<TeamMember[]> => {
  // Uncomment to use real API
  // const response = await axiosClient.get('/team');
  // return response.data;

  // Using dummy data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyTeamMembers)
    }, 500)
  })
}

// Get team member by ID
export const getTeamMemberById = async (id: string): Promise<TeamMember> => {
  // Uncomment to use real API
  // const response = await axiosClient.get(`/team/${id}`);
  // return response.data;

  // Using dummy data
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const member = dummyTeamMembers.find((m) => m.id === id)
      if (member) {
        resolve(member)
      } else {
        reject(new Error("Team member not found"))
      }
    }, 500)
  })
}

// Create new team member
export const createTeamMember = async (member: Omit<TeamMember, "id">): Promise<TeamMember> => {
  // Uncomment to use real API
  // const response = await axiosClient.post('/team', member);
  // return response.data;

  // Using dummy data
  return new Promise((resolve) => {
    setTimeout(() => {
      const newMember = {
        ...member,
        id: Math.random().toString(36).substring(2, 9),
      }
      resolve(newMember)
    }, 500)
  })
}

// Update team member
export const updateTeamMember = async (id: string, member: Partial<TeamMember>): Promise<TeamMember> => {
  // Uncomment to use real API
  // const response = await axiosClient.patch(`/team/${id}`, member);
  // return response.data;

  // Using dummy data
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const memberIndex = dummyTeamMembers.findIndex((m) => m.id === id)
      if (memberIndex >= 0) {
        const updatedMember = { ...dummyTeamMembers[memberIndex], ...member }
        resolve(updatedMember)
      } else {
        reject(new Error("Team member not found"))
      }
    }, 500)
  })
}

// Delete team member
export const deleteTeamMember = async (id: string): Promise<void> => {
  // Uncomment to use real API
  // await axiosClient.delete(`/team/${id}`);

  // Using dummy data
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const memberIndex = dummyTeamMembers.findIndex((m) => m.id === id)
      if (memberIndex >= 0) {
        resolve()
      } else {
        reject(new Error("Team member not found"))
      }
    }, 500)
  })
}

