import { ReactNode } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
	const supabase = await createClient();
	const { data } = await supabase.auth.getClaims();

	if (!data?.claims) {
		redirect("/login");
	}

	return (
		<div className="relative flex min-h-screen flex-col bg-background">
			<Header />
			<main className="flex-1 container mx-auto px-4 py-8">{children}</main>
			<Footer />
		</div>
	);
}
