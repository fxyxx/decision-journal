"use server";

import { createClient } from "@/lib/supabase/server";
import { openai } from "@ai-sdk/openai";
import { generateText, Output } from "ai";
import { AnalysisSchema } from "@/lib/schemas/analysis";
import { systemPrompt } from "@/lib/promts/decisios-analysis";

export async function analyzeDecision(decisionId: string, userId: string) {
	const supabase = await createClient();

	const { data: decision } = await supabase
		.from("decisions")
		.select("title, decision, reasoning")
		.eq("id", decisionId)
		.eq("user_id", userId)
		.single();

	if (!decision) return;

	await supabase.from("decisions").update({ is_analyzing: true }).eq("id", decisionId);

	try {
		const { output: analysisResult } = await generateText({
			model: openai("gpt-5-nano"),
			system: systemPrompt,
			output: Output.object({ schema: AnalysisSchema }),
			prompt: `Situation: "${decision.title}", Decision: "${decision.decision}", Reasoning: "${decision.reasoning ?? ""}"`,
			maxOutputTokens: 5000,
		});

		await supabase.from("decisions").update({ analysis: analysisResult, is_analyzing: false }).eq("id", decisionId);
	} catch (error) {
		console.error("Background Analysis Failed:", error);
		await supabase.from("decisions").update({ is_analyzing: false }).eq("id", decisionId);
	}
}
