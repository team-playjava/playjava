"use client";
import styles from './page.module.css';
import chartStyle from './charts/charts.module.css';
import javaStyles from './java.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowRight, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { searchChart } from '@/app/utils/data/sorryfield';
import { Chart, ChartLevel, Song } from '@prisma/client';

type ChartSong = Chart & {
	Song: Song;
	ChartLevel: ChartLevel[];
};


function RootComponent() {
	const [isSearching, setSearching] = useState<boolean>(false);
	const [charts, setCharts] = useState<JSX.Element[] | null>(null);

	const chartList: JSX.Element[] = [];
	const search = async (search: string) => {
		chartList.splice(0);
		const result: ChartSong[] = await searchChart(search ?? '');
		console.log(result);
		result.forEach(chart => {
			const chartRefStars: JSX.Element[] = [];
			let lvl = 0;
			for(lvl=chart.referenceLevel-30; lvl>0.5; lvl--) {
				chartRefStars.push(<FontAwesomeIcon icon={faStar} />);
			}
			if (0 < lvl && lvl < 1) { chartRefStars.push(<FontAwesomeIcon icon={faStarHalf} />); }

			let editorLevel: string | number = 0;
			chart.ChartLevel.forEach((level) => {
				if (level.levelType == 'official') {
					editorLevel = level.editorLevel;
				}
			});
			const chartNowStars: JSX.Element[] = [];
			for(lvl=editorLevel-30; lvl>0.5; lvl--) {
				chartNowStars.push(<FontAwesomeIcon icon={faStar} />);
			}
			if (0 < lvl && lvl < 1) { chartNowStars.push(<FontAwesomeIcon icon={faStarHalf} />) }
			
			chartList.push(
				<a href={`/chart/${chart.id}/${chart.mode}`} className={styles.resultChart} key={`${chart.id}-${chart.mode}`}>
					<div className={styles.resultChartLevel}>
						<div className={[javaStyles.level, javaStyles[`level-${Math.round(chart.referenceLevel) <= 31 ? Math.round(chart.referenceLevel) : 31}`]].join(' ')}><div className={chartStyle.stars}>{chartRefStars}</div>{Math.round(chart.referenceLevel)}</div>
						<FontAwesomeIcon icon={faArrowRight} className={styles.fontAwesomeIcon} />
						<div className={[javaStyles.level, javaStyles[`level-${Math.floor(editorLevel) <= 31 ? Math.floor(editorLevel) : 31}`]].join(' ')}><div className={chartStyle.stars}>{chartNowStars}</div>{editorLevel == Math.floor(editorLevel) ? editorLevel : `${Math.floor(editorLevel)}`}</div>
					</div>
					<div className={styles.resultChartTitle}>
						<div className={styles.resultChartTitleArtist}>
							{chart.Song.artist}<div className={styles.desc} style={{textAlign: 'left'}}>{chart.Song.subArtist && `(${chart.Song.subArtist})`}</div>
						</div>
						<div className={styles.resultChartTitleArtist}>
							{chart.Song.title}<div className={styles.desc}>{chart.Song.subTitle && `(${chart.Song.subTitle})`}</div>
						</div>
					</div>
					<div className={styles.resultChartMode}>
						<p className={javaStyles[`mode-${chart.mode}`]}>{chart.mode}</p>
						{chart.chartTitle}
					</div>
				</a>
			);
		});
		setCharts(chartList);
	}
	
	return (<>
		<div className={styles.pageTop}>
			<h1 className={styles.pageTopTitle}>playJava!</h1>
			<div className={styles.search}>
				<FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
				<input 
					type="text" 
					className={[styles.input, isSearching ? styles.resultFocusInput : ''].join(' ')} 
					placeholder='채보, 유저, 게시글 검색' 
					onFocus={() => setSearching(true)}
					onBlur={() => setSearching(charts && charts.length > 0 ? true : false)}
					onChange={(e) => search(e.target.value) }
				/>
			</div>
			<div
				className={styles.result}
				style={{display: isSearching ? 'flex' : 'none'}}
			>
				<p className={styles.resultBlockTitle}>채보</p>
				{charts}
			</div>
		</div>
	</>);
}
export default RootComponent;