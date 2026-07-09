import React from "react";
import { LogEntry, ModuleId } from "../types";
import { Activity, Leaf, Clock, Users, ShieldAlert, Trash } from "lucide-react";

interface MetricsPanelProps {
  logs: LogEntry[];
  onClearLogs: () => void;
  carbonSaved: number;
  averageWaitTime: number;
  staffEfficiency: number;
  emergencyResponseTime: number;
  theme?: "light" | "dark";
}

export default function MetricsPanel({
  logs,
  onClearLogs,
  carbonSaved,
  averageWaitTime,
  staffEfficiency,
  emergencyResponseTime,
  theme = "dark",
}: MetricsPanelProps) {
  // Get active risk index based on current logs
  const getActiveRiskLevel = () => {
    const criticalLogs = logs.filter((l) => l.status === "critical");
    const warningLogs = logs.filter((l) => l.status === "warning");
    if (criticalLogs.length > 0) return { label: "CRITICAL", color: "text-red-500 border-red-500/30 bg-red-500/10 animate-pulse" };
    if (warningLogs.length > 0) return { label: "WARNING", color: "text-amber-500 border-amber-500/30 bg-amber-500/10" };
    return { label: "STABLE", color: theme === "light" ? "text-emerald-600 border-emerald-500/20 bg-emerald-50" : "text-[#00f5d4] border-[#00f5d4]/20 bg-[#00f5d4]/5" };
  };

  const riskLevel = getActiveRiskLevel();

  const cardBaseClass = theme === "light" 
    ? "bg-white border-slate-200/90 shadow-sm text-slate-800" 
    : "bg-slate-900/60 backdrop-blur-md border-slate-800/80 text-white";

  const subTextClass = theme === "light" ? "text-slate-500" : "text-slate-400";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
      {/* 4 Dials / Metrics Grid */}
      <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Carbon Saved */}
        <div className={`${cardBaseClass} p-4 rounded-xl border flex flex-col justify-between relative overflow-hidden group hover:border-[#00f5d4]/30 transition-all duration-300`}>
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00f5d4] to-emerald-500" />
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${theme === "light" ? "text-slate-500" : "text-slate-400"}`}>Carbon Saved</span>
            <Leaf className="w-4 h-4 text-[#00f5d4] animate-bounce" style={{ animationDuration: '3s' }} />
          </div>
          <div className="mt-2">
            <span className={`text-2xl font-black font-mono tracking-tight ${theme === "light" ? "text-slate-900" : "text-white"}`}>{carbonSaved.toFixed(1)}</span>
            <span className="text-slate-400 text-xs ml-1">kg CO2</span>
          </div>
          <div className="text-[9px] text-[#00f5d4] mt-2 font-mono flex items-center gap-1">
            <span>⚡ +4.2kg/action</span>
          </div>
        </div>

        {/* Avg Restroom/Food Wait */}
        <div className={`${cardBaseClass} p-4 rounded-xl border flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/30 transition-all duration-300`}>
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-500 to-[#fee440]" />
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${theme === "light" ? "text-slate-500" : "text-slate-400"}`}>Avg Wait Time</span>
            <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
          </div>
          <div className="mt-2">
            <span className={`text-2xl font-black font-mono tracking-tight ${theme === "light" ? "text-slate-900" : "text-white"}`}>{averageWaitTime}</span>
            <span className="text-slate-400 text-xs ml-1">mins</span>
          </div>
          <div className="text-[9px] text-amber-500 mt-2 font-mono">🕒 Target Wait &lt; 10m</div>
        </div>

        {/* Staff Efficiency */}
        <div className={`${cardBaseClass} p-4 rounded-xl border flex flex-col justify-between relative overflow-hidden group hover:border-[#9b5de5]/30 transition-all duration-300`}>
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#9b5de5] to-[#f15bb5]" />
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${theme === "light" ? "text-slate-500" : "text-slate-400"}`}>Volunteer Efficiency</span>
            <Users className="w-4 h-4 text-[#f15bb5]" />
          </div>
          <div className="mt-2">
            <span className={`text-2xl font-black font-mono tracking-tight ${theme === "light" ? "text-slate-900" : "text-white"}`}>{staffEfficiency}%</span>
          </div>
          <div className="text-[9px] text-[#f15bb5] mt-2 font-mono">📈 Optimal volunteer shifts</div>
        </div>

        {/* Emergency Response Time */}
        <div className={`${cardBaseClass} p-4 rounded-xl border flex flex-col justify-between relative overflow-hidden group hover:border-red-500/30 transition-all duration-300`}>
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-500 to-[#f15bb5]" />
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${theme === "light" ? "text-slate-500" : "text-slate-400"}`}>Emergency Response</span>
            <ShieldAlert className="w-4 h-4 text-red-400 animate-bounce" />
          </div>
          <div className="mt-2">
            <span className={`text-2xl font-black font-mono tracking-tight ${theme === "light" ? "text-slate-900" : "text-white"}`}>{emergencyResponseTime}</span>
            <span className="text-slate-400 text-xs ml-1">secs</span>
          </div>
          <div className="text-[9px] text-red-400 mt-2 font-mono">🚒 Target Response &lt; 180s</div>
        </div>
      </div>

      {/* Stadium Security Index - Beautifully styled as sports broadcast card */}
      <div className={`${cardBaseClass} p-4 rounded-xl border flex items-center justify-between relative overflow-hidden group hover:border-[#00bbf9]/40 transition-all duration-300`}>
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00bbf9] to-[#9b5de5]" />
        <div className="flex flex-col">
          <span className={`text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 ${theme === "light" ? "text-slate-500" : "text-slate-400"}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00bbf9] inline-block animate-ping"></span>
            STADIUM SECURITY RISK INDEX
          </span>
          <span className={`text-[11px] mt-1 font-sans ${theme === "light" ? "text-slate-600" : "text-slate-400"}`}>Active host telemetry health metric</span>
        </div>
        <div className={`px-4 py-2 border rounded-xl text-xs font-black tracking-widest font-mono shadow-md ${riskLevel.color}`}>
          {riskLevel.label}
        </div>
      </div>

      {/* Live System Logging Stream */}
      <div className={`lg:col-span-3 rounded-xl border p-4 flex flex-col gap-3 relative overflow-hidden ${
        theme === "light" ? "bg-white border-slate-200 shadow-sm" : "bg-slate-900/40 backdrop-blur-md border-slate-800/60"
      }`}>
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-emerald-500 via-[#00f5d4] to-transparent opacity-60" />
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
          <span className={`text-xs font-bold tracking-wider flex items-center gap-1 ${theme === "light" ? "text-slate-800" : "text-white"}`}>
            <Activity className="w-3.5 h-3.5 text-[#00f5d4] animate-pulse" /> LIVE TELEMETRY COMMAND FEEDS
          </span>
          {logs.length > 0 && (
            <button
              onClick={onClearLogs}
              className="text-slate-500 hover:text-red-400 transition-all text-[10px] flex items-center gap-1 uppercase font-mono"
            >
              <Trash className="w-3 h-3" /> Clear stream
            </button>
          )}
        </div>

        <div className={`rounded-lg p-3 border h-32 overflow-y-auto font-mono text-[10px] space-y-2 scrollbar-thin ${
          theme === "light" ? "bg-slate-50 border-slate-200 text-slate-800" : "bg-slate-950/80 border-slate-900 text-slate-300"
        }`}>
          {logs.length === 0 ? (
            <div className="text-slate-600 text-center py-8">
              No simulation logs. Trigger incidents to feed the ArenaPulse real-time analytics core.
            </div>
          ) : (
            logs.map((log) => {
              let tagColor = "text-[#00f5d4] bg-[#00f5d4]/10";
              if (log.status === "warning") tagColor = "text-amber-400 bg-amber-500/10";
              if (log.status === "critical") tagColor = "text-red-400 bg-red-500/10";

              return (
                <div key={log.id} className={`flex items-start gap-2 py-1.5 border-b last:border-0 px-1 rounded transition-colors ${
                  theme === "light" ? "border-slate-100 hover:bg-slate-100/50" : "border-slate-900 hover:bg-slate-900/40"
                }`}>
                  <span className="text-slate-500 shrink-0">{log.timestamp}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] uppercase font-bold shrink-0 ${tagColor}`}>
                    {log.moduleId}
                  </span>
                  <span className={`font-bold shrink-0 ${theme === "light" ? "text-slate-700" : "text-slate-300"}`}>[{log.scenarioTitle}]:</span>
                  <span className={`leading-relaxed ${theme === "light" ? "text-slate-600" : "text-slate-400"}`}>{log.analysis}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
