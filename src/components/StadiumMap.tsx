import React from "react";
import { STADIUM_SECTORS } from "../data";

interface StadiumMapProps {
  activeSectorId: string | null;
  onSelectSector: (sectorId: string) => void;
  sectorStatuses: Record<string, "normal" | "warning" | "critical">;
  isScanning: boolean;
  theme?: "light" | "dark";
}

export default function StadiumMap({
  activeSectorId,
  onSelectSector,
  sectorStatuses,
  isScanning,
  theme = "dark",
}: StadiumMapProps) {
  // Color helper based on status
  const getStatusColor = (status: "normal" | "warning" | "critical", isSelected: boolean) => {
    if (status === "critical") {
      return isSelected ? "fill-red-500/40 stroke-red-500 stroke-2" : "fill-red-500/20 stroke-red-500/60";
    }
    if (status === "warning") {
      return isSelected ? "fill-amber-500/40 stroke-amber-500 stroke-2" : "fill-amber-500/20 stroke-amber-500/60";
    }
    if (theme === "light") {
      return isSelected ? "fill-emerald-500/20 stroke-emerald-500 stroke-2" : "fill-slate-100 stroke-slate-200";
    }
    return isSelected ? "fill-emerald-500/30 stroke-emerald-500 stroke-2" : "fill-slate-800/60 stroke-slate-700/50";
  };

  return (
    <div className={`relative w-full aspect-[4/3] max-h-[380px] rounded-xl border p-4 flex flex-col items-center justify-between overflow-hidden shadow-inner group hover:border-[#00f5d4]/20 transition-all duration-300 ${
      theme === "light" 
        ? "bg-slate-50/50 border-slate-200/80 shadow-sm" 
        : "bg-slate-950 border-slate-800/80"
    }`}>
      
      {/* Decorative Cyber HUD Corners */}
      <div className="absolute top-2 left-2 border-t-2 border-l-2 border-[#00f5d4]/40 w-3 h-3" />
      <div className="absolute top-2 right-2 border-t-2 border-r-2 border-[#00bbf9]/40 w-3 h-3" />
      <div className="absolute bottom-10 left-2 border-b-2 border-l-2 border-[#f15bb5]/40 w-3 h-3" />
      <div className="absolute bottom-10 right-2 border-b-2 border-r-2 border-[#fee440]/40 w-3 h-3" />

      {/* High-tech Radar Overlay during scan */}
      {isScanning && (
        <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none flex items-center justify-center">
          <div className="w-48 h-48 border border-emerald-500/20 rounded-full animate-ping" />
          <div className="absolute w-72 h-72 border border-emerald-500/10 rounded-full animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-emerald-500/10 to-transparent animate-scan" />
        </div>
      )}

      {/* SVG Stadium Map */}
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full max-h-[280px]"
        id="stadium-vector"
      >
        <defs>
          <radialGradient id="pitch-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.9" />
          </radialGradient>
          <filter id="glow-red">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="glow-amber">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Outer Plaza Loop (Parking & Transport access) */}
        <path
          d="M 50 150 A 150 110 0 1 1 350 150 A 150 110 0 1 1 50 150"
          className={`${getStatusColor(sectorStatuses.PlazaZone || "normal", activeSectorId === "PlazaZone")} cursor-pointer transition-all duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1`}
          onClick={() => onSelectSector("PlazaZone")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelectSector("PlazaZone");
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`Outer Plaza & Parking. Status: ${sectorStatuses.PlazaZone || "normal"}. Click to inspect.`}
          id="sector-PlazaZone"
        />

        {/* Mid Stand Concourse Ring */}
        <path
          d="M 80 150 A 120 85 0 1 1 320 150 A 120 85 0 1 1 80 150"
          className={`${getStatusColor(sectorStatuses.ConcourseLevel1 || "normal", activeSectorId === "ConcourseLevel1")} cursor-pointer transition-all duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1`}
          onClick={() => onSelectSector("ConcourseLevel1")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelectSector("ConcourseLevel1");
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`Main Concourse Level 1. Status: ${sectorStatuses.ConcourseLevel1 || "normal"}. Click to inspect.`}
          id="sector-ConcourseLevel1"
        />

        {/* 4 Major Seating Stands (Divided Sectors) */}
        {/* North Stand */}
        <path
          d="M 100 135 A 100 70 0 0 1 300 135 L 280 150 A 80 50 0 0 0 120 150 Z"
          className={`${getStatusColor(sectorStatuses.NorthStand || "normal", activeSectorId === "NorthStand")} cursor-pointer transition-all duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1`}
          onClick={() => onSelectSector("NorthStand")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelectSector("NorthStand");
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`North Stand (Gate A and B). Status: ${sectorStatuses.NorthStand || "normal"}. Click to inspect.`}
          id="sector-NorthStand"
        />

        {/* South Stand */}
        <path
          d="M 100 165 A 100 70 0 0 0 300 165 L 280 150 A 80 50 0 0 1 120 150 Z"
          className={`${getStatusColor(sectorStatuses.SouthStand || "normal", activeSectorId === "SouthStand")} cursor-pointer transition-all duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1`}
          onClick={() => onSelectSector("SouthStand")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelectSector("SouthStand");
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`South Stand (Gate E and F). Status: ${sectorStatuses.SouthStand || "normal"}. Click to inspect.`}
          id="sector-SouthStand"
        />

        {/* West Stand (Left Side) */}
        <path
          d="M 100 135 A 100 70 0 0 0 100 165 L 120 150 A 80 50 0 0 1 120 150 Z"
          className={`${getStatusColor(sectorStatuses.WestStand || "normal", activeSectorId === "WestStand")} cursor-pointer transition-all duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1`}
          onClick={() => onSelectSector("WestStand")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelectSector("WestStand");
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`West Stand (Gate G and H). Status: ${sectorStatuses.WestStand || "normal"}. Click to inspect.`}
          id="sector-WestStand"
        />

        {/* East Stand (Right Side) */}
        <path
          d="M 300 135 A 100 70 0 0 1 300 165 L 280 150 A 80 50 0 0 0 280 150 Z"
          className={`${getStatusColor(sectorStatuses.EastStand || "normal", activeSectorId === "EastStand")} cursor-pointer transition-all duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1`}
          onClick={() => onSelectSector("EastStand")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelectSector("EastStand");
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`East Stand (Gate C and D). Status: ${sectorStatuses.EastStand || "normal"}. Click to inspect.`}
          id="sector-EastStand"
        />

        {/* Premium Suites & Level 2 */}
        <path
          d="M 130 150 A 70 42 0 1 1 270 150 A 70 42 0 1 1 130 150"
          className={`${getStatusColor(sectorStatuses.SuitesLevel2 || "normal", activeSectorId === "SuitesLevel2")} cursor-pointer transition-all duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1`}
          onClick={() => onSelectSector("SuitesLevel2")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelectSector("SuitesLevel2");
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`Premium Suites Level 2. Status: ${sectorStatuses.SuitesLevel2 || "normal"}. Click to inspect.`}
          id="sector-SuitesLevel2"
        />

        {/* Pitch Area (Center) */}
        <ellipse
          cx="200"
          cy="150"
          rx="55"
          ry="30"
          className="fill-[url(#pitch-grad)] stroke-white/40 stroke-1 cursor-pointer hover:stroke-white/80 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-1"
          onClick={() => onSelectSector("PitchZone")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelectSector("PitchZone");
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`Pitch and Player Areas. Status: ${sectorStatuses.PitchZone || "normal"}. Click to inspect.`}
          id="sector-PitchZone"
        />
        
        {/* Pitch Lines */}
        <ellipse cx="200" cy="150" rx="20" ry="11" fill="none" stroke="white/30" strokeWidth="0.7" />
        <line x1="200" y1="120" x2="200" y2="180" stroke="white/30" strokeWidth="0.7" />
        <circle cx="200" cy="150" r="1.5" fill="white/50" />

        {/* Gate labels */}
        <text x="200" y="32" className="fill-slate-500 font-sans text-[7px] text-center" textAnchor="middle">GATE A / B (NORTH)</text>
        <text x="365" y="153" className="fill-slate-500 font-sans text-[7px]" textAnchor="start">GATE C / D (EAST)</text>
        <text x="200" y="275" className="fill-slate-500 font-sans text-[7px] text-center" textAnchor="middle">GATE E / F (SOUTH)</text>
        <text x="35" y="153" className="fill-slate-500 font-sans text-[7px]" textAnchor="end">GATE G / H (WEST)</text>

        {/* Status Indicators on top */}
        {Object.entries(sectorStatuses).map(([key, value]) => {
          if (value === "normal") return null;
          let cx = 200, cy = 150;
          if (key === "NorthStand") { cx = 200; cy = 95; }
          else if (key === "SouthStand") { cx = 200; cy = 205; }
          else if (key === "WestStand") { cx = 110; cy = 150; }
          else if (key === "EastStand") { cx = 290; cy = 150; }
          else if (key === "PlazaZone") { cx = 260; cy = 55; }
          else if (key === "ConcourseLevel1") { cx = 140; cy = 85; }
          else if (key === "SuitesLevel2") { cx = 175; cy = 135; }

          return (
            <g key={`indicator-${key}`} className="animate-bounce">
              <circle
                cx={cx}
                cy={cy}
                r="6"
                className={value === "critical" ? "fill-red-500" : "fill-amber-500"}
                filter={value === "critical" ? "url(#glow-red)" : "url(#glow-amber)"}
              />
              <circle
                cx={cx}
                cy={cy}
                r="10"
                className={`fill-none stroke-2 ${value === "critical" ? "stroke-red-500/60 animate-ping" : "stroke-amber-500/60 animate-ping"}`}
              />
              <path d={`M ${cx} ${cy - 5} L ${cx} ${cy - 12}`} className={value === "critical" ? "stroke-red-500 stroke-1" : "stroke-amber-500 stroke-1"} />
            </g>
          );
        })}
      </svg>

      <div className={`flex items-center justify-center gap-4 text-[10px] w-full pt-2 border-t ${
        theme === "light" ? "text-slate-600 border-slate-200" : "text-slate-400 border-slate-900/80"
      }`}>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 block"></span> Normal
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-500 block animate-pulse"></span> Warning
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500 block animate-ping"></span> Critical
        </span>
        <span className={`font-light ${theme === "light" ? "text-slate-300" : "text-slate-800"}`}>|</span>
        <span className={`font-mono ${theme === "light" ? "text-slate-500" : "text-slate-500"}`}>Click zones to inspect</span>
      </div>
    </div>
  );
}
