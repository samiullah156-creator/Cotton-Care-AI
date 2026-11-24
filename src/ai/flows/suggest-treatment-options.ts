// src/ai/flows/suggest-treatment-options.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting treatment options and preventative measures for cotton diseases.
 *
 * - suggestTreatmentOptions - A function that takes a disease summary and available pesticide products
 *   and returns suggested treatment options and preventative measures.
 * - SuggestTreatmentOptionsInput - The input type for the suggestTreatmentOptions function.
 * - SuggestTreatmentOptionsOutput - The return type for the suggestTreatmentOptions function.
 */

export type SuggestTreatmentOptionsInput = {
  disease:
    | 'Aphids'
    | 'Army worm'
    | 'Bacterial blight'
    | 'Cotton Boll Rot'
    | 'Green Cotton Boll'
    | 'Healthy'
    | 'Powdery mildew'
    | 'Target spot'
    | 'Unknown';
  availableProducts: Array<{ name: string; description: string }>;
};

export type SuggestTreatmentOptionsOutput = {
  treatmentOptions: string;
  preventativeMeasures: string;
};

export async function suggestTreatmentOptions(
  input: SuggestTreatmentOptionsInput
): Promise<SuggestTreatmentOptionsOutput> {
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
              content:
                'You are an agronomy assistant for cotton. Return actionable treatment and prevention guidance.',
            },
            {
              role: 'user',
              content: `Disease: ${input.disease}
Available products:
${input.availableProducts.map(p => `- ${p.name}: ${p.description}`).join('\n')}

Return exactly this format:
Treatment: <text>
Prevention: <text>`,
            },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content?.trim() ?? '';
        const treatmentMatch = content.match(/Treatment:\s*([\s\S]*?)(?:\nPrevention:|$)/i);
        const preventionMatch = content.match(/Prevention:\s*([\s\S]*)$/i);

        return {
          treatmentOptions:
            treatmentMatch?.[1]?.trim() ||
            'Apply disease-targeted treatment based on local agronomy guidance and product labels.',
          preventativeMeasures:
            preventionMatch?.[1]?.trim() ||
            'Maintain sanitation, monitor weekly, and use balanced irrigation and nutrition.',
        };
      }
    }

    if (geminiKey) {
      const prompt = `You are an agronomy assistant for cotton.
Disease: ${input.disease}
Available products:
${input.availableProducts.map(p => `- ${p.name}: ${p.description}`).join('\n')}

Return exactly this format:
Treatment: <text>
Prevention: <text>`;

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
        const content = data?.candidates?.[0]?.content?.parts?.map((p: {text?: string}) => p.text ?? '').join('').trim() ?? '';
        const treatmentMatch = content.match(/Treatment:\s*([\s\S]*?)(?:\nPrevention:|$)/i);
        const preventionMatch = content.match(/Prevention:\s*([\s\S]*)$/i);
        return {
          treatmentOptions:
            treatmentMatch?.[1]?.trim() ||
            'Apply disease-targeted treatment based on local agronomy guidance and product labels.',
          preventativeMeasures:
            preventionMatch?.[1]?.trim() ||
            'Maintain sanitation, monitor weekly, and use balanced irrigation and nutrition.',
        };
      }
    }
  } catch (error: any) {
    const message = typeof error?.message === 'string' ? error.message : '';
    const isRateIssue = message.includes('429') || message.toLowerCase().includes('too many requests');

    if (isRateIssue) {
      const productNames = input.availableProducts.map(p => p.name).join(', ');
      return {
        treatmentOptions: productNames
          ? `AI treatment generation is unavailable due to quota limits. Start with available products: ${productNames}. Follow product label dosage and local agronomy guidance.`
          : 'AI treatment generation is unavailable due to rate limits. Use a disease-specific fungicide/insecticide based on local agronomy recommendations.',
        preventativeMeasures:
          'Use clean seeds, rotate crops, avoid overhead irrigation late in the day, maintain field sanitation, and scout regularly to catch early symptoms.',
      };
    }

    return {
      treatmentOptions:
        'Could not generate AI treatment now. Apply a disease-specific treatment from your local agronomy recommendation.',
      preventativeMeasures:
        'Keep field hygiene strong, monitor crops frequently, and prevent standing moisture on foliage.',
    };
  }

  return {
    treatmentOptions:
      'Use a disease-specific product from your catalog and follow label dosage and local agronomy guidance.',
    preventativeMeasures:
      'Use clean seeds, rotate crops, remove infected debris, and inspect fields weekly.',
  };
}
