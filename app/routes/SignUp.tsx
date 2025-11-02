import { Form, redirect, useActionData } from "react-router"
import { createUser } from "../DAL/commands/users"
import type { Route } from "./+types/SignUp"
import { createSupabaseServerClient } from "~/lib/supabaseClient";

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const email: string = formData.get("email") as string;
    const password = formData.get("password") as string;
    const userType = formData.get("userType") as "startup" | "investor";

    const { supabase, headers } = createSupabaseServerClient(request);

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: undefined },
    });

    if (error) return { error: error.message };

    const user = data.user;
    if (!user) return { error: "No user returned from Supabase" };

    await createUser(user.id, email, userType);

    return redirect("/", { headers });
}

export default function Signup() {
    const actionData = useActionData<typeof action>()

    return (
        <main className="flex flex-col gap-4 items-center mt-10">
            <h1 className="text-xl font-semibold">Sign Up</h1>

            <Form method="post" className="flex flex-col gap-3 w-64">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="border rounded px-3 py-2"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    className="border rounded px-3 py-2"
                />
                <select name="userType" className="border rounded px-3 py-2" required>
                    <option value="startup">Startup</option>
                    <option value="investor">Investor</option>
                </select>

                {actionData?.error && <p className="text-red-500 text-sm">{actionData.error}</p>}

                <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
                    Sign Up
                </button>
                <a href="/login">
                    Already have an account? Login
                </a>
            </Form>
        </main>
    )
}
