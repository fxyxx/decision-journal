import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { User, Mail, Calendar, CheckCircle2, Shield } from "lucide-react";

export const metadata: Metadata = {
	title: "Profile",
};

export default async function ProfilePage() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const createdAt = user?.created_at ? new Date(user.created_at) : null;
	const formattedDate = createdAt
		? createdAt.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		})
		: "Unknown";

	return (
		<div className="space-y-8">
			<div className="flex flex-col gap-6 border-b pb-6">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<div>
						<h1 className="text-3xl font-bold tracking-tight mb-2">Profile</h1>
						<p className="text-muted-foreground flex items-center gap-2">
							<User className="w-4 h-4" />
							Manage your account information
						</p>
					</div>
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Card className="relative overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
					<CardHeader className="flex flex-row items-center gap-4 pb-2">
						<div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-2 border-primary/20">
							<User className="w-8 h-8 text-primary" />
						</div>
						<div>
							<CardTitle className="text-xl">Account Info</CardTitle>
							<CardDescription>Your personal details</CardDescription>
						</div>
					</CardHeader>
					<CardContent className="space-y-4 pt-4">
						<div className="flex items-center gap-3">
							<Mail className="w-5 h-5 text-muted-foreground" />
							<div className="min-w-0 flex-1">
								<p className="text-sm text-muted-foreground">Email</p>
								<p className="font-medium truncate">{user?.email || "Not specified"}</p>
							</div>
						</div>
						<Separator />
						<div className="flex items-center gap-3">
							<Calendar className="w-5 h-5 text-muted-foreground" />
							<div className="min-w-0 flex-1">
								<p className="text-sm text-muted-foreground">Member since</p>
								<p className="font-medium">{formattedDate}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="relative overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-br from-chart-2/5 to-transparent pointer-events-none" />
					<CardHeader className="flex flex-row items-center gap-4 pb-2">
						<div className="w-16 h-16 rounded-full bg-gradient-to-br from-chart-2/20 to-chart-2/5 flex items-center justify-center border-2 border-chart-2/20">
							<Shield className="w-8 h-8 text-chart-2" />
						</div>
						<div>
							<CardTitle className="text-xl">Account Status</CardTitle>
							<CardDescription>Your account health</CardDescription>
						</div>
					</CardHeader>
					<CardContent className="space-y-4 pt-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<CheckCircle2 className="w-5 h-5 text-chart-2" />
								<div>
									<p className="text-sm text-muted-foreground">Status</p>
									<p className="font-medium">Active</p>
								</div>
							</div>
							<Badge variant="outline" className="border-chart-2/30 bg-chart-2/10 text-chart-2">
								Verified
							</Badge>
						</div>
						<Separator />
						<div className="rounded-lg bg-muted/50 p-3">
							<p className="text-sm text-muted-foreground">
								Your account is fully functional and verified. All features are available.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
