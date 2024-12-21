"use client";
import styles from '@/app/user/[id]/page.module.css';

export default function UserChartList({ chartList }: { chartList: JSX.Element[] }) {
	return (<>
		<p className="text-center w-full bg-blue-600 py-2 font-bold flex flex-col cursor-pointer" onClick={async () => {
			document.querySelector(`.${styles.chartList}`)?.classList.toggle(`${styles.hidden}`);
		}}>제작 채보<label className="text-xs text-gray-400 cursor-pointer">(클릭 시 펼치기)</label></p>
		<div className={[styles.chartList, styles.hidden].join(' ')}>
			{chartList}
		</div>
	</>)
};