import { Metadata } from "next";
import Image from "next/image"
import RecordListNotFound from "@/app/image/404.webp"

import styles from './page.module.css';
import chartStyle from '@/app/charts/charts.module.css';
import javaStyles from '@/app/java.module.css';
import UserChartList from "@/components/user-chart-list";

import { JjamTier } from "@/app/utils/enums";
import { getChartsByUser, getUserById, getUserByName } from "@/app/utils/data/user";
import UserLevel from "@/components/user-level/user-level";
import { Chart, ChartLevel, Song, SorryfieldUser, UserJjams } from "@prisma/client";
import { elapsedTime } from "@/app/utils/func";

declare module "next-auth" {
  interface User {
	sorryfieldId?: string;
  }
}

interface Props {
  params: {
	id: string;
  };
}

type JavaUser = SorryfieldUser & {
	UserJjams: UserJjams[];
};

type ChartSong = Chart & {
	Song: Song;
	ChartLevel: ChartLevel[];
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const nickname = decodeURIComponent(params.id);
	const user : JavaUser | null = nickname.startsWith("@") ? await getUserByName(nickname.slice(1)) : await getUserById(params.id);
	if (!user) return { title: 'playJava!' };
	return {
		title: `@${user.name} - playJava!`,
		description: `${user.name}님의 자바! 프로필을 playJava!에서 확인하세요!`
	};
}

export default async function UserInfo({ params }: Props) {
	const nickname = decodeURIComponent(params.id);
	const user : JavaUser | null = nickname.startsWith("@") ? await getUserByName(nickname.slice(1)) : await getUserById(params.id);
	if (!user) return <></>;
	const charts : ChartSong[] = await getChartsByUser(user?.id);
	const chartList: JSX.Element[] = [];
	charts.forEach((chart) => {
		const chartRefStars: JSX.Element[] = [];
		let lvl = 0;
		for(lvl=chart.referenceLevel-30; lvl>0.5; lvl--) {
			chartRefStars.push(<i className={["pi pi-star-fill", styles.Icon].join(' ')} />);
		}
		if (0 < lvl && lvl < 1) { chartRefStars.push(<i className={["pi pi-star-half-fill", styles.Icon].join(' ')} />); }

		let editorLevel: string | number = 0;
		chart.ChartLevel.forEach((level) => {
			if (level.levelType == 'official') {
				editorLevel = level.editorLevel;
			}
		});
		const chartNowStars: JSX.Element[] = [];
		for(lvl=editorLevel-30; lvl>0.5; lvl--) {
			chartNowStars.push(<i className={["pi pi-star-fill", styles.Icon].join(' ')} />);
		}
		if (0 < lvl && lvl < 1) { chartNowStars.push(<i className={["pi pi-star-half-fill", styles.Icon].join(' ')} />); }
		
		chartList.push(
			<a href={`/chart/${chart.id}/${chart.mode}`} className={["w-4/1", styles.resultChart].join(' ')} id={`${chart.id}-${chart.mode}`} key={`${chart.id}-${chart.mode}`}>
				<div className={styles.resultChartLevel}>
					<div className={[javaStyles.level, javaStyles[`level-${Math.round(chart.referenceLevel)}`]].join(' ')}><div className={chartStyle.stars}>{chartRefStars}</div>{Math.round(chart.referenceLevel)}</div>
					<i className={["pi pi-arrow-right", styles.Icon].join(' ')} />
					<div className={[javaStyles.level, javaStyles[`level-${Math.floor(editorLevel) <= 31 ? editorLevel : 31}`]].join(' ')}><div className={chartStyle.stars}>{chartNowStars}</div>{editorLevel == Math.floor(editorLevel) ? editorLevel : `${Math.floor(editorLevel)}`}</div>
				</div>
				<div className={styles.resultChartTitle}>
					<div className={styles.resultChartTitleArtist}>
						{chart.Song.artist}<div className={chartStyle.desc} style={{textAlign: 'left'}}>({chart.Song.subArtist})</div>
					</div>
					{chart.Song.title}
				</div>
				<div className={styles.resultChartMode}>
					<p className={javaStyles[`mode-${chart.mode}`]}>{chart.mode}</p>
					{chart.chartTitle}
				</div>
			</a>
		)
	})
	const recordList: JSX.Element[] = [];
	return (<>
		<div className="flex flex-row items-center gap-3">
			<Image
				src={`https://sorry.daldal.so/media/images/icons/${user?.icon}`}
				alt={`${user?.name}님의 프로필 사진`} width={64} height={64}
				className="rounded-full border-black border shadow-xl bg-black"
			/>
			<div className="flex flex-col gap-2">
				<div className="flex gap-2 items-center">
					<UserLevel userLevel={user?.level ?? 0} />
					<h1>{user?.name}</h1>
				</div>
				<div className="-mt-3 flex flex-row gap-2">
					<p className="text-gray-400">최근 갱신</p>
					<p>{elapsedTime(user.updatedAt.getTime())}</p>
				</div>
			</div>
			<div className="text-xl px-3 py-1 bg-blue-500 rounded-lg border border-blue-700 hover:bg-blue-700 cursor-default transition-all flex flex-row gap-2 items-center">
				<i className="pi pi-refresh" />
				갱신
			</div>
		</div>
		<div className="flex flex-row gap-3">
			<div className="mt-5 h-screen w-1/4">
				<div className="bordered border-gray-700 border-2 w-full bg-gray-600">
					<p className="text-center w-full bg-gray-700 py-2">종합 통계</p>
						<div className="flex flex-row items-center gap-2 m-3">
							<p className="text-left text-sm text-gray-400">최고 짬</p>
							<div className="flex flex-col items-center gap-2">
								<Image src={`https://sorry.daldal.so/media/images/jjam-tiers/jjam-tiers${((user?.UserJjams[0]?.HT ?? 0) + 1).toString().padStart(4,"0")}.png`} alt="짬" width={40} height={30} />
								<label className="-mt-2 text-xs text-gray-400">{JjamTier[`Tier${(user?.UserJjams[0]?.HT ?? 0)}` as keyof typeof JjamTier]}</label>
							</div>
							{user?.UserJjams[0]?.H ? Math.round(user.UserJjams[0].H) : "(없음)"}
						</div>
				</div>
			</div>
			<div className="w-3/4">
				<div className="mt-5 flex flex-row gap-5">
					<div className="bordered border-blue-600 border-2 w-1/3 bg-blue-950">
						<p className="text-center w-full bg-blue-600 py-2 font-bold fontJapanese">串</p>
						<div className="flex flex-row items-center gap-2 m-3">
							<p className="text-left text-sm text-gray-400">짬</p>
							<div className="flex flex-col items-center gap-2">
								<Image src={`https://sorry.daldal.so/media/images/jjam-tiers/jjam-tiers${((user?.UserJjams[0]?.GT ?? 0) + 1).toString().padStart(4,"0")}.png`} alt="짬" width={40} height={30} />
								<label className="-mt-2 text-xs text-gray-400">{JjamTier[`Tier${(user?.UserJjams[0]?.GT ?? 0)}` as keyof typeof JjamTier]}</label>
							</div>
							{user?.UserJjams[0]?.G ? Math.round(user.UserJjams[0].G) : "(없음)"}
						</div>
					</div>
					<div className="bordered border-green-600 border-2 w-1/3 bg-green-950">
						<p className="text-center w-full bg-green-600 py-2 font-bold fontJapanese">本</p>
						<div className="flex flex-row items-center gap-2 m-3">
							<p className="text-left text-sm text-gray-400">짬</p>
							<div className="flex flex-col items-center gap-2">
								<Image src={`https://sorry.daldal.so/media/images/jjam-tiers/jjam-tiers${((user?.UserJjams[0]?.BT ?? 0) + 1).toString().padStart(4,"0")}.png`} alt="짬" width={40} height={30} />
								<label className="-mt-2 text-xs text-gray-400">{JjamTier[`Tier${(user?.UserJjams[0]?.BT ?? 0)}` as keyof typeof JjamTier]}</label>
							</div>
							{user?.UserJjams[0]?.B ? Math.round(user.UserJjams[0].B) : "(없음)"}
						</div>
					</div>
					<div className="bordered border-purple-600 border-2 w-1/3 bg-purple-950">
						<p className="text-center w-full bg-purple-600 py-2 font-bold fontJapanese">雙</p>
						<div className="flex flex-row items-center gap-2 m-3">
							<p className="text-left text-sm text-gray-400">짬</p>
							<div className="flex flex-col items-center gap-2">
								<Image src={`https://sorry.daldal.so/media/images/jjam-tiers/jjam-tiers${((user?.UserJjams[0]?.ST ?? 0) + 1).toString().padStart(4,"0")}.png`} alt="짬" width={40} height={30} />
								<label className="-mt-2 text-xs text-gray-400">{JjamTier[`Tier${(user?.UserJjams[0]?.ST ?? 0)}` as keyof typeof JjamTier]}</label>
							</div>
							{user?.UserJjams[0]?.S ? Math.round(user.UserJjams[0].S) : "(없음)"}
						</div>
					</div>
				</div>
				{chartList.length > 0 && (
					<div className="mt-5 bordered border-blue-500 border-2 w-full bg-blue-950">
						<UserChartList chartList={chartList} />
					</div>
				)}
				{recordList.length <= 0 && (
					<div className="mt-16 flex flex-col items-center">
						<Image src={RecordListNotFound} alt="모레미 울음" width={200} height={200} />
						<p className="text-2xl font-bold">플레이 이력을 찾을 수 없어요.</p>
					</div>
				)}
			</div>
		</div>
	</>)
}

