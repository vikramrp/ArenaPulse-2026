export type ModuleId =
  | "fan"
  | "crowd"
  | "operations"
  | "sustainability"
  | "transport"
  | "accessibility"
  | "emergency"
  | "volunteer";

export interface Scenario {
  id: string;
  title: string;
  description: string;
  location: string;
  badgeColor: string;
}

export interface ModuleInfo {
  id: ModuleId;
  name: string;
  tagline: string;
  iconName: string;
  description: string;
  scenarios: Scenario[];
}

export interface AnalysisResult {
  status: "normal" | "warning" | "critical";
  analysis: string;
  actions: string[];
  estimatedImpact: string;
  sustainabilityCheck: string;
  speechTranscript: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  moduleId: ModuleId;
  moduleName: string;
  scenarioTitle: string;
  status: "normal" | "warning" | "critical";
  analysis: string;
}

export interface Persona {
  role: string;
  name: string;
  avatar: string;
  need: string;
  painPoint: string;
  solution: string;
}
