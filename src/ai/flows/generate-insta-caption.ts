'use server';
/**
 * @fileOverview A GenAI flow to generate Instagram-optimized captions and hashtags.
 *
 * - generateInstaCaption - A function that creates engaging social media captions.
 * - InstaCaptionInput - The input type (post content/description).
 * - InstaCaptionOutput - The return type (caption + hashtags).
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const InstaCaptionInputSchema = z.object({
  description: z.string().describe('What is happening in the photo or post.'),
  mood: z.enum(['witty', 'aesthetic', 'minimalist', 'adventurous', 'professional']).default('aesthetic'),
});
export type InstaCaptionInput = z.infer<typeof InstaCaptionInputSchema>;

const InstaCaptionOutputSchema = z.object({
  caption: z.string().describe('The generated Instagram caption.'),
  hashtags: z.array(z.string()).describe('A list of relevant hashtags.'),
});
export type InstaCaptionOutput = z.infer<typeof InstaCaptionOutputSchema>;

export async function generateInstaCaption(input: InstaCaptionInput): Promise<InstaCaptionOutput> {
  return generateInstaCaptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInstaCaptionPrompt',
  input: { schema: InstaCaptionInputSchema },
  output: { schema: InstaCaptionOutputSchema },
  prompt: `You are a social media expert. Create a high-engagement Instagram caption for the following post description.
  
  Description: {{{description}}}
  Mood: {{{mood}}}
  
  Include a punchy first line, a relevant emoji, and 5-10 trending hashtags.`,
});

const generateInstaCaptionFlow = ai.defineFlow(
  {
    name: 'generateInstaCaptionFlow',
    inputSchema: InstaCaptionInputSchema,
    outputSchema: InstaCaptionOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
