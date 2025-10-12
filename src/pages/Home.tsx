import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabaseClient"

export function Home() {
	useEffect(() => {
		const test = async () => {
			const { data, error } = await supabase.from("users").select("*")
			if (error) console.error("Error:", error.message)
			else console.log("Users:", data)
		}
		test()
	}, [])

	const handleSignUp = async () => {
		const { data, error } = await supabase.auth.signUp({
			email: `john${Date.now()}@gmail.com`,
			password: "12345678",
		})

		if (error) {
			console.error("Signup error:", error.message)
		} else {
			console.log("✅ User created:", data.user)
		}
	}

	return (
		<main>
			<div className="flex flex-col gap-4 items-center">
				<h1>Platforma de Conectare Investitori Startup-uri</h1>

				<Button onClick={handleSignUp} variant="secondary">
					Create test user
				</Button>

				<a href="/about">about</a>
			</div>
		</main>
	)
}
