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
				<a
					className={styles.backward}
					onClick={() => {
						const shareDialog = document.createElement('div');
						Object.assign(shareDialog.style, {
							position: 'fixed',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							backgroundColor: 'rgb(63, 63, 63)',
							padding: '20px',
							boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
							zIndex: '1000',
						});

						const shareText = document.createElement('p');
						shareText.textContent = '공유하기';
						shareDialog.appendChild(shareText);

						const closeButton = document.createElement('button');
						closeButton.textContent = '×';
						Object.assign(closeButton.style, {
							position: 'absolute',
							top: '0px',
							right: '10px',
							background: 'none',
							border: 'none',
							fontSize: '32px',
							cursor: 'pointer',
						});
						closeButton.onclick = () => {
							document.body.removeChild(shareDialog);
						};
						shareDialog.appendChild(closeButton);

						const urlInput = document.createElement('input');
						urlInput.type = 'text';
						let shareUrl = decodeURI(window.location.href).replace('/chart/', '/c/')
									.replace('串', 'g').replace('本', 'b').replace('雙', 's');
						urlInput.value = shareUrl;
						urlInput.readOnly = true;
						Object.assign(urlInput.style, {
							width: '100%',
							marginTop: '10px',
							padding: '5px',
							border: '1px solid #ccc',
							borderRadius: '4px',
							backgroundColor: 'rgb(41, 41, 41)'
						});

						const copyButton = document.createElement('button');
						copyButton.textContent = '복사';
						Object.assign(copyButton.style, {
							marginTop: '10px',
							padding: '5px 10px',
							backgroundColor: '#007bff',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer',
						});
						copyButton.onclick = () => {
							urlInput.select();
							document.execCommand('copy');
							alert('URL이 복사되었습니다.');
						};

						shareDialog.appendChild(urlInput);
						shareDialog.appendChild(copyButton);

						document.body.appendChild(shareDialog);
					}}
				>
					<i className="pi pi-share-alt" /> 공유
				</a>
				<a className={styles.backward} href='./edit'><i className="pi pi-pencil"/> 수정</a>
			</div>
		</div>
	</>)
}
export default ChartTop;