import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ErrorAlertProps {
	title?: string;
	errors: string[];
}

export function ErrorAlert({ title = "Error", errors }: ErrorAlertProps) {
	if (!errors || errors.length === 0) return null;

	return (
		<Alert
			variant="destructive"
			className="flex items-start gap-3 border-red-200 bg-red-50 text-red-900 animate-in fade-in slide-in-from-top-2"
		>
			<AlertCircle className="h-5 w-5 mt-0.5 shrink-0 text-red-600" />
			<div className="grid gap-1">
				<AlertTitle className="mb-0 font-medium leading-none tracking-tight text-red-900">{title}</AlertTitle>
				<AlertDescription className="text-sm text-red-800">
					<ul className="list-disc list-inside space-y-1">
						{errors.map((error, index) => (
							<li key={index}>{error}</li>
						))}
					</ul>
				</AlertDescription>
			</div>
		</Alert>
	);
}
