import type { Metadata } from "next";
import 'tailwindcss/tailwind.css';
import "./globals.css";
import Header from "./header";
import Footer from "./footer";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontJapanese, FontKorean } from "./fonts";
config.autoAddCss = false

import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
	title: "playJava!",
	description: "playJava!에서 자바!에 대한 이야기를 나눠보세요!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SessionProvider>
			<html lang="ko">
				<body>
					<div className="main">
						<Header />
						<main className={`${FontKorean.variable} ${FontJapanese.variable}`}>{children}</main>
						<Footer />
					</div>
				</body>
			</html>
		</SessionProvider>
	);
}
