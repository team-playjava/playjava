"use client"
import { signIn } from "next-auth/react"
import Image from "next/image"
import loginCallbackWhite from "@/app/image/discord-white.svg"
import loginCallbackBlue from "@/app/image/discord-blue.svg"

interface SignInProps {
	isDarkMode: boolean;
}

export default function SignIn({ isDarkMode }: SignInProps) {
	const loginInfo = isDarkMode ? loginCallbackWhite : loginCallbackBlue;
	return (
		<a className="headerLogin" onClick={() => signIn("discord")}>
			<Image src={loginInfo} alt="login" width={30} height={30} />
			로그인
		</a>
	)
}
