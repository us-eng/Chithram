
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBackdropIdea = async (theme: string): Promise<string> => {
  try {
    const prompt = `Generate a creative and highly detailed photobooth backdrop description for an event with the theme: "${theme}". 
    Focus on specific visual elements, colors, textures, props, and lighting to create an immersive atmosphere. 
    The description should be vivid and inspiring, suitable for an image generation AI. Output only the description.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          temperature: 0.8,
          maxOutputTokens: 200,
          thinkingConfig: { thinkingBudget: 100 },
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating backdrop idea:", error);
    throw new Error("Failed to generate backdrop idea. Please try again.");
  }
};

export const generateBackdropImage = async (description: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: `A high-resolution, cinematic photograph of a photobooth backdrop. ${description}`,
        config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '4:3',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      return response.generatedImages[0].image.imageBytes;
    } else {
      throw new Error("No image was generated.");
    }
  } catch (error) {
    console.error("Error generating backdrop image:", error);
    throw new Error("Failed to generate backdrop image. Please try again.");
  }
};
