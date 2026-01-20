import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Loading() {
	return (
		<div className="space-y-8">
			<div className="flex flex-col gap-6 border-b pb-6">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<div>
						<div className="h-9 w-48 bg-muted animate-pulse rounded-md mb-2" />
						<div className="h-5 w-64 bg-muted animate-pulse rounded-md" />
					</div>
				</div>
			</div>

			<Card className="border-2 border-dashed border-muted-foreground/20">
				<CardContent className="flex flex-col items-center justify-center py-16 text-center">
					<div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mb-4 border-2 border-primary/20">
						<Loader2 className="w-8 h-8 text-primary animate-spin" />
					</div>
					<h3 className="text-xl font-semibold mb-2">Loading...</h3>
					<p className="text-muted-foreground max-w-sm">Please wait while we load your content.</p>
				</CardContent>
			</Card>
		</div>
	);
}
