'use server';
/**
 * @fileOverview This file defines a Genkit flow for summarizing event descriptions.
 *
 * - summarizeEventDescription: A function that generates a concise summary for an event description.
 * - SummarizeEventDescriptionInput: The input type for the summarizeEventDescription function.
 * - SummarizeEventDescriptionOutput: The return type for the summarizeEventDescription function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SummarizeEventDescriptionInputSchema = z.object({
  description: z.string().describe('The full description of the event.'),
});
export type SummarizeEventDescriptionInput = z.infer<typeof SummarizeEventDescriptionInputSchema>;

const SummarizeEventDescriptionOutputSchema = z.object({
  summary: z.string().describe('A one-sentence summary of the event description.'),
});
export type SummarizeEventDescriptionOutput = z.infer<typeof SummarizeEventDescriptionOutputSchema>;

export async function summarizeEventDescription(input: SummarizeEventDescriptionInput): Promise<SummarizeEventDescriptionOutput> {
  return summarizeEventDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeEventDescriptionPrompt',
  input: { schema: SummarizeEventDescriptionInputSchema },
  output: { schema: SummarizeEventDescriptionOutputSchema },
  prompt: `You are an AI assistant that summarizes event descriptions. Provide a concise, one-sentence summary of the following event description. Focus on the main purpose and key details of the event. Event Description: 

{{{description}}}

Summary:`,
});

const summarizeEventDescriptionFlow = ai.defineFlow(
  {
    name: 'summarizeEventDescriptionFlow',
    inputSchema: SummarizeEventDescriptionInputSchema,
    outputSchema: SummarizeEventDescriptionOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
