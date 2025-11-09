import { Form, useLoaderData } from "react-router";
import type { Route } from "./+types/Dashboard";
import { getAuthenticatedUser } from "~/DAL/queries/auth";
import { logoutUser } from "~/DAL/commands/auth";

export async function loader({ request }: Route.LoaderArgs) {
    const { email, userType } = await getAuthenticatedUser(request);
    return { email, userType };
}

export async function action({ request }: Route.ActionArgs) {
    return logoutUser(request);
}

export default function Dashboard() {
    const { email, userType } = useLoaderData<typeof loader>();

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mt-4 text-lg text-gray-700">
                Welcome, <span className="font-semibold">{email}</span> ({userType})
            </p>

            <Form method="post" className="mt-6">
                <button
                    type="submit"
                    className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </Form>
        </div>
    );
}
