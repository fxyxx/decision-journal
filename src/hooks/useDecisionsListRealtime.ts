"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useDecisionsListRealtime(userId: string): void {
	const router = useRouter();
	const [supabase] = useState(() => createClient());

	useEffect(() => {
		const channel = supabase
			.channel(`decisions-list-${userId}`)
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "decisions",
					filter: `user_id=eq.${userId}`,
				},
				() => {
					router.refresh();
				},
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [userId, supabase, router]);
}
