import { PrismaClient, Song } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()
export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ id: number, mode: '串' | '本' | '雙' }> }
) {
	const { id, mode } = (await params);
	const { tag } = await req.json();

	if (!id || Array.isArray(id)) {
		return new NextResponse(JSON.stringify({
			message: "invalid ID"
		}), {
			status: 400
		})
	}

	try {
		const tagResult = await prisma.chartTags.upsert({
			where: { id_mode_tag: { id: Number(id), mode: mode, tag: tag } },
			update: {
				tag: tag
			},
			create: {
				id: Number(id),
				mode: mode,
				tag: tag
			}
		}) as unknown as Song | null
		
		return new NextResponse(JSON.stringify(
			tagResult
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