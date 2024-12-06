"use server"
import { PrismaClient } from "@prisma/client"

export const getPermission = async function (email: string) {
	const prisma = new PrismaClient()
	const permission = await prisma.user.findUnique({
		where: {
			email: email
		}
	});
	return permission?.permission;
}