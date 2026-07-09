import React, { useState, useEffect, useRef } from "react";
import { 
  Trophy, 
  Tv, 
  Play, 
  TrendingUp, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Compass, 
  Flame,
  Award,
  ChevronRight,
  ShieldAlert,
  Zap,
  Info,
  Activity,
  Heart
} from "lucide-react";

interface Player {
  name: string;
  jersey: string;
  position: string;
  rating: number;
  club: string;
  imageUrls: string[];
  colorTheme: string; // Tailwind glow class
  borderColor: string;
  textColor: string;
  pac: number; // Pace
  sho: number; // Shooting
  pas: number; // Passing
  dri: number; // Dribbling
  def: number; // Defending
  phy: number; // Physicality
}

interface Team {
  name: string;
  code: string;
  flag: string;
  player: Player;
}

interface Matchup {
  id: string;
  title: string;
  stage: string;
  stadium: string;
  city: string;
  kickoff: string;
  teamA: Team;
  teamB: Team;
  isLive: boolean;
}

const MATCHUPS_DATA: Matchup[] = [
  {
    id: "fr-ma",
    title: "FR vs MA (France v Morocco)",
    stage: "GRAND FINAL",
    stadium: "Boston Stadium",
    city: "Boston, MA",
    kickoff: "Jul 10, 2026 • 17:00 Local",
    isLive: false,
    teamA: {
      name: "FRANCE",
      code: "FR",
      flag: "🇫🇷",
      player: {
        name: "Kylian Mbappé",
        jersey: "#10",
        position: "ST / LW",
        rating: 94,
        club: "Real Madrid",
        imageUrls: [
          "https://upload.wikimedia.org/wikipedia/commons/5/57/Kylian_Mbapp%C3%A9.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/b/b3/Kylian_Mbapp%C3%A9_2018.jpg"
        ],
        colorTheme: "from-[#00bbf9]/20 to-[#9b5de5]/20 shadow-[#00bbf9]/30",
        borderColor: "border-[#00bbf9]",
        textColor: "text-[#00bbf9]",
        pac: 97,
        sho: 92,
        pas: 84,
        dri: 93,
        def: 36,
        phy: 78
      }
    },
    teamB: {
      name: "MOROCCO",
      code: "MA",
      flag: "🇲🇦",
      player: {
        name: "Achraf Hakimi",
        jersey: "#2",
        position: "RB / RWB",
        rating: 88,
        club: "Paris Saint-Germain",
        imageUrls: [
          "https://upload.wikimedia.org/wikipedia/commons/e/e0/Achraf_Hakimi_%28cropped%29.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/e/ea/Achraf_Hakimi_2018.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/1/14/Achraf_Hakimi_2020.jpg"
        ],
        colorTheme: "from-[#f15bb5]/20 to-[#fee440]/20 shadow-[#f15bb5]/30",
        borderColor: "border-[#f15bb5]",
        textColor: "text-[#f15bb5]",
        pac: 95,
        sho: 76,
        pas: 83,
        dri: 84,
        def: 80,
        phy: 79
      }
    }
  },
  {
    id: "ar-us",
    title: "AR vs US (Argentina v USA)",
    stage: "SEMI FINAL",
    stadium: "MetLife Stadium",
    city: "East Rutherford, NJ",
    kickoff: "LIVE NOW • 85'",
    isLive: true,
    teamA: {
      name: "ARGENTINA",
      code: "AR",
      flag: "🇦🇷",
      player: {
        name: "Lionel Messi",
        jersey: "#10",
        position: "CF / AM",
        rating: 95,
        club: "Inter Miami",
        imageUrls: [
          "https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/c/c1/Lionel_Messi_20180626.jpg"
        ],
        colorTheme: "from-[#00f5d4]/20 to-[#00bbf9]/20 shadow-[#00f5d4]/30",
        borderColor: "border-[#00f5d4]",
        textColor: "text-[#00f5d4]",
        pac: 85,
        sho: 91,
        pas: 94,
        dri: 95,
        def: 35,
        phy: 65
      }
    },
    teamB: {
      name: "UNITED STATES",
      code: "USA",
      flag: "🇺🇸",
      player: {
        name: "Christian Pulisic",
        jersey: "#10",
        position: "LW / RW",
        rating: 87,
        club: "AC Milan",
        imageUrls: [
          "https://upload.wikimedia.org/wikipedia/commons/b/bf/Christian_Pulisic_2021_%28cropped%29.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/1/1a/Christian_Pulisic_2022.jpg"
        ],
        colorTheme: "from-[#fee440]/20 to-[#f15bb5]/20 shadow-[#fee440]/30",
        borderColor: "border-[#fee440]",
        textColor: "text-[#fee440]",
        pac: 89,
        sho: 81,
        pas: 82,
        dri: 86,
        def: 40,
        phy: 62
      }
    }
  },
  {
    id: "br-es",
    title: "BR vs ES (Brazil v Spain)",
    stage: "QUARTER FINAL",
    stadium: "SoFi Stadium",
    city: "Los Angeles, CA",
    kickoff: "Jul 12, 2026 • 20:00 Local",
    isLive: false,
    teamA: {
      name: "BRAZIL",
      code: "BR",
      flag: "🇧🇷",
      player: {
        name: "Marquinhos",
        jersey: "#4",
        position: "CB",
        rating: 89,
        club: "Paris Saint-Germain",
        imageUrls: [
          "https://upload.wikimedia.org/wikipedia/commons/e/ea/Marquinhos_2022.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/a/ad/Marquinhos_2018.jpg"
        ],
        colorTheme: "from-emerald-500/20 to-[#fee440]/20 shadow-emerald-500/30",
        borderColor: "border-emerald-500",
        textColor: "text-emerald-400",
        pac: 79,
        sho: 56,
        pas: 75,
        dri: 74,
        def: 90,
        phy: 81
      }
    },
    teamB: {
      name: "SPAIN",
      code: "ES",
      flag: "🇪🇸",
      player: {
        name: "Álvaro Morata",
        jersey: "#7",
        position: "ST",
        rating: 86,
        club: "AC Milan",
        imageUrls: [
          "https://upload.wikimedia.org/wikipedia/commons/3/30/Alvaro_Morata_-_FC_Zenit_Saint_Petersburg_vs._Juventus_-_20_October_2021.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/e/e0/%C3%81lvaro_Morata_2018.jpg"
        ],
        colorTheme: "from-red-500/20 to-amber-500/20 shadow-red-500/30",
        borderColor: "border-red-500",
        textColor: "text-red-400",
        pac: 83,
        sho: 85,
        pas: 72,
        dri: 79,
        def: 42,
        phy: 76
      }
    }
  },
  {
    id: "en-mx",
    title: "EN vs MX (England v Mexico)",
    stage: "GROUP STAGE",
    stadium: "Azteca Stadium",
    city: "Mexico City, MX",
    kickoff: "Jul 15, 2026 • 18:00 Local",
    isLive: false,
    teamA: {
      name: "ENGLAND",
      code: "EN",
      flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      player: {
        name: "Harry Kane",
        jersey: "#9",
        position: "ST",
        rating: 92,
        club: "Bayern Munich",
        imageUrls: [
          "https://upload.wikimedia.org/wikipedia/commons/1/14/Harry_Kane_2022.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/a/ad/Harry_Kane_2018.jpg"
        ],
        colorTheme: "from-slate-400/20 to-indigo-500/20 shadow-slate-400/30",
        borderColor: "border-slate-400",
        textColor: "text-slate-300",
        pac: 69,
        sho: 93,
        pas: 84,
        dri: 83,
        def: 49,
        phy: 83
      }
    },
    teamB: {
      name: "MEXICO",
      code: "MX",
      flag: "🇲🇽",
      player: {
        name: "Edson Álvarez",
        jersey: "#4",
        position: "CDM / CB",
        rating: 84,
        club: "West Ham United",
        imageUrls: [
          "https://upload.wikimedia.org/wikipedia/commons/d/de/Edson_%C3%81lvarez_Mexico_2018.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/9/9f/Edson_%C3%81lvarez_2021.jpg"
        ],
        colorTheme: "from-emerald-600/20 to-red-500/20 shadow-emerald-600/30",
        borderColor: "border-emerald-600",
        textColor: "text-emerald-500",
        pac: 68,
        sho: 62,
        pas: 72,
        dri: 71,
        def: 85,
        phy: 86
      }
    }
  },
  {
    id: "be-us",
    title: "BE vs US (Belgium v USA)",
    stage: "ROUND OF 16",
    stadium: "BC Place",
    city: "Vancouver, BC",
    kickoff: "Jul 18, 2026 • 15:00 Local",
    isLive: false,
    teamA: {
      name: "BELGIUM",
      code: "BE",
      flag: "🇧🇪",
      player: {
        name: "Kevin De Bruyne",
        jersey: "#7",
        position: "AM / CM",
        rating: 93,
        club: "Manchester City",
        imageUrls: [
          "https://upload.wikimedia.org/wikipedia/commons/d/de/Kevin_De_Bruyne_2022.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/4/40/Kevin_De_Bruyne_2018.jpg"
        ],
        colorTheme: "from-red-600/20 to-[#fee440]/20 shadow-red-600/30",
        borderColor: "border-red-600",
        textColor: "text-red-500",
        pac: 72,
        sho: 88,
        pas: 94,
        dri: 87,
        def: 65,
        phy: 78
      }
    },
    teamB: {
      name: "UNITED STATES",
      code: "USA",
      flag: "🇺🇸",
      player: {
        name: "Christian Pulisic",
        jersey: "#10",
        position: "LW / RW",
        rating: 87,
        club: "AC Milan",
        imageUrls: [
          "https://upload.wikimedia.org/wikipedia/commons/b/bf/Christian_Pulisic_2021_%28cropped%29.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/1/1a/Christian_Pulisic_2022.jpg"
        ],
        colorTheme: "from-[#fee440]/20 to-[#f15bb5]/20 shadow-[#fee440]/30",
        borderColor: "border-[#fee440]",
        textColor: "text-[#fee440]",
        pac: 89,
        sho: 81,
        pas: 82,
        dri: 86,
        def: 40,
        phy: 62
      }
    }
  }
];

interface SimulationEvent {
  minute: number;
  type: "goal" | "yellow" | "red" | "shot" | "foul" | "sub";
  text: string;
  team: "A" | "B";
}

// Helper function to proxy Wikimedia/Wikipedia images to bypass CORS / sandboxed iframe Referrer-Policy issues
function getProxiedImageUrl(url: string): string {
  if (!url) return "";
  if (url.includes("wikimedia.org") || url.includes("wikipedia.org")) {
    return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=400&fit=cover`;
  }
  return url;
}

// PREMIUM FUT PLAYER CARD RENDERER
function PlayerCard({ 
  player, 
  teamCode, 
  teamName, 
  flag, 
  theme 
}: { 
  player: Player; 
  teamCode: string; 
  teamName: string; 
  flag: string; 
  theme: "light" | "dark" 
}) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  const isLight = theme === "light";
  const activeImageUrl = getProxiedImageUrl(player.imageUrls[currentImgIndex]);

  // Reset indices and error state on player change
  useEffect(() => {
    setCurrentImgIndex(0);
    setImgError(false);
    setImgLoading(true);
  }, [player]);

  // Handle cached image already fully loaded on mount or index change
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setImgLoading(false);
    }
  }, [player, currentImgIndex]);

  const handleImageLoad = () => {
    setImgLoading(false);
  };

  const handleImageError = () => {
    if (currentImgIndex < player.imageUrls.length - 1) {
      setCurrentImgIndex(prev => prev + 1);
      setImgLoading(true);
    } else {
      setImgError(true);
      setImgLoading(false);
    }
  };

  return (
    <div className={`relative rounded-2xl p-4 border w-full max-w-[260px] flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 group hover:scale-[1.03] bg-gradient-to-b ${
      player.colorTheme
    } ${isLight ? "border-slate-200/90 bg-white" : "border-slate-800 bg-slate-950/40"}`}>
      
      {/* High-Tech Glow Overlay */}
      <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-current opacity-10 blur-2xl pointer-events-none" style={{ color: player.textColor.includes('#') ? player.textColor : undefined }} />

      {/* FUT Card Top HUD Details */}
      <div className="flex items-center justify-between mb-2.5 z-10">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-mono font-black tracking-tighter text-white drop-shadow-md">
            {player.rating}
          </span>
          <span className="text-[10px] text-slate-400 font-bold tracking-tight uppercase">OVR</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono font-black bg-slate-900/80 px-2 py-0.5 rounded text-white border border-slate-700/55">
            {player.position}
          </span>
          <span className="text-lg" title={teamName}>{flag}</span>
        </div>
      </div>

      {/* PORTRAIT GRAPHIC BOX WITH BULLETPROOF VECTOR FALLBACK */}
      <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 mb-3 group-hover:border-current transition-all" style={{ color: player.textColor.includes('#') ? player.textColor : undefined }}>
        
        {/* Dynamic scanning laser line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-60 animate-bounce pointer-events-none z-10" />

        {/* 1. If Image Loads Successfully */}
        {!imgError && (
          <img 
            ref={imgRef}
            src={activeImageUrl} 
            alt={player.name}
            className={`w-full h-full object-cover opacity-85 transition-all duration-500 group-hover:scale-105 ${
              imgLoading ? "scale-95 blur-sm opacity-30" : "scale-100 blur-0 opacity-100"
            }`}
            referrerPolicy="no-referrer"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}

        {/* 2. Premium Fut Silhouette / Poster Fallback (If image fails or is loading) */}
        {(imgError || imgLoading) && (
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-3 overflow-hidden select-none z-10">
            {/* Athletic Stadium Neon Circular track */}
            <div className="absolute w-32 h-32 rounded-full border border-dashed border-slate-700 animate-spin-slow opacity-25" />
            
            {/* Dynamic high contrast football silhouette representation */}
            <svg viewBox="0 0 100 100" className="w-24 h-24 text-slate-600/70 z-10 animate-pulse" fill="none" stroke="currentColor" strokeWidth="1.2">
              {/* Halftone concentric circular background glow */}
              <circle cx="50" cy="40" r="18" stroke="currentColor" strokeDasharray="1,2" className="opacity-45" />
              {/* Dynamic Footballer celebrating silhouette */}
              <path 
                d="M50,18 C52.2,18 54,16.2 54,14 C54,11.8 52.2,10 50,10 C47.8,10 46,11.8 46,14 C46,16.2 47.8,18 50,18 Z M45,26 L55,26 L65,42 L58,45 L52,34 L52,55 L62,78 L54,80 L47,62 L43,62 L36,80 L28,78 L38,55 L38,34 L32,45 L25,42 L35,26 Z" 
                fill="currentColor" 
                className="text-slate-500 drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]"
              />
              {/* Ground soccer ball */}
              <circle cx="50" cy="85" r="3" fill="#10b981" />
              <line x1="50" y1="85" x2="50" y2="80" stroke="#10b981" strokeWidth="0.5" strokeDasharray="1,1" />
            </svg>

            <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold mt-2 z-10 uppercase">
              {imgLoading ? "LOADING CAPTAIN..." : `${teamCode} CAPTAIN`}
            </span>
          </div>
        )}

        {/* Dynamic Dark Gradient Mask at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-85 pointer-events-none" />
        
        {/* Visual Overlay of Jersey Number */}
        <span className="absolute bottom-1 right-2 font-black text-6xl text-white/10 select-none tracking-tighter">
          {player.jersey}
        </span>
      </div>

      {/* PLAYER ATTRIBUTES HUD GRIDS (FUT STYLE) */}
      <div className="z-10 bg-slate-950/90 border border-slate-900/80 p-2.5 rounded-xl text-center flex flex-col gap-1.5 shadow-inner">
        <div>
          <span className={`text-[10px] font-black tracking-widest uppercase block ${player.textColor}`}>
            {teamName}
          </span>
          <span className="text-sm font-black text-white block mt-0.5 tracking-tight truncate">
            {player.name}
          </span>
        </div>

        {/* FUT Attribute bar ratings */}
        <div className="grid grid-cols-3 gap-x-2 gap-y-1 mt-1 pt-1.5 border-t border-slate-800/40 text-[9px] font-mono text-slate-400">
          <div className="flex justify-between border-r border-slate-800/40 pr-1">
            <span>PAC</span>
            <span className="text-white font-bold">{player.pac}</span>
          </div>
          <div className="flex justify-between border-r border-slate-800/40 pr-1 px-0.5">
            <span>SHO</span>
            <span className="text-white font-bold">{player.sho}</span>
          </div>
          <div className="flex justify-between pl-1">
            <span>PAS</span>
            <span className="text-white font-bold">{player.pas}</span>
          </div>
          <div className="flex justify-between border-r border-slate-800/40 pr-1">
            <span>DRI</span>
            <span className="text-white font-bold">{player.dri}</span>
          </div>
          <div className="flex justify-between border-r border-slate-800/40 pr-1 px-0.5">
            <span>DEF</span>
            <span className="text-white font-bold">{player.def}</span>
          </div>
          <div className="flex justify-between pl-1">
            <span>PHY</span>
            <span className="text-white font-bold">{player.phy}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const MatchupDashboard = React.memo(function MatchupDashboard({ theme = "dark" }: { theme?: "light" | "dark" }) {
  const [selectedMatchupId, setSelectedMatchupId] = useState("fr-ma");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [simulationEvents, setSimulationEvents] = useState<SimulationEvent[]>([]);
  const [liveMinute, setLiveMinute] = useState(0);

  const currentMatchup = MATCHUPS_DATA.find((m) => m.id === selectedMatchupId) || MATCHUPS_DATA[0];

  // Reset simulation when switching matchups
  useEffect(() => {
    setIsSimulating(false);
    setSimulationProgress(0);
    setScoreA(currentMatchup.isLive ? 2 : 0);
    setScoreB(currentMatchup.isLive ? 1 : 0);
    setLiveMinute(currentMatchup.isLive ? 85 : 0);
    setSimulationEvents(currentMatchup.isLive ? [
      { minute: 14, type: "goal", text: "🇦🇷 Lionel Messi scores with a stunning free kick!", team: "A" },
      { minute: 38, type: "yellow", text: "🇺🇸 Christian Pulisic receives a yellow card for a tactical foul.", team: "B" },
      { minute: 52, type: "goal", text: "🇦🇷 Julian Alvarez taps in after a beautiful counter attack!", team: "A" },
      { minute: 71, type: "goal", text: "🇺🇸 Christian Pulisic fires in a half-volley from the edge of the area!", team: "B" }
    ] : []);
  }, [selectedMatchupId, currentMatchup]);

  const handleSimulateMatch = () => {
    if (isSimulating) return;

    setIsSimulating(true);
    setScoreA(0);
    setScoreB(0);
    setLiveMinute(0);
    setSimulationProgress(0);
    setSimulationEvents([]);

    const matchEvents: SimulationEvent[] = [
      { minute: 12, type: "shot", text: `First dangerous attempt! ${currentMatchup.teamA.player.name} fires just over the bar.`, team: "A" },
      { minute: 26, type: "yellow", text: "Defensive hard tackle. Yellow card shown to midfielder.", team: "B" },
      { minute: 34, type: "goal", text: `⚽ GOAL! ${currentMatchup.teamA.player.name} slots it beautifully past the keeper!`, team: "A" },
      { minute: 45, type: "foul", text: "Foul right on the edge of the penalty box.", team: "A" },
      { minute: 58, type: "goal", text: `⚽ GOAL! ${currentMatchup.teamB.player.name} curls a brilliant shot into the top corner!`, team: "B" },
      { minute: 73, type: "shot", text: "Spectacular diving save by the keeper to deny a header!", team: "A" },
      { minute: 82, type: "yellow", text: "Yellow card for stopping a quick counter-attack.", team: "A" },
      { minute: 89, type: "goal", text: `⚽ GOAL! Incredible late drama as the ball is bundled into the net!`, team: "A" }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      setSimulationProgress(currentStep * 12.5);
      
      const currentMinute = Math.min(Math.floor(currentStep * 11.25), 90);
      setLiveMinute(currentMinute);

      // Check if any event happened
      const triggeredEvents = matchEvents.filter(e => e.minute <= currentMinute);
      setSimulationEvents(triggeredEvents);

      // Compute scores dynamically
      const goalsA = triggeredEvents.filter(e => e.type === "goal" && e.team === "A").length;
      const goalsB = triggeredEvents.filter(e => e.type === "goal" && e.team === "B").length;
      setScoreA(goalsA);
      setScoreB(goalsB);

      if (currentStep >= 8) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 1500);
  };

  const isLight = theme === "light";

  return (
    <div className={`rounded-xl border flex flex-col relative overflow-hidden w-full transition-all duration-300 ${
      isLight 
        ? "bg-white border-slate-200/90 shadow-sm" 
        : "bg-slate-900/40 backdrop-blur-md border-slate-800/80"
    }`} id="clash-of-titans-panel">
      {/* Dynamic Colored Glowing Header Line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-[#00f5d4] via-[#00bbf9] to-[#f15bb5]" />
      
      {/* Sports Broadcast Style Banner Top */}
      <div className="px-6 py-4 flex flex-col md:flex-row items-center justify-between border-b border-slate-800/20 gap-4">
        <div>
          <span className="bg-red-500 text-white text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded font-mono mr-2 animate-pulse">
            ★ EXCLUSIVE MATCH PREVIEW
          </span>
          <h2 className={`text-base font-black tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}>
            CLASH OF THE TITANS
          </h2>
          <p className="text-[11px] text-slate-500 font-sans mt-0.5">
            FIFA 2026 Live Match Tracker & Star Players Showcase
          </p>
        </div>

        {/* Info Pill */}
        <div className={`hidden sm:flex items-center gap-2 text-[10px] px-3 py-1.5 rounded-lg border font-mono ${
          isLight ? "bg-slate-50 border-slate-200 text-slate-600" : "bg-slate-950/60 border-slate-800/80 text-slate-400"
        }`}>
          <Tv className="w-3.5 h-3.5 text-[#00f5d4] animate-pulse" />
          <span>BROADCAST NETWORK SYNC ACTIVE</span>
        </div>
      </div>

      {/* MATCHUP PICKER ROW */}
      <div className={`flex items-center gap-2 overflow-x-auto p-3 scrollbar-thin border-b ${
        isLight ? "bg-slate-50/50 border-slate-100" : "bg-slate-950/30 border-slate-900/60"
      }`}>
        {MATCHUPS_DATA.map((matchup) => (
          <button
            key={matchup.id}
            onClick={() => setSelectedMatchupId(matchup.id)}
            className={`whitespace-nowrap px-4 py-1.5 text-xs font-mono font-bold rounded-lg border transition-all shrink-0 flex items-center gap-2 ${
              selectedMatchupId === matchup.id
                ? "bg-slate-900 text-white border-[#00f5d4] shadow-md shadow-[#00f5d4]/10"
                : isLight
                  ? "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                  : "bg-slate-900/40 border-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
            }`}
          >
            {matchup.isLive && (
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping inline-block" />
            )}
            <span>{matchup.teamA.flag} VS {matchup.teamB.flag}</span>
            <span className="opacity-60 text-[10px]">({matchup.teamA.code} vs {matchup.teamB.code})</span>
          </button>
        ))}
      </div>

      {/* CLASH COMPONENT WRAPPER */}
      <div className="p-6 flex flex-col gap-6 relative">
        {/* Background glowing gradients */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#00bbf9]/5 via-transparent to-[#f15bb5]/5 pointer-events-none" />

        {/* MAIN VISUAL LAYOUT CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center z-10">
          
          {/* TEAM A STAR PLAYER CARD (Left Column) */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <PlayerCard 
              player={currentMatchup.teamA.player}
              teamCode={currentMatchup.teamA.code}
              teamName={currentMatchup.teamA.name}
              flag={currentMatchup.teamA.flag}
              theme={theme}
            />
          </div>

          {/* CENTER CONTROLS / ARENA MATCH TRACKER (Center Column) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center py-4">
            <span className="text-[11px] font-black tracking-widest text-[#f15bb5] uppercase block mb-1">
              🏆 {currentMatchup.stage}
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#f15bb5] to-transparent mb-4" />

            {/* Glowing Scoreboard */}
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="text-center">
                <span className="text-xs font-mono text-slate-500 block">{currentMatchup.teamA.code}</span>
                <span className={`text-5xl font-black font-mono tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}>{scoreA}</span>
              </div>
              
              <div className="flex flex-col items-center justify-center shrink-0">
                <div className="w-12 h-12 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center shadow-lg shadow-pink-500/10">
                  <span className="text-pink-500 text-sm font-black italic tracking-widest animate-pulse">VS</span>
                </div>
                {liveMinute > 0 && (
                  <span className="text-[10px] font-mono bg-red-500/10 text-red-500 px-2 py-0.5 rounded mt-2 border border-red-500/20 font-bold animate-pulse">
                    ⏱ {liveMinute}'
                  </span>
                )}
              </div>

              <div className="text-center">
                <span className="text-xs font-mono text-slate-500 block">{currentMatchup.teamB.code}</span>
                <span className={`text-5xl font-black font-mono tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}>{scoreB}</span>
              </div>
            </div>

            {/* Stadium Details */}
            <div className="mb-6">
              <span className={`text-xs font-bold block ${isLight ? "text-slate-800" : "text-slate-200"}`}>{currentMatchup.stadium}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">{currentMatchup.city}</span>
            </div>

            {/* Main Interactive Button Trigger */}
            <div className="w-full max-w-[220px] flex flex-col gap-2">
              <button
                onClick={handleSimulateMatch}
                disabled={isSimulating}
                className={`w-full py-2.5 rounded-xl text-xs font-black tracking-wider uppercase transition-all flex items-center justify-center gap-2 border shadow-lg ${
                  isSimulating
                    ? "bg-slate-900 text-slate-500 border-slate-800 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 border-emerald-400 shadow-emerald-500/20"
                }`}
              >
                {isSimulating ? (
                  <>
                    <Zap className="w-4 h-4 text-[#00f5d4] animate-spin" />
                    <span>SIMULATING LIVE...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-slate-950 fill-slate-950" />
                    <span>SIMULATE MATCH LIVE</span>
                  </>
                )}
              </button>

              <span className="text-[9px] text-slate-500 font-mono mt-1 block">
                {currentMatchup.kickoff}
              </span>
            </div>
          </div>

          {/* TEAM B STAR PLAYER CARD (Right Column) */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <PlayerCard 
              player={currentMatchup.teamB.player}
              teamCode={currentMatchup.teamB.code}
              teamName={currentMatchup.teamB.name}
              flag={currentMatchup.teamB.flag}
              theme={theme}
            />
          </div>

        </div>

        {/* PROGRESS BAR FOR ACTIVE SIMULATOR */}
        {isSimulating && (
          <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800 mt-2 z-10">
            <div 
              className="bg-gradient-to-r from-emerald-500 via-[#00f5d4] to-[#f15bb5] h-full transition-all duration-500"
              style={{ width: `${simulationProgress}%` }}
            />
          </div>
        )}

        {/* LIVE SIMULATION COMMENTARY FEED */}
        {simulationEvents.length > 0 && (
          <div className={`mt-4 rounded-xl border p-4 z-10 flex flex-col gap-3 transition-colors ${
            isLight ? "bg-slate-50 border-slate-200" : "bg-slate-950/60 border-slate-900"
          }`}>
            <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block animate-pulse"></span>
              LIVE SIMULATION EVENT STREAM
            </span>
            
            <div className="max-h-[140px] overflow-y-auto space-y-2.5 pr-2 scrollbar-thin">
              {simulationEvents.slice().reverse().map((event, idx) => {
                let badgeColor = "text-slate-400 bg-slate-900";
                if (event.type === "goal") badgeColor = "text-emerald-400 bg-emerald-500/15 font-bold";
                if (event.type === "yellow") badgeColor = "text-amber-400 bg-amber-500/15";
                
                return (
                  <div key={idx} className="flex items-start gap-3 text-xs leading-relaxed border-b border-slate-800/25 pb-2 last:border-0 last:pb-0 animate-fade-in">
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded shrink-0 font-bold ${badgeColor}`}>
                      {event.minute}'
                    </span>
                    <div className="flex-1">
                      <span className="text-slate-300">{event.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* EXTRA PREVIEW SPECS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 pt-4 border-t border-slate-800/10">
          <div className="text-center">
            <span className="text-[9px] text-slate-500 font-bold uppercase block font-mono">STADIUM CAP</span>
            <span className={`text-sm font-black block mt-0.5 ${isLight ? "text-slate-900" : "text-white"}`}>82,500</span>
          </div>
          <div className="text-center">
            <span className="text-[9px] text-slate-500 font-bold uppercase block font-mono">SECURITY CODES</span>
            <span className="text-emerald-400 text-xs font-black block mt-0.5 font-mono">FULLY CLEARED</span>
          </div>
          <div className="text-center">
            <span className="text-[9px] text-slate-500 font-bold uppercase block font-mono">TICKET STATUS</span>
            <span className="text-pink-500 text-xs font-black block mt-0.5 font-mono">SOLD OUT</span>
          </div>
          <div className="text-center">
            <span className="text-[9px] text-slate-500 font-bold uppercase block font-mono">WIFI ACCELERATION</span>
            <span className="text-[#00f5d4] text-xs font-black block mt-0.5 font-mono">ACTIVE (WiFi 7)</span>
          </div>
        </div>

      </div>
    </div>
  );
});

export default MatchupDashboard;
