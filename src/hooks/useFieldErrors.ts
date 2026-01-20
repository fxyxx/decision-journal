import { useState, useCallback, useMemo } from "react";
import { DecisionState } from "@/actions/decisions";

type FieldName = "title" | "decision" | "reasoning";

export function useFieldErrors(serverErrors: DecisionState["errors"]) {
	const [editedWithErrors, setEditedWithErrors] = useState<Record<FieldName, DecisionState["errors"]>>({
		title: undefined,
		decision: undefined,
		reasoning: undefined,
	});

	const markFieldEdited = useCallback(
		(name: FieldName) => {
			setEditedWithErrors((prev) => ({
				...prev,
				[name]: serverErrors,
			}));
		},
		[serverErrors],
	);

	const getFieldError = useMemo(() => {
		return (name: "title" | "decision"): string | undefined => {
			const error = serverErrors?.[name]?.[0];
			if (!error) return undefined;

			const wasEditedWithCurrentErrors = editedWithErrors[name] === serverErrors;
			return wasEditedWithCurrentErrors ? undefined : error;
		};
	}, [serverErrors, editedWithErrors]);

	const resetErrors = useCallback(() => {
		setEditedWithErrors({ title: undefined, decision: undefined, reasoning: undefined });
	}, []);

	return { getFieldError, markFieldEdited, resetErrors };
}
