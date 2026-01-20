import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, BookOpen } from "lucide-react";
import { DecisionCard } from "@/components/decisions/DecisionCard";
import { DecisionsFilters } from "@/components/decisions/DecisionsFilters";
import { parseSearchParams, sortByScore, type DecisionSearchParams } from "@/lib/helpers/decisions";
import type { Decision } from "@/types/decision";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Decisions",
};

interface DecisionsPageProps {
	searchParams: Promise<DecisionSearchParams>;
}

export default async function DecisionsPage({ searchParams }: DecisionsPageProps) {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return null;
	}

	const params = await searchParams;
	const { sort, order, category, bias } = parseSearchParams(params);

	let query = supabase.from("decisions").select("*").eq("user_id", user.id);

	if (category) {
		query = query.contains("analysis", { categories: [category] });
	}

	if (bias) {
		query = query.contains("analysis", { biases: [bias] });
	}

	if (sort !== "score") {
		query = query.order("created_at", { ascending: order === "asc" });
	}

	const { data: decisionsData, error } = await query;

	if (error) {
		console.error("Error fetching decisions:", error);
	}

	let decisions: Decision[] = (decisionsData as Decision[]) ?? [];

	if (sort === "score") {
		decisions = sortByScore(decisions, order);
	}

	return (
		<div className="space-y-8">
			<div className="flex flex-col gap-6 border-b pb-6">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<div>
						<h1 className="text-3xl font-bold tracking-tight mb-2">Decision Journal</h1>
						<p className="text-muted-foreground flex items-center gap-2">
							<BookOpen className="w-4 h-4" />
							Total entries: <span className="font-medium text-foreground">{decisions.length}</span>
						</p>
					</div>
					<Button asChild size="default" className="shadow-sm shrink-0">
						<Link href="/decisions/new">
							<Plus className="mr-2 h-4 w-4" />
							New Decision
						</Link>
					</Button>
				</div>

				<div className="flex items-center justify-between">
					<DecisionsFilters />
				</div>
			</div>

			<div className="grid gap-6">
				{decisions.length > 0 ? (
					<div className="grid grid-cols-1 gap-6">
						{decisions.map((decision) => (
							<DecisionCard key={decision.id} decision={decision} />
						))}
					</div>
				) : (
					<div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-xl bg-muted/10">
						<div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
							<BookOpen className="w-8 h-8 text-muted-foreground/50" />
						</div>
						<h3 className="text-xl font-semibold mb-2">History is empty</h3>
						<p className="text-muted-foreground max-w-sm mb-6">
							You haven&apos;t recorded any decisions yet. Start keeping a journal now to improve your
							thinking.
						</p>
						<Button asChild variant="default">
							<Link href="/decisions/new">
								<Plus className="mr-2 h-4 w-4" />
								Add first entry
							</Link>
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
