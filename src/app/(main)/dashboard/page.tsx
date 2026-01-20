import { createClient } from "@/lib/supabase/server";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
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
	});

	const biasData = Object.entries(biasCounts)
		.map(([bias, count]) => ({ bias, count }))
		.sort((a, b) => b.count - a.count)
		.slice(0, 10);

	const categoryData = Object.entries(categoryCounts)
		.map(([category, count]) => ({ category, count }))
		.sort((a, b) => b.count - a.count);

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
				<p className="text-muted-foreground">Overview of your decision making patterns and biases.</p>
			</div>

			<DashboardCharts biasData={biasData} categoryData={categoryData} />
		</div>
	);
}
