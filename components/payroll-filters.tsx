"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Search, X } from "lucide-react"
import { useState } from "react"

export function PayrollFilters() {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    dateFrom: null as Date | null,
    dateTo: null as Date | null,
  })

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "",
      dateFrom: null,
      dateTo: null,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1 flex items-center relative">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search payrolls..."
            className="pl-8"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Processing">Processing</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex items-center gap-2 flex-1">
          <div className="grid gap-2 flex-1">
            <div className="text-sm">From</div>
            <DatePicker
              selected={filters.dateFrom}
              onSelect={(date) => setFilters({ ...filters, dateFrom: date })}
              placeholder="Select date"
            />
          </div>
          <div className="grid gap-2 flex-1">
            <div className="text-sm">To</div>
            <DatePicker
              selected={filters.dateTo}
              onSelect={(date) => setFilters({ ...filters, dateTo: date })}
              placeholder="Select date"
            />
          </div>
        </div>
        <div className="flex items-end">
          <Button variant="outline" size="icon" onClick={clearFilters}>
            <X className="h-4 w-4" />
            <span className="sr-only">Clear filters</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

