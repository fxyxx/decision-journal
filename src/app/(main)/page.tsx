import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
	const supabase = await createClient();
	const { data } = await supabase.auth.getClaims();

	return (
		<div className="space-y-8">
			<div className="grid gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Welcome!</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">
							You have successfully signed in as{" "}
							<span className="font-medium text-foreground">{data?.claims?.email || "Unknown"}</span>.
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
