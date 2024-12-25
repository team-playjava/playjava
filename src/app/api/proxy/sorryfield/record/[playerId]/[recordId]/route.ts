import { Chart, ChartLevel, PlayRecords, PrismaClient, Song } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

type RecordChart = PlayRecords & {
	Song: Song
	Chart: Chart & {
		ChartLevel: ChartLevel
	}
}

const prisma = new PrismaClient()
export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ playerId: string, recordId: string }> }
) {
	const { playerId, recordId } = (await params);

	try {
		const record = await prisma.playRecords.findUnique({
			where: { id: parseInt(recordId) },
			include: { Song: true, Chart: { include: { ChartLevel: true } } }
		}) as unknown as RecordChart

		if (!record) {
			const javaRecord = await fetch(`https://sorry.daldal.so/java/record/${playerId}/${parseInt(recordId)}`);
			if (javaRecord.status !== 200) {
				console.log(await javaRecord.text());
				return new NextResponse(JSON.stringify({
					message: await javaRecord.text()
				}), {
					status: javaRecord.status
				})
			}
			const recordData = JSON.parse((await javaRecord.text()).split('window.__PROPS=')[1].split('</script>')[0]).data;
			
			const song = await prisma.song.findUnique({ where: { id: recordData.chart.songId }, });
			if (!song) { await fetch(`http://localhost:3000/api/proxy/sorryfield/song/${recordData.chart.songId}`); }

			const chart = await prisma.chart.findUnique({ where: { id_mode: { id: recordData.chart.id, mode: recordData.chart.mode } }, });
			if (!chart) {
				await prisma.chart.create({
					data: {
						id: recordData.chart.id,
						songId: recordData.chart.songId,
						chartTitle: recordData.chart.data.title,
						mode: recordData.chart.mode,
						userId: recordData.chart.userId,
						referenceLevel: recordData.chart.level[recordData.chart.mode]
					},
				});
			}
			const chartData = recordData.chart,
				  resultData = recordData.result,
				  playData = recordData.playData,
				  judge = resultData.decisions,
				  advantage = recordData.playData.advantageOptions;

			const recordRes = await prisma.playRecords.create({
				data: {
					id: parseInt(recordId),
					songId: chartData.songId, chartId: chartData.id,
					mode: chartData.mode, userId: recordData.player.id,

					accuracy: resultData.accuracy,
					accuracyBonus: resultData.totalAccuracy-resultData.accuracy,
					score: resultData.score, grade: resultData.grade,

					judge_perfect: judge[5], judge_great: judge[4], judge_good: judge[3],
					judge_bad: judge[2], judge_miss: judge[1],
					
					advantage_rateNarrow: advantage.decisionNarrowing,
					advantage_noteSpeed: advantage.noteSpeed,
					advantage_transparency: advantage.transparency,

					playDate: new Date(recordData.date),
					revision: playData.chartRevision,
				},
			});
			return new NextResponse(JSON.stringify(
				recordRes
			), {
				status: 200
			})
		}
		return new NextResponse(JSON.stringify(
			record
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