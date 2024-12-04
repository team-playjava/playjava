"use client";
import React, { useState, useEffect } from "react";
import { Editor, EditorTextChangeEvent } from "primereact/editor";

import styles from '@/app/chart/[id]/[mode]/chart.module.css';
import javaStyles from '@/app/java.module.css';
import { useParams } from "next/navigation";

import { Button } from 'primereact/button';
import { fetchChart, fetchSong } from "@/app/utils/data/sorryfield";
import { Chart, Song } from "@prisma/client";

type Params = {
	id: string;
	mode: "串" | "本" | "雙";
}

export default function BasicDemo() {
	const [text, setText] = useState<string>('');
	const { id, mode } = useParams<Params>();
	
    const [loading, setLoading] = useState<boolean>(true);
	const [chart, setChart] = useState<Chart | null>(null);
	const [song, setSong] = useState<Song | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const chart : Chart = await fetchChart(id, mode); setChart(chart);
			const song : Song = await fetchSong(chart.songId); setSong(song);
			setLoading(false);
		};
		fetchData();
	}, [id, mode]);

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

	if(chart && song) {
		const chartTitle = song.title; const chartSubTitle = song.subTitle; const chartName = chart.chartTitle
		const nowMode: string = decodeURIComponent(Array.isArray(chart.mode) ? chart.mode[0] : chart.mode);
		return (<>
			<div className={styles.pageTop}>
				<h1 className={styles.pageTopTitle}>{chartTitle}</h1>
				<p>{chartSubTitle}</p>
				<p style={{display: 'flex', gap: '10px', fontSize: '20px'}}><label className={javaStyles[`mode-${'本'}`]}>{nowMode}</label> {chartName}</p>
			</div>
			<div className="card">
				<Editor value={text} onTextChange={(e: EditorTextChangeEvent) => setText(e.htmlValue ?? '')} style={{ height: '400px', background: '#212529', color: 'white' }} />
			</div>
			<div className="card flex flex-wrap justify-content-center gap-3">
				<Button label="완료" icon="pi pi-check" loading={loading} onClick={load} />
			</div>
		</>)
	}
}
        