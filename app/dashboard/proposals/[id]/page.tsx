"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Edit,
  FileText,
  Printer,
  Send,
  Building,
  Calendar,
  DollarSign,
  Clock,
  User,
  LinkIcon,
} from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { getItemById, simulateApiDelay } from "@/lib/dummy-data"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function ProposalDetailPage() {
  const params = useParams()
  const router = useRouter()
  const proposalId = params.id as string
  const [proposal, setProposal] = useState<any>(null)
  const [project, setProject] = useState<any>(null)
  const [client, setClient] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchProposal = async () => {
      setIsLoading(true)
      setIsError(false)

      try {
        await simulateApiDelay()
        const proposalData = getItemById("proposals", proposalId)

        if (proposalData) {
          setProposal(proposalData)

          // Fetch related project
          const projectData = getItemById("projects", proposalData.projectId)
          if (projectData) {
            setProject(projectData)

            // Fetch client
            const clientData = getItemById("clients", projectData.client.id)
            if (clientData) {
              setClient(clientData)
            }
          }
        } else {
          setIsError(true)
        }
      } catch (error) {
        console.error("Error fetching proposal:", error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProposal()
  }, [proposalId])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" disabled>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Skeleton className="h-8 w-[300px]" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-[300px] w-full md:col-span-2" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>
    )
  }

  if (isError || !proposal) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/proposals">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Proposal Not Found</h1>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <FileText className="h-12 w-12 text-muted-foreground" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Proposal Not Found</h3>
                <p className="text-muted-foreground">
                  The proposal you're looking for doesn't exist or you don't have access to it.
                </p>
              </div>
              <Button onClick={() => router.push("/dashboard/proposals")}>Return to Proposals</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Generate sample proposal items
  const proposalItems = [
    {
      id: "ITEM-001",
      description: "Site Preparation and Mobilization",
      quantity: 1,
      unit: "Lot",
      unitPrice: Math.round(proposal.amount * 0.05),
      total: Math.round(proposal.amount * 0.05),
    },
    {
      id: "ITEM-002",
      description: "Foundation Work",
      quantity: 1,
      unit: "Lot",
      unitPrice: Math.round(proposal.amount * 0.15),
      total: Math.round(proposal.amount * 0.15),
    },
    {
      id: "ITEM-003",
      description: "Structural Framework",
      quantity: 1,
      unit: "Lot",
      unitPrice: Math.round(proposal.amount * 0.25),
      total: Math.round(proposal.amount * 0.25),
    },
    {
      id: "ITEM-004",
      description: "Electrical, Plumbing, and HVAC Systems",
      quantity: 1,
      unit: "Lot",
      unitPrice: Math.round(proposal.amount * 0.2),
      total: Math.round(proposal.amount * 0.2),
    },
    {
      id: "ITEM-005",
      description: "Interior Finishes",
      quantity: 1,
      unit: "Lot",
      unitPrice: Math.round(proposal.amount * 0.15),
      total: Math.round(proposal.amount * 0.15),
    },
    {
      id: "ITEM-006",
      description: "Exterior Finishes and Landscaping",
      quantity: 1,
      unit: "Lot",
      unitPrice: Math.round(proposal.amount * 0.1),
      total: Math.round(proposal.amount * 0.1),
    },
    {
      id: "ITEM-007",
      description: "Project Management and Supervision",
      quantity: 1,
      unit: "Lot",
      unitPrice: Math.round(proposal.amount * 0.1),
      total: Math.round(proposal.amount * 0.1),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/proposals">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{proposal.name}</h1>
            <p className="text-sm text-muted-foreground">
              {proposal.id} • Created on {formatDate(proposal.date)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => window.open(`/api/proposals/${proposal.id}/pdf`, "_blank")}>
            <FileText className="mr-2 h-4 w-4" />
            View PDF
          </Button>
          <Button>
            <Send className="mr-2 h-4 w-4" />
            Send to Client
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="items">Items & Pricing</TabsTrigger>
              <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Proposal Overview</CardTitle>
                  <CardDescription>Detailed information about this proposal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Description</h3>
                        <p className="text-sm text-muted-foreground">
                          This proposal outlines the scope of work, timeline, and costs for the {proposal.name} project.
                          The project includes site preparation, construction, and finishing work as detailed in the
                          attached specifications.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Scope of Work</h3>
                        <p className="text-sm text-muted-foreground">
                          Our team will provide all necessary labor, materials, equipment, and supervision to complete
                          the project according to the plans and specifications. This includes site preparation,
                          foundation work, structural framing, electrical and plumbing systems, interior and exterior
                          finishes, and final cleanup.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Timeline</h3>
                        <p className="text-sm text-muted-foreground">
                          The estimated timeline for this project is 12-18 months from the start date, subject to
                          weather conditions, permit approvals, and material availability. A detailed project schedule
                          will be provided upon acceptance of this proposal.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Payment Terms</h3>
                        <p className="text-sm text-muted-foreground">
                          Payment will be structured as follows:
                          <br />• 20% due upon contract signing
                          <br />• 30% due upon completion of foundation work
                          <br />• 30% due upon completion of structural framing
                          <br />• 15% due upon substantial completion
                          <br />• 5% due upon final inspection and approval
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Proposal Date</p>
                        <p className="text-sm text-muted-foreground">{formatDate(proposal.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Valid Until</p>
                        <p className="text-sm text-muted-foreground">{formatDate(proposal.expiryDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Total Amount</p>
                        <p className="text-sm font-bold">{formatCurrency(proposal.amount)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="items">
              <Card>
                <CardHeader>
                  <CardTitle>Proposal Items</CardTitle>
                  <CardDescription>Detailed breakdown of costs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Quantity</TableHead>
                          <TableHead className="text-right">Unit</TableHead>
                          <TableHead className="text-right">Unit Price</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {proposalItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.description}</TableCell>
                            <TableCell className="text-right">{item.quantity}</TableCell>
                            <TableCell className="text-right">{item.unit}</TableCell>
                            <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(item.total)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell colSpan={4} className="text-right font-medium">
                            Subtotal
                          </TableCell>
                          <TableCell className="text-right font-medium">{formatCurrency(proposal.amount)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={4} className="text-right font-medium">
                            Tax (0%)
                          </TableCell>
                          <TableCell className="text-right font-medium">{formatCurrency(0)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={4} className="text-right font-bold">
                            Total
                          </TableCell>
                          <TableCell className="text-right font-bold">{formatCurrency(proposal.amount)}</TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="terms">
              <Card>
                <CardHeader>
                  <CardTitle>Terms & Conditions</CardTitle>
                  <CardDescription>Legal terms for this proposal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">1. Acceptance</h3>
                    <p className="text-sm text-muted-foreground">
                      This proposal becomes a binding agreement upon written acceptance by the client. The client's
                      signature on this document or issuance of a purchase order referencing this proposal constitutes
                      acceptance of all terms and conditions stated herein.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">2. Validity</h3>
                    <p className="text-sm text-muted-foreground">
                      This proposal is valid for 30 days from the date of issuance. After this period, we reserve the
                      right to revise pricing, timeline, or other terms.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">3. Changes and Modifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Any changes to the scope of work, materials, or specifications must be agreed upon in writing by
                      both parties. Such changes may result in price adjustments and/or timeline modifications.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">4. Payment Terms</h3>
                    <p className="text-sm text-muted-foreground">
                      Payment shall be made according to the schedule outlined in this proposal. Late payments are
                      subject to a 1.5% monthly interest charge. We reserve the right to suspend work if payments are
                      not received as scheduled.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">5. Warranties</h3>
                    <p className="text-sm text-muted-foreground">
                      We warrant our workmanship for a period of one year from the date of substantial completion.
                      Materials are warranted according to the manufacturer's specifications. This warranty does not
                      cover damage due to normal wear and tear, improper use, or acts of nature.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">6. Insurance and Liability</h3>
                    <p className="text-sm text-muted-foreground">
                      We maintain comprehensive liability insurance and workers' compensation coverage. A certificate of
                      insurance will be provided upon request. We are not responsible for pre-existing conditions or
                      issues not directly related to our work.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">7. Termination</h3>
                    <p className="text-sm text-muted-foreground">
                      Either party may terminate this agreement with 30 days written notice. In the event of
                      termination, the client shall pay for all work completed up to the termination date, plus any
                      non-cancelable commitments made by us.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Proposal Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center text-center space-y-4 py-2">
                <Badge
                  className="text-base px-4 py-1"
                  variant={
                    proposal.status === "Accepted"
                      ? "outline"
                      : proposal.status === "Sent"
                        ? "default"
                        : proposal.status === "Rejected"
                          ? "destructive"
                          : "secondary"
                  }
                >
                  {proposal.status}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {proposal.status === "Draft" &&
                    "This proposal is still in draft mode and has not been sent to the client."}
                  {proposal.status === "Sent" && "This proposal has been sent to the client and is awaiting response."}
                  {proposal.status === "Accepted" && "This proposal has been accepted by the client."}
                  {proposal.status === "Rejected" && "This proposal has been rejected by the client."}
                </p>
              </div>

              <div className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/dashboard/proposals/${proposal.id}/edit`)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
              </div>
            </CardContent>
          </Card>

          {client && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">{client.company}</p>
                      <p className="text-sm text-muted-foreground">{client.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{client.contactPerson}</p>
                      <p className="text-sm text-muted-foreground">Contact Person</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm">{client.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm">{client.phone}</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full mt-2"
                    onClick={() => router.push(`/dashboard/clients/${client.id}`)}
                  >
                    <LinkIcon className="mr-2 h-4 w-4" />
                    View Client Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {project && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Related Project</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{project.name}</h3>
                    <Badge
                      variant={
                        project.status === "Completed"
                          ? "outline"
                          : project.status === "In Progress"
                            ? "default"
                            : project.status === "On Hold"
                              ? "secondary"
                              : "destructive"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Completion</span>
                      <span>{project.completion}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: `${project.completion}%` }}></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Start Date</p>
                      <p>{formatDate(project.startDate)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Due Date</p>
                      <p>{formatDate(project.dueDate)}</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full mt-2"
                    onClick={() => router.push(`/dashboard/projects/${project.id}`)}
                  >
                    <LinkIcon className="mr-2 h-4 w-4" />
                    View Project Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

// Import the Table components
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Import additional icons
import { Mail, Phone } from "lucide-react"

