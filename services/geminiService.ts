
import { GoogleGenAI } from "@google/genai";
import { Request } from '../types';

// FIX: Initialize GoogleGenAI directly with process.env.API_KEY per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRequestSummary = async (request: Request): Promise<string> => {
  const prompt = `
    You are an assistant for a hospital's emergency blood donation coordinator.
    Your task is to provide a very brief, clear, and professional summary of an active blood request for a dashboard.
    Do not use markdown formatting. Output a single-line summary.

    Request Details:
    - Blood Type Needed: ${request.requiredBloodType}
    - Urgency Level: ${request.urgencyLevel}
    - Time of Request: ${new Date(request.createdAt).toLocaleTimeString()}
    - Number of Donor Responses: ${request.responses.length}

    Generate a concise one-sentence summary of the current situation.
    Example: "High urgency request for ${request.requiredBloodType} blood has received ${request.responses.length} donor responses since ${new Date(request.createdAt).toLocaleTimeString()}."
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating summary with Gemini:", error);
    return "Could not generate summary.";
  }
};