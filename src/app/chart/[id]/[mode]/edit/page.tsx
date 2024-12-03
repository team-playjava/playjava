"use client";
import React, { useState } from "react";
import { Editor, EditorTextChangeEvent } from "primereact/editor";

import styles from '@/app/chart/[id]/[mode]/chart.module.css';
import javaStyles from '@/app/java.module.css';
import { useParams } from "next/navigation";

import { Button } from 'primereact/button';

export default function BasicDemo() {
	const [text, setText] = useState<string>('');
	const params = useParams();
	const chartTitle = "それでも暮らしは続くから 全てを 今 忘れてしまう為には 全てを 今 知っている事が条件で 僕にはとても無理だから 一つずつ忘れて行く為に 愛する人達と手を取り 分け合って せめて思い出さないように 暮らしを続けて行くのです"
	const chartSubTitle = "(그래도 삶은 계속되기에 모든 것을 지금 잊기 위해선 모든 것을 지금 알고 있어야 하는게 조건인데 나에게는 너무 무리니까 하나하나 잊어가기 위해 사랑하는 사람들과 손을 잡고 함께 나누며 적어도 기억에 남지 않도록 살아가는 거야)"
	const chartName = "Normal"
	const nowMode = decodeURIComponent(Array.isArray(params.mode) ? params.mode[0] : params.mode);
    const [loading, setLoading] = useState<boolean>(false);

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

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
        