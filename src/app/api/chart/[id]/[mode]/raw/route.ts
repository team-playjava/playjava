import { PrismaClient, Song } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()
export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: number, mode: '串' | '本' | '雙' }> }
) {
	const { id, mode } = (await params);

	if (!id || Array.isArray(id)) {
		return new NextResponse(JSON.stringify({
            message: "invalid ID"
        }), {
			status: 400
		})
	}

	try {
		const chart = await prisma.chartRaw.findUnique({
			where: { id_mode: { id: Number(id), mode: mode } }
		})

		if (!chart) {
			return new NextResponse(JSON.stringify({
				message: "Not found"
			}), {
				status: 404
			})
		}
		return new NextResponse(JSON.stringify(
			chart
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

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ id: number, mode: '串' | '本' | '雙' }> }
) {
	const { id, mode } = (await params);
	const { level, levelType } = await req.json();

	if (!id || Array.isArray(id)) {
		return new NextResponse(JSON.stringify({
            message: "invalid ID"
        }), {
			status: 400
		})
	}

	try {
		const chart = await prisma.chartLevel.upsert({
			where: { id_mode_levelType: { id: Number(id), mode: mode, levelType: levelType } },
			update: {
				editorLevel: level
			},
			create: {
				id: Number(id),
				mode: mode,
				editorLevel: level,
				levelType: levelType
			}
		}) as unknown as Song | null
		
		return new NextResponse(JSON.stringify(
			chart
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