"use client"

import type React from "react"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { ProjectSelector } from "@/components/project-selector"
import { useProject } from "@/contexts/project-context"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const { selectedProject } = useProject()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary hidden md:block">
        Dashboard
      </Link>

      {/* Only show project selector in the header on mobile */}
      <div className="md:hidden">
        <ProjectSelector />
      </div>

      {/* Show current project name in header for mobile */}
      {selectedProject && (
        <div className="md:hidden text-sm font-medium truncate max-w-[150px]">{selectedProject.name}</div>
      )}
    </nav>
  )
}

