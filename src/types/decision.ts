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
