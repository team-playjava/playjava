"use client";
import { useParams } from 'next/navigation'

import styles from './chart.module.css';
import javaStyles from '../../../java.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faStar, faStarHalf, faHashtag, faArrowLeft, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

export default function Page() {
	const params = useParams(); // params.id 
	const nowMode = decodeURIComponent(Array.isArray(params.mode) ? params.mode[0] : params.mode);
	const modeList = [];
	const mode = ['串', '本', '雙'];
	for(let i=0; i<3; i++) {
		modeList.push(
			<div key={mode[i]} className={mode[i] == nowMode ? [styles.backward, styles.selected].join(' ') : styles.backward } onClick={() => {if (mode[i] != nowMode) window.location.href = `./${mode[i]}`}}><div className={javaStyles[`mode-${mode[i]}`]}>{mode[i]}</div></div>
		)
	}
	return (
		<>
			<div className={styles.topController}>
				<div className={styles.backward} onClick={() => window.history.back()}><FontAwesomeIcon icon={faArrowLeft}/> 뒤로가기</div>
				{modeList}
			</div>
			<div className={styles.pageTop}>
				<h1 className={styles.pageTopTitle}>それでも暮らしは続くから 全てを 今 忘れてしまう為には 全てを 今 知っている事が条件で 僕にはとても無理だから 一つずつ忘れて行く為に 愛する人達と手を取り 分け合って せめて思い出さないように 暮らしを続けて行くのです</h1>
				<p>(그래도 삶은 계속되기에 모든 것을 지금 잊기 위해선 모든 것을 지금 알고 있어야 하는게 조건인데 나에게는 너무 무리니까 하나하나 잊어가기 위해 사랑하는 사람들과 손을 잡고 함께 나누며 적어도 기억에 남지 않도록 살아가는 거야)</p>
			</div>
			<div className={styles.pageBody}>
				<div className={styles.chartInfo}>
					<div className={styles.chartInfoTag} onClick={() => window.open(`https://sorry.daldal.so/java?mode=${nowMode}&id=2003`)}><div className={javaStyles[`mode-${nowMode}`]}>{nowMode}</div> Normal <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></div>
					<div className={[styles.chartDifficulty].join(' ')}>
						<div className={[javaStyles.level, javaStyles[`level-31`]].join(' ')} data-level={`31`}><div className={styles.stars}><FontAwesomeIcon icon={faStarHalf} /></div>31</div>
						<FontAwesomeIcon icon={faArrowRight} className={styles.fontAwesomeIcon} />
						<div className={[javaStyles.level, javaStyles[`level-31`]].join(' ')} data-level={`32`}><div className={styles.stars}><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /></div>32</div>
					</div>
					<div className={styles.chartTag}>
						<div className={styles.chartTagItem} onClick={() => window.location.href = "/charts/tag/가나다라"}><FontAwesomeIcon icon={faHashtag}/><label>가나다라</label></div>
						<div className={styles.chartTagItem} onClick={() => window.location.href = "/charts/tag/마법사"}><FontAwesomeIcon icon={faHashtag}/><label style={{color: '#ff3f2e'}}>마법사</label></div>
					</div>
				</div>
			</div>
		</>
	)
}