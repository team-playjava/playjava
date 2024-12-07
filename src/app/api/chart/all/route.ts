import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()
export async function GET() {
	try {
		const chart = await prisma.chart.findMany({
			include: { Song: true, ChartLevel: true }
		})
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