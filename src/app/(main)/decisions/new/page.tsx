import { CreateDecisionForm } from "@/components/decisions/CreateDecisionForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const maxDuration = 60;

export default function NewDecisionPage() {
	return (
		<div className="max-w-3xl mx-auto space-y-3">
			<Button
				variant="ghost"
				asChild
				className="pl-0 hover:pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground"
			>
				<Link href="/decisions">
					<ChevronLeft className="mr-2 h-4 w-4" />
					Back to journal
				</Link>
			</Button>

			<div className="space-y-2">
				<h1 className="text-3xl font-bold tracking-tight">New Decision</h1>
				<p className="text-muted-foreground">Record the details of your decision for future analysis.</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Decision Details</CardTitle>
					<CardDescription>Fill out the form below.</CardDescription>
				</CardHeader>
				<CardContent>
					<CreateDecisionForm />
				</CardContent>
			</Card>
		</div>
	);
}
