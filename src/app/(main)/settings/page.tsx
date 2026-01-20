import { ThemeToggle } from "@/components/global/ThemeToggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Metadata } from "next";
import { Settings, Palette, Monitor, Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export const metadata: Metadata = {
	title: "Settings",
	description: "Manage your account settings and preferences.",
};

export default function SettingsPage() {
	return (
		<div className="space-y-8">
			<div className="flex flex-col gap-6 border-b pb-6">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<div>
						<h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
						<p className="text-muted-foreground flex items-center gap-2">
							<Settings className="w-4 h-4" />
							Manage your account settings and preferences
						</p>
					</div>
				</div>
			</div>

			<div className="grid gap-6">
				<Card className="relative overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-br from-chart-4/5 to-transparent pointer-events-none" />
					<CardHeader className="flex flex-row items-center gap-4">
						<div className="w-12 h-12 rounded-full bg-gradient-to-br from-chart-4/20 to-chart-4/5 flex items-center justify-center border-2 border-chart-4/20">
							<Palette className="w-6 h-6 text-chart-4" />
						</div>
						<div>
							<CardTitle>Appearance</CardTitle>
							<CardDescription>Customize the look and feel of the application</CardDescription>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="flex items-center justify-between rounded-lg border bg-card/50 p-4 transition-colors hover:bg-muted/50">
							<div className="flex items-center gap-3">
								<Label
									htmlFor="theme-toggle"
									className="flex flex-col items-start space-y-1 cursor-pointer"
								>
									<span className="font-medium">Theme</span>
									<span className="font-normal text-sm leading-snug text-muted-foreground">
										Select your preferred theme for the interface
									</span>
								</Label>
							</div>
							<ThemeToggle />
						</div>
					</CardContent>
				</Card>

				<Card className="relative overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-br from-chart-1/5 to-transparent pointer-events-none" />
					<CardHeader className="flex flex-row items-center gap-4">
						<div className="w-12 h-12 rounded-full bg-gradient-to-br from-chart-1/20 to-chart-1/5 flex items-center justify-center border-2 border-chart-1/20">
							<Bell className="w-6 h-6 text-chart-1" />
						</div>
						<div>
							<CardTitle>Notifications</CardTitle>
							<CardDescription>Configure how you receive updates and alerts</CardDescription>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between rounded-lg border bg-card/50 p-4 transition-colors hover:bg-muted/50">
							<Label
								htmlFor="email-notifications"
								className="flex flex-col items-start space-y-1 cursor-pointer"
							>
								<span className="font-medium">Email notifications</span>
								<span className="font-normal text-sm leading-snug text-muted-foreground">
									Receive periodic summaries and insights via email
								</span>
							</Label>
							<Switch id="email-notifications" disabled />
						</div>
						<div className="flex items-center justify-between rounded-lg border bg-card/50 p-4 transition-colors hover:bg-muted/50">
							<Label
								htmlFor="browser-notifications"
								className="flex flex-col items-start space-y-1 cursor-pointer"
							>
								<span className="font-medium">Browser notifications</span>
								<span className="font-normal text-sm leading-snug text-muted-foreground">
									Get notified about important updates in your browser
								</span>
							</Label>
							<Switch id="browser-notifications" disabled />
						</div>
						<div className="rounded-lg bg-muted/50 p-3">
							<p className="text-sm text-muted-foreground">
								🔜 Notification settings will be available in a future update.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
