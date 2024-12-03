"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import loginImage from "@/app/image/discord-white.svg"

export default function SignIn() {
	const { data: session } = useSession()
	console.log(session?.user)
	if (session?.user?.name === undefined) {
		return (
			<a className="headerLogin" onClick={() => signIn("discord")}>
				<Image src={loginImage} alt="login" width={30} height={30} />
				로그인
			</a>
		)
	} else {
		return (
			<a
				className="headerLogin loginOK"
				onClick={() => signOut()}
				onMouseEnter={(e) => {
					const label = e.currentTarget.querySelector('label');
					if (label) label.textContent = "로그아웃";
				}}
				onMouseLeave={(e) => {
					const label = e.currentTarget.querySelector('label');
					if (label) label.textContent = session?.user?.name || "";
				}}
			>
				<label>{session?.user?.name}</label>
			</a>
		)
	}
}
