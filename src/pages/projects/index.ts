import type { ComponentType } from 'react'
import type { Project } from '../../data/projects'
import CityQuestPage from './CityQuestPage'
import CompilerPage from './CompilerPage'
import HateSpeechPage from './HateSpeechPage'
import HospitalPage from './HospitalPage'

// To add a project page: add its metadata in data/projects.ts, create a page
// component in this folder, and register it here under the project's slug.
export const projectPages: Record<string, ComponentType<{ project: Project }>> = {
  cityquest: CityQuestPage,
  compiler: CompilerPage,
  'hate-speech-detection': HateSpeechPage,
  'hospital-management': HospitalPage,
}
