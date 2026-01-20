interface AuthHeaderProps {
	title: string;
	subtitle: string;
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
	return (
		<div className="flex flex-col space-y-2 text-center">
			<h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
			<p className="text-sm text-muted-foreground">{subtitle}</p>
		</div>
	);
}
