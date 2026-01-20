"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Decision } from "@/types/decision";

export function useDecisionRealtime(initialDecision: Decision): Decision {
	const [decision, setDecision] = useState<Decision>(initialDecision);
	const router = useRouter();
	const [supabase] = useState(() => createClient());

	useEffect(() => {
		setDecision(initialDecision);
	}, [initialDecision]);

	useEffect(() => {
		const channel = supabase
			.channel(`decision-${decision.id}`)
			.on(
				"postgres_changes",
				{
					event: "UPDATE",
					schema: "public",
					table: "decisions",
					filter: `id=eq.${decision.id}`,
				},
				(payload) => {
					const updatedDecision = payload.new as Decision;

					setDecision((prev) => ({ ...prev, ...updatedDecision }));
					router.refresh();
				},
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [decision.id, supabase, router]);

	return decision;
}
