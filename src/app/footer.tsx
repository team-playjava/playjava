"use client";
import Image from "next/image"
import Logo from "./image/logo.webp"
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
	const [isDarkMode, setDarkMode] = useState<boolean>(false);
	useEffect(() => {
		const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		setDarkMode(darkModeMediaQuery.matches);
		const handleColorSchemeChange = (e: MediaQueryListEvent) => { setDarkMode(e.matches) };
		darkModeMediaQuery.addEventListener('change', handleColorSchemeChange);
		return () => { darkModeMediaQuery.removeEventListener('change', handleColorSchemeChange) };
	}, []);
	return <footer>
	<div className="footerLeft">
		<div className="siteInfo">
			<Image src={Logo} alt="logo" width={70} height={70} />
			<h1>playJava!</h1>
		</div>
		<p className="copyright">ⓒ 2024 Starlight Studios, All rights reserved. playJava!는 쏘리들, 자바!의 서드파티 서비스입니다.</p>
		<p className="copyright"><a href="https://sorry.daldal.so/" target="_blank">쏘리들 (Sorryfield)</a> 및 <a href="https://sorry.daldal.so/java" target="_blank">자바! (Java!)</a> 의 상표권은 <a href="https://github.com/JJoriping" target="_blank">쪼리핑 (JJoriping)</a>, <a href="https://daldal.so" target="_blank">달달소 (daldal.so)</a> 및 그 제휴 관계에 있습니다.</p>
		<p className="copyright">&quot;모레미 스티커&quot;는 cash0509(캐시)님의 저작물이며, 달달소 디스코드에서 사용할 수 있습니다.</p>
	</div>
		<div className="footerRight">
			<div className="outLink">
				<a href="https://twitter.com/playJava_" target="_blank"><FontAwesomeIcon icon={faXTwitter} /></a>
				<a href="https://discord.gg/ce4r2NBNxn" target="_blank"><FontAwesomeIcon icon={faDiscord} /></a>
			</div>
			<div className="inLink">
				<a href="/policy/privacy">개인정보 처리방침</a>
				<a href="/policy/operation">운영 정책</a>
			</div>
		</div>
	</footer>
}