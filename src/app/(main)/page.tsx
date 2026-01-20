import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { RecentDecisions } from "@/components/decisions/RecentDecisions";
import { EmptyState } from "@/components/dashboard/EmptyState";
import Link from "next/link";
import { Home, Plus } from "lucide-react";
import type { Decision } from "@/types/decision";

export default async function HomePage() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return null;
	}

	const { data: decisionsData } = await supabase
		.from("decisions")
		.select("*")
		.eq("user_id", user.id)
		.order("created_at", { ascending: false })
		.limit(5);

	const decisions = (decisionsData as Decision[]) ?? [];

	return (
		<div className="space-y-8">
			<div className="flex flex-col gap-6 border-b pb-6">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<div>
						<h1 className="text-3xl font-bold tracking-tight mb-2">Home</h1>
						<p className="text-muted-foreground flex items-center gap-2">
							<Home className="w-4 h-4" />
							Welcome back, <span className="font-medium text-foreground">{user.email}</span>
						</p>
					</div>
					<Button asChild size="default" className="shadow-sm shrink-0">
						<Link href="/decisions/new">
							<Plus className="mr-2 h-4 w-4" />
							New Decision
						</Link>
					</Button>
				</div>
			</div>

			{decisions.length === 0 ? (
				<EmptyState />
			) : (
				<div className="grid gap-6 lg:grid-cols-2">
					<RecentDecisions decisions={decisions} />
				</div>
			)}
		</div>
	);
}
