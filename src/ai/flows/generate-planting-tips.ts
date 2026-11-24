// src/ai/flows/generate-planting-tips.ts
'use server';

/**
 * @fileOverview Generates planting tips for healthy cotton plants using GenAI.
 *
 * - generatePlantingTips - A function that generates planting tips.
 * - GeneratePlantingTipsInput - The input type for the generatePlantingTips function.
 * - GeneratePlantingTipsOutput - The return type for the generatePlantingTips function.
 */

export type GeneratePlantingTipsInput = {
  disease: 'Healthy';
};

export type GeneratePlantingTipsOutput = {
  plantingTips: string;
};

export async function generatePlantingTips(input: GeneratePlantingTipsInput): Promise<GeneratePlantingTipsOutput> {
  const geminiKey =
    process.env.BACKUP_GEMINI_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_GENAI_API_KEY;

  try {
    const token = process.env.HF_TOKEN;
    if (token) {
      const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'moonshotai/Kimi-K2-Instruct-0905',
          messages: [
            {
              role: 'system',
              content: 'You are an expert in cotton crop management. Reply with practical farming advice.',
            },
            {
              role: 'user',
              content: `The detected plant is ${input.disease}. Give concise planting and maintenance tips to keep cotton healthy and prevent disease.`,
            },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const plantingTips = data?.choices?.[0]?.message?.content?.trim();
        if (plantingTips) {
          return {plantingTips};
        }
      }
    }

    if (geminiKey) {
      const prompt = `You are an expert in cotton crop management. The detected plant is ${input.disease}. Give concise planting and maintenance tips to keep cotton healthy and prevent disease.`;
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            contents: [{parts: [{text: prompt}]}],
          }),
        }
      );

      if (geminiResponse.ok) {
        const data = await geminiResponse.json();
        const plantingTips = data?.candidates?.[0]?.content?.parts?.map((p: {text?: string}) => p.text ?? '').join('').trim();
        if (plantingTips) {
          return {plantingTips};
        }
      }
    }
  } catch (error: any) {
    const message = typeof error?.message === 'string' ? error.message : '';
    const isRateIssue = message.includes('429') || message.toLowerCase().includes('too many requests');

    if (isRateIssue) {
      return {
        plantingTips: 'AI planting tips are temporarily unavailable due to rate limits. Keep spacing adequate for airflow, irrigate early morning, use balanced fertilizer, scout weekly, and remove infected debris quickly.',
      };
    }

    return {
      plantingTips:
        'Could not generate AI tips right now. Keep irrigation balanced, optimize airflow, and continue regular crop scouting.',
    };
  }

  return {
    plantingTips:
      'Keep plant spacing adequate, irrigate in the morning, maintain balanced nutrients, and monitor weekly for early symptoms.',
  };
}
