"use client"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function SignIn() {
	const { data: session } = useSession();
	const [sorryfieldCheckCode, setSorryfieldCheckCode] = useState<string | null>(null);

	const sorryfieldUserCheck = async () => {
		const id = sorryfieldCheckCode !== null ? sorryfieldCheckCode : uuidv4();
		if (sorryfieldCheckCode === null) setSorryfieldCheckCode(id);
		const nickname = document.getElementById('sorryfieldNickname') as HTMLInputElement;
		const res = await fetch(`/api/proxy/sorryfield/user/${nickname.value}`);
		const data = await res.json();
		if (res.status === 200) {
			nickname.disabled = true;
		} else { return alert("닉네임 검증 중 오류가 발생했어요."); }
		let check = false;
		for(let i = 0; i < data.placements.length; i++) {
			if (
				data.placements[i].staticItemId === 'normal-text' &&
				data.placements[i].transform.content.includes(id)
			)
				check = true;
		}
		console.log(check);
	}

	if (session?.user?.name !== undefined) {
		return (<>
			<div className="flex items-center gap-3">
				<div className="text-5xl">설정</div>
				<div className="flex items-center gap-2 border rounded p-3 w-max">
					<Image className="avatar" src={session?.user?.image ?? ''} alt="login" width={40} height={40} />
					<label className="text-2xl">{session?.user?.name}</label>
				</div>
			</div>
			<div className="border rounded mt-3 p-2">
				<div className="text-3xl">자바! 데이터와 연동하기</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="nickname" className="text-xl">닉네임</label>
					<input type="text" id="sorryfieldNickname" name="nickname" className="border rounded p-2 text-black" required />
					{sorryfieldCheckCode && (
						<p><a className="text-blue-300" href={`https://sorry.daldal.so/java/studio/${(document.getElementById('sorryfieldNickname') as HTMLInputElement)?.value}`}>내 스튜디오</a>에서 <label className="text-lime-400">일반 텍스트 상자</label> 아이템을 통해 코드 <label
							className="text-lime-400 cursor-pointer"
							onClick={() => {
								navigator.clipboard.writeText(sorryfieldCheckCode);
								alert("코드가 복사되었습니다!");
							}}
						>{sorryfieldCheckCode}</label><label className="text-sm">(누르면 복사)</label>
						를 입력 후 다시 검증 버튼을 눌러주세요!</p>
					)}
					<button
						type="submit"
						className="bg-blue-500 text-white rounded p-2 mt-2"
						onClick={sorryfieldUserCheck}
					>검증</button>
				</div>
			</div>
		</>)
	}
}
