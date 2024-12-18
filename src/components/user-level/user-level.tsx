import styles from './user-level.module.css';
type User = {
	userLevel: number;
};
const UserLevel: React.FC<User> = ({ userLevel }) => {
	const octave    = ["도", "도#", "레", "레#", "미", "파", "파#", "솔", "솔#", "라", "라#", "시"];
	const noteClass = ["C", "C", "D", "D", "E", "F", "F", "G", "G", "A", "A", "B"];
	return (<>
		<span className={[styles.note, styles[`note-${noteClass[userLevel%12]}-${Math.floor(userLevel/12)+2}`]].join(' ')}>
			{octave[userLevel%12]}
			<sup>{Math.floor(userLevel/12)}</sup>
		</span>
	</>)
}
export default UserLevel;