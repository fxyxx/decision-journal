import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Decision } from "@/types/decision";

interface RecentDecisionsProps {
	decisions: Decision[];
}

export function RecentDecisions({ decisions }: RecentDecisionsProps) {
	return (
		<Card className="lg:col-span-2">
			<CardHeader className="flex flex-row items-center justify-between">
				<div>
					<CardTitle>Recent Decisions</CardTitle>
					<CardDescription>Your latest recorded decisions</CardDescription>
				</div>
				<Button asChild variant="outline" size="sm">
					<Link href="/decisions">
						View all
						<ArrowRight className="ml-2 h-4 w-4" />
					</Link>
				</Button>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{decisions.map((decision) => (
						<Link
							key={decision.id}
							href={`/decisions`}
							className="flex items-center justify-between p-4 rounded-lg border bg-card/50 transition-colors hover:bg-muted/50 pointer-events-none opacity-50"
						>
							<div className="min-w-0 flex-1">
								<p className="font-medium truncate">{decision.title}</p>
								<p className="text-sm text-muted-foreground">
									{new Date(decision.created_at).toLocaleDateString("en-US", {
										month: "short",
										day: "numeric",
										year: "numeric",
									})}
								</p>
							</div>
							{decision.analysis?.score && (
								<div className="ml-4 flex items-center gap-2">
									<div
										className={`text-sm font-medium ${
											decision.analysis.score >= 7
												? "text-chart-2"
												: decision.analysis.score >= 4
													? "text-chart-4"
													: "text-destructive"
										}`}
									>
										{decision.analysis.score}/10
									</div>
								</div>
							)}
							<ArrowRight className="ml-2 h-4 w-4 text-muted-foreground" />
						</Link>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
