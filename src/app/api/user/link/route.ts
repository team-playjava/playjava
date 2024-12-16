import { PrismaClient, Song } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()
export async function POST(
	req: NextRequest
) {
	const data = await req.json()

	try {
		const user = await prisma.user.update({
			where: { id: data.id },
			data: {
				sorryfieldId: data.sorryfield
			}
		});

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