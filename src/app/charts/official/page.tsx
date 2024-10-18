import styles from '../charts.module.css';
import javaStyles from '../../java.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faStar, faStarHalf, faWarning } from '@fortawesome/free-solid-svg-icons'

export default function ChartsOfficial() {
	const itemLists = [];
	for(let i=1; i<31; i++) {
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
					<div className="item" data-active="false"><div className={[javaStyles.level, javaStyles['level-0']].join(' ')} data-level="-2"><FontAwesomeIcon icon={faWarning} /></div></div>
					{itemLists}
					<div className="item" data-active="false"><div className={[javaStyles.level, javaStyles.exponential].join(' ')} data-level="40"><div className={styles.starInMenu}><FontAwesomeIcon icon={faStar} /></div></div></div>
				</div>
			</div>
			<div className={styles.chartList}>
				<a href="/chart/1/本" className={styles.chartBox}>
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
						<div className={styles.songSinger}>BEGIN<div className={styles.desc}></div></div>
						<div className={styles.songTitle}>それでも暮らしは続くから 全てを 今 忘れてしまう為には 全てを 今 知っている事が条件で 僕にはとても無理だから 一つずつ忘れて行く為に 愛する人達と手を取り 分け合って せめて思い出さないように 暮らしを続けて行くのです</div>
						<div className={styles.desc}>(그래도 삶은 계속되기에 모든 것을 지금 잊기 위해선 모든 것을 지금 알고 있어야 하는게 조건인데 나에게는 너무 무리니까 하나하나 잊어가기 위해 사랑하는 사람들과 손을 잡고 함께 나누며 적어도 기억에 남지 않도록 살아가는 거야)</div>
					</div>
				</a>
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
						<div className={styles.songSinger}>藤咲かりん<div className={styles.desc}>(miko)</div></div>
						<div className={styles.songTitle}>魔理沙は大変なものを盗んでいきました</div>
						<div className={styles.desc}>(마리사는 엄청난 것을 훔쳐갔습니다)</div>
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
			</div>
		</>
	);
}