import { Form, useActionData } from "react-router"
import type { Route } from "./+types/SignUp"
import { signUp } from "~/DAL/commands/auth";

export async function action({ request }: Route.ActionArgs) {
    return signUp(request);
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
