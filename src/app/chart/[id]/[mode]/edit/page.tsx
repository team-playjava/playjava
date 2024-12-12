"use client";
import React, { useState, useEffect } from "react";

import dynamic from 'next/dynamic';
import  { useRef } from 'react';

import styles from '@/app/chart/[id]/[mode]/chart.module.css';
import javaStyles from '@/app/java.module.css';
import { useParams } from "next/navigation";

import { Button } from 'primereact/button';
import { fetchChart, fetchChartRaw } from "@/app/utils/data/sorryfield";
import { Chart, Song } from "@prisma/client";

type Params = {
	id: string;
	mode: "串" | "本" | "雙";
}

type ChartSong = Chart & {
	Song: Song;
};

const MonacoEditor = dynamic(() => import('react-monaco-editor'), { ssr: false });

export default function BasicDemo() {
	const { id, mode } = useParams<Params>();
	
    const [loading, setLoading] = useState<boolean>(true);
	const [chart, setChart] = useState<ChartSong | null>(null);
	const [rawText, setRaw] = useState<string | null>(null);
	const editorRef = useRef(null);
  
	const editorDidMount = (editor: any) => {
	  console.log('Editor is mounted:', editor);
	  editorRef.current = editor;
	  // 에디터가 마운트되면 수행할 작업을 여기에 추가하세요.
	};

	const editorChange = (value: string, e: any) => {
		setRaw(value);
	}

	useEffect(() => {
		const fetchData = async () => {
			const chart : ChartSong = await fetchChart(id, mode); setChart(chart);
			const raw : string = await fetchChartRaw(id, mode)
			if (JSON.parse(raw).message !== "Not found") setRaw(raw);
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

	if(chart && chart.Song) {
		const chartTitle = chart.Song.title; const chartName = chart.chartTitle
		const nowMode: string = decodeURIComponent(Array.isArray(chart.mode) ? chart.mode[0] : chart.mode);
		return (<>
			<div className={[styles.pageTop, "flex flex-row items-baseline gap-1"].join(' ')}>
				<a href={`/chart/${id}/${mode}`} className="flex flex-row items-baseline gap-1 hover:bg-gray-400 p-1 px-2 rounded cursor-pointer">
				<h1 className={styles.pageTopTitle}>{chartTitle}</h1>
				<p className="flex gap-2 text-xl ml-2"><label className={[javaStyles[`mode-${'本'}`], "cursor-pointer"].join(" ")}>{nowMode}</label> {chartName}</p>
				</a>
				<p>{rawText !== null ? '(수정)' : '(새 채보 문서 생성)'}</p>
			</div>
			<div className="w-3/4 border p-4 rounded pb-14">
				<MonacoEditor
					width="100%"
					height="500px"
					language="text"
					editorDidMount={editorDidMount}
					value={rawText}
					theme={'vs-dark'}
					onChange={editorChange}
					options={{
						minimap: {
							enabled: false
						}
					}}
				/>
				<div className="mt-2 flex flex-col">
					<label><input type="checkbox" className="mr-1" />문서 편집을 저장하면 당신은 기여한 내용을 <b>CC-BY-NC-SA 2.0 KR</b>으로 배포하고 기여한 문서에 대한 하이퍼링크나 URL을 이용하여 저작자 표시를 하는 것으로 충분하다는 데 동의하는 것입니다. <b>이 동의는 철회할 수 없습니다.</b></label>
				</div>
				<div className="mt-2">
					<Button label="완료" icon="pi pi-check" className="px-2.5 py-1.5 gap-2 bg-blue-500 rounded float-right mb-8" loading={loading} onClick={load} />
				</div>
			</div>
		</>)
	}
}