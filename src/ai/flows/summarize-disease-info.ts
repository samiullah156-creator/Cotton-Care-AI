// SummarizeDiseaseInfo story
'use server';

/**
 * @fileOverview Summarizes information about a detected cotton disease.
 *
 * - summarizeDiseaseInfo - A function that summarizes information about a detected cotton disease.
 * - SummarizeDiseaseInfoInput - The input type for the summarizeDiseaseInfo function.
 * - SummarizeDiseaseInfoOutput - The return type for the summarizeDiseaseInfo function.
 */

export type SummarizeDiseaseInfoInput = {
  disease: string;
};

export type SummarizeDiseaseInfoOutput = {
  summary: string;
};

export async function summarizeDiseaseInfo(input: SummarizeDiseaseInfoInput): Promise<SummarizeDiseaseInfoOutput> {
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
              content: 'You are an expert in cotton crop diseases. Reply concisely and practically.',
            },
            {
              role: 'user',
              content: `Summarize this cotton disease in 4-6 sentences with causes and likely impact: ${input.disease}`,
            },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const summary = data?.choices?.[0]?.message?.content?.trim();
        if (summary) {
          return {summary};
        }
      }
    }

    if (geminiKey) {
      const prompt = `You are an expert in cotton crop diseases. Summarize this disease in 4-6 concise sentences with causes and likely crop impact: ${input.disease}`;
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
        const summary = data?.candidates?.[0]?.content?.parts?.map((p: {text?: string}) => p.text ?? '').join('').trim();
        if (summary) {
          return {summary};
        }
      }
    }
  } catch (error: any) {
    const message = typeof error?.message === 'string' ? error.message : '';
    const isRateOrQuotaIssue = message.includes('429') || message.toLowerCase().includes('too many requests');
    if (isRateOrQuotaIssue) {
      return {
        summary: `AI summary is temporarily unavailable due to rate limits. ${input.disease} can reduce cotton yield if unmanaged; monitor spread, remove heavily affected plant parts, and apply recommended control measures promptly.`,
      };
    }
    return {
      summary: `Could not generate AI summary right now. ${input.disease} can affect cotton growth and yield if not treated early.`,
    };
  }

  return {
    summary: `${input.disease} can reduce cotton yield if unmanaged; monitor spread, remove heavily affected plant parts, and apply recommended control measures promptly.`,
  };
}
