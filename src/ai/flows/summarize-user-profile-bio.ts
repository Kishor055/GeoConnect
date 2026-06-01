'use server';

/**
 * @fileOverview A GenAI flow to summarize user profile bios.
 *
 * - summarizeUserProfileBio - A function that summarizes a user's bio.
 * - SummarizeUserProfileBioInput - The input type for the summarizeUserProfileBio function.
 * - SummarizeUserProfileBioOutput - The return type for the summarizeUserProfileBio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeUserProfileBioInputSchema = z.object({
  bio: z.string().describe('The user profile bio to summarize.'),
});
export type SummarizeUserProfileBioInput = z.infer<typeof SummarizeUserProfileBioInputSchema>;

const SummarizeUserProfileBioOutputSchema = z.object({
  summary: z.string().describe('A concise, one-sentence summary of the user profile bio.'),
});
export type SummarizeUserProfileBioOutput = z.infer<typeof SummarizeUserProfileBioOutputSchema>;

export async function summarizeUserProfileBio(
  input: SummarizeUserProfileBioInput
): Promise<SummarizeUserProfileBioOutput> {
  return summarizeUserProfileBioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeUserProfileBioPrompt',
  input: {schema: SummarizeUserProfileBioInputSchema},
  output: {schema: SummarizeUserProfileBioOutputSchema},
  prompt: 'Summarize the following user bio into a single, concise sentence: {{{bio}}}',
});

const summarizeUserProfileBioFlow = ai.defineFlow(
  {
    name: 'summarizeUserProfileBioFlow',
    inputSchema: SummarizeUserProfileBioInputSchema,
    outputSchema: SummarizeUserProfileBioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
