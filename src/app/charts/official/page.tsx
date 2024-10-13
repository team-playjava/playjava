import styles from '../chart.module.css';

export default function ChartsOfficial() {
	return (
		<>
			<div className={styles.pageTop}>
				<h1 className={styles.pageTopTitle}>playJava! 공식 책정 목록</h1>
				<p>playJava!가 엄선하여 난도 책정 기준을 통과한 채보 목록입니다.</p>
			</div>
			<div className={styles.chartList}>
			</div>
		</>
	);
}