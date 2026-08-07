# Mission Engine Architecture

## Purpose
The **Mission Engine** (`src/lib/mission/`) provides declarative engineering goal evaluation. Per UJ.OS Constitution Principle 4, a Mission never stores progress directly; progress is computed dynamically over ontology entities, evidence, competencies, and experience history.

## Responsibilities
- Evaluate completion percentage for active missions.
- Audit required vs. actual competency levels across ontology entities.
- Identify remaining engineering gaps and generate recommended next builds.

## Dependencies
- `OntologyEngine` (`src/lib/ontology/`)
- `ExperienceEngine` (`src/lib/experience/`)
- `SearchRepository` (`src/repositories/search.repository.ts`)

## Public API
- `evaluateMission(missionSlug: string): Promise<MissionEvaluation>`
- `getCompletionPercentage(missionSlug: string): Promise<number>`
- `findRemainingGaps(missionSlug: string): Promise<MissionGap[]>`
- `suggestNextBuilds(missionSlug: string): Promise<string[]>`

## Sequence Diagram
```mermaid
sequenceDiagram
    autonumber
    participant Client as IntelligenceSnapshotService / IntelligenceService
    participant ME as MissionEngine
    participant OE as OntologyEngine
    participant EE as ExperienceEngine

    Client->>ME: evaluateMission("wireless-mesh-tvws")
    ME->>OE: findRelatedConcepts("wireless-mesh-tvws")
    OE-->>ME: Related Ontology Entities [tvws-propagation, dns, ...]
    loop For each related concept
        ME->>EE: computeEvolvedCompetency(conceptId)
        EE-->>ME: EvolvedCompetency (scores, eventCount)
    end
    ME-->>Client: Returns MissionEvaluation (completionPercentage, gaps, suggestedBuilds)
```

## Extension Points
- **Custom Goal Matrices**: Define declarative milestone criteria for external role profiles (e.g. *Platform Engineering Roadmap*).
