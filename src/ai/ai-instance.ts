import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const resolvedApiKey =
  process.env.GEMINI_API_KEY ||
  process.env.GOOGLE_API_KEY ||
  process.env.GOOGLE_GENAI_API_KEY;

export const ai = genkit({
  promptDir: './prompts',
  plugins: [
    googleAI({
      apiKey: resolvedApiKey,
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
