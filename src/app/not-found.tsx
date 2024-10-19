"use client"
import Image from 'next/image'
import styles from './page.module.css'

import notFountImage from './image/404.webp'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
 
export default function NotFound() {
	return (
		<div className={styles.pageTop}>
			<Image src={notFountImage} alt="404" width={300} height={300} />
			<h1 className={styles.pageTopTitle}>페이지를 찾을 수 없습니다</h1>
			<div className={styles.notFountBtn} onClick={() => history.back()}>이전 페이지로 돌아가기 <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></div>
		</div>
	)
}