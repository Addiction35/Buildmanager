import type { Metadata } from "next"
import { SettingsTabs } from "@/components/settings-tabs"

export const metadata: Metadata = {
  title: "Settings | Construction Management",
  description: "Manage your account and application settings",
}

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 md:gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and application settings</p>
      </div>
      <SettingsTabs />
    </div>
  )
}

