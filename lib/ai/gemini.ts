import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";

export const aiClient = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function generateJSONResponse<T>(
  prompt: string,
  systemInstruction?: string
): Promise<T | null> {
  if (!aiClient || !apiKey) {
    return null;
  }

  try {
    const response = await aiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) return null;

    return JSON.parse(text) as T;
  } catch (error) {
    console.warn("Gemini API call failed, falling back to structured reasoning:", error);
    return null;
  }
}
