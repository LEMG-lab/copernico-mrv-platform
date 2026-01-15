// Gemini AI Service for LarvaLINK Data Room
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;

const getGenAI = () => {
    if (!genAI && API_KEY) {
        genAI = new GoogleGenerativeAI(API_KEY);
    }
    return genAI;
};

export interface ChatMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}

export const sendMessageToGemini = async (
    systemPrompt: string,
    chatHistory: ChatMessage[],
    userMessage: string
): Promise<string> => {
    const ai = getGenAI();

    if (!ai) {
        throw new Error('Gemini API key not configured. Add VITE_GEMINI_API_KEY to your .env.local file.');
    }

    try {
        const model = ai.getGenerativeModel({
            model: 'gemini-2.0-flash',
            systemInstruction: systemPrompt
        });

        const chat = model.startChat({
            history: chatHistory,
            generationConfig: {
                maxOutputTokens: 2048,
                temperature: 0.7,
            },
        });

        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini API error:', error);
        if (error instanceof Error) {
            if (error.message.includes('API_KEY')) {
                throw new Error('API key inválida. Verifica tu VITE_GEMINI_API_KEY.');
            }
            if (error.message.includes('quota')) {
                throw new Error('Límite de uso alcanzado. Intenta más tarde.');
            }
            throw new Error(`Error de Gemini: ${error.message}`);
        }
        throw new Error('Error desconocido al conectar con Gemini.');
    }
};

export const isGeminiConfigured = (): boolean => {
    return !!API_KEY;
};
