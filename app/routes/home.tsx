import { useLoaderData } from "react-router";
import { prisma } from "../lib/prisma"; // ✅ Import Prisma here
import type { Route } from "./+types/home";
import { Button } from "../components/ui/button";
import { supabase } from "../lib/supabaseClient";

export function meta(_: Route.MetaArgs) {
	return [
		{ title: "Investitori & Startup-uri" },
		{ name: "description", content: "Platforma de conectare investitori și startup-uri" },
	];
}

// ✅ Loader runs only on the server
export async function loader({ params, request }: Route.LoaderArgs) {
	console.log("Incoming request", request.url);

	// Example using Prisma to query your database
	const users = await prisma.public_users.findMany({
		include: { investor_profiles: true, startup_profiles: true },
	});

	return { users };
}

export default function Home() {
	const { users } = useLoaderData<typeof loader>();

	const handleSignUp = async () => {
		const { data, error } = await supabase.auth.signUp({
			email: `john${Date.now()}@gmail.com`,
			password: "12345678",
		});

		if (error) console.error("Signup error:", error.message);
		else console.log("✅ User created:", data.user);
	};

	return (
		<main>
			<div className="flex flex-col gap-4 items-center">
				<h1>Platforma de Conectare Investitori Startup-uri</h1>
				<Button onClick={handleSignUp} variant="secondary">
					Create test user
				</Button>

				<div className="mt-6">
					<h2 className="font-semibold">Users from Prisma:</h2>
					<ul>
						{users.map((user) => (
							<li key={user.id}>{user.email}</li>
						))}
					</ul>
				</div>
			</div>
		</main>
	);
}
