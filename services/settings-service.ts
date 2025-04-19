export interface CompanySettings {
  name: string
  logo: string
  address: string
  phone: string
  email: string
  website: string
  taxId: string
}

export interface UserPreferences {
  theme: "light" | "dark" | "system"
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  defaultView: "list" | "grid" | "calendar"
}

export interface SystemSettings {
  dateFormat: string
  timeFormat: string
  currency: string
  language: string
  timezone: string
}

// Dummy data for settings
const dummyCompanySettings: CompanySettings = {
  name: "Construction Management Co.",
  logo: "/placeholder.svg?height=100&width=100",
  address: "123 Builder St, Construction City, CC 12345",
  phone: "(555) 123-4567",
  email: "info@construction-management.com",
  website: "www.construction-management.com",
  taxId: "12-3456789",
}

const dummyUserPreferences: UserPreferences = {
  theme: "system",
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
  defaultView: "list",
}

const dummySystemSettings: SystemSettings = {
  dateFormat: "MM/DD/YYYY",
  timeFormat: "12h",
  currency: "USD",
  language: "en-US",
  timezone: "America/New_York",
}

// Get company settings
export const getCompanySettings = async (): Promise<CompanySettings> => {
  // Uncomment to use real API
  // const response = await axiosClient.get('/settings/company');
  // return response.data;

  // Using dummy data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyCompanySettings)
    }, 500)
  })
}

// Update company settings
export const updateCompanySettings = async (settings: Partial<CompanySettings>): Promise<CompanySettings> => {
  // Uncomment to use real API
  // const response = await axiosClient.patch('/settings/company', settings);
  // return response.data;

  // Using dummy data
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedSettings = { ...dummyCompanySettings, ...settings }
      resolve(updatedSettings)
    }, 500)
  })
}

// Get user preferences
export const getUserPreferences = async (): Promise<UserPreferences> => {
  // Uncomment to use real API
  // const response = await axiosClient.get('/settings/preferences');
  // return response.data;

  // Using dummy data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyUserPreferences)
    }, 500)
  })
}

// Update user preferences
export const updateUserPreferences = async (preferences: Partial<UserPreferences>): Promise<UserPreferences> => {
  // Uncomment to use real API
  // const response = await axiosClient.patch('/settings/preferences', preferences);
  // return response.data;

  // Using dummy data
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedPreferences = {
        ...dummyUserPreferences,
        ...preferences,
        notifications: {
          ...dummyUserPreferences.notifications,
          ...(preferences.notifications || {}),
        },
      }
      resolve(updatedPreferences)
    }, 500)
  })
}

// Get system settings
export const getSystemSettings = async (): Promise<SystemSettings> => {
  // Uncomment to use real API
  // const response = await axiosClient.get('/settings/system');
  // return response.data;

  // Using dummy data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummySystemSettings)
    }, 500)
  })
}

// Update system settings
export const updateSystemSettings = async (settings: Partial<SystemSettings>): Promise<SystemSettings> => {
  // Uncomment to use real API
  // const response = await axiosClient.patch('/settings/system', settings);
  // return response.data;

  // Using dummy data
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedSettings = { ...dummySystemSettings, ...settings }
      resolve(updatedSettings)
    }, 500)
  })
}

