import React, { useState, useEffect } from "react";
import {
  User,
  Users,
  Layers,
  Leaf,
  Truck,
  Eye,
  ShieldAlert,
  Sparkles,
  Play,
  Volume2,
  Square,
  CheckSquare,
  Activity,
  FileText,
  Clock,
  ArrowRight,
  Settings,
  AlertCircle,
  CheckCircle,
  Send,
  VolumeX,
  Info,
  Trophy,
  HelpCircle,
  Sun,
  Moon
} from "lucide-react";
import { ModuleId, Scenario, AnalysisResult, LogEntry } from "./types";
import { MODULES_DATA, STADIUM_SECTORS } from "./data";
import StadiumMap from "./components/StadiumMap";
import ProposalViewer from "./components/ProposalViewer";
import MetricsPanel from "./components/MetricsPanel";
import MatchupDashboard from "./components/MatchupDashboard";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeTab, setActiveTab] = useState<"console" | "deck">("console");
  const [selectedModuleId, setSelectedModuleId] = useState<ModuleId>("fan");
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [customMessage, setCustomMessage] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "init-log",
      timestamp: new Date().toLocaleTimeString(),
      moduleId: "operations",
      moduleName: "AI Operations Center",
      scenarioTitle: "System Initialization",
      status: "normal",
      analysis: "ArenaPulse central AI operations system successfully bootloaded. Standard IoT polling online for FIFA World Cup 2026 stadium grids."
    }
  ]);

  // Operational metrics
  const [carbonSaved, setCarbonSaved] = useState(480.2);
  const [averageWaitTime, setAverageWaitTime] = useState(18);
  const [staffEfficiency, setStaffEfficiency] = useState(74);
  const [emergencyResponseTime, setEmergencyResponseTime] = useState(240);

  // Active sector on stadium map
  const [activeSectorId, setActiveSectorId] = useState<string | null>(null);
  const [sectorStatuses, setSectorStatuses] = useState<Record<string, "normal" | "warning" | "critical">>({
    NorthStand: "normal",
    EastStand: "normal",
    SouthStand: "normal",
    WestStand: "normal",
    PlazaZone: "normal",
    ConcourseLevel1: "normal",
    SuitesLevel2: "normal",
    PitchZone: "normal",
  });

  // TTS playback state
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [usingGeminiTTS, setUsingGeminiTTS] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const activeModule = MODULES_DATA.find((m) => m.id === selectedModuleId)!;

  // Stop reading if tab or scenario changes
  useEffect(() => {
    window.speechSynthesis?.cancel();
    setIsPlayingVoice(false);
  }, [selectedModuleId, selectedScenario]);

  // Map module category to appropriate map sector
  const getSectorIdForModule = (moduleId: ModuleId, scenarioId?: string): string => {
    if (scenarioId) {
      if (scenarioId.includes("lost-child")) return "EastStand";
      if (scenarioId.includes("queue-prediction")) return "ConcourseLevel1";
      if (scenarioId.includes("seat-routing")) return "PlazaZone";
      if (scenarioId.includes("gate-bottleneck")) return "EastStand";
      if (scenarioId.includes("sudden-run")) return "SuitesLevel2";
      if (scenarioId.includes("evacuation")) return "NorthStand";
      if (scenarioId.includes("leak-detected")) return "SouthStand";
      if (scenarioId.includes("staffing-opt")) return "PitchZone";
      if (scenarioId.includes("power-peak")) return "PlazaZone";
      if (scenarioId.includes("bin-overflow")) return "ConcourseLevel1";
      if (scenarioId.includes("carbon-footprint")) return "PlazaZone";
      if (scenarioId.includes("subway-delay")) return "PlazaZone";
      if (scenarioId.includes("parking-full")) return "PlazaZone";
      if (scenarioId.includes("wheelchair-path")) return "WestStand";
      if (scenarioId.includes("heat-stroke")) return "EastStand";
      if (scenarioId.includes("kitchen-smoke")) return "SuitesLevel2";
      if (scenarioId.includes("power-blackout")) return "NorthStand";
      if (scenarioId.includes("ticket-scanner")) return "SouthStand";
    }

    switch (moduleId) {
      case "fan": return "ConcourseLevel1";
      case "crowd": return "EastStand";
      case "operations": return "PitchZone";
      case "sustainability": return "PlazaZone";
      case "transport": return "PlazaZone";
      case "accessibility": return "WestStand";
      case "emergency": return "SouthStand";
      case "volunteer": return "NorthStand";
      default: return "PitchZone";
    }
  };

  // Select first scenario on module change
  const handleSelectModule = (id: ModuleId) => {
    setSelectedModuleId(id);
    const mod = MODULES_DATA.find((m) => m.id === id)!;
    setSelectedScenario(mod.scenarios[0]);
    setActiveSectorId(getSectorIdForModule(id, mod.scenarios[0].id));
  };

  // Local bomb-proof backup response if API key is missing or server fails
  const getFallbackAnalysis = (moduleId: ModuleId, scenarioTitle: string, userText?: string): AnalysisResult => {
    const backupData: Record<string, AnalysisResult> = {
      "Lost Child Assistance": {
        status: "critical",
        analysis: "East Stand high-density zone flagged for a missing 7-year-old child in Section 114. Edge video-node scanning coordinates with volunteer patrols. Stand exit turnstiles placed under alert protocol to prevent unauthorized egress.",
        actions: [
          "Broadcast visual description to all Sector 114 volunteer hand-held units.",
          "Coordinate stadium camera feeds using automated security vision filters.",
          "Dispatch two rapid response volunteers from the main Help Desk.",
          "Send silent alert push notifications to local security staff."
        ],
        estimatedImpact: "Limits perimeter escape window, increasing reunification probability by 90% in under 5 minutes.",
        sustainabilityCheck: "Utilizes energy-efficient digital mesh networks, bypassing redundant vehicle patrol dispatches.",
        speechTranscript: "Attention all stadium operations personnel in East Stand Level 1. We have a reported lost child, 7 years old, wearing a red soccer jersey. If spotted, please accompany them to East Help Desk 4 immediately and alert Security Central."
      },
      "Food Queue & Restroom Congestion": {
        status: "warning",
        analysis: "Half-time queue spikes at Plaza Tacos hit 35 minutes, threatening concourse movement safety. AI recommends redirection protocols to distribute traffic to Section 108 non-peak stands.",
        actions: [
          "Display alternative vendor options with wait times under 4 minutes on Section 112 overhead LEDs.",
          "Push real-time mobile vouchers for adjacent stalls to fans seated in Sections 110 to 115.",
          "Alert standby concession staff to activate extra POS registers at Plaza Tacos.",
          "Instruct digital signboards to alter pedestrian arrow indicators."
        ],
        estimatedImpact: "Reduces concession jam duration by 45%, spreading pedestrian density safely across the concourse.",
        sustainabilityCheck: "Decreases local concession waste accumulation by matching instant demand with pre-made stock counts.",
        speechTranscript: "High queue congestion reported at the Central Plaza Tacos stall. For your convenience, alternative food stands at Sections 108 and 116 are currently fully open with zero waiting times. Check your mobile Arena App for quick map routing."
      },
      "Gate B Bottleneck Imminent": {
        status: "warning",
        analysis: "Entry density at Gate B hits 4.5 persons per square meter, slowing processing speeds by 30%. AI models predict high crowd lockup within 10 minutes if no actions are taken.",
        actions: [
          "Update digital roadside signs 1km away directing incoming crowds to Gate A.",
          "Instruct nearby volunteers to announce Gate A's 1-minute waiting time.",
          "Re-route 5 express shuttle drop-offs from Gate B loop to Gate A loop.",
          "Double the wireless network bandwidth at Gate B turnstiles to accelerate ticketing logs."
        ],
        estimatedImpact: "Redistributes 30% of incoming crowd to Gate A, normalizing Gate B processing flow in under 8 minutes.",
        sustainabilityCheck: "Uses low-voltage smart electronic e-paper signage to direct crowd flows dynamically.",
        speechTranscript: "Notice to all incoming fans. Gate B is currently experiencing heavy entry volumes. To avoid wait times, please follow the green light markers to the left and enter through Gate A, where wait times are under two minutes."
      },
      "Water Main Drop - South Stand": {
        status: "critical",
        analysis: "Service riser pressure dropped 40% in South Stand Service Tunnel, risking sanitation and food stand water supplies. AI isolates riser blockages and drafts immediate runner schedules.",
        actions: [
          "Dispatch Emergency Plumber Runner Unit 3 to the South Tunnel pressure valve 2B.",
          "Instruct South Stand concession stalls to activate emergency reserve water reserves.",
          "Alert nearby washroom volunteers to place hand sanitizer stations on standbys.",
          "Register water main alert in the central municipal utility logs."
        ],
        estimatedImpact: "Isolates water drop, protecting 8 food stalls from full operational shutdowns and securing sanitation services.",
        sustainabilityCheck: "Minimizes sewage leakage risks through localized solenoid safety shutoff valves.",
        speechTranscript: "Operational status alert for South Stand facilities. Plumber runner units are currently resolving a minor utility pressure drop. Food vendors, please activate auxiliary storage reserves. Concourse toilet blocks are being equipped with backup water dispensers."
      },
      "Trash Accumulation Alert": {
        status: "warning",
        analysis: "Waste density sensors near Sector 108 report 92% volume capacity. Core AI designs an optimal collection path bypassing high-traffic walkways to prevent trash overflow during peak match hour.",
        actions: [
          "Generate dynamic, low-density corridor routing for the Sector 108 recycling team.",
          "Prompt local volunteer Amina to deploy extra empty waste bags to Section 108 bins.",
          "Update central sustainability reports detailing recycling-to-waste ratios.",
          "Slightly adjust HVAC air currents in Sector 108 concourses to neutralize waste odor."
        ],
        estimatedImpact: "Prevents trash overflow, keeping walkways clean, safe, and fully aligned with FIFA World Cup green initiatives.",
        sustainabilityCheck: "Enforces 100% recycling division of collected materials, avoiding municipal landfill overflow.",
        speechTranscript: "Central Sustainability Alert. Bins near Section 108 are hitting standard collection capacities. Dispatching environmental runner teams. Thank you to all fans for placing plastic cups into designated green recycling bins."
      },
      "Metro Line 4 Delay (25 min)": {
        status: "critical",
        analysis: "A mechanical failure delays Metropolitan Metro Line 4, leaving approximately 8,500 departing fans stranded. Core AI triggers regional backup shuttle bus dispatches.",
        actions: [
          "Request instant deployment of 15 standby compressed natural gas (CNG) buses to Plaza Lot F.",
          "Update stadium digital boards and mobile companion apps alerting fans of transit updates.",
          "Extend live stadium big-screen broadcast of match highlight commentary to encourage fans to dwell inside.",
          "Deploy extra safety volunteers to the Metro Plaza crossing to prevent pedestrian jams."
        ],
        estimatedImpact: "Clears transit bottlenecks, dispersing the stranded crowd safely and reducing crowd pressure by 50%.",
        sustainabilityCheck: "Utilizes exclusively high-capacity CNG and electric regional buses, minimizing total carbon footprint.",
        speechTranscript: "Attention departing fans. Metro Line 4 is currently experiencing transit delays. Supplementary high-speed shuttle buses are now departing from Parking Lot F to transport fans to central station. Alternatively, live post-match analysis is continuing on stadium big screens."
      },
      "Barrier-Free Route Planning": {
        status: "normal",
        analysis: "Family with multiple wheelchair users requires step-free, low-density navigation to West Stand Section 305. Core AI locks priority elevator paths and dispatches volunteer escorts.",
        actions: [
          "Calculate zero-stair visual routing, utilizing ramp systems and wide corridors.",
          "Reserve elevator cabin 4 at Gate G for exclusive priority use.",
          "Deploy volunteer Amina to meet the group and assist with physical escorts.",
          "Confirm wheelchair section seats are unlocked and equipped with audio-description headsets."
        ],
        estimatedImpact: "Provides a comfortable, stress-free arrival for accessibility users, reducing transit time by 15 minutes.",
        sustainabilityCheck: "Reduces elevator battery grid drain by pooling accessibility transit trips into optimized group shifts.",
        speechTranscript: "ArenaPulse Accessibility Core active. Priority elevator routes are now clear in West Stand Gate G. Volunteers, please ensure flat-surface paths are kept completely unobstructed for our priority accessibility guests."
      },
      "Medical Emergency - Heat Stroke": {
        status: "critical",
        analysis: "Emergency alert flags a fan collapse in Section 102 due to extreme heat index. AI plans non-crowded medical transport path and provides local first-aid guides.",
        actions: [
          "Dispatch Medical Responder Team 2 from East Booth with thermal cooling packs.",
          "Instruct nearest volunteer Amina to supply shade umbrellas and cold water.",
          "Map flat-surface return path avoiding Gate B bottleneck to expedite potential ambulance transit.",
          "Pre-warn localized paramedics to prepare active rehydration therapies."
        ],
        estimatedImpact: "Drops responder arrival time to under 80 seconds, mitigating severe heat stroke risks for the casualty.",
        sustainabilityCheck: "Utilizes zero-emission electric medical carts for indoor transport.",
        speechTranscript: "Security Alert. First-aid responders are en route to Section 102. Please ensure the concourse stairs are clear of obstruction to allow priority passage for emergency personnel. Thank you."
      },
      "Gate F Scanner Outage": {
        status: "warning",
        analysis: "Gate F wireless scanner terminal 4 logs network drops. AI issues troubleshooting diagnostics and redirects tickets to adjacent active scanners.",
        actions: [
          "Push network troubleshooting checklists to Volunteer Amina's handheld device.",
          "Alert IT Runner Team 1 to dispatch a backup cellular terminal to Gate F.",
          "Direct incoming fans at Gate F to turnstiles 1-3 with 10-second processing.",
          "Log network exception inside the central Cloud Monitoring console."
        ],
        estimatedImpact: "Normalizes scanner operations in under 3 minutes, preventing major crowd pileups at Gate F.",
        sustainabilityCheck: "Pre-empts paper-ticket overrides, saving paper waste and utilizing cloud-based local verification.",
        speechTranscript: "System update. Gate F turnstile 4 is undergoing a quick technical reset. Ticket holders, please proceed to turnstiles 1, 2, or 3 for instant scan validation. Support volunteers are standing by to guide you."
      }
    };

    // Use default if not matching exactly
    return backupData[scenarioTitle] || {
      status: "warning",
      analysis: `${moduleId.toUpperCase()} central monitoring detected a high variance operational event: ${scenarioTitle}. Core AI is orchestrating volunteer shifts, updating dynamic signage, and calculating localized impact offsets.`,
      actions: [
        `Issue warning alerts to ${moduleId} team runners in the vicinity.`,
        "Update central operations dashboard with incident status.",
        "Assess environmental and transit impact metrics.",
        "Prepare dynamic audio public notices."
      ],
      estimatedImpact: "Ensures operations continue with less than 5% efficiency drop during the incident.",
      sustainabilityCheck: "Utilizes optimized routing pathways to keep local carbon emissions minimal.",
      speechTranscript: `This is an official ArenaPulse update. Operations teams are currently addressing a scenario near ${scenarioTitle}. Please follow volunteer instructions and signage markers.`
    };
  };

  // Triggers the simulation (API backend with fallback)
  const handleTriggerSimulation = async (scenario: Scenario) => {
    setIsAnalyzing(true);
    setApiError(null);
    setSelectedScenario(scenario);
    
    // Highlight sector on map
    const targetSector = getSectorIdForModule(selectedModuleId, scenario.id);
    setActiveSectorId(targetSector);

    // Update sector status to trigger warning/critical colors
    const predictedStatus = scenario.title.includes("Child") || scenario.title.includes("Emergency") || scenario.title.includes("Delay") || scenario.title.includes("Leak") ? "critical" : "warning";
    setSectorStatuses((prev) => ({
      ...prev,
      [targetSector]: predictedStatus,
    }));

    try {
      // API Post
      const res = await fetch("/api/arena-pulse/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleName: activeModule.name,
          scenario: scenario.description,
          userMessage: customMessage,
        }),
      });

      if (!res.ok) {
        throw new Error("Local backend key not set or returned error. Activating fallback simulator.");
      }

      const data: AnalysisResult = await res.json();
      setAnalysisResult(data);

      // Append real-time logs
      setLogs((prev) => [
        {
          id: Math.random().toString(),
          timestamp: new Date().toLocaleTimeString(),
          moduleId: selectedModuleId,
          moduleName: activeModule.name,
          scenarioTitle: scenario.title,
          status: data.status,
          analysis: data.analysis,
        },
        ...prev,
      ]);

      // Adjust simulator metrics dynamically to show impact
      adjustMetrics(selectedModuleId, data.status);
    } catch (err: any) {
      console.warn("API Error (expected if API key not present, using high-fidelity fallback):", err.message);
      
      // Load bomb-proof high-fidelity mock data!
      const fallbackData = getFallbackAnalysis(selectedModuleId, scenario.title, customMessage);
      setAnalysisResult(fallbackData);

      setLogs((prev) => [
        {
          id: Math.random().toString(),
          timestamp: new Date().toLocaleTimeString(),
          moduleId: selectedModuleId,
          moduleName: activeModule.name,
          scenarioTitle: scenario.title,
          status: fallbackData.status,
          analysis: fallbackData.analysis,
        },
        ...prev,
      ]);

      adjustMetrics(selectedModuleId, fallbackData.status);
    } finally {
      setIsAnalyzing(false);
      setCustomMessage("");
    }
  };

  // Speaks aloud the verbal announcement
  const handleToggleVoice = async () => {
    if (!analysisResult) return;

    if (isPlayingVoice) {
      window.speechSynthesis?.cancel();
      setIsPlayingVoice(false);
      return;
    }

    if (usingGeminiTTS) {
      // Test Gemini Server-side TTS API
      setIsAnalyzing(true);
      try {
        const res = await fetch("/api/arena-pulse/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: analysisResult.speechTranscript }),
        });
        
        if (!res.ok) throw new Error("TTS endpoint failed. Defaulting to Web Speech.");
        const data = await res.json();
        
        // Play base64 audio
        const audioBytes = atob(data.audio);
        const arrayBuffer = new ArrayBuffer(audioBytes.length);
        const view = new Uint8Array(arrayBuffer);
        for (let i = 0; i < audioBytes.length; i++) {
          view[i] = audioBytes.charCodeAt(i);
        }
        const blob = new Blob([arrayBuffer], { type: "audio/wav" });
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        
        setIsPlayingVoice(true);
        audio.play();
        audio.onended = () => setIsPlayingVoice(false);
      } catch (err: any) {
        setApiError("Google AI TTS API requires a configure secret key. Falling back to high-fidelity native browser speech synthesis.");
        speakNative(analysisResult.speechTranscript);
      } finally {
        setIsAnalyzing(false);
      }
    } else {
      speakNative(analysisResult.speechTranscript);
    }
  };

  const speakNative = (text: string) => {
    window.speechSynthesis?.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Try to get a professional english voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => v.lang.startsWith("en") && v.name.includes("Google"));
    if (femaleVoice) utterance.voice = femaleVoice;

    utterance.onstart = () => setIsPlayingVoice(true);
    utterance.onend = () => setIsPlayingVoice(false);
    utterance.onerror = () => setIsPlayingVoice(false);

    window.speechSynthesis.speak(utterance);
  };

  // Metrics adjuster helper
  const adjustMetrics = (modId: ModuleId, status: "normal" | "warning" | "critical") => {
    if (modId === "sustainability") {
      setCarbonSaved((prev) => prev + 4.2);
    }
    if (modId === "crowd" || modId === "fan") {
      setAverageWaitTime((prev) => Math.max(4, prev - 3));
    }
    if (modId === "operations" || modId === "volunteer") {
      setStaffEfficiency((prev) => Math.min(98, prev + 5));
    }
    if (modId === "emergency") {
      setEmergencyResponseTime((prev) => Math.max(65, prev - 45));
    }
    if (status === "critical") {
      setEmergencyResponseTime((prev) => Math.max(70, prev - 15));
    }
  };

  const handleClearLogs = () => {
    setLogs([]);
    setSectorStatuses({
      NorthStand: "normal",
      EastStand: "normal",
      SouthStand: "normal",
      WestStand: "normal",
      PlazaZone: "normal",
      ConcourseLevel1: "normal",
      SuitesLevel2: "normal",
      PitchZone: "normal",
    });
    setCarbonSaved(480.2);
    setAverageWaitTime(18);
    setStaffEfficiency(74);
    setEmergencyResponseTime(240);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans relative overflow-hidden fifa-grid-bg transition-colors duration-300 ${
      theme === "light"
        ? "theme-light bg-slate-50 text-slate-800 selection:bg-emerald-500/10 selection:text-emerald-700"
        : "theme-dark bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300"
    }`}>
      {/* Background Glowing Host Nation Color Blobs for FIFA 2026 Vibe */}
      <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-[#00f5d4]/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-[#f15bb5]/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-2/3 w-[350px] h-[350px] bg-[#9b5de5]/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '4s' }} />

      {/* Top FIFA World Cup 2026 Live Match & Host Nation Ribbon */}
      <div className="w-full bg-gradient-to-r from-emerald-500 via-[#00bbf9] to-[#f15bb5] text-slate-950 text-[10px] font-bold py-1 px-6 flex justify-between items-center z-50 shadow-md">
        <div className="flex items-center gap-4 overflow-hidden">
          <span className="bg-slate-950 text-[#00f5d4] px-1.5 py-0.5 rounded text-[8px] tracking-wider uppercase font-mono animate-pulse">
            LIVE MATCHDAY
          </span>
          <span className="truncate font-sans tracking-wide">
            🏆 METLIFE HOST CONTROL • UNITED STATES 🇺🇸 CANADA 🇨🇦 MEXICO 🇲🇽 • ⚽ STADIUM LIVE: ARGENTINA vs. USA (2-1) • MATCH REPLAY FEEDS ONLINE • GATES: CLOSED
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2 font-mono text-[9px]">
          <span>⚡ ARENAPULSE CORE SYNCED</span>
          <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
        </div>
      </div>

      {/* Top Banner & Command Center Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          {/* Custom Pure-CSS FIFA 26 Trophy Emblem */}
          <div className="relative w-14 h-14 flex items-center justify-center shrink-0 overflow-hidden bg-slate-900/80 rounded-xl border border-slate-800/80 shadow-inner group">
            {/* Dynamic colorful light stripes in background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00f5d4]/10 via-[#9b5de5]/10 to-[#f15bb5]/10 group-hover:scale-110 transition-transform duration-500" />
            
            {/* Huge, bold, futuristic "26" representing the FIFA 26 logo structure */}
            <div className="absolute font-display font-black text-slate-800/80 text-4xl tracking-tighter select-none z-0 flex flex-col items-center leading-none">
              <span className="text-[#00f5d4] opacity-20">2</span>
              <span className="text-[#f15bb5] opacity-20 -mt-2">6</span>
            </div>

            {/* Pure CSS Trophy Silhouette */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              {/* Globe/Trophy Top */}
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-600 shadow shadow-yellow-500/30 animate-float" />
              
              {/* Trophy Body/Stem */}
              <div className="w-3.5 h-6 bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-700 -mt-0.5 rounded-b-md relative">
                {/* Emerald green bands at the base */}
                <div className="absolute bottom-1 left-0 right-0 h-0.5 bg-emerald-500" />
                <div className="absolute bottom-2 left-0 right-0 h-0.5 bg-emerald-500" />
              </div>
              
              {/* Trophy Base */}
              <div className="w-5 h-1 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-800 rounded-sm" />
            </div>

            {/* Decorative neon corner borders */}
            <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#00f5d4]/40" />
            <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#f15bb5]/40" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight font-display text-white flex items-center gap-1">
                ArenaPulse <span className="fifa-gradient-text font-black">2026</span>
              </h1>
              <span className="text-[9px] font-mono bg-[#00f5d4]/10 text-[#00f5d4] border border-[#00f5d4]/20 px-1.5 py-0.5 rounded font-bold uppercase">
                FIFA World Cup
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">
              The Intelligent AI Command Center for FIFA World Cup 2026 Stadium Operations
            </p>
          </div>
        </div>

        {/* Live Stadium Scan Ticker */}
        <div className="hidden lg:flex items-center bg-slate-900/40 border border-slate-800/80 rounded-xl px-4 py-2 gap-3 text-xs">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-500 font-bold uppercase font-mono">TICKET SCANS</span>
            <span className="text-white font-mono font-black">82,500 / 82,500</span>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-500 font-bold uppercase font-mono">SECTOR RISK</span>
            <span className="text-emerald-400 font-mono font-black">STABLE (0%)</span>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div className="flex flex-col">
            <span className="text-[9px] text-[#f15bb5] font-bold uppercase font-mono animate-pulse">ACTIVE FEED</span>
            <span className="text-white font-mono font-black">METLIFE_CORE_1</span>
          </div>
        </div>

        {/* Theme Toggle & Navigation Mode Tabs */}
        <div className="flex items-center gap-3 z-10">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`p-2 rounded-xl border transition-all flex items-center justify-center gap-1.5 text-xs font-bold ${
              theme === "light"
                ? "bg-white border-slate-200 text-amber-500 hover:bg-slate-100 shadow-sm"
                : "bg-slate-900 border-slate-800 text-[#00f5d4] hover:bg-slate-800"
            }`}
            id="theme-toggle-btn"
            title={theme === "light" ? "Switch to High-Tech Dark Mode" : "Switch to Sports Bright Mode"}
          >
            {theme === "light" ? (
              <>
                <Moon className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span className="text-slate-700 text-[11px] hidden sm:inline">Dark Mode</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span className="text-slate-300 text-[11px] hidden sm:inline">Bright Mode</span>
              </>
            )}
          </button>

          {/* Navigation Mode Tabs */}
          <div className={`flex items-center p-1.5 rounded-xl border gap-1 transition-colors ${
            theme === "light" ? "bg-white border-slate-200/80 shadow-sm" : "bg-slate-900/60 border-slate-800/80"
          }`}>
            <button
              onClick={() => setActiveTab("console")}
              className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === "console"
                  ? "bg-emerald-500 text-slate-950 shadow shadow-emerald-500/20"
                  : theme === "light"
                    ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Activity className="w-3.5 h-3.5" /> Command Console
            </button>
            <button
              onClick={() => setActiveTab("deck")}
              className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === "deck"
                  ? "bg-emerald-500 text-slate-950 shadow shadow-emerald-500/20"
                  : theme === "light"
                    ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Presentation Hub
            </button>
          </div>
        </div>
      </header>

      {/* Main Body View */}
      <main className="flex-1 px-6 py-6 max-w-7xl mx-auto w-full flex flex-col gap-6 relative z-10">
        
        {activeTab === "console" ? (
          <>
            {/* Real-time Telemetry Metrics Panel on Top of console */}
            <MetricsPanel
              logs={logs}
              onClearLogs={handleClearLogs}
              carbonSaved={carbonSaved}
              averageWaitTime={averageWaitTime}
              staffEfficiency={staffEfficiency}
              emergencyResponseTime={emergencyResponseTime}
              theme={theme}
            />

            {/* Clash of Titans Matchup Showcase & Live Simulator */}
            <MatchupDashboard theme={theme} />

            {/* Core Simulator Console */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: 8 AI Modules Selector Drawer */}
              <div className="lg:col-span-3 flex flex-col gap-3">
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-2">
                  OPERATIONAL AI MODULES
                </div>
                <div className="space-y-1.5">
                  {MODULES_DATA.map((mod) => {
                    const isActive = selectedModuleId === mod.id;
                    // Icon mapper
                    const getIcon = () => {
                      if (mod.id === "fan") return <User className="w-4 h-4" />;
                      if (mod.id === "crowd") return <Users className="w-4 h-4" />;
                      if (mod.id === "operations") return <Layers className="w-4 h-4" />;
                      if (mod.id === "sustainability") return <Leaf className="w-4 h-4" />;
                      if (mod.id === "transport") return <Truck className="w-4 h-4" />;
                      if (mod.id === "accessibility") return <Eye className="w-4 h-4" />;
                      if (mod.id === "emergency") return <ShieldAlert className="w-4 h-4" />;
                      return <Sparkles className="w-4 h-4" />;
                    };

                    return (
                      <button
                        key={mod.id}
                        onClick={() => handleSelectModule(mod.id)}
                        className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition-all group ${
                          isActive
                            ? "bg-slate-900 border-emerald-500/30 text-white shadow-md"
                            : "bg-slate-900/30 border-slate-800/40 text-slate-400 hover:text-slate-200 hover:border-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`p-1.5 rounded-lg border transition-colors ${
                            isActive
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                              : "bg-slate-950 border-slate-900 text-slate-500 group-hover:text-slate-400"
                          }`}>
                            {getIcon()}
                          </div>
                          <div>
                            <div className="text-xs font-bold leading-none">{mod.name}</div>
                            <span className="text-[9px] text-slate-500 font-medium tracking-wide leading-none mt-1 block">
                              {mod.id === "sustainability" ? "FIFA Green Standard" : mod.id === "accessibility" ? "Inclusivity Core" : "Command Node"}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className={`w-3 h-3 text-slate-600 transition-transform ${
                          isActive ? "text-emerald-400 translate-x-1" : "group-hover:translate-x-0.5"
                        }`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Middle Column: Interactive Map & Simulator Interface */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Visual Stadium Map Panel */}
                <div className="bg-slate-900/30 rounded-xl border border-slate-800/40 p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      ACTIVE VENUE TELEMETRY MAP
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping"></span> Live Radar Sync
                    </span>
                  </div>
                  <StadiumMap
                    activeSectorId={activeSectorId}
                    onSelectSector={setActiveSectorId}
                    sectorStatuses={sectorStatuses}
                    isScanning={isAnalyzing}
                    theme={theme}
                  />
                </div>

                {/* Scenarios trigger panel */}
                <div className="bg-slate-900/30 rounded-xl border border-slate-800/40 p-5 flex flex-col gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5 border-b border-slate-900 pb-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" /> Preconfigured Incident Scenarios
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed">
                      Select one of the three localized incident scenarios for <strong>{activeModule.name}</strong> to trigger the Gemini operations simulator:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {activeModule.scenarios.map((sc) => {
                      const isSelected = selectedScenario?.id === sc.id;
                      return (
                        <button
                          key={sc.id}
                          onClick={() => handleTriggerSimulation(sc)}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                            isSelected
                              ? "bg-slate-900 border-emerald-500/40 text-white shadow-lg"
                              : "bg-slate-950/40 border-slate-900 text-slate-400 hover:text-slate-200 hover:border-slate-800"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-bold text-white">{sc.title}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[8px] uppercase border font-mono ${sc.badgeColor}`}>
                              {sc.location}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-relaxed font-sans">{sc.description}</p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Optional Custom message Box */}
                  <div className="border-t border-slate-900 pt-4 flex flex-col gap-2">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">
                      Custom Incident Override
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Type customized commands or ask a question to this module..."
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-emerald-500/40 pr-10"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && selectedScenario) {
                            handleTriggerSimulation(selectedScenario);
                          }
                        }}
                      />
                      <button
                        onClick={() => selectedScenario && handleTriggerSimulation(selectedScenario)}
                        disabled={!selectedScenario || isAnalyzing}
                        className="absolute right-2 top-2 p-1 text-slate-500 hover:text-emerald-400 disabled:opacity-30 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Gemini Operations Outputs */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="bg-slate-900/30 rounded-xl border border-slate-800/40 p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                          AI RESPONSE SHEETS
                        </span>
                        <h3 className="text-xs font-black tracking-wider text-emerald-400 uppercase font-mono mt-0.5">
                          &#123; ARENAPULSE CORE ENGINE &#125;
                        </h3>
                      </div>
                      <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-lg border border-slate-800 text-[9px] font-mono">
                        <span className="text-slate-400">Gemini TTS API:</span>
                        <button
                          onClick={() => setUsingGeminiTTS(!usingGeminiTTS)}
                          className={`px-1.5 py-0.5 rounded uppercase font-bold text-[8px] transition-all ${
                            usingGeminiTTS ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {usingGeminiTTS ? "ON" : "OFF"}
                        </button>
                      </div>
                    </div>

                    {isAnalyzing ? (
                      <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <div className="w-10 h-10 border-t-2 border-emerald-500 border-r-2 border-transparent rounded-full animate-spin" />
                        <span className="text-xs text-slate-400 font-mono">Orchestrating Gemini 3.5 Reasoning...</span>
                        <p className="text-[9px] text-slate-500 text-center px-4">Synthesizing telemetry data and routing active responders.</p>
                      </div>
                    ) : analysisResult ? (
                      <div className="space-y-4">
                        {/* Status bar */}
                        <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-900">
                          <span className="text-[10px] text-slate-400 font-mono">Incident Status Rating:</span>
                          <span className={`text-[10px] font-black font-mono px-2 py-0.5 rounded ${
                            analysisResult.status === "critical"
                              ? "bg-red-500/10 text-red-400 border border-red-500/20"
                              : analysisResult.status === "warning"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          }`}>
                            {analysisResult.status.toUpperCase()}
                          </span>
                        </div>

                        {/* Analysis segment */}
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">
                            Central Situation Analysis
                          </span>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans">
                            {analysisResult.analysis}
                          </p>
                        </div>

                        {/* Actions list checklist */}
                        <div className="space-y-2">
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">
                            AI-Recommended Response Actions
                          </span>
                          <div className="space-y-1.5">
                            {analysisResult.actions.map((act, i) => (
                              <div key={i} className="flex items-start gap-2 bg-slate-950/40 p-2 rounded border border-slate-900/60 hover:bg-slate-950/80 transition-colors">
                                <CheckSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                <span className="text-[10px] text-slate-400">{act}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Visual Callout Metrics */}
                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div className="bg-slate-950 p-2.5 rounded border border-slate-900 flex flex-col justify-between">
                            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">Est. Impact</span>
                            <span className="text-[10px] text-emerald-300 font-medium leading-normal mt-1">{analysisResult.estimatedImpact}</span>
                          </div>
                          <div className="bg-slate-950 p-2.5 rounded border border-slate-900 flex flex-col justify-between">
                            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">Eco Offset</span>
                            <span className="text-[10px] text-teal-300 font-medium leading-normal mt-1">{analysisResult.sustainabilityCheck}</span>
                          </div>
                        </div>

                        {/* Verbal Broadcast Screen */}
                        <div className="bg-slate-950 rounded-xl border border-slate-900 p-3.5 mt-2 space-y-2 relative overflow-hidden">
                          <div className="flex items-center justify-between border-b border-slate-900 pb-1.5">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                              <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> ANN_BROADCAST_TRANSCRIPT
                            </span>
                            <button
                              onClick={handleToggleVoice}
                              className={`px-2.5 py-1 rounded text-[9px] font-mono flex items-center gap-1 font-bold tracking-widest uppercase transition-all ${
                                isPlayingVoice
                                  ? "bg-red-500 text-slate-950 animate-pulse"
                                  : "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                              }`}
                            >
                              {isPlayingVoice ? (
                                <>
                                  <VolumeX className="w-3 h-3" /> STOP
                                </>
                              ) : (
                                <>
                                  <Play className="w-3 h-3 fill-slate-950" /> SPEAK
                                </>
                              )}
                            </button>
                          </div>
                          <p className="text-[10px] text-slate-400 italic leading-relaxed">
                            "{analysisResult.speechTranscript}"
                          </p>
                          {apiError && (
                            <div className="text-[8px] text-amber-500 leading-normal border-t border-slate-900 pt-1 flex items-start gap-1">
                              <Info className="w-2.5 h-2.5 shrink-0 mt-0.5" /> {apiError}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-24 text-slate-600 text-center px-4">
                        <HelpCircle className="w-12 h-12 text-slate-800 mb-2 animate-bounce" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Operational Simulator Standby</span>
                        <p className="text-[10px] text-slate-600 mt-1 leading-relaxed">Select a scenario from the center list or submit custom instructions to generate operational strategies.</p>
                      </div>
                    )}
                  </div>

                  <div className="text-[9px] text-slate-500 font-mono text-center border-t border-slate-900/60 pt-3 mt-4">
                    FIFA World Cup 2026 Operations Console (MetLife Node)
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Hackathon Slide Deck Hub View */
          <div className="bg-slate-950 rounded-xl border border-slate-800/60 p-6">
            <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-6">
              <div>
                <h2 className="text-lg font-black tracking-tight font-display text-white flex items-center gap-2">
                  <Trophy className="text-emerald-400 w-5 h-5 animate-bounce" /> ArenaPulse AI Pitch & Architectural Document
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Comprehensive, structured roadmap and project design spec optimized for FIFA 2026 hackathon judges.</p>
              </div>
            </div>
            
            <ProposalViewer theme={theme} />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-4 px-6 text-center text-slate-600 text-[10px] font-mono bg-slate-950">
        ArenaPulse AI Command Center &copy; {new Date().getFullYear()} - Designed with Google Cloud, Google AI Studio, & Gemini API
      </footer>
    </div>
  );
}
