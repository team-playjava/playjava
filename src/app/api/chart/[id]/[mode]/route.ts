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
		const chart = await prisma.chart.findUnique({
			where: { id: Number(id), mode: mode },
			include: { Song: true, ChartLevel: true }
		}) as Song | null

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
		return new NextResponse(JSON.stringify({
            message: errorMessage
        }), {
			status: 500
		})
	} finally {
		await prisma.$disconnect()
	}
}


export async function MODIFY(
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
		const chart = await prisma.chartLevel.update({
			where: { id_mode: { id: Number(id), mode: mode }, levelType: levelType },
			data: {
				editorLevel: level
			}
		}) as unknown as Song | null

		if (!chart) {
			const chart = await prisma.chartLevel.create({
				data: {
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
		}
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