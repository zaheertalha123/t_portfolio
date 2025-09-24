import portfolioData from "@/data/portfolio-data.json"

// Export the portfolio data
export const data = portfolioData

// Project types derived from JSON
export type Project = (typeof portfolioData)["projects"][number]
export type Education = (typeof portfolioData)["education"][number]

export function getAllProjects(): Project[] {
  return portfolioData.projects
}

export function getProjectBySlug(slug: string): Project | undefined {
  return portfolioData.projects.find((p) => p.slug === slug)
}

// Type definitions for the portfolio data
export type PortfolioData = typeof portfolioData

// Helper function to get navigation items
export function getNavItems() {
  return data.navigation
}

// Helper function to get personal information
export function getPersonalInfo() {
  return data.personal
}

// Helper function to get languages information
export function getLanguagesInfo() {
  return (data as any).languages || []
}

// Helper function to get experience information
export function getExperienceInfo() {
  return data.experience
}

// Helper function to get education information
export function getEducationInfo(): Education[] {
  return (data as any).education || []
}

// Helper function to get credentials information
// Keeping legacy API: return empty object if not present in JSON
export function getCredentialsInfo() {
  return (data as any).credentials || {}
}

// Helper function to get technical skills information
export function getTechnicalSkillsInfo() {
  return data.technicalSkills
}

// Helper function to get meta information
export function getMetaInfo() {
  return data.meta
}
