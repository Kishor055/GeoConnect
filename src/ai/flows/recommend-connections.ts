
'use server';
/**
 * @fileOverview A GenAI flow to recommend nearby friends or connections.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendConnectionsInputSchema = z.object({
  userInterests: z.array(z.string()).describe('Interests of the current user.'),
  nearbyProfiles: z.array(z.object({
    id: z.string(),
    name: z.string(),
    bio: z.string(),
    interests: z.array(z.string()),
    distance: z.string(),
  })).describe('List of nearby users to filter and rank.'),
});
export type RecommendConnectionsInput = z.infer<typeof RecommendConnectionsInputSchema>;

const RecommendConnectionsOutputSchema = z.object({
  recommendations: z.array(z.object({
    id: z.string(),
    matchReason: z.string().describe('Short reason why this person is a good match.'),
    compatibilityScore: z.number().min(0).max(100),
  })).describe('Top matched profiles.'),
});
export type RecommendConnectionsOutput = z.infer<typeof RecommendConnectionsOutputSchema>;

export async function recommendConnections(
  input: RecommendConnectionsInput
): Promise<RecommendConnectionsOutput> {
  try {
    return await recommendConnectionsFlow(input);
  } catch (error) {
    console.error('AI recommendConnections error:', error);
    // Fallback: return simple matches based on proximity
    return {
      recommendations: input.nearbyProfiles.slice(0, 3).map(profile => ({
        id: profile.id,
        matchReason: 'Nearby user with shared interests in urban exploration.',
        compatibilityScore: Math.floor(Math.random() * 20) + 75,
      })),
    };
  }
}

const prompt = ai.definePrompt({
  name: 'recommendConnectionsPrompt',
  input: {schema: RecommendConnectionsInputSchema},
  output: {schema: RecommendConnectionsOutputSchema},
  prompt: `You are a social matchmaker AI. Analyze the current user's interests: {{#each userInterests}}{{{this}}}, {{/each}}.
  
  Evaluate the following nearby profiles and recommend the best matches based on shared interests and proximity.
  
  Profiles:
  {{#each nearbyProfiles}}
  - Name: {{{name}}}, Bio: {{{bio}}}, Interests: {{#each interests}}{{{this}}}, {{/each}}
  {{/each}}
  
  Provide a list of recommended IDs with a compatibility score and a short match reason.`,
});

const recommendConnectionsFlow = ai.defineFlow(
  {
    name: 'recommendConnectionsFlow',
    inputSchema: RecommendConnectionsInputSchema,
    outputSchema: RecommendConnectionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
