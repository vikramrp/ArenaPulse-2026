import { ModuleInfo, Persona } from "./types";

export const STADIUM_SECTORS = [
  { id: "NorthStand", name: "North Stand (Gate A/B)", status: "normal", code: "N1" },
  { id: "EastStand", name: "East Stand (Gate C/D)", status: "normal", code: "E1" },
  { id: "SouthStand", name: "South Stand (Gate E/F)", status: "normal", code: "S1" },
  { id: "WestStand", name: "West Stand (Gate G/H)", status: "normal", code: "W1" },
  { id: "PlazaZone", name: "Outer Plaza & Parking", status: "normal", code: "P1" },
  { id: "ConcourseLevel1", name: "Main Concourse L1", status: "normal", code: "C1" },
  { id: "SuitesLevel2", name: "Premium Suites L2", status: "normal", code: "S2" },
  { id: "PitchZone", name: "Pitch & Player Areas", status: "normal", code: "Z1" },
];

export const MODULES_DATA: ModuleInfo[] = [
  {
    id: "fan",
    name: "AI Fan Companion",
    tagline: "Personalized match experience, parking, food queues, and accessibility navigation",
    iconName: "User",
    description: "Empowers fans with multi-language conversational support, smart seat-routing, real-time wait-time warnings for foods and washrooms, and seamless parking directions.",
    scenarios: [
      {
        id: "fan-lost-child",
        title: "Lost Child Assistance",
        description: "A parent reports a missing 7-year-old child wearing a red jersey near the East Concourse level 1. Core AI immediately coordinates visual matching via security nodes and schedules emergency volunteer coverage.",
        location: "East Concourse Level 1, near Section 114",
        badgeColor: "bg-red-500/10 text-red-400 border-red-500/20"
      },
      {
        id: "fan-queue-prediction",
        title: "Food Queue & Restroom Congestion",
        description: "Predictive monitoring shows concession stall 'Plaza Tacos' has a 35-minute wait time during half-time. Core AI suggests alternative nearby vendors with under 5-minute wait times to fans in Sections 110-115.",
        location: "Section 112 Concourse",
        badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20"
      },
      {
        id: "fan-seat-routing",
        title: "Accessible Parking & Seat Path",
        description: "A fan with knee injury requests step-free navigation from Parking Lot C to Seat Section 308. Core AI builds an optimal ramp-based path and notifies standby shuttle operators.",
        location: "Parking Lot C to Section 308",
        badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/20"
      }
    ]
  },
  {
    id: "crowd",
    name: "AI Crowd Intelligence",
    tagline: "Predictive bottlenecks, density monitoring, and dynamic evacuation route generation",
    iconName: "Users",
    description: "Uses vision processing and localized telemetry to predict crowd jams up to 25 minutes before they happen. Automatically designs dynamic redirection routes on digital display signs.",
    scenarios: [
      {
        id: "crowd-gate-bottleneck",
        title: "Gate B Bottleneck Imminent",
        description: "Vision sensors detect standard gate-processing times dropping as fan density hits 4.5 people/sqm at Gate B. Core AI proposes redirecting 30% of approaching flow to the adjacent Gate A.",
        location: "Gate B Entry Plaza",
        badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20"
      },
      {
        id: "crowd-sudden-run",
        title: "Unusual Crowd Run Event",
        description: "Anomaly detection flags sudden rapid movement/running of multiple groups in Sector 212. Core AI alerts nearby security teams and activates audio visual feeds on the central console.",
        location: "Sector 212 Upper Tier",
        badgeColor: "bg-red-500/10 text-red-400 border-red-500/20"
      },
      {
        id: "crowd-evacuation",
        title: "Dynamic Evacuation Route Generation",
        description: "A localized electrical short in Section 104 requires immediate empty-out. Core AI calculates fire-escape routes avoiding active smoke sectors, auto-displays paths on LED boards, and alerts emergency crews.",
        location: "Lower North Stand Section 104",
        badgeColor: "bg-red-500/10 text-red-400 border-red-500/20"
      }
    ]
  },
  {
    id: "operations",
    name: "AI Operations Center",
    tagline: "Unified stadium health, incident management, and automated staffing models",
    iconName: "Layers",
    description: "Acts as the command deck for FIFA Directors and Stadium Managers. Synthesizes thousands of IoT feeds into operational risk warnings, power levels, and water/waste states.",
    scenarios: [
      {
        id: "ops-leak-detected",
        title: "Water Main Drop - South Stand",
        description: "Pressure drop detected in the main riser feeding South Stand food services. Core AI flags operational disruption risk, recommends dispatching a plumber crew, and warns vendors to prepare reserve storage.",
        location: "South Stand Service Tunnel",
        badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20"
      },
      {
        id: "ops-staffing-opt",
        title: "Shift Scheduling & Deployments",
        description: "Attendance data shows 85% tickets scanned by 1 hour pre-match, but Gate D is heavily backlogged due to volunteer absence. Core AI recommends moving 8 standby volunteers from Gate G.",
        location: "Command Control",
        badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/20"
      },
      {
        id: "ops-power-peak",
        title: "Peak Grid Load Warning",
        description: "Stadium HVAC and broadcast trucks push total consumption to 94% grid capacity. Core AI suggests dimming back-office non-essential corridor LED zones and turning off inactive auxiliary displays.",
        location: "Main Utility Grid",
        badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/20"
      }
    ]
  },
  {
    id: "sustainability",
    name: "AI Sustainability Engine",
    tagline: "Real-time carbon tracking, trash bin overflow, and utility conservation",
    iconName: "Leaf",
    description: "Aligns FIFA 2026 operations with carbon-neutral goals. Monitors solid waste bins, schedules on-demand pickups to prevent trash accumulation, and manages smart rainwater reclamation loops.",
    scenarios: [
      {
        id: "sust-bin-overflow",
        title: "Trash Accumulation Alert",
        description: "Concourse bins near Sector 108 report 92% capacity. ArenaPulse AI generates an optimized collection path for recycling teams, routing them via less crowded corridors.",
        location: "Sector 108 Concourse",
        badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20"
      },
      {
        id: "sust-carbon-footprint",
        title: "Live Carbon Offset Reporting",
        description: "Analyzes transit reports and grid consumption to calculate live carbon emissions. Generates dynamic reports suggesting adjustments in electric shuttle bus routes to save 4.2 tons of CO2.",
        location: "Sustainability Office",
        badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/20"
      },
      {
        id: "sust-water-conserve",
        title: "Water Reclamation Loop Trigger",
        description: "Weather station predicts rainfall. Core AI pre-emptively drains storage cisterns to 40% capacity, preparing to capture and reuse 120,000 liters of rainwater for stadium cooling towers.",
        location: "Water Catchment Center",
        badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/20"
      }
    ]
  },
  {
    id: "transport",
    name: "AI Transport Assistant",
    tagline: "Subway integration, dynamic shuttle dispatch, and parking space intelligence",
    iconName: "Truck",
    description: "Syncs stadium gates with external city networks. Reads subway delays, auto-calculates shuttle schedules, coordinates dynamic parking lots, and warns fans of transit times.",
    scenarios: [
      {
        id: "trans-subway-delay",
        title: "Metro Line 4 Delay (25 min)",
        description: "A mechanical fault halts Line 4 transit, leaving 8,500 fans stranded post-match. Core AI automatically requests dispatch of 15 supplementary CNG buses to Outer Plaza Lot F.",
        location: "Metro Station Plaza",
        badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20"
      },
      {
        id: "trans-parking-full",
        title: "Parking Lot D At Capacity",
        description: "Lot D hits 98% space occupancy. Core AI updates automated digital roadside LED highway signs 5km away, instructing incoming fans to proceed straight to the overflow Lot H.",
        location: "North Perimeter Highway",
        badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20"
      },
      {
        id: "trans-shuttle-opt",
        title: "Shuttle Battery Optimization",
        description: "Correlates transport request logs to discover 90% accessibility requests are concentrated at South Terminal. Core AI alters fleet charging cycles to ensure max availability at South Stand.",
        location: "Shuttle Depot",
        badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/20"
      }
    ]
  },
  {
    id: "accessibility",
    name: "AI Accessibility Assistant",
    tagline: "Voice-guided navigation, sign-language aids, and wheelchair route planners",
    iconName: "Eye",
    description: "Ensures an inclusive tournament for all. Provides real-time voice guidance, identifies barrier-free pathways, coordinates physical escorts, and formats critical broadcasts for sensory needs.",
    scenarios: [
      {
        id: "access-wheelchair-path",
        title: "Barrier-Free Route Planning",
        description: "A family with three wheelchair users enters Gate G. Core AI maps a completely flat route bypassing high-traffic stairs, and reserves priority elevators for their exclusive ascent.",
        location: "Gate G (West Entrance)",
        badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/20"
      },
      {
        id: "access-sensory-overload",
        title: "Sensory Room Escort",
        description: "A fan reports high distress from noise. Core AI identifies the nearest quiet Sensory Room (Suite 204), guides the fan using audio cues, and notifies the sensory room host of their arrival.",
        location: "Upper Concourse Level 3",
        badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/20"
      },
      {
        id: "access-sign-volunteers",
        title: "Sign-Language Assistant Match",
        description: "Hearing impaired fan at the central help desk needs support. Core AI searches local databases and prompts Volunteer Amina (who has American Sign Language fluency) to report to desk 4.",
        location: "Plaza Central Help Desk",
        badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/20"
      }
    ]
  },
  {
    id: "emergency",
    name: "AI Emergency Assistant",
    tagline: "Medical dispatch routes, incident summaries, and automated first-responder guides",
    iconName: "ShieldAlert",
    description: "Acts as a rapid response controller. Pinpoints distress signals, isolates incidents, suggests safe first-aid guides, and calculates precise grid coordinates for rescue squads.",
    scenarios: [
      {
        id: "emerg-heat-stroke",
        title: "Medical Emergency - Heat Stroke",
        description: "Fan collapses in Row 22, Section 102. Crowd sensors trigger alert. Core AI calculates the quickest route from Medical Booth 3, alerts responders, and feeds step-by-step CPR/cooling protocols.",
        location: "East Tier Section 102",
        badgeColor: "bg-red-500/10 text-red-400 border-red-500/20"
      },
      {
        id: "emerg-kitchen-smoke",
        title: "Smoke Trigger - Kitchen 2B",
        description: "Smoke sensor fires in level 2 kitchen. Core AI isolates the sector's HVAC to prevent smoke circulating into the seating bowl, recommends dispatching responders, and plans emergency extraction pathways.",
        location: "Level 2 Food Prep Area 2B",
        badgeColor: "bg-red-500/10 text-red-400 border-red-500/20"
      },
      {
        id: "emerg-power-blackout",
        title: "Localized Stand Blackout",
        description: "Transformer failure causes electrical blackout in North-West concourse toilets. Core AI pre-emptively fires up auxiliary battery packs and dispatches standby technicians with safety lighting.",
        location: "North-West Service Concourse",
        badgeColor: "bg-red-500/10 text-red-400 border-red-500/20"
      }
    ]
  },
  {
    id: "volunteer",
    name: "AI Volunteer Assistant",
    tagline: "Natural language instruction dispatch, shift scheduling, and task assistant",
    iconName: "Sparkles",
    description: "The digital supervisor for 3,500+ volunteers. Sends contextual instructions, responds to knowledge questions (e.g. 'Where is the VIP press entrance?'), and logs task completions.",
    scenarios: [
      {
        id: "vol-ticket-scanner",
        title: "Gate F Scanner Outage",
        description: "Ticket scanning terminal 4 goes offline due to Wi-Fi jitter. Core AI sends immediate troubleshooting steps to the on-site volunteer Amina, and files a priority runner IT ticket.",
        location: "Gate F Turnstiles",
        badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20"
      },
      {
        id: "vol-task-reassign",
        title: "Volunteer Reassignment",
        description: "A sudden influx of elderly fans is logged at Gate A. Core AI reallocates 4 volunteers from the low-traffic VIP parking to Gate A to distribute hearing aids and guide dog directions.",
        location: "Gate A Plaza",
        badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/20"
      },
      {
        id: "vol-press-guide",
        title: "Press Liaison Task Help",
        description: "A volunteer at Gate D is approached by a French media crew asking for the TV Broadcast compound. Volunteer queries ArenaPulse in natural language. Core AI instantly returns maps and credentials.",
        location: "Media Entry Gate 5",
        badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/20"
      }
    ]
  }
];

export const USER_PERSONAS: Persona[] = [
  {
    role: "Fan",
    name: "Diego Lopez (Santiago, Chile)",
    avatar: "DL",
    need: "Navigate the massive 80,000-seat MetLife stadium safely with his elderly father and two young children without getting lost.",
    painPoint: "Fears long queues at washrooms/food causing him to miss World Cup goals; lacks native English skills.",
    solution: "Interactive multilingual AI Companion provides real-time queue notifications and simple visual paths directly to his seat."
  },
  {
    role: "Volunteer",
    name: "Amina Al-Mansoor (Dallas, USA)",
    avatar: "AA",
    need: "Clear, task-based instructions on how to handle gate ticketing failures, and instant access to stadium policies in natural language.",
    painPoint: "Overwhelmed by paper binders and chaotic megaphone announcements during crowd rushes.",
    solution: "AI Volunteer hub pushes localized push-alerts with direct troubleshooting checklists and answers workspace questions instantly."
  },
  {
    role: "Security Staff",
    name: "Officer Marcus Vance (Los Angeles, USA)",
    avatar: "MV",
    need: "Early warnings on potential crowd crunches, sudden dynamic gate bottlenecks, or abnormal block movements to coordinate squads.",
    painPoint: "Struggling to track 400 distinct camera feeds simultaneously; slow reaction time to physical disturbances.",
    solution: "AI Crowd Intelligence flags anomalous density spikes (above 4 people/sqm) and prompts him with immediate redirection advice."
  },
  {
    role: "Medical Team",
    name: "Dr. Kenji Tanaka (Osaka, Japan)",
    avatar: "KT",
    need: "Fastest navigation path through dense, high-excitement crowd sectors to reach fans requiring immediate medical triage.",
    painPoint: "High crowd densities physically blocking medical cart access; lag in receiving accurate incident coordinates.",
    solution: "Core Emergency Assistant calculates optimal route bypassing bottleneck corridors and coordinates physical volunteer shields."
  },
  {
    role: "Stadium Operator",
    name: "Sarah Jenkins (Atlanta, USA)",
    avatar: "SJ",
    need: "Comprehensive, live overview of water, grid power, trash capacity, elevator status, and network infrastructure.",
    painPoint: "Operating with fragmented siloed systems; unable to quickly estimate the ripple effect of a main power outage.",
    solution: "Operations Command Center integrates IoT data into a single AI-generated operations dashboard with predictive impact projections."
  },
  {
    role: "Event Organizer",
    name: "Pierre Dupont (FIFA Operations Director)",
    avatar: "PD",
    need: "High-level risk forecasting, staffing sufficiency checks, and automated daily tournament operations reports.",
    painPoint: "Spends up to 3 hours drafting daily debriefs manually; struggles to optimize volunteer counts for matches.",
    solution: "AI engine compiles thousands of events into a perfect 1-page natural-language executive report and suggests staff shifting models."
  },
  {
    role: "Transportation Lead",
    name: "Rajesh Patel (New York, USA)",
    avatar: "RP",
    need: "Coordinating metropolitan subway networks, express shuttle buses, and multiple parking lots containing thousands of vehicles.",
    painPoint: "Unpredicted subway delays leaving thousands of fans stranded outside the gate, threatening crowd safety.",
    solution: "Transport Assistant correlates live transit feeds to auto-dispatch standby bus reserves and re-program highway warning signs."
  },
  {
    role: "Accessibility User",
    name: "Elena Rostova (Munich, Germany)",
    avatar: "ER",
    need: "Needs 100% barrier-free navigation routes, clean voice interface capabilities, and sensory relief center coordinates.",
    painPoint: "Steps, escalators, and steep ramps are dangerous for her wheelchair; strobe lights and sirens cause sensory overload.",
    solution: "Accessibility Assistant maps wheelchair-accessible corridors, provides text-to-speech directions, and details sensory room availability."
  },
  {
    role: "Emergency Responder",
    name: "Chief Carlos Ortiz (Fire Department Command)",
    avatar: "CO",
    need: "Instant, reliable situation reports, safe chemical/electrical isolation options, and optimized emergency exit pathways during fire alarms.",
    painPoint: "False alarms causing unnecessary panics; lack of granular maps showing active blockages in tunnels.",
    solution: "Emergency assistant correlates multi-sensor telemetry to verify smoke, drafts fire evacuation plans, and streams data live."
  }
];

export const GOOGLE_SERVICES = [
  { name: "Google Cloud Run", use: "Hosts the containerized secure backend API routes, scaling to zero when the stadium is empty to minimize waste and budget costs." },
  { name: "Google AI Studio & Gemini API", use: "Powers the primary generative reasoning, multimodal image understanding, and text-to-speech (TTS) announcement broadcasts." },
  { name: "Gemini 2.x & 3.x Models", use: "Executes extremely fast operational reasoning using 'gemini-3.5-flash' and professional speech audio with 'gemini-3.1-flash-tts-preview'." },
  { name: "Google Maps Platform", use: "Provides deep geographic intelligence, custom stadium map layers, and routing for shuttle transport and accessibility pathways." },
  { name: "BigQuery", use: "Aggregates massive IoT feeds, ticket scan logs, and crowd sensors to identify historical congestion trends and perform deep risk analysis." },
  { name: "Firestore & Firebase", use: "Provides persistent local synchronization, real-time security rules, and user-profile credentials for fans and volunteers." },
  { name: "Translation AI", use: "Translates critical safety announcements, volunteer tasks, and fan guides into 32+ official languages of competing nations." },
];

export const PROMPT_STRATEGIES = [
  {
    title: "System Role Grounding",
    desc: "Enforces that Gemini speaks and behaves like a seasoned FIFA Tournament Director with strict focus on safety, FIFA rules, crowd flow protocols, and clear, non-panic communication."
  },
  {
    title: "Few-Shot Chain of Thought",
    desc: "Provides Gemini with examples of operational failures (e.g., escalator jam at Gate D) showing how to sequentially isolate the problem, alert teams, and generate dynamic routes."
  },
  {
    title: "Strict JSON Output Schemas",
    desc: "Utilizes Gemini's responseSchema to enforce strict formatting, enabling the Express server to parse results safely without regex extraction failures."
  },
  {
    title: "Multi-Persona Simulation Grounding",
    desc: "Prompts are formulated with specific context of the calling user (e.g., Medical Officer vs Fan), adjusting tone, vocabulary, and priority of recommendations automatically."
  }
];
