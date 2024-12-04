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
			where: { id: Number(id) },
			include: { Song: true }
		}) as Song | null

		if (!chart) {
			const javaChart = await fetch(`https://sorry.daldal.so/java?mode=${mode}&id=${Number(id)}`);
			const chartData = JSON.parse((await javaChart.text()).split('window.__PROPS=')[1].split('</script>')[0]).data.chart;
			
			let user = await prisma.sorryfieldUser.findUnique({ where: { id: chartData.userId }, });
			if (!user) {
				user = await prisma.sorryfieldUser.create({
					data: {
						id: chartData.userId,
						name: chartData.userName,
					},
				});
			}

			const song = await prisma.song.findUnique({ where: { id: chartData.songId }, });
			if (!song) { await fetch(`http://localhost:3000/api/proxy/sorryfield/song/${chartData.songId}`); }

			const chart = await prisma.chart.create({
				data: {
					id: chartData.id,
					songId: chartData.songId,
					chartTitle: chartData.data.title,
					mode: mode,
					userId: user.id,
					referenceLevel: chartData.level[mode]
				},
			});
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