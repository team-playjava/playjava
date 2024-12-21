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
			<a key={modes[i]} className={modes[i] == nowMode ? [styles.backward, styles.selected].join(' ') : styles.backward } href={`./${modes[i]}`}><div className={javaStyles[`mode-${modes[i]}`]}>{modes[i]}</div></a>
		)
	}
	return (<>
		<div className='flex flex-row justify-between'>
			<div className={styles.topController}>
				<a className={styles.backward} onClick={() => window.history.back()}><i className="pi pi-arrow-left"/> 뒤로가기</a>
				{modeList}
			</div>
			<div className={styles.topController}>
				<a className={styles.backward} href='./edit'><i className="pi pi-pencil"/> 수정</a>
			</div>
		</div>
	</>)
}
export default ChartTop;