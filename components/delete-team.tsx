"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function DeleteTeam() {
  const router = useRouter()

  useEffect(() => {
    // Redirect any team-related routes to the dashboard
    if (window.location.pathname.includes("/dashboard/team")) {
      router.push("/dashboard")
    }
  }, [router])

  return null
}

