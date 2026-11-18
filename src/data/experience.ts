export type ExperienceEntry = {
  id: string
  role: string
  company: string
  period: string
  summary: string
}

// Keep summaries general and consistent with the public resume
// (resume-source/resume.html). Do not add employer-internal details.
export const experience: ExperienceEntry[] = [
  {
    id: 'srp-tech',
    role: 'Software Engineer',
    company: 'SRP Tech',
    period: 'April 2026 – Present',
    summary:
      'Full-stack development with React, TypeScript, and Python, including backend integrations.',
  },
  {
    id: 'pdsr-co',
    role: 'Software Engineering Intern',
    company: 'PDSR Co.',
    period: 'May 2025 – August 2025',
    summary:
      'Python automation and data-validation workflows, and the company’s first responsive website.',
  },
  {
    id: 'eco-pharma',
    role: 'Software Developer',
    company: 'Eco Pharma',
    period: 'May 2023 – August 2024',
    summary:
      'Backend services in Python and PostgreSQL, and data analytics dashboards.',
  },
]
