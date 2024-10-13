import styles from './page.module.css';

function RootComponent() {
	return (<>
        <div className={styles.pageTop}>
            <h1 className={styles.pageTopTitle}>playJava!</h1>
            <input type="text" className={styles.input} placeholder='채보, 유저, 게시글 검색' />
        </div>
    </>);
}
export default RootComponent;