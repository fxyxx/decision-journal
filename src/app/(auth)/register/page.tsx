"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/actions/auth";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { SocialLogin } from "@/components/auth/SocialLogin";
import { AuthState } from "@/types/auth";

const initialState: AuthState = {
	errors: [],
	success: false,
};

export default function RegisterPage() {
	const [state, formAction, isPending] = useActionState(register, initialState);

	return (
		<>
			<AuthHeader title="Create an account" subtitle="Enter your email and password to register" />
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
							<Input
								id="password"
								name="password"
								type="password"
								required
								minLength={6}
								disabled={isPending}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="confirmPassword">Confirm Password</Label>
							<Input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								required
								minLength={6}
								disabled={isPending}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="inviteCode">Invite Code</Label>
							<Input
								id="inviteCode"
								name="inviteCode"
								placeholder="Enter invite code"
								type="text"
								autoComplete="off"
								required
								disabled={isPending}
							/>
						</div>
						<Button type="submit" disabled={isPending}>
							{isPending ? "Creating account..." : "Create account"}
						</Button>
					</div>
				</form>

				<SocialLogin />

				<p className="px-8 text-center text-sm text-muted-foreground">
					Already have an account?{" "}
					<Link href="/login" className="underline underline-offset-4 hover:text-primary">
						Sign in
					</Link>
				</p>
			</div>
		</>
	);
}
