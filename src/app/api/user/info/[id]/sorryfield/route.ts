import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()
export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = (await params);

	try {
		const user = await prisma.sorryfieldUser.findUnique({
			where: { id: id },
			include: { UserJjams: true }
		})
		return new NextResponse(JSON.stringify(
			user
		), {
			status: 200
		})
	} catch (error: unknown) {
		const errorMessage = error instanceof Error ? error.message : 'Internal server error';
		console.log(errorMessage)
		return new NextResponse(JSON.stringify({
			message: errorMessage
		}), {
			status: 500
		})
	} finally {
		await prisma.$disconnect()
	}
}