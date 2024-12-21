import { PrismaClient, Song } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()
export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: number }> }
) {
	const id = (await params).id

	if (!id || Array.isArray(id)) {
		return new NextResponse(JSON.stringify({
			message: "invalid ID"
		}), {
			status: 400
		})
	}

	try {
		const song = await prisma.song.findUnique({
			where: { id: Number(id) },
		}) as Song | null

		if (!song) {
			const sorryfield = await fetch(`https://sorry.daldal.so/song/${Number(id)}`);
			const songData = JSON.parse((await sorryfield.text()).split('window.__PROPS=')[1].split('</script>')[0]).data.song;

			const song = await prisma.song.create({
				data: {
					id: Number(id),
					locale: songData.locale,
					title: songData.title,
					subTitle: songData.subtitle,
					artist: songData.artistTitle,
					artistSub: songData.artistSubtitle,
					subArtist: songData.artistSecondaryTitle,
					gender: songData.gender,
					key: songData.key,
					trebleModal: songData.highestVoice,
					trebleFalsetto: songData.highestFalsetto,
					youtubeKaraoke: songData.youtubeBack,
					youtubeOriginal: songData.youtubeFront,
					karaokeTJ: songData.karaokeData.tj,
					karaokeKY: songData.karaokeData.ky,
					karaokeJS: songData.karaokeData.js,
				},
			});

			return new NextResponse(JSON.stringify(
				song
			), {
				status: 200
			})
		}
		return new NextResponse(JSON.stringify(
			song
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