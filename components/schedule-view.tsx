"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, MapPin } from "lucide-react"

export function ScheduleView() {
  const events = [
    {
      id: "EVT-001",
      title: "Project Alpha Kickoff Meeting",
      time: "9:00 AM - 10:30 AM",
      location: "Main Office - Conference Room A",
      attendees: [
        { name: "John Smith", avatar: "/placeholder-user.jpg", initials: "JS" },
        { name: "Sarah Johnson", avatar: "/placeholder-user.jpg", initials: "SJ" },
        { name: "Michael Scott", avatar: "/placeholder-user.jpg", initials: "MS" },
      ],
      type: "Meeting",
    },
    {
      id: "EVT-002",
      title: "Site Inspection - Riverside Apartments",
      time: "11:00 AM - 1:00 PM",
      location: "Riverside Construction Site",
      attendees: [
        { name: "Jim Halpert", avatar: "/placeholder-user.jpg", initials: "JH" },
        { name: "Pam Beesly", avatar: "/placeholder-user.jpg", initials: "PB" },
      ],
      type: "Site Visit",
    },
    {
      id: "EVT-003",
      title: "Material Delivery - Oakwood Office Complex",
      time: "2:00 PM - 3:30 PM",
      location: "Oakwood Construction Site",
      attendees: [{ name: "Dwight Schrute", avatar: "/placeholder-user.jpg", initials: "DS" }],
      type: "Delivery",
    },
    {
      id: "EVT-004",
      title: "Client Meeting - Sunset Heights Condos",
      time: "4:00 PM - 5:00 PM",
      location: "Client Office",
      attendees: [
        { name: "John Smith", avatar: "/placeholder-user.jpg", initials: "JS" },
        { name: "Angela Martin", avatar: "/placeholder-user.jpg", initials: "AM" },
      ],
      type: "Meeting",
    },
  ]

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex border-l-4 border-primary">
              <div className="p-4 flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{event.title}</h3>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
                <div className="grid gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="mt-4 flex -space-x-2">
                  {event.attendees.map((attendee, i) => (
                    <Avatar key={i} className="h-8 w-8 border-2 border-background">
                      <AvatarImage src={attendee.avatar} alt={attendee.name} />
                      <AvatarFallback>{attendee.initials}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

