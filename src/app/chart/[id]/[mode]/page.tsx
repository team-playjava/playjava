import styles from '@/app/chart/[id]/[mode]/chart.module.css';
import javaStyles from '@/app/java.module.css';
import { fetchChart, fetchSong } from '@/app/utils/data/sorryfield';
import ChartTop from '@/components/chart-top';
import { Chart, Song } from '@prisma/client';
import type { Metadata } from 'next';

type Props = {
	params: {
		id: string;
		mode: "串" | "本" | "雙";
	};
};

type ChartSong = Chart & {
	Song: Song;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const chart : ChartSong = await fetchChart(params.id, params.mode);
	const chartTitle = chart.Song.title; const chartName = chart.chartTitle
	const nowMode: string = decodeURIComponent(Array.isArray(chart.mode) ? chart.mode[0] : chart.mode);

	return {
		title: `${chartTitle} ${nowMode} ${chartName} - playJava!`
	};
}

export default async function Page({ params }: Props) {
	const chart : ChartSong = await fetchChart(params.id, params.mode);
	const chartTitle = chart.Song.title; const chartSubTitle = chart.Song.subTitle; const chartName = chart.chartTitle
	const nowMode: string = decodeURIComponent(Array.isArray(chart.mode) ? chart.mode[0] : chart.mode);
	return (
		<>
			<ChartTop nowMode={nowMode} />
			<div className={styles.pageTop}>
				<h1 className={styles.pageTopTitle}>{chartTitle}</h1>
				<p>{chartSubTitle}</p>
			</div>
			<div className={styles.pageBody}>
				<div className={styles.chartInfo}>
					<a className={styles.chartInfoTag} href={`https://sorry.daldal.so/java?mode=${params.mode}&id=${params.id}`} target="_blank"><div className={javaStyles[`mode-${chart.mode}`]}>{nowMode}</div>{chartName}<i className="pi pi-external-link"/></a>
					<div className={[styles.chartDifficulty].join(' ')}>
						<div className={[javaStyles.level, javaStyles[`level-31`]].join(' ')} data-level={`31`}><div className={styles.stars}><i className="pi pi-star-half-fill"/></div>31</div>
						<i className={[styles.fontAwesomeIcon, "pi pi-arrow-right"].join(' ')} />
						<div className={[javaStyles.level, javaStyles[`level-31`]].join(' ')} data-level={`32`}><div className={styles.stars}><i className="pi pi-star-fill"/><i className="pi pi-star-fill"/></div>32</div>
					</div>
					<div className={styles.chartTag}>
						<a className={styles.chartTagItem} href="/charts/tag/가나다라"><i className="pi pi-hashtag"/><label>가나다라</label></a>
						<a className={styles.chartTagItem} href="/charts/tag/마법사"><i className="pi pi-hashtag"/><label style={{color: '#ff3f2e'}}>마법사</label></a>
					</div>
				</div>
			</div>
		</>
	)
}