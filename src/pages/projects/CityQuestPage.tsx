import DetailSection from '../../components/DetailSection'
import FlowDiagram from '../../components/FlowDiagram'
import ProjectLinks from '../../components/ProjectLinks'
import ProjectPageLayout from '../../components/ProjectPageLayout'
import { TermList } from '../../components/ProjectBlocks'
import type { Project } from '../../data/projects'

function CityQuestPage({ project }: { project: Project }) {
  return (
    <ProjectPageLayout project={project}>
      <DetailSection title="Overview">
        <div className="prose">
          <p>
            CityQuest was built by a small team at the Gemini 4 Argon SF
            Hackathon. You give it a location, how much time you have, and what
            you feel like doing, and Gemini plans a short quest of a few real
            stops. Before the quest is shown, a verifier checks each stop
            against live Google Maps data, so the plan only includes places
            that are actually open and reachable in time.
          </p>
          <p>
            I worked on the 3D frontend, where quest objectives become places
            to travel to in a San Francisco waterfront scene.
          </p>
        </div>
      </DetailSection>

      <DetailSection title="How It Works">
        <TermList
          items={[
            {
              term: 'Quest planning',
              description:
                'Gemini picks two to four stops for the request. It can only choose from places found live through Google Places, and any place it returns that was not in that list is rejected. The result must match a JSON schema.',
            },
            {
              term: 'Live verification',
              description:
                'Each stop is checked for business status and for being open during the planned visit. The walking route from the Google Routes API is added to the time spent at each stop to see whether the quest fits the time budget. A failed stop can be replaced and the quest checked again.',
            },
            {
              term: 'Voice and camera',
              description:
                'Gemini Live handles voice and camera input, so a request can be spoken instead of typed.',
            },
            {
              term: '3D viewer',
              description:
                'A Three.js viewer renders Google’s Photorealistic 3D Tiles. Nearby places appear as beacons, green for open and red for closed, quest stops are numbered, and the verified walking route is drawn as a path the camera flies along.',
            },
          ]}
        />
      </DetailSection>

      <DetailSection title="Architecture" wide>
        <FlowDiagram
          label="CityQuest architecture"
          caption="A simplified view of the flow, not every request between services."
          steps={[
            {
              title: 'Request',
              note: 'Location, time, and what you want',
              endpoint: true,
            },
            {
              title: 'Planner',
              note: 'Gemini chooses stops from live Places results',
            },
            {
              title: 'Verifier',
              note: 'Places and Routes checks against live data',
            },
            {
              title: '3D viewer',
              note: 'Three.js on Google 3D Tiles',
              endpoint: true,
            },
          ]}
        />
      </DetailSection>

      <DetailSection title="What I Built">
        <div className="prose">
          <h3 className="sub-heading">My contribution</h3>
          <p>
            I worked on the interactive 3D frontend: a third-person waterfront
            scene built with React Three Fiber, character movement, collision
            with axis-aligned bounding boxes, a camera that accounts for
            obstacles, and waypoint navigation with real-time objective
            tracking.
          </p>
          <p>
            I also worked on connecting Gemini-generated objectives to
            landmarks in the 3D scene through stable location IDs.
          </p>
          <h3 className="sub-heading">Team scope</h3>
          <p>
            CityQuest was a team project built in a day. The backend (Python
            and FastAPI, Gemini planning, Google Maps verification, and
            deployment on Cloud Run) was built by the team. The public
            repository holds that code along with the team&apos;s Three.js
            viewer on Google 3D Tiles. My React Three Fiber frontend is
            described here as my own contribution.
          </p>
        </div>
      </DetailSection>

      {project.github ? (
        <DetailSection title="Source Code">
          <div className="block-stack">
            <div className="prose">
              <p>
                The team&apos;s public repository: the quest planner, the
                verification step, the backend, and the 3D tiles viewer.
              </p>
            </div>
            <ProjectLinks project={project} />
          </div>
        </DetailSection>
      ) : null}
    </ProjectPageLayout>
  )
}

export default CityQuestPage
