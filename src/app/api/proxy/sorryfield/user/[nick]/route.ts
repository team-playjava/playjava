import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()
export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ nick: string }> }
) {
	const nick = (await params).nick

	try {
		let jjams: {
			串?: { score: number, tier: number } | null,
			本?: { score: number, tier: number } | null,
			雙?: { score: number, tier: number } | null
		} = { 串: null, 本: null, 雙: null };
		const modes = ['串', '本', '雙'];
		modes.forEach(async (nowMode) => {
			const rankingData = await fetch(`https://sorry.daldal.so/java/ranking?mode=${nowMode}`, {cache: 'no-cache'});
			const jjamData = JSON.parse((await rankingData.text()).split('window.__PROPS=')[1].split('</script>')[0]);
			jjamData.data.list.forEach((data: {
				name: string;
				jjams: {
					串?: { score: number; tier: number } | null;
					本?: { score: number; tier: number } | null;
					雙?: { score: number; tier: number } | null;
				};
			}) => {
				if (data.name === nick) {
					jjams = data.jjams;
				}
			});
		});
		const sorryfield = await fetch(`https://sorry.daldal.so/java/studio/${nick}`, {cache: 'no-cache'});
		const userData = JSON.parse((await sorryfield.text()).split('window.__PROPS=')[1].split('</script>')[0]);
		const user = await prisma.sorryfieldUser.upsert({
			where: { id: userData.data.userId },
			create: {
				id: userData.data.userId,
				name: userData.data.name,
				icon: userData.data.studioSettings.icon,
				level: userData.data.level,
			},
			update: {
				name: userData.data.name,
				icon: userData.data.studioSettings.icon,
				level: userData.data.level,
			},
		});
		const jjam = await prisma.userJjams.upsert({
			where: { id: userData.data.userId },
			create: {
				id: userData.data.userId,
				G: jjams['串']?.score, GT: jjams['串']?.tier,
				B: jjams['本']?.score, BT: jjams['本']?.tier,
				S: jjams['雙']?.score, ST: jjams['雙']?.tier,
				H: Math.max(jjams['串']?.score ?? 0, jjams['本']?.score ?? 0, jjams['雙']?.score ?? 0),
				HT: Math.max(jjams['串']?.tier ?? 0, jjams['本']?.tier ?? 0, jjams['雙']?.tier ?? 0),
			},
			update: {
				G: jjams['串']?.score, GT: jjams['串']?.tier,
				B: jjams['本']?.score, BT: jjams['本']?.tier,
				S: jjams['雙']?.score, ST: jjams['雙']?.tier,
				H: Math.max(jjams['串']?.score ?? 0, jjams['本']?.score ?? 0, jjams['雙']?.score ?? 0),
				HT: Math.max(jjams['串']?.tier ?? 0, jjams['本']?.tier ?? 0, jjams['雙']?.tier ?? 0),
			},
		});

		return new NextResponse(JSON.stringify(
			{ user: user, jjams: jjam, placements: userData.data.placements }
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