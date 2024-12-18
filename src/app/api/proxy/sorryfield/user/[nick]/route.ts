import { PrismaClient, SorryfieldUser } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()
export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ nick: string }> }
) {
	const nick = (await params).nick

	try {
		const sorryfield = await fetch(`https://sorry.daldal.so/java/studio/${nick}`, {cache: 'no-cache'});
		const userData = JSON.parse((await sorryfield.text()).split('window.__PROPS=')[1].split('</script>')[0]);
		const user = await prisma.sorryfieldUser.upsert({
			where: { id: userData.data.userId },
			create: {
				id: userData.data.userId,
				name: userData.data.name,
				icon: userData.data.studioSettings.icon,
				level: userData.data.level
			},
			update: {
				name: userData.data.name,
				icon: userData.data.studioSettings.icon,
				level: userData.data.level
			},
		});

		return new NextResponse(JSON.stringify(
			{ user: user, placements: userData.data.placements }
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