import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY, 
    baseURL: process.env.OPENAI_BASE_URL,
});

export const model = openai;

export default openai;