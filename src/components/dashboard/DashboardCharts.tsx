"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Pie, PieChart, Label } from "recharts";
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";

interface DashboardChartsProps {
	biasData: { bias: string; count: number }[];
	categoryData: { category: string; count: number }[];
}

const biasChartConfig = {
	count: {
		label: "Occurrences",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

const CHART_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

export function DashboardCharts({ biasData, categoryData }: DashboardChartsProps) {
	const totalDecisions = useMemo(() => {
		return categoryData.reduce((acc, curr) => acc + curr.count, 0);
	}, [categoryData]);

	const coloredCategoryData = useMemo(() => {
		return categoryData.map((item, index) => ({
			...item,
			fill: CHART_COLORS[index % CHART_COLORS.length],
		}));
	}, [categoryData]);

	const categoryConfig = useMemo(() => {
		const config: ChartConfig = {
			count: { label: "Decisions" },
		};
		coloredCategoryData.forEach((item, index) => {
			config[item.category] = {
				label: item.category,
				color: CHART_COLORS[index % CHART_COLORS.length],
			};
		});
		return config;
	}, [coloredCategoryData]);

	return (
		<div className="grid gap-4">
			<Card className="flex flex-col">
				<CardHeader className="items-center pb-0">
					<CardTitle>Categories Distribution</CardTitle>
					<CardDescription>Decisions by category</CardDescription>
				</CardHeader>
				<CardContent className="flex-1 pb-0">
					<ChartContainer config={categoryConfig} className="mx-auto aspect-square max-h-[300px]">
						<PieChart>
							<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
							<Pie
								data={coloredCategoryData}
								dataKey="count"
								nameKey="category"
								innerRadius={60}
								strokeWidth={5}
							>
								<Label
									content={({ viewBox }) => {
										if (viewBox && "cx" in viewBox && "cy" in viewBox) {
											return (
												<text
													x={viewBox.cx}
													y={viewBox.cy}
													textAnchor="middle"
													dominantBaseline="middle"
												>
													<tspan
														x={viewBox.cx}
														y={viewBox.cy}
														className="fill-foreground text-3xl font-bold"
													>
														{totalDecisions.toLocaleString()}
													</tspan>
													<tspan
														x={viewBox.cx}
														y={(viewBox.cy || 0) + 24}
														className="fill-muted-foreground text-xs"
													>
														Decisions
													</tspan>
												</text>
											);
										}
									}}
								/>
							</Pie>
							<ChartLegend
								content={<ChartLegendContent nameKey="category" />}
								className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
							/>
						</PieChart>
					</ChartContainer>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="items-center pb-4">
					<CardTitle>Biases Profile</CardTitle>
					<CardDescription>Summary of cognitive biases in your decisions</CardDescription>
				</CardHeader>
				<CardContent className="pb-0">
					<ChartContainer config={biasChartConfig} className="mx-auto h-[450px] w-full">
						<RadarChart data={biasData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
							<PolarGrid className="fill-muted/20 stroke-muted-foreground/30" strokeWidth={1} />
							<PolarAngleAxis
								dataKey="bias"
								tick={({ x, y, textAnchor, payload, ...props }) => {
									return (
										<text
											x={x}
											y={y}
											textAnchor={textAnchor}
											{...props}
											className="fill-foreground text-xs font-medium"
										>
											<tspan dy="0.355em">{payload.value}</tspan>
										</text>
									);
								}}
							/>
							<PolarRadiusAxis angle={30} domain={[0, "auto"]} tick={false} axisLine={false} />
							<Radar
								dataKey="count"
								fill="var(--color-count)"
								fillOpacity={0.4}
								stroke="var(--color-count)"
								strokeWidth={2}
							/>
							<ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
						</RadarChart>
					</ChartContainer>
				</CardContent>
			</Card>
		</div>
	);
}
