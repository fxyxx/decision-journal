"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { loginSchema, registerSchema } from "@/lib/schemas/auth";
import { AuthState } from "@/types/auth";

export async function login(_: AuthState, formData: FormData): Promise<AuthState> {
	const rawData = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const result = loginSchema.safeParse(rawData);

	if (!result.success) {
		return {
			errors: result.error.issues.map((e) => e.message),
			success: false,
		};
	}

	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithPassword({
		email: result.data.email,
		password: result.data.password,
	});

	if (error) {
		return {
			errors: [error.message],
			success: false,
		};
	}

	redirect("/");
}

export async function register(_: AuthState, formData: FormData): Promise<AuthState> {
	const rawData = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
		confirmPassword: formData.get("confirmPassword") as string,
		inviteCode: formData.get("inviteCode") as string,
	};

	const result = registerSchema.safeParse(rawData);

	if (!result.success) {
		return {
			errors: result.error.issues.map((e) => e.message),
			success: false,
		};
	}

	const validInviteCode = process.env.INVITE_CODE;

	if (!validInviteCode || result.data.inviteCode !== validInviteCode) {
		return {
			errors: ["Invalid invite code"],
			success: false,
		};
	}

	const supabase = await createClient();

	const { error } = await supabase.auth.signUp({
		email: result.data.email,
		password: result.data.password,
	});

	if (error) {
		return {
			errors: [error.message],
			success: false,
		};
	}

	redirect("/");
}

export async function logout() {
	const supabase = await createClient();
	await supabase.auth.signOut();
	redirect("/login");
}
