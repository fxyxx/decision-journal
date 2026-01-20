"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { after } from "next/server";
import { analyzeDecision } from "@/actions/analyze-decision";
import { redirect } from "next/navigation";
import { decisionSchema } from "@/lib/schemas/decision";

export type DecisionState = {
	status: "idle" | "success" | "error";
	errors?: {
		title?: string[];
		decision?: string[];
		reasoning?: string[];
	};
	message?: string;
	decisionId?: string | number;
};

export async function createDecision(_: DecisionState, formData: FormData): Promise<DecisionState> {
	const supabase = await createClient();

	const rawData = {
		title: formData.get("title"),
		decision: formData.get("decision"),
		reasoning: formData.get("reasoning"),
	};

	const validated = decisionSchema.safeParse(rawData);

	if (!validated.success) {
		const errors = z.flattenError(validated.error).fieldErrors;

		return {
			status: "error",
			errors: errors,
			message: "Please check the form fields.",
		};
	}

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return { status: "error", message: "Unauthorized" };

	const { data: newDecision, error } = await supabase
		.from("decisions")
		.insert({
			user_id: user.id,
			title: validated.data.title,
			decision: validated.data.decision,
			reasoning: validated.data.reasoning || null,
		})
		.select("id")
		.single();

	if (error) {
		console.error("Supabase Error:", error);
		return {
			status: "error",
			message: "Failed to save the decision. Please try again later.",
		};
	}

	after(async () => {
		await analyzeDecision(newDecision.id, user.id);
	});

	redirect("/decisions");
}
