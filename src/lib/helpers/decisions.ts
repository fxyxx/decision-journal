import type { Decision } from "@/types/decision";

export type SortField = "created_at" | "score";
export type SortOrder = "asc" | "desc";

export interface DecisionSearchParams {
	sort?: string;
	order?: string;
	category?: string;
	bias?: string;
}

export interface ParsedSearchParams {
	sort: SortField;
	order: SortOrder;
	category?: string;
	bias?: string;
}

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
