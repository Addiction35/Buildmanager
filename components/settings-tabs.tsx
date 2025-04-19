"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompanySettingsForm } from "@/components/company-settings-form"
import { UserPreferencesForm } from "@/components/user-preferences-form"
import { SystemSettingsForm } from "@/components/system-settings-form"

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("company")

  return (
    <Tabs defaultValue="company" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="company">Company</TabsTrigger>
        <TabsTrigger value="user">User Preferences</TabsTrigger>
        <TabsTrigger value="system">System</TabsTrigger>
      </TabsList>
      <TabsContent value="company">
        <CompanySettingsForm />
      </TabsContent>
      <TabsContent value="user">
        <UserPreferencesForm />
      </TabsContent>
      <TabsContent value="system">
        <SystemSettingsForm />
      </TabsContent>
    </Tabs>
  )
}

