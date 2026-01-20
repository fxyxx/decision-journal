import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, BookOpen } from "lucide-react";
import { DecisionsFilters } from "./DecisionsFilters";

interface DecisionsHeaderProps {
	totalItems: number;
}

export function DecisionsHeader({ totalItems }: DecisionsHeaderProps) {
	return (
		<div className="flex flex-col gap-6 border-b pb-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight mb-2">Decisions</h1>
					<p className="text-muted-foreground flex items-center gap-2">
						<BookOpen className="w-4 h-4" />
						Total entries: <span className="font-medium text-foreground">{totalItems}</span>
					</p>
				</div>
				<Button asChild size="default" className="shadow-sm shrink-0">
					<Link href="/decisions/new">
						<Plus className="mr-2 h-4 w-4" />
						New Decision
					</Link>
				</Button>
			</div>

			<div className="flex items-center justify-between">
				<DecisionsFilters />
			</div>
		</div>
	);
}
