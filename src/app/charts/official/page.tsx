import styles from '../chart.module.css';

export default function ChartsOfficial() {
	return (
		<>
			<div className={styles.pageTop}>
				<h1 className={styles.pageTopTitle}>playJava! 공식 책정 목록</h1>
				<p>playJava!가 엄선하여 난도 책정 기준을 통과한 채보 목록입니다.</p>
			</div>
			{/* TODO: flex (chart.module.css), css 적용 (javarandomchart에서 가져오기) */}
			<div className="difficulty-bar"> 
				<div className="item" data-active="false"><div className="level level-0" data-level="0">0</div></div>
				<div className="item" data-active="false"><div className="level level-1" data-level="1">1</div></div>
				<div className="item" data-active="false"><div className="level level-2" data-level="2">2</div></div>
				<div className="item" data-active="false"><div className="level level-3" data-level="3">3</div></div>
				<div className="item" data-active="false"><div className="level level-4" data-level="4">4</div></div>
				<div className="item" data-active="false"><div className="level level-5" data-level="5">5</div></div>
				<div className="item" data-active="false"><div className="level level-6" data-level="6">6</div></div>
				<div className="item" data-active="false"><div className="level level-7" data-level="7">7</div></div>
				<div className="item" data-active="false"><div className="level level-8" data-level="8">8</div></div>
				<div className="item" data-active="false"><div className="level level-9" data-level="9">9</div></div>
				<div className="item" data-active="false"><div className="level level-10" data-level="10">10</div></div>
				<div className="item" data-active="false"><div className="level level-11" data-level="11">11</div></div>
				<div className="item" data-active="false"><div className="level level-12" data-level="12">12</div></div>
				<div className="item" data-active="false"><div className="level level-13" data-level="13">13</div></div>
				<div className="item" data-active="false"><div className="level level-14" data-level="14">14</div></div>
				<div className="item" data-active="false"><div className="level level-15" data-level="15">15</div></div>
				<div className="item" data-active="false"><div className="level level-16" data-level="16">16</div></div>
				<div className="item" data-active="false"><div className="level level-17" data-level="17">17</div></div>
				<div className="item" data-active="false"><div className="level level-18" data-level="18">18</div></div>
				<div className="item" data-active="false"><div className="level level-19" data-level="19">19</div></div>
				<div className="item" data-active="false"><div className="level level-20" data-level="20">20</div></div>
				<div className="item" data-active="false"><div className="level level-21" data-level="21">21</div></div>
				<div className="item" data-active="false"><div className="level level-22" data-level="22">22</div></div>
				<div className="item" data-active="false"><div className="level level-23" data-level="23">23</div></div>
				<div className="item" data-active="false"><div className="level level-24" data-level="24">24</div></div>
				<div className="item" data-active="false"><div className="level level-25" data-level="25">25</div></div>
				<div className="item" data-active="false"><div className="level level-26" data-level="26">26</div></div>
				<div className="item" data-active="false"><div className="level level-27" data-level="27">27</div></div>
				<div className="item" data-active="false"><div className="level level-28" data-level="28">28</div></div>
				<div className="item" data-active="true"><div className="level level-29" data-level="29">29</div></div>
				<div className="item" data-active="false"><div className="level level-30" data-level="30">30</div></div>
				<div className="item" data-active="false"><div className="level exponential" data-level="30+">30+</div></div>
			</div>
			<div className={styles.chartList}>
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
				<div className={styles.chartBox}>
					
				</div>
			</div>
		</>
	);
}