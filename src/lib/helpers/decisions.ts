import type { Decision, DecisionSearchParams, ParsedSearchParams, SortField, SortOrder } from "@/types/decision";

export function parseSearchParams(params: DecisionSearchParams): ParsedSearchParams {
	const sort = (params.sort === "score" ? "score" : "created_at") as SortField;
	const order = (params.order === "asc" ? "asc" : "desc") as SortOrder;

	return {
		sort,
		order,
		category: params.category,
		bias: params.bias,
	};
}

export function sortByScore(decisions: Decision[], order: SortOrder): Decision[] {
	return [...decisions].sort((a, b) => {
		const scoreA = a.analysis?.score ?? 0;
		const scoreB = b.analysis?.score ?? 0;
		return order === "asc" ? scoreA - scoreB : scoreB - scoreA;
	});
}
