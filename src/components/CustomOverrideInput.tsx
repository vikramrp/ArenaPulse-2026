import React, { useState } from "react";
import { Send } from "lucide-react";
import { Scenario } from "../types";

interface CustomOverrideInputProps {
  selectedScenario: Scenario | null;
  isAnalyzing: boolean;
  onTriggerSimulation: (customMsg: string) => void;
}

export const CustomOverrideInput = React.memo(function CustomOverrideInput({
  selectedScenario,
  isAnalyzing,
  onTriggerSimulation,
}: CustomOverrideInputProps) {
  const [localMessage, setLocalMessage] = useState("");

  const handleSubmit = () => {
    if (!selectedScenario || isAnalyzing) return;
    onTriggerSimulation(localMessage);
    setLocalMessage("");
  };

  return (
    <div className="border-t border-slate-900 pt-4 flex flex-col gap-2">
      <label htmlFor="custom-incident-input" className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">
        Custom Incident Override
      </label>
      <div className="relative">
        <input
          id="custom-incident-input"
          type="text"
          placeholder="Type customized commands or ask a question to this module..."
          value={localMessage}
          onChange={(e) => setLocalMessage(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-emerald-500/40 pr-10"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={!selectedScenario || isAnalyzing}
          className="absolute right-2 top-2 p-1 text-slate-500 hover:text-emerald-400 disabled:opacity-30 transition-colors"
          aria-label="Submit custom override command"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
});

export default CustomOverrideInput;
