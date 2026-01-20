import { z } from "zod";
import { COGNITIVE_BIASES, DECISIONS_CATEGORIES } from "../constants";

export const AnalysisSchema = z.object({
	categories: z.array(z.enum(DECISIONS_CATEGORIES)).describe("Decision category"),
	score: z.number().min(1).max(10).describe("Rationality score from 1 to 10"),
	biases: z.array(z.enum(COGNITIVE_BIASES)).describe("List of potential cognitive biases identified"),
	summary: z.string().describe("Brief conclusion and advice in 2-3 sentences"),
	alternatives: z.array(z.string()).describe("3 alternative courses of action that could have been considered"),
});

export type AnalysisResult = z.infer<typeof AnalysisSchema>;
