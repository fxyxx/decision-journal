"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/actions/auth";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { SocialLogin } from "@/components/auth/SocialLogin";
import { AuthState } from "@/types/auth";
import { ErrorAlert } from "@/components/ui/error-alert";

const initialState: AuthState = {
	errors: [],
	success: false,
};

export default function LoginPage() {
	const [state, formAction, isPending] = useActionState(login, initialState);

	return (
		<>
			<AuthHeader title="Login" subtitle="Enter your email and password to sign in" />
			<ErrorAlert errors={state.errors} />

			<div className="grid gap-6">
				<form action={formAction}>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								placeholder="name@example.com"
								type="email"
								autoCapitalize="none"
								autoComplete="email"
								autoCorrect="off"
								required
								disabled={isPending}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" name="password" type="password" required disabled={isPending} />
						</div>
						<Button type="submit" disabled={isPending}>
							{isPending ? "Signing in..." : "Sign In with Email"}
						</Button>
					</div>
				</form>

				<SocialLogin />

				<p className="px-8 text-center text-sm text-muted-foreground">
					Don&apos;t have an account?{" "}
					<Link href="/register" className="underline underline-offset-4 hover:text-primary">
						Sign up
					</Link>
				</p>
			</div>
		</>
	);
}
