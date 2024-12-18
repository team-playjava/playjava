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

export const getUserById = async function (id: string) {
	const prisma = new PrismaClient()
	const user = await prisma.sorryfieldUser.findUnique({
		where: {
			id: id
		}
	});
	return user;
}

export const getUserByName = async function (name: string) {
	const prisma = new PrismaClient()
	const user = await prisma.sorryfieldUser.findUnique({
		where: {
			name: name
		}
	});
	return user;
}
