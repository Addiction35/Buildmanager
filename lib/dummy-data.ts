// Dummy data for the construction management application

// Clients
export const clients = [
  {
    id: "CLT-001",
    name: "Riverside Development Corp",
    company: "Riverside Development",
    email: "contact@riversidedev.com",
    phone: "(555) 123-4567",
    address: "123 River Lane, Riverside, CA 92501",
    status: "active",
    projectCount: 3,
    contactPerson: "John Richards",
    createdAt: "2023-01-15",
    totalSpent: 1245000,
  },
  {
    id: "CLT-002",
    name: "Metro Business Solutions",
    company: "Metro Business Group",
    email: "info@metrobusiness.com",
    phone: "(555) 234-5678",
    address: "456 Downtown Ave, Metro City, NY 10001",
    status: "active",
    projectCount: 2,
    contactPerson: "Sarah Johnson",
    createdAt: "2023-02-20",
    totalSpent: 3750000,
  },
  {
    id: "CLT-003",
    name: "Sunset Properties LLC",
    company: "Sunset Properties",
    email: "properties@sunsetllc.com",
    phone: "(555) 345-6789",
    address: "789 Sunset Blvd, Los Angeles, CA 90028",
    status: "active",
    projectCount: 1,
    contactPerson: "Michael Brown",
    createdAt: "2023-03-10",
    totalSpent: 950000,
  },
  {
    id: "CLT-004",
    name: "Greenfield Retail Group",
    company: "Greenfield Retail",
    email: "retail@greenfield.com",
    phone: "(555) 456-7890",
    address: "101 Shopping Center Rd, Greenfield, OH 45123",
    status: "inactive",
    projectCount: 1,
    contactPerson: "Emily Davis",
    createdAt: "2023-04-05",
    totalSpent: 5750000,
  },
  {
    id: "CLT-005",
    name: "Coastal Hospitality Inc",
    company: "Coastal Hospitality",
    email: "info@coastalhospitality.com",
    phone: "(555) 567-8901",
    address: "202 Harbor View Dr, Miami, FL 33101",
    status: "active",
    projectCount: 1,
    contactPerson: "Robert Wilson",
    createdAt: "2023-05-15",
    totalSpent: 8200000,
  },
]

// Projects
export const projects = [
  {
    id: "PRJ-001",
    name: "Riverside Apartments",
    client: { id: "CLT-001", name: "Riverside Development Corp" },
    status: "In Progress",
    budget: {
      total: 1250000,
      spent: 562500,
      remaining: 687500,
    },
    completion: 45,
    dueDate: "2023-12-15",
    startDate: "2023-06-10",
    description: "Construction of a 50-unit apartment complex with underground parking and rooftop amenities.",
    location: "123 River Lane, Riverside, CA 92501",
    manager: { id: "EMP-001", name: "John Smith" },
    createdAt: "2023-06-01",
    updatedAt: "2023-11-10",
    team: ["EMP-001", "EMP-003", "EMP-005"],
    estimateCount: 3,
    invoiceCount: 5,
    expenseCount: 12,
  },
  {
    id: "PRJ-002",
    name: "Downtown Office Complex",
    client: { id: "CLT-002", name: "Metro Business Solutions" },
    status: "On Hold",
    budget: {
      total: 3500000,
      spent: 700000,
      remaining: 2800000,
    },
    completion: 20,
    dueDate: "2024-03-30",
    startDate: "2023-08-15",
    description:
      "Development of a 10-story office building with retail space on the ground floor and underground parking.",
    location: "456 Downtown Ave, Metro City, NY 10001",
    manager: { id: "EMP-002", name: "Sarah Johnson" },
    createdAt: "2023-07-20",
    updatedAt: "2023-10-25",
    team: ["EMP-002", "EMP-004", "EMP-006"],
    estimateCount: 2,
    invoiceCount: 3,
    expenseCount: 8,
  },
  {
    id: "PRJ-003",
    name: "Sunset Heights Residential",
    client: { id: "CLT-003", name: "Sunset Properties LLC" },
    status: "Completed",
    budget: {
      total: 950000,
      spent: 950000,
      remaining: 0,
    },
    completion: 100,
    dueDate: "2023-08-10",
    startDate: "2023-02-15",
    description: "Construction of 15 luxury townhomes with modern amenities and smart home technology.",
    location: "789 Sunset Blvd, Los Angeles, CA 90028",
    manager: { id: "EMP-003", name: "Michael Scott" },
    createdAt: "2023-01-25",
    updatedAt: "2023-08-12",
    team: ["EMP-003", "EMP-005", "EMP-007"],
    estimateCount: 1,
    invoiceCount: 6,
    expenseCount: 15,
  },
  {
    id: "PRJ-004",
    name: "Greenfield Shopping Mall",
    client: { id: "CLT-004", name: "Greenfield Retail Group" },
    status: "In Progress",
    budget: {
      total: 5750000,
      spent: 3737500,
      remaining: 2012500,
    },
    completion: 65,
    dueDate: "2024-01-20",
    startDate: "2023-04-10",
    description: "Development of a 200,000 sq ft shopping mall with food court, cinema, and outdoor plaza.",
    location: "101 Shopping Center Rd, Greenfield, OH 45123",
    manager: { id: "EMP-004", name: "Jim Halpert" },
    createdAt: "2023-03-15",
    updatedAt: "2023-11-05",
    team: ["EMP-004", "EMP-006", "EMP-008"],
    estimateCount: 4,
    invoiceCount: 8,
    expenseCount: 20,
  },
  {
    id: "PRJ-005",
    name: "Harbor View Hotel",
    client: { id: "CLT-005", name: "Coastal Hospitality Inc" },
    status: "Cancelled",
    budget: {
      total: 8200000,
      spent: 1230000,
      remaining: 6970000,
    },
    completion: 15,
    dueDate: "2024-06-05",
    startDate: "2023-05-20",
    description: "Construction of a 150-room luxury hotel with conference facilities, restaurants, and spa.",
    location: "202 Harbor View Dr, Miami, FL 33101",
    manager: { id: "EMP-005", name: "Pam Beesly" },
    createdAt: "2023-04-25",
    updatedAt: "2023-09-15",
    team: ["EMP-005", "EMP-007", "EMP-009"],
    estimateCount: 2,
    invoiceCount: 3,
    expenseCount: 7,
  },
]

// Employees/Team Members
export const employees = [
  {
    id: "EMP-001",
    name: "John Smith",
    position: "Project Manager",
    email: "john.smith@buildmanager.com",
    phone: "(555) 111-2222",
    hourlyRate: 75,
    department: "Project Management",
    hireDate: "2020-03-15",
    projects: ["PRJ-001"],
    status: "active",
  },
  {
    id: "EMP-002",
    name: "Sarah Johnson",
    position: "Senior Project Manager",
    email: "sarah.johnson@buildmanager.com",
    phone: "(555) 222-3333",
    hourlyRate: 85,
    department: "Project Management",
    hireDate: "2019-06-10",
    projects: ["PRJ-002"],
    status: "active",
  },
  {
    id: "EMP-003",
    name: "Michael Scott",
    position: "Construction Supervisor",
    email: "michael.scott@buildmanager.com",
    phone: "(555) 333-4444",
    hourlyRate: 65,
    department: "Construction",
    hireDate: "2021-01-20",
    projects: ["PRJ-001", "PRJ-003"],
    status: "active",
  },
  {
    id: "EMP-004",
    name: "Jim Halpert",
    position: "Project Manager",
    email: "jim.halpert@buildmanager.com",
    phone: "(555) 444-5555",
    hourlyRate: 75,
    department: "Project Management",
    hireDate: "2020-09-05",
    projects: ["PRJ-004"],
    status: "active",
  },
  {
    id: "EMP-005",
    name: "Pam Beesly",
    position: "Project Coordinator",
    email: "pam.beesly@buildmanager.com",
    phone: "(555) 555-6666",
    hourlyRate: 60,
    department: "Project Management",
    hireDate: "2021-04-15",
    projects: ["PRJ-001", "PRJ-003", "PRJ-005"],
    status: "active",
  },
  {
    id: "EMP-006",
    name: "Dwight Schrute",
    position: "Safety Manager",
    email: "dwight.schrute@buildmanager.com",
    phone: "(555) 666-7777",
    hourlyRate: 70,
    department: "Safety",
    hireDate: "2020-05-10",
    projects: ["PRJ-002", "PRJ-004"],
    status: "active",
  },
  {
    id: "EMP-007",
    name: "Angela Martin",
    position: "Accountant",
    email: "angela.martin@buildmanager.com",
    phone: "(555) 777-8888",
    hourlyRate: 65,
    department: "Finance",
    hireDate: "2019-11-20",
    projects: ["PRJ-003", "PRJ-005"],
    status: "active",
  },
  {
    id: "EMP-008",
    name: "Oscar Martinez",
    position: "Financial Analyst",
    email: "oscar.martinez@buildmanager.com",
    phone: "(555) 888-9999",
    hourlyRate: 70,
    department: "Finance",
    hireDate: "2019-08-15",
    projects: ["PRJ-004"],
    status: "active",
  },
  {
    id: "EMP-009",
    name: "Kevin Malone",
    position: "Procurement Specialist",
    email: "kevin.malone@buildmanager.com",
    phone: "(555) 999-0000",
    hourlyRate: 55,
    department: "Procurement",
    hireDate: "2021-02-10",
    projects: ["PRJ-005"],
    status: "active",
  },
  {
    id: "EMP-010",
    name: "Toby Flenderson",
    position: "HR Manager",
    email: "toby.flenderson@buildmanager.com",
    phone: "(555) 000-1111",
    hourlyRate: 65,
    department: "Human Resources",
    hireDate: "2018-10-05",
    projects: [],
    status: "active",
  },
]

// Estimates
export const estimates = [
  {
    id: "EST-1234",
    projectId: "PRJ-001",
    name: "Riverside Apartments - Foundation",
    client: "Riverside Development Corp",
    category: "Residential/New Construction/Multi Family",
    status: "Draft",
    amount: 245000,
    date: "2023-09-15",
    validUntil: "2023-10-15",
    items: [
      {
        id: "ITEM-001",
        description: "Site Preparation",
        quantity: 1,
        unit: "lot",
        unitPrice: 35000,
        totalPrice: 35000,
      },
      {
        id: "ITEM-002",
        description: "Excavation",
        quantity: 1500,
        unit: "cubic yards",
        unitPrice: 25,
        totalPrice: 37500,
      },
      {
        id: "ITEM-003",
        description: "Concrete Foundation",
        quantity: 250,
        unit: "cubic yards",
        unitPrice: 450,
        totalPrice: 112500,
      },
      { id: "ITEM-004", description: "Waterproofing", quantity: 5000, unit: "sq ft", unitPrice: 8, totalPrice: 40000 },
      {
        id: "ITEM-005",
        description: "Backfill and Compaction",
        quantity: 1,
        unit: "lot",
        unitPrice: 20000,
        totalPrice: 20000,
      },
    ],
  },
  {
    id: "EST-1235",
    projectId: "PRJ-001",
    name: "Riverside Apartments - Electrical",
    client: "Riverside Development Corp",
    category: "Residential/New Construction/Multi Family",
    status: "Sent",
    amount: 178500,
    date: "2023-09-12",
    validUntil: "2023-10-12",
    items: [
      {
        id: "ITEM-006",
        description: "Main Electrical Service",
        quantity: 1,
        unit: "lot",
        unitPrice: 45000,
        totalPrice: 45000,
      },
      {
        id: "ITEM-007",
        description: "Electrical Rough-In",
        quantity: 50,
        unit: "units",
        unitPrice: 1200,
        totalPrice: 60000,
      },
      { id: "ITEM-008", description: "Light Fixtures", quantity: 250, unit: "each", unitPrice: 150, totalPrice: 37500 },
      {
        id: "ITEM-009",
        description: "Electrical Panels",
        quantity: 6,
        unit: "each",
        unitPrice: 3500,
        totalPrice: 21000,
      },
      {
        id: "ITEM-010",
        description: "Low Voltage Wiring",
        quantity: 1,
        unit: "lot",
        unitPrice: 15000,
        totalPrice: 15000,
      },
    ],
  },
  {
    id: "EST-1236",
    projectId: "PRJ-003",
    name: "Sunset Heights Condos - Plumbing",
    client: "Sunset Properties LLC",
    category: "Residential/New Construction/Multi Family",
    status: "Approved",
    amount: 92750,
    date: "2023-09-08",
    validUntil: "2023-10-08",
    items: [
      {
        id: "ITEM-011",
        description: "Main Plumbing Lines",
        quantity: 1,
        unit: "lot",
        unitPrice: 25000,
        totalPrice: 25000,
      },
      {
        id: "ITEM-012",
        description: "Plumbing Rough-In",
        quantity: 15,
        unit: "units",
        unitPrice: 2500,
        totalPrice: 37500,
      },
      {
        id: "ITEM-013",
        description: "Fixtures Installation",
        quantity: 45,
        unit: "each",
        unitPrice: 350,
        totalPrice: 15750,
      },
      { id: "ITEM-014", description: "Water Heaters", quantity: 15, unit: "each", unitPrice: 850, totalPrice: 12750 },
      {
        id: "ITEM-015",
        description: "Testing and Inspection",
        quantity: 1,
        unit: "lot",
        unitPrice: 1750,
        totalPrice: 1750,
      },
    ],
  },
  {
    id: "EST-1237",
    projectId: "PRJ-004",
    name: "Greenfield Shopping Mall - HVAC",
    client: "Greenfield Retail Group",
    category: "Commercial/Retail/Mall",
    status: "Rejected",
    amount: 320000,
    date: "2023-09-05",
    validUntil: "2023-10-05",
    items: [
      { id: "ITEM-016", description: "HVAC Units", quantity: 8, unit: "each", unitPrice: 15000, totalPrice: 120000 },
      { id: "ITEM-017", description: "Ductwork", quantity: 1, unit: "lot", unitPrice: 85000, totalPrice: 85000 },
      {
        id: "ITEM-018",
        description: "Ventilation Systems",
        quantity: 1,
        unit: "lot",
        unitPrice: 45000,
        totalPrice: 45000,
      },
      {
        id: "ITEM-019",
        description: "Controls and Thermostats",
        quantity: 25,
        unit: "each",
        unitPrice: 1200,
        totalPrice: 30000,
      },
      {
        id: "ITEM-020",
        description: "Testing and Balancing",
        quantity: 1,
        unit: "lot",
        unitPrice: 40000,
        totalPrice: 40000,
      },
    ],
  },
  {
    id: "EST-1238",
    projectId: "PRJ-005",
    name: "Lakeside Medical Center - Interior",
    client: "Lakeside Healthcare",
    category: "Commercial/Office Buildings/Large",
    status: "Draft",
    amount: 415000,
    date: "2023-09-01",
    validUntil: "2023-10-01",
    items: [
      {
        id: "ITEM-021",
        description: "Drywall Installation",
        quantity: 25000,
        unit: "sq ft",
        unitPrice: 4.5,
        totalPrice: 112500,
      },
      { id: "ITEM-022", description: "Painting", quantity: 30000, unit: "sq ft", unitPrice: 3.5, totalPrice: 105000 },
      { id: "ITEM-023", description: "Flooring", quantity: 20000, unit: "sq ft", unitPrice: 7.5, totalPrice: 150000 },
      {
        id: "ITEM-024",
        description: "Ceiling Grid and Tiles",
        quantity: 15000,
        unit: "sq ft",
        unitPrice: 2.5,
        totalPrice: 37500,
      },
      {
        id: "ITEM-025",
        description: "Interior Doors and Hardware",
        quantity: 50,
        unit: "each",
        unitPrice: 200,
        totalPrice: 10000,
      },
    ],
  },
]

// Invoices
export const invoices = [
  {
    id: "INV-2001",
    projectId: "PRJ-001",
    clientId: "CLT-001",
    amount: 85000,
    status: "Paid",
    issueDate: "2023-07-15",
    dueDate: "2023-08-15",
    paidDate: "2023-08-10",
    description: "Initial payment for Riverside Apartments foundation work",
    items: [
      { description: "Site Preparation", amount: 35000 },
      { description: "Excavation (50%)", amount: 18750 },
      { description: "Mobilization Fee", amount: 31250 },
    ],
  },
  {
    id: "INV-2002",
    projectId: "PRJ-001",
    clientId: "CLT-001",
    amount: 125000,
    status: "Paid",
    issueDate: "2023-08-20",
    dueDate: "2023-09-20",
    paidDate: "2023-09-18",
    description: "Second payment for Riverside Apartments foundation work",
    items: [
      { description: "Excavation (50% Remaining)", amount: 18750 },
      { description: "Concrete Foundation (75%)", amount: 84375 },
      { description: "Waterproofing (25%)", amount: 10000 },
      { description: "Backfill (50%)", amount: 10000 },
    ],
  },
  {
    id: "INV-2003",
    projectId: "PRJ-001",
    clientId: "CLT-001",
    amount: 78125,
    status: "Overdue",
    issueDate: "2023-09-25",
    dueDate: "2023-10-25",
    paidDate: null,
    description: "Final payment for Riverside Apartments foundation work",
    items: [
      { description: "Concrete Foundation (25% Remaining)", amount: 28125 },
      { description: "Waterproofing (75% Remaining)", amount: 30000 },
      { description: "Backfill (50% Remaining)", amount: 10000 },
      { description: "Final Inspection", amount: 10000 },
    ],
  },
  {
    id: "INV-2004",
    projectId: "PRJ-002",
    clientId: "CLT-002",
    amount: 250000,
    status: "Paid",
    issueDate: "2023-09-01",
    dueDate: "2023-10-01",
    paidDate: "2023-09-28",
    description: "Initial payment for Downtown Office Complex",
    items: [
      { description: "Site Preparation", amount: 75000 },
      { description: "Permits and Fees", amount: 45000 },
      { description: "Initial Structural Work", amount: 130000 },
    ],
  },
  {
    id: "INV-2005",
    projectId: "PRJ-002",
    clientId: "CLT-002",
    amount: 450000,
    status: "Pending",
    issueDate: "2023-10-15",
    dueDate: "2023-11-15",
    paidDate: null,
    description: "Second payment for Downtown Office Complex",
    items: [
      { description: "Structural Work (Continued)", amount: 200000 },
      { description: "Exterior Walls", amount: 150000 },
      { description: "Roofing", amount: 100000 },
    ],
  },
  {
    id: "INV-2006",
    projectId: "PRJ-003",
    clientId: "CLT-003",
    amount: 950000,
    status: "Paid",
    issueDate: "2023-08-01",
    dueDate: "2023-09-01",
    paidDate: "2023-08-25",
    description: "Final payment for Sunset Heights Residential",
    items: [
      { description: "Construction Completion", amount: 750000 },
      { description: "Landscaping", amount: 125000 },
      { description: "Final Inspections and Permits", amount: 75000 },
    ],
  },
]

// Expenses
export const expenses = [
  {
    id: "EXP-1234",
    description: "Building Materials",
    category: "Materials",
    projectId: "PRJ-001",
    project: "Riverside Apartments",
    amount: 2450,
    date: "2023-09-15",
    status: "Approved",
    submittedBy: "EMP-001",
    submittedByName: "John Smith",
    receiptUrl: "/placeholder.svg?height=300&width=200",
    notes: "Concrete and rebar for foundation work",
  },
  {
    id: "EXP-1235",
    description: "Equipment Rental",
    category: "Equipment",
    projectId: "PRJ-002",
    project: "Downtown Office Complex",
    amount: 1850,
    date: "2023-09-12",
    status: "Pending",
    submittedBy: "EMP-002",
    submittedByName: "Sarah Johnson",
    receiptUrl: "/placeholder.svg?height=300&width=200",
    notes: "Crane rental for steel beam installation",
  },
  {
    id: "EXP-1236",
    description: "Contractor Payment",
    category: "Labor",
    projectId: "PRJ-003",
    project: "Sunset Heights Condos",
    amount: 3750,
    date: "2023-09-08",
    status: "Approved",
    submittedBy: "EMP-003",
    submittedByName: "Michael Scott",
    receiptUrl: "/placeholder.svg?height=300&width=200",
    notes: "Plumbing subcontractor final payment",
  },
  {
    id: "EXP-1237",
    description: "Permit Fees",
    category: "Administrative",
    projectId: "PRJ-004",
    project: "Greenfield Shopping Mall",
    amount: 850,
    date: "2023-09-05",
    status: "Rejected",
    submittedBy: "EMP-004",
    submittedByName: "Jim Halpert",
    receiptUrl: "/placeholder.svg?height=300&width=200",
    notes: "Building permit renewal - rejected due to incorrect form",
  },
  {
    id: "EXP-1238",
    description: "Site Utilities",
    category: "Utilities",
    projectId: "PRJ-005",
    project: "Lakeside Medical Center",
    amount: 1250,
    date: "2023-09-01",
    status: "Pending",
    submittedBy: "EMP-005",
    submittedByName: "Pam Beesly",
    receiptUrl: "/placeholder.svg?height=300&width=200",
    notes: "Temporary power and water services",
  },
]

// Wages
export const wages = [
  {
    id: "WG-001",
    employeeId: "EMP-001",
    employeeName: "John Smith",
    projectId: "PRJ-001",
    date: "2023-09-15",
    hours: 8,
    rate: 75,
    amount: 600,
    description: "Project management and site supervision",
  },
  {
    id: "WG-002",
    employeeId: "EMP-003",
    employeeName: "Michael Scott",
    projectId: "PRJ-001",
    date: "2023-09-15",
    hours: 10,
    rate: 65,
    amount: 650,
    description: "Construction supervision and quality control",
  },
  {
    id: "WG-003",
    employeeId: "EMP-005",
    employeeName: "Pam Beesly",
    projectId: "PRJ-001",
    date: "2023-09-15",
    hours: 8,
    rate: 60,
    amount: 480,
    description: "Project coordination and documentation",
  },
  {
    id: "WG-004",
    employeeId: "EMP-002",
    employeeName: "Sarah Johnson",
    projectId: "PRJ-002",
    date: "2023-09-14",
    hours: 9,
    rate: 85,
    amount: 765,
    description: "Project management and client meeting",
  },
  {
    id: "WG-005",
    employeeId: "EMP-006",
    employeeName: "Dwight Schrute",
    projectId: "PRJ-002",
    date: "2023-09-14",
    hours: 8,
    rate: 70,
    amount: 560,
    description: "Safety inspections and compliance checks",
  },
]

// Payroll
export const payrolls = [
  {
    id: "PAY-001",
    period: {
      start: "2023-09-01",
      end: "2023-09-15",
    },
    status: "Paid",
    totalAmount: 15750,
    employeeCount: 10,
    createdAt: "2023-09-16",
    processedAt: "2023-09-18",
  },
  {
    id: "PAY-002",
    period: {
      start: "2023-09-16",
      end: "2023-09-30",
    },
    status: "Processing",
    totalAmount: 16200,
    employeeCount: 10,
    createdAt: "2023-10-01",
    processedAt: null,
  },
  {
    id: "PAY-003",
    period: {
      start: "2023-10-01",
      end: "2023-10-15",
    },
    status: "Draft",
    totalAmount: 15900,
    employeeCount: 10,
    createdAt: "2023-10-16",
    processedAt: null,
  },
]

// Budget Categories
export const budgetCategories = [
  {
    id: "BC-001",
    name: "Materials",
    allocation: 500000,
    spent: 225000,
    remaining: 275000,
  },
  {
    id: "BC-002",
    name: "Labor",
    allocation: 350000,
    spent: 157500,
    remaining: 192500,
  },
  {
    id: "BC-003",
    name: "Equipment",
    allocation: 150000,
    spent: 67500,
    remaining: 82500,
  },
  {
    id: "BC-004",
    name: "Subcontractors",
    allocation: 200000,
    spent: 90000,
    remaining: 110000,
  },
  {
    id: "BC-005",
    name: "Permits and Fees",
    allocation: 50000,
    spent: 22500,
    remaining: 27500,
  },
]

// Budget for a specific project
export const projectBudget = {
  id: "BUD-001",
  projectId: "PRJ-001",
  totalBudget: 1250000,
  allocatedBudget: 1250000,
  spentBudget: 562500,
  remainingBudget: 687500,
  categories: budgetCategories,
}

// Reports
export const reports = [
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
]

// Events/Schedule
export const events = [
  {
    id: "EVT-001",
    title: "Project Kickoff Meeting",
    projectId: "PRJ-001",
    start: "2023-11-20T09:00:00",
    end: "2023-11-20T11:00:00",
    location: "Main Office Conference Room",
    description: "Initial kickoff meeting with project stakeholders",
    attendees: ["EMP-001", "EMP-003", "EMP-005"],
    status: "Scheduled",
  },
  {
    id: "EVT-002",
    title: "Site Inspection",
    projectId: "PRJ-001",
    start: "2023-11-22T13:00:00",
    end: "2023-11-22T15:00:00",
    location: "Riverside Apartments Site",
    description: "Inspection of foundation work progress",
    attendees: ["EMP-001", "EMP-003"],
    status: "Scheduled",
  },
  {
    id: "EVT-003",
    title: "Client Progress Review",
    projectId: "PRJ-002",
    start: "2023-11-21T10:00:00",
    end: "2023-11-21T11:30:00",
    location: "Client Office",
    description: "Monthly progress review with client",
    attendees: ["EMP-002", "EMP-006"],
    status: "Scheduled",
  },
  {
    id: "EVT-004",
    title: "Subcontractor Meeting",
    projectId: "PRJ-004",
    start: "2023-11-23T14:00:00",
    end: "2023-11-23T16:00:00",
    location: "Greenfield Site Office",
    description: "Coordination meeting with all subcontractors",
    attendees: ["EMP-004", "EMP-008"],
    status: "Scheduled",
  },
  {
    id: "EVT-005",
    title: "Safety Training",
    projectId: null,
    start: "2023-11-24T09:00:00",
    end: "2023-11-24T16:00:00",
    location: "Training Center",
    description: "Mandatory safety training for all field staff",
    attendees: ["EMP-001", "EMP-002", "EMP-003", "EMP-004", "EMP-005", "EMP-006"],
    status: "Scheduled",
  },
]

// Purchase Orders
export const purchaseOrders = [
  {
    id: "PO-1001",
    vendor: "ABC Building Supplies",
    project: "Riverside Apartments",
    projectId: "PRJ-001",
    status: "Approved",
    amount: 12500,
    deliveryDate: "2023-12-15",
    createdAt: "2023-11-15",
    shippingAddress: "123 River Lane, Riverside, CA 92501",
    billingAddress: "123 River Lane, Riverside, CA 92501",
    paymentTerms: "Net 30",
    notes: "Please deliver to the north entrance of the construction site.",
    items: [
      { description: "Lumber - 2x4", quantity: 500, unit: "pieces", unitPrice: 8.5, total: 4250 },
      { description: "Concrete (Ready Mix)", quantity: 20, unit: "cubic yards", unitPrice: 125, total: 2500 },
      { description: "Rebar #4", quantity: 100, unit: "pieces", unitPrice: 15.75, total: 1575 },
    ],
    subtotal: 8325,
    tax: 707.63,
    total: 9032.63,
  },
  {
    id: "PO-1002",
    vendor: "Metro Electrical Wholesale",
    project: "Downtown Office Complex",
    projectId: "PRJ-002",
    status: "Pending",
    amount: 8750,
    deliveryDate: "2023-12-20",
    createdAt: "2023-11-18",
    shippingAddress: "456 Downtown Ave, Metro City, NY 10001",
    billingAddress: "456 Downtown Ave, Metro City, NY 10001",
    paymentTerms: "Net 30",
    notes: "Call site manager before delivery.",
    items: [
      { description: "Electrical Wire (12/2)", quantity: 1000, unit: "feet", unitPrice: 0.85, total: 850 },
      { description: "Circuit Breakers", quantity: 25, unit: "each", unitPrice: 45, total: 1125 },
      { description: "LED Light Fixtures", quantity: 50, unit: "each", unitPrice: 125, total: 6250 },
    ],
    subtotal: 8225,
    tax: 699.13,
    total: 8924.13,
  },
  {
    id: "PO-1003",
    vendor: "Quality Plumbing Supply",
    project: "Sunset Heights Condos",
    projectId: "PRJ-003",
    status: "Delivered",
    amount: 6250,
    deliveryDate: "2023-11-30",
    createdAt: "2023-11-10",
    shippingAddress: "789 Sunset Blvd, Los Angeles, CA 90028",
    billingAddress: "789 Sunset Blvd, Los Angeles, CA 90028",
    paymentTerms: "Net 15",
    notes: "Delivery completed on time.",
    items: [
      { description: "PVC Pipe (1 inch)", quantity: 500, unit: "feet", unitPrice: 2.25, total: 1125 },
      { description: "Copper Pipe (1/2 inch)", quantity: 300, unit: "feet", unitPrice: 3.5, total: 1050 },
      { description: "Bathroom Fixtures", quantity: 15, unit: "sets", unitPrice: 275, total: 4125 },
    ],
    subtotal: 6300,
    tax: 535.5,
    total: 6835.5,
  },
  {
    id: "PO-1004",
    vendor: "Greenfield Construction Materials",
    project: "Greenfield Shopping Mall",
    projectId: "PRJ-004",
    status: "Cancelled",
    amount: 18500,
    deliveryDate: "2023-12-10",
    createdAt: "2023-11-05",
    shippingAddress: "101 Shopping Center Rd, Greenfield, OH 45123",
    billingAddress: "101 Shopping Center Rd, Greenfield, OH 45123",
    paymentTerms: "Net 30",
    notes: "Order cancelled due to project delay.",
    items: [
      { description: "Roofing Shingles", quantity: 100, unit: "bundles", unitPrice: 45, total: 4500 },
      { description: "Insulation (R-19)", quantity: 5000, unit: "sq ft", unitPrice: 1.25, total: 6250 },
      { description: "Drywall (4x8 sheet)", quantity: 200, unit: "sheets", unitPrice: 12.5, total: 2500 },
    ],
    subtotal: 13250,
    tax: 1126.25,
    total: 14376.25,
  },
  {
    id: "PO-1005",
    vendor: "Coastal Building Products",
    project: "Harbor View Hotel",
    projectId: "PRJ-005",
    status: "Pending",
    amount: 22750,
    deliveryDate: "2023-12-22",
    createdAt: "2023-11-20",
    shippingAddress: "202 Harbor View Dr, Miami, FL 33101",
    billingAddress: "202 Harbor View Dr, Miami, FL 33101",
    paymentTerms: "Net 45",
    notes: "Special delivery instructions: Deliver between 8am-10am only.",
    items: [
      { description: "Windows (Standard)", quantity: 75, unit: "each", unitPrice: 175, total: 13125 },
      { description: "Door (Exterior)", quantity: 25, unit: "each", unitPrice: 225, total: 5625 },
      { description: "Paint (Exterior)", quantity: 100, unit: "gallons", unitPrice: 35, total: 3500 },
    ],
    subtotal: 22250,
    tax: 1891.25,
    total: 24141.25,
  },
]

// Proposals
export const proposals = [
  {
    id: "PROP-1234",
    projectId: "PRJ-001",
    name: "Riverside Apartments Development",
    client: "Riverside Development Corp",
    status: "Draft",
    amount: 2450000,
    date: "2023-09-15",
    expiryDate: "2023-10-15",
  },
  {
    id: "PROP-1235",
    projectId: "PRJ-002",
    name: "Oakwood Office Complex Construction",
    client: "Metro Business Solutions",
    status: "Sent",
    amount: 5178500,
    date: "2023-09-12",
    expiryDate: "2023-10-12",
  },
  {
    id: "PROP-1236",
    projectId: "PRJ-003",
    name: "Sunset Heights Condos Development",
    client: "Sunset Properties LLC",
    status: "Accepted",
    amount: 3892750,
    date: "2023-09-08",
    expiryDate: "2023-10-08",
  },
  {
    id: "PROP-1237",
    projectId: "PRJ-004",
    name: "Greenfield Shopping Mall Renovation",
    client: "Greenfield Retail Group",
    status: "Rejected",
    amount: 7320000,
    date: "2023-09-05",
    expiryDate: "2023-10-05",
  },
  {
    id: "PROP-1238",
    projectId: "PRJ-005",
    name: "Lakeside Medical Center Construction",
    client: "Lakeside Healthcare",
    status: "Draft",
    amount: 4415000,
    date: "2023-09-01",
    expiryDate: "2023-10-01",
  },
]

// Update the getData function to include purchase orders
export const getData = (dataType: string, filters?: Record<string, any>) => {
  let data: any[] = []

  switch (dataType) {
    case "clients":
      data = clients
      break
    case "projects":
      data = projects
      break
    case "employees":
      data = employees
      break
    case "estimates":
      data = estimates
      break
    case "invoices":
      data = invoices
      break
    case "expenses":
      data = expenses
      break
    case "wages":
      data = wages
      break
    case "payrolls":
      data = payrolls
      break
    case "reports":
      data = reports
      break
    case "events":
      data = events
      break
    case "purchaseOrders":
      data = purchaseOrders
      break
    case "proposals":
      data = proposals
      break
    default:
      return []
  }

  // Apply filters if provided
  if (filters) {
    return data.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (key.includes(".")) {
          // Handle nested properties like 'client.id'
          const parts = key.split(".")
          let nestedItem = { ...item }
          for (const part of parts) {
            if (nestedItem[part] === undefined) return false
            nestedItem = nestedItem[part]
          }
          return nestedItem === value
        }
        return item[key] === value
      })
    })
  }

  return data
}

// Function to get a single item by ID
export const getItemById = (dataType: string, id: string) => {
  const data = getData(dataType)
  return data.find((item) => item.id === id)
}

// Function to simulate API delay
export const simulateApiDelay = async (ms = 500) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

