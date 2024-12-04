"use client"
import styles from '@/app/chart/[id]/[mode]/chart.module.css';
import javaStyles from '@/app/java.module.css';
type ChartTopProps = {
	nowMode: string; // 객체 속성 타입 정의
};
const ChartTop: React.FC<ChartTopProps> = ({ nowMode }) => {
	const modeList = [];
	const modes = ['串', '本', '雙'];
	for(let i=0; i<3; i++) {
		modeList.push(
			<div key={modes[i]} className={modes[i] == nowMode ? [styles.backward, styles.selected].join(' ') : styles.backward } onClick={() => {if (modes[i] != nowMode) window.location.href = `./${modes[i]}`}}><div className={javaStyles[`mode-${modes[i]}`]}>{modes[i]}</div></div>
		)
	}
	return (<>
		<div className={styles.topController}>
			<div className={styles.backward} onClick={() => window.history.back()}><i className="pi pi-arrow-left"/> 뒤로가기</div>
			{modeList}
			<div className={styles.backward} onClick={() => window.location.href = `./${nowMode}/edit`}><i className="pi pi-pencil"/> 수정</div>
		</div>
	</>)
}
export default ChartTop;