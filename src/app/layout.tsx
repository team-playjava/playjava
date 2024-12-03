import type { Metadata } from "next";
import "./globals.css";
import Header from "./header";
import Footer from "./footer";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontJapanese, FontKorean } from "./fonts";
import { SessionProvider } from "next-auth/react";
config.autoAddCss = false

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
		<html lang="ko">
			<body>
				<div className="main">
					<SessionProvider>
						<Header />
						<main className={`${FontKorean.variable} ${FontJapanese.variable}`}>{children}</main>
						<Footer />
					</SessionProvider>
				</div>
			</body>
		</html>
	);
}
