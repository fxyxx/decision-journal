import { createClient } from "@/lib/supabase/server";
import { DecisionsList } from "@/components/decisions/DecisionsList";
import { DecisionsEmptyState } from "@/components/decisions/DecisionsEmptyState";
import { DecisionsHeader } from "@/components/decisions/DecisionsHeader";
import { DecisionsPagination } from "@/components/decisions/DecisionsPagination";
import { parseSearchParams, sortByScore, type DecisionSearchParams } from "@/lib/helpers/decisions";
import { paginate, buildPaginationUrl } from "@/lib/helpers/pagination";
import type { Decision } from "@/types/decision";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Decisions",
};

interface DecisionsPageProps {
	searchParams: Promise<DecisionSearchParams & { page?: string }>;
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
	const page = parseInt(params.page || "1", 10);

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

	const { items: paginatedDecisions, totalItems, totalPages, currentPage } = paginate(decisions, page);

	const buildPageUrl = (p: number) => buildPaginationUrl("/decisions", p, { sort, order, category, bias });

	return (
		<div className="space-y-8">
			<DecisionsHeader totalItems={totalItems} />

			<div className="grid gap-6">
				{paginatedDecisions.length > 0 ? (
					<DecisionsList decisions={paginatedDecisions} userId={user.id} />
				) : (
					<DecisionsEmptyState userId={user.id} />
				)}
			</div>

			<DecisionsPagination currentPage={currentPage} totalPages={totalPages} buildPageUrl={buildPageUrl} />
		</div>
	);
}
