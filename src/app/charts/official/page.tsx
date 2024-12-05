"use client"
import styles from '../charts.module.css';
import javaStyles from '../../java.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faStar, faStarHalf, faWarning } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import { fetchAllChart } from '@/app/utils/data/sorryfield';
import { Chart, ChartLevel, Song } from '@prisma/client';

type ChartSong = Chart & {
	Song: Song;
	ChartLevel: ChartLevel[];
};

export default function ChartsOfficial() {
	const [loading, setLoading] = useState<boolean>(true);
	const [charts, setCharts] = useState<ChartSong[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const charts : ChartSong[] = await fetchAllChart(); setCharts(charts);
			setLoading(false);
		};
		fetchData();
	}, [loading]);
	
	const itemLists = [];
	for(let i=1; i<31; i++) {
		itemLists.push(
			<div className="item" data-active="false" key={`level-${i}`}><div className={[javaStyles.level, javaStyles[`level-${i}`]].join(' ')} data-level={`${i}`}>{i}</div></div>
		);
	}

	const chartList: JSX.Element[] = [];
	charts?.forEach((chart) => {
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
			<a href={`/chart/${chart.id}/${chart.mode}`} className={styles.chartBox} key={`${chart.id}-${chart.mode}`}>
				<div className={styles.chartInfo}>
					<div className={[styles.chartDifficulty].join(' ')}>
						<div className={[javaStyles.level, javaStyles[`level-${chart.referenceLevel}`]].join(' ')}><div className={styles.stars}>{chartRefStars}</div>{chart.referenceLevel == Math.floor(chart.referenceLevel) ? chart.referenceLevel : `${Math.floor(chart.referenceLevel)}`}</div>
						<FontAwesomeIcon icon={faArrowRight} className={styles.fontAwesomeIcon} />
						<div className={[javaStyles.level, javaStyles[`level-${Math.floor(editorLevel) <= 31 ? editorLevel : 31}`]].join(' ')}><div className={styles.stars}>{chartNowStars}</div>{editorLevel == Math.floor(editorLevel) ? editorLevel : `${Math.floor(editorLevel)}`}</div>
					</div>
					<div className={styles.chartMode}>
						<p className={javaStyles[`mode-${chart.mode}`]}>{chart.mode}</p>
						Normal
					</div>
				</div>
				<div className={styles.chartTitle}>
					<div className={styles.songSinger}>{chart.Song.artist}<div className={styles.desc}>({chart.Song.artistSub})</div></div>
					<div className={styles.songTitle}>{chart.Song.title}</div>
					<div className={styles.desc}>({chart.Song.subTitle})</div>
				</div>
			</a>
		)
	});
	
	return (
		<>
			<div className={styles.pageTop}>
				<h1 className={styles.pageTopTitle}>playJava! 공식 책정 목록</h1>
				<p>playJava!가 엄선하여 난도 책정 기준을 통과한 채보 목록입니다.</p>
			</div>
			<div>
				<div className={[javaStyles['difficulty-bar'], javaStyles['difficulty-bar-option']].join(' ')}>
					<label className={styles.difficultySelect}><input type="radio" name="difficulty" value="system" defaultChecked /> 시스템 난도</label>
					<label className={styles.difficultySelect}><input type="radio" name="difficulty" value="official" /> 책정 난도</label>
				</div>
				<div className={[javaStyles['difficulty-bar'], javaStyles['difficulty-bar-diff']].join(' ')}>
					<div className="item" data-active="false"><div className={[javaStyles.level, javaStyles['level-0']].join(' ')} data-level="-2"><FontAwesomeIcon icon={faWarning} /></div></div>
					{itemLists}
					<div className="item" data-active="false"><div className={[javaStyles.level, javaStyles.exponential].join(' ')} data-level="40"><div className={styles.starInMenu}><FontAwesomeIcon icon={faStar} /></div></div></div>
				</div>
			</div>
			<div className={styles.chartList}>
				{chartList && chartList.length > 0 ? chartList : <div>로딩 중...</div>}
			</div>
		</>
	);
}