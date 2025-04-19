"use client"

import { useEffect, useState } from "react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

interface ReportDetailChartProps {
  reportId: string
}

export function ReportDetailChart({ reportId }: ReportDetailChartProps) {
  const [chartType, setChartType] = useState<"bar" | "pie" | "line">("bar")

  // Set chart type based on report ID
  useEffect(() => {
    if (reportId === "REP-001") {
      setChartType("bar")
    } else if (reportId === "REP-002") {
      setChartType("pie")
    } else if (reportId === "REP-003") {
      setChartType("line")
    }
  }, [reportId])

  // Dummy data for different chart types
  const barData = [
    { name: "Project A", completed: 65, total: 100 },
    { name: "Project B", completed: 80, total: 100 },
    { name: "Project C", completed: 45, total: 100 },
    { name: "Project D", completed: 90, total: 100 },
    { name: "Project E", completed: 30, total: 100 },
    { name: "Project F", completed: 75, total: 100 },
  ]

  const pieData = [
    { name: "Labor", value: 35 },
    { name: "Materials", value: 40 },
    { name: "Equipment", value: 15 },
    { name: "Overhead", value: 10 },
  ]

  const lineData = [
    { name: "Jan", value: 40 },
    { name: "Feb", value: 45 },
    { name: "Mar", value: 35 },
    { name: "Apr", value: 50 },
    { name: "May", value: 60 },
    { name: "Jun", value: 55 },
    { name: "Jul", value: 70 },
    { name: "Aug", value: 65 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="h-[400px] w-full">
      {chartType === "bar" && (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="completed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}

      {chartType === "pie" && (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}

      {chartType === "line" && (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

