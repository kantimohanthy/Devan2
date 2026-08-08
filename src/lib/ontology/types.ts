/**
 * @file Universal Ontology Types & Data Contracts (UJ.OS v2.1 Gold Standard)
 * @purpose Central domain model contracts for DEVAN's Universal Engineering Canon.
 * @principle Designed to scale to 30,000+ canonical concepts with high-intelligence quality gates, labs, and Bloom's taxonomy.
 */

export type OntologyEntityType =
  | "concept"
  | "project"
  | "experiment"
  | "repository"
  | "mission"
  | "rfc"
  | "standard"
  | "paper"
  | "tool"
  | "lab";

export type RelationshipType =
  | "DEPENDS_ON"
  | "IMPLEMENTS"
  | "USES"
  | "PART_OF"
  | "DERIVES_FROM"
  | "PREREQUISITE_FOR"
  | "RELATED_TO"
  | "PROVES"
  | "VALIDATES"
  | "GENERATES"
  | "OBSERVES"
  | "MEASURES"
  | "DEBUGS"
  | "SECURES"
  | "SCALES"
  | "COMPARES_WITH"
  | "SUPERSEDES"
  | "REPLACES"
  | "INSPIRED_BY"
  | "EVIDENCE_FOR";

export type ImportanceTier = "CORE" | "ADVANCED" | "SPECIALIZED" | "RESEARCH";
export type MaturityTier = "ACADEMIC" | "INDUSTRY" | "EMERGING" | "LEGACY" | "RESEARCH";
export type DifficultyTier = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "RESEARCH";
export type InterviewDepth = "BASIC" | "INTERMEDIATE" | "DEEP_DIVE" | "PRINCIPAL";
export type EngineeringCapability = "OBSERVE" | "REMEMBER" | "REASON" | "RECOMMEND" | "EVOLVE" | "SCALES";
export type BloomTaxonomyLevel = "REMEMBER" | "UNDERSTAND" | "APPLY" | "ANALYZE" | "EVALUATE" | "CREATE";

export type OSILayer =
  | "Layer 1 - Physical"
  | "Layer 2 - Data Link"
  | "Layer 2.5"
  | "Layer 3 - Network"
  | "Layer 4 - Transport"
  | "Layer 5 - Session"
  | "Layer 6 - Presentation"
  | "Layer 7 - Application";

export type TCPIPLayer = "Link" | "Internet" | "Transport" | "Application";

export type TruthSourceType =
  | "RFC"
  | "RESEARCH_PAPER"
  | "IEEE"
  | "UNIVERSITY_COURSE"
  | "BOOK"
  | "PRODUCTION_DOCS"
  | "MAN_PAGE";

export type ExternalReferenceType =
  | "RFC"
  | "IEEE"
  | "ISO"
  | "MAN_PAGE"
  | "WIKIPEDIA"
  | "GITHUB"
  | "PAPER_DOI"
  | "BOOK"
  | "COURSE";

export interface ExternalReference {
  type: ExternalReferenceType;
  title: string;
  url?: string;
  identifier?: string;
}

export interface ConceptLifecycle {
  introducedDate?: string;
  lastReviewedDate?: string;
  lastAppliedDate?: string;
  lastVerifiedDate?: string;
  confidenceDecayRate?: number; // 0.0 to 1.0 per month
}

export interface ProfessionalMapping {
  engineeringRoles: string[];
  certifications: string[];
  interviewDepth: InterviewDepth;
  industrySectors: string[];
}

export interface EngineeringDecisionRecord {
  engineeringProblem: string;
  whyProtocolExists: string;
  designDecisions: string[];
  alternativesConsidered: string[];
  tradeOffs: string[];
  failureModes: string[];
  realWorldSystems: string[];
}

export interface BuildProgression {
  beginnerBuild: string;
  intermediateBuild: string;
  advancedBuild: string;
  productionScaleProject: string;
}

export interface CanonicalLab {
  labId: string;
  sequenceNumber: number;
  title: string;
  objective: string;
  commandToRun?: string;
  expectedOutput?: string;
  toolingRequired: string[];
}

export interface ConceptComparison {
  conceptAId: string;
  conceptBId: string;
  comparisonDomain: string;
  keyDifferences: Array<{ dimension: string; conceptAValue: string; conceptBValue: string }>;
  whenToUseA: string;
  whenToUseB: string;
  tradeOffSummary: string;
  history?: string;
  architecture?: string;
  operationalComplexity?: string;
  productionUsage?: string;
  recommendation?: string;
}

export interface EngineeringDecisionGraph {
  id: string;
  engineeringProblem: string;
  context: string;
  constraints: string[];
  candidateSolutions: string[];
  decisionCriteria: string[];
  tradeOffs: string[];
  finalRecommendation: string;
  whyAlternativesRejected: string[];
  realWorldImplementations: string[];
  failurePropagation: string[];
  operationalChecklist: string[];
  buildRecommendations: string[];
}

export interface FailurePropagationChain {
  rootConceptId: string;
  trigger: string;
  propagationSteps: string[];
  ultimateImpact: string;
}

export interface ArchitecturePatternMapping {
  patternName: string;
  coreConcepts: string[];
  realWorldUseCases: string[];
}

export interface TimeEstimates {
  estimatedHours: number;
  estimatedProjects: number;
  estimatedLabs: number;
  estimatedEvidence: number;
}

export interface ObjectiveMasteryRequirement {
  action: "READ_RFC" | "BUILD_PROJECT" | "COMPLETE_EXPERIMENT" | "DEBUG_FAILURE" | "EXPLAIN_TO_SOMEONE" | "COLLECT_EVIDENCE";
  description: string;
  completed: boolean;
}

export interface EngineeringPath {
  pathId: string;
  title: string;
  description: string;
  recommendedConceptOrder: string[];
}

export interface LearningMetadata {
  difficulty: DifficultyTier;
  estimatedStudyHours: number;
  estimatedLabHours: number;
  estimatedProjects: number;
  interviewDepth: InterviewDepth;
  bloomTaxonomyLevel: BloomTaxonomyLevel;
  recommendedLearningOrder: number;
}

export interface OntologyConceptDetail {
  definition?: string;
  engineeringPurpose?: string;
  problemsSolved?: string[];
  prerequisites?: string[];
  dependents?: string[];
  relatedConcepts?: string[];
  standards?: string[];
  rfcs?: string[];
  algorithms?: string[];
  tools?: string[];
  libraries?: string[];
  frameworks?: string[];
  operatingSystems?: string[];
  languages?: string[];
  securityConsiderations?: string[];
  performanceConsiderations?: string[];
  scalabilityConsiderations?: string[];
  debuggingTechniques?: string[];
  industryUseCases?: string[];
  companiesUsingIt?: string[];
  interviewTopics?: string[];
  associatedProjects?: string[];
  associatedExperiments?: string[];
  associatedEvidence?: string[];
  competency?: {
    knowledge: number;
    experience: number;
    evidence: number;
    confidence: number;
  };
  missionRelevance?: string[];

  // Strategic Expansion Additions
  capabilities?: EngineeringCapability[];
  evidenceStrengthWeight?: number; // 0.0 to 1.0
  lifecycle?: ConceptLifecycle;
  professionalMapping?: ProfessionalMapping;

  // Phase III Networking Extensions
  osiLayer?: OSILayer;
  tcpIpLayer?: TCPIPLayer;
  packetFlow?: string[];
  headerStructure?: string[];
  typicalPorts?: string[];
  commonFailures?: string[];
  interviewQuestions?: string[];

  // EDR & Build Progression
  decisionRecord?: EngineeringDecisionRecord;
  buildProgression?: BuildProgression;

  // Phase IV Decision Intelligence Layer
  historicalContext?: string;
  futureEvolution?: string;
  comparisonTargets?: string[];
  reasoningChains?: string[];

  // Phase VI Universal Ingestion-Ready Extensions
  children?: string[];
  parents?: string[];
  related?: string[];
  aliases?: string[];
  externalReferences?: ExternalReference[];
  truthSources?: TruthSourceType[];
  difficulty?: DifficultyTier;
  timeEstimates?: TimeEstimates;
  masteryRequirements?: ObjectiveMasteryRequirement[];

  // Phase IX Intelligence Gold Standard Additions
  learningMetadata?: LearningMetadata;
  labProgression?: CanonicalLab[];
}

export interface OntologyEntity {
  id: string; // Unique namespaced identifier (e.g. networking.dns.iterative-resolution)
  type: OntologyEntityType;
  title?: string;
  name?: string;
  domain: string; // e.g. "Networking", "AI Systems", "Operating Systems", "Security"
  summary?: string;
  description?: string;
  status?: string;
  confidence?: number;
  firstUsed?: string;
  experimentsCount?: number;
  relatedEntityIds?: string[];

  // Classification Tiers
  importance?: ImportanceTier;
  maturity?: MaturityTier;
  learningStatus?: string;

  // Rich Concept Details
  details?: OntologyConceptDetail;
  metadata?: Record<string, unknown>;
}

export interface OntologyRelationship {
  fromId: string;
  toId: string;
  type: RelationshipType;
  weight?: number; // 0.0 to 1.0
  note?: string;
}

export interface DomainQualityDashboard {
  domainName: string;
  totalConcepts: number;
  totalRelationships: number;
  conceptCoveragePercent: number;
  rfcCoveragePercent: number;
  evidenceCoveragePercent: number;
  missingLabsCount: number;
  missingExperimentsCount: number;
  missingInterviewQuestionsCount: number;
  overallReadinessPercent: number;
}

export interface DependencyChain {
  targetId: string;
  prerequisites: OntologyEntity[];
  dependents: OntologyEntity[];
}

export interface ExpandedNeighborhood {
  rootEntity: OntologyEntity;
  connectedEntities: OntologyEntity[];
  relationships: OntologyRelationship[];
}

// Additional legacy / compatibility interfaces
export interface OntologyClaim {
  id: string;
  statement: string;
  status: string;
  evidenceCount: number;
  confidence: number;
  lastTested: string;
  domain: string;
  supportingExperimentIds: string[];
}

export interface EvidenceLedgerEntry {
  id: string;
  code: string;
  question: string;
  method: string;
  artifacts: string[];
  result: string;
  confidence: number;
  verified: boolean;
  timestamp: string;
}

export interface OntologyMission {
  id: string;
  title: string;
  objective: string;
  progressPercent: number;
  domain: string;
  subtasks: Array<{ id: string; label: string; completed: boolean }>;
}

export interface SemanticRelationship {
  fromId: string;
  toId: string;
  type: RelationshipType;
}

export interface ReasoningReplayStep {
  stage: string;
  detail: string;
  timestamp: string;
  status: "info" | "pass" | "warn" | "fail";
  artifactRef?: string;
}

export interface ReasoningReplayTrace {
  claimId: string;
  title: string;
  steps: ReasoningReplayStep[];
}
