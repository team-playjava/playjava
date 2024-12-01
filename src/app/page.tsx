"use client";
import styles from './page.module.css';
import chartStyle from './charts/charts.module.css';
import javaStyles from './java.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowRight, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function RootComponent() {
	const [isSearching, setSearching] = useState<boolean>(false);
	
	return (<>
		<div className={styles.pageTop}>
			<h1 className={styles.pageTopTitle}>playJava!</h1>
			<div className={styles.search}>
				<FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
				<input 
					type="text" 
					className={[styles.input, isSearching ? styles.inputFocus : ''].join(' ')} 
					placeholder='채보, 유저, 게시글 검색' 
					onFocus={() => setSearching(true)} 
					onBlur={() => setSearching(false)}
				/>
			</div>
			<div className={styles.result} style={{display: isSearching ? 'flex' : 'none'}}>
				<p className={styles.resultBlockTitle}>채보</p>
				<a href="/chart/1/本" className={styles.resultChart}>
					<div className={styles.resultChartLevel}>
						<div className={[javaStyles.level, javaStyles[`level-31`]].join(' ')} data-level={`31`}><div className={chartStyle.stars}><FontAwesomeIcon icon={faStarHalf} /></div>31</div>
						<FontAwesomeIcon icon={faArrowRight} className={styles.fontAwesomeIcon} />
						<div className={[javaStyles.level, javaStyles[`level-31`]].join(' ')} data-level={`32`}><div className={chartStyle.stars}><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /></div>32</div>
					</div>
					<div className={styles.resultChartTitle}>
						BEGIN<div className={chartStyle.desc}></div>
						それでも暮らしは続くから 全てを 今 忘れてしまう為には 全てを 今 知っている事が条件で 僕にはとても無理だから 一つずつ忘れて行く為に 愛する人達と手を取り 分け合って せめて思い出さないように 暮らしを続けて行くのです
					</div>
					<div className={styles.resultChartMode}>
						<p className={javaStyles[`mode-${'本'}`]}>本</p>
						Normal
					</div>
				</a>
				<a href="/chart/1/本" className={styles.resultChart}>
					<div className={styles.resultChartLevel}>
						<div className={[javaStyles.level, javaStyles[`level-31`]].join(' ')} data-level={`31`}><div className={chartStyle.stars}><FontAwesomeIcon icon={faStarHalf} /></div>31</div>
						<FontAwesomeIcon icon={faArrowRight} className={styles.fontAwesomeIcon} />
						<div className={[javaStyles.level, javaStyles[`level-31`]].join(' ')} data-level={`32`}><div className={chartStyle.stars}><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /></div>32</div>
					</div>
					<div className={styles.resultChartTitle}>
						BEGIN<div className={chartStyle.desc}></div>
						それでも暮らしは続くから 全てを 今 忘れてしまう為には 全てを 今 知っている事が条件で 僕にはとても無理だから 一つずつ忘れて行く為に 愛する人達と手を取り 分け合って せめて思い出さないように 暮らしを続けて行くのです
					</div>
					<div className={styles.resultChartMode}>
						<p className={javaStyles[`mode-${'本'}`]}>本</p>
						Normal
					</div>
				</a>
				<a href="/chart/1/本" className={styles.resultChart}>
					<div className={styles.resultChartLevel}>
						<div className={[javaStyles.level, javaStyles[`level-31`]].join(' ')} data-level={`31`}><div className={chartStyle.stars}><FontAwesomeIcon icon={faStarHalf} /></div>31</div>
						<FontAwesomeIcon icon={faArrowRight} className={styles.fontAwesomeIcon} />
						<div className={[javaStyles.level, javaStyles[`level-31`]].join(' ')} data-level={`32`}><div className={chartStyle.stars}><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /></div>32</div>
					</div>
					<div className={styles.resultChartTitle}>
						BEGIN<div className={chartStyle.desc}></div>
						それでも暮らしは続くから 全てを 今 忘れてしまう為には 全てを 今 知っている事が条件で 僕にはとても無理だから 一つずつ忘れて行く為に 愛する人達と手を取り 分け合って せめて思い出さないように 暮らしを続けて行くのです
					</div>
					<div className={styles.resultChartMode}>
						<p className={javaStyles[`mode-${'本'}`]}>本</p>
						Normal
					</div>
				</a>
				<a href="/chart/1/本" className={styles.resultChart}>
					<div className={styles.resultChartLevel}>
						<div className={[javaStyles.level, javaStyles[`level-31`]].join(' ')} data-level={`31`}><div className={chartStyle.stars}><FontAwesomeIcon icon={faStarHalf} /></div>31</div>
						<FontAwesomeIcon icon={faArrowRight} className={styles.fontAwesomeIcon} />
						<div className={[javaStyles.level, javaStyles[`level-31`]].join(' ')} data-level={`32`}><div className={chartStyle.stars}><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /></div>32</div>
					</div>
					<div className={styles.resultChartTitle}>
						BEGIN<div className={chartStyle.desc}></div>
						それでも暮らしは続くから 全てを 今 忘れてしまう為には 全てを 今 知っている事が条件で 僕にはとても無理だから 一つずつ忘れて行く為に 愛する人達と手を取り 分け合って せめて思い出さないように 暮らしを続けて行くのです
					</div>
					<div className={styles.resultChartMode}>
						<p className={javaStyles[`mode-${'本'}`]}>本</p>
						Normal
					</div>
				</a>
				<a href="/chart/1/本" className={styles.resultChart}>
					<div className={styles.resultChartLevel}>
						<div className={[javaStyles.level, javaStyles[`level-31`]].join(' ')} data-level={`31`}><div className={chartStyle.stars}><FontAwesomeIcon icon={faStarHalf} /></div>31</div>
						<FontAwesomeIcon icon={faArrowRight} className={styles.fontAwesomeIcon} />
						<div className={[javaStyles.level, javaStyles[`level-31`]].join(' ')} data-level={`32`}><div className={chartStyle.stars}><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /></div>32</div>
					</div>
					<div className={styles.resultChartTitle}>
						BEGIN<div className={chartStyle.desc}></div>
						それでも暮らしは続くから 全てを 今 忘れてしまう為には 全てを 今 知っている事が条件で 僕にはとても無理だから 一つずつ忘れて行く為に 愛する人達と手を取り 分け合って せめて思い出さないように 暮らしを続けて行くのです
					</div>
					<div className={styles.resultChartMode}>
						<p className={javaStyles[`mode-${'本'}`]}>本</p>
						Normal
					</div>
				</a>
				<a href="/chart/1/本" className={styles.resultChart}>
					<div className={styles.resultChartLevel}>
						<div className={[javaStyles.level, javaStyles[`level-31`]].join(' ')} data-level={`31`}><div className={chartStyle.stars}><FontAwesomeIcon icon={faStarHalf} /></div>31</div>
						<FontAwesomeIcon icon={faArrowRight} className={styles.fontAwesomeIcon} />
						<div className={[javaStyles.level, javaStyles[`level-31`]].join(' ')} data-level={`32`}><div className={chartStyle.stars}><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /></div>32</div>
					</div>
					<div className={styles.resultChartTitle}>
						BEGIN<div className={chartStyle.desc}></div>
						それでも暮らしは続くから 全てを 今 忘れてしまう為には 全てを 今 知っている事が条件で 僕にはとても無理だから 一つずつ忘れて行く為に 愛する人達と手を取り 分け合って せめて思い出さないように 暮らしを続けて行くのです
					</div>
					<div className={styles.resultChartMode}>
						<p className={javaStyles[`mode-${'本'}`]}>本</p>
						Normal
					</div>
				</a>
			</div>
		</div>
	</>);
}
export default RootComponent;