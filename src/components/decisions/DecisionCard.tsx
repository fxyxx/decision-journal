"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { Loader2, Sparkles, Brain, AlertTriangle, Lightbulb, Target, RefreshCw } from "lucide-react";
import { useDecisionRealtime } from "@/hooks/useDecisionRealtime";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { Decision } from "@/types/decision";
import { analyzeDecision } from "@/actions/analyze-decision";

interface DecisionCardProps {
	decision: Decision;
}

export function DecisionCard({ decision: initialDecision }: DecisionCardProps) {
	const decision = useDecisionRealtime(initialDecision);
	const { analysis, is_analyzing } = decision;

	const handleRegenerate = async () => {
		await analyzeDecision(decision.id, decision.user_id);
	};

	const getScoreColor = (score: number): string => {
		if (score >= 8) return "text-green-600 bg-green-100 border-green-200";
		if (score >= 5) return "text-yellow-600 bg-yellow-100 border-yellow-200";
		return "text-red-600 bg-red-100 border-red-200";
	};

	return (
		<Card className="overflow-hidden transition-all hover:shadow-md border-muted">
			<CardHeader className="bg-muted/30 py-2">
				<div className="flex justify-between items-start gap-4">
					<div className="space-y-1.5 flex-1">
						<div className="flex items-center gap-2 flex-wrap">
							<CardTitle className="text-lg leading-tight">{decision.title}</CardTitle>
							{is_analyzing || !analysis ? (
								<Badge
									variant="outline"
									className="animate-pulse bg-blue-50 text-blue-600 border-blue-200 gap-1 h-6"
								>
									<Loader2 className="h-3 w-3 animate-spin" />
									Analyzing...
								</Badge>
							) : (
								analysis?.categories?.map((category, index) => (
									<Badge
										key={index}
										variant="secondary"
										className="gap-1 h-6 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm border-gray-200 dark:border-zinc-700"
									>
										<Sparkles className="h-3 w-3 text-purple-500" />
										{category}
									</Badge>
								))
							)}
						</div>
						<CardDescription className="flex items-center text-xs">
							{formatDistanceToNow(new Date(decision.created_at), { addSuffix: true, locale: enUS })}
						</CardDescription>
					</div>

					{analysis && (
						<div
							className={cn(
								"flex flex-col items-center justify-center min-w-[3rem] h-12 rounded-lg border",
								getScoreColor(analysis.score),
							)}
						>
							<span className="text-xl font-bold leading-none">{analysis.score}</span>
							<span className="text-[10px] uppercase font-bold opacity-80">Score</span>
						</div>
					)}
				</div>
			</CardHeader>

			<CardContent className="space-y-6">
				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
							<Target className="h-4 w-4" />
							Decision
						</h4>
						<p className="text-sm leading-relaxed">{decision.decision}</p>
					</div>
					{decision.reasoning && (
						<div className="space-y-2">
							<h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
								<Brain className="h-4 w-4" />
								Reasoning
							</h4>
							<p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 pl-3">
								{decision.reasoning}
							</p>
						</div>
					)}
				</div>

				{analysis && (
					<div className="space-y-4 pt-4 border-t">
						<div className="flex flex-wrap gap-2">
							{analysis.biases.map((bias, idx) => (
								<Badge
									key={idx}
									variant="outline"
									className="text-xs text-orange-600 border-orange-200 bg-orange-50 gap-1"
								>
									<AlertTriangle className="h-3 w-3" />
									{bias}
								</Badge>
							))}
						</div>

						<div className="rounded-lg bg-indigo-50/50 dark:bg-indigo-900/20 p-4 border border-indigo-100 dark:border-indigo-800">
							<div className="flex items-center justify-between mb-2">
								<h4 className="flex items-center gap-2 font-medium text-indigo-900 dark:text-indigo-300">
									<Lightbulb className="h-4 w-4 text-indigo-500" />
									AI Insight
								</h4>
								<Button
									variant="ghost"
									size="sm"
									onClick={handleRegenerate}
									disabled={is_analyzing}
									className="h-7 px-2 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-100 dark:text-indigo-400 dark:hover:bg-indigo-900/30"
								>
									{is_analyzing ? (
										<Loader2 className="h-3 w-3 animate-spin mr-1" />
									) : (
										<RefreshCw className="h-3 w-3 mr-1" />
									)}
									Regenerate
								</Button>
							</div>
							<p className="text-sm text-indigo-800/80 dark:text-indigo-200/80 leading-relaxed">
								{analysis.summary}
							</p>
						</div>

						{analysis.alternatives.length > 0 && (
							<Accordion type="single" collapsible className="w-full">
								<AccordionItem value="alternatives" className="border-b-0">
									<AccordionTrigger className="py-2 text-sm text-muted-foreground hover:no-underline hover:text-foreground">
										Alternatives ({analysis.alternatives.length})
									</AccordionTrigger>
									<AccordionContent>
										<ul className="space-y-2 pt-2">
											{analysis.alternatives.map((alt, idx) => (
												<li
													key={idx}
													className="text-sm text-muted-foreground flex items-start gap-2"
												>
													<span className="text-blue-400 mt-1.5">•</span>
													{alt}
												</li>
											))}
										</ul>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
