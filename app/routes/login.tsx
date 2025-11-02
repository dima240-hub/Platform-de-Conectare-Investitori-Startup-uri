import { Form, redirect, useActionData } from "react-router";
import type { Route } from "./+types/Login";
import { createSupabaseServerClient } from "~/lib/supabaseClient";

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");

	if (typeof email !== "string" || typeof password !== "string") {
		return { error: "Invalid form submission" };
	}

	const { supabase, headers } = createSupabaseServerClient(request);

	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) return { error: error.message };

	const session = data.session;
	if (!session) return { error: "No session returned" };

	return redirect("/", { headers });
}

export default function Login() {
	const actionData = useActionData();

	return (
		<main className="flex flex-col gap-4 items-center mt-10">
			<h1 className="text-xl font-semibold">Login</h1>
			<Form method="post" className="flex flex-col gap-3 w-64">
				<input name="email" type="email" placeholder="Email" required className="border rounded px-3 py-2" />
				<input name="password" type="password" placeholder="Password" required className="border rounded px-3 py-2" />
				{actionData?.error && <p className="text-red-500 text-sm">{actionData.error}</p>}
				<button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
					Login
				</button>
			</Form>
			<a href="/signup" className="text-blue-600 hover:underline">Don't have an account? Sign Up</a>
		</main>
	);
}
