import { z } from "zod";

export const decisionSchema = z.object({
	title: z
		.string()
		.min(10, "Describe the situation in more detail (min 10 chars)")
		.max(500, "Title is too long (max 500 chars). Use the reasoning field."),

	decision: z.string().min(5, "Decision is required (min 5 chars)").max(800, "Decision is too long (max 800 chars)"),

	reasoning: z.string().max(1500, "Reasoning is limited to 1500 characters to ensure concise analysis.").optional(),
});
