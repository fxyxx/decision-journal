import { ThemeToggle } from "@/components/global/ThemeToggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Settings",
	description: "Manage your account settings and preferences.",
};

export default function SettingsPage() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Settings</h3>
				<p className="text-sm text-muted-foreground">Manage your account settings and preferences.</p>
			</div>
			<Separator />
			<div className="space-y-6">
				<section>
					<Card>
						<CardHeader>
							<CardTitle>Appearance</CardTitle>
							<CardDescription>
								Customize the look and feel of the application. Automatically switch between day and
								night themes.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex items-center justify-between space-x-2">
								<Label htmlFor="theme-toggle" className="flex flex-col space-y-1">
									<span>Theme</span>
									<span className="font-normal leading-snug text-muted-foreground">
										Select your preferred theme.
									</span>
								</Label>
								<ThemeToggle />
							</div>
						</CardContent>
					</Card>
				</section>
			</div>
		</div>
	);
}
