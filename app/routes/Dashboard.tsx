import { redirect, useLoaderData } from "react-router";
import type { Route } from "./+types/Dashboard";
import { getUserById } from "~/DAL/queries/users";
import { createSupabaseServerClient } from "~/lib/supabaseClient";

export async function loader({ request }: Route.LoaderArgs) {
    const { supabase, headers } = createSupabaseServerClient(request);

    const {
        data: { session },
        error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
        console.warn("No session found:", sessionError?.message);
        throw redirect("/login", { headers });
    }

    const user = session.user;
    if (!user) {
        console.warn("No user found in session");
        throw redirect("/login", { headers });
    }

    const dbUser = await getUserById(user.id);

    return {
        email: dbUser?.email ?? user.email,
        userType: dbUser?.user_type ?? "unknown",
    };
}

export default function Dashboard() {
    const { email, userType } = useLoaderData<typeof loader>();

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mt-4 text-lg text-gray-700">
                Welcome, <span className="font-semibold">{email}</span> ({userType})
            </p>
        </div>
    );
}
