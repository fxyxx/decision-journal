"use client";

import { createDecision, DecisionState } from "@/actions/decisions";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { useActionState, useState, useCallback } from "react";
import { Loader2, Plus, Target, Brain, AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useFieldErrors } from "@/hooks/useFieldErrors";

const initialState: DecisionState = {
	status: "idle",
	message: "",
};

type FieldName = "title" | "decision" | "reasoning";

export function CreateDecisionForm() {
	const [state, formAction, isPending] = useActionState(createDecision, initialState);
	const [formKey, setFormKey] = useState(0);
	const [values, setValues] = useState({ title: "", decision: "", reasoning: "" });

	const { getFieldError, markFieldEdited, resetErrors } = useFieldErrors(state.errors);

	const handleChange = useCallback(
		(name: FieldName, value: string) => {
			setValues((prev) => ({ ...prev, [name]: value }));
			markFieldEdited(name);
		},
		[markFieldEdited],
	);

	const handleReset = useCallback(() => {
		setValues({ title: "", decision: "", reasoning: "" });
		setFormKey((k) => k + 1);
		resetErrors();
	}, [resetErrors]);

	const isSuccess = state.status === "success";

	const titleError = getFieldError("title");
	const decisionError = getFieldError("decision");

	return (
		<form key={formKey} action={formAction} className="space-y-8">
			{state?.message && state.message !== "Success" && (
				<Alert
					variant="destructive"
					className="flex items-start gap-3 border-red-200 bg-red-50 text-red-900 animate-in fade-in slide-in-from-top-2"
				>
					<AlertCircle className="h-5 w-5 mt-0.5 shrink-0 text-red-600" />
					<div className="grid gap-1">
						<AlertTitle className="mb-0 font-medium leading-none tracking-tight text-red-900">
							Error
						</AlertTitle>
						<AlertDescription className="text-sm text-red-800">{state.message}</AlertDescription>
					</div>
				</Alert>
			)}

			{isSuccess && (
				<Alert className="flex items-start gap-3 border-green-200 bg-green-50 text-green-900 animate-in fade-in slide-in-from-top-2">
					<CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-green-600" />
					<div className="grid gap-1">
						<AlertTitle className="mb-0 font-medium leading-none tracking-tight text-green-900">
							Success
						</AlertTitle>
						<AlertDescription className="text-sm text-green-800">
							Decision recorded successfully.{" "}
							<button
								type="button"
								onClick={handleReset}
								className="underline font-medium hover:no-underline"
							>
								Add another
							</button>
						</AlertDescription>
					</div>
				</Alert>
			)}

			<div className="grid gap-6">
				<FormField
					id="title"
					label="Situation"
					icon={<Target className="w-4 h-4 text-primary" />}
					value={values.title}
					onChange={(value) => handleChange("title", value)}
					placeholder="E.g., Buying a new laptop..."
					hint="Brief context of the situation (minimum 10 characters)."
					error={titleError}
					disabled={isPending || isSuccess}
					minHeight="80px"
					maxHeight="200px"
				/>

				<FormField
					id="decision"
					label="Decision Made"
					icon={<CheckCircle2 className="w-4 h-4 text-primary" />}
					value={values.decision}
					onChange={(value) => handleChange("decision", value)}
					placeholder="What decision did you make?"
					error={decisionError}
					disabled={isPending || isSuccess}
					minHeight="120px"
					maxHeight="300px"
				/>

				<FormField
					id="reasoning"
					label="Why? (Reasoning)"
					icon={<Brain className="w-4 h-4 text-primary" />}
					value={values.reasoning}
					onChange={(value) => handleChange("reasoning", value)}
					placeholder='Your "pros" and "cons", alternatives...'
					hint="Helps AI identify cognitive biases."
					disabled={isPending || isSuccess}
					minHeight="150px"
				/>
			</div>

			<div className="flex justify-end pt-4 border-t">
				{isSuccess ? (
					<Button type="button" size="lg" onClick={handleReset} className="min-w-[200px]">
						<Plus className="mr-2 h-5 w-5" />
						Add Another Decision
					</Button>
				) : (
					<Button type="submit" size="lg" disabled={isPending} className="min-w-[200px]">
						{isPending ? (
							<>
								<Loader2 className="mr-2 h-5 w-5 animate-spin" />
								Saving...
							</>
						) : (
							<>
								<Plus className="mr-2 h-5 w-5" />
								Record Decision
							</>
						)}
					</Button>
				)}
			</div>
		</form>
	);
}
