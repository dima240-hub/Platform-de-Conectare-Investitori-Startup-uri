import { createBrowserRouter, type RouteObject, RouterProvider } from "react-router-dom"
import { AppLayout } from "@/layouts/AppLayout"
import { Home } from "@/pages/Home"
import { ROUTE } from "./constants"
import Login from "./pages/Login"
import Register from "./pages/Register"

const routes: RouteObject[] = [
	{
		path: ROUTE.home,
		element: <AppLayout />,
		errorElement: <></>,
		children: [
			{ path: ROUTE.home, element: <Home /> },
			{ path: ROUTE.register, element: <Register /> },
			{ path: ROUTE.login, element: <Login /> },
		],
	},
]

export function Router() {
	const router = createBrowserRouter(routes, {
		basename: "",
	})

	return <RouterProvider router={router} />
}

export default Router
