import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import helmet from "helmet";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy initialize Gemini client to prevent crashing if environment key is not immediately available
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured. Please configure it in Settings > Secrets.");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  };

// API endpoint for analyzing scenarios
  app.use(helmet({
    contentSecurityPolicy: false, // Turn off CSP to ensure local Vite proxy assets load perfectly
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
    frameguard: false, // Crucial: allows rendering inside the AI Studio preview iframe
  }));

  // Simple, robust server-side input sanitization and validation helper
  const sanitizeInput = (text: string): string => {
    if (typeof text !== "string") return "";
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  };

  const validateStringInput = (
    input: any,
    maxLength: number,
    fieldName: string,
    required = true
  ): { isValid: boolean; error?: string } => {
    if (input === undefined || input === null) {
      if (required) {
        return { isValid: false, error: `${fieldName} is required.` };
      }
      return { isValid: true };
    }
    if (typeof input !== "string") {
      return { isValid: false, error: `${fieldName} must be a string.` };
    }
    if (required && input.trim().length === 0) {
      return { isValid: false, error: `${fieldName} cannot be empty.` };
    }
    if (input.length > maxLength) {
      return { isValid: false, error: `${fieldName} exceeds maximum length of ${maxLength} characters.` };
    }
    return { isValid: true };
  };

  app.post("/api/arena-pulse/analyze", async (req, res) => {
    try {
      const { moduleName, scenario, userMessage } = req.body;

      // 1. INPUT VALIDATION
      const moduleCheck = validateStringInput(moduleName, 100, "moduleName");
      if (!moduleCheck.isValid) {
        return res.status(400).json({ error: moduleCheck.error });
      }

      const scenarioCheck = validateStringInput(scenario, 300, "scenario");
      if (!scenarioCheck.isValid) {
        return res.status(400).json({ error: scenarioCheck.error });
      }

      const messageCheck = validateStringInput(userMessage, 500, "userMessage", false);
      if (!messageCheck.isValid) {
        return res.status(400).json({ error: messageCheck.error });
      }

      // 2. INPUT SANITIZATION
      const cleanModuleName = sanitizeInput(moduleName);
      const cleanScenario = sanitizeInput(scenario);
      const cleanUserMessage = userMessage ? sanitizeInput(userMessage) : "";

      const ai = getGeminiClient();

      const systemInstruction = `
You are the central artificial intelligence engine of "ArenaPulse AI" — an advanced operational command center for FIFA World Cup 2026 stadium management.
Your role is to analyze a stadium operational incident in detail, predict bottlenecks, and propose immediate, highly effective, and innovative solutions.

Evaluate the incident for the target operations module: "${cleanModuleName}".
If the user provides custom guidance or a specific follow-up question ("${cleanUserMessage}"), you must directly address it while delivering the operational structure.

You MUST respond strictly with a valid JSON object matching the following structure:
{
  "status": "normal" | "warning" | "critical",
  "analysis": "A detailed 2-3 sentence analysis of the stadium state, identifying root risks, safety/traffic impacts, and predictions.",
  "actions": [
    "Immediate action item 1 (e.g. dispatch physical security, update digital signs)",
    "Immediate action item 2 (e.g. activate transport reserves, alert volunteers)",
    "Immediate action item 3 (e.g. carbon impact mitigation, route optimization)",
    "Immediate action item 4 (e.g. accessibility escort dispatch, verbal notice)"
  ],
  "estimatedImpact": "A concise statement summarizing the expected results of the actions (e.g. Redirection avoids gridlock, reducing exit clearance by 12 minutes).",
  "sustainabilityCheck": "Specific sustainable practice or eco-routing integration triggered (e.g. optimized waste capture, electric shuttle dispatch, energy conservation).",
  "speechTranscript": "A professional, direct verbal announcement transcript that stadium announcers or volunteers can broadcast over local speakers or handheld mega-phones to address this specific scenario."
}
`;

      const contents = `
Module Context: ${cleanModuleName}
Active Incident Scenario: ${cleanScenario}
User Additional Context/Question: ${cleanUserMessage || "None provided"}

Generate the JSON analysis. Be realistic, highly technical, and incorporate references to stadium infrastructure (e.g., SoFi Stadium, MetLife Stadium, Estadio Azteca) and FIFA tournament requirements.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const responseText = response.text || "{}";
      res.setHeader("Content-Type", "application/json");
      res.send(responseText);
    } catch (error: any) {
      console.error("Gemini analysis error:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // API endpoint for high quality Google Text-to-Speech (optional feature for users with keys)
  app.post("/api/arena-pulse/tts", async (req, res) => {
    try {
      const { text } = req.body;
      
      // 1. INPUT VALIDATION
      const textCheck = validateStringInput(text, 1000, "text");
      if (!textCheck.isValid) {
        return res.status(400).json({ error: textCheck.error });
      }

      // 2. INPUT SANITIZATION
      const cleanText = sanitizeInput(text);

      const ai = getGeminiClient();

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: `Say with clear, professional authority: ${cleanText}` }] }],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        res.json({ audio: base64Audio });
      } else {
        res.status(400).json({ error: "TTS audio content was not returned from the model." });
      }
    } catch (error: any) {
      console.error("Gemini TTS error:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // Vite middleware for development, static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ArenaPulse AI Backend running on port ${PORT}`);
  });
}

startServer();
