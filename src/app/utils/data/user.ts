"use server"
import { PrismaClient } from "@prisma/client"

export const getUserById = async function (id: string) {
	const prisma = new PrismaClient()
	const user = await prisma.sorryfieldUser.findUnique({
		where: { id: id },
		include: { UserJjams: true }
	});
	return user;
}

export const getUserByName = async function (name: string) {
	const prisma = new PrismaClient()
	const user = await prisma.sorryfieldUser.findUnique({
		where: { name: name },
		include: { UserJjams: true }
	});
	if(!user) await fetch(`http://localhost:3000/api/proxy/sorryfield/user/${decodeURIComponent(name).slice(2)}`);
	return user;
}

export const getChartsByUser = async function (id: string) {
	const prisma = new PrismaClient()
	const charts = await prisma.chart.findMany({
		where: { userId: id },
		include: { Song: true, ChartLevel: true }
	});
	return charts;
}