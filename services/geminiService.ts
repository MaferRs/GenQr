import { GoogleGenAI } from "@google/genai";

// Initialize the client
// The API key is injected automatically via process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Uses Gemini to format natural language into specific QR code data formats
 * (e.g., WIFI strings, vCards, mailto links).
 */
export const generateQRDataFromPrompt = async (userPrompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: `You are a helpful assistant for a QR Code Generator app. 
        Your task is to convert natural language descriptions into standard QR code payload strings. 
        
        Examples:
        - Input: "Wifi network named HomeGuest with password 12345"
          Output: WIFI:T:WPA;S:HomeGuest;P:12345;;
        - Input: "Contact card for John Doe, phone 555-0199, email john@example.com"
          Output: BEGIN:VCARD\nVERSION:3.0\nN:Doe;John;;;\nFN:John Doe\nTEL;TYPE=CELL:555-0199\nEMAIL:john@example.com\nEND:VCARD
        - Input: "Send an email to support@test.com with subject Help"
          Output: mailto:support@test.com?subject=Help
        - Input: "Go to youtube.com"
          Output: https://youtube.com
        
        Rules:
        1. Return ONLY the raw string payload. 
        2. Do not include markdown formatting (no backticks).
        3. Do not include explanations.
        4. If the input is just a URL or simple text, return it as is but ensure URLs have protocols (https://) if missing.`,
        temperature: 0.1, // Low temperature for deterministic formatting
      },
    });

    return response.text?.trim() || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate content. Please try again.");
  }
};