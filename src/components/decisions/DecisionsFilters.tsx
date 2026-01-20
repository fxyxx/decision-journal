"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, Filter, ArrowUpDown } from "lucide-react";
import { COGNITIVE_BIASES, DECISIONS_CATEGORIES } from "@/lib/constants";
import { useTransition } from "react";

export function DecisionsFilters() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const sort = searchParams.get("sort") || "created_at";
	const order = searchParams.get("order") || "desc";
	const category = searchParams.get("category") || "all";
	const bias = searchParams.get("bias") || "all";

	const currentSortValue = `${sort}-${order}`;

	const updateUrl = (params: URLSearchParams) => {
		startTransition(() => {
			router.push(`/decisions?${params.toString()}`);
		});
	};

	const handleSortChange = (value: string) => {
		const [newSort, newOrder] = value.split("-");
		const params = new URLSearchParams(searchParams.toString());
		params.set("sort", newSort);
		params.set("order", newOrder);
		updateUrl(params);
	};

	const handleCategoryChange = (val: string) => {
		const params = new URLSearchParams(searchParams.toString());
		if (val === "all") {
			params.delete("category");
		} else {
			params.set("category", val);
		}
		updateUrl(params);
	};

	const handleBiasChange = (val: string) => {
		const params = new URLSearchParams(searchParams.toString());
		if (val === "all") {
			params.delete("bias");
		} else {
			params.set("bias", val);
		}
		updateUrl(params);
	};

	const clearFilters = () => {
		startTransition(() => {
			router.push("/decisions");
		});
	};

	const hasActiveFilters = category !== "all" || bias !== "all" || currentSortValue !== "created_at-desc";

	return (
		<div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 w-full sm:w-auto">
			<div className="flex items-center gap-2 w-full sm:w-auto">
				<Select value={currentSortValue} onValueChange={handleSortChange} disabled={isPending}>
					<SelectTrigger className="w-full sm:w-[200px] bg-background">
						<ArrowUpDown className="w-4 h-4 mr-2 text-muted-foreground" />
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="created_at-desc">Newest First</SelectItem>
						<SelectItem value="created_at-asc">Oldest First</SelectItem>
						<SelectItem value="score-desc">Score (High-Low)</SelectItem>
						<SelectItem value="score-asc">Score (Low-High)</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
				<Select value={category} onValueChange={handleCategoryChange} disabled={isPending}>
					<SelectTrigger className="w-full sm:w-[200px] bg-background">
						<Filter className="w-4 h-4 mr-2 text-muted-foreground" />
						<SelectValue placeholder="Category" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Categories</SelectItem>
						{DECISIONS_CATEGORIES.map((cat) => (
							<SelectItem key={cat} value={cat}>
								{cat}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select value={bias} onValueChange={handleBiasChange} disabled={isPending}>
					<SelectTrigger className="w-full sm:w-[200px] bg-background">
						<Filter className="w-4 h-4 mr-2 text-muted-foreground" />
						<SelectValue placeholder="Cognitive Bias" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Biases</SelectItem>
						{COGNITIVE_BIASES.map((b) => (
							<SelectItem key={b} value={b}>
								{b}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{hasActiveFilters && (
					<Button
						variant="ghost"
						size="sm"
						onClick={clearFilters}
						disabled={isPending}
						className="text-muted-foreground hover:text-foreground ml-auto sm:ml-0"
					>
						<X className="h-4 w-4 mr-1" />
						Clear
					</Button>
				)}
			</div>
		</div>
	);
}
