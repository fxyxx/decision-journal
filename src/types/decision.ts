import { AnalysisResult } from "@/lib/schemas/analysis";

export interface Decision {
	id: string;
	user_id: string;
	title: string;
	decision: string;
	reasoning: string | null;
	analysis: AnalysisResult | null;
	is_analyzing: boolean;
	created_at: string;
}

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
