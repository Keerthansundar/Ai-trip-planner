import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-pro-exp-03-25',
});

const chat = model.startChat({
  generationConfig: {
    responseMimeType: 'application/json',
  },
});

const sendMessage = async (prompt) => {
  return await chat.sendMessage(prompt);
};

// 👇 Export this like a helper object so you can use it in onGenerateTrip
export const chatSessions = {
  sendMessage,
};
