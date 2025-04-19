"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts"
import { cn } from "@/lib/utils"

const projectData = [
  { name: "Jan", value: 4 },
  { name: "Feb", value: 7 },
  { name: "Mar", value: 5 },
  { name: "Apr", value: 8 },
  { name: "May", value: 12 },
  { name: "Jun", value: 10 },
  { name: "Jul", value: 9 },
]

const budgetData = [
  { name: "Jan", planned: 40000, actual: 45000 },
  { name: "Feb", planned: 35000, actual: 32000 },
  { name: "Mar", planned: 50000, actual: 55000 },
  { name: "Apr", planned: 45000, actual: 42000 },
  { name: "May", planned: 60000, actual: 58000 },
  { name: "Jun", planned: 55000, actual: 60000 },
  { name: "Jul", planned: 70000, actual: 68000 },
]

interface DashboardChartsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardCharts({ className, ...props }: DashboardChartsProps) {
  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>Project and budget performance over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="projects">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
          </TabsList>
          <TabsContent value="projects" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="budget" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={budgetData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="planned" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

