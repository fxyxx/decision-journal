"use client";

import { createDecision, DecisionState } from "@/actions/decisions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useActionState, useState, useCallback } from "react";
import { Loader2, Plus, Target, Brain, AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

const initialState: DecisionState = {
	status: "idle",
	message: "",
};

type FieldName = "title" | "decision" | "reasoning";

interface FormField {
	value: string;
	touched: boolean;
}

const createEmptyFields = (): Record<FieldName, FormField> => ({
	title: { value: "", touched: false },
	decision: { value: "", touched: false },
	reasoning: { value: "", touched: false },
});

export function CreateDecisionForm() {
	const [state, formAction, isPending] = useActionState(createDecision, initialState);
	const [fields, setFields] = useState(createEmptyFields);
	const [formKey, setFormKey] = useState(0);

	const updateField = useCallback((name: FieldName, value: string) => {
		setFields((prev) => ({
			...prev,
			[name]: { value, touched: true },
		}));
	}, []);

	const getError = (name: "title" | "decision") => (!fields[name].touched ? state.errors?.[name]?.[0] : undefined);

	const labelStyle = "text-base font-semibold flex items-center gap-2 mb-2";
	const iconStyle = "w-4 h-4 text-primary";

	const handleSubmit = () => {
		setFields((prev) => ({
			title: { ...prev.title, touched: false },
			decision: { ...prev.decision, touched: false },
			reasoning: { ...prev.reasoning, touched: false },
		}));
	};

	const handleSuccess = useCallback(() => {
		setFields(createEmptyFields());
		setFormKey((k) => k + 1);
	}, []);

	const isSuccess = state.status === "success";

	return (
		<form key={formKey} action={formAction} onSubmit={handleSubmit} className="space-y-8">
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
								onClick={handleSuccess}
								className="underline font-medium hover:no-underline"
							>
								Add another
							</button>
						</AlertDescription>
					</div>
				</Alert>
			)}

			<div className="grid gap-6">
				<div>
					<Label htmlFor="title" className={labelStyle}>
						<Target className={iconStyle} />
						Situation
					</Label>
					<Textarea
						id="title"
						name="title"
						value={fields.title.value}
						onChange={(e) => updateField("title", e.target.value)}
						placeholder="E.g., Buying a new laptop..."
						disabled={isPending || isSuccess}
						className={cn(
							"min-h-[80px] max-h-[200px] resize-y text-base",
							getError("title") && "border-red-500 focus-visible:ring-red-500",
						)}
					/>
					{getError("title") && <p className="text-sm text-red-600 font-medium mt-1">{getError("title")}</p>}
					<p className="text-[0.8rem] text-muted-foreground mt-1.5">
						Brief context of the situation (minimum 10 characters).
					</p>
				</div>

				<div>
					<Label htmlFor="decision" className={labelStyle}>
						<CheckCircle2 className={iconStyle} />
						Decision Made
					</Label>
					<Textarea
						id="decision"
						name="decision"
						value={fields.decision.value}
						onChange={(e) => updateField("decision", e.target.value)}
						placeholder="What decision did you make?"
						className={cn(
							"min-h-[120px] max-h-[300px] resize-y text-base",
							getError("decision") && "border-red-500 focus-visible:ring-red-500",
						)}
						disabled={isPending || isSuccess}
					/>
					{getError("decision") && (
						<p className="text-sm text-red-600 font-medium mt-1">{getError("decision")}</p>
					)}
				</div>

				<div>
					<Label htmlFor="reasoning" className={labelStyle}>
						<Brain className={iconStyle} />
						Why? (Reasoning)
					</Label>
					<Textarea
						id="reasoning"
						name="reasoning"
						value={fields.reasoning.value}
						onChange={(e) => updateField("reasoning", e.target.value)}
						placeholder='Your "pros" and "cons", alternatives...'
						className="min-h-[150px] resize-y"
						disabled={isPending || isSuccess}
					/>
					<p className="text-[0.8rem] text-muted-foreground mt-1.5">Helps AI identify cognitive biases.</p>
				</div>
			</div>

			<div className="flex justify-end pt-4 border-t">
				{isSuccess ? (
					<Button type="button" size="lg" onClick={handleSuccess} className="min-w-[200px]">
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
