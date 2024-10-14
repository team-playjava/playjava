import styles from '../chart.module.css';
import javaStyles from '../../java.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'

export default function ChartsOfficial() {
	const itemLists = [];
	for(let i=0; i<31; i++) {
		itemLists.push(
			<div className="item" data-active="false" key={`level-${i}`}><div className={[javaStyles.level, javaStyles[`level-${i}`]].join(' ')} data-level={`${i}`}>{i}</div></div>
		);
	}
	return (
		<>
			<div className={styles.pageTop}>
				<h1 className={styles.pageTopTitle}>playJava! 공식 책정 목록</h1>
				<p>playJava!가 엄선하여 난도 책정 기준을 통과한 채보 목록입니다.</p>
			</div>
			{/* TODO: flex (chart.module.css), css 적용 (javarandomchart에서 가져오기) */}
			<div>
				<div className={[javaStyles['difficulty-bar'], javaStyles['difficulty-bar-option']].join(' ')}>
					<label className={styles.difficultySelect}><input type="radio" name="difficulty" value="system" defaultChecked /> 시스템 난도</label>
					<label className={styles.difficultySelect}><input type="radio" name="difficulty" value="official" /> 책정 난도</label>
				</div>
				<div className={[javaStyles['difficulty-bar'], javaStyles['difficulty-bar-diff']].join(' ')}>
					{itemLists}
					<div className="item" data-active="false"><div className={[javaStyles.level, javaStyles.exponential].join(' ')} data-level="30+">30+</div></div>
				</div>
			</div>
			<div className={styles.chartList}>
				<div className={styles.chartBox}>
					<div className={styles.chartInfo}>
						<div className={[styles.chartDifficulty].join(' ')}>
							<div className={[javaStyles.level, javaStyles[`level-31`]].join(' ')} data-level={`31`}><div className={styles.stars}><FontAwesomeIcon icon={faStarHalf} /></div>31</div>
							<FontAwesomeIcon icon={faArrowRight} className={styles.fontAwesomeIcon} />
							<div className={[javaStyles.level, javaStyles[`level-31`]].join(' ')} data-level={`32`}><div className={styles.stars}><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /></div>32</div>
						</div>
						<div className={styles.chartMode}>
							<p className={javaStyles[`mode-${'本'}`]}>本</p>
							Normal
						</div>
					</div>
					<div className={styles.chartTitle}>
						<p className={styles.songSinger}>藤咲かりん(miko)</p>
						<p className={styles.songTitle}>魔理沙は大変なものを盗んでいきました (마리사는 엄청난 것을 훔쳐갔습니다)</p>
					</div>
				</div>
				<div className={styles.chartBox}>
					
				</div>
				<div className={styles.chartBox}>
					
				</div>
				<div className={styles.chartBox}>
					
				</div>
				<div className={styles.chartBox}>
					
				</div>
				<div className={styles.chartBox}>
					
				</div>
			</div>
		</>
	);
}