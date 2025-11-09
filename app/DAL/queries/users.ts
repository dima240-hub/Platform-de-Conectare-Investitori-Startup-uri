import { cache } from "react";
import { prisma } from "../../lib/prisma";

/**
 * Retrieves a user from the database by their email.
 * @param {string} email The email of the user to retrieve.
 * @returns The user record if found, otherwise null.
 */
export const getUserByEmail = cache(async (email: string) => {
  return await prisma.users.findUnique({
    where: { email },
  });
});

/**
 * Retrieves a user from the database by their ID.
 * @param {string} id The ID of the user to retrieve.
 * @returns The user record if found, otherwise null.
 */
export const getUserById = cache(async (id: string) => {
  return await prisma.users.findUnique({
    where: { id },
  });
});
