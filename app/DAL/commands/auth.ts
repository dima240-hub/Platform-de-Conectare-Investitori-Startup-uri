import { redirect } from "react-router";
import { createSupabaseServerClient } from "~/lib/supabaseClient";
import { createUser } from "./user";




/**
 * Handles user login by verifying credentials with Supabase.
 * @param {Request} request The incoming request containing login form data. 
 * @returns On success, redirects to home page. On failure, returns an error message. 
 */

export async function login(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Invalid form submission" };
  }

  const { supabase, headers } = createSupabaseServerClient(request);
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: error.message };
  if (!data.session) return { error: "No session returned" };

  return redirect("/", { headers });
}

/** * Handles user sign-up by creating a new account with Supabase and storing user details in the database.
 * @param {Request} request The incoming request containing sign-up form data.
 * @returns On success, redirects to home page. On failure, returns an error message.
 */
export async function signUp(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
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

/**
 *  Logs out the authenticated user by terminating their session with Supabase.
 * @param request 
 * @returns  Redirects to the login page after logout.
 */

export async function logoutUser(request: Request) {
  const { supabase, headers } = createSupabaseServerClient(request);

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Logout error:", error.message);
  }

  // Clear session cookies and redirect to login
  return redirect("/login", { headers });
}
