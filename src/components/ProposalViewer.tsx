import React, { useState } from "react";
import { GOOGLE_SERVICES, PROMPT_STRATEGIES, USER_PERSONAS } from "../data";
import {
  FileText,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Users,
  Database,
  Shield,
  Leaf,
  Globe,
  TrendingUp,
  Workflow,
  Sparkles,
  Award,
  Zap,
  MapPin,
  Clock,
  Compass,
  Code
} from "lucide-react";

const ProposalViewer = React.memo(function ProposalViewer({ theme = "dark" }: { theme?: "light" | "dark" }) {
  const [activeSlide, setActiveSlide] = useState("exec");

  const slideCategories = [
    {
      group: "I. Core Strategy & Vision",
      items: [
        { id: "pitch", title: "The Elevator Pitch", icon: Award },
        { id: "exec", title: "Executive Summary", icon: FileText },
        { id: "problem", title: "Problem Statement & Challenges", icon: AlertTriangle },
        { id: "solution", title: "Proposed Solution & Innovation", icon: Lightbulb },
      ]
    },
    {
      group: "II. User-Centric Design",
      items: [
        { id: "personas", title: "User Personas (9 Roles)", icon: Users },
        { id: "journey", title: "User Journeys & Touchpoints", icon: Compass },
        { id: "uiscreens", title: "UI Screens & Navigation Map", icon: Globe },
        { id: "access", title: "Accessibility & Inclusivity", icon: Sparkles },
      ]
    },
    {
      group: "III. Technical & AI Architecture",
      items: [
        { id: "sysarch", title: "System Architecture", icon: Cpu },
        { id: "aiarch", title: "AI Architecture & Agents", icon: Workflow },
        { id: "gcp", title: "Google Cloud Ecosystem", icon: Zap },
        { id: "dataflow", title: "Data Flow & GenAI Workflows", icon: Database },
        { id: "schema", title: "Database Schema (Cloud SQL / Firestore)", icon: Code },
      ]
    },
    {
      group: "IV. Enterprise Scale & Impact",
      items: [
        { id: "prompts", title: "Prompt Engineering Strategy", icon: Sparkles },
        { id: "sustain", title: "Sustainability & Carbon Offsets", icon: Leaf },
        { id: "secpriv", title: "Security, Privacy & Compliance", icon: Shield },
        { id: "risks", title: "Risk Mitigation & Scalability", icon: TrendingUp },
        { id: "roadmap", title: "Development Roadmap & Judge Pitch", icon: Clock },
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-slate-100 min-h-[500px]">
      {/* Slide Navigation */}
      <div className="md:col-span-1 bg-slate-900/60 rounded-xl border border-slate-800/60 p-3 flex flex-col gap-4 overflow-y-auto max-h-[600px] scrollbar-thin">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-2 pt-1 border-b border-slate-800 pb-2">
          PRESENTATION DECKS
        </div>
        {slideCategories.map((cat, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-emerald-500 tracking-wider uppercase px-2 mb-1">
              {cat.group}
            </span>
            {cat.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeSlide === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSlide(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ${
                    isActive
                      ? "bg-emerald-500/20 text-emerald-300 border-l-2 border-emerald-500"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-400" : "text-slate-500"}`} />
                  {item.title}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Slide Content Display */}
      <div className="md:col-span-3 bg-slate-900/40 rounded-xl border border-slate-800/40 p-6 overflow-y-auto max-h-[600px]">
        {activeSlide === "pitch" && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1">
                FIFA WORLD CUP 2026 HACKATHON
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Award className="text-emerald-400 w-6 h-6" /> The Elevator Pitch
              </h2>
            </div>
            
            <div className="bg-slate-950 p-6 rounded-xl border border-emerald-500/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
              <p className="text-lg italic text-slate-300 leading-relaxed font-sans font-medium">
                "When 80,000 passionate fans flood a stadium, standard command centers struggle with fragmented tools, blind spots, and lagging response times. 
                <strong className="text-emerald-400 not-italic"> ArenaPulse AI</strong> is the world's first unified, Google-powered generative command system that binds fans, volunteers, security, and emergency teams into a single responsive neural loop. 
                By predicting crowd congestion 25 minutes ahead, instantly synthesizing multivariant IoT alerts, and generating zero-stair accessibility paths, we don't just optimize stadium operations — we save lives, protect the climate, and deliver a seamless World Cup tournament experience."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800/40">
                <div className="text-xs text-slate-500 uppercase">Target Market</div>
                <div className="text-lg font-bold text-emerald-400 mt-1">16 Host Stadiums</div>
                <div className="text-xs text-slate-400 mt-1">FIFA World Cup 2026 across US, Canada & Mexico.</div>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800/40">
                <div className="text-xs text-slate-500 uppercase">Core Tech Edge</div>
                <div className="text-lg font-bold text-emerald-400 mt-1">Gemini 3.5 & Maps</div>
                <div className="text-xs text-slate-400 mt-1">Real-time reasoning, tool hybrid mode & tts streaming.</div>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800/40">
                <div className="text-xs text-slate-500 uppercase">Social Benefit</div>
                <div className="text-lg font-bold text-emerald-400 mt-1">100% Inclusive</div>
                <div className="text-xs text-slate-400 mt-1">Zero-stair wheelchair routes, voice interfaces & multi-lingual.</div>
              </div>
            </div>
          </div>
        )}

        {activeSlide === "exec" && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1">
                CENTRAL PROJECT BRIEF
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <FileText className="text-emerald-400 w-6 h-6" /> Executive Summary
              </h2>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              ArenaPulse AI acts as a digital nervous system designed exclusively for the high stakes of the 
              <strong> FIFA World Cup 2026</strong>. Stadium operators currently rely on fragmented, legacy telemetry—resulting in slow responses, high volunteer friction, and accessibility barriers. 
              By merging advanced Google Generative AI, cloud scaling, and geographic platform tools, ArenaPulse AI binds 8 modules into an elite operations dashboard.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Key Value Proposition</h4>
                <ul className="list-disc pl-4 text-[11px] text-slate-400 space-y-1">
                  <li><strong>Instant Incident Actionability:</strong> Converts unstructured IoT alarms into structured incident response guides.</li>
                  <li><strong>Volunteer Synergy:</strong> Auto-translates and targets instruction checklists to relevant volunteers in 30+ languages.</li>
                  <li><strong>Extreme Accessibility:</strong> Multi-sensory support, voice interfaces, and real-time obstacle navigation.</li>
                </ul>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Sustainable Impact</h4>
                <ul className="list-disc pl-4 text-[11px] text-slate-400 space-y-1">
                  <li><strong>Trash & Energy Optimization:</strong> On-demand waste pickup routes prevent overflow and save cleaning labor.</li>
                  <li><strong>Eco-Conscious Comfort:</strong> Micro-HVAC control suggestions reduce grid drain up to 15%.</li>
                  <li><strong>Carbon Metrics Tracking:</strong> Provides live transportation and energy consumption carbon-offset summaries.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeSlide === "problem" && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1">
                THE CHALLENGES OF FIFA 2026
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <AlertTriangle className="text-emerald-400 w-6 h-6" /> Problem Statement & Existing Challenges
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                FIFA World Cup 2026 will be the largest tournament in sports history: 38 days, 104 matches, and 48 competing nations. Host stadiums (e.g. SoFi, MetLife, Estadio Azteca) will receive millions of diverse, multilingual fans, facing severe structural challenges:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/10">
                  <h4 className="text-xs font-bold text-red-400 mb-1">1. Severe Operational Silos</h4>
                  <p className="text-[11px] text-slate-400">
                    Security, medical, facilities, and transportation operators use completely distinct communication channels, leading to lagging alerts, duplicated dispatches, and delayed response times during emergencies.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/10">
                  <h4 className="text-xs font-bold text-red-400 mb-1">2. Language and Accessibility Gaps</h4>
                  <p className="text-[11px] text-slate-400">
                    With fans arriving from dozens of countries, generic signage and english-only announcers fail. Wheelchair users frequently face steep stairs or blocked elevators without dynamic route updates.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/10">
                  <h4 className="text-xs font-bold text-red-400 mb-1">3. Volunteer Inefficiency</h4>
                  <p className="text-[11px] text-slate-400">
                    A typical stadium deploys 3,000+ local volunteers who are overwhelmed by massive stadiums, complex rosters, and zero real-time guidance during gate scanner failures or sudden crowd surges.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/10">
                  <h4 className="text-xs font-bold text-red-400 mb-1">4. Predictability Bottlenecks</h4>
                  <p className="text-[11px] text-slate-400">
                    Existing control centers operate reactively. They only identify crowd jams, water leaks, transit backlogs, or trash container overflow after they already disrupt the match or threaten public safety.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSlide === "solution" && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1">
                OUR VALUE AND INNOVATION
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Lightbulb className="text-emerald-400 w-6 h-6" /> Proposed Solution & Innovation
              </h2>
            </div>

            <p className="text-xs text-slate-300">
              <strong>ArenaPulse AI</strong> replaces reactive siloed operations with a unified **Generative AI Command Core** that actively digests massive multi-format telemetry (vision feeds, local IoT levels, parking logs, metropolitan transit, fan reports) to construct real-time insights.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-emerald-400 font-bold text-sm">25-min Proactive Leap</div>
                <p className="text-[11px] text-slate-400 mt-1">Predicts crowd density surges using vision analytics. Generates alternate gates on LED boards pre-emptively.</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-emerald-400 font-bold text-sm">Adaptive Routing Hub</div>
                <p className="text-[11px] text-slate-400 mt-1">Auto-syncs with municipal metro delay feeds to dynamically dispatch clean CNG stadium shuttle reserves.</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-emerald-400 font-bold text-sm">Dynamic Safety Voice</div>
                <p className="text-[11px] text-slate-400 mt-1">Translates localized emergency guides into 30+ languages, broadcasting audio announcements instantly.</p>
              </div>
            </div>

            <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/20">
              <h4 className="text-xs font-bold text-emerald-400 mb-1">Hackathon Judge Edge - Secret Sauce:</h4>
              <p className="text-[11px] text-slate-300">
                Unlike common "chatbot-only" entries, ArenaPulse implements an **Automated Action Engine**. When a water leak, transit failure, or crowd jam is identified, ArenaPulse does not wait to be asked; it pre-calculates redirect pathways, updates live digital signs via API, schedules standby staff shifts, and structures radio broadcasts in parallel.
              </p>
            </div>
          </div>
        )}

        {activeSlide === "personas" && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1">
                9 CORE TOURNAMENT ROLES
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Users className="text-emerald-400 w-6 h-6" /> User Personas
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto scrollbar-thin pr-1">
              {USER_PERSONAS.map((p, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 hover:border-emerald-500/30 transition-all">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2">
                    <span className="text-xs font-bold text-emerald-400 font-mono">[{p.role}]</span>
                    <span className="text-xs text-white font-medium">{p.name}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[10px]">
                    <div>
                      <span className="text-slate-500 block uppercase font-bold text-[8px]">Core Need</span>
                      <span className="text-slate-300">{p.need}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase font-bold text-[8px]">Pain Point</span>
                      <span className="text-red-400">{p.painPoint}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase font-bold text-[8px]">AI Solution</span>
                      <span className="text-emerald-300 font-medium">{p.solution}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSlide === "journey" && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1">
                END-TO-END EXPERIENCE
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Compass className="text-emerald-400 w-6 h-6" /> User Journey Maps
              </h2>
            </div>

            <div className="space-y-4">
              <div className="text-xs text-slate-300">
                Here is the dynamic touchpoint flow for Diego Lopez (Fan) as he arrives at Estadio Azteca using ArenaPulse:
              </div>

              {/* Journey Map visual blocks */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 relative">
                  <div className="absolute top-2 right-2 text-[8px] bg-emerald-500/20 text-emerald-400 px-1 rounded">STAGE 1</div>
                  <div className="font-bold text-xs text-emerald-400 mt-2">Transit & Park</div>
                  <p className="text-[10px] text-slate-400 mt-1">Updates Diego with parking occupancy logs; guides his vehicle directly to VIP Section Lot C bypass.</p>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 relative">
                  <div className="absolute top-2 right-2 text-[8px] bg-emerald-500/20 text-emerald-400 px-1 rounded">STAGE 2</div>
                  <div className="font-bold text-xs text-emerald-400 mt-2">Gate Entrance</div>
                  <p className="text-[10px] text-slate-400 mt-1">Sees massive crowd at Gate D; companion prompts him to enter Gate E, displaying wheelchair ramps.</p>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 relative">
                  <div className="absolute top-2 right-2 text-[8px] bg-emerald-500/20 text-emerald-400 px-1 rounded">STAGE 3</div>
                  <div className="font-bold text-xs text-emerald-400 mt-2">Half-Time Food</div>
                  <p className="text-[10px] text-slate-400 mt-1">Diego's app warns of 25-min hot dog wait; suggests local Mexican stands with 3-min queues.</p>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 relative">
                  <div className="absolute top-2 right-2 text-[8px] bg-emerald-500/20 text-emerald-400 px-1 rounded">STAGE 4</div>
                  <div className="font-bold text-xs text-emerald-400 mt-2">Exit Phase</div>
                  <p className="text-[10px] text-slate-400 mt-1">Post-match metro delay occurs; companion schedules shuttle bus Lot F directly for Diego's zone.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSlide === "uiscreens" && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1">
                UX MAP & INTERFACE LAYOUT
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Globe className="text-emerald-400 w-6 h-6" /> UI Screens & Navigation Map
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h4 className="text-xs font-bold text-emerald-400 mb-2">1. Fan Companion Interface</h4>
                <p className="text-[10px] text-slate-400 mb-2">Clean mobile SPA viewport centering dynamic interactive ticket cards, localized wait meters, step-by-step maps, and voice microphone query button.</p>
                <div className="border border-slate-800 rounded p-2 text-[9px] font-mono text-slate-500 bg-slate-900">
                  [Home: Live Match] → [Companion Chat Screen] ↔ [Accessible Route Overlay] ↔ [Digital Food Stand Menu]
                </div>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h4 className="text-xs font-bold text-emerald-400 mb-2">2. Central Command Dashboard</h4>
                <p className="text-[10px] text-slate-400 mb-2">Unified high-contrast multi-panel screen (as built in this simulator) with real-time vector map, incident monitoring queue, and detailed risk matrices.</p>
                <div className="border border-slate-800 rounded p-2 text-[9px] font-mono text-slate-500 bg-slate-900">
                  [Map Console] ↔ [Module Controller Drawer] ↔ [Live Sensor Logs] ↔ [Gemini Action Reports Panel]
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSlide === "access" && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1">
                EQUALITY & INCLUSIVITY
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Sparkles className="text-emerald-400 w-6 h-6" /> Accessibility & Inclusivity
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
                <h4 className="text-xs font-bold text-teal-400 mb-1">Zero-Stair Routing Engine</h4>
                <p className="text-[10px] text-slate-400">
                  Maps wheelchair ramps, extra-wide elevators, and prioritizes smooth flat concrete corridors over stairs. If a physical elevator fails, the system automatically marks it on active paths.
                </p>
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
                <h4 className="text-xs font-bold text-teal-400 mb-1">Sensory Distress Management</h4>
                <p className="text-[10px] text-slate-400">
                  Provides localized sensory density heat-maps for neurodivergent fans. Dynamically routes them away from loud stadium horn groups to the nearest official sensory booth.
                </p>
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
                <h4 className="text-xs font-bold text-teal-400 mb-1">Hearing & Visual Aids</h4>
                <p className="text-[10px] text-slate-400">
                  Combines visual prompts for hearing-impaired fans, sign language volunteer alerts, and clean descriptive audio streams of active pitch plays for visually impaired seats.
                </p>
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
                <h4 className="text-xs font-bold text-teal-400 mb-1">Vocal Broadcast (Gemini TTS)</h4>
                <p className="text-[10px] text-slate-400">
                  Converts safety and redirection directives into audio announcements spoken in regional accents to assist fans who cannot read digital displays during exit operations.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeSlide === "sysarch" && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1">
                GOOGLE CLOUD TOPOLOGY
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Cpu className="text-emerald-400 w-6 h-6" /> System Architecture
              </h2>
            </div>

            {/* Custom visual ASCII/CSS system flowchart */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono space-y-4">
              <div className="text-center border border-slate-800 p-2 bg-slate-900 rounded font-bold text-emerald-400">
                IoT Edge Devices (Sensors, Camera vision, Ticketing scanner logs, Metro transit APIs)
              </div>
              <div className="flex justify-center">↓ (Streaming Pub/Sub)</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-slate-800 p-2 bg-slate-900 rounded text-center">
                  <span className="text-teal-400 block font-bold">BigQuery</span>
                  Aggregates operational logs & historical crowd wait times
                </div>
                <div className="border border-slate-800 p-2 bg-slate-900 rounded text-center">
                  <span className="text-teal-400 block font-bold">Cloud Run Core (API Node)</span>
                  Express backend orchestrating central logical analysis
                </div>
              </div>
              <div className="flex justify-center">↓ (Secure Private VPC Connection)</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-slate-800 p-2 bg-slate-900 rounded text-center">
                  <span className="text-teal-400 block font-bold">Firestore (Durable NoSQL)</span>
                  Real-time sync of rosters, alerts, and profiles
                </div>
                <div className="border border-slate-800 p-2 bg-slate-900 rounded text-center">
                  <span className="text-teal-400 block font-bold">Gemini API via AI Studio</span>
                  Incident evaluation, multi-lang text, & flash TTS
                </div>
              </div>
              <div className="flex justify-center">↓ (Output Channels)</div>
              <div className="text-center border border-slate-800 p-2 bg-slate-900 rounded font-bold text-emerald-400">
                Stadium LED Signboards | Fan Mobile Companion App | Security Terminals | Audio PA Broadcasts
              </div>
            </div>
          </div>
        )}

        {activeSlide === "aiarch" && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1">
                AGENTS & REASONING PIPELINES
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Workflow className="text-emerald-400 w-6 h-6" /> AI Architecture & Agents
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                Our AI architecture uses **Hierarchical Multi-Agent Orchestration**. The Central Coordinator ("ArenaPulse Central") evaluates inputs and delegates processing to specific sub-agents:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <h4 className="text-xs font-bold text-emerald-400 mb-1">Central Coordinator</h4>
                  <p className="text-[10px] text-slate-400">Uses **Gemini 3.5-flash** as a router. Parses text warnings or IoT exceptions, classifies severity level (Normal/Warning/Critical), and schedules the correct sub-agent loop.</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <h4 className="text-xs font-bold text-emerald-400 mb-1">Crowd Routing Sub-Agent</h4>
                  <p className="text-[10px] text-slate-400">Integrates Maps grounding tools. Sequentially parses gate clearance levels, determines bottleneck zones, and outputs dynamic text redirection commands.</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <h4 className="text-xs font-bold text-emerald-400 mb-1">Transit Dispatch Sub-Agent</h4>
                  <p className="text-[10px] text-slate-400">Correlates city transport schedules and parking capacity logs. Directs auxiliary shuttle counts and calculates precise arrival forecasts.</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <h4 className="text-xs font-bold text-emerald-400 mb-1">Sustainability Sub-Agent</h4>
                  <p className="text-[10px] text-slate-400">Analyzes grid consumption models and solid-waste volume levels. Suggests on-demand pickup paths and carbon emission metrics.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSlide === "gcp" && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1">
                STACK SELECTION FOR FIFA 2026
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Zap className="text-emerald-400 w-6 h-6" /> Google Cloud Ecosystem
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GOOGLE_SERVICES.map((s, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <div className="text-xs font-bold text-emerald-400 border-b border-slate-900 pb-1 mb-2 font-mono">
                    {s.name}
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    {s.use}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSlide === "dataflow" && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1">
                END-TO-END TELEMETRY PIPELINE
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Database className="text-emerald-400 w-6 h-6" /> Data Flow & GenAI Workflows
              </h2>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h4 className="text-xs font-bold text-emerald-400 mb-2 font-mono">Live Telemetry Pipeline (Dug in 4 Stages)</h4>
                <div className="space-y-3 text-[11px] text-slate-400">
                  <div>
                    <span className="text-teal-400 font-bold block">1. INGESTION PHASE</span>
                    IoT pressure nodes, turnstile scans, and metropolitan transit delays stream into **Google Cloud Pub/Sub** concurrently at a rate of 12,000 requests/sec.
                  </div>
                  <div>
                    <span className="text-teal-400 font-bold block">2. PIPELINE ENRICHMENT</span>
                    **Dataflow** processes telemetry streams, structures variables, and dumps logs into **BigQuery** while updating current state values in **Firestore**.
                  </div>
                  <div>
                    <span className="text-teal-400 font-bold block">3. GENAI INTERACTION CLASSIFIER</span>
                    When sensor variance crosses standard thresholds (e.g. pressure spike), a trigger alerts **Cloud Functions**, executing a structured Gemini analysis.
                  </div>
                  <div>
                    <span className="text-teal-400 font-bold block">4. ACTION & PRESENTATION</span>
                    The parsed JSON response updates digital LED displays, logs actions for responder tablets, and translates oral scripts for the stadium audio PA.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSlide === "schema" && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1">
                DURABLE CLOUD PERSISTENCE
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Code className="text-emerald-400 w-6 h-6" /> Database Schemas
              </h2>
            </div>

            <p className="text-xs text-slate-300">
              Our full-stack implementation maintains secure database persistence utilizing **Firestore** for real-time app telemetry and **Cloud SQL (PostgreSQL)** for transactional operational integrity:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Firestore layout */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-[10px] text-slate-400">
                <div className="text-emerald-400 font-bold border-b border-slate-900 pb-1 mb-2">
                  FIRESTORE (Real-time NoSQL Collections)
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-slate-200 block font-bold">/incidents/&#123;incidentId&#125;</span>
                    status: "warning" | "critical"<br />
                    module: "crowd" | "emergency"<br />
                    timestamp: Timestamp<br />
                    description: string<br />
                    actions: Array&lt;string&gt;
                  </div>
                  <div>
                    <span className="text-slate-200 block font-bold">/users/&#123;userId&#125;</span>
                    role: "fan" | "volunteer" | "security"<br />
                    language: "es" | "fr" | "en"<br />
                    location: GeoPoint<br />
                    activeIncidentTask: string
                  </div>
                </div>
              </div>

              {/* PostgreSQL layout */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-[10px] text-slate-400">
                <div className="text-emerald-400 font-bold border-b border-slate-900 pb-1 mb-2">
                  CLOUD SQL (PostgreSQL Schema)
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-slate-200 block font-bold">TABLE deployments (</span>
                    id VARCHAR PRIMARY KEY,<br />
                    volunteer_id VARCHAR REFERENCES users(id),<br />
                    assigned_gate VARCHAR(50),<br />
                    shift_start TIMESTAMP,<br />
                    shift_status VARCHAR(20)<br />
                    <span className="text-slate-200">);</span>
                  </div>
                  <div>
                    <span className="text-slate-200 block font-bold">TABLE transit_logs (</span>
                    log_id SERIAL PRIMARY KEY,<br />
                    shuttle_id VARCHAR(50),<br />
                    battery_charge INT,<br />
                    active_route VARCHAR(100),<br />
                    co2_saved_kg NUMERIC<br />
                    <span className="text-slate-200">);</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSlide === "prompts" && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1">
                PRODUCTION-GRADE PROMPT PATTERNS
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Sparkles className="text-emerald-400 w-6 h-6" /> Prompt Engineering Strategy
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROMPT_STRATEGIES.map((p, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <h4 className="text-xs font-bold text-emerald-400 mb-1">{p.title}</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-teal-400 font-mono">Example System Prompt for Emergency Classifier</h4>
              <pre className="text-[9px] text-slate-400 overflow-x-auto whitespace-pre-wrap leading-tight bg-slate-900 p-3 rounded border border-slate-800/60 font-mono">
{`"You are the Central Emergency Dispatcher for SoFi Stadium during FIFA World Cup 2026.
Incoming logs represent chaotic crowd or medical telemetry.
Evaluate immediately for life-threat conditions.
Structure response containing actions, fire route, and announcers verbal warning.
Do NOT sound panicky. Maintain direct, objective command-center authority."`}
              </pre>
            </div>
          </div>
        )}

        {activeSlide === "sustain" && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1">
                FIFA ECO-TOURNEY COMPLIANCE
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Leaf className="text-emerald-400 w-6 h-6" /> Sustainability & Carbon Offsets
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div className="text-xl font-bold text-emerald-400">12.5% Grid Drop</div>
                <p className="text-[10px] text-slate-400 mt-1">Suggested by micro-dimming auxiliary concourse zones pre-match.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div className="text-xl font-bold text-emerald-400">On-Demand Routes</div>
                <p className="text-[10px] text-slate-400 mt-1">Prevents cleaning vehicles from driving idle corridors, cutting diesel fuel emissions.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div className="text-xl font-bold text-emerald-400">Carbon offset logs</div>
                <p className="text-[10px] text-slate-400 mt-1">Provides live reports outlining exact metrics on energy, trash, and transit CO2.</p>
              </div>
            </div>

            <p className="text-xs text-slate-300">
              ArenaPulse integrates eco-routing and resource tracking directly into normal operations. When trash bins reach 90% or water levels fluctuate, cleaning and plumbing crews are dispatched on localized optimal paths, avoiding heavy grid-congested stairs and corridors.
            </p>
          </div>
        )}

        {activeSlide === "secpriv" && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1">
                ENTERPRISE TRIPLE-GUARD SECURITY
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Shield className="text-emerald-400 w-6 h-6" /> Security, Privacy & Compliance
              </h2>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <p>
                ArenaPulse AI operates on high-security networks with strict privacy architectures to protect fans and volunteers:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px]">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">1. Zero PI Ingestion</span>
                  <p className="text-slate-400">All local face-matching, ticketing scanner IDs, and crowd telemetry are anonymized at the edge before hitting the Gemini API node.</p>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">2. Local VPC Isolations</span>
                  <p className="text-slate-400">Cloud Run is sequestered in a Private VPC with Cloud SQL, using Google Cloud IAM credentials for maximum security guardrails.</p>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">3. GDPR & CCPA Shield</span>
                  <p className="text-slate-400">Fan profiles and locations are transient. They are completely deleted 4 hours post-match, maintaining alignment with strict global compliance.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSlide === "risks" && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1">
                REDUNDANCY & FAULT TOLERANCE
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <TrendingUp className="text-emerald-400 w-6 h-6" /> Risk Mitigation & Scalability
              </h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                  <h4 className="text-xs font-bold text-amber-400 mb-1">RISK: Network Outage / Wi-Fi Jitter</h4>
                  <p className="text-[10px] text-slate-400">
                    With 80,000 fans, cellular networks choke. <strong className="text-emerald-400">Mitigation:</strong> Local volunteer and security tablets download cached offline PWA nodes that sync using localized peer-to-peer mesh networks.
                  </p>
                </div>
                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                  <h4 className="text-xs font-bold text-amber-400 mb-1">RISK: GenAI Hallucination in Emergencies</h4>
                  <p className="text-[10px] text-slate-400">
                    AI suggesting incorrect evacuation routes during fires. <strong className="text-emerald-400">Mitigation:</strong> Gemini responses are constrained to static authorized fire maps. Crucial safety tasks require physical approval by a human FIFA Operator.
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h4 className="text-xs font-bold text-emerald-400 mb-1">Scalability & Auto-Scaling</h4>
                <p className="text-[10px] text-slate-300">
                  Our Cloud Run engine scales from **0 to 1,000 parallel instances** in under 4 seconds during peak entrance surges. BigQuery provides serverless telemetry ingestion, easily processing up to 100,000 events per second.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeSlide === "roadmap" && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1">
                GANTT TIMELINE & FINAL DEMO FLOW
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Clock className="text-emerald-400 w-6 h-6" /> Development Roadmap & Judge Pitch
              </h2>
            </div>

            {/* Gantt chart design built with CSS/HTML */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-teal-400 font-mono">12-Month Launch Timeline</h4>
              <div className="space-y-2 font-mono text-[9px]">
                <div className="flex items-center gap-2">
                  <span className="w-16 text-slate-400">M1 - M3:</span>
                  <div className="flex-1 bg-slate-950 h-6 rounded border border-slate-800 flex items-center px-2">
                    <div className="bg-emerald-500/20 text-emerald-400 h-full w-[30%] flex items-center px-2 rounded-l">
                      Core Pipeline Setup
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-16 text-slate-400">M4 - M6:</span>
                  <div className="flex-1 bg-slate-950 h-6 rounded border border-slate-800 flex items-center px-2">
                    <div className="w-[30%]"></div>
                    <div className="bg-emerald-500/35 text-emerald-300 h-full w-[40%] flex items-center px-2 rounded">
                      Model Tuning & Agent Coding
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-16 text-slate-400">M7 - M9:</span>
                  <div className="flex-1 bg-slate-950 h-6 rounded border border-slate-800 flex items-center px-2">
                    <div className="w-[70%]"></div>
                    <div className="bg-teal-500/40 text-teal-300 h-full w-[20%] flex items-center px-2 rounded">
                      Field Tests
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-16 text-slate-400">M10 - M12:</span>
                  <div className="flex-1 bg-slate-950 h-6 rounded border border-slate-800 flex items-center px-2">
                    <div className="w-[90%]"></div>
                    <div className="bg-emerald-500 text-slate-950 font-bold h-full w-[10%] flex items-center px-2 rounded-r">
                      LAUNCH
                    </div>
                  </div>
                </div>
              </div>

              {/* Pitch segment */}
              <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/20 space-y-2 mt-4">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">JUDGE PITCH: THE WINNING VERDICT</h4>
                <p className="text-[11px] text-slate-300 italic">
                  "Judges, ArenaPulse AI wins because it is innovative yet realistic. It integrates Google's leading AI (Gemini 3.5 & Maps) to solve a concrete, high-stakes, multi-billion dollar problem: managing the world's largest sporting event safely, sustainably, and inclusively. With durable Firestore sync, zero-stair accessibility routing, and localized safety broadcasts, we turn stadium operations from an obstacle into a competitive asset."
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default ProposalViewer;
