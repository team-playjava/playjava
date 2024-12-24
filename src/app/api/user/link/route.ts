import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'

const prisma = new PrismaClient()

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN as string);

export async function POST(
	req: NextRequest
) {
	const { data } = await req.json()

	try {
		const user = await prisma.user.update({
			where: { id: data.id },
			data: {
				sorryfieldId: data.sorryfield
			}
		});

		const account = await prisma.account.findFirst({
			where: { userId: user.id }
		})

		await rest.put(Routes.guildMemberRole('1162778955884011663', account?.providerAccountId as string, '1297480308614103070'))
		
		return new NextResponse(JSON.stringify(
			{ user: user }
		), {
			status: 200
		})
	} catch (error: unknown) {
		const errorMessage = error instanceof Error ? error.message : 'Internal server error';
		return new NextResponse(JSON.stringify({
			message: errorMessage
		}), {
			status: 500
		})
	} finally {
		await prisma.$disconnect()
	}
}