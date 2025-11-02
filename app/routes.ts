import { index, type RouteConfig, route } from "@react-router/dev/routes"

export default [
	index("./routes/Dashboard.tsx"),

	route("login", "./routes/Login.tsx"),
	route("signup", "./routes/SignUp.tsx"),

] satisfies RouteConfig
