"use client";

import { DecisionCard } from "./DecisionCard";
import { useDecisionsListRealtime } from "@/hooks/useDecisionsListRealtime";
import type { Decision } from "@/types/decision";

interface DecisionsListProps {
	decisions: Decision[];
	userId: string;
}

export function DecisionsList({ decisions, userId }: DecisionsListProps) {
	useDecisionsListRealtime(userId);

	return (
		<div className="grid grid-cols-1 gap-6">
			{decisions.map((decision) => (
				<DecisionCard key={decision.id} decision={decision} />
			))}
		</div>
	);
}
