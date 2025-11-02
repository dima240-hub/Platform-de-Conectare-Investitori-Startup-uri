import { prisma } from "../../lib/prisma"

export async function createUser(userId: string, email: string, userType: "startup" | "investor") {
	return await prisma.users.create({
		data: {
			id: userId,
			email,
			user_type: userType,
		},
	})
}
