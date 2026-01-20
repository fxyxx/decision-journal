"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Brain } from "lucide-react";

interface DashboardStatsProps {
    totalDecisions: number;
    analyzedDecisions: number;
    avgScore: number | null;
    uniqueBiases: number;
}

export function DashboardStats({ totalDecisions, analyzedDecisions, avgScore, uniqueBiases }: DashboardStatsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <Card className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-chart-1/5 to-transparent pointer-events-none" />
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Decisions</CardTitle>
                    <Target className="h-5 w-5 text-chart-1" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{totalDecisions}</div>
                    <p className="text-xs text-muted-foreground mt-1">{analyzedDecisions} analyzed with AI</p>
                </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-chart-2/5 to-transparent pointer-events-none" />
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Average Quality</CardTitle>
                    <TrendingUp className="h-5 w-5 text-chart-2" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{avgScore !== null ? `${avgScore}%` : "—"}</div>
                    <p className="text-xs text-muted-foreground mt-1">Based on AI analysis</p>
                </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-chart-4/5 to-transparent pointer-events-none" />
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Biases Detected</CardTitle>
                    <Brain className="h-5 w-5 text-chart-4" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{uniqueBiases}</div>
                    <p className="text-xs text-muted-foreground mt-1">Unique cognitive biases</p>
                </CardContent>
            </Card>
        </div>
    );
}
