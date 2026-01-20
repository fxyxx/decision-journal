"use client";

import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="space-y-8">
			<div className="flex flex-col gap-6 border-b pb-6">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<div>
						<h1 className="text-3xl font-bold tracking-tight mb-2">Something went wrong</h1>
						<p className="text-muted-foreground flex items-center gap-2">
							<AlertTriangle className="w-4 h-4 text-destructive" />
							An unexpected error occurred
						</p>
					</div>
				</div>
			</div>

			<Card className="border-2 border-dashed border-destructive/30">
				<CardContent className="flex flex-col items-center justify-center py-16 text-center">
					<div className="w-16 h-16 bg-gradient-to-br from-destructive/20 to-destructive/5 rounded-full flex items-center justify-center mb-4 border-2 border-destructive/20">
						<AlertTriangle className="w-8 h-8 text-destructive" />
					</div>
					<h3 className="text-xl font-semibold mb-2">Oops! Something went wrong</h3>
					<p className="text-muted-foreground max-w-sm mb-6">
						We encountered an unexpected error. Please try again or return to the home page.
					</p>
					{error?.digest && (
						<p className="text-xs text-muted-foreground mb-4 font-mono">Error ID: {error.digest}</p>
					)}
					<div className="flex flex-col sm:flex-row gap-3">
						<Button onClick={reset} variant="default">
							<RefreshCw className="mr-2 h-4 w-4" />
							Try Again
						</Button>
						<Button asChild variant="outline">
							<Link href="/">
								<Home className="mr-2 h-4 w-4" />
								Go Home
							</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
