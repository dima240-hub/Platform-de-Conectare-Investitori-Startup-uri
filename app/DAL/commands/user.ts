import { prisma } from "../../lib/prisma"

/** 
 * Creates a new user in the database.
 * @param {string} userId The unique identifier for the user (from Supabase).
 * @param {string} email The email of the user.
 * @param {"startup" | "investor"} userType The type of the user.
 * @returns The created user record.
 */

export async function createUser(userId: string, email: string, userType: "startup" | "investor") {
	return await prisma.users.create({
		data: {
			id: userId,
			email,
			user_type: userType,
		},
	})
}
