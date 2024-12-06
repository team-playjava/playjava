"use client"
import { useEffect, useState } from 'react';

import styles from '@/app/charts/charts.module.css';
import javaStyles from '@/app/java.module.css';

type Mode = "串" | "本" | "雙";

import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { Chart, ChartLevel, Song } from '@prisma/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import { getPermission } from '../utils/data/permission';

type ChartSong = Chart & {
	Song: Song;
	ChartLevel: ChartLevel[];
};

export default function AdminPage() {
	const [chart, setChart] = useState<ChartSong | null>(null);

	const [chartId, setChartId] = useState<number | null>(null);
	const [chartMode, setChartMode] = useState<Mode | null>(null);
	const [chartLevel, setChartLevel] = useState<number | null>(null);
	
	const { data: session } = useSession();
	const [permission, setPermission] = useState<string | null>(null);

	useEffect(() => {
		const fetchPermission = async () => {
			if (session?.user?.email) {
				const perm = await getPermission(session.user.email);
				setPermission(perm ?? 'user');
			}
		};
		fetchPermission();
	}, [session]);

	if (permission !== 'admin') {
		return <div>권한이 없어요.</div>;
	}

	// const [levelType, setLevelType] = useState<"official" | "unofficial" | null>(null);
	
	const changeChartApplyMode = (
	  event: React.MouseEvent<HTMLElement>,
	  newAlignment: Mode,
	) => {
		setChartMode(newAlignment);
	};
	// const changeChartApplyType = (
	//   event: React.MouseEvent<HTMLElement>,
	//   newAlignment: "official" | "unofficial",
	// ) => {
	// 	setLevelType(newAlignment);
	// };
	const searchChart = async (
		chartId: number,
		mode: Mode,
	) => {
		if (chartId === null) { alert('채보 번호를 입력해주세요!'); return null; }
		if (mode === null) { alert('모드를 선택해주세요!'); return null; }
		const response = await fetch(`http://localhost:3000/api/proxy/sorryfield/chart/${chartId}/${mode}`);
		const data: ChartSong = await response.json();
		console.log(data);
		if (response.status !== 200) {
			alert('채보를 찾을 수 없어요.');
			return null;
		}
		if (data?.ChartLevel !== null) {
			data.ChartLevel.some((level) => {
				if (level.levelType == 'official') {
					setChartLevel(level.editorLevel);
				}
			});
		};
		return data;
	}
	const addChart = async () => {
		if (chartId === null) { alert('채보 번호를 입력해주세요!'); return null; }
		if (chartMode === null) { alert('모드를 선택해주세요!'); return null; }
		if (chart === null) { alert('채보 검색을 진행해주세요!'); return null; }
		const response = await fetch(`http://localhost:3000/api/chart/${chartId}/${chartMode}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				level: chartLevel,
				levelType: 'official',
			}),
		});
		if (response.status !== 200) {
			alert('반영하는 도중 문제가 생겼어요.');
			return null;
		}
		setChart(null); setChartId(null); setChartMode(null); setChartLevel(null);
		alert('정상적으로 반영했어요!')
		return true;
	}
	const chartRefStars: JSX.Element[] = [];
	if (chart){
		let lvl = 0;
		for(lvl=chart.referenceLevel-30; lvl>0.5; lvl--) {
			chartRefStars.push(<FontAwesomeIcon icon={faStar} />);
		}
		if (0 < lvl && lvl < 1) { chartRefStars.push(<FontAwesomeIcon icon={faStarHalf} />); }
	}
	return (
		<>
		<h1>관리자</h1>
		<div className="border p-3 rounded-lg my-2">
			<h2>채보 등록/수정</h2>
			<div className="flex flex-row gap-3 mt-2 items-center">
				<input
					type="number"
					className="text-black p-2 rounded text-center pl-4"
					placeholder="채보 번호"
					min={0} max={9999}
					onChange={(e) => {
						setChartId(e.target.value ? parseInt(e.target.value) : null)
					}}
				/>
				<ToggleButtonGroup
					color="primary"
					value={chartMode}
					exclusive
					onChange={changeChartApplyMode}
					aria-label="mode"
				>
					<ToggleButton value="串" className='px-3 py-1 bg-blue-400'>&nbsp;串&nbsp;</ToggleButton>
					<ToggleButton value="本" className='px-3 py-1 bg-green-500'>&nbsp;本&nbsp;</ToggleButton>
					<ToggleButton value="雙" className='px-3 py-1 bg-purple-500'>&nbsp;雙&nbsp;</ToggleButton>
				</ToggleButtonGroup>
				<button className="p-2 pr-2.5 bg-blue-500 rounded-lg py-1" onClick={async () => {
					const result = await searchChart(chartId!, chartMode!);
					setChart(result!);
				}}><SearchIcon fontSize={'small'} /> 조회</button>
				<p>레벨 입력 시 +로 입력하고 싶다면 .5를 추가하세요.</p>
			</div>
			{chart?.Song && (
				<div>
					<a className={[styles.chartBox, "m-3"].join(' ')}>
						<div className={styles.chartInfo}>
							<div className={[styles.chartDifficulty].join(' ')}>
								<div className={[javaStyles.level, javaStyles[`level-${Math.round(chart.referenceLevel)}`]].join(' ')}><div className={styles.stars}>{chartRefStars}</div>{Math.round(chart.referenceLevel)}</div>
								<FontAwesomeIcon icon={faArrowRight} className={styles.fontAwesomeIcon} />
								<input
									type="number"
									className="text-black p-3 rounded-full w-12 text-center pr-1" placeholder="0"
									min={-2}
									max={40}
									value={chartLevel ? chartLevel : ''}
									onChange={(e) => {
										setChartLevel(e.target.value ? parseInt(e.target.value) : null)
									}}
								/>
							</div>
							<div className={styles.chartMode}>
								<p className={javaStyles[`mode-${chart.mode}`]}>{chart.mode}</p>
								{chart.chartTitle}
							</div>
						</div>
						<div className={styles.chartTitle}>
							<div className={styles.songSinger}>{chart.Song.artist}<div className={styles.desc}>({chart.Song.artistSub})</div></div>
							<div className={styles.songTitle}>{chart.Song.title}</div>
							<div className={styles.desc}>({chart.Song.subTitle})</div>
						</div>
					</a>
					<div className="flex flex-row gap-3 mt-2 items-center">
						{/* <ToggleButtonGroup
							color="standard"
							value={levelType}
							exclusive
							onChange={changeChartApplyType}
							aria-label="mode"
							className='m-3'
						>
							<ToggleButton value="official"   className='px-3 py-1 bg-white'>공식</ToggleButton>
							<ToggleButton value="unofficial" className='px-3 py-1 bg-white'>비공식</ToggleButton>
						</ToggleButtonGroup> */}
						<button
							className="p-2 px-5 pl-4 bg-blue-500 rounded-lg flex items-center gap-2"
							onClick={async () => await addChart()}
						>
							<EditIcon /> 등록
						</button>
					</div>
				</div>
			)}
		</div>
		<div className="border p-3 rounded-lg my-2">
			<h2>스프레드시트 데이터 → playJava! 변환</h2>
			<div className="flex flex-col gap-3 mt-2 items-start">
				<textarea name="story" rows={10} cols={90} className="rounded-lg text-black" autoFocus />
				<button className="p-2 px-5 pl-4 bg-blue-500 rounded-lg flex items-center gap-2"><EditIcon /> 등록</button>
			</div>
		</div>
		</>
	);
}