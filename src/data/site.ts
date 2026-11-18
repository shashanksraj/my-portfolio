export type SiteConfig = {
  // Short name used in the navigation, hero, and page titles.
  name: string
  // Full legal name, used in the footer and the page description.
  fullName: string
  email: string
  location: string
  description: string
  // Profile links. Anything left undefined is hidden from the site, so nothing
  // ever points at a guessed URL.
  github?: string
  linkedin?: string
  // Public-safe resume only. Put the PDF at public/resume.pdf, then set this to
  // '/resume.pdf'. Leave undefined and no Resume link is shown.
  resume?: string
}

export const site: SiteConfig = {
  name: 'Shashank Raj',
  fullName: 'Shashank Raj Pitla',
  email: 'shashankraj1412@gmail.com',
  location: 'California',
  description:
    'Portfolio of Shashank Raj Pitla, a software engineer and University of Arizona computer science graduate. Projects in full-stack, AI, and systems programming.',
  github: 'https://github.com/shashanksraj',
  linkedin: 'https://www.linkedin.com/in/shashank-raj-pitla-9b5a8a2bb/',
  resume: '/resume.pdf',
}
