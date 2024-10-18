import styles from './page.module.css';
import chartStyle from './charts/charts.module.css';
import javaStyles from './java.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowRight, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

function RootComponent() {
	return (<>
		<div className={styles.pageTop}>
			<h1 className={styles.pageTopTitle}>playJava!</h1>
			<div className={styles.search}>
				<FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
				<input type="text" className={styles.input} placeholder='채보, 유저, 게시글 검색' />
			</div>
			<div className={styles.result}>
				<a href="/chart/1/本" className={chartStyle.chartBox}>
					<div className={chartStyle.chartInfo}>
						<div className={[chartStyle.chartDifficulty].join(' ')}>
							<div className={[javaStyles.level, javaStyles[`level-31`]].join(' ')} data-level={`31`}><div className={chartStyle.stars}><FontAwesomeIcon icon={faStarHalf} /></div>31</div>
							<FontAwesomeIcon icon={faArrowRight} className={styles.fontAwesomeIcon} />
							<div className={[javaStyles.level, javaStyles[`level-31`]].join(' ')} data-level={`32`}><div className={chartStyle.stars}><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /></div>32</div>
						</div>
						<div className={chartStyle.chartMode}>
							<p className={javaStyles[`mode-${'本'}`]}>本</p>
							Normal
						</div>
					</div>
					<div className={chartStyle.chartTitle}>
						<div className={chartStyle.songSinger}>BEGIN<div className={chartStyle.desc}></div></div>
						<div className={chartStyle.songTitle}>それでも暮らしは続くから 全てを 今 忘れてしまう為には 全てを 今 知っている事が条件で 僕にはとても無理だから 一つずつ忘れて行く為に 愛する人達と手を取り 分け合って せめて思い出さないように 暮らしを続けて行くのです</div>
						<div className={chartStyle.desc}>(그래도 삶은 계속되기에 모든 것을 지금 잊기 위해선 모든 것을 지금 알고 있어야 하는게 조건인데 나에게는 너무 무리니까 하나하나 잊어가기 위해 사랑하는 사람들과 손을 잡고 함께 나누며 적어도 기억에 남지 않도록 살아가는 거야)</div>
					</div>
				</a>
			</div>
		</div>
	</>);
}
export default RootComponent;