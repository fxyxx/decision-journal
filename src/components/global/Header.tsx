import Link from "next/link";
import { UserProfileDropdown } from "./UserProfileDropdown";
import { createClient } from "@/lib/supabase/server";

export async function Header() {
	const supabase = await createClient();
	const { data } = await supabase.auth.getClaims();

	const email = data?.claims?.email;

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 items-center mx-auto px-4">
				<div className="mr-4 flex">
					<Link href="/" className="mr-6 flex items-center space-x-2">
						<span className="font-bold inline-block">DecisionJournal</span>
					</Link>
					<nav className="flex items-center space-x-6 text-sm font-medium">
						<Link
							href="/decisions"
							className="transition-colors hover:text-foreground/80 text-foreground/60"
						>
							Decisions
						</Link>
						<Link
							href="/dashboard"
							className="transition-colors hover:text-foreground/80 text-foreground/60"
						>
							Dashboard
						</Link>
					</nav>
				</div>
				<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
					<UserProfileDropdown email={email} />
				</div>
			</div>
		</header>
	);
}
