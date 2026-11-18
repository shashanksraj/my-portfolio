export type ProjectPreview = 'cityquest' | 'compiler' | 'nlp' | 'hospital'

export type ProjectImage = {
  src: string
  alt: string
}

/**
 * A screenshot slot. Slots without an `image` are not shown on the page, so an
 * empty slot never appears as an empty box.
 * To fill one: drop the file in public/projects/<slug>/ and set
 * image: { src: '/projects/<slug>/file.png', alt: 'What the screenshot shows' }.
 */
export type ScreenshotSlot = {
  id: string
  label: string
  caption: string
  image?: ProjectImage
}

export type Project = {
  id: string
  slug: string
  title: string
  subtitle?: string
  // Short text used on the homepage card.
  description: string
  // One line used in the detail page header and the page's meta description.
  tagline: string
  technologies: string[]
  // Fallback CSS preview, used only if `cover` is missing.
  preview: ProjectPreview
  // Cover illustration used on the card and the project page. These are
  // illustrations drawn for this site, not screenshots of the projects.
  cover?: ProjectImage
  screenshots?: ScreenshotSlot[]
  // Only add URLs you have verified. Missing links are hidden.
  github?: string
  demo?: string
}

export function getProjectPath(project: Project) {
  return `/projects/${project.slug}`
}

export const projects: Project[] = [
  {
    id: 'cityquest',
    slug: 'cityquest',
    title: 'CityQuest',
    subtitle: 'Live, Verified Quest Planner',
    description:
      'A team-built hackathon app where Gemini plans short quests and a backend checks them against live Google Maps data. I contributed to the 3D frontend.',
    tagline:
      'A team-built app from the Gemini 4 Argon SF Hackathon that plans quests with Gemini, verifies them against live Google Maps data, and shows them in 3D.',
    // Tags list what the public repository uses. React Three Fiber is described
    // on the page as my own contribution, so it is not shown as a repo tag.
    technologies: [
      'Three.js',
      'Python',
      'FastAPI',
      'Gemini API',
      'Google Maps Platform',
      'Cloud Run',
    ],
    preview: 'cityquest',
    cover: {
      src: '/projects/cityquest/cover.svg',
      alt: 'Illustration of a low-poly waterfront with a clock tower and a dotted quest route with waypoints.',
    },
    github: 'https://github.com/shashanksraj/cityquest',
  },
  {
    id: 'compiler-pipeline',
    slug: 'compiler',
    title: 'End-to-End Compiler Pipeline',
    subtitle: 'C-Minus Compiler with MIPS Code Generation',
    description:
      'A compiler for a small C-like language, written in C. It scans and parses a program, checks declarations, and generates MIPS assembly.',
    tagline:
      'A compiler for a small C-like language, written in C for a university course. It reads a program and emits MIPS assembly.',
    technologies: ['C', 'Unix', 'MIPS'],
    preview: 'compiler',
    cover: {
      src: '/projects/compiler/cover.svg',
      alt: 'Illustration of source code flowing through a syntax tree into MIPS assembly.',
    },
    github: 'https://github.com/shashanksraj/c-minus-compiler',
  },
  {
    id: 'hate-speech-detection',
    slug: 'hate-speech-detection',
    // The slug keeps its original name so existing links keep working.
    title: 'Online Sexism Detection',
    subtitle: 'Machine Learning and NLP Classification',
    description:
      'Classifying online posts as sexist or not (SemEval 2023 Task 10), comparing four classifiers on TF-IDF and Word2Vec features.',
    tagline:
      'A Python NLP project that classifies online posts as sexist or not, comparing four classifiers on TF-IDF and Word2Vec features.',
    technologies: ['Python', 'Scikit-learn', 'NLTK', 'Word2Vec', 'Jupyter'],
    preview: 'nlp',
    cover: {
      src: '/projects/hate-speech-detection/cover.svg',
      alt: 'Illustration of text tokens becoming a grid of feature vectors and an evaluation matrix.',
    },
    // The original URL (online-sexism-detection-ml) redirects here; this is the
    // repository's current name. The "ai-ml-hate-speech-detection" URL returns 404.
    github:
      'https://github.com/shashanksraj/ML-Powered-Hate-Speech-Detection-System',
  },
  {
    id: 'hospital-management',
    slug: 'hospital-management',
    title: 'Hospital Management Platform',
    description: 'A hospital management application.',
    tagline: 'A hospital management application.',
    // Left empty on purpose: add technologies only once verified against the source.
    technologies: [],
    preview: 'hospital',
    cover: {
      src: '/projects/hospital-management/cover.svg',
      alt: 'Illustration of a central module connected to four smaller modules.',
    },
    // Use synthetic data only; never real patient information.
    screenshots: [
      {
        id: 'interface',
        label: 'Main interface',
        caption: 'The main interface.',
      },
      {
        id: 'workflow',
        label: 'Key workflow',
        caption: 'A key workflow.',
      },
      {
        id: 'additional',
        label: 'Additional view',
        caption: 'An additional view.',
      },
    ],
  },
]
