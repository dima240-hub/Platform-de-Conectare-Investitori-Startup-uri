import { redirect } from "react-router";
import { createSupabaseServerClient } from "~/lib/supabaseClient";
import { getUserById } from "./users";


// From what I read, this shouldn't be placed in the queries folder, but rather in a service or auth folder.
// because it involves authentication logic rather than just data retrieval.
// it is not a pure data query since it handles user authentication and redirection.

export async function getAuthenticatedUser(request: Request) {
  const { supabase, headers } = createSupabaseServerClient(request);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.warn("No user found:", userError?.message);
    throw redirect("/login", { headers });
  }

  const dbUser = await getUserById(user.id);

  return {
    email: dbUser?.email ?? user.email,
    userType: dbUser?.user_type ?? "unknown",
    headers,
  };
}   