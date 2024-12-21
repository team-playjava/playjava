import styles from '@/app/chart/[id]/[mode]/chart.module.css';
import javaStyles from '@/app/java.module.css';
import { fetchChart } from '@/app/utils/data/sorryfield';
import ChartTop from '@/components/chart-top';
import { Chart, ChartLevel, ChartTags, Song } from '@prisma/client';
import type { Metadata } from 'next';

type Props = {
	params: {
		id: string;
		mode: "串" | "本" | "雙";
	};
};

type ChartSong = Chart & {
	Song: Song;
	ChartLevel: ChartLevel[];
	ChartTags: ChartTags[];
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const chart : ChartSong = await fetchChart(params.id, params.mode);
	if(!chart.Song) return { title: 'playJava!' };
	const chartTitle = chart.Song.title; const chartName = chart.chartTitle
	const nowMode: string = decodeURIComponent(Array.isArray(chart.mode) ? chart.mode[0] : chart.mode);

	return {
		title: `${chartTitle} ${nowMode} ${chartName} - playJava!`
	};
}

export default async function Page({ params }: Props) {
	const chart : ChartSong = await fetchChart(params.id, params.mode);
	if(!chart.Song) return <></>;
	const chartTitle = chart.Song.title; const chartSubTitle = chart.Song.subTitle; const chartName = chart.chartTitle
	const nowMode: string = decodeURIComponent(Array.isArray(chart.mode) ? chart.mode[0] : chart.mode);
	const chartRefStars: JSX.Element[] = [];
	let lvl = 0;
	for(lvl=chart.referenceLevel-30; lvl>0.5; lvl--) {
		chartRefStars.push(<i key="star" className="pi pi-star-fill" />);
	}
	if (0 < lvl && lvl < 1) { chartRefStars.push(<i key="star" className="pi pi-star-half-fill" />); }

	let editorLevel: string | number = 0;
	chart.ChartLevel.forEach((level) => {
		if (level.levelType == 'official') {
			editorLevel = level.editorLevel;
		}
	});
	const chartNowStars: JSX.Element[] = [];
	for(lvl=editorLevel-30; lvl>0.5; lvl--) {
		chartNowStars.push(<i key="star" className="pi pi-star-fill" />);
	}
	if (0 < lvl && lvl < 1) { chartNowStars.push(<i key="star" className="pi pi-star-half-fill" />) }

	const chartTags: JSX.Element[] = [];
	chart.ChartTags.forEach((tag) => {
		chartTags.push(
			<a className={styles.chartTagItem} href={`/charts/tag/${tag.tag.replace("#", "")}`} key={`tag-${tag.tag.replace("#", "")}`}><i className="pi pi-hashtag"/><label style={{color: tag.color ?? ''}}>{tag.tag.replace("#", "")}</label></a>
		);
	});
	return (
		<>
			<ChartTop nowMode={nowMode} />
			<div className={styles.pageTop}>
				<h1 className={styles.pageTopTitle}>{chartTitle}</h1>
				<p>({chartSubTitle})</p>
			</div>
			<div className={styles.pageBody}>
				<div className={styles.chartInfo}>
					<a className={styles.chartInfoTag} href={`https://sorry.daldal.so/java?mode=${params.mode}&id=${params.id}`} target="_blank"><div className={javaStyles[`mode-${chart.mode}`]}>{nowMode}</div>{chartName}<i className="pi pi-external-link"/></a>
					<div className={[styles.chartDifficulty].join(' ')}>
						<div className={[javaStyles.level, javaStyles[`level-${Math.round(chart.referenceLevel) <= 31 ? Math.round(chart.referenceLevel) : 31}`]].join(' ')}><div className={styles.stars}>{chartRefStars}</div>{Math.round(chart.referenceLevel)}</div>
						<i className={[styles.fontAwesomeIcon, "pi pi-arrow-right"].join(' ')} />
						<div className={[javaStyles.level, javaStyles[`level-${Math.floor(editorLevel) <= 31 ? Math.floor(editorLevel) : 31}`]].join(' ')}><div className={styles.stars}>{chartNowStars}</div>{editorLevel == Math.floor(editorLevel) ? editorLevel : `${Math.floor(editorLevel)}`}</div>
					</div>
					{chart.playVideo && (
						<div className={styles.chartVideo}>
							<a
								href={chart.playVideo} target="_blank" rel="noopener noreferrer"
								className='bg-white px-4 py-2 rounded-xl mr-2 flex items-center hover:bg-gray-300 transition-all hover:-mt-1'
							>
								<i className="pi pi-youtube text-3xl text-red-600" />
							</a>
						</div>
					)}
					<div className={styles.chartTag}>
						{chartTags}
					</div>
				</div>
			</div>
		</>
	)
}