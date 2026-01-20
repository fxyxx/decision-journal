"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, BookOpen } from "lucide-react";
import { useDecisionsListRealtime } from "@/hooks/useDecisionsListRealtime";

interface DecisionsEmptyStateProps {
	userId: string;
}

export function DecisionsEmptyState({ userId }: DecisionsEmptyStateProps) {
	useDecisionsListRealtime(userId);

	return (
		<div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-xl bg-muted/10">
			<div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
				<BookOpen className="w-8 h-8 text-muted-foreground/50" />
			</div>
			<h3 className="text-xl font-semibold mb-2">History is empty</h3>
			<p className="text-muted-foreground max-w-sm mb-6">
				You haven&apos;t recorded any decisions yet. Start keeping a journal now to improve your thinking.
			</p>
			<Button asChild variant="default">
				<Link href="/decisions/new">
					<Plus className="mr-2 h-4 w-4" />
					Add first entry
				</Link>
			</Button>
		</div>
	);
}
