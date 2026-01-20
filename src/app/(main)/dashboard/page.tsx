import { createClient } from "@/lib/supabase/server";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { Metadata } from "next";
import type { Decision } from "@/types/decision";

export const metadata: Metadata = {
	title: "Dashboard",
};

export default async function DashboardPage() {
	const supabase = await createClient();
	const { data: decisions, error } = await supabase
		.from("decisions")
		.select("analysis")
		.overrideTypes<Pick<Decision, "analysis">[], { merge: false }>();

	if (error) {
		console.error("Error fetching decisions:", error);
		return <div>Error loading dashboard data</div>;
	}

	const biasCounts: Record<string, number> = {};
	const categoryCounts: Record<string, number> = {};
	let totalScore = 0;
	let scoredCount = 0;

	decisions?.forEach((decision) => {
		const analysis = decision.analysis;

		if (analysis?.biases) {
			analysis.biases.forEach((bias) => {
				biasCounts[bias] = (biasCounts[bias] || 0) + 1;
			});
		}

		if (analysis?.categories) {
			analysis.categories.forEach((category) => {
				categoryCounts[category] = (categoryCounts[category] || 0) + 1;
			});
		}

		if (analysis?.score) {
			totalScore += analysis.score;
			scoredCount++;
		}
	});

	const biasData = Object.entries(biasCounts)
		.map(([bias, count]) => ({ bias, count }))
		.sort((a, b) => b.count - a.count)
		.slice(0, 10);

	const categoryData = Object.entries(categoryCounts)
		.map(([category, count]) => ({ category, count }))
		.sort((a, b) => b.count - a.count);

	const totalDecisions = decisions?.length ?? 0;
	const analyzedDecisions = decisions?.filter((d) => d.analysis).length ?? 0;
	const avgScore = scoredCount > 0 ? Math.round((totalScore / scoredCount) * 10) : null;
	const uniqueBiases = Object.keys(biasCounts).length;

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
				<p className="text-muted-foreground">Overview of your decision making patterns and biases.</p>
			</div>

			<DashboardStats
				totalDecisions={totalDecisions}
				analyzedDecisions={analyzedDecisions}
				avgScore={avgScore}
				uniqueBiases={uniqueBiases}
			/>

			<DashboardCharts biasData={biasData} categoryData={categoryData} />
		</div>
	);
}
