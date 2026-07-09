import { useState, useEffect, useCallback } from "react";

export function useSpeechSynthesis(selectedModuleId: string, selectedScenario: any) {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [usingGeminiTTS, setUsingGeminiTTS] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSpeechAnalyzing, setIsSpeechAnalyzing] = useState(false);

  // Stop reading if tab or scenario changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingVoice(false);
  }, [selectedModuleId, selectedScenario]);

  const speakNative = useCallback((text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
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
  }, []);

  const handleToggleVoice = useCallback(async (analysisResult: any) => {
    if (!analysisResult) return;

    if (isPlayingVoice) {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingVoice(false);
      return;
    }

    if (usingGeminiTTS) {
      setIsSpeechAnalyzing(true);
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
        setIsSpeechAnalyzing(false);
      }
    } else {
      speakNative(analysisResult.speechTranscript);
    }
  }, [isPlayingVoice, usingGeminiTTS, speakNative]);

  return {
    isPlayingVoice,
    usingGeminiTTS,
    setUsingGeminiTTS,
    apiError,
    setApiError,
    isSpeechAnalyzing,
    handleToggleVoice,
  };
}

export default useSpeechSynthesis;
