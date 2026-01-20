import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Sparkles } from "lucide-react";

export function EmptyState() {
	return (
		<Card className="border-2 border-dashed">
			<CardContent className="flex flex-col items-center justify-center py-16 text-center">
				<div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mb-4 border-2 border-primary/20">
					<Sparkles className="w-8 h-8 text-primary" />
				</div>
				<h3 className="text-xl font-semibold mb-2">Start Your Journey</h3>
				<p className="text-muted-foreground max-w-sm mb-6">
					Record your first decision and get AI-powered insights to improve your decision-making skills.
				</p>
				<Button asChild>
					<Link href="/decisions/new">
						<Plus className="mr-2 h-4 w-4" />
						Create Your First Decision
					</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
