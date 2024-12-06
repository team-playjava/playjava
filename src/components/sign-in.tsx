"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import loginImage from "@/app/image/discord-white.svg"
import { useEffect, useState } from "react";
import { getPermission } from "@/app/utils/data/permission";

export default function SignIn() {
	const { data: session } = useSession();
	const [permission, setPermission] = useState<string>('user');

	useEffect(() => {
		const fetchPermission = async () => {
			if (session?.user?.id) {
				const perm = await getPermission(session.user.id);
				setPermission(perm);
			}
		};
		fetchPermission();
	}, [session]);

	if (session?.user?.name === undefined) {
		return (
			<a className="headerLogin" onClick={() => signIn("discord")}>
				<Image src={loginImage} alt="login" width={30} height={30} />
				로그인
			</a>
		)
	} else {
		return (
			<><a
				className="headerLogin loginOK"
				onMouseEnter={() => {
					document.querySelector('.userContext')?.classList.add('active')
					document.querySelector('.loginOK')?.classList.add('active')
				}}
				onMouseLeave={() => {
					document.querySelector('.userContext')?.classList.remove('active')
					document.querySelector('.loginOK')?.classList.remove('active')
				}}
			>
				<Image className="avatar" src={session?.user?.image || loginImage} alt="login" width={40} height={40} />
				<label>{session?.user?.name}</label>
			</a>
			<div
				className="userContext"
				onMouseEnter={() => {
					document.querySelector('.userContext')?.classList.add('active')
					document.querySelector('.loginOK')?.classList.add('active')
				}}
				onMouseLeave={() => {
					document.querySelector('.userContext')?.classList.remove('active')
					document.querySelector('.loginOK')?.classList.remove('active')
				}}
			>
				<a href="/user">내 정보</a>
				<a href="/user/settings">설정</a>
				<a href="/user/notifications">알림</a>
				{(permission === 'admin' || permission === 'arranger') && (
					<a href="/admin">관리자 페이지</a>
				)}
				<a className="logout" onClick={() => signOut()}>로그아웃</a>
			</div>
			</>
		)
	}
}
