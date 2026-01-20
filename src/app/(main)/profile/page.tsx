import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Profile",
};

export default function ProfilePage() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Profile</h3>
				<p className="text-sm text-muted-foreground">Manage smth.</p>
			</div>
			<Separator />
			<div className="space-y-6">
				<section>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0">
							<CardTitle className="text-sm font-medium">Status</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">Active</div>
							<p className="text-xs text-muted-foreground">Your account is fully functional</p>
						</CardContent>
					</Card>
				</section>
			</div>
		</div>
	);
}
