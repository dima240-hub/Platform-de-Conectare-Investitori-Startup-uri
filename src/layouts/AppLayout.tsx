import { Outlet } from "react-router-dom"

export function AppLayout() {
	return (
		<div className="min-h-screen bg-amber-100 text-black flex items-center justify-center">
			<Outlet />
		</div>
	)
}
