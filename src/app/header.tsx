"use client";
import Image from "next/image"
import Logo from "./image/logo.webp"
import loginCallbackWhite from "./image/discord-white.svg"
import loginCallbackBlue from "./image/discord-blue.svg"
import { useEffect, useState } from 'react';

export default function Header() {
	const [isDarkMode, setDarkMode] = useState<boolean>(false);
	const [isHoveredFirstBox, setHoveredFirstBox] = useState<boolean>(false);
	const [isHoveredSecondBox, setHoveredSecondBox] = useState<boolean>(false);

	useEffect(() => {
		const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		setDarkMode(darkModeMediaQuery.matches);
		const handleColorSchemeChange = (e: MediaQueryListEvent) => { setDarkMode(e.matches) };
		darkModeMediaQuery.addEventListener('change', handleColorSchemeChange);
		return () => { darkModeMediaQuery.removeEventListener('change', handleColorSchemeChange) };
	}, []);
	const loginInfo = isDarkMode ? loginCallbackWhite : loginCallbackBlue;
	return <header>
		<a className="headerIcon" href="/">
			<Image src={Logo} alt="logo" width={70} height={70} style={{margin: "0 auto"}} />
		</a>
		<div className="headerMenu">
			<div className="headerMenuBox">
				<div
					className="headerMenuBoxOuter"
					onMouseEnter={() => setHoveredFirstBox(true)}
        			onMouseLeave={() => setHoveredFirstBox(false)}
				>
					채보 난도
				</div>
				{isHoveredFirstBox && (
					<>
						<a
							className="headerMenuBoxInner"
							href="/charts/official"
							onMouseEnter={() => setHoveredFirstBox(true)}
							onMouseLeave={() => setHoveredFirstBox(false)}
						>
							공식 책정
						</a>
						<a
							className="headerMenuBoxInner"
							href="/charts/community"
							onMouseEnter={() => setHoveredFirstBox(true)}
							onMouseLeave={() => setHoveredFirstBox(false)}
						>
							커뮤니티 책정
						</a>
					</>
				)}
			</div>
			<div className="headerMenuBox">
				<div
					className="headerMenuBoxOuter"
					onMouseEnter={() => setHoveredSecondBox(true)}
        			onMouseLeave={() => setHoveredSecondBox(false)}
				>
					커뮤니티
				</div>
				{isHoveredSecondBox && (
					<>
						<a
							className="headerMenuBoxInner"
							href="/community/replay"
							onMouseEnter={() => setHoveredSecondBox(true)}
							onMouseLeave={() => setHoveredSecondBox(false)}
						>
							자유 게시판
						</a>
						<a
							className="headerMenuBoxInner"
							href="/community/info"
							onMouseEnter={() => setHoveredSecondBox(true)}
							onMouseLeave={() => setHoveredSecondBox(false)}
						>
							공략 게시판
						</a>
						<a
							className="headerMenuBoxInner"
							href="/community/info"
							onMouseEnter={() => setHoveredSecondBox(true)}
							onMouseLeave={() => setHoveredSecondBox(false)}
						>
							기록 공유
						</a>
					</>
				)}
			</div>
		</div>
		<div className="headerLogin">
			<a className="headerLoginInner" href="/login">
				<Image src={loginInfo} alt="login" width={30} height={30} />
				로그인
			</a>
		</div>
	</header>
}