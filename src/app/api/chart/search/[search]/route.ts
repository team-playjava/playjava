import { PrismaClient, Song } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()
export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ search: string }> }
) {
	const { search } = (await params);

	try {
		const chart = await prisma.chart.findMany({
			where: {
				OR: [
					{ Song: { title: { contains: search } } },
					{ Song: { subTitle: { contains: search } } }
				]
			},
			include: { Song: true, ChartLevel: true }
		}) as unknown as Song | null

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