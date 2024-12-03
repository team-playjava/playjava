"use client"
import Image from "next/image"
import Logo from "./image/logo.webp"
import { useState } from 'react';
import SignIn from "@/components/sign-in";

export default function Header() {
	const [isHoveredFirstBox, setHoveredFirstBox] = useState<boolean>(false);
	const [isHoveredSecondBox, setHoveredSecondBox] = useState<boolean>(false);

	return (
		<header>
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
								href="/community/board"
								onMouseEnter={() => setHoveredSecondBox(true)}
								onMouseLeave={() => setHoveredSecondBox(false)}
							>
								자유 게시판
							</a>
							<a
								className="headerMenuBoxInner"
								href="/community/solution"
								onMouseEnter={() => setHoveredSecondBox(true)}
								onMouseLeave={() => setHoveredSecondBox(false)}
							>
								공략 게시판
							</a>
							<a
								className="headerMenuBoxInner"
								href="/community/replay"
								onMouseEnter={() => setHoveredSecondBox(true)}
								onMouseLeave={() => setHoveredSecondBox(false)}
							>
								기록 공유
							</a>
						</>
					)}
				</div>
			</div>
			<SignIn />
		</header>
	)
}