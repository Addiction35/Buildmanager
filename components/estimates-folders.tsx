"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronRight, Folder, FolderOpen, Plus } from "lucide-react"
import { useState } from "react"

export function EstimatesFolders() {
  const [activeFolder, setActiveFolder] = useState<string | null>("residential")

  const folderStructure = [
    {
      id: "residential",
      name: "Residential",
      icon: Folder,
      subfolders: [
        {
          id: "residential-new",
          name: "New Construction",
          icon: Folder,
          subfolders: [
            {
              id: "residential-new-single",
              name: "Single Family",
              icon: Folder,
              subfolders: [
                { id: "residential-new-single-small", name: "Small (< 2000 sq ft)", icon: Folder },
                { id: "residential-new-single-medium", name: "Medium (2000-3500 sq ft)", icon: Folder },
                { id: "residential-new-single-large", name: "Large (> 3500 sq ft)", icon: Folder },
              ],
            },
            {
              id: "residential-new-multi",
              name: "Multi Family",
              icon: Folder,
              subfolders: [
                { id: "residential-new-multi-duplex", name: "Duplex", icon: Folder },
                { id: "residential-new-multi-townhouse", name: "Townhouse", icon: Folder },
                { id: "residential-new-multi-apartment", name: "Apartment", icon: Folder },
              ],
            },
          ],
        },
        {
          id: "residential-renovation",
          name: "Renovation",
          icon: Folder,
          subfolders: [
            { id: "residential-renovation-kitchen", name: "Kitchen", icon: Folder },
            { id: "residential-renovation-bathroom", name: "Bathroom", icon: Folder },
            { id: "residential-renovation-addition", name: "Addition", icon: Folder },
            { id: "residential-renovation-full", name: "Full House", icon: Folder },
          ],
        },
      ],
    },
    {
      id: "commercial",
      name: "Commercial",
      icon: Folder,
      subfolders: [
        {
          id: "commercial-office",
          name: "Office Buildings",
          icon: Folder,
          subfolders: [
            { id: "commercial-office-small", name: "Small (< 10,000 sq ft)", icon: Folder },
            { id: "commercial-office-medium", name: "Medium (10,000-50,000 sq ft)", icon: Folder },
            { id: "commercial-office-large", name: "Large (> 50,000 sq ft)", icon: Folder },
          ],
        },
        {
          id: "commercial-retail",
          name: "Retail",
          icon: Folder,
          subfolders: [
            { id: "commercial-retail-storefront", name: "Storefront", icon: Folder },
            { id: "commercial-retail-mall", name: "Mall", icon: Folder },
            { id: "commercial-retail-warehouse", name: "Warehouse", icon: Folder },
          ],
        },
      ],
    },
    {
      id: "industrial",
      name: "Industrial",
      icon: Folder,
      subfolders: [
        { id: "industrial-manufacturing", name: "Manufacturing", icon: Folder },
        { id: "industrial-warehouse", name: "Warehouse", icon: Folder },
        { id: "industrial-processing", name: "Processing", icon: Folder },
      ],
    },
    {
      id: "infrastructure",
      name: "Infrastructure",
      icon: Folder,
      subfolders: [
        { id: "infrastructure-roads", name: "Roads", icon: Folder },
        { id: "infrastructure-bridges", name: "Bridges", icon: Folder },
        { id: "infrastructure-utilities", name: "Utilities", icon: Folder },
      ],
    },
  ]

  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    residential: true,
    "residential-new": true,
    "residential-new-single": true,
  })

  const toggleFolder = (id: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const renderFolder = (folder: any, level = 0) => {
    const isOpen = openFolders[folder.id] || false
    const isActive = activeFolder === folder.id
    const hasSubfolders = folder.subfolders && folder.subfolders.length > 0

    return (
      <div key={folder.id} className="mb-1">
        <div
          className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm ${isActive ? "bg-muted text-primary" : "hover:bg-muted/50"}`}
          style={{ paddingLeft: `${level * 12 + 8}px` }}
          onClick={() => {
            setActiveFolder(folder.id)
            if (hasSubfolders) {
              toggleFolder(folder.id)
            }
          }}
        >
          {hasSubfolders ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0"
              onClick={(e) => {
                e.stopPropagation()
                toggleFolder(folder.id)
              }}
            >
              {isOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            </Button>
          ) : (
            <div className="w-4"></div>
          )}
          {isOpen && hasSubfolders ? (
            <FolderOpen className="h-4 w-4 text-primary" />
          ) : (
            <Folder className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="truncate">{folder.name}</span>
        </div>

        {hasSubfolders && isOpen && (
          <div>{folder.subfolders.map((subfolder: any) => renderFolder(subfolder, level + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader className="py-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-md">Estimate Categories</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-2 py-0">
        <div className="max-h-[600px] overflow-auto pr-2">{folderStructure.map((folder) => renderFolder(folder))}</div>
      </CardContent>
    </Card>
  )
}

